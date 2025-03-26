import { z } from "zod";

export const deleteVenueSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteVenueSchema = z.infer<typeof deleteVenueSchema>;
