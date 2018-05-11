//Student: Ivo van der Zeyst
//Studentnumber: 6166474
//var 2016 = [];
//var 2018 = [];
window.onload = function() {

	d3.queue()
		.defer(d3.json, 'Quality of Life Index for Country 2012.json')
		.defer(d3.json, 'Quality of Life Index for Country 2018.json')
		//.defer(d3.request, data)
	  //.awaitAll(doFunction);

//console.log('done2')

	//function makePlots (error, json1, json2) {

	d3.json('Quality of Life Index for Country 2012.json', function(data) {
		var worldMap = new Datamap({
		  scope: 'world'
		  , element: document.getElementById('container')
		  , projection: 'mercator'
			, geographyConfig: {
        dataJson: 'Quality of Life Index for Country 2012.json'
				, borderColor: '#000000'
      }
			, fills: {
				'MAJOR': '#306596',
				'MEDIUM': '#0fa0fa',
				'MINOR': '#bada55',
				defaultFill: '#dddddd'
			}
			, data: {
      	'USA': { fillKey: 'MINOR' }
				, 'NLD': { fillKey: 'MINOR' }
      }
		})
	})

	d3.json('Quality of Life Index for Country 2012.json', function(data) {
		var w = data.length * 40;
		var h = data.length * 30;
		var padding = 20;
		var dots = [];
		var Country = [];
		var QualityOfLifeIndex = [];
		var PollutionIndex = [];

		for (var i = 0; i < data.length; i++) {
			Country.push(data[i].Country);
		}

		for (var i = 0; i < 51/*data.length*/; i++) {
			QualityOfLifeIndex.push(data[i].QualityOfLifeIndex);
		}

		for (var i = 0; i < data.length; i++) {
			PollutionIndex.push(data[i].PollutionIndex);
		}

	  for (var i = 0; i < data.length; i++) {
	    dots.push([Country[i], QualityOfLifeIndex[i], PollutionIndex[i]]);
	  }
		console.log(dots);

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
	)
}
