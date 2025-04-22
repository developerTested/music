import moment from "moment";

/**
 * Format duration to minutes, hours text format
 * @param time 
 * @returns String
 */
export function formatDuration(time?: number) {

    if (!time) {
        return "00:00";
    }
    const date = moment()
        .startOf("day")
        .seconds(time);

    const duration = time > 3600 ? date.format("hh:mm:ss") : date.format('mm:ss');

    return duration;
}

export function formatNumbers(num: number) {

    if (!num) {
        return;
    }

    const units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

    if (num < 1000) return num.toString();

    let unitIndex = Math.floor(Math.log10(num) / 3) - 1;

    let formattedNumber = new Intl.NumberFormat('en', {
        maximumFractionDigits: 1,
        minimumFractionDigits: 0
    }).format(num / Math.pow(1000, unitIndex + 1));

    return formattedNumber + units[unitIndex];
}
