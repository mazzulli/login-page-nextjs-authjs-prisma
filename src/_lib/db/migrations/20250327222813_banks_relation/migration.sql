/*
  Warnings:

  - You are about to drop the column `bankCode` on the `Collaborator` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `Collaborator` table. All the data in the column will be lost.
  - Added the required column `bankId` to the `Collaborator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collaborator" DROP COLUMN "bankCode",
DROP COLUMN "bankName",
ADD COLUMN     "bankId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Banks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
