var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.month); })
    .y(function(d) { return y(d.value); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//d3.json("linechart.json", type, function(error, data) {
  //if (error) throw error;
var data = [162450.0, 157950.0, 140100.0, 98910.0, 75270.0, 61260.0, 76740.0, 94830.0, 117300.0, 136140.0, 151170.0, 150480.0];
var months = [0,1,2,3,4,5,6,7,8,9,10,11];

var terrible_idea = 0;
var fucking_bravo = data.map(function(e){return{value: e, month:terrible_idea++}});

x.domain(d3.extent(fucking_bravo, function(d) { return d.month; }));
y.domain(d3.extent(fucking_bravo, function(d) { return d.value; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

  svg.append("path")
      .datum(fucking_bravo)
      .attr("class", "line")
      .attr("d", line);
//});
