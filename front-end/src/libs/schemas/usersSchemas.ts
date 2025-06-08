import { z } from "zod";

export const loginSchemas = z.object({
  email: z.string().email().min(1, { message: "Email Required" }),
  password: z.string().min(1, { message: "Password Required" }),
});

export type LoginSchemasDTO = z.infer<typeof loginSchemas>;
