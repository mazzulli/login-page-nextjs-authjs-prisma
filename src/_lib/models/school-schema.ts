import { z } from "zod";

export const schoolSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, {
    message: "School name must be at least 2 characters long.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters long.",
  }),
  number: z.string().min(1, {
    message: "Number is required.",
  }),
  district: z.string().min(2, {
    message: "Disctrict must be at least 2 characters long.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters long.",
  }),
  state: z.string().length(2, {
    message: "Invalid.",
  }),
  postalCode: z
    .string()
    .regex(/^\d+$/, {
      message: "Input only numbers.",
    })
    .length(8, {
      message: "Zip code must be 8 characters long.",
    }),
});

export type SchoolSchema = z.infer<typeof schoolSchema>;
