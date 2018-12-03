// using d3 for convenience

//2 - line graph
var container2 = d3.select('#scroll2');
var graphic2 = container2.select('.scroll__graphic2');
var chart2 = graphic2.select('.chart2');
var text2 = container2.select('.scroll__text2');
var step2 = text2.selectAll('.step2');

// initialize the scrollama
var scroller2 = scrollama();

//2
// function handleResize2() {

// 	// 1. update height of step elements
// 	var stepHeight2 = Math.floor(window.innerHeight * 0.75);
// 	step2.style('height', stepHeight2 + 'px');

// 	// 2. update width/height of graphic element
// 	var bodyWidth2 = d3.select('body').node().offsetWidth;

// 	graphic2
// 		.style('width', bodyWidth2 + 'px')
// 		.style('height', window.innerHeight + 'px');

// 	var chartMargin2 = 32;
// 	var textWidth2 = text2.node().offsetWidth;
// 	var chartWidth2 = graphic2.node().offsetWidth - textWidth2 - chartMargin2;

// 	chart2
// 		.style('width', chartWidth2 + 'px')
// 		.style('height', Math.floor(window.innerHeight2 / 2) + 'px');


// 	// 3. tell scrollama to update new element dimensions
// 	scroller2.resize();
// }
// scrollama event handlers
function handleStepEnter2(response) {

	step2.classed('is-active', function (d, j) {
		return j === response.index;
	})

	// update graphic based on step
	// chart2.select('p').text2(response.index + 1);
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

function handleContainerEnter2(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic2.classed('is-fixed', true);
	graphic2.classed('is-bottom', false);
}

function handleContainerExit2(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic2.classed('is-fixed', false);
	graphic2.classed('is-bottom', response.direction === 'down');
}

function init2() {
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	// handleResize2();

	// 2. setup the scroller passing options
	// this will also initialize trigger observations
	// 3. bind scrollama event handlers (this can be chained like below)

	scroller2.setup({
		container: '#scroll2',
		graphic: '.scroll__graphic2',
		text: '.scroll__text2',
		step: '.scroll__text2 .step2',
		offset: 0.85,
		debug: false
	})
		.onStepEnter(handleStepEnter2)
		// .OnStepExit(handleStepExit2)
		.onContainerEnter(handleContainerEnter2)
		.onContainerExit(handleContainerExit2)

	// setup resize event
	// window.addEventListener('resize', handleResize2);
}

// kick things off
init2();