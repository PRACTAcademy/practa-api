'use strict';

const express = require('express');
const { getObject } = require('../utils/digitalOceanSpace');
const Sentry = require('../config/sentryConfig');
const { param, validationResult } = require('express-validator');

const router = express.Router();

router.get('/get-study-days/:userId', [
    param('userId').trim().isString().notEmpty().escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;

    if (!userId) {
        return res.status(400).send({ error: 'userId is required' });
    }

    try {
        const userData = await getObject(userId);

        if (!userData) {
            return res.status(404).send({ error: 'User not found' });
        }

        const { studyDays, totalPoints } = userData;

        if (!studyDays) {
            return res.status(404).send({ error: 'studyDays not found in user JSON' });
        }

        if (totalPoints === undefined) {
            return res.status(404).send({ error: 'totalPoints not found in user JSON' });
        }

        res.status(200).send({ success: true, studyDays, totalPoints });
    } catch (error) {
        console.error('Error fetching studyDays:', error);
        Sentry.captureException(error);
        res.status(500).send({ error: 'Error fetching studyDays' });
    }
});

module.exports = router;
