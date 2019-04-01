import React, {Fragment} from 'react';

import {Header} from "./Header";
import {Compose} from "./Compose";
import {Message} from "./Message";
import {ChatContextConsumer} from "../contexts/ChatContext";
import {ChatDomContextConsumer} from "../contexts/ChatDOMContext";

export const MessageList = () => {
    let input = null;

    return (
        <ChatContextConsumer>
            {
                ctx => (
                    <div className="message-list">
                        <Header
                            rightItems={<Fragment>
                                <div>
                                    <input
                                        ref={ref => input = ref}
                                        type="text"
                                        className="new-channel-input"
                                        placeholder="Type a channel name"
                                    />
                                    <button className="new-channel-button" onClick={() => {
                                        ctx.createChannel(input.value);
                                        input.value = '';
                                    }}>New channel
                                    </button>
                                </div>
                            </Fragment>}
                        />
                        <div className="message-list-container">
                            {
                                (ctx.messages[ctx.activeConservation.id] || []).map((message, i) => (
                                    <Message
                                        key={i}
                                        isMine={message.senderId === ctx.user.id}
                                        messageFrom={messageFrom(ctx, message)}
                                        showTimestamp={message.showTimestamp || i === 0}
                                        data={message}
                                    />
                                ))
                            }
                        </div>

                        <ChatDomContextConsumer>
                            {
                                domCTX => (
                                    <div style={{float: "left", clear: "both"}}
                                         ref={domCTX.messageListRef}/>
                                )
                            }
                        </ChatDomContextConsumer>
                        <Compose/>
                    </div>
                )
            }
        </ChatContextConsumer>
    )
};

const messageFrom = (ctx, message) => {
    const onlineUser = ctx.usersMap[message.senderId];

    if (onlineUser) {
        return onlineUser.nickname
    }

    return "Deleted user";
};
