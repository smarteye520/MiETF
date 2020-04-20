//var isAllFacetDownloaded = Ti.App.Properties.getBool("isFacetDownloadedToDevice"
var dispatcher = require('dispatcher');

function getFacetLists() {
	var db = Ti.Database.open("cloud");
  rs = db.execute("SELECT facetId, facetTickerSymbol, facetName, QuandlCode from facet");
  var facets = [];
	while (rs.isValidRow()) {
    facets.push({
    	facetId: rs.fieldByName("facetId"),
    	facetTickerSymbol: rs.fieldByName("facetTickerSymbol"),
    	facetName: rs.fieldByName("facetName"),
    	QuandlCode: rs.fieldByName("QuandlCode"),
    });
		rs.next();
  }	
	db.close();
	return facets;
}
exports.getFacetLists = getFacetLists;

function downloadFacetData() {
	var lastImportedFacetId = Ti.App.Properties.getInt("lastImportedFacetId") ? Ti.App.Properties.getInt("lastImportedFacetId") : 1 ;
	Ti.API.info(lastImportedFacetId);
	var facets = getFacetLists();
	var i = lastImportedFacetId;
	if(lastImportedFacetId < facets.length) {
		getQuandlData(Config.dataset() + facets[i].facetTickerSymbol, facets[i].facetTickerSymbol, facets[i].facetName);
	} 
}
exports.downloadFacetData = downloadFacetData;

function isDownloadCompleted() {
	var facets = getFacetLists();
	var lastImportedFacetId = Ti.App.Properties.getInt("lastImportedFacetId") ? Ti.App.Properties.getInt("lastImportedFacetId") : 1 ;
	return (lastImportedFacetId == facets.length); 
}
exports.isDownloadCompleted = isDownloadCompleted;

function getPercentDownloaded() {
	var facets = getFacetLists();
	var lastImportedFacetId = Ti.App.Properties.getInt("lastImportedFacetId") ? Ti.App.Properties.getInt("lastImportedFacetId") : 1 ;
	var percentage = Math.floor( (lastImportedFacetId * 100) / facets.length ); 
	return percentage;
}
exports.getPercentDownloaded = getPercentDownloaded;

function downloadNextSymbol(i) {
	var last = Ti.App.Properties.getInt("lastImportedFacetId");
	Ti.App.Properties.setInt("lastImportedFacetId", last + 1);
	setTimeout(function(){
		downloadFacetData();
		dispatcher.trigger('downloadNextSymbol');	
	}, 4000);
}

function getQuandlData(QuandlCode, tickerSymbol, title) {	
	var lastUpdate = getLastInsertDateByTicker(tickerSymbol);
	if (!lastUpdate) {
		lastUpdate = '2005-01-01';
	}
	lastUpdate = sqlDateToNextDay(lastUpdate);	

	if (Titanium.Network.online == true) {
		var request = Titanium.Network.createHTTPClient();
		//var url = Config.apiPath() + QuandlCode + '.json?auth_token=' + Config.authToken() + '&trim_start=' + lastUpdate + '&exclude_headers=true' + '&column_index=Close';
		var url = Config.apiPath() + QuandlCode + '.json?auth_token=' + Config.authToken() + '&trim_start=' + lastUpdate + '&exclude_headers=true';
		Ti.API.info(url);
		request.open('GET', url);

		request.send();

		request.onload = function requestReceived() {
			var statusCode = request.status;
			if (statusCode == 200) {
				var response = request.responseText;
				var responseObj = JSON.parse(response);
				responseObj = responseObj.dataset;
				var data = responseObj.data;
				Ti.API.info("source_name: " + responseObj.source_name + " for " + responseObj.dataset_code + ", length is: " + data.length);
				if(data.length==0 && (new Date().getTime() - sqlDateToNative(lastUpdate).getTime()) > 1000*60*60*24*30*6){
					Ti.API.info('lastUpdate : ' +lastUpdate + ' today : ' + nativeDateToSql(new Date()));
					downloadNextSymbol();
				} else {
					if(data.length>0 && (new Date().getTime() - sqlDateToNative(data[0][0]).getTime()) > 1000*60*60*24*30*6){
						Ti.API.info('lastUpdate : ' +data[0][0] + ' today : ' + nativeDateToSql(new Date()));
						downloadNextSymbol();
					} else {
						_.defer(function() {
							getQuandlDataSuccess(tickerSymbol, data, title);
						});
				  }
				}
			};
		};
		request.onerror = function requestFailed() {
			Ti.API.error(url + " : " +request.status + ' - ' + request.statusText);
			downloadNextSymbol();
		};
	}
};
	
function getQuandlDataSuccess(tickerSymbol, data, buttonTitle) {
	Ti.API.info(data.length);
	if (data.length > 0) {
		_.defer(function() {
			insertStockData(data, tickerSymbol);
		});
	}
	downloadNextSymbol();
}