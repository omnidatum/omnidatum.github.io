function visualise(data){

    // grab height of the parent container
    var parent = document.getElementById('productionCanvas')


    // MARGIN
    var width = 500;
    var height = 400;

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
    var svg = d3.select("#productionCanvas").append("svg")
              .attr("width", width)
              .attr("height", height);

    // scale
    var scale = d3.scale.linear()
                .domain([0, max])
                .range([0,height]);


    // render method
    function render(data){

      //bind data
      var bars = svg.selectAll("rect").data(data)

      //Enter
      .enter().append("rect")
                  .attr("width", barWidth)
                  .attr("fill", "white")
                  // Update
                  .attr('height', function(d, i){return scale(data[i]) })
                  .attr('x', function(d, i){return barWidth*i })
                  .attr("y", function(d, i){ return height - scale(data[i])});






    }


    render(data);
  }

  var testMonthData = [220, 190, 150, 130, 110, 100, 120, 130, 150, 160, 190, 200];
