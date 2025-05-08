const express = require('express');
const axios = require('axios');
const fs = require('node:fs');
const path = require('node:path');
const { getObject } = require('../utils/digitalOceanSpace');
const Sentry = require('../config/sentryConfig');
const { param, validationResult } = require('express-validator');

require('dotenv').config();

const router = express.Router();
const MEMBERS_INFO_URL = process.env.MEMBERS_INFO_ENDPOINT;

const LAST_RANKING_PATH = path.resolve(__dirname, '../data/lastRanking.json');

router.get('/ranking', async (req, res) => {
    try {
        const { data: members } = await axios.get(MEMBERS_INFO_URL);
        const userPointsList = [];

        for (const member of members) {
            const userData = await getObject(member.id);
            if (userData && typeof userData.totalPoints === 'number') {
                userPointsList.push({
                    userId: member.id,
                    nickname: member.username,
                    points: userData.totalPoints
                });
            }
        }

        userPointsList.sort((a, b) => b.points - a.points);

        let previousRanking = [];
        if (fs.existsSync(LAST_RANKING_PATH)) {
            previousRanking = JSON.parse(fs.readFileSync(LAST_RANKING_PATH));
        }

        const newRanking = userPointsList.slice(0, 100).map((user, index) => {
            const previousIndex = previousRanking.findIndex(u => u.userId === user.userId);
            let positionChange = '=';

            if (previousIndex !== -1) {
                const diff = previousIndex - index;
                if (diff > 0) positionChange = `↑${diff}`;
                else if (diff < 0) positionChange = `↓${Math.abs(diff)}`;
            }

            return {
                rank: index + 1,
                userId: user.userId,
                nickname: user.nickname,
                points: user.points,
                positionChange
            };
        });

        fs.writeFileSync(LAST_RANKING_PATH, JSON.stringify(newRanking, null, 2));

        res.status(200).json(newRanking);
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error generating ranking:', error);
        res.status(500).send('Error generating ranking');
    }
});

module.exports = router;
