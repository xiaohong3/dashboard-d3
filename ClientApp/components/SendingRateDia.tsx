import { IDashboardData, IDashboardDataRow } from "../data";
import * as React from "react";
import * as d3 from "d3";
import { createHistogram } from "../histogram";

interface IProps {
    data: IDashboardData
}
export class SendingRateDia extends React.Component<IProps, {}> {
    private svg: SVGSVGElement | null;
    componentDidMount() {
        this.generateSvg();
    }
    private generateSvg() {
        const { data } = this.props;
        const avgSendingRate = d3.nest<IDashboardDataRow, number>()
        .key(d => d.appID)
        .rollup(v => {
            return d3.mean(v, d => {
                return d.meanSendingRateKbps === '' ?
                    0 : +d.meanSendingRateKbps;
            })!;
        })
        .entries(data)
        .map(d => d.value!);
        const histogram = d3.histogram()(avgSendingRate);
        createHistogram(avgSendingRate, histogram, this.svg!);
    }
    render() {
        return <div className="row col-sm-12">
            <h1>Distribution of average sending rate group by appID</h1>
            <svg ref={c => this.svg = c}></svg>
        </div>
    }
}