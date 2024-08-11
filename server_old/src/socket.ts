import { Server, Socket } from "socket.io";
import log from "./utils/logger";
import { nanoid } from "nanoid";

const chatRooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
  log.info("Socket is attached");

  io.on("connection", (socket: Socket) => {
    log.info(`⚡: User Connected -> ${socket.id}`);

    socket.emit("chatRooms", chatRooms);

    socket.on("create-room", ({ chatRoomName }) => {
      log.info(chatRoomName);

      //create room id(nanoid) -> join > broadcast -> emit finally

      const chatRoomId = nanoid();
      chatRooms[chatRoomId] = {
        name: chatRoomName,
      };

      socket.join(chatRoomId);

      socket.broadcast.emit("chatRooms", chatRooms);

      socket.emit("chatRooms", chatRooms);

      socket.emit("joined-chatRoom", chatRoomId);
    });

    socket.on("send-message", ({ chatRoomId, message, username }) => {
      const date = new Date();

      socket.to(chatRoomId).emit("message", {
        message,
        username,
        time: `${date.getHours()}:${date.getMinutes()}`,
      });
    });

    socket.on("join-room", (chatRoomId) => {
      socket.join(chatRoomId);
      socket.emit("joined-chatRoom", chatRoomId);
    });

    socket.on("disconnect", () => {
      log.info("⚡: User is disconnected");
    });
  });
}

export default socket;
