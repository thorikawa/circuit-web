window.$ = require('jquery');
window.sigma = require("sigma");
const React = require('react');
const ReactDOM = require('react-dom');

let sig;

const ArtistList = props => {
	return (
		<div>
		{props.artists.map((n) =>
			<div className="artist" key={n.id}>
			<a href={"#" + n.id}>{n.label}</a>
			<a href={"https://www.youtube.com/results?search_query=" + n.label} target="_blank">(youtube)</a>
			</div>
		)}
		</div>
	);
}

$(() => {
	$.getJSON("data/data.json", (g) => {
		sig = new sigma({
			container: 'graph-container',
			graph: g,
			settings: {
				autoRescale: false
			}
		});

		ReactDOM.render(
			<ArtistList artists={g.nodes} />,
			document.getElementById('artist-list')
		);

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