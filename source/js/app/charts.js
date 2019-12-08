import Chart from "chart.js";
import * as moment from "moment";

var ctx = document.getElementById("myChart");

var chartColors = {
    red: "rgba(255, 99, 132, 0.2)",
    blue: "rgba(54, 162, 235, 0.2)",
    white: "rgba(255, 206, 86, 0.2)",
    gray: "rgba(75, 192, 192, 0.2)",
    orange: "rgba(153, 102, 255, 0.2)",
    purp: "rgba(255, 159, 64, 0.2)"
};

var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

var data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
        }
    ]
};

var options = {
    type: "line",
    data: data,
    lazy: false,
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        },
        maintainAspectRatio: false
    }
};

if (ctx) {
    let dctx = ctx.getContext("2d");
    let myChart = new Chart(dctx, {
        type: "line",
        data: data,
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            },
            maintainAspectRatio: false
        }
    });
}

function generateData() {
    // var unit = document.getElementById("unit").value;
    var unit = "hour";
    function unitLessThanDay() {
        return unit === "second" || unit === "minute" || unit === "hour";
    }
    function beforeNineThirty(date) {
        return date.hour() < 9 || (date.hour() === 9 && date.minute() < 30);
    }
    // Returns true if outside 9:30am-4pm on a weekday
    function outsideMarketHours(date) {
        if (date.isoWeekday() > 5) {
            return true;
        }
        if (unitLessThanDay() && (beforeNineThirty(date) || date.hour() > 16)) {
            return true;
        }
        return false;
    }
    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    function randomBar(date, lastClose) {
        var open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
        var close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
        return {
            t: date.valueOf(),
            y: close
        };
    }
    var date = moment("Jan 01 1990", "MMM DD YYYY");
    var now = moment();
    var data = [];
    var lessThanDay = unitLessThanDay();
    for (
        ;
        data.length < 60 && date.isBefore(now);
        date = date
            .clone()
            .add(1, unit)
            .startOf(unit)
    ) {
        if (outsideMarketHours(date)) {
            if (!lessThanDay || !beforeNineThirty(date)) {
                date = date
                    .clone()
                    .add(
                        date.isoWeekday() >= 5 ? 8 - date.isoWeekday() : 1,
                        "day"
                    );
            }
            if (lessThanDay) {
                date = date
                    .hour(9)
                    .minute(30)
                    .second(0);
            }
        }
        data.push(
            randomBar(date, data.length > 0 ? data[data.length - 1].y : 30)
        );
    }
    return data;
}

var color = Chart.helpers.color;

var cfg = {
    type: "bar",
    data: {
        datasets: [
            {
                label: "",
                backgroundColor: color("#cce9ff")
                    .alpha(0.5)
                    .rgbString(),
                borderColor: "#cce9ff",
                data: generateData(),
                type: "line",
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            xAxes: [
                {
                    type: "time",
                    distribution: "series",
                    ticks: {
                        source: "data",
                        autoSkip: true
                    }
                }
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Label"
                    }
                }
            ]
        },
        tooltips: {
            intersect: false,
            mode: "index",
            callbacks: {
                label: function(tooltipItem, myData) {
                    var label =
                        myData.datasets[tooltipItem.datasetIndex].label || "";
                    if (label) {
                        label += ": ";
                    }
                    label += parseFloat(tooltipItem.value).toFixed(2);
                    return label;
                }
            }
        }
    }
};

var polarconfig = {
    type: 'polarArea',
    data: {
        datasets: [
            {
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                backgroundColor: [
                   chartColors.red,
                    chartColors.orange,
                   chartColors.purp,
                   chartColors.gray,
                   chartColors.white
                ],
                label: "" // for legend
            }
        ],
        labels: ["Red", "Orange", "Yellow", "Green", "Blue"]
    },
    options: {
        responsive: true,
        legend: {
            position: "right"
        },
        title: {
            display: true,
            text: ""
        },
        scale: {
            ticks: {
                beginAtZero: true
            },
            reverse: false
        },
        animation: {
            animateRotate: false,
            animateScale: true
        }
    }
};

function renderChart(id, options) {
    try {
        const elem = document.getElementById(id);
        let did = elem.getContext("2d");
        let chart = new Chart(did, options);
        return chart;
    } catch (error) {
        console.log(error);
    }
}

renderChart("visitsWeekly", cfg);
renderChart("visitsYearly", cfg);
renderChart("visitsMonthly", cfg);
renderChart("avgtime", cfg);
renderChart("traffic", polarconfig);
renderChart("map", {...cfg, type: "bar" });
