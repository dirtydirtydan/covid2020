import { Fab } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import React from "react";
import ChatAPI from "./ChatAPI";
import { copyToClipboard, scrollToBottom } from "../../util";

function CodeMessage({ message }) {
    return (
        <div
            style={{
                background: "grey",
                padding: "20px",
                borderRadius: "8px",
                fontSize: "14pt",
                fontFamily: "monospace",
                boxSizing: "border-box",
                overflow: "auto",
                whiteSpace: "pre",
                cursor: "pointer",
            }}
            onClick={copyToClipboard}>
            {message}
        </div>
    );
}

function ChatBubble({ color, message, code }) {
    if (code) {
        return <CodeMessage message={message} />;
    }
    return (
        <div
            style={{
                background: "seagreen",
                padding: "20px",
                display: "inline-block",
                borderRadius: "8Px%",
            }}>
            {message}
        </div>
    );
}

function ChatMessage({ children }) {
    return <div>{children}</div>;
}

function MessageSignature({ username, time }) {
    return (
        <div style={{ margin: "16px 0", fontSize: "10pt" }}>
            <span style={{ paddingRight: "16px", fontWeight: "bold" }}>
                {username}
            </span>
            {time}
        </div>
    );
}

function ChatInput() {
    const { send } = ChatAPI.useContext();
    function sendMessage(event) {
        if (event.keyCode === 13) {
            send({ value: event.target.value });
        }
    }
    return (
        <textarea
            onKeyDown={sendMessage}
            style={{ height: "40px", flex: "1 0 auto", fontSize: "xx-large" }}
        />
    );
}
function MessageBox() {
    const messages = ChatAPI.subscribeToMessages();
    const ref = React.useRef();

    React.useEffect(
        function () {
            scrollToBottom(ref.current);
        },
        [ref, messages]
    );
    return (
        <div
            style={{
                background: "green",
                width: "300px",
                height: "500px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                fontSize: "14pt",
            }}>
            <div ref={ref} style={{ overflow: "auto", maxHeight: "100%" }}>
                {messages.map(({ id, username, timestamp, value, code }) => (
                    <ChatMessage key={id}>
                        <MessageSignature
                            username={username}
                            time={new Date(
                                timestamp
                            ).toLocaleTimeString()}></MessageSignature>
                        <ChatBubble code={code} message={value}></ChatBubble>
                    </ChatMessage>
                ))}
            </div>
            <ChatInput />
        </div>
    );
}
export default function ChatBox() {
    const [show, setShow] = React.useState(true);
    function toggleShow() {
        setShow(!show);
    }
    return (
        <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
            {show && (
                <ChatAPI>
                    <MessageBox></MessageBox>
                </ChatAPI>
            )}
            <Fab onClick={toggleShow}>
                <ChatIcon></ChatIcon>
            </Fab>
        </div>
    );
}
