/*
  Warnings:

  - You are about to drop the column `invigilatorId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `speadkingId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `Exam` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_collaboratorId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_invigilatorId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_speadkingId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_userId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_venueId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "invigilatorId",
DROP COLUMN "speadkingId",
DROP COLUMN "supervisorId",
DROP COLUMN "venueId",
ALTER COLUMN "collaboratorId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "Collaborator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
