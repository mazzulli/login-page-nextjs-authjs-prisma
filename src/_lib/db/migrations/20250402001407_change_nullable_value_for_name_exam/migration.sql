/*
  Warnings:

  - Made the column `name` on table `ExamValue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ExamValue" ALTER COLUMN "name" SET NOT NULL;
