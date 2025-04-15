/*
  Warnings:

  - You are about to drop the `_CollaboratorToExam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CollaboratorToExam" DROP CONSTRAINT "_CollaboratorToExam_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollaboratorToExam" DROP CONSTRAINT "_CollaboratorToExam_B_fkey";

-- DropTable
DROP TABLE "_CollaboratorToExam";
