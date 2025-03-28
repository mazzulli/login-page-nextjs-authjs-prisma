-- DropForeignKey
ALTER TABLE "Collaborator" DROP CONSTRAINT "Collaborator_bankId_fkey";

-- AlterTable
ALTER TABLE "Collaborator" ALTER COLUMN "agency" DROP NOT NULL,
ALTER COLUMN "account" DROP NOT NULL,
ALTER COLUMN "meiNumber" DROP NOT NULL,
ALTER COLUMN "bankId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Banks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
