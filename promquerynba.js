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
        endjson[key.name][season].trueShooting = (endjson[key.name][season].pts / (2 * (endjson[key.name][season].fga + (0.44 * endjson[key.name][season].fta)))).toFixed(3)
        endjson[key.name][season].countingStats = (endjson[key.name][season].reb + endjson[key.name][season].ast + endjson[key.name][season].blk + endjson[key.name][season].stl).toFixed(1)
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
