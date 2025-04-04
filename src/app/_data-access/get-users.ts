import "server-only";

import db from "@/_lib/db/db";
import { User } from "@prisma/client";

export const getUsers = async (): Promise<User[]> => {
  const result = await db.user.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return result;
};
