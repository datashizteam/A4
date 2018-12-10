// using d3 for convenience

//1 - Map
var container = d3.select('#first-map-scroll');
var graphic = container.select('.scroll__figure');
var chart = graphic.select('.figure__chart');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');

//2 - line graph
var container2 = d3.select('#second-map-scroll');
var graphic2 = container2.select('.scroll__figure2');
var chart2 = graphic2.select('.figure__chart2');
var text2 = container2.select('.scroll__text2');
var step2 = text2.selectAll('.step2');

//3 - parallax
var container3 = d3.select('#third-map-scroll');
var graphic3 = container3.select('.scroll__figure3');
var chart3 = graphic3.select('.figure__chart3');
var text3 = container3.select('.scroll__text3');
var step3 = text3.selectAll('.step3');

// initialize the scrollama
var scroller = scrollama();
var scroller2 = scrollama();
var scroller3 = scrollama();

//1
// generic window resize listener event
function handleResize() {
	// 1. update height of step elements
	var stepHeight = Math.floor(window.innerHeight * 0.75);
	step.style('height', stepHeight + 'px');

	// 2. update width/height of graphic element
	var bodyWidth = d3.select('body').node().offsetWidth;

	graphic
		.style('width', bodyWidth + 'px')
		.style('height', window.innerHeight + 'px');

	var chartMargin = 32;
	var textWidth = text.node().offsetWidth;
	var chartWidth = graphic.node().offsetWidth - textWidth - chartMargin;

	chart
		.style('width', chartWidth + 'px')
		.style('height', Math.floor(window.innerHeight / 2) + 'px');


	// 3. tell scrollama to update new element dimensions
	scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response, d) {

	step.classed('is-active', function (d, i) {
		return i === response.index;
	})

	// update graphic based on step1
	chart.select('p').text(response.index + 1)
	
	const data = d3.csv("https://raw.githubusercontent.com/ceguiluzrosas/D3_Json/master/new_coordinates.csv", d => ({
		  type: "Feature", 
		  properties: {city: d.City, state: d.State, lat: +d.Lat, long: +d.Long, five: +d.five, six: +d.six, present:+d.present},
		  geometry: {
		    type: "Point",
		    coordinates: [+d.Long, +d.Lat]
		  }
		 }));

	if (step._groups[0][0].className === 'step is-active') {
		time_period = "1";
		d3.select('#timeslide')._groups[0][0].value = "0";

		d3.selectAll("path.map-path").remove();

		Promise.all([data]).then(nextStep1);

		function nextStep1(d) {

			let data = d['0'];

			for (let d of data){
	          var val = d.properties.five;

	          if (val != 0) {
	            var node = svg.append("path")
	              .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
	              .attr("d", d3.geoPath(projection).pointRadius(4))
	              .attr("fill", "#ff5542")
	              .attr("opacity", 0.4)
	              .attr("class", "map-path")
	              .style('stroke', 'black').style('stroke-width', 0.5);
	              
	          }

	        }

	    }

	}

	// // update graphic1 based on step 2
	if (step._groups[0][1].className === 'step is-active') {
		if (time_period == "3") {
			d3.selectAll("path.map-path").remove();
		}

		time_period = "2";
		d3.select('#timeslide')._groups[0][0].value = "1";

		Promise.all([data]).then(nextStep2);

		function nextStep2(d) {

			let data = d['0'];

			for (let d of data){
	          var val = d.properties.six;

	          if (val != 0 && val != d.properties.five) {
	            var node = svg.append("path")
	              .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
	              .attr("d", d3.geoPath(projection).pointRadius(4))
	              .attr("fill", "#ff5542")
	              .attr("opacity", 0)
	              .attr("class", "map-path")
	              .style('stroke', 'black').style('stroke-width', 0.5)
	        		.transition()
	        			.duration(700)
	        			.attr("opacity", 0.4);
	              
	          }

	        }
	    }

	}

	if (step._groups[0][2].className === 'step is-active') {
		time_period = "3";
		d3.select('#timeslide')._groups[0][0].value = "2";

		Promise.all([data]).then(nextStep3);

		function nextStep3(d) {

			let data = d['0'];

			for (let d of data){
	          var val = d.properties.present;

	          if (val != 0 && val != d.properties.six) {
	            var node = svg.append("path")
	              .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
	              .attr("d", d3.geoPath(projection).pointRadius(4))
	              .attr("fill", "#ff5542")
	              .attr("opacity", 0)
	              .attr("class", "map-path")
	              .style('stroke', 'black').style('stroke-width', 0.5)
	              	.transition()
	        			.duration(700)
	        			.attr("opacity", 0.4);
	              
	          }

	        }
	    }

	}
	
}

function handleContainerEnter(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerExit(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}


//2
function handleResize2() {

	// 1. update height of step elements
	var stepHeight2 = Math.floor(window.innerHeight * 0.75);
	step2.style('height', stepHeight2 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth2 = d3.select('body').node().offsetWidth;

	graphic2
		.style('width', bodyWidth2 + 'px')
		.style('height', window.innerHeight + 'px');

	var chartMargin2 = 32;
	var textWidth2 = text2.node().offsetWidth;
	var chartWidth2 = graphic2.node().offsetWidth - textWidth2 - chartMargin2;

	chart2
		.style('width', chartWidth2 + 'px')
		.style('height', Math.floor(window.innerHeight2 / 2) + 'px');


	// 3. tell scrollama to update new element dimensions
	scroller2.resize();
}
// scrollama event handlers
function handleStepEnter2(response) {

	step2.classed('is-active', function (d, j) {
		return j === response.index;
	})

	// update graphic based on step
	chart2.select('p').text(response.index + 1)
	// var someData = d3.csv("<LINK TO DATA HERE>");
	// var otherData = d3.json("<LINK TO DATA HERE>");

	// Promise.all([someData, otherData).then(next);

	// function next(data) {

	//   <ENTER FUNCTIONS HERE>
	// }

	// // update graphic1 based on step 1
	if (step2._groups[0][0].className === 'step2 is-active') {

		svg2.selectAll("path").remove();
		svg2.selectAll("circle").remove();

		async function draw2006() {
		  const data = await(d3.csv("https://raw.githubusercontent.com/ceguiluzrosas/D3_Json/master/Year_Count_Line.csv", ({Data_Year,Year,Count}) => ({x: new Date(Data_Year), x1: +Year, y: +Count})));
		                     data.x = "Year";
		                     data.x1 = "Alternative_Year";
		                     data.y = "Count";

		    var margin = ({top: 45, right: 45, bottom: 45, left: 45});

			var subset = data.filter(function(d) {
			    return d.x1 <= 2006;
			  });

			// console.log(subset);

			var x = d3.scaleTime()
				.domain(d3.extent(data, d => d.x))
				.range([margin.left, width - margin.right]);
			  
			  var y = d3.scaleLinear()
			    .domain([0, d3.max(data, d => d.y)]).nice()
			    .range([height - margin.bottom, margin.top]);

			var x_linear = d3.scaleLinear()
			    .domain([new Date("1994-01-02"), new Date("2014-01-02")])
			    .range([margin.left, width - margin.right]);
			  
			  var xAxis = g => g
			    .attr("transform", `translate(0,${height - margin.bottom})`)
			    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
			  
			  var yAxis = g => g
			    .attr("transform", `translate(${margin.left},0)`)
			    .call(d3.axisLeft(y))
			    .call(g => g.select(".domain").remove())
			    .call(g => g.select(".tick:last-of-type text").clone()
			        .attr("x", 3)
			        .attr("text-anchor", "start")
			        .attr("font-weight", "bold")
			        .text(data.y))

			var line = d3.line()
			    .defined(d => !isNaN(d.y))
			    .x(d => x(d.x))
			    .y(d => y(d.y))
			    .curve(d3.curveCatmullRom.alpha(0.5));

			svg2.append("g")
			      .call(xAxis);

			  svg2.append("g")
			      .call(yAxis);

			var drawLine = svg2.append("path")
			  .datum(subset)
			  .style("stroke-dasharray", 0)
		      .attr("d", line)
		      .style("stroke", "#0ba7e5")
		      .attr("stroke-width", 3)
		      .attr("stroke-linejoin", "round")
		      .attr("stroke-linecap", "round")
		      .attr("fill", "none");

			var totalLength = drawLine.node().getTotalLength();

			drawLine
		      .transition()
		        .duration(1500)
		        .ease(d3.easeLinear)
		        .style("stroke-dasharray", totalLength + " " + totalLength);

		 svg2.selectAll("circle")
		    .data(subset).enter()
		    .append("circle")
		    .attr("cx", function(d) { return x(d.x); })
		    .attr("cy", function(d) { return y(d.y); })
		    .attr("r", 6)
		    .style("fill", "rgba(0,0,0,0)")
		    .style("stroke", "#f4f4f4")
		    .style("stroke-width", "2.75px")
		    .on("mouseover", function(d) {
		      d3.selectAll("path").style("opacity", 0.5);
		      d3.selectAll("circle").style("opacity", 0.5);
		      d3.select(this)
		      	.attr("r", 15)
		        .style("opacity", 1)
		        .style("stroke", "#fff")
		        .style("opacity", 1)
		        .raise();
		      })
		      .on("mouseout", function(d) {
		      	d3.selectAll("path").style("opacity", 1);
		        d3.selectAll("circle")
		        	.attr("r", 6)
		        	.style("stroke", "#f4f4f4")
		        	.style("opacity", 1);
		      });
		}

		draw2006();
	}

	// // update graphic1 based on step 2
	if (step2._groups[0][1].className === 'step2 is-active') {

		async function drawAll() {
		  const data = await(d3.csv("https://raw.githubusercontent.com/ceguiluzrosas/D3_Json/master/Year_Count_Line.csv", ({Data_Year,Year,Count}) => ({x: new Date(Data_Year), x1: +Year, y: +Count})));
		                     data.x = "Year";
		                     data.x1 = "Alternative_Year";
		                     data.y = "Count";

		    var margin = ({top: 45, right: 45, bottom: 45, left: 45});

		    var subset = data.filter(function(d) {
			    return d.x1 >= 2006;
			  });

			var x = d3.scaleTime()
				.domain(d3.extent(data, d => d.x))
				.range([margin.left, width - margin.right]);
			  
			  var y = d3.scaleLinear()
			    .domain([0, d3.max(data, d => d.y)]).nice()
			    .range([height - margin.bottom, margin.top]);

			 var x_linear = d3.scaleLinear()
			    .domain([new Date("1994-01-02"), new Date("2014-01-02")])
			    .range([margin.left, width - margin.right]);
			  
			  var xAxis = g => g
			    .attr("transform", `translate(0,${height - margin.bottom})`)
			    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
			  
			  var yAxis = g => g
			    .attr("transform", `translate(${margin.left},0)`)
			    .call(d3.axisLeft(y))
			    .call(g => g.select(".domain").remove())
			    .call(g => g.select(".tick:last-of-type text").clone()
			        .attr("x", 3)
			        .attr("text-anchor", "start")
			        .attr("font-weight", "bold")
			        .text(data.y))

			var line = d3.line()
			    .defined(d => !isNaN(d.y))
			    .x(d => x(d.x))
			    .y(d => y(d.y))
			    .curve(d3.curveCatmullRom.alpha(0.5));

			svg2.append("g")
			      .call(xAxis);

			  svg2.append("g")
			      .call(yAxis);

			var drawLine = svg2.append("path")
			  .datum(subset)
			  .style("stroke-dasharray", 0)
		      .attr("d", line)
		      .style("stroke", "#0ba7e5")
		      .attr("stroke-width", 3)
		      .attr("stroke-linejoin", "round")
		      .attr("stroke-linecap", "round")
		      .attr("fill", "none");

			var totalLength = drawLine.node().getTotalLength();

			drawLine
		      .transition()
		        .duration(2000)
		        .ease(d3.easeLinear)
		        .style("stroke-dasharray", totalLength + " " + totalLength);

		    svg2.selectAll("circle")
			    .data(data).enter()
			    .append("circle")
			    .attr("cx", function(d) { return x(d.x); })
			    .attr("cy", function(d) { return y(d.y); })
			    .attr("r", 6)
			    .style("fill", "rgba(0,0,0,0)")
			    .style("stroke", "#f4f4f4")
			    .style("stroke-width", "2.75px")
			    .on("mouseover", function(d) {
			      d3.selectAll("path").style("opacity", 0.5);
			      d3.selectAll("circle").style("opacity", 0.5);
			      d3.select(this)
			      	.attr("r", 15)
			        .style("opacity", 1)
			        .style("stroke", "#fff")
			        .style("opacity", 1)
			        .raise();
			      })
			      .on("mouseout", function(d) {
			      	d3.selectAll("path").style("opacity", 1);
			        d3.selectAll("circle")
			        	.attr("r", 6)
			        	.style("stroke", "#f4f4f4")
			        	.style("opacity", 1);
			      });
		}

		drawAll();

	}

	// // update graphic1 based on step 3
	// if (step._groups[0][2].className === 'step is-active') {

	// }
	
}

function handleContainerEnter2(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerExit2(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}


//3
function handleResize3() {

	// 1. update height of step elements
	var stepHeight3 = Math.floor(window.innerHeight * 0.75);
	step3.style('height', stepHeight2 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth3 = d3.select('body').node().offsetWidth;

	graphic3
		.style('width', bodyWidth2 + 'px')
		.style('height', window.innerHeight + 'px');

	var chartMargin3 = 32;
	var textWidth3 = text3.node().offsetWidth;
	var chartWidth3 = graphic3.node().offsetWidth - textWidth3 - chartMargin3;

	chart3
		.style('width', chartWidth3 + 'px')
		.style('height', Math.floor(window.innerHeight3 / 2) + 'px');


	// 3. tell scrollama to update new element dimensions
	scroller3.resize();
}
// scrollama event handlers
function handleStepEnter3(response) {

	step3.classed('is-active', function (d, k) {
		return k === response.index;
	})

	// update graphic based on step
	chart3.select('p').text(response.index + 1)
	// var someData = d3.csv("<LINK TO DATA HERE>");
	// var otherData = d3.json("<LINK TO DATA HERE>");

	// Promise.all([someData, otherData).then(next);

	// function next(data) {

	//   <ENTER FUNCTIONS HERE>
	// }

	// // update graphic1 based on step 1
	// if (step._groups[0][0].className === 'step is-active') {
		
	// }

	// // update graphic1 based on step 2
	// if (step._groups[0][1].className === 'step is-active') {

	// }

	// // update graphic1 based on step 3
	// if (step._groups[0][2].className === 'step is-active') {

	// }
	
}

function handleContainerEnter3(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerExit3(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}

function init() {
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	handleResize();

	// 2. setup the scroller passing options
	// this will also initialize trigger observations
	// 3. bind scrollama event handlers (this can be chained like below)
	scroller.setup({
		container: '#main-map-scroll',
		graphic: '.scroll__figure',
		text: '.scroll__text',
		step: '.scroll__text .step',
		offset: 0.75,
		debug: false
	})
		.onStepEnter(handleStepEnter)
		.onContainerEnter(handleContainerEnter)
		.onContainerExit(handleContainerExit)

	scroller2.setup({
		container: '#scroll2',
		graphic: '.scroll__graphic2',
		text: '.scroll__text2',
		step: '.scroll__text2 .step2',
		offset: 0.5,
		debug: false
	})
		.onStepEnter(handleStepEnter2)
		// .OnStepExit(handleStepExit2)
		.onContainerEnter(handleContainerEnter2)
		.onContainerExit(handleContainerExit2)

	scroller3.setup({
		container: '#scroll3',
		graphic: '.scroll__graphic3',
		text: '.scroll__text3',
		step: '.scroll__text3 .step3',
		offset: 0.99,
		debug: false
	})
		.onStepEnter(handleStepEnter3)
		// .OnStepExit(handleStepExit2)
		.onContainerEnter(handleContainerEnter3)
		.onContainerExit(handleContainerExit3)

	// setup resize event
	window.addEventListener('resize', handleResize);
}

// kick things off
init();