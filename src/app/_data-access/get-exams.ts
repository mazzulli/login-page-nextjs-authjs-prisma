import "server-only";

import db from "@/_lib/db/db";
import { TestValue } from "@prisma/client";

export const getExams = async (): Promise<TestValue[]> => {
  return db.testValue.findMany({
    orderBy: {
      name: "asc",
    },
  });
};
