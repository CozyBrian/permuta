/* eslint-disable import/first */
require("dotenv").config();
require("module-alias/register");

import http from "http";
import app from "./app";
import { SocketHandler } from "./services/socketIO";
import { getSocketIO } from "./lib/socketIO";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`${"-".repeat(16)}PERMUTA SERVER${"-".repeat(16)}`);
    console.log(`Listening on port ${PORT}`);
  });
  const io = getSocketIO(server);
  io.on("connection", SocketHandler);
}

startServer();
