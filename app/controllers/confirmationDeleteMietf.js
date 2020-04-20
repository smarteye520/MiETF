function close(e) {
	 mietf.source.disableClick = false;
	$.confirmationDeleteMietf.close();
};

function del(e) {
	//mietf.source.mietfId
	deleteMiETFById(mietf.source.mietfId);
	Ti.App.fireEvent('upAndOver', {  vaultNum: mietf.source.vaultNum });
	mietf.source.disableClick = false;
	$.confirmationDeleteMietf.close();
};

//called by getView
$.text.text = "Are you sure you want to delete the MiETF";
$.text2.text = mietf.source.title + "?";