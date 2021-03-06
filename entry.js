// using d3 for convenience
//1
var container = d3.select('#first-map-scroll');
var graphic = container.select('.scroll__figure');
var chart = graphic.select('.figure__chart');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();

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

	// var someData = d3.csv("<LINK TO DATA HERE>");
	// var otherData = d3.json("<LINK TO DATA HERE>");

	// Promise.all([someData, otherData).then(next);

	// function next(data) {

	//   <ENTER FUNCTIONS HERE>
	// }

	// update graphic1 based on step 1
	// if (step._groups[0][0].className === 'step is-active') {
		
	// }

	// update graphic1 based on step 2
	// if (step._groups[0][1].className === 'step is-active') {

	// }

	// update graphic1 based on step 3
	// if (step._groups[0][2].className === 'step is-active') {

	// }
	
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

function init() {
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	handleResize();

	// 2. setup the scroller passing options
	// this will also initialize trigger observations
	// 3. bind scrollama event handlers (this can be chained like below)
	scroller.setup({
		// container: '#main-map-scroll',
		// graphic: '.scroll__figure',
		// text: '.scroll__text',
		step: '.scroll__text .step',
		offset: 0.75,
		debug: true
	})
		.onStepEnter(handleStepEnter)
		.onContainerEnter(handleContainerEnter)
		.onContainerExit(handleContainerExit)

	// setup resize event
	window.addEventListener('resize', handleResize);
}

// kick things off
init();