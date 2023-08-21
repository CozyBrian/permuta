import { Server } from "socket.io";
import http from "http";

export { default as SocketHandler } from "./socketHandler";

export function getSocketIO(
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
) {
  return new Server(server, {
    cors: {
      origin: "*",
    },
  });
}
