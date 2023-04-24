import { useSockets } from "@/context/socketContext";
import { useEffect, useRef } from "react";

function Texts() {
  const { socket, messages, chatRoomId, username, setMessages } = useSockets();

  const messagesRef = useRef(null);

  const messageEndRef = useRef(null);

  function handleMessages(): void {
    const date = new Date();
    //@ts-ignore
    const message = messagesRef.current?.value?.trim();
    if (!message) {
      return;
    }

    socket.emit("send-message", { chatRoomId, message, username });

    setMessages([
      //@ts-ignore
      ...messages,
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    //@ts-ignore
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
    <div className=" flex flex-col items-center h-full gap-10 justify-evenly wrapper">
      <div className=" flex-1 overflow-y-scroll max-h-full w-full messagesList">
        {/* If there are no messages */}
        {
          //@ts-ignore
          messages.length === 0 ? (
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
              {
                //@ts-ignore
                messages.map(({ message, username, time }, index) => {
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
                })
              }
              {/* This is used to scroll to the bottom of the messages */}
              <div ref={messageEndRef} />
            </div>
          )
        }
      </div>
      <div className="relative w-full flex gap-2">
        <input
          placeholder="Type a message"
          ref={messagesRef}
          className="focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 py-3 w-full"
        />
        <button
          onClick={handleMessages}
          className="absolute right-0 top-0 px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Texts;
