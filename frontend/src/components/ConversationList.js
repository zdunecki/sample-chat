import React from 'react';

import {ChatContextConsumer} from "../contexts/ChatContext";
import {ConversationListItem} from "./ConversationListItem";
import {Header} from "./Header";

export const ConversationList = () => (
    <ChatContextConsumer>
        {
            ctx => (
                <div className="conversation-list">
                    <Header middleItems={<span>Channels and users</span>}>
                    </Header>
                    {
                        ctx.channels.map(channel =>
                            <ConversationListItem
                                key={channel.id}
                                data={channel}
                                isChannel
                            />
                        )
                    }
                    {
                        ctx.users.map(user =>
                            <ConversationListItem
                                key={user.id}
                                data={user}
                            />
                        )
                    }
                    <div className="compose-nickname">
                        <div className="compose-nickname-wrapper">
                            <label>Your nickname</label>
                            <input
                                type="text"
                                value={ctx.user ? ctx.user.nickname : ''}
                                className="compose-nickname-input"
                                placeholder="Change nickname"
                                onChange={e => ctx.changeNickname(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )
        }
    </ChatContextConsumer>
);