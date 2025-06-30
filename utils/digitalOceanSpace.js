const AWS = require('aws-sdk');
const path = require('node:path');
const Sentry = require('../config/sentryConfig');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('DO_SPACES_ENDPOINT:', process.env.DO_SPACES_ENDPOINT);

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET
});

const bucketName = process.env.DO_SPACES_BUCKET;

async function getObject(id) {
    try {
        const params = {
            Bucket: bucketName,
            Key: `${id}.json`
        };
        const data = await s3.getObject(params).promise();
        return JSON.parse(data.Body.toString());
    } catch (error) {
        Sentry.captureException(error);
        if (error.code === 'NoSuchKey') {
            return null;
        }
        throw error;
    }
}

async function putObject(id, data) {
    try {
        const params = {
            Bucket: bucketName,
            Key: `${id}.json`,
            Body: JSON.stringify(data),
            ContentType: 'application/json'
        };
        await s3.putObject(params).promise();
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
}

module.exports = { getObject, putObject };