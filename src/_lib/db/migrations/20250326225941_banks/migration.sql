/*
  Warnings:

  - Made the column `name` on table `Collaborator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Collaborator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `Collaborator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `document` on table `Collaborator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bankCode` on table `Collaborator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bankName` on table `Collaborator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `agency` on table `Collaborator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `account` on table `Collaborator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `meiNumber` on table `Collaborator` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Collaborator" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "document" SET NOT NULL,
ALTER COLUMN "bankCode" SET NOT NULL,
ALTER COLUMN "bankName" SET NOT NULL,
ALTER COLUMN "agency" SET NOT NULL,
ALTER COLUMN "account" SET NOT NULL,
ALTER COLUMN "meiNumber" SET NOT NULL;

-- CreateTable
CREATE TABLE "Banks" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Banks_pkey" PRIMARY KEY ("id")
);
