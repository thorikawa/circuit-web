window.$ = require('jquery');
window.sigma = require("sigma");
require("sigma/plugins/sigma.renderers.parallelEdges/sigma.canvas.edgehovers.curvedArrow.js");
require("sigma/plugins/sigma.renderers.parallelEdges/sigma.canvas.edgehovers.curve.js");
require("sigma/plugins/sigma.renderers.parallelEdges/sigma.canvas.edges.curvedArrow.js");
require("sigma/plugins/sigma.renderers.parallelEdges/sigma.canvas.edges.curve.js");
require("sigma/plugins/sigma.renderers.parallelEdges/sigma.canvas.edges.labels.curve.js");
require("sigma/plugins/sigma.parsers.json/sigma.parsers.json.js");

$(() => {
	sigma.parsers.json('data/data.json', {
	  container: 'graph-container'
	});
});
