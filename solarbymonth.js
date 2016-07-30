function visualise(data){


    // MARGIN
    var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 300 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    //  find tha max of gdp scale
    var justPoints = [];
    for(var num in data){
      justPoints[num] = data[num];
    }
    var min = Math.min.apply(null,justPoints);
    var max = Math.max.apply(null,justPoints);

    // variables
    var barWidth = width / 12;

    // create canvas
    var svg = d3.select("body").append("svg")
              .attr("width", width)
              .attr("height", height);

    // scale
    var scale = d3.scaleLinear()
                .domain([0, max])
                .range([0,height]);


    // render method
    function render(data){

      //bind data
      var bars = svg.selectAll("rect").data(data)

      //Enter
      .enter().append("rect")
                  .attr("width", barWidth)
                  .attr("fill", "green")
                  // Update
                  .attr('height', function(d, i){return scale(data[i]) })
                  .attr('x', function(d, i){return barWidth*i })
                  .attr("y", function(d, i){ return height - scale(data[i])});


      // labels
      svg.append("text")      // text label for the x axis
        .attr("x", 0 )
        .attr("y", height )
        .style("text-anchor", "middle")
        .text("Jan");

      svg.append("text")      // text label for the x axis
        .attr("x", width )
        .attr("y", height )
        .style("text-anchor", "middle")
        .text("Dec");



    }


    render(data);
  }

  var testMonthData = [220, 190, 150, 130, 110, 100, 120, 130, 150, 160, 190, 200];

  visualise(testMonthData);
