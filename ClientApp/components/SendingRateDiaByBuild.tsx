import * as React from "react";
import { IDashboardData, data } from "../data";
import { getValues } from "../helper";
import { RouteComponentProps } from "react-router";
import { BuildVersion } from "../components/BuildVersion";
import * as d3 from "d3";
import { createHistogram } from "../histogram";
interface IState {
    data: IDashboardData | null,
    selectedBuildName: string | null,
    buildVersionsByBuildName: string[] | null,
    selectedBuildVersion: string | null
}
export class SendingRateDiaByBuild extends React.Component<RouteComponentProps<{}>, IState>{
    private svg: SVGSVGElement | null;
    constructor() {
        super();

        this.state = {
            data: null,
            selectedBuildName: null,
            buildVersionsByBuildName: null,
            selectedBuildVersion: null
        };
    }
    componentDidMount() {
        data.then(data => this.setState({ data }));
    }

    componentDidUpdate() {
        const { data, selectedBuildName, selectedBuildVersion } = this.state;

        if(!selectedBuildName || !selectedBuildVersion || !data) {
            d3.select(this.svg).selectAll('*').remove();
            return;
        }

        const selectedData = data
            .filter(d => d.buildName === selectedBuildName &&
                    d.buildVer === selectedBuildVersion &&
                    +d.meanSendingRateKbps !== 0)
            .map(r => +r.meanSendingRateKbps);
        if (selectedData.length === 0)
            return;

        const histogram = d3.histogram()(selectedData);
        createHistogram(selectedData, histogram, this.svg!);
    }

    render() {
        const { data, selectedBuildName, buildVersionsByBuildName } = this.state;
        if (!data)
            return <div>Loading data</div>
        const buildNames = getValues('buildName', data).filter(bN => bN !== '');
        return <div>
            <div className="row col-md-12">
                <h1>Distribution of sending rate by build name and build version</h1>
                <select onChange={e => this.setSelectedBuildName(e)}>
                    <option value="">Select build name</option>
                    {buildNames.map(bN => <option key={bN} value={bN}>{bN}</option>)}
                </select>
                {selectedBuildName === null ? null :
                    <BuildVersion buildVersions={buildVersionsByBuildName} 
                        onBuildVersionChange={selectedVersion => this.setState({ selectedBuildVersion: selectedVersion })}/>
                }
            </div>
            <div className="row col-md-12">
                <svg ref={c => this.svg = c}></svg>
            </div>
        </div>
    }
    private setSelectedBuildName(e: React.FormEvent<HTMLSelectElement>) {
        this.setState({
            selectedBuildName: e.currentTarget.value !== '' ? e.currentTarget.value : null
        });
        if (this.state.data === null)
            return;
        this.setState({
            selectedBuildVersion: null,
            buildVersionsByBuildName: getValues('buildVer', this.state.data.filter(d => d.buildName === e.currentTarget.value))
        });
    }
}
