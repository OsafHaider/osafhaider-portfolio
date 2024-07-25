import z from "zod";
const schema = z.object({
  querySubject: z.string().nonempty(),
  queryDescription: z.string(),
  projectType: z.enum(["Frontend", "Backend", "Fullstack"]),
  techStack: z.enum(["Next.js", "MERN Stack"]),
});
export default schema;
