import * as d3 from "d3";

export interface IDashboardDataRow {
    appID: string;
    meanSendingRateKbps: string;
    buildName: string;
    buildVer: string;
    mediaType: 'audio' | 'video' | '';
}

export type IDashboardData = IDashboardDataRow[];

export const data = new Promise<IDashboardData>(resolve => {
    d3.tsv('data/dashboard.csv', data => {
        console.log('Data loaded');
        resolve(data);
    });
});
