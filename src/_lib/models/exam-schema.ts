import { z } from "zod";

export const examSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  price: z.string().refine(
    (val) => {
      const number = parseFloat(val.replace(/\D/g, "")) / 100;
      return !isNaN(number) && number > 0;
    },
    {
      message: "Value has to be a positive number.",
    }
  ),
});

export type ExamSchema = z.infer<typeof examSchema>;
