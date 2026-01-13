import z from "zod";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { MAX_FILE_SIZE } from "./constants";

/**
 * Get all messages from validation errors
 * @param obj 
 * @returns 
 */
export function getAllMessages(obj: unknown): string[] {
    const messages: string[] = [];
    const visited = new WeakSet<object>();

    function recurse(value: unknown): void {
        if (Array.isArray(value)) {
            value.forEach(item => recurse(item));
        } else if (typeof value === 'object' && value !== null) {
            if (visited.has(value)) return; // prevent infinite loop
            visited.add(value);

            for (const [key, val] of Object.entries(value)) {
                if (key === 'message' && typeof val === 'string') {
                    messages.push(val);
                } else {
                    recurse(val);
                }
            }
        }
    }

    recurse(obj);
    return messages;
}


/**
 * Create Initial using name
 */
export function getInitials(inputName: string) {
    const names = inputName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
}

/**
 * Validate files
 * @param acceptedTypes 
 * @param label 
 * @returns
 */
export const fileValidator = (acceptedTypes: string[], label: string) => {
    return z
        .any()
        .optional()
        .refine((value) => {
            // Allow undefined, Cloudinary URL string, or FileList
            return (
                value === undefined ||
                typeof value === 'string' ||
                (typeof value === 'object' && 'url' in value) ||
                value instanceof FileList
            );
        }, {
            message: `${label} must be a valid file or image.`,
        })
        .refine((value) => {
            // Skip if not FileList
            return !(value instanceof FileList) || value.length === 1;
        }, {
            message: `${label} must contain only one file.`,
        })
        .refine((value) => {
            // Skip if not FileList
            return !(value instanceof FileList) || value[0].size <= MAX_FILE_SIZE;
        }, {
            message: `${label} must be under 50MB.`,
        })
        .refine((value) => {
            // Skip if not FileList
            return !(value instanceof FileList) || acceptedTypes.includes(value[0].type);
        }, {
            message: `Only ${acceptedTypes.map(type => '.' + type.split('/')[1]).join(', ')} for ${label.toLowerCase()} files are allowed.`,
        });
};


/**
 * Merge classes
 * @param inputs 
 * @returns 
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Convert number to 1K, 1M, 1B, 1T, 1P, 1E, 1Z, y
 * @param num 
 * @returns 
 */
export function formatNumbers(num?: number) {

    if (!num) {
        return;
    }

    const units = ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'];

    if (num < 1000) return num.toString();

    const unitIndex = Math.floor(Math.log10(num) / 3) - 1;

    const formattedNumber = new Intl.NumberFormat('en', {
        maximumFractionDigits: 1,
        minimumFractionDigits: 0
    }).format(num / Math.pow(1000, unitIndex + 1));

    return formattedNumber + units[unitIndex];
}


import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(localizedFormat);

/**
 * Format date using localized format
 */
export function formatDate(date: string, format = "ll") {
    if (!date) return "Bad date";
    return dayjs(date).format(format);
}

/**
 * Convert date to "time ago" format
 */
export function timeAgo(date: string) {
    if (!date) return "Bad date";
    return dayjs(date).fromNow();
}

/**
 * Format duration to mm:ss or hh:mm:ss
 */
export function formatDuration(time?: number) {
    if (!time) return "00:00";

    const dur = dayjs.duration(time, "seconds");
    return time > 3600 ? dur.format("HH:mm:ss") : dur.format("mm:ss");
}