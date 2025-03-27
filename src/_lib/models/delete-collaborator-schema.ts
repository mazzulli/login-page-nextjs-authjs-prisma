import { z } from "zod";

export const deleteCollaboratorSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteCollaboratorSchema = z.infer<typeof deleteCollaboratorSchema>;
