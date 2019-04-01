import React from 'react';

import {ConversationList} from "./ConversationList";
import {MessageList} from "./MessageList";

export const Messenger = () => (
    <div className="messenger">
        <div className="scrollable sidebar">
            <ConversationList/>
        </div>

        <div className="scrollable content">
            <MessageList/>
        </div>
    </div>
);