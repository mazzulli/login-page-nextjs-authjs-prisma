import { z } from "zod";

// schema for exams registers
export const examSchema = z.object({
  // exams
  id: z.string().uuid().optional(),
  date: z.date(),
  examDescription: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  notes: z.string().optional(),
  venue: z.string().optional(),

  // // Supervisor schema
  // idSupervisor: z.string().uuid().optional(),
  // qtyHoursSupervisor: z.number().optional(),
  // qtyExtraValueSupervisor: z.number().optional(),

  // // Invigilator
  // idInvigilator: z.string().uuid().optional(),
  // qtyHoursInvigilator: z.number().optional(),
  // qtyExtraValueInvigilator: z.number().optional(),

  // // Speaking
  // idSpeaking: z.string().uuid().optional(),
  // examApplied: z.string().optional(),
  // qtyHoursSpeaking: z.number().optional(),
  // qtyExtraValueSpeaking: z.number().optional(),

  // price: z.string().refine(
  //   (val) => {
  //     const number = parseFloat(val.replace(/\D/g, "")) / 100;
  //     return !isNaN(number) && number > 0;
  //   },
  //   {
  //     message: "Value has to be a positive number.",
  //   }
  // ),
});

export type ExamSchema = z.infer<typeof examSchema>;

// schema for card configuration
export const examConfigSchema = z.object({
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
export type ExamConfigSchema = z.infer<typeof examConfigSchema>;
