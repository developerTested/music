import { z } from "zod";
import {
    ACCEPTED_AUDIO_TYPES,
    ACCEPTED_IMAGE_TYPES,
    MAX_FILE_SIZE,
} from "../utilities/constants";

export const songSchema = z.object({
    title: z
        .string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string",
        })
        .min(1, { message: "Title must be 1 or more characters long" }),

    genre: z
        .string({
            required_error: "Genre is required",
            invalid_type_error: "Genre must be a string",
        })
        .min(1, { message: "Genre must be 1 or more characters long" })
        .optional(),

    releaseDate: z
        .string({
            required_error: "Release date is required",
            invalid_type_error: "Release date must be a string",
        })
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: "Release date must be in YYYY-MM-DD format",
        })
        .refine((val) => {
            const date = new Date(val);
            const isValid = !isNaN(date.getTime());

            const [year, month, day] = val.split("-");
            const matches = date.getUTCFullYear() === Number(year)
                && date.getUTCMonth() + 1 === Number(month)
                && date.getUTCDate() === Number(day);

            const notInFuture = date <= new Date();
            const notTooOld = date.getUTCFullYear() >= 1900;

            return isValid && matches && notInFuture && notTooOld;
        }, {
            message: "Release date must be a valid date between 1900 and today",
        }),

    duration: z
        .string({
            required_error: "Duration is required",
            invalid_type_error: "Duration must be a string",
        })
        .min(1, { message: "Duration must be 1 or more characters long" }),

    youtubeVideoId: z
        .string()
        .min(1, { message: "Youtube Video Id must be 1 or more characters long" })
        .optional()
        .or(z.literal("")),

    artist: z
        .string({
            required_error: "Artist is required",
            invalid_type_error: "Artist must be a string",
        })
        .min(1, { message: "Artist must be 1 or more characters long" }),

    album: z
        .string({
            required_error: "Album is required",
            invalid_type_error: "Album must be a string",
        })
        .min(1, { message: "Album must be 1 or more characters long" })
        .optional()
        .or(z.literal("")),


    media: z
        .any()
        .refine((files) => files?.length === 1, {
            message: "Media file is required.",
        })
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            { message: "Media file max size is 50MB." }
        )
        .refine(
            (files) => ACCEPTED_AUDIO_TYPES.includes(files?.[0]?.type),
            { message: ".mp3, mpeg, m4a and .wav files are accepted." }
        )
        .optional(),

    cover: z
        .any()
        .refine((files) => files?.length === 1, {
            message: "Cover is required.",
        })
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            { message: "Cover max file size is 50MB." }
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            { message: ".jpg, png, gif and .webp files are accepted." }
        ),
});

export type songInputType = z.infer<typeof songSchema>;
