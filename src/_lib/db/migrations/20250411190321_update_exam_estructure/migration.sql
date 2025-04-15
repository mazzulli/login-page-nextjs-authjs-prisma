-- CreateTable
CREATE TABLE "_CollaboratorToExam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CollaboratorToExam_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CollaboratorToExam_B_index" ON "_CollaboratorToExam"("B");

-- AddForeignKey
ALTER TABLE "_CollaboratorToExam" ADD CONSTRAINT "_CollaboratorToExam_A_fkey" FOREIGN KEY ("A") REFERENCES "Collaborator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollaboratorToExam" ADD CONSTRAINT "_CollaboratorToExam_B_fkey" FOREIGN KEY ("B") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
