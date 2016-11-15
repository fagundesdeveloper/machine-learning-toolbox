;(function () {
  const width = 500
  const height = 500

  const svg = d3.select('#chart')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', 'translate(0,0)')
    // grab chart div, give it a height and width 
    // the put a g inside, transofrm it to got to a location
    // this time it will stay exactly where it is

  // normally we'lll have a lot of math to add margins 
    // but force diagrams don't care about margins

  d3.queue()
    .defer(d3.json, 'data.json')
    .await(ready)
    // then we'll add the data from the json

  // force diagram is a diagram that is the  result of a collection
  // of forces but we have to define those forces
  var simualation = d3.forceSimulation()
    .force('X', d3.forceX(width / 2).strength(.05))
    // a lot of using force diagrams is playing around with
    // the strength variable

  function ready (err, datapoints) {
    var circle = svg.selectAll('.artist')
      .data(datapoints)
      .enter().append('circle')
      .attr('class', 'artist')
      .attr('r', 10)
      .attr('fill', 'lightblue')
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
