function bubbleChart(){
  console.log('oh it you')
  var width = 940;
  var height = 600;

  var center = { x: width / 2, y: height / 2 };


  var nodes = []
  var svg = null
  var players = null


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
