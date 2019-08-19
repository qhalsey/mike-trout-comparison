const express = require("express");
const rp = require("request-promise");
const PORT = 3000;

let app = express();


app.get("/", (req, res) => {
    let options = {
        uri: `http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='trout%25'`,
        json: true
    }

    rp(options)
        .then((response) => {
            return response.search_player_all;
        }).then((response) => {
            let playerStatsOptions = {
                uri: `http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2017'&player_id='${response.queryResults.row.player_id}'`,
                json: true
            }
            return rp(playerStatsOptions)
        }).then((response) => {
            console.log(response.sport_hitting_tm);
        })
});

app.listen(PORT);