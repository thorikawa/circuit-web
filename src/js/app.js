window.$ = require('jquery');
window.sigma = require("sigma");

let sig;

$(() => {
	console.log("loaded");
	$.getJSON("data/data.json", (g) => {
		sig = new sigma({
			container: 'graph-container',
			graph: g,
			settings: {
				autoRescale: false
			}
		});

		let info = $('#artist-list');
		for (let n of g.nodes) {
			let artist = $(`<div class="artist"><a href="#${n.id}">${n.label}</a></div>`)
			info.append(artist);
		}

		sig.camera.goTo({
			"x": 640,
			"y": 360,
			"ratio": 1.0
		});
	});
});

window.onhashchange = () => {
	let hash = location.hash;
	hash = hash.substring(1);
	console.log(hash);
	let g = sig.graph;
	let camera = sig.camera;
	console.log(camera);
	for (let n of g.nodes()) {
		if (n.id == hash) {
			console.log('found', n);
			camera.goTo({
				"x": n.x,
				"y": n.y
			});
			// sigma.utils.zoomTo(camera, n.x, n.y, 0.8);
			sig.refresh();
			break;
		}
	}
};