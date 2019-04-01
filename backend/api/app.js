const express = require('express');

const app = express();
const port = process.env.PORT || 6000;

const MessagesRouter = require('./src/routes/messages');

app.use('/messages', MessagesRouter);

app.listen(port, () => console.log(`API listening on port ${port}!`));