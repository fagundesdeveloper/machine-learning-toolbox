window.onload = function () {
  const height = 600
  const width = 1600

  // var radiusScale = d3.scaleSqrt().domain([1, 300]).range([10, 80])

  const svg = d3.select('#court')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', 'translate(0,0)') // 'translate( ' + width / 2 + ',' + height / 2 + ')')


    var y = d3.scaleLinear().range([height, 0]);

  // d3.queue()
    //   .defer(d3.json, 'playerNames.json')
    //   .await(ready)

  d3.json('data.json', function (err, data) {
    if(err){
      console.log(err)
    }
    console.log(data)



//    console.log(data)
    var dat = Object.keys(data);
  //  console.log(dat)

  y.domain([0, d3.max(dat, function(d) {         console.log(data[d]['CareerTotalsRegularSeason'][0]['reb'])
              return data[d]['CareerTotalsRegularSeason'][0]['reb'];
            })]);

    svg.selectAll('.player')
      .data(dat)
      .enter().append('circle')
      .attr('class', 'player')
      .attr('r', 10)
      .attr('fill', 'lightblue')
      .on('click', function (d) {
        console.log(d, data[d])
      })
      .attr('cx', function (d) {
    //    console.log(Object.keys(d)[0])
        console.log(d, data[d]['CareerTotalsRegularSeason'][0]['fg_pct'])
        return data[d]['CareerTotalsRegularSeason'][0]['fg_pct'] * 2000 - 500
      })
      .attr('cy',  function (d) {
      //  console.log(y(data[d]['CareerTotalsRegularSeason'][0]['reb']))
        return y( data[d]['CareerTotalsRegularSeason'][0]['reb'])
      })
  })


}
// var simualation = d3.forceSimulation()

// .force('x', d3.forceX) // d3.forceX(width / 2).strength(.05))
// .force('y', d3.forceY(height / 2).strength(.05))
// .force('collide'.d3.forceCollide(function (d) {
//   return radiusScale(d.pts)
// }))

// function ready (err, datap) {
//   var circle = svg.selectAll('.player')
//     .data(data)
//     .enter().append('circle')
//     .attr('class', 'player')
//     .attr('r', 10)
//     .attr('fill', 'lightblue')
//     .on('click', function (d) {
//       console.log(d)
//     })
//     .attr('cx', 50)
//     .attr('cy', 50)

// simulation.nodes(datapoints)
//   .on('tick', ticked)

// function ticked () {
//   circles
//     .attr('cx', function (d) {
//       return d.x
//     })
//     .attr('cy', function (d) {
//       return d.y
//     })
// }

/*
// step one: get them to the middle
// use the force x and y
// step two: don't let them collide
// set the radius attribute using scaleSqrt
// then change the collide force to be congruent with the new scaled radius

c

  var defs = svg.append('defs')
  var forceX = d3.forceX(function (d) {
    if (d.decade === 'pre-2000') {
      return 150
    } else {
      800
    }
  }).strength(.05)

  d3.select('#combine').on('click', function () {})

  d3.select('#seperate').on('click', function () {
    simulation
      .force('x', d3.forceX(width / 2)).strength(.05) // strength is optional
      .alphaTarget(0.5)
      .restart()
  })

  // then we'll add the data from the json

// force diagram is a diagram that is the  result of a collection
// of forces but we have to define those forces
 // takes radius
  // a lot of using force diagrams is playing around with
  // the strength variable

function ready (err, datapoints) {
  var circle = svg.selectAll('.player')
    .data(datapoints)
    .enter().append('circle')
    .attr('class', 'player')
    .attr('r', function (d) {
      return radiusScale(d.pts) // the d for data and the name of the data you want to use to calibrate radius
    })
    .attr('fill', 'lightblue')
    .on('click', function (d) {
      console.log(d)
    })
    .attr('cx', 50)

  // nodes is a phrase used often in d3
  // and it refers to the circles or things grouped in 'g'
  simulation.nodes(datapoints)
    .on('tick', ticked)

  function ticked () {
    circles
      .attr('cx', function (d) {
        return d.x
      })
      .attr('cy', function (d) {
        return d.y
      })
  }
}
}

 defs.append('pattern')
  .attr('id', 'someID')
  .attr('height', '100%')
  .attr('width', '100%')
  .attr('patternContentUnits')
  .append('image')
  .attr('xlink:href', 'snow.jpg')
  .attr('fill', function (d) {
    return 'url(' + d.name.toLowerCase().replace('/ /g', '-') + ')' // here we have a regular expression that meand space and global
  })
  // grab chart div, give it a height and width
  // the put a g inside, transofrm it to got to a location
  // this time it will stay exactly where it is

// normally we'lll have a lot of math to add margins
  // but force diagrams don't care about margins

defs.selectAll('.artist-pattern')
  .data(datapoints)
  .enter().append('pattern')
  .attr('class', 'artist-pattern')
  // copy paste everything that the pattern needs to be defined but use the d to give
  // a custom id and image path

*/
