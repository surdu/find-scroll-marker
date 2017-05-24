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

			let scrollMarkerView = scrollMarker.scrollMarkerViewForEditor(editor);
			scrollMarkerView.addLayer("find-marker-layer", "#ffdd00").syncToMarkerLayer(searchMarkerLayer);
		}));
	},

	consumeScrollMarker(scrollMarkerAPI) {
		scrollMarker = scrollMarkerAPI;
	},

	deactivate() {
		this.subscriptions.dispose();
	}
};
