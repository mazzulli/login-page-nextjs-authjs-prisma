"use server";

import db from "@/lib/db/db";
import { SchoolSchema, schoolSchema } from "@/lib/models/school-schema";

export const createSchool = async (data: SchoolSchema) => {
  schoolSchema.parse(data);
  await db.venue.create({
    data: {
      name: data.name,
      address: data.address + ", " + data.number,
      city: data.city,
      district: data.district,
      state: data.state,
      postalCode: data.zipCode,
    },
  });
};
