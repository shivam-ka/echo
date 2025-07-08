import { z } from "zod";

export const usernameValidation = z
  .string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  })
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(20, { message: "Username cannot exceed 20 characters" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  });


export const signUpSchema = z.object({
  username: usernameValidation,

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      { message: "Enter Valid Email" }
    ),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
