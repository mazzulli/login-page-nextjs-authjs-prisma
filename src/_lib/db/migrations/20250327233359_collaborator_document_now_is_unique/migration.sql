/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `Collaborator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Collaborator_document_key" ON "Collaborator"("document");
