import "server-only";

import db from "@/_lib/db/db";
import { Exam } from "@prisma/client";

export const getExams = async (): Promise<Exam[]> => {
  const result = await db.exam.findMany({
    include: {
      supervisor: true,
      invigilator: true,
      speaking: true,
    },
    orderBy: {
      examDescription: "asc",
    },
  });
  return result;
};
