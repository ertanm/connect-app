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
    <div>
      <input placeholder="Chat Room Name" ref={newChatRoomRef} />
      <button onClick={handleChatting}>Start Chatting</button>

      <ul>
        {Object.keys(chatRooms).map((key) => {
          return (
            <div key={key}>
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
  );
}

export default ChatRooms;
