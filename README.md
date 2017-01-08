The documentation for the NBA api used here https://github.com/kshvmdn/nba.js/blob/master/docs/EXAMPLES.md#stats


test2

Changes to make: 
 
use d3.interpolateRgb() instead of the imported chromatic scale

axis---->  d3.select(".axis").call(d3.svg.axis().scale(x).orient("bottom));  //v3

d3.select("body").append("svg")
  .attr(class, axis
    width
    height
    append("g")
      .attr traqnsform
      .call axis
      
      
var axis = d3.axisTop(x)  //x is the scale

      axis.tickArguments and axis.tickFormat(d3.format("s")) 
      
.opacity method and hsl and rgb now have built in opacity argument

look up the d3 dispatcher method///

simulation.find //find closest node to a pointer , you no longer have to have a voronoi overlay

d3.nest to transform data, maybe not useful in this case. d3.dispatch, use dipatch.on and dispatch.call to attach custom events
dispatch seems to be a way and maybe the best way to deal with changes from button and interaction events where the data changes... has some good examples http://clhenrick.io/d3-v4-general-update-pattern-punchcard-chart/

.selectall the category, then bind the relevant dara, then exit, I thinj this is what I am looking for
