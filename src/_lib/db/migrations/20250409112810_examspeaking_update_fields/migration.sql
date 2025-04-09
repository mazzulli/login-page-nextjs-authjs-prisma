/*
  Warnings:

  - You are about to drop the column `collaboratorId` on the `Exam` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_collaboratorId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "collaboratorId";
