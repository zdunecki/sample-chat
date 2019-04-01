const request = require('request-promise-native');

const {API_GATEWAY_URL} = require("../api");
const {Events} = require('../events');
const {pub} = require("../utils/redis");
const {Subscription} = require("../subscriptions");

module.exports = {
    subscribePrivateMessage: (sockets, data) => {
        data.receiverIds.map(receiverId => {
            const receiverSocket = sockets[receiverId];

            if (!receiverSocket) {
                return;
            }

            receiverSocket.emit(Events.PrivateMessage, {message: data.newMessage});
        });
    },
    privateMessage: (logger) => async data => {
        const newMessage = {
            from: data.from,
            to: data.to,
            conservationId: data.conservationId,
            content: data.content,
        };

        const childLogger = logger.child({
            newMessage
        });

        try {
            childLogger.info('Persistence a private message');

            await request.post({
                url: `${API_GATEWAY_URL}/messages`,
                body: {
                    conservationId: newMessage.conservationId,
                    isChannel: false,
                    senderId: newMessage.from,
                    content: newMessage.content
                },
                json: true,
            });

            childLogger.info('Persistence a private message created');

            const selfMessage = newMessage.to === newMessage.from;

            const subscriptionData = {
                receiverIds: selfMessage ? [newMessage.to] : [newMessage.to, newMessage.from],
                newMessage: Object.assign({}, newMessage, {
                    createdAt: new Date().toString()
                })
            };

            pub.publish(Subscription.PrivateMessage, JSON.stringify(subscriptionData))

        } catch (err) {
            childLogger.error(err)
        }
    }
};