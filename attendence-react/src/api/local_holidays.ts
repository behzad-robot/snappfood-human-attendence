import { normalise } from "@/data/normalize";

const KEY = 'holidays-local';
let cachedItems: string[] = undefined;
export function getLocalHolidays(): string[] {
    if (cachedItems != undefined)
        return cachedItems;
    let str = localStorage.getItem(KEY);
    if (str == undefined)
        str = '[]';
    cachedItems = JSON.parse(str)
    return cachedItems;
}
export function setLocalHolidays(input: string[]) {
    localStorage.setItem(KEY, JSON.stringify(input));
    cachedItems = input;
}
export function isLocalHoliday(date: string): boolean {
    let items = getLocalHolidays();
    return items.findIndex(c => normalise(date) == normalise(c)) != -1;
}