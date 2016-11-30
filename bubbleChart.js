function bubbleChart(){
  var width = screen.width;
  var height = screen.height;

  var tooltip = floatingTooltip('statistics_tt', 240);

  var center = { x: width / 2, y: height / 2 };


  var nodes = []
  var svg = null
  var players = null
  var statScale = null

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

  //var radiusScale = d3.scaleSqrt().domain([1, 300]).range([10, 80])

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
      var arr  = []
      Object.keys(data).map(player => {
        arr.push(data[player][season][stat])
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
      //    console.log(d)
        return 'black'})
      .attr('stroke-width', 2)
      .attr('fill', 'white')

    players = players.merge(playersE);
    axis()

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
          return d.x; })
        .attr('cy', function (d) {
          return d.y;
        });
  }

  function groupBubbles(){

    simulation
    .force('x', d3.forceX().strength(forceStrength).x(function(d){
      return (d.statistics[0].pts * 10)
    }))
    .force('y', d3.forceY().strength(forceStrength).y(function(d){
      return createScale('gs', d.statistics[0].gs)
    }))
    .alpha(1).restart();

  }

  function generateScale(stat, season){
    var keyArray = statArray(stat, season)
    return function(value){
      d3.scaleLinear(value)
      .domain([d3.min(keyArray), d3.max(keyArray)]) 
      .range([0, width])   //change this to axis or something- should be a variable set
    }
  }

  function arrangeBubbles(){
    var  scale = generateScale('pts', 0)
    //call simulation method and axis method and let them shift using the new scaled array 

    //this guy sets the variable for the scale 
    //check how to have a conscise scale for ticks and position
    //then scale change of axis, position/forces
    simulation
    .force('x', d3.forceX().strength(forceStrength).x(10))
    .alpha(1).restart()

  }

  function axis(){
    console.log('here')
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

    }
  



    
  
   function showDetail(d) {
    var content = '<span class="name">Name: </span><span class="value">' +
                  d.name +
                  '</span><br/>' + 
                  '<span class="ast">Assists: </span><span class="value">' +
                  d.statistics[0].ast +
                  '</span><br/>' +
                  '<span class="blk">Blocks: </span><span class="value">' +
                  d.statistics[0].blk +
                  '</span><br/>' +
                  '<span class="reb">Rebounds: </span><span class="value">' +
                  d.statistics[0].reb +
                  '</span><br/>' +
                  '<span class="stl">Steals: </span><span class="value">' +
                  d.statistics[0].stl +
                  '</span>'

    tooltip.showTooltip(content, d3.event);
  }

  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor('yellow')).darker());

    tooltip.hideTooltip();
  }
  /*
   * Hides tooltip
   
  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.group)).darker());

    tooltip.hideTooltip();
  }

  */

  //   chart.toggleDisplay = function (displayName) {
  //   if (displayName === 'year') {
  //     splitBubbles();
  //   } else {
  //     groupBubbles();
  //   }
  // };

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
