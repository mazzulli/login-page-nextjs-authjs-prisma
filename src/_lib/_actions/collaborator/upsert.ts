"use server";

import db from "@/_lib/db/db";
import {
  CollaboratorSchema,
  collaboratorSchema,
} from "@/_lib/models/collaborator-schema";
import { revalidatePath } from "next/cache";

export const upsertCollaborator = async (data: CollaboratorSchema) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  collaboratorSchema.parse(data);

  if (!data.id) {
    //verify if there is a email with the same email received
    const existingCollaborator = await db.collaborator.findFirst({
      where: {
        OR: [{ email: data.email }, { document: data.document }],
      },
    });

    if (existingCollaborator) {
      throw new Error("Email or document already registered.");
    }
  }

  // Convert array to comma-separated string
  const accessTypeString = data.accessType.join(", ");

  await db.collaborator.upsert({
    where: { id: data.id ?? "" },
    update: {
      ...data,
      accessType: accessTypeString,
    },
    create: {
      ...data,
      bankId: data.bankId === "" ? null : data.bankId,
      accessType: accessTypeString,
    },
  });

  revalidatePath("/collaborators");
};
