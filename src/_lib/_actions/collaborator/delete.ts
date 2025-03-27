"use server";

import db from "@/_lib/db/db";
import {
  deleteCollaboratorSchema,
  DeleteCollaboratorSchema,
} from "@/_lib/models/delete-collaborator-schema";
import { revalidatePath } from "next/cache";

export const deleteCollaborator = async ({ id }: DeleteCollaboratorSchema) => {
  deleteCollaboratorSchema.parse({ id });
  await db.collaborator.delete({
    where: {
      id,
    },
  });
  revalidatePath("/collaborators");
};
