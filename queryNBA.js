const nba = require('nba.js').default // could be .stats
const fs = require('fs')
const names = require('./playerNames.json')

var data = []

fs.unlink('data.json', err => {
  if (err) throw err
})

for (var key in names) {
  dataGet(key, nba.stats.playerCareerStats({ LeagueID: '00', PerMode: 'PerGame', PlayerID: names[key].id}))
}

function dataGet (key, callback) {
  callback.then(res => {
    console.log(res)
    var seasons = res['SeasonTotalsRegularSeason']
    for (var year in seasons) {
      // here we can also strip any unnecessay datapoints
      seasons[year].name = names[key].name
    }

    data.push(seasons)
    fs.appendFile('data.json', JSON.stringify(data, null, '\t'), (err) => {
      if (err) throw err
    })
  })
    .catch(err => console.error(err))
}

// ONE: Make it overwrite the data file
// TWO: Make it a flat map
// TREE: Trim data to only the necessities so that the d group does less work in D3
// Four: make sure that the json file is proper format 
