var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
/*
    var consumption=[431.5478701,
533.2770983,
659.6372838,
765.5841417,
850.1054407,
846.2252214,
913.5385913,
888.2328132,
787.8532265,
556.2210038,
423.2813159,
344.4959933
];
var data = [162450.0, 157950.0, 140100.0, 98910.0, 75270.0, 61260.0, 76740.0, 94830.0, 117300.0, 136140.0, 151170.0, 150480.0];
var months = [0,1,2,3,4,5,6,7,8,9,10,11];
*/


$(function() {



  $('#addressBox-link').click(function(e) {
    $('#restWrap').show();

    $('html,body').animate({ scrollTop: jQuery('#prodItem2').offset().top}, 1000);
    e.preventDefault();

    var addressData = $("#addressBox-input").val();

    console.log(addressData);
/*
    $.ajax({
      method: "get",
      url: "http://test.soldout.tk/get_energy.php",
      data: {
        address: addressData,
        period: 'year'
      },
      success: function(resy) {
      }});*/

    $.ajax({
      method: "get",
      url: "http://test.soldout.tk/get_energy.php",
      data: {
        address: addressData,
        period: 'month'
      },
      success: function(resm) {


                visualise(resm);

var sysSize = 6;
var effRate = 0.89;


var consumption=[431.5478701,
533.2770983,
659.6372838,
765.5841417,
850.1054407,
846.2252214,
913.5385913,
888.2328132,
787.8532265,
556.2210038,
423.2813159,
344.4959933
];
//var data = [162450.0, 157950.0, 140100.0, 98910.0, 75270.0, 61260.0, 76740.0, 94830.0, 117300.0, 136140.0, 151170.0, 150480.0];

data = resm;
data = data.map(function(e){return e*sysSize*effRate})
var production = data;
var buyprice = 0.1617;
var sellprice= 0.08;

var step;
var sav=0;

for (step = 0; step < 12; step++) {
   if (consumption[step] > production[step]) {
       sav += production[step] * buyprice;
   } else {
       sav += consumption[step] * buyprice + ((production[step]-consumption[step]) * sellprice);
   }

}

//var third_graph = [-13995, -13995+sav];
var third_graph=[]
for (var i = 0; i < 25; i++) {
  third_graph[i] = -13995 + sav*i;
}


var terrible_idea = 0;
var fuck_d3 = 0;
var points_x = 0;
var fucking_bravo = data.map(function(e){return{value: e, month:terrible_idea++}});
var fucking_charlie = consumption.map(function(e){return{value: e, month:fuck_d3++}})
var fucking_delta = third_graph.map(function(e){return{yax: e, xax: points_x++}})







// system efficieny fuck equation
var sysSize = 6;
var effRate = 0.89;





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
var line2 = d3.svg.line()
    .x(function(d) { return x(d.month); })
    .y(function(d) { return y(d.value); });

var svg = d3.select("#consumptionCanvas").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//d3.json("linechart.json", type, function(error, data) {
  //if (error) throw error;


x.domain(d3.extent(fucking_bravo, function(d) { return d.month; }));
y.domain([
  0,
  d3.max(fucking_charlie, function(d) { return d.value; })
]);

  

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
      .text("KiloWatts (KWh)");

  svg.append("path")
      .datum(fucking_bravo)
      .attr("class", "line")
      .attr("d", line);

  svg.append("path")
        .datum(fucking_charlie)
        .attr("class", "line2")
        .attr("d", line2);








var x = d3.scale.linear()
    .range([0, width]);
var y = d3.scale.linear()
    .range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("middle");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
var line = d3.svg.line()
    .x(function(d) { return x(d.xax); })
    .y(function(d) { return y(d.yax); });
var svg = d3.select("#investmentCanvas").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('style', "padding-left:40px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



x.domain(d3.extent(fucking_delta, function(d) { return d.xax; }));
y.domain(


  d3.extent(fucking_delta, function(d) { return d.yax; })


);

  

  svg.append("g")
      .attr("class", "x axis2")
      .attr("transform", "translate(0," + height/2 + ")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis2")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Savings ($)");
  svg.append("path")
      .datum(fucking_delta)
      .attr("class", "line")
      .attr("d", line);




$('#loading-front').hide();


      }});

    $.ajax({
      method: "get",
      url: "http://test.soldout.tk/get_energy.php",
      data: {
        address: addressData,
        sunshine: 1
      },
      success: function(ress) {
$("#sunlightHoursNumber").text(ress);
      }});




/*
                console.log(ress, resm, resy);
              }
            });
          }
        });
      }
    });*/
    return false;
  });

});
