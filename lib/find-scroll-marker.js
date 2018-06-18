const { CompositeDisposable } =  require("atom");
var scrollMarker;

require('atom-package-deps').install('find-scroll-marker');

module.exports = {

	subscriptions: null,

	activate() {
		this.subscriptions = new CompositeDisposable();
	},

	consumeFind(findService) {
		this.subscriptions.add(atom.workspace.observeTextEditors(function(editor) {
			if (scrollMarker) {
				let searchMarkerLayer = findService.resultsMarkerLayerForTextEditor(editor);

				let scrollMarkerView = scrollMarker.scrollMarkerViewForEditor(editor);
				scrollMarkerView.getLayer("find-marker-layer", "#ffdd00").syncToMarkerLayer(searchMarkerLayer);
			}
		}));
	},

	consumeScrollMarker(scrollMarkerAPI) {
		scrollMarker = scrollMarkerAPI;
	},

	deactivate() {
		this.subscriptions.dispose();
	}
};
