"use server";

import db from "@/_lib/db/db";
import { deleteSchema, DeleteSchema } from "@/_lib/models/delete-schema";
import { revalidatePath } from "next/cache";

export const deleteExam = async ({ id }: DeleteSchema) => {
  deleteSchema.parse({ id });
  const result = await db.exam.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
  revalidatePath("/exams");
  return JSON.parse(JSON.stringify(result));
};
