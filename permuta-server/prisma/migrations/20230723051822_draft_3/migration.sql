/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `hostels` will be added. If there are existing duplicate values, this will fail.
  - Made the column `hostel_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_hostel_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "hostel_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "hostels_name_key" ON "hostels"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_hostel_id_fkey" FOREIGN KEY ("hostel_id") REFERENCES "hostels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
