import React, {Component} from "react";

import {ChatAPI} from "../api/sdk";
import {arrayToObject} from "../utils";

const ChatContext = React.createContext();

const Events = {
    ChannelMessage: 'channel-message',
    PrivateMessage: 'private-message',
    Join: 'join',
    Connected: 'connected',
    BroadcastConnection: 'broadcast-connection',
    ChangeNickname: 'change-nickname',
    NicknameChanged: 'nickname-changed',
    CreateChannel: 'create-channel',
    ChannelCreated: 'channel-created',
    Disconnected: 'disconnected',
};

export class ChatContextProvider extends Component {
    socket = null;

    state = {
        user: null,
        activeConservation: {
            id: null,
            isChannel: false,
        },
        channels: [],
        users: [],
        usersMap: {},
        messages: {},
        getMessages: async conservationId => {
            this.setState({messages: this.newMessages(conservationId, [])})
        },
        changeNickname: nickname => {
            this.socket.emit(Events.ChangeNickname, {
                userId: this.state.user.id,
                nickname
            });

            this.setState({
                user: {...this.state.user, nickname}
            });
        },
        changeActiveConservation: async (conservationId, isChannel) => {
            const firstEnter = !this.state.messages[conservationId];

            try {
                if (firstEnter && isChannel) {
                    const response = await ChatAPI.Public.Message.getChannelLatest(conservationId);

                    this.setState({
                        messages: this.newMessages(conservationId, response)
                    });
                }

                this.socket.emit(Events.Join, {channelId: conservationId});

                this.setState({
                    activeConservation: {
                        id: conservationId,
                        isChannel: isChannel || false
                    }
                })
            } catch (e) {
                console.error(e);
                alert("Something went wrong during changing conservation")
            }
        },
        sendChannelMessage: ({content, conservationId}) => {
            this.socket.emit(Events.ChannelMessage, {senderId: this.state.user.id, conservationId, content});
        },
        sendPrivateMessage: ({to, content, conservationId}) => {
            this.socket.emit(Events.PrivateMessage, {to, from: this.state.user.id, conservationId, content});
        },
        createChannel: name => {
            this.socket.emit(Events.CreateChannel, {ownerId: this.state.user.id, name});
        }
    };

    componentDidMount() {
        try {
            const socket = ChatAPI.Public.Chat.connect();
            this.socket = socket;

            socket.on('connected', data => {
                const newUser = {
                    id: data.user.id,
                    nickname: data.user.nickname
                };

                this.setState({
                    user: newUser,
                    activeConservation: {
                        id: data.user.id,
                        isChannel: false
                    }
                });

                this.state.getMessages(data.user.id);

                socket.emit(Events.Join, {id: data.user.id});
            });

            socket.on(Events.BroadcastConnection, data => {
                this.setState({
                    users: data.users,
                    usersMap: arrayToObject(data.users, "id"),
                    channels: data.channels
                });
            });

            this.socket.on(Events.NicknameChanged, data => {
                const updateUsers = this.state.users.map(user => {
                    if (user.id === data.user.id) {
                        return data.user
                    }

                    return user;
                });

                this.setState({
                    users: updateUsers,
                    usersMap: arrayToObject(updateUsers, "id")
                })
            });

            this.socket.on(Events.ChannelCreated, data => {
                this.setState({
                    channels: [...this.state.channels, data.channel]
                });
            });

            this.socket.on(Events.ChannelMessage, data => {
                const conservationMessages = this.state.messages[data.message.conservationId];

                this.setState({
                    messages: this.newMessages(data.message.conservationId, [{
                        conservationId: data.message.conservationId,
                        isChannel: data.message.isChannel,
                        senderId: data.message.senderId,
                        content: data.message.content,
                        createdAt: data.message.createdAt,
                        showTimestamp: showMessageTimestamp(conservationMessages, data.message)
                    }])
                });

                this.props.scrollBottom();
            });

            this.socket.on(Events.PrivateMessage, data => {
                const mySelfMessage = data.message.to === this.state.user.id;

                if (mySelfMessage) {
                    this.setState({
                        messages: this.newMessages(data.message.from, [{
                            content: data.message.content,
                            senderId: data.message.from,
                            createdAt: data.message.createdAt,
                        }])
                    })
                } else {
                    this.setState({
                        messages: this.newMessages(data.message.to, [{
                            content: data.message.content,
                            senderId: data.message.from,
                            createdAt: data.message.createdAt,
                        }])
                    })
                }

                this.props.scrollBottom();
            });

            this.socket.on('disconnected', data => {
                const deleteUser = this.state.users.filter(user => user.id !== data.userId);

                this.setState({
                    users: deleteUser,
                    usersMap: arrayToObject(deleteUser, "id")
                });
            })
        } catch (e) {
            console.error(e);
            alert("Cannot connect with chat");
        }
    }

    newMessages = (conservationId, messages) => {
        return {
            ...this.state.messages,
            [conservationId]: [
                ...(this.state.messages[conservationId] || []),
                ...messages
            ]
        }
    };

    render() {
        return (
            <ChatContext.Provider value={this.state}>
                {this.props.children}
            </ChatContext.Provider>
        );
    }
}

const diffBetweenDatesInMinutes = (dateOne, dateTwo) => {
    const diff = Math.abs(dateOne - dateTwo);

    return Math.floor((diff / 1000) / 60);
};

const showMessageTimestamp = (allConservationMessages, msg) => {
    if (!allConservationMessages.length) {
        return true
    }

    const allMessagesLength = allConservationMessages.length;

    const previousDate = new Date(allConservationMessages[allMessagesLength - 1].createdAt);

    const diff = diffBetweenDatesInMinutes(previousDate, new Date(msg.createdAt));

    return diff >= 10;
};

export const ChatContextConsumer = ChatContext.Consumer;