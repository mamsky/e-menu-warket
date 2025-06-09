import { z } from "zod";

export const ItemsSchemas = z.object({
  name: z.string().min(1, { message: "Name Required" }),
  images: z.instanceof(FileList),
  category: z.enum(["FOOD", "DRINK", "SNACK"]),
  price: z.number(),
});

export type ItemsSchemasDTO = z.infer<typeof ItemsSchemas>;

export const deleteSchemas = z.object({});
