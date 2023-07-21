import http from "http";
import app from "./app";
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
