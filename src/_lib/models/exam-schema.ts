import * as z from "zod";

// Tipos base
export interface Person {
  id: string;
  collaboratorId: string;
  collaboratorName: string;
  workedHours: number;
}

export interface Speaking {
  id: string;
  collaboratorId: string;
  collaboratorName: string;
  examTypeId: string;
  examTypeName: string;
  qtyApplicants: number;
}

export interface ExamData {
  id?: string;
  date: Date;
  venue: string;
  description: string;
  notes?: string;
  status?: string;
  supervisors: Person[];
  invigilators: Person[];
  speakings: Speaking[];
}

// Schema for Exam Information
export const examInformationSchema = z.object({
  id: z.string().optional(),
  date: z.date(),
  venue: z.string().min(1, "Venue is required"),
  description: z.string().min(1, "Description is required"),
  notes: z.string().optional(),
});

// Schema for Supervisor
export const supervisorSchema = z.object({
  supervisors: z.array(
    z.object({
      id: z.string(),
      collaboratorId: z.string(),
      collaboratorName: z.string().min(1, "Supervisor is required"),
      workedHours: z.coerce.number().min(0.1, "Hours must be greater than 0"),
    })
  ),
});

// Schema for Invigilator
export const invigilatorSchema = z.object({
  invigilators: z.array(
    z.object({
      id: z.string(),
      collaboratorId: z.string(),
      collaboratorName: z.string().min(1, "Invigilator is required"),
      workedHours: z.coerce.number().min(0.1, "Hours must be greater than 0"),
    })
  ),
});

// Schema for Speaking
export const speakingSchema = z.object({
  speakings: z.array(
    z.object({
      id: z.string(),
      collaboratorId: z.string(),
      collaboratorName: z.string().min(1, "Speaking is required"),
      examTypeId: z.string({ message: "Exam ID is required" }),
      examTypeName: z.string().min(1, "Exam name is required"),
      qtyApplicants: z.coerce.number().min(1, "Quantity must be at least 1"),
    })
  ),
});

// Combined schema for the entire form
export const examFormSchema = examInformationSchema
  .merge(supervisorSchema)
  .merge(invigilatorSchema)
  .merge(speakingSchema);

export type ExamFormValues = z.infer<typeof examFormSchema>;

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
