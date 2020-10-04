function economic(matches, deliveries, year) {
    let topTenBowler = [];

    let matchId = [];
    for (let match of matches) {
        if (match.season == year) {
            var matchid = match.id;
            matchId.push(matchid);
        }
    }
    let startId = matchId[0];
    let endId = matchId[matchId.length - 1];
    let bowlerRun = {};
    let bowlerBalls = {};

    for (let deli of deliveries) {
        let deliveryId = deli.match_id;
        let bowlerName = deli.bowler;
        let wideBall = deli.wide_runs;
        let noBall = deli.noball_runs;
        let run = deli.total_runs;
        if (deliveryId >= startId && deliveryId <= endId) {
            if (bowlerRun[bowlerName]) {
                bowlerRun[bowlerName] += parseInt(run);
            } else {
                bowlerRun[bowlerName] = 1;
            }
            if (bowlerBalls[bowlerName]) {
                if (noBall == "0" && wideBall == "0") {
                    bowlerBalls[bowlerName]++;
                }
            } else {
                bowlerBalls[bowlerName] = 1;
            }
        }
    }
    let arr = [];
    let obj = {};
    for (ball in bowlerBalls) {
        for (run in bowlerRun) {
            if (run === ball) {
                let economicRate = ((bowlerRun[run] / bowlerBalls[ball]) * 6).toFixed(2);
                obj[run] = parseFloat(economicRate);
                //arr.push(obj);
            }
        }
    }
    for (var run in obj) {
        arr.push([run, obj[run]]);
    }
    arr.sort(function (a, b) {
        return a[1] - b[1];
    })
    topTenBowler = arr.splice(0, 10);
    var objSorted = {}
    topTenBowler.forEach(function (item) {
        objSorted[item[0]] = item[1]
    })
    return objSorted;
}

module.exports = economic;





