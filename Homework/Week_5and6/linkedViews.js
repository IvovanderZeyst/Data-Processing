//Student: Ivo van der Zeyst
//Studentnumber: 6166474

window.onload = function() {
	d3.queue()
		.defer(d3.json, 'Quality of Life Index for Country 2012.json')
		.defer(d3.json, 'Quality of Life Index for Country 2018.json')
		.await(main)
}

function main(error, data2012) {
	makeMap(data2012)
	makeScatterplot(data2012)
}

function makeMap(data1) {

	var colourScale = d3.scale.linear()
		.domain([d3.min(data1, function(d) { return parseInt(d.SafetyIndex * 1.2)}), d3.max(data1, function(d) { return parseInt(d.SafetyIndex * 1.2)})])
		.range(["#F42825","#05FA22"]);

	var CountryCodes1 = {};
		for (var i = 0; i < data1.length; i++) {
			let code = data1[i].CountryCode;
			let quality = data1[i].SafetyIndex
			CountryCodes1[code] = { numberOfThings: quality, fillColor: colourScale(quality) }
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
		, data: CountryCodes1
		, height: 550
		, width: 900
	})

	var leg = {
  	legendTitle: "Safety Index"
	};
}


function makeScatterplot(data1) {
	var padding = {top: 30, right: 30, bottom: 100, left: 30};
	var xBoundEnd = 140//d3.max(data, function(d) { return parseInt(d.SafetyIndex * 1.2); })
	var xBoundStart = 0//d3.min(data, function(d) { return parseInt(d.SafetyIndex * 1.2); })
	var yBoundEnd = 140//d3.max(data, function(d) { return parseInt(d.PurchasingPowerIndex * 1.2); })
	var yBoundStart = 0//d3.min(data, function(d) { return parseInt(d.PurchasingPowerIndex * 1.2); })
	var w = 950;
	var h = 700;
	var dots = [];
	var Country = [];
	var SafetyIndex = [];
	var PurchasingPowerIndex = [];

for (var i = 0; i < data1.length; i++) {
		Country.push(data1[i].Country);
	}

	for (var i = 0; i < data1.length; i++) {
		SafetyIndex.push(data1[i].SafetyIndex);
	}

	for (var i = 0; i < data1.length; i++) {
		PurchasingPowerIndex.push(data1[i].PurchasingPowerIndex);
	}

  for (var i = 0; i < data1.length; i++) {
    dots.push([Country[i], SafetyIndex[i], PurchasingPowerIndex[i]]);
  }

var svg = d3.select("#container2")
	.append("svg")
  .attr("width", w)
  .attr("height", h);

var xScale = d3.scale.linear()
  .domain([xBoundStart, xBoundEnd])
  .range([padding.left, w - padding.right]);

var yScale = d3.scale.linear()
  .domain([yBoundStart, yBoundEnd])
  .range([h - padding.left, padding.top]);

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
  .attr("transform", "translate(" + padding.top + ",0)")
  .call(yAxis);

svg.selectAll("circle")
  .data(dots)
  .enter()
  .append("circle")
  .attr("cx", function(data1) { return xScale(data1[1]); })
  .attr("cy", function(data1) { return yScale(data1[2]); })
  .attr("r", 7)

svg.selectAll("text")
  .data(dots)
  .enter()
  .append("text")
  .text(function(data1) { return data1[0]; })
  .attr("x", function(data1) { return xScale(data1[1]) + 5; })
  .attr("y", function(data1) { return yScale(data1[2]) - 5; })

	svg.append("text")
      .attr("transform", "translate(500, 660)")
      .style("text-anchor", "end")
      .text("Safety Index")
}

d3.json('Quality of Life Index for Country 2018.json', function(data) {

	var colourScale2 = d3.scale.linear()
		.domain([d3.min(data, function(d) { return parseInt(d.SafetyIndex * 1.2)}), d3.max(data, function(d) { return parseInt(d.SafetyIndex * 1.2)})])
		.range(["#F42825","#05FA22"]);

	var CountryCodes2 = {};
		for (var i = 0; i < data.length; i++) {
			let code = data[i].CountryCode;
			let quality = data[i].SafetyIndex
			data[code] = { numberOfThings: quality, fillColor: colourScale2(quality) }
		}

	function updateBoth(data) {
		d3.select("#button")
			.data(data)
			.enter()
			.on("click", function(data) {
				worldMap.updateChoropleth({
					data: CountryCodes2
				})
			}
		)
	}
})
