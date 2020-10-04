function start() {
    document.querySelector(".year-input-button").addEventListener("click", fetchAndRenderEconomyRatesForYear)
}
function fetchAndRenderEconomyRatesForYear(e) {
    var t = document.querySelector(".year-input").value;
    (t = parseInt(t)) < 2008 || 2019 < t ? document.querySelector(".input-container > .error").classList.value = "error" : (document.querySelector(".input-container > .error").classList = "error invisible",
        console.log(t),
        fetch("./data.json")
            .then(function (e) {
                return e.json()
            }).then(function (e) {
                document.querySelector("#container6").innerHTML = "",
                    renderEcoYear(t, e.eco[t])
            }))
} function renderEcoYear(e, t) {
    var a = [];
    t.forEach(function (e) {
        a.push([e.bowler, parseFloat(e.economy)])
    }),
        Highcharts.chart("container6",
            {
                chart: { type: "column" },
                title: { text: "4. Top Economical Bowlers in " + e + " season" },
                subtitle: { text: 'Source: <a href="http://ipl.com">ipl</a>' },
                xAxis: {
                    type: "category",
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: "13px", fontFamily: "Verdana, sans-serif"
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title:
                        { text: "Economy" }
                },
                legend: { enabled: !1 },
                tooltip: { pointFormat: "Economy: <b>{point.y:0.2f} </b>" },
                series: [{
                    name: "Bowlers",
                    data: a,
                    dataLabels: {
                        enabled: !0, rotation: 0, color: "#FFFFFF", align: "center", format: "{point.y:.2f}", y: 25,
                        style: { fontSize: "13px", fontFamily: "Verdana, sans-serif" }
                    }
                }]
            })
}
function fetchAndVisualizeData() {
    fetch("./data.json")
        .then(function (e) {
            return e.json()
        })
        .then(function (t) {
            var e = [];
            for (season in t.matchesPerSeason)
                e.push([season, t.matchesPerSeason[season]]);
            visualizeFunc1(e);
            var a = formater(t.matchesWonByTeam), n = [];
            for (team in a) {
                (c = {}).name = team, c.data = a[team], n.push(c)
            }
            visualizeFunc2(t.matchesWonByTeam, n);
            var o = [];
            Object.keys(t.extraRuns).forEach(function (e) {
                o.push([e, t.extraRuns[e]])
            }),
                visualizeFunc3(o);
            var r = [];
            t.economicalBowler.forEach(function (e) {
                r.push([e.bowler, parseFloat(e.economy)])
            }),
                visualizeFunc4(r);
            var i = formater(t.winningTeamPerVenue), s = [];
            for (team in i) {
                var c;
                (c = {}).name = team, c.data = i[team], s.push(c)
            }
            visualizeFunc5(t.winningTeamPerVenue, s)
        })
}
function visualizeFunc1(e) {
    Highcharts.chart("container1", {
        chart: {
            type: "column"
        },
        title: {
            text: "1. Total number of matches played each year"
        },
        subtitle: {
            text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">ipl</a>'
        },
        xAxis: {
            type: "category",
            labels: {
                rotation: -45,
                style: { fontSize: "13px", fontFamily: "Verdana, sans-serif" }
            }
        },
        yAxis: {
            min: 0,
            title:
            {
                text: "Matches"
            }
        },
        legend: {
            enabled: !1
        },
        tooltip: {
            pointFormat: "Matches: <b>{point.y:0.0f} </b>"
        },
        series: [{
            name: "Seasons",
            data: e,
            dataLabels:
            {
                enabled: !0,
                rotation: 0,
                color: "#FFFFFF",
                align: "center",
                y: 25,
                style:
                {
                    fontSize: "13px", fontFamily: "Verdana, sans-serif"
                }
            }
        }]
    })
}
function formater(e) {
    var t = {},
        a = -1;
    for (var n in e) {
        for (var o in a++, e[n]) {
            if (!t.hasOwnProperty(o)) {
                t[o] = [];
                for (var r = 0; r < a; r++)
                    t[o].push(0)
            }
            t[o].push(e[n][o])
        }
        for (o in t)
            t[o].length < a + 1 && t[o].push(0)
    }
    return t
}
function visualizeFunc2(e, t) {
    Highcharts.chart("container2",
        {
            chart: {
                type: "column"
            },
            title: {
                text: "2. Number of matches won by each team over all the years of IPL"
            },
            subtitle: {
                text: "Source: ipl.com"
            },
            xAxis: {
                categories: Object.keys(e), crosshair: !0
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Matches won"
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: "</table>", shared: !0, useHTML: !0
            },
            plotOptions: {
                column: {
                    pointPadding: .2, borderWidth: 0
                }
            },
            series: t
        })
}
function visualizeFunc3(e) {
    Highcharts.chart("container3", { chart: { type: "column" }, title: { text: "3. Extra runs conceded by each team in 2016" }, subtitle: { text: 'Source: <a href="http://ipl.com">ipl</a>' }, xAxis: { type: "category", labels: { rotation: -45, style: { fontSize: "13px", fontFamily: "Verdana, sans-serif" } } }, yAxis: { min: 0, title: { text: "Extra Runs" } }, legend: { enabled: !1 }, tooltip: { pointFormat: "Extra runs: <b>{point.y:0.0f} </b>" }, series: [{ name: "Bowlers", data: e, dataLabels: { enabled: !0, rotation: 0, color: "#FFFFFF", align: "center", y: 25, style: { fontSize: "13px", fontFamily: "Verdana, sans-serif" } } }] })
}
function visualizeFunc4(e) {
    Highcharts.chart("container4", {
        chart: {
            type: "column"
        },
        title: {
            text: "4. Top Economical Bowlers in 2015 season"
        },
        subtitle: {
            text: 'Source: <a href="http://ipl.com">ipl</a>'
        },
        xAxis: {
            type: "category",
            labels: {
                rotation: -45,
                style: {
                    fontSize: "13px", fontFamily: "Verdana, sans-serif"
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: "Economy"
            }
        },
        legend: {
            enabled: !1
        },
        tooltip: {
            pointFormat: "Economy: <b>{point.y:0.2f} </b>"
        },
        series: [{
            name: "Bowlers",
            data: e,
            dataLabels: {
                enabled: !0,
                rotation: 0,
                color: "#FFFFFF",
                align: "center",
                format: "{point.y:.2f}",
                y: 25,
                style: {
                    fontSize: "13px", fontFamily: "Verdana, sans-serif"
                }
            }
        }]
    })
}
function visualizeFunc5(e, t) {
    Highcharts.chart("container5", {
        chart: {
            type: "bar"
        },
        title: {
            text: "5. Story: Matches Won by each team per venue"
        },
        xAxis: {
            categories: Object.keys(e)
        },
        yAxis: {
            min: 0,
            title: {
                text: "Matches won vs stadium"
            }
        },
        legend: {
            reversed: !0
        },
        plotOptions: {
            series: {
                stacking: "normal"
            }
        },
        series: t
    })
}
start(),
    fetchAndVisualizeData();