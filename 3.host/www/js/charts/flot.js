const MaxValues = 30;
let plot;

function setChart(name, data) {
    plot = $.plot('#' + name, [{
        label: "Temperature",
        data: data[0],
        yaxis: 1,
        color: "#FF0000",
        lines: { show: true, fill: false }
    }, {
        label: "Humidity",
        data: data[1],
        yaxis: 1,
        color: "#0062FF",
        lines: { show: true, fill: false }
    }, {
        label: "Pressure",
        data: data[2],
        yaxis: 1,
        color: "#9EDCFA",
        lines: { show: true, fill: false }
    }, {
        label: "CO2",
        data: data[3],
        yaxis: 1,
        color: "#319400",
        lines: { show: true, fill: false }
    }], {
        series: {
            shadowSize: 0,
            color: 'rgb(0, 188, 212)'
        },
        grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3'
        },

        xaxis: {
            mode: "time",
            timeformat: '%H:%M:%S',
            autoScale: 'loose',
            timezone: "browser",
        },
        yaxis: {
            autoScaleMargin: 0.1,
            autoScale: 'loose',
            growOnly: true,
        }
    });
}

function appendData(data) {
    let series = plot.getData();

    // series[0] ist nur der erste Datensatz.
    // Wenn es mehrere Datensätze gibt (z.B. Temperatur + Luftfeuchte), muss
    // der richtige Index anders ermittelt werden.

    let appendedData = series[0].data.concat(data);
    appendedData = appendedData.slice(Math.max(0, appendedData.length - MaxValues));

    plot.setData([appendedData]);
    plot.setupGrid();
    plot.draw();
}