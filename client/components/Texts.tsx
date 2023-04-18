import { useSockets } from "@/context/socketContext";
import { useEffect, useRef } from "react";

function Texts() {
  const { socket, messages, chatRoomId, username, setMessages } = useSockets();

  const messagesRef = useRef(null);

  const messageEndRef = useRef(null);
  //My working solution
  // function handleMessages() {
  //   //@ts-ignore
  //   const message = messagesRef.current.value;

  //   if (!String(message).trim()) {
  //     return;
  //   }

  //   socket.emit("send-message", { chatRoomId, message, username });

  //   const date = new Date();

  //   setMessages([
  //     //@ts-ignore
  //     ...messages,
  //     {
  //       username: "You",
  //       message,
  //       time: `${date.getHours}:${date.getMinutes}`,
  //     },
  //   ]);
  //   //@ts-ignore
  //   messagesRef.current.value = "";
  // }

  function handleMessages(): void {
    const message = messagesRef.current?.value?.trim();
    if (!message) {
      return;
    }

    socket.emit("send-message", { chatRoomId, message, username });

    const date = new Date();
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`;

    setMessages((prevState) => [
      ...prevState,
      {
        username: "You",
        message,
        time: formattedTime,
      },
    ]);

    messagesRef.current!.value = "";
  }

  useEffect(() => {
    //@ts-ignore
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chatRoomId) {
    return <div></div>;
  }

  return (
    <div className="border flex flex-col items-center h-full gap-10 justify-evenly wrapper">
      <div className="border flex-1 overflow-y-scroll max-h-full w-full messagesList">
        {/* If there are no messages */}
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 6.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-lg font-medium">No messages yet</p>
          </div>
        ) : (
          // If there are messages
          <div className="messageList flex-1 overflow-y-scroll p-4">
            {messages.map(({ message, username, time }, index) => {
              return (
                <div
                  key={index}
                  className="message mb-4 p-4 rounded-lg border border-gray-400 bg-gray-100">
                  <div key={index} className="messageInner">
                    <span className="messageSender text-xs font-medium text-gray-500">
                      {username} - {time}
                    </span>
                    <span className="messageBody break-words text-sm ml-2">
                      {message}
                    </span>
                  </div>
                </div>
              );
            })}
            {/* This is used to scroll to the bottom of the messages */}
            <div ref={messageEndRef} />
          </div>
        )}
      </div>
      <div className="w-full flex gap-2">
        <input
          placeholder="Type a message"
          ref={messagesRef}
          className="focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 w-full"
        />
        <button
          onClick={handleMessages}
          className="font-medium inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
          SEND
        </button>
      </div>
    </div>
  );
}

export default Texts;
