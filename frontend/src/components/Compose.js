import React from 'react';
import {ChatContextConsumer} from "../contexts/ChatContext";

export const Compose = () => (
    <ChatContextConsumer>
        {
            ctx => (
                <div className="compose">
                    <input
                        type="text"
                        className="compose-input"
                        placeholder="Type a message"
                        onKeyPress={e => {
                            if (e.key !== 'Enter') {
                                return
                            }

                            if (ctx.activeConservation.isChannel) {
                                ctx.sendChannelMessage({
                                    content: e.target.value,
                                    conservationId: ctx.activeConservation.id
                                });
                            } else {
                                ctx.sendPrivateMessage({
                                    to: ctx.activeConservation.id,
                                    content: e.target.value,
                                    conservationId: ctx.activeConservation.id
                                });
                            }

                            e.target.value = '';
                        }}
                    />
                </div>
            )
        }
    </ChatContextConsumer>
);