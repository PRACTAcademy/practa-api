const express = require('express');
const { getObject, putObject } = require('../utils/digitalOceanSpace');
const Sentry = require('../config/sentryConfig');

const router = express.Router();

router.get('/user-ses/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const seData = await getObject(`${userId}_se`);
        const response = {
            userId,
            SEs: seData?.SEs || []
        };
        return res.status(200).json(response);
    } catch (error) {
        if (error.code === 'NoSuchKey') {
            return res.status(200).json({
                userId,
                SEs: []
            });
        }

        Sentry.captureException(error);
        console.error('Error fetching SE data:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

router.post('/user-ses', async (req, res) => {
    const { userId, SE } = req.body;

    if (!userId || !SE || !SE.title || SE.score == null || SE.total == null || !SE.date) {
        return res.status(400).json({ error: 'Missing or invalid SE data.' });
    }

    try {
        const seFileKey = `${userId}_se`;

        let existingSEData;
        try {
            existingSEData = await getObject(seFileKey);
        } catch (err) {
            if (err.code === 'NoSuchKey') {
                existingSEData = { SEs: [] };
            } else {
                throw err;
            }
        }

        const alreadyExists = existingSEData.SEs.some(existing => existing.title === SE.title);
        if (alreadyExists) {
            return res.status(409).json({ error: 'SE with the same title already exists.' });
        }

        existingSEData.SEs.push(SE);
        await putObject(seFileKey, existingSEData);
        let userData;
        try {
            userData = await getObject(userId);
        } catch (err) {
            if (err.code === 'NoSuchKey') {
                userData = { userId, completedSEs: 0 };
            } else {
                throw err;
            }
        }

        userData.completedSEs = (userData.completedSEs || 0) + 1;
        await putObject(userId, userData);

        return res.status(200).json({
            message: 'SE added successfully.',
            userId,
            completedSEs: userData.completedSEs
        });
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error updating SEs:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
