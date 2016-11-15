;(function () {
  const width = 500
  const height = 500
  // step one: get them to the middle
  // use the force x and y
  // step two: don't let them collide
  // set the radius attribute using scaleSqrt
  // then change the collide force to be congruent with the new scaled radius

  var radiusScale = d3.scaleSqrt().domain([1, 300]).range([10, 80])

  const svg = d3.select('#chart')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', 'translate( ' + width / 2 + ',' + height / 2 + ')')

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

  d3.queue()
    .defer(d3.json, 'data.json')
    .await(ready)
    // then we'll add the data from the json

  // force diagram is a diagram that is the  result of a collection
  // of forces but we have to define those forces
  var simualation = d3.forceSimulation()
    .force('x', d3.forceX) // d3.forceX(width / 2).strength(.05))
    .force('y', d3.forceY(height / 2).strength(.05))
    .force('collide'.d3.forceCollide(function (d) {
      return radiusScale(d.sales)
    })) // takes radius
    // a lot of using force diagrams is playing around with
    // the strength variable

  function ready (err, datapoints) {
    var circle = svg.selectAll('.artist')
      .data(datapoints)
      .enter().append('circle')
      .attr('class', 'artist')
      .attr('r', function (d) {
        return radiusScale(d.sales) // the d for data and the name of the data you want to use to calibrate radius
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
})()
