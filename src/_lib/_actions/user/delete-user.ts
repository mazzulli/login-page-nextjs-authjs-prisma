"use server";

import db from "@/_lib/db/db";
import { deleteSchema, DeleteSchema } from "@/_lib/models/delete-schema";
import { revalidatePath } from "next/cache";

export const deleteUser = async ({ id }: DeleteSchema) => {
  deleteSchema.parse({ id });
  await db.user.delete({
    where: {
      id,
    },
  });
  revalidatePath("/users");
};
