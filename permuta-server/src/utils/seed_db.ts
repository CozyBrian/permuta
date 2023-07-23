import Prisma from "../services/prisma";
import HostelData from "../data/hostels_final.json";
import CategoryData from "../data/category_seed.json";

export async function addHostels() {
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

export async function addCategories() {
  console.log("Adding categories...");
  for (const category of CategoryData) {
    try {
      const cat = await Prisma.category.create({
        data: {
          name: category.title,
          description: category.description,
        },
      });
      console.log(`Added category ${cat.name} with id: ${cat.id}`);
    } catch (error) {
      console.log("Error adding category");
    }
  }
  console.log("Done adding categories");
}
