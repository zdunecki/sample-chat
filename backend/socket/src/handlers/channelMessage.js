const request = require('request-promise-native');

const {API_GATEWAY_URL} = require("../api");
const {Events} = require('../events');

module.exports = {
    channelMessage: (io, logger) => async (data) => {
        const newMessage = {
            conservationId: data.conservationId,
            isChannel: true,
            senderId: data.senderId,
            content: data.content
        };

        const childLogger = logger.child({
            newMessage
        });

        try {
            childLogger.info('Persistence a channel message');

            await request.post({
                url: `${API_GATEWAY_URL}/messages`,
                body: newMessage,
                json: true,
            });

            childLogger.info('Persistence a channel message created');

            io.sockets.in(data.conservationId).emit(Events.ChannelMessage, {
                message: Object.assign({}, newMessage, {
                    createdAt: new Date().toString()
                })
            });
        } catch (err) {
            childLogger.error(err)
        }
    }
};