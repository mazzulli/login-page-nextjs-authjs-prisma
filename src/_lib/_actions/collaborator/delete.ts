"use server";

import db from "@/_lib/db/db";
import { deleteSchema, DeleteSchema } from "@/_lib/models/delete-schema";
import { revalidatePath } from "next/cache";

export const deleteCollaborator = async ({ id }: DeleteSchema) => {
  deleteSchema.parse({ id });
  await db.collaborator.delete({
    where: {
      id,
    },
  });
  revalidatePath("/collaborators");
};
