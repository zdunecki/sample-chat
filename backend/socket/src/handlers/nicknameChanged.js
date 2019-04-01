const {hget} = require("../utils/redis");
const {Events} = require('../events');

module.exports = {
    nicknameChanged: (io, logger) => async data => {
        const childLogger = logger.child({
            input: data
        });

        childLogger.info("Changing nickname");

        const user = JSON.parse(await hget('users', data.userId));
        const changedUser = Object.assign({}, user, {
            nickname: data.nickname
        });

        const childLogger2 = childLogger.child({
            changedUser
        });
        childLogger2.info("Nickname changed");

        io.emit(Events.NicknameChanged, {user: changedUser});
    }
};