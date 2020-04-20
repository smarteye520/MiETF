function getPlainSplitStockData(ticker) {
	var previousSplit = 1;
	var stockDataSplit = new Array();
	var firstRowDate = mietf.firstRowDate;
	var lastRowDate = mietf.lastRowDate;
	var db = Ti.Database.open('cloud');
	
	rs = db.execute('SELECT closeDate, Close, Split' + 
			' FROM stockData a' + 
			' WHERE a.closeDate >= ? and a.closeDate <=? and a.Ticker = ? ' +
			' ORDER BY a.closeDate asc ', firstRowDate, lastRowDate, ticker);

	while (rs.isValidRow()) {
		var currentValue = 1;
		if(rs.fieldByName('Split') != undefined) {
			currentValue = rs.fieldByName('Split');
		}
		stockDataSplit.push([rs.fieldByName('closeDate'), (currentValue * previousSplit)]);
		previousSplit = previousSplit * currentValue;
	 	rs.next();
	}
	db.close();
	return stockDataSplit;
};
exports.getPlainSplitStockData = getPlainSplitStockData;