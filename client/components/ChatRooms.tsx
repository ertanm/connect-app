//this is for creating a chat room
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
      <div className="border h-max">
        <ul>
          {Object.keys(chatRooms).map((key) => {
            return (
              <div key={key} className="mb-10 border">
                <button
                  disabled={key === chatRoomId}
                  //@ts-ignore
                  title={`Join ${chatRooms[key].name}`}
                  onClick={() => handleJoinedRoom(key)}>
                  {/* @ts-ignore */}
                  {chatRooms[key].name}
                </button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-2 mb-5">
        <input
          placeholder="Chat Room Name"
          ref={newChatRoomRef}
          className="focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
        />
        <button
          onClick={handleChatting}
          className="font-bold inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
          Start Chatting
        </button>
      </div>
    </div>
  );
}

export default ChatRooms;
