import z from "zod";
import { ACCEPTED_AUDIO_TYPES, ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../utilities/constants";

export const songSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string"
    }).min(1, { message: "Title must be 1 or more characters long" }),
    genre: z.string({
        required_error: "Genre is required",
        invalid_type_error: "Genre must be a string"
    }).min(1, { message: "Genre must be 1 or more characters long" })
        .optional(),
    releaseDate: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string"
    }).min(1, { message: "Title must be 1 or more characters long" }),
    duration: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string"
    }).min(1, { message: "Title must be 1 or more characters long" }),
    youtubeVideoId: z.string({
        required_error: "Youtube Video Id is required",
        invalid_type_error: "Youtube Video Id must be a string"
    }).min(1, { message: "Youtube Video Id must be 1 or more characters long" })
        .optional(),
    artist: z.string({
        required_error: "Artist is required",
        invalid_type_error: "Artist must be a string"
    }).min(1, { message: "Artist must be 1 or more characters long" }),
    album: z.string({
        required_error: "Album is required",
        invalid_type_error: "Album must be a string"
    }).min(1, { message: "Album must be 1 or more characters long" })
        .optional(),
    media: z
        .any()
        .refine((files) => files?.length == 1, "Media file is required.")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Media file Max file size is 50MB.`
        )
        .refine(
            (files) => !ACCEPTED_AUDIO_TYPES.includes(files?.[0]?.type),
            ".mp3, mpeg, m4a and .wav files are accepted."
        )
        .optional(),
    cover: z
        .any()
        .refine((files) => files?.length == 1, "Cover is required.")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Cover Max file size is 50MB.`
        )
        .refine(
            (files) => !ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, png, gif and .webp files are accepted."
        ),
})

export type songInputType = z.infer<typeof songSchema>;