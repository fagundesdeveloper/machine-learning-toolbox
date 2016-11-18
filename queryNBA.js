const nba = require('nba.js').default // could be .stats
const fs = require('fs')
const names = require('./playerNames.json')

var featcount = 0;
var appcount = 0;
//console.log(names)
var data = []

var fidata = 'data.json';

fs.writeFileSync('data.json', '[\n');

//var wriStream = fs.createWriteStream('data.json');


for (var key in names) {

  dataGet(key, nba.stats.playerCareerStats({ LeagueID: '00', PerMode: 'PerGame', PlayerID: names[key].id}))

}


function dataGet (key, callback) {

  callback.then(res => {
    console.log('res ', names[key])
    var seasons = res['SeasonTotalsRegularSeason']
    var wridata = {} //{names[key].name: res['SeasonTotalsRegularSeason']}

    wridata[names[key].name] = seasons;

    for (var year in seasons) {
      // here we can also strip any unnecessay datapoints
      seasons[year].name = names[key].name

    }

  //  console.log(wridata);

    data.push(seasons)

var objstr
    console.log(featcount)

    featcount++;
    if(featcount !== names.length){
      objstr =   JSON.stringify(wridata, null, '\t') + ','

    }
    else{
      objstr =  JSON.stringify(wridata, null, '\t')

    }


    fs.appendFile('data.json', objstr, (err) => {
      appcount++;

      if (err) throw err

        if(appcount === names.length){

          fs.appendFile('data.json', ']\n');

        }


    })


  }).catch(err => console.error(err))

}

// TWO: Make it a flat map
// TREE: Trim data to only the necessities so that the d group does less work in D3
// Four: make sure that the json file is proper format
