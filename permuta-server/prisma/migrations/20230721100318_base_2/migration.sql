/*
  Warnings:

  - Added the required column `year_of_study` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_hostel_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "year_of_study" TEXT NOT NULL,
ALTER COLUMN "hostel_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_hostel_id_fkey" FOREIGN KEY ("hostel_id") REFERENCES "hostels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
