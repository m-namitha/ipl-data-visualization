function matchesWon(matches) {
    const result = {};
    for (let match of matches) {
        var season = match.season;
        var winner = match.winner;
        //season_list.push(season);
        if (!result[season]) {
            result[season] = {};
        }
        if (result[season][winner]) {
            result[season][winner] += 1;
        } else {
            result[season][winner] = 1;
        }
    }

    return result;

}

module.exports = matchesWon;

