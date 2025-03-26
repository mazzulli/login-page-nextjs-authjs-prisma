/*
  Warnings:

  - Made the column `name` on table `Venue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Venue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Venue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `district` on table `Venue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Venue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postalCode` on table `Venue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number` on table `Venue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "district" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "postalCode" SET NOT NULL,
ALTER COLUMN "number" SET NOT NULL;
