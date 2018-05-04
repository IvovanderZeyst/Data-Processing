// Ivo van der Zeyst, 6166474
var data = "http://stats.oecd.org/SDMX-JSON/data/GENDER_EMP/BEL+CAN+CHL+CZE+DNK+FRA+IRL+ISR+ITA+JPN+KOR+NLD+SVN+ESP+SWE+GBR+USA.EMP1+EMP2.ALL_PERSONS+MEN+WOMEN.3-5+1524+1564+2554+5564+55PLUS+TOTAL.2000+2016/all?&dimensionAtObservation=allDimensions";
var countries = [];
var variable1 = [];
var variable2 = [];
var dots = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];
var w = data.length * 4;
var h = data.length * 3;
var padding = 20;

/*
window.onload = function() {
  console.log('Yes, you can!')
}
*/

d3.queue()
  .defer(d3.request, data)
  .awaitAll(doFunction);

function doFunction(error, response) {
  if (error) throw error;
  data2 = JSON.parse(response[0].responseText);
  data3 = data2.structure.dimensions.observation[0].values;
  data4 = data2.dataSets[0].observations;
  data5 = Object.values(data4);

  countries = data3.map(a => a.name);

  for (var i = 0; i < data5.length; i++) {
    if (i % 60 == 0) {
      variable1.push(data5[i][0]);
    }
    else if (i % 60 == 30) {
      variable2.push(data5[i][0]);
    }
  }

  for (var i = 0; i < countries.length; i++) {
    dots.push([countries[i], variable1[i], variable2[i]]);
  }

  var svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

              var xScale = d3.scale.linear()
                .domain([0, 100])
                .range([padding, w - padding * 2]);

              var yScale = d3.scale.linear()
                .domain([0, 100])
                .range([h - padding, padding]);

              var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");

              var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")

              svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + (h - padding) + ")")
                .call(xAxis);

              svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + padding + ",0)")
                .call(yAxis);

              svg.selectAll("circle")
                .data(dots)
                .enter()
                .append("circle")
                .attr("cx", function(d) { return xScale(d[1]); })
                .attr("cy", function(d) { return yScale(d[2]); })
                .attr("r", 5)

              svg.selectAll("text")
                .data(dots)
                .enter()
                .append("text")
                .text(function(d) { return d[0]; })
                .attr("x", function(d) { return xScale(d[1]); })
                .attr("y", function(d) { return yScale(d[2]); })
}
