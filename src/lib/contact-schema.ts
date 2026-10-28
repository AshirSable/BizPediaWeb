import { z } from "zod";
import { services } from "@/content/services";

export const serviceOptions = [...services.map((s) => s.name), "Not sure yet"] as const;
export const timelineOptions = ["As soon as possible", "Within 1–3 months", "Within 3–6 months", "More than 6 months", "Not decided yet"] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .or(z.literal(""));

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  companyName: z.string().trim().min(1, "Please enter your company name.").max(160),
  email: z.string().trim().email("Please enter a valid business email address.").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+()\-.\s\d]*$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  service: z.enum(serviceOptions, { message: "Please choose the service you need." }),
  description: z
    .string()
    .trim()
    .min(20, "Please add a little more detail (at least 20 characters).")
    .max(3000, "Please keep the description under 3000 characters."),
  timeline: z.enum(timelineOptions).optional().or(z.literal("")),
  budget: optionalText(120),
  // Honeypot: real users never fill this hidden field
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
