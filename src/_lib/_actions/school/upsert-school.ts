"use server";

import db from "@/_lib/db/db";
import { SchoolSchema, schoolSchema } from "@/_lib/models/school-schema";
import { revalidatePath } from "next/cache";

export const upsertSchool = async (data: SchoolSchema) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  schoolSchema.parse(data);
  await db.venue.upsert({
    where: { id: data.id ?? "" },
    update: data,
    create: data,
  });
  revalidatePath("/app/(auth)/schools");
};
