import React, {Component} from "react";

const ChatDomContext = React.createContext();

export class ChatDomContextProvider extends Component {
    messageListDOM = null;

    state = {
        messageListRef: ref => this.messageListDOM = ref,
        scrollBottom: () => {
            this.messageListDOM.scrollIntoView({behavior: 'smooth'});
        },
    };

    render() {
        return (
            <ChatDomContext.Provider value={this.state}>
                {this.props.children}
            </ChatDomContext.Provider>
        );
    }
}

export const ChatDomContextConsumer = ChatDomContext.Consumer;