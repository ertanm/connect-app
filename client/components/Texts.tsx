import { useSockets } from "@/context/socketContext";
import { useRef } from "react";

function Texts() {
  const { socket, messages, chatRoomId, username, setMessages } = useSockets();

  const messagesRef = useRef(null);

  function handleMessages() {
    //@ts-ignore
    const message = messagesRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit("send-message", { chatRoomId, message, username });

    const date = new Date();

    setMessages([
      //@ts-ignore
      ...messages,
      {
        username: "You",
        message,
        time: `${date.getHours}:${date.getMinutes}`,
      },
    ]);
    //@ts-ignore
    messagesRef.current.value = "";
  }

  if (!chatRoomId) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        {/* @ts-ignore */}
        {messages.map(({ message, username }, index) => {
          return (
            <div key={index}>
              <div key={index}>
                <span>{username}</span>
                <span>{message}</span>
              </div>
            </div>
          );
        })}
        <div />
      </div>
      <div>
        <textarea rows={1} placeholder="Type a message" ref={messagesRef} />
        <button onClick={handleMessages}>SEND</button>
      </div>
    </div>
  );
}

export default Texts;
