import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string({
      message: "Passwords must match",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password and Password must be the same",
    path: ["confirmPassword"],
  });

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
