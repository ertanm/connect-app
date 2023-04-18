import { socketUrl } from "@/config/default";
import io, { Socket } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";

const socket = io(socketUrl);

interface UserContext {
  socket: Socket;
  username?: string;
  setUsername: Function;
  chatRoomId?: string;
  chatRooms: object;
  messages?: { message: string; time: string; username: string }[];
  setMessages: Function;
}

const SocketContext = createContext<UserContext>({
  socket,
  setUsername: () => false,
  chatRooms: {},
  messages: [],
  setMessages: () => false,
});

function SocketProvider(props: any) {
  const [username, setUsername] = useState("");
  const [chatRoomId, setChatRoomId] = useState("");
  const [chatRooms, setChatRooms] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.onfocus = () => {
      document.title = "Connect App";
    };
  }, []);

  socket.on("chatRooms", (value) => {
    setChatRooms(value);
  });

  socket.on("joined-chatRoom", (value) => {
    setChatRoomId(value);
    setMessages([]);
  });

  socket.on("message", ({ message, username, time }) => {
    if (!document.hasFocus()) {
      document.title = "New messages...";
    }
    //@ts-ignore
    setMessages([...messages, { message, username, time }]);
  });

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        chatRoomId,
        chatRooms,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketProvider;
