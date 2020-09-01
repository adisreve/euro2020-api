const moment = require('moment');

module.exports = {
    getResults: (req, res) => {
        const formattedDate = req.params.date.replace(/-/g, '.');
        const date = moment(formattedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const query = `SELECT * FROM matches WHERE finished=1`;

        db.query(query, (err, result) => {
            if(err) {
                res.status(400).send({ error: true, errorMsg: err})
            }

            const results = [];

            result.forEach(r => {
                const date_play = moment(r.date_play).format('YYYY-MM-DD');

                if(moment(date_play).format('YYYY-MM-DD') == date) {
                    results.push({
                        matchId: r.id,
                        homeTeam: r.home_team,
                        awayTeam: r.away_team,
                        homeScore: r.home_score,
                        awayScore: r.away_score,
                        date: date_play,
                        finished: 1  
                    })
                }
            })

            res.status(200).send({
                result: results
            })
        })
    }
}