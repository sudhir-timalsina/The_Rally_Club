import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email"),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)"),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const partnershipSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  company: z.string().trim().min(2, "Please enter your company or brand name"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().optional(),
  businessType: z.string().trim().min(2, "Please tell us what kind of business you are"),
  collaborationType: z.enum([
    "instructor",
    "venue",
    "wellness_brand",
    "lifestyle_brand",
    "cafe_restaurant",
    "event_partner",
    "other",
  ]),
  message: z.string().trim().min(10, "Tell us a little about the collaboration you have in mind"),
});
export type PartnershipInput = z.infer<typeof partnershipSchema>;

export const checkoutSchema = z.object({
  eventId: z.string().uuid(),
  fullName: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().optional(),
  quantity: z.coerce.number().int().min(1).max(10),
  notes: z.string().trim().max(500).optional(),
  agreedToTerms: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the booking policy to continue" }),
  }),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;
