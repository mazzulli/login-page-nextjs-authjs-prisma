/*
  Warnings:

  - You are about to drop the column `idCollaborator` on the `ExamInvigilator` table. All the data in the column will be lost.
  - You are about to drop the column `idExam` on the `ExamInvigilator` table. All the data in the column will be lost.
  - You are about to drop the column `examValue` on the `ExamSpeaking` table. All the data in the column will be lost.
  - You are about to drop the column `idCollaborator` on the `ExamSpeaking` table. All the data in the column will be lost.
  - You are about to drop the column `idExam` on the `ExamSpeaking` table. All the data in the column will be lost.
  - You are about to drop the column `idExamValue` on the `ExamSpeaking` table. All the data in the column will be lost.
  - You are about to alter the column `qtyHours` on the `ExamSpeaking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `extraValue` on the `ExamSpeaking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the column `idCollaborator` on the `ExamSupervisor` table. All the data in the column will be lost.
  - You are about to drop the column `idExam` on the `ExamSupervisor` table. All the data in the column will be lost.
  - Added the required column `invigilatorId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speadkingId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisorId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examId` to the `ExamInvigilator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examId` to the `ExamSpeaking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examName` to the `ExamSpeaking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examPrice` to the `ExamSpeaking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examId` to the `ExamSupervisor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "invigilatorId" TEXT NOT NULL,
ADD COLUMN     "speadkingId" TEXT NOT NULL,
ADD COLUMN     "supervisorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExamInvigilator" DROP COLUMN "idCollaborator",
DROP COLUMN "idExam",
ADD COLUMN     "examId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExamSpeaking" DROP COLUMN "examValue",
DROP COLUMN "idCollaborator",
DROP COLUMN "idExam",
DROP COLUMN "idExamValue",
ADD COLUMN     "examId" TEXT NOT NULL,
ADD COLUMN     "examName" TEXT NOT NULL,
ADD COLUMN     "examPrice" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "qtyHours" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "extraValue" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "ExamSupervisor" DROP COLUMN "idCollaborator",
DROP COLUMN "idExam",
ADD COLUMN     "examId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "ExamSupervisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_invigilatorId_fkey" FOREIGN KEY ("invigilatorId") REFERENCES "ExamInvigilator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_speadkingId_fkey" FOREIGN KEY ("speadkingId") REFERENCES "ExamSpeaking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
