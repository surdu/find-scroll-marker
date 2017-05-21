const { CompositeDisposable } =  require("atom");
var scrollMarker;

module.exports = {

	subscriptions: null,

	activate() {
		this.subscriptions = new CompositeDisposable();
	},

	consumeFind(findService) {
		this.subscriptions.add(atom.workspace.observeTextEditors(function(editor) {
			let searchMarkerLayer = findService.resultsMarkerLayerForTextEditor(editor);

			var scrollMarkerView = scrollMarker.scrollMarkerViewForEditor(editor);

			searchMarkerLayer.onDidUpdate(function() {
				let markers = searchMarkerLayer.getMarkers();
				for (let f = 0; f < markers.length; f++) {
					let marker = markers[f];
					console.log("Line:",marker.getBufferRange().start.row);
				}
			});
		}));
	},

	consumeScrollMarker(scrollMarkerAPI) {
		scrollMarker = scrollMarkerAPI;
		console.log("scrollMarkerAPI loaded");
	},

	deactivate() {
		this.subscriptions.dispose();
	}
};
