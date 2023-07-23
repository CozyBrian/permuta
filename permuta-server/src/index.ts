/* eslint-disable import/first */
require("dotenv").config();
require("module-alias/register");

import http from "http";
import app from "./app";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`${"-".repeat(16)}PERMUTA SERVER${"-".repeat(16)}`);
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
