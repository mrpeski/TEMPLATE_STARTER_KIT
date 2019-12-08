import 'd3'
import { makeDeviceTable, makeImpressionsTable } from './tables'

// var t = d3.transition()
//     .duration(750)
//     .ease(d3.easeLinear);

function makeBar(data, loc) {
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
    // .ticks(10, "%")
    var chart = d3.select(loc).attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom).append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      x.domain(data.map(function(d) { return d.label; }));
      y.domain([0, d3.max(data, function(d) { return d.value; })]);

        chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        chart.append("g")
          .attr("class", "y axis")
          .call(yAxis).append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency(%)");

      chart.selectAll(".bar")
          .data(data).enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.label); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .attr("width", x.rangeBand())
        //   .transition(t);
}

// function type(d) {
//   d.value = +d.value; // coerce to number
//   return d;
// }


const color = d3.scale.ordinal().range(["#e25162", "#d651e2", "#e29c51"]);     //builtin range of colors

let pieData = { w:120, h:120, r:60, color: color, loc: ".pie" }

function makePie(data, pieData){

    let vis = d3.select(pieData.loc)
        .append("svg:svg")
        .data([data])
            .attr("width", pieData.w)
            .attr("height", pieData.h)
        .append("svg:g")
            .attr("transform", "translate(" + pieData.r + "," + pieData.r + ")")

    let arc = d3.svg.arc()
        .innerRadius(30)
        .outerRadius(pieData.r);

    let pie = d3.layout.pie()
        .value(function(d) { return d.value; });

    let arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
            .append("svg:g")
                .attr("class", "slice");

        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } )
                .attr("d", arc);

        arcs.append("svg:text")
                .attr("transform", function(d) {
                d.innerRadius = 0;
                d.outerRadius = pieData.r;
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .attr("class", "small-text")
            .text(function(d, i) { return `${(data[i].value).toFixed(1)}%`; });
}

function legend(lD, loc){
    // create table for legend.
    var legend = d3.select(loc).append("table").attr('class','legend');

    // create one row per segment.
    var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

    // create the first column for each segment.
    tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
        .attr("width", '16').attr("height", '16')
        .attr("fill", function(d, i) { return color(i); } )

    // create the second column for each segment.
    tr.append("td").text(function(d){ return d.label;});
}

function Trim(x) {
    return x.replace(/^\s+|\s+$|,/gm,'');
}

const attachToDOM = (loc, tableFunc) => {
    try {
        let iTable = document.getElementById(loc);
        let data = JSON.parse(iTable.getAttribute("data-json"));
        let dTable = tableFunc(data);
        iTable.innerHTML = '';
        iTable.innerHTML = Trim(dTable);
    }catch(e){
        console.log(e)
    }
}

attachToDOM("impressionsTable", makeImpressionsTable);
attachToDOM("deviceTable", makeDeviceTable);

function impr() {
        let impr = document.getElementById("deviceTable");
        if(!impr) return;
        let imprData = JSON.parse(impr.getAttribute("data-json"));
        imprData = imprData.map((i) => {
            return {
                "label": i.DeviceType,
                "value": +i.Percentage
            }
        })
        let imprPieData = { w:170, h:170, r:85, color: color, loc: ".imprPie" };
        makeBar(imprData, ".chartMi");
        makePie(imprData, imprPieData);
        legend(imprData, ".pieBox");
}

function demography(){
    let demoLoc = document.getElementById("impressionsTable");
    if(!demoLoc) return;
    let locData = JSON.parse(demoLoc.getAttribute("data-json"));

    locData = locData.map((i) => {
        return {
            "label": i.Country,
            "value": +i.Percentage
        }
    });

    let locPieData = { w:170, h:170, r:85, color: color, loc: ".pieLoc" };

    makeBar(locData, ".chartMi2");
    makePie(locData, locPieData);
    legend(locData, ".pieLocBox");
}

impr();demography();
