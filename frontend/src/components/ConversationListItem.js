import React from 'react';
import {ChatContextConsumer} from "../contexts/ChatContext";

export const ConversationListItem = ({data, isChannel}) => (
    <ChatContextConsumer>
        {
            ctx => ctx.user && (
                <div
                    className={`conversation-list-item ${ctx.activeConservation.id === data.id ? 'conversation-list-item--active' : ''}`}
                    onClick={() => ctx.changeActiveConservation(data.id, isChannel)}
                >
                    <img className="conversation-photo" src={data.avatar}/>
                    <div className="conversation-info">
                        {
                            isChannel
                                ? <h1 className="conversation-title">#{data.name}</h1>
                                : <h1 className="conversation-title">
                                    {
                                        data.id === ctx.user.id
                                            ? `${data.nickname} (me)`
                                            : data.nickname
                                    }
                                </h1>
                        }
                        <p className="conversation-snippet">{data.text}</p>
                    </div>
                </div>
            )
        }
    </ChatContextConsumer>
);