const express = require('express');
const bodyParser = require('body-parser');

const logger = require('../utils/logger');
const {newMessage, getLatestChannelMessages, getLatestUserMessages} = require("../repository/messagesRepository");

const router = express.Router();

router.post('/', bodyParser.json(), async (req, res) => {
    try {
        const id = await newMessage({
            conservationId: req.body.conservationId,
            isChannel: req.body.isChannel,
            senderId: req.body.senderId,
            content: req.body.content
        });

        const child = logger.child({
            id
        });
        child.info('Created a message');

        res.status(201).json({id});
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/:conservationId/channels/latest', async (req, res) => {
    try {
        const response = await getLatestChannelMessages(req.params.conservationId, req.query.n);
        res.json(response)
    } catch (e) {
        res.status(500).json(e)
    }
});

router.get('/:conservationId/users/latest', async (req, res) => {
    try {
        const response = await getLatestUserMessages(req.params.conservationId, req.query.n);
        res.json(response)
    } catch (e) {
        res.status(500).json(e)
    }
});

module.exports = router;