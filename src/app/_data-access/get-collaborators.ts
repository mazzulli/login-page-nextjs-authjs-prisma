import "server-only";

import db from "@/_lib/db/db";
import { Collaborator } from "@prisma/client";

export const getCollaborators = async (): Promise<Collaborator[]> => {
  const result = await db.collaborator.findMany({
    include: {
      banks: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return result;
};
