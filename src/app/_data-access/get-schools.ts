import "server-only";

import db from "@/_lib/db/db";
import { Venue } from "@prisma/client";

export const getSchools = async (): Promise<Venue[]> => {
  return db.venue.findMany({});
};
