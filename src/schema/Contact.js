import z from "zod";
const schema = z.object({
  fullName: z.string(),
  userName: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  DateOfBirth: z.date(),
});
export default schema;
