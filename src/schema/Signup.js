import z from "zod";
const schema = z.object({
  fullName: z.string().nonempty(),
  email: z.string().email().nonempty(),
  phoneNumber: z.string().nonempty(),
  DateOfBirth: z.coerce.date(),
  userName: z.string().nonempty(),
  password: z
    .string()
    .nonempty()
    .min(8, "Password must be at least 8 characters long"),
});
export default schema;
