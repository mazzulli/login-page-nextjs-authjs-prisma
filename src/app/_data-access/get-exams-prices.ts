import "server-only";

import db from "@/_lib/db/db";
import { ExamValue } from "@prisma/client";

export const getExamsPrices = async (): Promise<ExamValue[]> => {
  const result = await db.examValue.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return result;
};
