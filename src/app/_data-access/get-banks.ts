// import "server-only";

import db from "@/_lib/db/db";
import { Banks } from "@prisma/client";

export const getBanks = async (): Promise<Banks[]> => {
  return db.banks.findMany({
    orderBy: {
      code: "asc",
    },
  });
};
