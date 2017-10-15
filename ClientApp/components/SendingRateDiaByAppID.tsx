import * as React from "react";
import { IDashboardData } from "../data";
import * as d3 from "d3";
import { createHistogram } from "../histogram";
interface IProps {
    data: IDashboardData;
    selectedAppId: string;
}

export class SendingRateDiaByAppID extends React.Component<IProps, {}> {
    private svg: SVGSVGElement | null;
    componentDidMount() {
        this.generateSvg();
    }
    componentDidUpdate() {
        this.generateSvg();
    }

    render() {
        return <div className="row col-sm-12">
            <svg ref={c => this.svg = c}></svg>
        </div>
    }

    private generateSvg() {
        const { data, selectedAppId } = this.props;

        const selectedData = data
            .filter(row => row.appID === selectedAppId && row.meanSendingRateKbps !== '')
            .map(row => +row.meanSendingRateKbps);
        if (selectedData.length === 0)
            return;

        const histogram = d3.histogram()(selectedData);

        createHistogram(selectedData, histogram, this.svg!);
    }
}