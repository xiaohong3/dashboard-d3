import * as d3 from "d3";
import { Bin } from "d3";

export function createHistogram(data: number[], histogram: Bin<number, number>[], svg: SVGSVGElement) {
    const margin = { top: 20, right: 30, bottom: 30, left: 50 },
        width = 600 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    const max = d3.max(data);
    const min = d3.min(data);
    const x = d3.scaleLinear()
        .domain([min!, max!])
        .range([0, width]);

    const yMax = d3.max(histogram, d => d.length);
    const yMin = d3.min(histogram, d => d.length);
    const y = d3.scaleLinear()
        .domain([0, yMax!])
        .range([height, 0]);

    const xAxis = d3.axisBottom(x);

    d3.select(svg).selectAll('*').remove();

    const g = d3.select(svg)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const bar = g.selectAll("rect")
        .data(histogram)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 1)
        .attr("transform", d => "translate(" + x(d.x0) + "," + y(d.length) + ")")
        .attr("width", d => x(d.x1) - x(d.x0) - 1)
        .attr("height", d => height - y(d.length))
        ;

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // add the y Axis
    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));
}