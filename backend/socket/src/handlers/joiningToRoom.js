module.exports = {
    joiningRoom: (socket, logger) => data => {
        const childLogger = logger.child({
            input: data
        });

        childLogger.info("Joining to room");

        socket.join(data.channelId);
    }
};