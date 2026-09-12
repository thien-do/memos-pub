import z from "zod";

export const ConfigColorSchema = z.enum(["blue", "crimson", "jade"]);

export type ConfigColor = z.infer<typeof ConfigColorSchema>;
