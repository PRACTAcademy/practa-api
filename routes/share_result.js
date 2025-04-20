'use strict';

const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const router = express.Router();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.login(process.env.DISCORD_TOKEN);

router.post('/share-result', async (req, res) => {
    const { userId, message } = req.body;
    const file = req.files?.image;

    if (!userId || !file) {
        return res.status(400).send({ error: 'userId and image are required' });
    }

    try {
        const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
        if (!channel) {
            return res.status(404).send({ error: 'Discord channel not found' });
        }

        await channel.send({
            content: `<@${userId}> ${message || 'Shared a result in a SE!:'}`,
            files: [{ attachment: file.data, name: file.name }]
        });

        res.status(200).send({ success: true, message: 'Image sent successfully' });
    } catch (error) {
        console.error('Error sending image:', error);
        res.status(500).send({ error: 'Error sending image' });
    }
});

module.exports = router;
