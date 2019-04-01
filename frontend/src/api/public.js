import io from "socket.io-client";

import {API_URL, request} from "./request";

export const PublicAPI = {
    Chat: {
        connect: () => io(API_URL, {
            path: '/sockets',
        }),
    },
    Message: {
        getChannelLatest: async conversationId => await request.GET(`/messages/${conversationId}/latest?isChannel=true`),
    }
};