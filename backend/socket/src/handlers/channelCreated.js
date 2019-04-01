const {randomValueHex} = require("../utils");
const {hset} = require("../utils/redis");
const {Events} = require('../events');

module.exports = {
    channelCreated: (io, logger) => async data => {
        const childLogger = logger.child({
            input: data
        });

        childLogger.info("Creating channel");

        const channel = {
            ownerId: data.ownerId,
            id: randomValueHex(16),
            avatar: 'https://source.unsplash.com/random',
            name: data.name,
        };

        await hset('channels', channel.id, JSON.stringify(channel));

        const childLogger2 = childLogger.child({
            newChannel: channel
        });

        childLogger2.info("Channel created");

        io.emit(Events.ChannelCreated, {channel});
    }
};
