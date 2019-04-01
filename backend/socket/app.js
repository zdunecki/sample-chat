const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const request = require('request-promise-native');
const redisAdapter = require('socket.io-redis');

//maintenance
const {Events} = require('./src/events');
const packageJSON = require('./package.json');
//socket handlers
const {privateMessage} = require("./src/handlers/privateMessage");
const {channelMessage} = require("./src/handlers/channelMessage");
const {joiningRoom} = require("./src/handlers/joiningToRoom");
const {channelCreated} = require("./src/handlers/channelCreated");
const {nicknameChanged} = require("./src/handlers/nicknameChanged");
//utils
const logger = require("./src/utils/logger");
const {randomValueHex, redisUtils} = require("./src/utils");
const {hset, hdel, hgetall, redisHost, redisPort, sub} = require("./src/utils/redis");
//subscription
const {Subscription} = require("./src/subscriptions");
const {subscribingMessage} = require("./src/subscriptionHandlers");


const port = process.env.PORT || 7000;

app.listen(port);
logger.info("Listening socket");

io.adapter(redisAdapter({host: redisHost, port: redisPort}));

function handler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`${packageJSON.name} ${packageJSON.version}`);
}

const sockets = {};

const getChannels = async () => {
    const channels = await hgetall('channels') || {};

    return redisUtils.allHashes(channels);
};

const getUsers = async () => {
    const users = await hgetall('users') || {};

    return redisUtils.allHashes(users);
};

sub.subscribe(Subscription.PrivateMessage);
sub.on('message', subscribingMessage(sockets));

io.on('connection', async socket => {
    const socketLogger = logger.child({
        socket: {
            id: socket.id
        }
    });
    socketLogger.info("Socket connected");

    const fakeUser = JSON.parse(await request.get('https://randomuser.me/api/'));
    const channels = await getChannels();

    const user = {
        id: socket.id,
        nickname: randomValueHex(12),
    };

    await hset('users', socket.id, JSON.stringify({
        id: user.id,
        nickname: user.nickname,
        avatar: fakeUser.results[0].picture.medium
    }));
    const users = await getUsers();

    socket.join(socket.id);
    sockets[user.id] = socket;

    socket.emit(Events.Connected, {
        user: {
            id: user.id,
            nickname: user.nickname
        },
    });

    io.emit(Events.BroadcastConnection, {
        users,
        channels
    });

    socket.on(Events.ChangeNickname, nicknameChanged(io, socketLogger));
    socket.on(Events.CreateChannel, channelCreated(io, socketLogger));
    socket.on(Events.Join, joiningRoom(socket, socketLogger));
    socket.on(Events.ChannelMessage, channelMessage(io, socketLogger));
    socket.on(Events.PrivateMessage, privateMessage(socketLogger));

    //TODO: something went wrong if we fast refresh. we still keep old users
    socket.on('disconnect', async () => {
        io.emit(Events.Disconnected, {userId: socket.id});

        socketLogger.error("Socket disconnect");

        await hdel('users', socket.id);
    });

    socket.on('error', async () => {
        io.emit(Events.Disconnected, {userId: socket.id});

        socketLogger.error("Socket error");

        await hdel('users', socket.id);
    });

    socket.on('connect_failed', async () => {
        io.emit(Events.Disconnected, {userId: socket.id});

        socketLogger.error("Socket error");

        await hdel('users', socket.id);
    });

    socket.on('reconnect_failed', async () => {
        io.emit(Events.Disconnected, {userId: socket.id});

        socketLogger.error("Socket error");

        await hdel('users', socket.id);
    });
});
