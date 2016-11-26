const nba = require('nba.js').default // could be .stats
const fs = require('fs')
const names = require('./playerNames.json')

var fidata = 'data.json';

var endjson = {};

var promarr = [];

function makepromCalls(key) {
  var promNBA = new Promise(function(resolve, rej){
    nba.stats.playerCareerStats({ LeagueID: '00', PerMode: 'PerGame', PlayerID: key.id}, function(err, d){
    //  console.log('getting carreer stats ', d)
      endjson[key.name] = d;
      resolve([d, key])
    })
  })

  return promNBA;

}

for(i of names){

  promarr.push(makepromCalls(i));
  console.log(i);
}


Promise.all(promarr).then(function(d){

  console.log('got all', d[0][1])

//  console.log(endjson)
  fs.writeFileSync('data.json', JSON.stringify(endjson)); //null, '\t')

})
