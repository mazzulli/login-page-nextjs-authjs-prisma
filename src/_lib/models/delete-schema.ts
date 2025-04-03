import { z } from "zod";

export const deleteSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteSchema = z.infer<typeof deleteSchema>;
