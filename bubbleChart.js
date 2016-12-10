function bubbleChart(){
  var width = screen.width,
  height = screen.height,
  nodes = [],
  statX = "season_id", 
  statY = "pts",
  seasonZ = 0,
  svg = null,
  players = null
  
  // var color = d3.scaleLinear()
  //   .domain([10, 100])
  //   .range(["brown", "steelblue"]);

  var tooltip = floatingTooltip('statistics_tt', 240);
  var center = { x: width / 2, y: height / 2 };

  const forceStrength = 0.3;

  function charge(d) {
    return -Math.pow(d.radius, 2.0) * forceStrength;
  }

  var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force('x', d3.forceX().strength(forceStrength).x(center.x))
    .force('y', d3.forceY().strength(forceStrength).y(center.y))
    .force('charge', d3.forceManyBody().strength(charge))
    .on('tick', ticked)

  simulation.stop()

  function  createNodes(rawData) {
    var myNodes = Object.keys(rawData).map(function(d){
        return {
          x: Math.random() * 500,
          y: Math.random() * 400,
        radius: Math.random() * 55,
        name: d,
        statistics: rawData[d]
      }
      })

      myNodes.sort(function (a, b) { return b.radius - a.radius; });

    return myNodes
  }

  var curriedStat = function(data){  
    return function(stat, season){
      console.log(data)   //deal with player that have less than 1 season
      var arr  = []
      Object.keys(data).map(player => {
        if(data[player][season] == undefined){
          return
        }
        else {arr.push(data[player][season][stat])}
      })
    return arr
    }
  }


  var chart = function chart(selector, rawData){
    nodes = createNodes(rawData)
    statArray = curriedStat(rawData)

    svg = d3.select('#court')
      .append('svg')
      .attr('height', height)
      .attr('width', width)

    players = svg.selectAll('.players')
      .data(nodes) //can also try adding datapoints here

    var playersE = players.enter()
      .append('circle')
      .on('mouseover', function(d){
        showDetail(d)
      }) 
      .attr('r', 0)  
      .classed('players', true)
      .attr('stroke', function(d){
        return 'black'})
      .attr('stroke-width', 2)
      .attr('fill', 'white')

    players = players.merge(playersE);
 

      players.transition()
        .duration(2000)
        .attr('r', function (d){
          return d.radius
        })

      simulation.nodes(nodes)

      arrangeBubbles(statX, statY, seasonZ)
    }


  function ticked(){
      players
        .attr('cx', function (d,i) {
          return d.x; })
        .attr('cy', function (d) {
          return d.y;
        });
  }

  d3.selectAll('.season')
    .on('click', function(){
      if(this.id === "forward"){
        seasonZ += 1
        arrangeBubbles(statX, statY, seasonZ)
      }
      else if (seasonZ > 0){
        seasonZ -= 1
        arrangeBubbles(statX, statY, seasonZ)
      }
    })



  function generateScale(stat, season, range0 = 0, range1 = width){
    var keyArray = statArray(stat, season)
      return d3.scaleLinear()
        .domain([d3.min(keyArray), d3.max(keyArray)]) 
        .range([range0, range1])     
  }

    function arrangeBubbles(x, y, season, flag = null){

    var scaleY = generateScale(y, season)
    var scaleX = generateScale(x, season)
    var scaleRadius = generateScale('trueShooting', season, 10, 30)
    var scaleColor = generateScale('fg_pct', season, 0, 1)

    //place transition here
    players
      .attr('r', function(d){
        return scaleRadius(d.statistics[season].trueShooting) //radius is not working
      })
      .attr('fill', function(d){
        return d3.interpolateReds(scaleColor(d.statistics[season].fg_pct))
      })

    axis(scaleX, scaleY) 
      
    simulation
      .force('x', d3.forceX().strength(forceStrength).x(function(d){
        return (scaleX(d.statistics[season][x]))
      }))
      .force('y', d3.forceY().strength(forceStrength).y(function(d){
        return (scaleY(d.statistics[season][y]))
      }))
      .alpha(1).restart();
  }

  var axis = function axis(scaleX, scaleY){        
    svg.append('g')
      .attr('transform', 'translate(0,0)')
      .call(d3.axisBottom(scaleX))
     
   svg.append('g')
      .attr('transform', 'translate( ' + 50 + ',' + 50 + ')')
      .call(d3.axisLeft(scaleY))
    }


   function showDetail(d) {

    var content = '<div id="name" class="value" onclick="arrangeBubbles(this.id, 0)"> Name:  ' +
                  d.name +
                  '</div><br/>' +
                  '<div id="pts" class="value" onclick="arrangeBubbles(this.id, 0)"> Points:  ' +
                  d.statistics[0].pts +
                  '</div><br/>' +
                  '<div id="ast" class="value" onclick="arrangeBubbles(this.id, 0)"> Assists:  ' +
                  d.statistics[0].ast +
                  '</div><br/>' +
                  '<div id="reb" class="value" onclick="arrangeBubbles(this.id, 0)"> Rebounds:  ' +
                  d.statistics[0].reb +
                  '</div><br/>' +
                  '<div id="blk" class="value" onclick="arrangeBubbles(this.id, 0)"> Blocks:  ' +
                  d.statistics[0].blk +
                  '</div><br/>' +
                  '<div id="stl" class="value" onclick="arrangeBubbles(this.id, 0)"> Steals:  ' +
                  d.statistics[0].stl +
                  '</div>'
  
    tooltip.showTooltip(content, d3.event);
  }

  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor('yellow')).darker());

    tooltip.hideTooltip();
  }

  return chart
}


// function setupButtons() {
//   d3.select('#toolbar') //add the classes for each of the stat categorting
//     .selectAll('.button')
//     .on('click', function () {
//       // Remove active class from all buttons
//       d3.selectAll('.button').classed('active', false);
//       // Find the button just clicked
//       var button = d3.select(this);

//       // Set it as the active button
//       button.classed('active', true);

//       // Get the id of the button
//       var buttonId = button.attr('id');

//       // Toggle the bubble chart based on
//       // the currently clicked button.
//       myBubbleChart.toggleDisplay(buttonId);
//     });
// }


var myBubbleChart = bubbleChart();

function display(error, data){
  if (error) console.log(error)
  myBubbleChart('#court', data)
}

d3.json('playerData.json', display)
/*

{
  put simulation and transition in this 
  and default values
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

// function generateScale(stat, season){
//     var keyArray = statArray(stat, season)
//     return function(value = null){
//       if (value === null){
//         return d3.scaleLinear()
//           .domain([d3.min(keyArray), d3.max(keyArray)]) 
//           .range([0, width])    
//         }
//         else {
//           var x = d3.scaleLinear()
//           .domain([d3.min(keyArray), d3.max(keyArray)]) 
//           .range([0, width])   //change this to axis or something- should be a variable set
        
//           return x(value)
//         }
//     }
//   }

*/
