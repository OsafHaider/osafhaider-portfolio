import z from "zod";

const schema = z.object({
  fullName: z.string().nonempty(),
  email: z.string().email().nonempty(),
  phoneNumber: z
    .string()
    .nonempty()
    .regex(/^[+]?[0-9]{1,15}$/, "Invalid phone number format"),
  querySubject: z.string().min(1, "Query subject is required"),
  queryDescription: z.string().optional(),
  projectType: z.enum(["Frontend", "Backend", "Fullstack"]),
  techStack: z.enum(["Next.js", "MERN Stack"]),
});

export default schema;
