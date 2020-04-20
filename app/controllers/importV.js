function close(e) {
	$.importV.close();
};

exports.setUrl = function (url) {
	
		var privateDocFolder = privateDocumentsDirectory();
		var f = Ti.Filesystem.getFile(privateDocFolder, 'mietf.sql');
		if (f.exists()) { f.deleteFile(); }
		
		Ti.Database.install(url, 'mietf');
		
		var newETFVersionId = importETF(1);
		finalizeImportETF(newETFVersionId);
		$.statusLabel.text ='Import successful! ';
		
		mietf.notRunningDownloads = true;
		mietf.progressBar.downloadStocks();
		//Ti.App.fireEvent('startDownloads', {});
			
};