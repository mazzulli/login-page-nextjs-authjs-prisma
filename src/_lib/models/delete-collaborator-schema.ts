import { z } from "zod";

export const deleteCollaboratorSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteVenueSchema = z.infer<typeof deleteCollaboratorSchema>;
