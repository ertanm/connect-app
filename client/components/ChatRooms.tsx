import { useRef } from "react";
import { useSockets } from "@/context/socketContext";

function ChatRooms() {
  const { socket, chatRooms, chatRoomId } = useSockets();
  const newChatRoomRef = useRef(null);

  function handleChatting() {
    //@ts-ignore
    const chatRoomName = newChatRoomRef.current.value || "";
    if (!String(chatRoomName).trim()) return;

    socket.emit("create-room", { chatRoomName });

    //@ts-ignore
    newChatRoomRef.current.value = "";
  }

  //@ts-ignore
  function handleJoinedRoom(key) {
    if (key === chatRoomId) return;
    socket.emit("join-room", key);
  }

  return (
    <div className="flex flex-row gap-10">
      <div className="border h-max bg-gray-100 p-4 rounded-lg">
        <ul>
          {Object.keys(chatRooms).map((key) => {
            return (
              <div key={key} className="mb-4">
                <button
                  disabled={key === chatRoomId}
                  //@ts-ignore
                  title={`Join ${chatRooms[key].name}`}
                  onClick={() => handleJoinedRoom(key)}
                  className={`
                    bg-white px-4 py-2 rounded-lg shadow-md focus:outline-none
                    ${key === chatRoomId ? "bg-gray-300 cursor-default" : ""}
                  `}>
                  {/* @ts-ignore */}
                  {chatRooms[key].name}
                </button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <input
          placeholder="Chat Room Name"
          ref={newChatRoomRef}
          className="focus:outline-none focus:placeholder-gray-400 text-gray-700 placeholder-gray-500 px-4 py-2 rounded-lg bg-gray-100 shadow-md"
        />
        <button
          onClick={handleChatting}
          className="font-bold inline-flex items-center justify-center rounded-lg px-6 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none shadow-md">
          Start Chatting
        </button>
      </div>
    </div>
  );
}

export default ChatRooms;
