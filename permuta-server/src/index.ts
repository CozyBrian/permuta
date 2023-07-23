/* eslint-disable import/first */
require("dotenv").config();
require("module-alias/register");

import http from "http";
import app from "./app";
import HostelData from "./data/hostels_final.json";
import Prisma from "./services/prisma";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

async function addHostels() {
  console.log("Adding hostels...");
  for (const hostel of HostelData) {
    const hotel = await Prisma.hostels.create({
      data: {
        name: hostel.name,
        location: hostel.location,
      },
    });
    console.log(`Added hostel ${hotel.name} with id:${hotel.id}`);
  }
  console.log("Done adding hostels");
}

async function startServer() {
  server.listen(PORT, () => {
    console.log(`${"-".repeat(16)}PERMUTA SERVER${"-".repeat(16)}`);
    console.log(`Listening on port ${PORT}`);
  });
  addHostels();
}

startServer();
