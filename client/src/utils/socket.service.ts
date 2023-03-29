import { io, Socket } from "socket.io-client";

let socket: Socket;

export const startSocketConnnection = () => {
  const socket = io("http://localhost:4000", {});

  console.log("Connecting the socket!"); //Works
};

export const disconnectSocket = () => {
  console.log("Disconnected from the socket");
  if (socket) socket.disconnect();
};

export const chatSub = async (cb: any) => {
  socket.emit("my message", "Hello there from React.");

  socket.on("my broadcast", (msg) => {
    return cb(null, msg);
  });
};
