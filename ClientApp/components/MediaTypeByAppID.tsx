import * as React from "react";
import * as d3 from "d3";
import * as d3scale from "d3-scale";
import { RouteComponentProps } from "react-router";
import { SendingRateDiaByAppID } from './SendingRateDiaByAppID';

import { data, IDashboardData, IDashboardDataRow } from '../data';
import { SendingRateDia } from "../components/SendingRateDia";
import { getValues } from "../helper";

interface IState {
    data: IDashboardData | null;
    selectedAppId: string | null;
}

export class MediaTypeByAppID extends React.Component<RouteComponentProps<{}>, IState> {
    private svg: SVGSVGElement | null;
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

    componentDidUpdate() {
        const { data, selectedAppId } = this.state;
        if (!data)
            return;
        const selectedData = data.filter(d => d.appID === selectedAppId);
        let mediaType: {
            audio: number,
            video: number,
            unknown: number,
            [key: string]: number
        } = {
            audio: 0,
            video: 0,
            unknown: 0
        };
        selectedData.forEach(d => {
            if (d.mediaType === '') {
                mediaType.unknown += 1;
            } else {
                mediaType[d.mediaType] += 1;
            }
        });
        // set the dimensions and margins of the graph
        const margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        var y = d3.scaleLinear()
            .range([height, 0]);
      
        d3.select(this.svg).selectAll("*").remove();

        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        const svg = d3.select(this.svg)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");
            // Scale the range of the data in the domains
        x.domain(Object.keys(mediaType));
        y.domain([0, d3.max(Object.values(mediaType))!]);

        const mediaTypeArray = Object.keys(mediaType).map(key => ({
            key,
            value: mediaType[key] as number
        }));

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(mediaTypeArray)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("width", x.bandwidth())
            .attr("x", d => x(d.key)!)
            .attr("y", d => y(d.value))
            .attr("height", d => height - y(d.value));

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }

    render() {
        const { data, selectedAppId } = this.state;
        if(!data)
            return <div>Loading data...</div>;

        const appIds = getValues('appID', data);

        return <div className="diagram-component">
            <h1>Distribution of media type by appID</h1>
            <div className="row col-sm-2">
                <select onChange={e => this.setSelectedAppId(e)}>
                    <option value="">Select app id</option>
                    {appIds.map(appId => <option key={appId} value={appId}>{appId}</option>)}
                </select>
            </div>
            <svg ref={c => this.svg = c}></svg>
        </div>;
    }

    private setSelectedAppId(e: React.FormEvent<HTMLSelectElement>) {
        this.setState({
            selectedAppId: e.currentTarget.value !== '' ? e.currentTarget.value : null
        });
    }
}