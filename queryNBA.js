const nba = require('nba.js').default
const fs = require('fs')

nba.stats.playerCareerStats({ LeagueID: '00', PerMode: 'PerGame', PlayerID: '203954' })
  .then(res => {
    var data = JSON.stringify(res, null, '\t')

    fs.writeFile('data.json', data, (err) => {
      if (err) throw err
      console.log('Save File')
    })
  })

  /*
    MeasureType: 'Scoring', // several other options 
    PerMode: 'PerGame',
    PlusMinus: '2544',
    PaceAdjust: null, //
    Rank: null, //
    Season: '2015-2016', // 2016-2017
    SeasonType: 'Regular Season',
    Outcome: null,
    Location: null,
    Month: null,
    SeasonSegment: null,
    DateFrom: '10/4/2016', // MM/DD/YYYY
    DateTo: '11/15/2016', //
    OpponentTeamID: null, //
    VsConference: null, //
    VsDivsion: null, //
    GameSegment: null,
    Period: '0', // '-13'
    LastNGames: '2', // 'n'
    TeamId: '1610612755'

  })
  */
