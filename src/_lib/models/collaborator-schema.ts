import { CNPJValidation } from "@/_utils/cnpjValidation";
import { cpfValidation } from "@/_utils/cpfValidation";
import { z } from "zod";

export const collaboratorSchema = z.object({
  id: z.string().uuid().optional(),
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
  bankCode: z.string().max(3, {
    message: "Bank code must be 3 characters long.",
  }),
  bankName: z.string().min(5, {
    message: "Invalid bank name.",
  }),
  agency: z.string().refine((val) => /^[0-9]+(-?[0-9])?$/.test(val), {
    message: "Invalid agency code. Use only numbers and a opcional digit.",
  }),
  account: z.string().refine((val) => /^[0-9]+(-?[0-9])?$/.test(val), {
    message: "Invalid account code. Use only numbers and a opcional digit.",
  }),
  meiNumber: z.string().refine((val) => CNPJValidation(val), {
    message: "Invalid number",
  }),
});

export type CollaboratorSchema = z.infer<typeof collaboratorSchema>;
