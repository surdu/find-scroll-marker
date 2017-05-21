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
			scrollMarkerView.getLayer("find-marker-layer").syncToMarkerLayer(searchMarkerLayer);
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
