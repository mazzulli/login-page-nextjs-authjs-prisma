/*
  Warnings:

  - The primary key for the `ExamInvigilator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `ExamInvigilator` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ExamInvigilator` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ExamInvigilator` table. All the data in the column will be lost.
  - The primary key for the `ExamSpeaking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `ExamSpeaking` table. All the data in the column will be lost.
  - You are about to drop the column `examName` on the `ExamSpeaking` table. All the data in the column will be lost.
  - You are about to drop the column `examPrice` on the `ExamSpeaking` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ExamSpeaking` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ExamSpeaking` table. All the data in the column will be lost.
  - The primary key for the `ExamSupervisor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `ExamSupervisor` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ExamSupervisor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ExamSupervisor` table. All the data in the column will be lost.
  - Added the required column `testName` to the `ExamSpeaking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testPrice` to the `ExamSpeaking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamInvigilator" DROP CONSTRAINT "ExamInvigilator_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD CONSTRAINT "ExamInvigilator_pkey" PRIMARY KEY ("examId", "collaboratorId");

-- AlterTable
ALTER TABLE "ExamSpeaking" DROP CONSTRAINT "ExamSpeaking_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "examName",
DROP COLUMN "examPrice",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "testName" TEXT NOT NULL,
ADD COLUMN     "testPrice" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "qtyApplicants" SET DATA TYPE DECIMAL(65,30),
ADD CONSTRAINT "ExamSpeaking_pkey" PRIMARY KEY ("examId", "collaboratorId");

-- AlterTable
ALTER TABLE "ExamSupervisor" DROP CONSTRAINT "ExamSupervisor_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD CONSTRAINT "ExamSupervisor_pkey" PRIMARY KEY ("examId", "collaboratorId");
