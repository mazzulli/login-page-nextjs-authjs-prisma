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
  bankId: z
    .string()
    .uuid({
      message: "Invalid bank code",
    })
    .optional()
    .or(z.literal("")),
  bankCode: z.string().optional(),
  bankName: z.string().optional(),
  agency: z
    .preprocess((val) => (val === "" ? undefined : val), z.string())
    .refine(
      (val) => {
        if (val === null) return true;
        return /^[0-9]+(-?[0-9])?$/.test(val);
      },
      {
        message:
          "Invalid agency number. Use only numbers and a opcional digit.",
      }
    )
    .optional()
    .or(z.literal("")),
  account: z
    .string()
    .refine((val) => /^[0-9]+(-?[0-9])?$/.test(val), {
      message: "Invalid account code. Use only numbers and a opcional digit.",
    })
    .optional()
    .or(z.literal("")),
  meiNumber: z
    .string()
    .refine((val) => CNPJValidation(val), { message: "Invalid number" })
    .optional()
    .or(z.literal("")),
});

export type CollaboratorSchema = z.infer<typeof collaboratorSchema>;
