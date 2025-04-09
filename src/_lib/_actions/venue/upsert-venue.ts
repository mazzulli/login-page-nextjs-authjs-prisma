"use server";

import db from "@/_lib/db/db";
import { venueSchema, VenueSchema } from "@/_lib/models/venue-schema";
import { revalidatePath } from "next/cache";

export const upsertVenue = async (data: VenueSchema) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  venueSchema.parse(data);
  await db.venue.upsert({
    where: { id: data.id ?? "" },
    update: data,
    create: data,
  });
  revalidatePath("/app/(auth)/schools");
};
