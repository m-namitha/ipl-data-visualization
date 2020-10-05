function start() {
    document.querySelector(".year-input-button").addEventListener("click", fetchAndRenderExtraRuns)
}
function fetchAndRenderExtraRuns() {
    var t = document.querySelector(".year-input").value;
    if (parseInt(t) == 2008)
        var location = "./extras2008.json";
    if (parseInt(t) == 2009)
        var location = "./extras2009.json";
    if (parseInt(t) == 2010)
        var location = "./extras2010.json";
    if (parseInt(t) == 2011)
        var location = "./extras2011.json";
    if (parseInt(t) == 2012)
        var location = "./extras2012.json";
    if (parseInt(t) == 2013)
        var location = "./extras2013.json";
    if (parseInt(t) == 2014)
        var location = "./extras2014.json";
    if (parseInt(t) == 2015)
        var location = "./extras2015.json";
    if (parseInt(t) == 2016)
        var location = "./extras2016.json";
    if (parseInt(t) == 2017)
        var location = "./extras2017.json";
    if (parseInt(t) == 2018)
        var location = "./extras2018.json";
    if (parseInt(t) == 2019)
        var location = "./extras2019.json";
    (t = parseInt(t)) < 2008 || 2019 < t ? document.querySelector(".input-container > .error").classList.value = "error" : (document.querySelector(".input-container > .error").classList = "error invisible",
        console.log(t),
        fetch(location)
            .then(function (e) {
                return e.json()
            }).then(function (e) {
                document.querySelector("#container6").innerHTML = "",
                    renderEcoYear(t, e.matchExtra)
            }))
}
function renderEcoYear(e, matchExtra) {
    var a = [];
    for (let team in matchExtra) {
        a.push([team, matchExtra[team]]);
    }
    Highcharts.chart("container6",
        {
            chart: { type: "column" },
            title: { text: "3. Extra runs conceded by each team in " + e + " season" },
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
                    { text: "Extra Runs" }
            },
            legend: { enabled: !1 },
            tooltip: { pointFormat: "Extra runs: <b>{point.y:0.0f} </b>" },
            series: [{
                name: "Bowlers",
                data: a,
                dataLabels: {
                    enabled: !0, rotation: 0, color: "#FFFFFF", align: "center", format: "{point.y:0.0f}", y: 25,
                    style: { fontSize: "13px", fontFamily: "Verdana, sans-serif" }
                }
            }]
        })
}

function fetchAndVisualizeData1() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData1);
}
function fetchAndVisualizeData2() {
    fetch("./win.json")
        .then(s => s.json())
        .then(visualizeData2);
}
/*function fetchAndVisualizeData3() {
    fetch("./extras2016.json")
        .then(t => t.json())
        .then(visualizeData3);
}*/
function fetchAndVisualizeData4() {
    fetch("./eb2015.json")
        .then(x => x.json())
        .then(visualizeData4);
}
function fetchAndVisualizeData5() {
    fetch("./venue.json")
        .then(y => y.json())
        .then(visualizeData5);
}

start();
fetchAndVisualizeData1();
fetchAndVisualizeData2();
start();
//fetchAndVisualizeData3();
fetchAndVisualizeData4();
fetchAndVisualizeData5();

function visualizeData1(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  return;
}
function visualizeData2(matchesWon) {
    const seriesData1 = [];
    var p = [];
    const arr = [];

    for (var i in matchesWon) {
        for (var prop in matchesWon[i]) {
            arr.push(prop);
            for (var y in matchesWon[i][prop]) {
                p.push(y);
            }
        }
    }
    var a = [...new Set(p)];
    for (var j in matchesWon) {
        for (var i of a) {
            var team = i;
            var n = [];
            for (var x in matchesWon[j]) {
                for (var y in matchesWon[j][x]) {
                    var bool = false;
                    if (team == y) {
                        n.push(matchesWon[j][x][y]);
                        bool = true;
                        break;
                    }
                }
                if (bool == false) {
                    n.push(0);
                }
            }
            var obj = {
                "name": team,
                "data": n
            };
            seriesData1.push(obj);
        }
    }
    visualizeMatches(arr, seriesData1);
    return;
}
/*function visualizeData3(results) {
    visualizeMatchesExtras(results.matchExtra);
    return;
}*/
function visualizeData4(res) {
    visualizeEconomicBowlers(res.economic);
    return;
}
function visualizeData5(venue) {
    var p = [];
    const array = [];
    var seriesData5 = [];
    for (var i in venue) {
        for (var prop in venue[i]) {
            array.push(prop);
            for (var y in venue[i][prop]) {
                p.push(y);
            }
        }
    }
    var a = [...new Set(p)];

    for (var j in venue) {
        for (var i of a) {
            var name = i;
            var n = [];
            for (var x in venue[j]) {
                for (var y in venue[j][x]) {
                    var bool = false;
                    if (name == y) {
                        n.push(venue[j][x][y]);
                        bool = true;
                        break;
                    }
                }
                if (bool == false) {
                    n.push(0);
                }
            }
            var obj = {
                "name": name,
                "data": n
            };
            seriesData5.push(obj);
        }
    }
    visualizeStory(array, seriesData5);
    return;
}


function visualizeStory(array, seriesData5) {
    

    Highcharts.chart('story-venue', {
        chart: {
            type: 'bar'
        },
        title: {
            text: "5. Story: Matches Won by each team per venue"
        },
        xAxis: {
            categories: array
        },
        yAxis: {
            min: 0,
            title: {
                text: "Matches won vs stadium"
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: seriesData5
         
    });
}

function visualizeEconomicBowlers(economic) {
    const seriesData4 = [];
    for (let bowler in economic) {
        seriesData4.push([bowler, economic[bowler]]);
    }
    Highcharts.chart('economic-bowl', {
        chart: {
            type: 'column'
        },
        title: {
            text: "4. Top Economical Bowlers in 2015 season"
        },
        subtitle: {
            text: 'Source: <a href="http://ipl.com">ipl</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
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
            enabled: false
        },
        tooltip: {
            pointFormat: "Economy: <b>{point.y:.1f} </b>"
        },
        series: [{
            name: "Bowlers",
            data: seriesData4,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: "#FFFFFF",
                align: "right",
                format: "{point.y:.1f}",
                y: 10,
                style: {
                    fontSize: "13px", fontFamily: "Verdana, sans-serif"
                }
            }
        }]
    });
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
        text: "1. Total number of matches played each year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}


function visualizeMatches(arr, seriesData1) {
    Highcharts.chart('matches-won', {
        chart: {
            type: 'column'
        },
        title: {
            text: '2. Number of matches won by each team over all the years of IPL'
        },
        subtitle: {
            text: 'Source: ipl.com'
        },
        xAxis: {
            categories:arr,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Matches won'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: seriesData1
    });
    
}

function visualizeMatchesExtras(matchExtra) {
    const seriesData3 = [];
    for (let team in matchExtra) {
        seriesData3.push([team, matchExtra[team]]);
    }
    Highcharts.chart("match-extras", {
        chart: {
            type: "column"
        },
        title: {
            text: "3. Extra runs conceded by each team in 2016"
        },
        subtitle: {
            text:
                'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            min: 0,
            title: {
                text: "Extra runs"
            }
        },
        series: [
            {
                name: "Teams",
                data: seriesData3
            }
        ]
    });
    
}
