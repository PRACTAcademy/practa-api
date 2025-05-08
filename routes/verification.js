'use strict';

const express = require('express');
const axios = require('axios');
const router = express.Router();
const { putObject } = require('../utils/digitalOceanSpace');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

router.post('/verify-user', [
    body('user_id').trim().isString().notEmpty().escape(),
    body('email').optional().trim().isEmail().normalizeEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { user_id, email } = req.body;

        if (!user_id) {
            return res.status(400).send({ error: 'user_id is required' });
        }

        const membersInfoResponse = await axios.get(process.env.MEMBERS_INFO_ENDPOINT);
        const membersList = membersInfoResponse.data;

        const user = membersList.find(member => member.id === user_id);
        if (!user) {
            return res.status(404).send({ error: 'User not found in members list' });
        }

        const nickname = user.username;

        const data = {
            userId: user_id,
            nickname,
            points: 0,
            completedSEs: 0,
            studyDays: [],
            totalPoints: 0,
            voiceData: {
                today: {
                    date: "",
                    time: "",
                    messages: 0,
                    points: 0,
                    mostUsedChannels: []
                },
                yearly: [],
                pointsHistory: []
            }
        };

        if (email) {
            data.email = email;
        }

        await putObject(user_id, data);

        return res.send({ success: true, message: 'File saved successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error saving the file' });
    }
});

module.exports = router;
