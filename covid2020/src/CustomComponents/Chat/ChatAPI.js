import socketIOClient from "socket.io-client";
import React, {
    createContext,
    PureComponent,
    useCallback,
    useContext,
    useEffect,
    useState,
    useRef,
} from "react";
import { v4 } from "internal-ip/browser";

const ChatContext = createContext({ loading: true });
export default class ChatAPI extends PureComponent {
    static Context = ChatContext;
    static contextType = ChatContext;
    static useSocket() {
        const [user, setUser] = useState({});
        const [loading, setLoading] = useState(true);
        const socket = useRef(
            new socketIOClient("http://20.62.240.91:80", {
                transports: ["websocket"],
                autoConnect: false,
            })
        );
        const setUsername = useCallback(
            function (name) {
                user.name = name;
                setUser(user);
            },
            [user]
        );
        function updateUser(user) {
            if (!user.id) return;
            setUser(user);
            setLoading(false);
        }

        const onConnect = useCallback(() => {
            user.id = localStorage.getItem("chatId");
            if (user.name === "admin") {
                setLoading(false);
                return;
            }
            socket.current.emit("newuser", user);
            updateUser(user);
            v4().then((ip) => {
                if (!ip) return;
                user.ip = ip;
                socket.current.emit("ip", user);
            });
        }, [user, socket]);

        const onNewId = useCallback(
            (newId) => {
                user.id = newId;
                localStorage.setItem("chatId", newId);
                updateUser(user);
            },
            [user]
        );

        const onDisconnect = useCallback(() => {
            socket.current.open();
        }, [socket]);

        function emit(event, data) {
            socket.current.emit(event, data);
        }

        useEffect(() => {
            const s = socket.current;
            s.open();
            user.name = localStorage.getItem("chatName");
            while (!user.name) user.name = prompt("Enter name to chat").trim();
            localStorage.setItem("chatName", user.name);
            s.on("connect", onConnect);
            s.on("id", onNewId);
            s.on("disconnect", onDisconnect);
            return function cleanup() {
                s.off("disconnect", onDisconnect);
                s.close();
                s.off("connect", onConnect);
                s.off("id", onNewId);
            };
        }, [user, socket, onConnect, onNewId, onDisconnect]);

        return {
            loading: loading,
            me: user,
            setUsername: setUsername,
            socket: socket,
            send: (msg) => emit("message", msg),
        };
    }

    static Provider({ children }) {
        const context = ChatAPI.useSocket();
        return (
            <ChatContext.Provider value={context}>
                {children}
            </ChatContext.Provider>
        );
    }

    render() {
        return <ChatAPI.Provider>{this.props.children}</ChatAPI.Provider>;
    }

    static subscribeToUsers() {
        const [users, setUsers] = useState({});
        const { loading, socket, me } = useContext(ChatContext);
        const updateUsers = useCallback(
            (users) => {
                if (me.id) users[me.id] = ["ME"];
                setUsers(users);
            },
            [me, setUsers]
        );
        useEffect(() => {
            const s = socket.current;
            if (!loading) {
                s.on("users", updateUsers);
                return function clearnup() {
                    s.off("users", updateUsers);
                };
            }
        }, [updateUsers, socket, loading]);
        return users;
    }

    static subscribeToMessages() {
        const [messages, setMessages] = useState([]);
        const { loading, socket, me } = useContext(ChatContext);
        const updateMessages = useCallback(
            (messages) => {
                setMessages(
                    messages.map((msg) => {
                        const isMine = msg.senderId === me.id;
                        msg.username = isMine ? "me" : msg.username;
                        msg.mine = isMine;
                        return msg;
                    })
                );
            },
            [setMessages, me]
        );
        useEffect(() => {
            const s = socket.current;
            if (!loading) {
                s.on("message", updateMessages);
                return function cleanup() {
                    s.off("message", updateMessages);
                };
            }
        }, [updateMessages, socket, loading]);
        return messages;
    }

    static subscribeToIP() {
        const { loading, socket } = useContext(ChatContext);
        const [ip, setIP] = useState({});
        useEffect(() => {
            const s = socket.current;
            if (!loading) {
                s.on("ip", setIP);
                return function cleanup() {
                    s.off("ip", setIP);
                };
            }
        }, [loading, socket, setIP]);
        return ip;
    }

    static useContext() {
        return useContext(ChatAPI.Context);
    }

    static isLoading() {
        return ChatAPI.useContext().loading;
    }
}