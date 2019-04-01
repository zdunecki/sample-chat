const logger = require("./utils/logger");
const {subscribePrivateMessage} = require("./handlers/privateMessage");
const {Subscription} = require("./subscriptions");

module.exports = {
    subscribingMessage: sockets => async (channel, msg) => {
        logger.info("Subscribing messages");

        if (channel === Subscription.PrivateMessage) {
            const data = JSON.parse(msg);

            const childLogger = logger.child({
                subscription: Subscription.PrivateMessage,
                message: data
            });

            childLogger.info("Subscribing private message");
            subscribePrivateMessage(sockets, data);
            childLogger.info("Subscribed private message");
        }
    }
};

