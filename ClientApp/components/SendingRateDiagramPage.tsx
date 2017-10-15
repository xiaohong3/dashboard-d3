import * as React from "react";
import * as d3 from "d3";
import * as d3scale from "d3-scale";
import { RouteComponentProps } from "react-router";
import { SendingRateDiaByAppID } from './SendingRateDiaByAppID';

import { data, IDashboardData } from '../data';
import { SendingRateDia } from "../components/SendingRateDia";
import { getValues } from "../helper";

interface IState {
    data: IDashboardData | null;
    selectedAppId: string | null;
}

export class SendingRateDiagramPage extends React.Component<RouteComponentProps<{}>, IState> {
    constructor() {
        super();

        this.state = {
            data: null,
            selectedAppId: null
        };
    }

    componentDidMount() {
        data.then(data => this.setState({ data }));
    }

    render() {
        const { data, selectedAppId } = this.state;
        if(!data)
            return <div>Loading data...</div>;

        const appIds = getValues('appID', data);

        return <div className="diagram-component">
                <h1>Distribution of sending rate by selected appID</h1>
                <div className="row col-md-12">
                    <select onChange={e => this.setSelectedAppId(e)}>
                        <option value="">Select app id</option>
                        {appIds.map(appId => <option key={appId} value={appId}>{appId}</option>)}
                    </select>
                </div>
            {selectedAppId === null ? null :
                <SendingRateDiaByAppID data={data} selectedAppId={selectedAppId} />
            }
            <SendingRateDia data={data} />
        </div>;
    }

    private setSelectedAppId(e: React.FormEvent<HTMLSelectElement>) {
        this.setState({
            selectedAppId: e.currentTarget.value !== '' ? e.currentTarget.value : null
        });
    }
}