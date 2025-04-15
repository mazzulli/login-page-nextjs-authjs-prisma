import "server-only";

import db from "@/_lib/db/db";
import { EnumCollaboratorAccessType } from "@prisma/client";

export type CollaboratorProps = {
  name: string;
  id: string;
};

export const getCollaboratorsByType = async (
  type: EnumCollaboratorAccessType
): Promise<CollaboratorProps[]> => {
  const result = await db.collaborator.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      accessType: {
        contains: type,
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  return result;
};
