"use server";

import db from "@/_lib/db/db";
import { SchoolSchema, schoolSchema } from "@/_lib/models/school-schema";
import { revalidatePath } from "next/cache";

export const createSchool = async (data: SchoolSchema) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  schoolSchema.parse(data);
  await db.venue.create({
    data: {
      name: data.name,
      address: data.address,
      number: data.number,
      city: data.city,
      district: data.district,
      state: data.state,
      postalCode: data.postalCode,
    },
  });
  revalidatePath("/app/(auth)/schools");
};
