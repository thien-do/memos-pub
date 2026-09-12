import z from "zod";
import { ConfigColorSchema } from "./color/schema";

export const ConfigSchema = z
  .object({
    color: ConfigColorSchema.default("blue"),
  })
  .prefault({});

export type Config = z.infer<typeof ConfigSchema>;
