window.onload = function () {
  const height = 600
  const width = 600

  var radiusScale = d3.scaleSqrt().domain([1, 300]).range([10, 80])

  var xCors = []
  var yCors = []
  var svg = d3.select('#court')
    .append('svg')
    .attr('height', height)
    .attr('width', width)

  d3.queue()
    .defer(d3.json, 'data.json')
    .await(ready)

  function ready (err, data) {
    var elem = svg.selectAll('g')
      .data(data)

    var elemEnter = elem.enter()
      .append('g')
      .attr('transform', 'translate(0,0)')

    var nodes = elemEnter.append('circle')
      .attr('r', 20)
      .attr('stroke', 'black')
      .attr('fill', 'white')
      .on('click', function (d) {
        console.log(d)
      })
      .attr('cx', function (d) {
        var xCor = d[Object.keys(d)[0]][0].gs
        xCors.push(xCor)
        return xCor * 10
      })
      .attr('cy', function (d) {
        var yCor = d[Object.keys(d)[0]][0].pts
        yCors.push(yCors)
        return yCor * 10
      })

    elemEnter.append('text')
      .text(function (d) {
        return (d[Object.keys(d)[0]][0].name)
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('font-color', 'black')
      .attr('dx', function (d) {
        return (d[Object.keys(d)[0]][0].gs * 10) // -radius + 1
      })
      .attr('dy', function (d) {
        return (d[Object.keys(d)[0]][0].pts * 10)
      })

    var xScale = d3.scaleLinear()
      .range([0, xCors.max])

    var xAxis = elem
      .d3.axisBottom(xScale)
      // ticks

    // var nodes = svg.selectAll('.player')
      //   .data(data)
      //   .enter().append('circle')
      //   .attr('class', 'player')
      //   .attr('r', function (d) {
      //     return (d[Object.keys(d)[0]][0].player_age)
      //   })
      //   .attr('fill', 'lightblue')

    //   .on('click', function (d) {
      //     console.log(d)
      //   })
      //   .attr('cx', function (d) {
      //     return (d[Object.keys(d)[0]][0].gs * 10)
      //   })
      //   .attr('cy', function (d) {
      //     return (d[Object.keys(d)[0]][0].pts * 10)
      //   })

    // var text = svg.selectAll(nodes)
      //   .append('text')
      //   .text('hello')
      // .attr('x', 0)
      // .attr('y', 0)
      // .attr('font-family', 'sans-serif')
      // .attr('font-size', '10px')
      // .attr('text-anchor', 'middle')

    // var simulation = d3.forceSimulation(nodes)
      //   .force('x', d3.forceX(width / 2).strength(0.05))
      //   .force('y', d3.forceY(height / 2).strength(0.05))
      //   .force('collide', d3.forceCollide(10).strength(0.05)) 

    var simulation = d3.forceSimulation(data)
      .force('x', d3.forceX(function (d) { return (d[Object.keys(d)[0]][0].min * 10)}).strength(1))
      .force('y', d3.forceY(height / 2))
      .force('collide', d3.forceCollide(4))

      // .stop()

      // simulation
      //   .on('tick', tick)

      // function tick () {
      //   nodes
      // // .attr('cx', 10)
      // // .attr('cy', 20)
      // }

  // d3.select('#seperate').on('click', function () {
  //   // simulation
  //   //   .force('x', d3.forceX(250)) // .strength(.05) // strength is optional
  //   //   .force('y', d3.forceY(250))
  //   //   .alphaTarget(0.5)
  //   //   .restart()
  //   circles
  //     .attr('cy', 200)
  // })
  }
}

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

  // nodes is a phrase used often in d3
  // and it refers to the circles or things grouped in 'g'
  simulation.nodes(datapoints)
    .on('tick', ticked)
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
