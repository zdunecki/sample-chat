const express = require('express');
const cors = require('cors');

const packageJSON = require('./package.json');

const logger = require("./src/utils/logger");
const SocketsRouter = require("./src/routes/sockets");
const MessagesRouter = require("./src/routes/messages");

const app = express();
const port = process.env.PORT || 5500;


app.use(cors());
app.use(require('morgan')('tiny', {"stream": logger.stream}));

app.get('/', (req, res) => {
    res.json(`${packageJSON.name} ${packageJSON.version}`)
});

app.use('/sockets', SocketsRouter);
app.use('/messages', MessagesRouter);

app.listen(port, process.env.HOST).on("listening", () => {
    console.log(`API gateway listening on port ${port}!`)
});