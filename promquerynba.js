const nba = require('nba.js').default // could be .stats
const fs = require('fs')
const names = require('./playerNames.json')

var endjson = {};
var promarr = [];

function makepromCalls(key) {
  var promNBA = new Promise(function(resolve, rej){
    nba.stats.playerCareerStats({ LeagueID: '00', PerMode: 'PerGame', PlayerID: key.id}, function(err, d){
      endjson[key.name] = d['SeasonTotalsRegularSeason'];
      for (season in endjson[key.name]){
        endjson[key.name][season].season_id = parseInt(endjson[key.name][season].season_id.substring(0, 4))
      }
      resolve([d, key])
    })
  })

  return promNBA;

}

for(i of names){

  promarr.push(makepromCalls(i));
}


Promise.all(promarr).then(function(d){

  fs.writeFileSync('playerData.json', JSON.stringify(endjson, null, '\t')); //null, '\t')

})
