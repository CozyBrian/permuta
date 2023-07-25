import Prisma from "../services/prisma";
import HostelData from "../data/hostels_final.json";
import CategoryData from "../data/category_seed.json";
import ItemsData from "../data/items_seed.json";
import { itemsCreateSchema } from "../schema/items.schema";
import axios from "axios";
import { IItemCreate } from "../types";
import { condition, item_status } from "@prisma/client";

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

export async function addItems() {
  console.log("Adding items...");
  for (const tempitem of ItemsData) {
    try {
      const item = await itemsCreateSchema.parseAsync(tempitem);
      const itm = await Prisma.items.create({
        data: {
          ...item,
        },
      });
      console.log(`Added item ${itm.name} with id: ${itm.id}`);
    } catch (error) {
      console.log("Error adding item");
    }
  }
  console.log("Done adding items");
}

// {
//   id: 18,
//   title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
//   price: 9.85,
//   description: '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
//   category: "women's clothing",
//   image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
//   rating: { rate: 4.7, count: 130 }
// },

export async function fakeStoreApi() {
  const res = await axios.get("https://fakestoreapi.com/products");
  const data = await res.data;
  console.log(data);
  const categories = await Prisma.category.findMany({
    select: {
      id: true,
    },
  });
  const statuses: item_status[] = ["INSTOCK", "OUT_OF_STOCK", "UNAVAILABLE"];
  const conditions: condition[] = ["USED", "SLIGHTLY_USED", "NEW"];
  const seller_id = "eab3a26d-798d-408c-835b-9156f40f603a";

  for (const storeItem of data) {
    const tempitem: IItemCreate = {
      category_id: getRandomItemInArray(categories).id,
      condition: getRandomItemInArray(conditions),
      description: storeItem.description,
      image_url: storeItem.image,
      name: storeItem.title,
      price: storeItem.price,
      seller_id,
      status: getRandomItemInArray(statuses),
    };
    try {
      const item = await itemsCreateSchema.parseAsync(tempitem);
      const itm = await Prisma.items.create({
        data: {
          ...item,
        },
      });
      console.log(`Added item ${itm.name} with id: ${itm.id}`);
    } catch (error) {
      console.log("Error adding item");
    }
  }
}

// get random category
function getRandomItemInArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
