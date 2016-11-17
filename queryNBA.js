const nba = require('nba.js').default // could be .stats
const fs = require('fs')
const names = require('./playerNames.json')

var data = {}

for (var key in names) {
  dataGet(key, nba.stats.playerCareerStats({ LeagueID: '00', PerMode: 'PerGame', PlayerID: names[key]}))
}

function dataGet (key, callback) {
  callback.then(res => {
    var contents = res['SeasonTotalsRegularSeason']
    data[key] = contents
    fs.writeFile('data.json', JSON.stringify(data, null, '\t'), (err) => {
      if (err) throw err
    })
  })
    .catch(err => console.error(err))
}

// ONE: Make it overwrite the data file
// TWO: Make it a flat map
// TREE: Trim data to only the necessities so that the d group does less work in D3
