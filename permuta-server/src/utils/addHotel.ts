import Prisma from "../services/prisma";
import HostelData from "../data/hostels_final.json";

export default async function addHostels() {
  console.log("Adding hostels...");
  for (const hostel of HostelData) {
    try {
      const hotel = await Prisma.hostels.create({
        data: {
          name: hostel.name,
          location: hostel.location,
        },
      });
      console.log(`Added hostel ${hotel.name} with id:${hotel.id}`);
    } catch (error) {
      console.log("Error adding hostel");
    }
  }
  console.log("Done adding hostels");
}
