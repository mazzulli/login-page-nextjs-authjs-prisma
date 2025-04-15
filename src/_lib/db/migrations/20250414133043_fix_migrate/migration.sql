/*
  Warnings:

  - You are about to drop the column `testName` on the `ExamSpeaking` table. All the data in the column will be lost.
  - You are about to drop the column `testPrice` on the `ExamSpeaking` table. All the data in the column will be lost.
  - Added the required column `examValueId` to the `ExamSpeaking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamSpeaking" DROP COLUMN "testName",
DROP COLUMN "testPrice",
ADD COLUMN     "examValueId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ExamSpeaking" ADD CONSTRAINT "ExamSpeaking_examValueId_fkey" FOREIGN KEY ("examValueId") REFERENCES "ExamValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
