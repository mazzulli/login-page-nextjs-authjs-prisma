import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  email: z.string().email(),
  phoneNumber: z.string().min(11, {
    message: "Is required.",
  }),
  secret: z.string({
    required_error: "Password is required.",
  }),
  // accessType: z.string({
  //   message: "Please select at least one role.",
  // }),
  accessType: z.array(z.string()).min(1, {
    message: "Please select at least one role.",
  }),
  isActive: z.boolean().default(false),
});

export type UserSchema = z.infer<typeof userSchema>;
