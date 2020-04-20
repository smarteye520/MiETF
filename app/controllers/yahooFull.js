function close(e) {
	$.yahooFull.close();
};

exports.setUrl = function (url, facetName) {
	$.webView.url = url;	
	$.titleLabel.text = facetName;
};