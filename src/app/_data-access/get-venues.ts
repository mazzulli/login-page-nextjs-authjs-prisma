import "server-only";

import db from "@/_lib/db/db";
import { Venue } from "@prisma/client";

export const getVenues = async (): Promise<Venue[]> => {
  return await db.venue.findMany({});
};
