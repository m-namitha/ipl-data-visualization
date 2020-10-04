function matchExtra(matches,deliveries,year) {
    const results = {};
    var arr = [];
    for (let match of matches) {
        if (match.season == year) {
            var matchid = match.id;
            arr.push(matchid);
        }
    }
    for (let deli of deliveries) {
        const id = deli.match_id;
        if (id in arr) {
            const team = deli.batting_team;
            const extras = deli.extra_runs;
        //if (id >= 7894 && id <= 7953) {
            if (results[team]) {
                results[team] += parseInt(extras);
            } else {
                results[team] = parseInt(extras);
            }
        }
    }
    return results;
}

module.exports = matchExtra;





