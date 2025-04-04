/*
  Warnings:

  - You are about to drop the column `idVenue` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `testDescription` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `examDescription` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venueId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "idVenue",
DROP COLUMN "testDescription",
ADD COLUMN     "examDescription" TEXT NOT NULL,
ADD COLUMN     "venueId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
