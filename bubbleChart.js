function bubbleChart(){
  console.log('oh it you')

  var width = 940;
  var height = 600;

  var center = { x: width / 2, y: height / 2 };


  var nodes = []
  var svg = null
  var players = null


  const forceStrength = 0.3;

  const height = screen.height
  const width = screen.width

  var nodes = []
  var svg = null
  var players = null


  const forceStrength = 0.03;

  var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force('x', d3.forceX().strength(forceStrength))
    .force('y', d3.forceY().strength(forceStrength))
    .on('tick', ticked)

  simulation.stop()

  //var radiusScale = d3.scaleSqrt().domain([1, 300]).range([10, 80])
  function  createNodes(rawData) {
    var myNodes = rawData.map(function(d){
        return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 30
      }
      })
    return myNodes
  }


var chart = function chart(selector, rawData){
  console.log('hello')
  nodes = createNodes(rawData)

  svg = d3.select('#court')
    .append('svg')
    .attr('height', height)
    .attr('width', width)

  players = svg.selectAll('.players')
    .data(nodes) //can also try adding datapoints here

  var playersE = players.enter()
    .append('circle')
    .classed('player', true)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', 'white')

    players.transition()
      .duration(2000)
      .attr('r', function (d){ return d.radius})

    simulation.nodes(nodes)

    groupBubbles();
  }

  function ticked(){
      players
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
  }

  function groupBubbles(){
    simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
    simulation.alpha(1).restart();
  }
  return chart
}

var myBubbleChart = bubbleChart();

function display(error, data){
  if (error) console.log(error)
  bubbleChart('#court', data)
}

d3.json('data.json', display)

/*
var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force("x", d3.forceX().strength(0.002))
    .force("y", d3.forceY().strength(0.002))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on('tick', ticked)
  
  simulation.stop();
>>>>>>> 4756dc213a29a5fb10e2209da49b119eacb83505:bubbleChart.js

  function charge(d) {
    return -Math.pow(d.radius, 2.0) * forceStrength;
  }

<<<<<<< HEAD:bubbleChart.js
  var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force('x', d3.forceX().strength(forceStrength).x(center.x))
    .force('y', d3.forceY().strength(forceStrength).y(center.y))
    .force('charge', d3.forceManyBody().strength(charge))
    .on('tick', ticked)

  simulation.stop()

  //var radiusScale = d3.scaleSqrt().domain([1, 300]).range([10, 80])
  function  createNodes(rawData) {


    console.log(rawData)

    var myNodes = Object.keys(rawData).map(function(d){
        return {
          x: Math.random() * 500,
          y: Math.random() * 400,
        radius: Math.random() * 55
      }
      })

      myNodes.sort(function (a, b) { return b.radius - a.radius; });

    return myNodes
  }


  var chart = function chart(selector, rawData){
    console.log('hello')
    nodes = createNodes(rawData)

    svg = d3.select('#court')
      .append('svg')
      .attr('height', height)
      .attr('width', width)

    players = svg.selectAll('.players')
      .data(nodes) //can also try adding datapoints here

    var playersE = players.enter()
      .append('circle')
      .attr('r', 0)

      .classed('players', true)
      .attr('stroke', function(d){
      //    console.log(d)
        return 'black'})
      .attr('stroke-width', 2)
      .attr('fill', 'green')

    players = players.merge(playersE);

      players.transition()
        .duration(2000)
        .attr('r', function (d){
        //    console.log(d)
          return d.radius
        })

      simulation.nodes(nodes)

      groupBubbles();
    }


  function ticked(){
      players
        .attr('cx', function (d,i) {
          console.log(i, d)
          return d.x; })
        .attr('cy', function (d) {
          return d.y;
        });
  }

  function groupBubbles(){

    simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
    simulation.alpha(1).restart();

  }

  return chart

}

var myBubbleChart = bubbleChart();


function display(error, data){
  if (error) console.log(error)
  myBubbleChart('#court', data)
}


d3.json('data.json', display)

/*
var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force("x", d3.forceX().strength(0.002))
    .force("y", d3.forceY().strength(0.002))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on('tick', ticked)
  
  simulation.stop();

    var elem = svg.selectAll('g')
      .data(data)

    var elemEnter = elem.enter()
      .append('g')
      .attr('other', function(d){
        {d.y =  20,
        d.x = 20,
        d.radius = 100}
      })
      .attr('transform', 'translate(0,0)') 
     
    var nodes = elemEnter
      .append('g')
      .append('circle')
      .attr('r', function(d){
        return d.radius
      })
      .attr('class', 'circles')
      .attr('stroke', 'black')
      .attr('fill', 'white')

      .on('click', function (d) {
        console.log(d)
      })
      .attr('cx', function (d) {
        return (10)
     })
      .attr('cy', function(d){
        return (d.y * 10)
      })

=======
    var elemEnter = elem.enter()
      .append('g')
      .attr('other', function(d){
        {d.y =  20,
        d.x = 20,
        d.radius = 100}
      })
      .attr('transform', 'translate(0,0)') 
     
    var nodes = elemEnter
      .append('g')
      .append('circle')
      .attr('r', function(d){
        return d.radius
      })
      .attr('class', 'circles')
      .attr('stroke', 'black')
      .attr('fill', 'white')

      .on('click', function (d) {
        console.log(d)
      })
      .attr('cx', function (d) {
        return (10)
     })
      .attr('cy', function(d){
        return (d.y * 10)
      })

>>>>>>> 4756dc213a29a5fb10e2209da49b119eacb83505:bubbleChart.js
    var label = elemEnter.append('text')
      .text(function (d) {
        return (d[Object.keys(d)[0]][0].name)
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('font-color', 'black')
      .attr('dx', function (d) {
        return (d.x * 10) // -radius + 1
      })
      .attr('dy', function (d) {
        return (d.y * 10)
      })

  
    var xScale = d3.scaleLinear()
    .range([0, 1000])


    var axisX = svg.append("g")
      .attr("class", "axis")
      .attr('transform', 'translate(0,0)')
      .call(d3.axisBottom(xScale))

    var axisY = svg.append("g")
      .attr("class", "axis")
      .attr('transform', 'translate( ' + 10 + ',' + 10 + ')')
      .call(d3.axisLeft(xScale))

    function coordinateArray(key){
      var arr  = []
      data.forEach(player => {
        for(season in player){
          arr.push(player[season][0][key])
          }
      })
      return arr
      }

      simulation.nodes(nodes)

//       ////////////////////////force simulation
// function charge(d) {
//   return -forceStrength * Math.pow(d.radius, 2.0);
// }


function ticked() {
  //console.log(nodes)
  nodes
    .attr('cx', function (d) { return d.x + 30})
    .attr('cy', function (d) { return d.y + 30})
}

simulation.nodes(nodes)


simulation.alpha(1).restart();
// var center = {x: width / 2, y: height / 2};
// var forceStrength = 0.03;

// //simulation.alpha(1).restart(); ///upon movement we need to reset the alpha so that the nodes have
// //enough energy to make the movements

}

// var simulation = d3.forceSimulation(nodes)
//   .velocityDecay(0.2)
//   .force('x', d3.forceX().strength(forceStrength).x(center.x))
//   .force('y', d3.forceY().strength(forceStrength).y(center.y))
//   .force('charge', d3.forceManyBody().strength(charge))
//   .on('tick', ticked);

  //   var simulation = d3.forceSimulation(nodes)
  //     .force('x', d3.forceX(width / 2).strength(0.05))
  //     .force('y', d3.forceY(function (d) {
  //       return (d[Object.keys(d)[0]][0].pts * 10)
  //     }).strength(0.05))
  //     .force('collide', d3.forceCollide(10).strength(0.05)) 

  //   simulation
  //     .on('tick', ticked)

  //   function ticked () {
  //     nodes
  // }
///////////////////////////////////////////////////



   //end of ready 
}



  // d3.select('#seperate').on('click', function () {
  //   // simulation
  //   //   .force('x', d3.forceX(250)) // .strength(.05) // strength is optional
  //   //   .force('y', d3.forceY(250))
  //   //   .alphaTarget(0.5)
  //   //   .restart()
  //   circles
  //     .attr('cy', 200)
  // })



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

I then slowly ramp up collision strength over the length of the transition, with a d3.timer:
let strength = simulation.force('collide').strength(),
  endTime = 3000;
let transitionTimer = d3.timer(elapsed => {
  let dt = elapsed / endTime;
  simulation.force('collide').strength(Math.pow(dt, 3) * strength);
  if (dt >= 1.0) transitionTimer.stop();
});

*/
