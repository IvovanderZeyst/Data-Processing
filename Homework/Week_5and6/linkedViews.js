//Student: Ivo van der Zeyst
//Studentnumber: 6166474
window.onload = function() {
	d3.queue()
		.defer(d3.json, 'Quality of Life Index for Country 2012.json')
		.defer(d3.json, 'Quality of Life Index for Country 2018.json')
}

d3.json('Quality of Life Index for Country 2012.json', function(data) {

  var colourScale = d3.scale.linear()
          .domain([d3.min(data, function(d) { return parseInt(d.QualityOfLifeIndex * 1.2)}), d3.max(data, function(d) { return parseInt(d.QualityOfLifeIndex * 1.2)})])
          .range(["#F42825","#05FA22"]);

	var CountryCodes = {};
	for (var i = 0; i < data.length; i++) {
		let code = data[i].CountryCode;
		let quality = data[i].QualityOfLifeIndex
		CountryCodes[code] = { numberOfThings: quality, fillColor: colourScale(quality) }
	}

	var worldMap = new Datamap({
	  scope: 'world'
	  , element: document.getElementById('container')
	  , projection: 'mercator'
		, geographyConfig: {
				borderColor: '#000000'
    }
		, fills: {
				defaultFill: '#CFCFCF'
		}
		, data: CountryCodes
	})
})

d3.json('Quality of Life Index for Country 2012.json', function(data) {
	var padding = {top: 30, right: 30, bottom: 100, left: 30};
	var xBoundEnd = d3.max(data, function(d) { return parseInt(d.QualityOfLifeIndex * 1.2); })
	var xBoundStart = d3.min(data, function(d) { return parseInt(d.QualityOfLifeIndex * 1.2); })
	var yBoundEnd = d3.max(data, function(d) { return parseInt(d.PollutionIndex * 1.2); })
	var yBoundStart = d3.min(data, function(d) { return parseInt(d.PollutionIndex * 1.2); })
	var w = 950;
	var h = 700;
	var dots = [];
	var Country = [];
	var QualityOfLifeIndex = [];
	var PollutionIndex = [];

for (var i = 0; i < data.length; i++) {
		Country.push(data[i].Country);
	}

	for (var i = 0; i < data.length; i++) {
		QualityOfLifeIndex.push(data[i].QualityOfLifeIndex);
	}

	for (var i = 0; i < data.length; i++) {
		PollutionIndex.push(data[i].PollutionIndex);
	}

  for (var i = 0; i < data.length; i++) {
    dots.push([Country[i], QualityOfLifeIndex[i], PollutionIndex[i]]);
  }

var svg = d3.select("#container2")
	.append("svg")
  .attr("width", w)
  .attr("height", h);

var xScale = d3.scale.linear()
  .domain([xBoundStart, xBoundEnd])
  .range([padding.left, w - padding.right]);

var yScale = d3.scale.linear()
  .domain([yBoundStart - 20, yBoundEnd])
  .range([h - padding.left, padding.bottom]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")

svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (h - padding.top) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + (padding.top + 370) + ",0)")
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
})
