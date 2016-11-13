const nba = require('nba.js').default
const fs = require('fs')

// returns json
nba.stats.allPlayers().then(res => {
  fs.writeFile('data.txt', res, (err) => {
    if (err) throw err
    console.log('Save File')
  })
// console.log(res)
})
