const proxy = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();

const socketHost = `${process.env.SOCKET_HOST_URL || 'http://localhost:7000'}`;

const socketProxy = proxy({
    target: `${socketHost}/socket.io`
});

router.get('/', socketProxy);
router.post('/', socketProxy);

module.exports = router;