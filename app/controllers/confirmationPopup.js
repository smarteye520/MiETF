function close(e) {
	$.confirmationPopup.close();
};

function del(e) {
	deleteFacet(mietf.source.jctFacetETFId);
	Ti.App.fireEvent('resetButtons', {});
	//Ti.App.fireEvent('updateCanvasFullWithData', {});
	$.confirmationPopup.close();
};

//called by getView
$.text.text = "Are you sure you want to delete the component";
$.text2.text = mietf.buttonTitle + "?";