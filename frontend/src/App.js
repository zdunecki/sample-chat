import React from 'react';
import './App.css';

import {Messenger} from "./components/Messenger";
import {ChatContextProvider} from "./contexts/ChatContext";
import {ChatDomContextConsumer, ChatDomContextProvider} from "./contexts/ChatDOMContext";

const App = () => (
    <div className="App">
        <ChatDomContextProvider>
            <ChatDomContextConsumer>
                {
                    ctx => (
                        <ChatContextProvider scrollBottom={ctx.scrollBottom}>
                            <Messenger/>
                        </ChatContextProvider>
                    )
                }
            </ChatDomContextConsumer>
        </ChatDomContextProvider>
    </div>
);

export default App;
