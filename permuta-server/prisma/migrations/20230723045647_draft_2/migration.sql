/*
  Warnings:

  - Added the required column `location` to the `hostels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hostels" ADD COLUMN     "location" TEXT NOT NULL;
