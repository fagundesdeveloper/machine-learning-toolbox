const nba = require('nba.js').default
const fs = require('fs')

// returns json
nba.stats.allPlayers().then(res => {
  var data = JSON.stringify(res, null, '\t')

  fs.writeFile('data.json', data, (err) => {
    if (err) throw err
    console.log('Save File')
  })
// console.log(res)
})
