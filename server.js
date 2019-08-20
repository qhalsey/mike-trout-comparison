const express = require("express");
const rp = require("request-promise");
const cheerio = require("cheerio");
const PORT = 3000;

let app = express();

const getStatistic = (field, $) => {
    let array = [];
    $(`[data-stat="${field}"]`).each(function() {
        array.push($(this).text());
    });

    return array;
}

app.get("/mikeTrout", (req, res) => {
    let options = {
        uri: "https://www.baseball-reference.com/players/t/troutmi01.shtml"
    }

    rp(options)
        .then((response) => {
            let $ = cheerio.load(response);
            let mikeTrout = {
                yearsPlayed: getStatistic('year_ID', $),
                agesActive: getStatistic('age', $),
                teamsPlayedFor: getStatistic('team_ID', $),
                gamesPlayed: getStatistic('G', $),
                plateAppearances: getStatistic('PA', $),
                atBats: getStatistic('AB', $),
                runs:getStatistic('R', $),
                hits: getStatistic('H', $),
                doubles: getStatistic('2B', $),
                triples: getStatistic('3B', $),
                homeruns: getStatistic('HR', $),
                rbis: getStatistic('RBI', $),
                stolenBases: getStatistic('SB', $),
                caughtStealing: getStatistic('CS', $),
                walks: getStatistic('BB', $),
                strikeouts: getStatistic('SO', $),
                battingAverage: getStatistic('batting_avg', $),
                onBasePercentage: getStatistic('onbase_perc', $),
                sluggingPercentage: getStatistic('slugging_perc', $),
                ops: getStatistic('onbase_plus_slugging_plus', $),
                totalBases: getStatistic('TB', $),
                intentionalWalks: getStatistic('IBB', $)
            }

            res.send(mikeTrout);
        });
});

app.get('/compare/:player', (req, res) => {
    let lastname = req.params.player.substring(req.params.player.indexOf('-') + 1, req.params.player.length + 1);
    let firstname = req.params.player.substring(0, 2);
    console.log(firstname);
    console.log(lastname);
    let options = {
        uri: `https://www.baseball-reference.com/players/${lastname.substring(0, 1)}/${lastname}${firstname}01.shtml`
    }

    rp(options)
    .then((response) => {
        let $ = cheerio.load(response);
        let comparedPlayer = {
            yearsPlayed: getStatistic('year_ID', $),
            agesActive: getStatistic('age', $),
            teamsPlayedFor: getStatistic('team_ID', $),
            gamesPlayed: getStatistic('G', $),
            plateAppearances: getStatistic('PA', $),
            atBats: getStatistic('AB', $),
            runs:getStatistic('R', $),
            hits: getStatistic('H', $),
            doubles: getStatistic('2B', $),
            triples: getStatistic('3B', $),
            homeruns: getStatistic('HR', $),
            rbis: getStatistic('RBI', $),
            stolenBases: getStatistic('SB', $),
            caughtStealing: getStatistic('CS', $),
            walks: getStatistic('BB', $),
            strikeouts: getStatistic('SO', $),
            battingAverage: getStatistic('batting_avg', $),
            onBasePercentage: getStatistic('onbase_perc', $),
            sluggingPercentage: getStatistic('slugging_perc', $),
            ops: getStatistic('onbase_plus_slugging_plus', $),
            totalBases: getStatistic('TB', $),
            intentionalWalks: getStatistic('IBB', $)
        }

        res.send(comparedPlayer);
    });

});

app.listen(PORT);