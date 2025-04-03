/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestInvigilator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestSpeaking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestSupervisor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_collaboratorId_fkey";

-- DropForeignKey
ALTER TABLE "TestInvigilator" DROP CONSTRAINT "TestInvigilator_collaboratorId_fkey";

-- DropForeignKey
ALTER TABLE "TestSpeaking" DROP CONSTRAINT "TestSpeaking_collaboratorId_fkey";

-- DropForeignKey
ALTER TABLE "TestSupervisor" DROP CONSTRAINT "TestSupervisor_collaboratorId_fkey";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "TestInvigilator";

-- DropTable
DROP TABLE "TestSpeaking";

-- DropTable
DROP TABLE "TestSupervisor";

-- DropTable
DROP TABLE "TestValue";

-- CreateTable
CREATE TABLE "ExamValue" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "idVenue" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "testDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collaboratorId" TEXT NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamSupervisor" (
    "id" TEXT NOT NULL,
    "idExam" TEXT NOT NULL,
    "idCollaborator" TEXT NOT NULL,
    "qtyHours" DOUBLE PRECISION NOT NULL,
    "extraValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collaboratorId" TEXT NOT NULL,

    CONSTRAINT "ExamSupervisor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamInvigilator" (
    "id" TEXT NOT NULL,
    "idExam" TEXT NOT NULL,
    "idCollaborator" TEXT NOT NULL,
    "qtyHours" DOUBLE PRECISION NOT NULL,
    "extraValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collaboratorId" TEXT NOT NULL,

    CONSTRAINT "ExamInvigilator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamSpeaking" (
    "id" TEXT NOT NULL,
    "idExam" TEXT NOT NULL,
    "idCollaborator" TEXT NOT NULL,
    "idExamValue" TEXT NOT NULL,
    "examValue" DOUBLE PRECISION NOT NULL,
    "qtyHours" DOUBLE PRECISION NOT NULL,
    "extraValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collaboratorId" TEXT NOT NULL,

    CONSTRAINT "ExamSpeaking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "Collaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSupervisor" ADD CONSTRAINT "ExamSupervisor_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "Collaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamInvigilator" ADD CONSTRAINT "ExamInvigilator_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "Collaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSpeaking" ADD CONSTRAINT "ExamSpeaking_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "Collaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
