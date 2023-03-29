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
    <div className="border flex flex-col items-center h-full gap-10 justify-evenly">
      <div className="border">
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
      <div className="w-60 flex gap-2">
        <input
          placeholder="Type a message"
          ref={messagesRef}
          className="focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
        />
        <button
          onClick={handleMessages}
          className="font-bold inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
          SEND
        </button>
      </div>
    </div>
  );
}

export default Texts;
