import { z } from "zod";

export const patientFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(0, "Age cannot be negative"),
  sex: z.enum(["male", "female", "other"], {
    required_error: "Sex is required",
  }),
  address: z.string().min(1, "Address is required"),
  telephone_number: z
    .string()
    .regex(/^09\d{9}$/, "Phone number must be valid (e.g., 09123456789)"),
  chief_complaint: z.string().optional(),
  hpi: z.string().optional(),
  ros: z.string().optional(),
  pmhx: z.string().optional(),
  pe: z.string().optional(),
  lab_diagnostic: z.string().optional(),
  impression: z.string().optional(),
  treatment_plan: z.string().optional(),
  surgical_procedure: z.string().optional(),
  surgery_date: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val),
      "Surgery date must be in YYYY-MM-DD format"
    ),
  surgery_place: z.string().optional(),
  on_findings: z.string().optional(),
  histopath: z.string().optional(),
  anesthesiologist: z.string().optional(),
});


export type PatientFormType = z.infer<typeof patientFormSchema>;
