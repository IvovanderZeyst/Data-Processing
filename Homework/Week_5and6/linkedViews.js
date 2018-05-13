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

    var paletteScale = d3.scale.linear()
            .domain([d3.min(data, function(d) { return parseInt(d.QualityOfLifeIndex * 1.2)}), d3.max(data, function(d) { return parseInt(d.QualityOfLifeIndex * 1.2)})])
            .range(["#F42825","#05FA22"]);

		var CountryCodes = {};
		for (var i = 0; i < data.length; i++) {
			let code = data[i].CountryCode;
			let quality = data[i].QualityOfLifeIndex
			CountryCodes[code] = { numberOfThings: quality, fillColor: paletteScale(quality) }
		}
		/*
		for (var i = 0; i < data.length; i++) {
			CountryCodes[i] = "'" + data[i].CountryCode + "'" + ": { fillKey: 'MAJOR'},"
		}
		*
		/*
		for(var i = 0; i < data.length; i++) {
			CountryCodes.push("'" + data[i].CountryCode + "'" + ": { fillKey: 'MAJOR'}")
		}
		*/
		console.log(CountryCodes)
		var worldMap = new Datamap({
		  scope: 'world'
		  , element: document.getElementById('container')
		  , projection: 'mercator'
			, geographyConfig: {
        dataJson: 'Quality of Life Index for Country 2012.json'
				, borderColor: '#000000'
      }
			, fills: {
					defaultFill: '#CFCFCF'
			}
			, data: CountryCodes
			/*{
      	'USA': { fillKey: 'MINOR' }
				, 'NLD': { fillKey: 'MINOR' }
      }*/
		})
	})

	d3.json('Quality of Life Index for Country 2012.json', function(data) {
		var padding = {top: 30, right: 30, bottom: 100, left: 30};				// var padding = 20;
		var xBoundEnd = d3.max(data, function(d) { return parseInt(d.QualityOfLifeIndex * 1.2); })
		var xBoundStart = d3.min(data, function(d) { return parseInt(d.QualityOfLifeIndex * 1.2); })
		var yBoundEnd = d3.max(data, function(d) { return parseInt(d.PollutionIndex * 1.2); })
		var yBoundStart = d3.min(data, function(d) { return parseInt(d.PollutionIndex * 1.2); })
		var w = (Math.abs(xBoundStart) + Math.abs(xBoundEnd) * 8);
		var h = (Math.abs(yBoundStart) + Math.abs(yBoundEnd) * 8);
		var dots = [];
		var Country = [];
		var QualityOfLifeIndex = [];
		var PollutionIndex = [];

		console.log(xBoundEnd)
		console.log(xBoundStart)
		console.log(yBoundEnd)
		console.log(yBoundStart)

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
		console.log(dots);

	  var svg = d3.select("body")
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
									.ticks(10, ",f");

	              var yAxis = d3.svg.axis()
	                .scale(yScale)
	                .orient("left")
									.ticks(10, ",f");

              	var tooltip = d3.select("body").append("div").attr("class", "tooltip");

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

								svg.append("text")      // text label for the x axis
	        				.attr("x", 265 )
	        				.attr("y",  240 )
	        				.style("text-anchor", "middle")
	        				.text("Date");

								svg.selectAll("circle")
									.data(data)
									.enter()
									.append("circle")
									.attr("cx", function(d) { return xScale(d[1]); })
	                .attr("cy", function(d) { return yScale(d[2]); })
									//.attr("width", "100px")
									//.attr("height", "100px")
									//.attr("fill", function(d) { return "rgb(170, 191, 63)"; })
									.on("mouseon", function(d){ tooltip
										.style("left", d3.event.pageX - 50 + "px")
										.style("top", d3.event.pageY - 70 + "px")
										.style("display", "inline-block")
										.html("Week: " + (d.PollutionIndex) + "<br>" + "Persons with Flue (x1000): " + (d.PollutionIndex));})
									.on("mouseout", function(d){ tooltip.style("display", "none");})
		}
	)
}
