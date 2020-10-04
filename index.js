const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWon = require("./ipl/matchesWon");
const matchExtra = require("./ipl/matchExtra");
const economic = require("./ipl/economic");
const venue = require("./ipl/venue");


const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const JSON_OUTPUT_WIN_FILE_PATH = "./public/win.json";
const JSON_OUTPUT_EXTRAS_FILE_PATH = "./public/extras2019.json";
const JSON_OUTPUT_ECONOMIC_FILE_PATH = "./public/eb2015.json";
const JSON_OUTPUT_VENUE_FILE_PATH = "./public/venue.json";


function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      let result = matchesPlayedPerYear(matches);
      saveMatchesPlayedPerYear(result);
    });
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then(matches => {
           let win = matchesWon(matches);
           saveMatchWon(win);
        });
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then(matches => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then(deliveries => {
                    //console.log(deliveries.slice(0, 1));
                    let results = matchExtra(matches, deliveries, 2019);
                    saveMatchesExtras(results);
                });
        });
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then(matches => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then(deliveries => {
                    let res = economic(matches,deliveries,2015);
                    saveEconomicBowler(res);         
                });
        });
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then(matches => {
            let result = venue(matches);
            saveMatchesWonByVenue(result);
        });
}

function saveMatchesWonByVenue(result) {
    const jsonData = {
        venue: result
    };
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(JSON_OUTPUT_VENUE_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}


function saveMatchesPlayedPerYear(result) {
  const jsonData = {
    matchesPlayedPerYear: result
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

function saveMatchWon(win) {
    const jsonData = {
        matchesWon: win
    };
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(JSON_OUTPUT_WIN_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}

function saveMatchesExtras(results) {
    const jsonData = {
        matchExtra: results
    };
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(JSON_OUTPUT_EXTRAS_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}

function saveEconomicBowler(res) {
    const jsonData = {
        economic: res
    };
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(JSON_OUTPUT_ECONOMIC_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}

main();
