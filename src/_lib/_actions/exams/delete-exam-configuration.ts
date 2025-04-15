"use server";

import db from "@/_lib/db/db";
import { deleteSchema, DeleteSchema } from "@/_lib/models/delete-schema";
import { revalidatePath } from "next/cache";

export const deleteExamConfiguration = async ({ id }: DeleteSchema) => {
  deleteSchema.parse({ id });
  const result = await db.examValue.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
  revalidatePath("/exam-configurations");
  return JSON.parse(JSON.stringify(result));
};
