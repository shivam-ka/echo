import { z } from "zod";

export const acceptMessageSchema = z.object({
    content: z
        .string()
        .min(5, {
            message: "Message must be at least 5 characters long"
        })
        .max(400, {
            message: "Message cannot exceed 400 characters"
        })
})