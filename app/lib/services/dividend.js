var Config = require('configuration');

function getPlainDividedStockData(ticker, facetQty) {
	Ti.API.info(ticker);
	if (facetQty == undefined) {
		alert("undefined");
		facetQty = 1;
	}  
	var stockDataDividend = new Array();
	var firstRowDate = mietf.firstRowDate;
	var lastRowDate = mietf.lastRowDate;
	var db = Ti.Database.open('cloud');
	
	//firstRowDate = '2016-03-22';
 	//lastRowDate = '2016-06-14';
 	//lastRowDate = '2017-06-12';
	
	rs = db.execute('SELECT closeDate, Close, Dividend' + 
			' FROM stockData a' + 
			' WHERE a.closeDate >= ? and a.closeDate <=? and a.Ticker = ? ' +
			' ORDER BY a.closeDate asc ', firstRowDate, lastRowDate, ticker);

	while (rs.isValidRow()) {
		stockDataDividend.push([rs.fieldByName('closeDate'), (rs.fieldByName('Dividend') * facetQty)]);
		//if(rs.fieldByName('Dividend') != 0)
		//Ti.API.info(rs.fieldByName('closeDate') + '   ' +  rs.fieldByName('Dividend'));
	 	rs.next();
	}
	db.close();
	return stockDataDividend;
};
exports.getPlainDividedStockData = getPlainDividedStockData;

function getPlainDataDividensForMietf(mietfId) {
	var db = Ti.Database.open('cloud');
	rs = db.execute('SELECT a.ETFVersionId, a.facetId, b.facetTickerSymbol, a.facetQty, a.PercentNum ' + 
			' from jctFacetETF a join facet b on (a.facetId = b.facetId) ' + 
			' where a.ETFVersionId == ? and a.facetId <> "" and b.facetTickerSymbol <> "Cash" ', mietfId);
	var facetsTickerSymbol = [];
	while (rs.isValidRow()) {
		var div = {
			"facetTickerSymbol": rs.fieldByName('facetTickerSymbol'),
			"facetQty": rs.fieldByName('facetQty')
		};
		facetsTickerSymbol.push(div);
		rs.next();
	}
	db.close();
	
	var data = [];
	
	for (var i=0; i<facetsTickerSymbol.length; i++) {
		if (i==0) {
			data = getPlainDividedStockData(facetsTickerSymbol[i]["facetTickerSymbol"], facetsTickerSymbol[i]["facetQty"]);
		} else {
			data = addData(data, getPlainDividedStockData(facetsTickerSymbol[i]["facetTickerSymbol"], facetsTickerSymbol[i]["facetQty"]));
		}
	}
	return data;
};
exports.getPlainDataDividensForMietf = getPlainDataDividensForMietf;


/*
 * @param firstData format  [Date, value]
 * @param secondData format [Date, value]
 * @return                  [Date, value]
 */
function addData(firstData, secondData) {
	var tmpData = [];
	for (var i=0; i<firstData.length; i++) {
		tmpData.push([ firstData[i][0], firstData[i][1] + secondData[i][1] ]);
	}	
	return tmpData;
}

/*
 * @param format [Date, value]
 */
function getTotalSum(param) {
	var sum = 0;
	for(var i=0; i< param.length; i++) {
		sum += param[i][1];
	}
	return sum;
}
exports.getTotalSum = getTotalSum;


function deleteMarketIndexData(ticker) {
	var db = Ti.Database.open('cloud');
	rs = db.execute('DELETE FROM marketIndexData ' + ' WHERE Ticker = ?', ticker);
	db.close();
}
exports.deleteMarketIndexData = deleteMarketIndexData;

function deleteFromStockData(ticker) {
	var db = Ti.Database.open('cloud');
	rs = db.execute('DELETE FROM stockData ' + ' WHERE Ticker = ?', ticker);
	db.close();
}
exports.deleteFromStockData = deleteFromStockData;

function displayData(ticker) {
	var db = Ti.Database.open('cloud');
	
	rs = db.execute('SELECT * from stockData where Ticker = ?', ticker);
	while (rs.isValidRow()) {
		Ti.API.info(rs.fieldByName("closeDate") + '  '+ rs.fieldByName("Close")+'   '+ rs.fieldByName("Dividend") +"   "+  rs.fieldByName("Split"));
		rs.next();
	}
	
	db.close();
}
exports.displayData = displayData;


//used only for some checking
function getTmpData(ticker) {
	var request = Titanium.Network.createHTTPClient();
	var QuandlCode = Config.dataset() + ticker;
	var url = Config.apiPath() + QuandlCode + '.json?auth_token=' + Config.authToken() + '&exclude_headers=true';
	
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
			
			//insertStockData(data, ticker);
			
			insertIndexData(data, ticker);
			//Ti.API.info(data);
		}
	};
	
	request.onerror = function requestFailed() {
		Ti.API.error( url + " : " +request.status + ' - ' + request.statusText);
		alert('errr');
	};
	
}
exports.getTmpData = getTmpData;

