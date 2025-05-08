const express = require('express');
const { getObject } = require('../utils/digitalOceanSpace');
const Sentry = require('../config/sentryConfig');
const { param, validationResult } = require('express-validator');

const router = express.Router();

router.get('/user-info/:userId', [
    param('userId').trim().isString().notEmpty().escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;

    try {
        const userData = await getObject(userId);

        if (!userData) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const { userId: id, nickname, level, points, completedSEs } = userData;

        res.status(200).json({
            userId: id,
            nickname,
            level,
            points,
            completedSEs
        });
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
