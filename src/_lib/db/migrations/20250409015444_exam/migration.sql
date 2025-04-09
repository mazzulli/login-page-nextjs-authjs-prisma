/*
  Warnings:

  - You are about to drop the column `extraValue` on the `ExamInvigilator` table. All the data in the column will be lost.
  - You are about to alter the column `qtyHours` on the `ExamInvigilator` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the column `extraValue` on the `ExamSpeaking` table. All the data in the column will be lost.
  - You are about to drop the column `qtyHours` on the `ExamSpeaking` table. All the data in the column will be lost.
  - You are about to drop the column `extraValue` on the `ExamSupervisor` table. All the data in the column will be lost.
  - You are about to alter the column `qtyHours` on the `ExamSupervisor` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - Added the required column `userId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtyApplicants` to the `ExamSpeaking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExamInvigilator" DROP COLUMN "extraValue",
ALTER COLUMN "qtyHours" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "ExamSpeaking" DROP COLUMN "extraValue",
DROP COLUMN "qtyHours",
ADD COLUMN     "qtyApplicants" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ExamSupervisor" DROP COLUMN "extraValue",
ALTER COLUMN "qtyHours" SET DATA TYPE DECIMAL(65,30);

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
