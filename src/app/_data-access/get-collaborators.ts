import "server-only";

import db from "@/_lib/db/db";
import { Collaborator } from "@prisma/client";

export const getCollaborators = async (): Promise<Collaborator[]> => {
  return db.collaborator.findMany({});
};
