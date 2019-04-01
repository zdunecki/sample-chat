const uuidv4 = require('uuid/v4');

const sql = require("../db/connection");

module.exports = {
    newMessage: async ({conservationId, isChannel, senderId, content}) => {
        const id = uuidv4();
        await sql('messages').insert({
            id,
            conservationId,
            isChannel,
            senderId,
            content,
        });

        return id
    },
    getLatestChannelMessages: async (conservationId, lastN) => await sql('messages').where({
        conservationId,
        isChannel: true
    })
        .orderBy('createdAt', 'desc')
        .limit(lastN)
        .select(),
    getLatestUserMessages: async (conservationId, lastN) => await sql('messages').where({
        conservationId,
        isChannel: false
    })
        .orderBy('createdAt', 'desc')
        .limit(lastN)
        .select(),
};