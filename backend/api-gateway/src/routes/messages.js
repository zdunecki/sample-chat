const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise-native');

const Joi = require("../utils/joi-promise");
const {ErrorCodes} = require("../utils/errorCodes");
const logger = require("../utils/logger");

const router = express.Router();
const apiHost = `${process.env.API_HOST_URL || 'http://localhost:6000'}`;

router.post('/', bodyParser.json(), async (req, res) => {
    const schema = Joi.object().keys({
        conservationId: Joi.string().required(),
        isChannel: Joi.boolean().required(),
        senderId: Joi.string().required(),
        content: Joi.string().required()
    });

    try {
        const value = await Joi.validate(req.body, schema);

        const childLogger = logger.child({
            data: value
        });

        childLogger.info('Creating new message');

        await request.post({
            url: `${apiHost}/messages`,
            body: value,
            json: true
        });

        childLogger.info('New message have been created');

        res.status(201).end();
    } catch (err) {
        if (err.isJoi) {
            res.status(400).json(err);
        } else {
            logger.error(err.message || err);
            res.status(500).json({code: ErrorCodes.UNEXPECTED});
        }
    }
});

router.get('/:conservationId/latest', async (req, res) => {
    const schema = Joi.object().keys({
        conservationId: Joi.string().required(),
        isChannel: Joi.boolean().required(),
    });

    try {
        const value = await Joi.validate({
            conservationId: req.params.conservationId,
            isChannel: req.query.isChannel
        }, schema);

        const conservationResource = value.isChannel ? '/channels' : '/users';

        const params = new URLSearchParams({
            n: 10,
        });

        const response = await request.get({
            url: `${apiHost}/messages/${value.conservationId}${conservationResource}/latest?${params}`,
        });

        const messages = JSON.parse(response);
        messages.sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt));

        res.json(messages);
    } catch (err) {
        if (err.isJoi) {
            res.status(400).json(err);
        } else {
            logger.error(err.message || err);
            res.status(500).json({code: ErrorCodes.UNEXPECTED});
        }
    }
});

module.exports = router;