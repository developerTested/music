import z from "zod";
import { ACCEPTED_IMAGE_TYPES } from "../utilities/constants";
import { fileValidator } from "../utilities/helper";

export const artistSchema = z.object({
    name: z.string().min(1, "Name is required"),
    dob: z.string().optional(),
    bio: z.string().max(500).optional(),
    location: z.object({
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        country: z.string().min(1, "Country is required"),
    }),
    avatar: fileValidator(ACCEPTED_IMAGE_TYPES, "Avatar Image"),
    banner: fileValidator(ACCEPTED_IMAGE_TYPES, "Banner Image"),
});

export type artistInputType = z.infer<typeof artistSchema>