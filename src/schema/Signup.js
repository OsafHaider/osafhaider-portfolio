import z from "zod";

const schema = z.object({
  fullName: z.string().nonempty(),
  email: z.string().email().nonempty(),
  phoneNumber: z
    .string()
    .nonempty()
    .regex(/^[+]?[0-9]{1,15}$/, "Invalid phone number format"),
  DateOfBirth: z.coerce.date(),
  userName: z.string().nonempty(),
  password: z
    .string()
    .nonempty()
    .min(8, "Password must be at least 8 characters long"),
});

export default schema;
