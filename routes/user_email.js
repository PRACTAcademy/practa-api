const express = require('express');
const { getObject, putObject } = require('../utils/digitalOceanSpace');
const Sentry = require('../config/sentryConfig');
const { param, body, validationResult } = require('express-validator');

const router = express.Router();

router.get('/user-email/:userId', [
    param('userId').trim().isString().notEmpty().escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;

    try {
        const userData = await getObject(userId);

        const email = userData?.email || null;

        return res.status(200).json({
            userId,
            email
        });
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error fetching email:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

router.post('/user-email', [
    body('userId').trim().isString().notEmpty().escape(),
    body('email').trim().isEmail().normalizeEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, email } = req.body;

    if (!userId || !email) {
        return res.status(400).json({ error: 'Missing userId or email.' });
    }

    try {
        const userData = await getObject(userId) || {};
        const alreadyExists = !!userData.email;

        userData.email = email;

        await putObject(userId, userData);

        return res.status(200).json({
            userId,
            email,
            status: alreadyExists ? 'updated' : 'added'
        });
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error updating email:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
