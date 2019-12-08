import Rickshaw from 'rickshaw'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/slider'
import 'jquery-ui/themes/base/all.css'
// import 'jquery-ui/themes/base/core.css'
// import 'jquery-ui/themes/base/slider.css'

// instantiate our graph!

let graphConfig = {
	element: "#rickshawchart",
	legendElem: "#legend",
	yAxisElem: "#y_axis2",
	sliderElem: "#slider",
	// xAxisElem: "",
	width: 960,
	height: 350,
	// renderer: 'stack',
	renderer: 'bar',
}

	let unit = {}
	unit.formatTime = function(d) {
		let date = d.getUTCDate(); let year = d.getFullYear(); let month = d.getMonth();
		return `${date}/${month}`;
	};
	unit.formatter = function(d) { return this.formatTime(d)};
	// unit.name = "One Day";
	unit.seconds = 86400*4;

	export function plotTimeSeries(graphConfig, data) {
		let d = document;
		let elem = d.querySelector(graphConfig.element);
		let legend = d.querySelector(graphConfig.legendElem);
		let yAxis = d.querySelector(graphConfig.yAxisElem);
		let sliderElem = d.querySelector(graphConfig.sliderElem);
		// let xAxis = d.querySelector(graphConfig.xAxisElem);

		elem.innerHTML = '';
		legend.innerHTML = '';
		yAxis.innerHTML = '';
		sliderElem.innerHTML = '';
		// xAxis.innerHTML = '';

		let graph = new Rickshaw.Graph( {
			element: elem,
			width: graphConfig.width,
			height: graphConfig.height,
			renderer: graphConfig.renderer,
			interpolation: 'basis',
			series: data,
		} );
		return graph;
	}



try {
	let domd = document.getElementById("chart_container");
	domd = domd.getAttribute("data-json");
	// console.log(seriesData);
	let ddd = JSON.parse(domd);

	// { x: timestamp , y: value }
	let impressions = ddd.map((i) => {
		let dd = new Date(i.LogDate);
		// dd.setDate(dd.getDate()-1);
		let timestamp = dd.getTime();
		return {
			x: Math.floor(timestamp / 1000),
			y: i.Impressions
		}
	})
	let Clicks = ddd.map((i) => {
		let timestamp = (new Date(i.LogDate)).getTime();
		return {
			x: Math.floor(timestamp / 1000),
			y: i.Clicks
		}

	})
	let CTR = ddd.map((i) => {
		let timestamp = (new Date(i.LogDate)).getTime();
		return {
			x: Math.floor(timestamp / 1000),
			y: i.CTR
		}
	})

	// console.log("impressions", impressions);
	// console.log("CTR", CTR);
	// console.log("Clicks", Clicks);

	var palette = new Rickshaw.Color.Palette( { scheme: 'munin' } );

	let series = [
		{
			color: palette.color(),
			data: impressions,
			name: "Impressions",
			renderer: "bar"
			// opacity: 0.3
		},
		{
			color: palette.color(),
			data: Clicks,
			name: "Clicks",
			renderer: "bar"
		}, {
			color: palette.color(),
			data: CTR,
			name: "Click Through Rate",
			renderer: "bar"
		}
	];

	let graph = plotTimeSeries(graphConfig, series);

	var hoverDetail = new Rickshaw.Graph.HoverDetail( {
		graph: graph,
	} );

	var legend = new Rickshaw.Graph.Legend( {
		graph: graph,
		element: document.getElementById('legend')
	} );

	var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
		graph: graph,
		legend: legend
	} );

	var axes = new Rickshaw.Graph.Axis.Time( {
		graph: graph,
		timeUnit:unit,
		timeFixture: new Rickshaw.Fixtures.Time.Local(),
		// tickFormat: function(x){
		// 	let d = new Date(x*1000).getUTCDate();
		// 	let date = d.getDate(); let year = d.getFullYear(); let month = d.getMonth() + 1;
		// 	return `${date}/${month}/${year}`;
		// 	// return new Date(x*1000).getUTCDate();
		//   }
	} );

	var y_ticks1 = new Rickshaw.Graph.Axis.Y( {
		graph: graph,
		orientation: 'left',
		tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
		element: document.getElementById('y_axis2')
	} );

	var slider = new Rickshaw.Graph.RangeSlider.Preview({
    graph: graph,
	    element: document.querySelector('#slider')
	});

	// axes.render();

	graph.render();
} catch(err){
	// console.log(err)
}


try {
	var graph2 = new Rickshaw.Graph( {
		element: document.querySelector(".chart_line2"),
		renderer: 'line',
		height: 40,
		width: 160,
		series: [
			{
				data: impressions,
				color: "#c05020"
			}
		]
	} );

	// var y_ticks = new Rickshaw.Graph.Axis.Y( {
	// 	graph: graph2,
	// 	orientation: 'left',
	// 	tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
	// 	element: document.getElementById('y_axis')
	// } );

	var axes = new Rickshaw.Graph.Axis.Time( {
		graph: graph2,
		timeUnit:unit,
		timeFixture: new Rickshaw.Fixtures.Time.Local(),
		// tickFormat: function(x){
		// 	let d = new Date(x*1000).getUTCDate();
		// 	let date = d.getDate(); let year = d.getFullYear(); let month = d.getMonth() + 1;
		// 	return `${date}/${month}/${year}`;
		// 	// return new Date(x*1000).getUTCDate();
		//   }
	} );

	graph2.render();
} catch (error) {
	// console.log(error)
}

export { unit }
