-- CreateEnum
CREATE TYPE "EnumCollaboratorAccessType" AS ENUM ('Supervisor', 'Invigilator', 'Speaking');

-- CreateEnum
CREATE TYPE "EnumUserAccessType" AS ENUM ('Administrator', 'Supervisor');

-- AlterTable
ALTER TABLE "Collaborator" ADD COLUMN     "accessType" TEXT;

-- DropEnum
DROP TYPE "EnumAccessType";
