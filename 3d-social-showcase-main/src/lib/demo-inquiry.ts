import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z.string().trim().min(1, "Please tell me about your project."),
});

export function submitDemoInquiry(input: unknown) {
  const result = inquirySchema.safeParse(input);
  if (!result.success) return { success: false as const, errors: result.error.flatten().fieldErrors };
  return { success: true as const, delivered: false as const };
}