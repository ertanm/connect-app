import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
import logger from "./utils/logger";
import { version } from "../package.json";

import socket from "./socket";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/api", (req, res, next) => {
  res.json({
    user: "ertan",
  });
});

app.get("/", (_, res) => res.send(`Server running at version ${version}`));

httpServer.listen(port, host, () => {
  logger.info(`http://${host}:${port} 🚀`);

  socket({ io });
});
