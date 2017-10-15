import { IDashboardData, IDashboardDataRow } from "./data";

export function getValues(keyName: keyof IDashboardDataRow, data: IDashboardData) {
    let collector: { [key: string]: number } = {};
    data.forEach(row => collector[row[keyName]] = 1);
    return Object.keys(collector);
}