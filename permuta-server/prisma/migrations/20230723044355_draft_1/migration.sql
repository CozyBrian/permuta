/*
  Warnings:

  - You are about to drop the column `user_id` on the `items` table. All the data in the column will be lost.
  - Added the required column `seller_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "item_status" AS ENUM ('INSTOCK', 'OUT_OF_STOCK', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "auction_status" AS ENUM ('OPEN', 'CLOSE');

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_user_id_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "user_id",
ADD COLUMN     "seller_id" TEXT NOT NULL,
ADD COLUMN     "status" "item_status" NOT NULL DEFAULT 'INSTOCK';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" "gender" NOT NULL DEFAULT 'MALE';

-- CreateTable
CREATE TABLE "auctions" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "starting_price" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,
    "status" "auction_status" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "auctions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bids" (
    "id" TEXT NOT NULL,
    "auction_id" TEXT NOT NULL,
    "bidder_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auction_winners" (
    "id" TEXT NOT NULL,
    "auction_id" TEXT NOT NULL,
    "winner_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auction_winners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auctions_item_id_key" ON "auctions"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "auction_winners_auction_id_key" ON "auction_winners"("auction_id");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auctions" ADD CONSTRAINT "auctions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auctions" ADD CONSTRAINT "auctions_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_bidder_id_fkey" FOREIGN KEY ("bidder_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_winners" ADD CONSTRAINT "auction_winners_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_winners" ADD CONSTRAINT "auction_winners_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
