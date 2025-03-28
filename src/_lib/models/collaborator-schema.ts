import { CNPJValidation } from "@/_utils/cnpjValidation";
import { cpfValidation } from "@/_utils/cpfValidation";
import { z } from "zod";

export const collaboratorSchema = z.object({
  id: z.string().uuid().optional(),
  bankId: z.string().uuid().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  email: z.string().email(),
  phoneNumber: z.string().min(11, {
    message: "Is required.",
  }),
  document: z.string().refine((val) => cpfValidation(val), {
    message: "Invalid document",
  }),
  agency: z
    .string()
    .refine((val) => /^[0-9]+(-?[0-9])?$/.test(val), {
      message: "Invalid agency code. Use only numbers and a opcional digit.",
    })
    .optional(),
  account: z
    .string()
    .refine((val) => /^[0-9]+(-?[0-9])?$/.test(val), {
      message: "Invalid account code. Use only numbers and a opcional digit.",
    })
    .optional(),
  meiNumber: z
    .string()
    .refine((val) => CNPJValidation(val), { message: "Invalid number" })
    .optional(),
});

export type CollaboratorSchema = z.infer<typeof collaboratorSchema>;
