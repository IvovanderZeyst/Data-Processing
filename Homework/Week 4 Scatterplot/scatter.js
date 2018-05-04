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
var w = 1000;
var h = 1000;

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
  //console.log(data2);
  //console.log(data4);
  //console.log(data5);
  //console.log(data5[0][0]);

  for (var i = 0; i < data5.length; i++) {
    if (i % 60 == 0) {
      variable1.push(data5[i][0]);
    }
  }

  for (var i = 0; i < data5.length; i++) {
    if (i % 60 == 30) {
      variable2.push(data5[i][0]);
    }
  }

  //console.log(countries)
  //console.log(variable1)
  //console.log(variable2)

  for (var i = 0; i < countries.length; i++) {
    dots.push([variable1[i], variable2[i]]);
  }

  //console.log(dots)

  var svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

            svg.selectAll("circle")
              .data(dots)
              .enter()
              .append("circle")
              .attr("cx", function(d) { return d[0]; })
              .attr("cy", function(d) { return d[1]; })
              .attr("r", 5);
}
