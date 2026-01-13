import { z } from "zod";

export const genreSchema = z
    .array(z.union([z.string(), z.object({ name: z.string() })]))
    .transform((arr) => arr.map((item) => typeof item === "string" ? item : item.name));
