'use strict';

const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const verificationCodes = new Map();

router.post('/generate-code', async (req, res) => {
    try {
        const { to, user_id } = req.body;

        if (!to || !user_id) {
            return res.status(400).send({ error: 'Both "to" and "user_id" are required' });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        verificationCodes.set(user_id, code);

        const emailPayload = {
            to,
            subject: 'Your verification code',
            text: `Your verification code is: ${code}`,
            html: `
        <div style="text-align: center;">
            <img src="https://raw.githubusercontent.com/TheusHen/TheusHen/refs/heads/main/src/assets/mitpa.png" alt="MITPA Logo" style="display: block; margin: 0 auto;"/>
            <p>Your verification code is: <strong>${code}</strong></p>
        </div>
    `
        };

        await axios.post(process.env.EMAIL_SEND_ENDPOINT, emailPayload);

        return res.status(200).send({ success: true, message: 'Verification code sent successfully' });
    } catch (error) {
        console.error('Error generating or sending verification code:', error);
        return res.status(500).send({ error: 'Error generating or sending verification code' });
    }
});

router.get('/verify-code', (req, res) => {
    try {
        const { user_id, code } = req.query;

        if (!user_id || !code) {
            return res.status(400).send({ error: 'Both "user_id" and "code" are required' });
        }

        const savedCode = verificationCodes.get(user_id);

        if (!savedCode) {
            return res.status(404).send({ error: 'No code found for the provided user_id' });
        }

        if (savedCode === code) {
            verificationCodes.delete(user_id);
            return res.status(200).send({ success: true, message: 'Code verified successfully' });
        } else {
            return res.status(400).send({ error: 'Invalid code' });
        }
    } catch (error) {
        console.error('Error verifying code:', error);
        return res.status(500).send({ error: 'Error verifying code' });
    }
});

module.exports = router;
