"use server";

import db from "@/_lib/db/db";
import {
  deleteVenueSchema,
  DeleteVenueSchema,
} from "@/_lib/models/delete-venue-schema";
import { revalidatePath } from "next/cache";

export const deleteVenue = async ({ id }: DeleteVenueSchema) => {
  deleteVenueSchema.parse({ id });
  await db.venue.delete({
    where: {
      id,
    },
  });
  revalidatePath("/venues");
};
