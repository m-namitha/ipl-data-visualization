function venue(matches) {
    const result = {};
    for (let match of matches) {
        const venue = match.venue;
        const winner = match.winner;
        if (result.hasOwnProperty([venue])) {
            if (result[venue].hasOwnProperty([winner])) {
                result[venue][winner] += 1;
            }
            else {
                result[venue][winner] = 1;
            }
        }
        else {
            result[venue] = {};
            result[venue][winner] = 1;
        } 
    }

    return result;
}

module.exports = venue;

