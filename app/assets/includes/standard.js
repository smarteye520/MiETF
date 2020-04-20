function privateDocumentsDirectory() {

	Ti.API.info('We need to open a file object to get our directory info');
	var testFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory);
	Ti.API.info('Now we remove the Documents folder reference');
	var privateDir = testFile.nativePath.replace('Documents/', '');
	Ti.API.info('This is our base App Directory =' + privateDir);
	Ti.API.info('Now we add the Private Documents Directory');
	privateDir += 'Library/Private%20Documents/';
	Ti.API.info('Our new path is ' + privateDir);
	return privateDir;
};

function toTitleCase(input) {
	var i,
	    j,
	    str,
	    lowers,
	    uppers;
	str = input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});

	// Certain minor words should be left lowercase unless
	// they are the first or last words in the string
	lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
	for ( i = 0,
	j = lowers.length; i < j; i++)
		str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), function(txt) {
			return txt.toLowerCase();
		});

	// Certain words such as initialisms or acronyms should be left uppercase
	uppers = ['Id', 'Tv'];
	for ( i = 0,
	j = uppers.length; i < j; i++)
		str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), uppers[i].toUpperCase());

	return str;
}

function numberWithCommas(x) {
	if (x) {
		x = x.toString();
	} else {
		x = '';
	}
	var pattern = /(-?\d+)(\d{3})/;
	while (pattern.test(x))
	x = x.replace(pattern, "$1,$2");
	return x;
}

function getCoinsByPercentNum(percentNum) {
	var coins = [];
	if (percentNum == 100) {
		coins = [25, 25, 25, 10, 10, 5];
	}
	if (percentNum == 95) {
		coins = [25, 25, 25, 10, 5, 5];
	}
	if (percentNum == 90) {
		coins = [25, 25, 25, 10, 5];
	}
	if (percentNum == 85) {
		coins = [25, 25, 10, 10, 10, 5];
	}
	if (percentNum == 80) {
		coins = [25, 25, 10, 10, 5, 5];
	}
	if (percentNum == 75) {
		coins = [25, 25, 10, 10, 5];
	}
	if (percentNum == 70) {
		coins = [25, 25, 10, 5, 5];
	}
	if (percentNum == 65) {
		coins = [25, 25, 10, 5];
	}
	if (percentNum == 60) {
		coins = [25, 10, 10, 10, 5];
	}
	if (percentNum == 55) {
		coins = [25, 10, 10, 5, 5];
	}
	if (percentNum == 50) {
		coins = [25, 10, 10, 5];
	}
	if (percentNum == 45) {
		coins = [25, 10, 5, 5];
	}
	if (percentNum == 40) {
		coins = [25, 10, 5];
	}
	if (percentNum == 35) {
		coins = [10, 10, 10, 5];
	}
	if (percentNum == 30) {
		coins = [10, 10, 5, 5];
	}
	if (percentNum == 25) {
		coins = [10, 10, 5];
	}
	if (percentNum == 20) {
		coins = [10, 5, 5];
	}
	if (percentNum == 15) {
		coins = [10, 5];
	}
	if (percentNum == 10) {
		coins = [5, 5];
	}
	if (percentNum == 5) {
		coins = [5];
	}
	return coins;
}

function getItemData(componentStockTicker) {
	var itemData = new Array();

	var db = Ti.Database.open('cloud');

	//step 1, get facet Info and add to array in this order MarketCap, Sector, Industry, IPOyear
	var rs = db.execute('SELECT facetName, MarketCap, Sector, Industry, IFNULL(IPOyear, \'n/a\') IPOyear FROM facet a ' + ' WHERE a.facetTickerSymbol = ?', componentStockTicker);

	while (rs.isValidRow()) {

		var MarketCap = rs.fieldByName('MarketCap');
		var Sector = rs.fieldByName('Sector');
		var Industry = rs.fieldByName('Industry');
		var IPOyear = rs.fieldByName('IPOyear');
		var facetName = rs.fieldByName('facetName');

		rs.next();
	}

	//step 2 get stockData Info and att to array in this order - Last Close, Volume, Range

	var rs = db.execute('SELECT Close Close, closeDate  FROM stockData a ' + ' WHERE a.Ticker = ? and closeDate = ' + ' ( SELECT MAX(closeDate) FROM stockData where Ticker = ? ) ', componentStockTicker, componentStockTicker);
	var endDate = rs.fieldByName('closeDate');
	while (rs.isValidRow()) {
		var LastCloseValue = '$' + (rs.fieldByName('Close') / 100).toFixed(2);
		var LastCloseDate = rs.fieldByName('closeDate');
		var Volume = 'Nothing';
		//numberWithCommas(rs.fieldByName('Volume'));
		var Range = 'Nothing';
		//'$' + rs.fieldByName('Low').toFixed(2) + ' - ' + '$' + rs.fieldByName('High').toFixed(2);
		rs.next();
	}

	//step 3 get 52wk range
	var startDate = getStartDateForDateRange('1year');
	var rs = db.execute('SELECT MAX(Close) High, MIN(Close) Low FROM stockData a ' + ' WHERE a.Ticker = ? and closeDate >= DATE(?) and closeDate <= DATE(?) ', componentStockTicker, startDate, endDate);

	while (rs.isValidRow()) {
		var yearRange = '$' + rs.fieldByName('Low').toFixed(2) + ' - ' + '$' + rs.fieldByName('High').toFixed(2);
		rs.next();
	}

	db.close();

	itemData.push({
		rowtitle : {
			title : 'Ticker'
		},
		rowmeta : {
			title : componentStockTicker
		},
		rRowtitle : {
			title : 'Last Close'
		},
		rRowmeta : {
			title : LastCloseValue
		}
	});
	itemData.push({
		rowtitle : {
			title : 'Sector'
		},
		rowmeta : {
			title : Sector
		},
		rRowtitle : {
			title : 'Market Cap'
		},
		rRowmeta : {
			title : MarketCap
		}
	});
	//itemData.push({rowtitle: { title : 'Volume'},   rowmeta: { title : Volume}, rRowtitle: { title : 'Range'}, rRowmeta: { title : Range}} );
	itemData.push({
		rowtitle : {
			title : 'IPO Year'
		},
		rowmeta : {
			title : IPOyear
		},
		rRowtitle : {
			title : 'More Info'
		},
		rowYahooFinance : {
			backgroundImage :'images/yahoo_finance.png',
			isLink : true,
			ticker : componentStockTicker,
			facetName : facetName,
			width : 80
		}
	});

	return itemData;
}

function getVaultIdByPortfolioId(portfolioId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT b.vaultId FROM Portfolio b ' + ' WHERE b.portfolioId = ?', portfolioId);

	while (rs.isValidRow()) {
		var vaultId = rs.fieldByName('vaultId');
		//, chartPic: rs.fieldByName('chartPic')});
		rs.next();
	}

	db.close();

	return vaultId;
}

function saveInvestment(ETFVersionId, investValue) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT b.ETFId FROM ETFVersion a ' + ' JOIN ETF b ON (a.ETFId = b.ETFId) ' + ' WHERE a.ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var ETFId = rs.fieldByName('ETFId');
		//, chartPic: rs.fieldByName('chartPic')});
		rs.next();
	}

	db.execute('UPDATE ETF set investValue = ? WHERE ETFId = ?', investValue, ETFId);

	db.close();

};

function getInvestment(ETFVersionId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT b.investValue FROM ETFVersion a ' + ' JOIN ETF b ON (a.ETFId = b.ETFId) ' + ' WHERE a.ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var investAmount = rs.fieldByName('investValue');
		//, chartPic: rs.fieldByName('chartPic')});
		rs.next();
	}

	db.close();

	if (investAmount) {
		return investAmount;
	} else {
		saveInvestment(ETFVersionId, 100);
		return 100;
	}
};

function getIndexButtons(mietfID) {
	var marketIndexIdArray = new Array();
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT a.marketIndexId, b.chartName, b.chartPic ' + ' from jctMarketIndexETF a ' + ' join marketIndex b on  (a.marketIndexId = b.marketIndexId) ' + ' where a.ETFid= ? ', mietfID);

	while (rs.isValidRow()) {
		marketIndexIdArray.push({
			marketIndexId : rs.fieldByName('marketIndexId'),
			chartName : rs.fieldByName('chartName'),
			chartPic : rs.fieldByName('chartPic')
		});
		rs.next();
	}

	db.close();

	return marketIndexIdArray;

}

function updateJctMarketIndexETF(ETFVersionId, rows) {
	//_args.mietfID, tableView.data[1].rows

	//delete old records
	var db = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT ETFId, VersionNum from ETFVersion WHERE ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var VersionNum = rs.fieldByName('VersionNum');
		var mietfID = rs.fieldByName('ETFid');
		rs.next();
	}

	db.execute('DELETE from jctMarketIndexETF where ETFid = ?', mietfID);

	//insert new ones
	for ( i = 0; i < rows.length; i++) {
		if (rows[i].onSwitch) {
			db.execute('INSERT INTO jctMarketIndexETF (jctMarketIndexETFId, ETFid, marketIndexId) VALUES (NULL, ?, ?)', mietfID, rows[i].marketIndexId);
		}
	}

	db.close();
};

function insertPortfolio(vaultId, portfolioName) {
	//rs = db.execute('CREATE TABLE portfolio (portfolioId INTEGER PRIMARY KEY AUTOINCREMENT, vaultId INTEGER, portfolioName TEXT)');
	var db = Ti.Database.open('cloud');
	db.execute('UPDATE portfolio set sortNum = sortNum + 1 WHERE vaultId = ?', vaultId);
	db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName, sortNum) VALUES (NULL, ?, ?, ?)', vaultId, portfolioName, 0);
	db.close();

};

function updatePortfolio(portfolioId, portfolioName) {
	var db = Ti.Database.open('cloud');
	db.execute('UPDATE portfolio set portfolioName = ? WHERE portfolioId = ?', portfolioName, portfolioId);
	db.close();

};

function updateMiETFName(mietfId, mietfName) {

	var db = Ti.Database.open('cloud');
	db.execute('UPDATE ETF set MiETFName = ? WHERE ETFId = ?', mietfName, mietfId);
	db.close();

	return;
};

function getMietfCNTbyPorfolioId(portfolioId) {

	var db = Ti.Database.open('cloud');
	var rs = db.execute('SELECT COUNT(*) CNT FROM ETF WHERE portfolioId = ?', portfolioId);
	while (rs.isValidRow()) {
		var CNT = rs.fieldByName('CNT');
		rs.next();
	}

	db.close();

	return CNT;
};

function getMietfName(mietfId) {

	var db = Ti.Database.open('cloud');
	var rs = db.execute('SELECT MiETFName FROM ETF WHERE ETFId = ?', mietfId);
	while (rs.isValidRow()) {
		var MiETFName = toTitleCase(rs.fieldByName('MiETFName'));
		rs.next();
	}

	db.close();

	return MiETFName;
};

function insertMietf(portfolioId, mietfName) {
	//rs = db.execute('CREATE TABLE ETF (ETFId INTEGER PRIMARY KEY AUTOINCREMENT,
	//portfolioId INTEGER, MiETFName TEXT, iconImg TEXT)');
	//'images/ifapps/pharmaSample.pn8'

	var db = Ti.Database.open('cloud');

	//give me Cash facetId

	var cashFacetId = 4819;

	rs = db.execute('SELECT facetId from facet where facet_code = ?', 'CASH');

	while (rs.isValidRow()) {
		cashFacetId = rs.fieldByName('facetId');
		rs.next();
	}

	db.execute('UPDATE ETF set sortNum = sortNum + 1 WHERE portfolioId = ?', portfolioId);
	db.execute('INSERT INTO ETF (ETFId, portfolioId, MiETFName, sortNum, isClone, clonedETFId) VALUES (NULL, ?, ?, ?, ?, ?)', portfolioId, mietfName, 0, 0, 0);
	var ETFId = db.lastInsertRowId;

	db.execute('INSERT INTO ETFVersion (ETFVersionId, ETFId, VersionNum, GraphEnabledFlag, DeletedFlag, strategyId) VALUES (NULL, ?, ?, ?, ?, 768)', ETFId, 1, 1, 0);
	var ETFVersionId = db.lastInsertRowId;

	db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFVersionId, facetId, facetQty, sortNum, PercentNum) VALUES (NULL, ?, ?, ?, ?, ?)', ETFVersionId, cashFacetId, 10000, 1, 100);

	db.execute('INSERT INTO jctMarketIndexETF (ETFid, marketIndexId) VALUES (?,?)', ETFId, 3);
	//3 is S&P 500
	db.close();

	return ETFVersionId;
};

function getButtonNames() {
	var db = Ti.Database.open('cloud');

	var buttonNames = new Array();
	var mietfId = getETFFromVersion(mietf.ETFVersionId);

	var rs = db.execute(' SELECT ETFVersionId, VersionNum from ETFVersion WHERE ETFVersionId not in (?) AND ETFId = ? ORDER BY VersionNum DESC', mietf.ETFVersionId, mietfId);

	while (rs.isValidRow()) {
		var id = rs.fieldByName('VersionNum');
		buttonNames.push('Restore Version ' + id);
		rs.next();
	}

	db.close();
	buttonNames.push('Clear Versions');
	buttonNames.push('Cancel');

	return buttonNames;

}

function revertToETFVersion(restoreVersionNum) {
	var mietfId = getETFFromVersion(mietf.ETFVersionId);

	var db = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT ETFVersionId from ETFVersion WHERE ETFId = ? and VersionNum = ?', mietfId, restoreVersionNum);

	while (rs.isValidRow()) {
		var restoreETFVersionId = rs.fieldByName('ETFVersionId');
		rs.next();
	}

	db.execute('DELETE from jctFacetETF WHERE ETFVersionId in ' + ' (SELECT ETFVersionId FROM ETFVersion WHERE ETFId = ? and VersionNum > ? )', mietfId, restoreVersionNum);

	db.execute('DELETE from ETFVersion WHERE ETFId = ? and VersionNum > ?', mietfId, restoreVersionNum);

	db.close();

	return restoreETFVersionId;

};

function clearPreviousVersions() {
	var db = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT ETFId, VersionNum from ETFVersion WHERE ETFVersionId = ?', mietf.ETFVersionId);

	while (rs.isValidRow()) {
		var mietfID = rs.fieldByName('ETFid');
		var VersionNum = rs.fieldByName('VersionNum');
		rs.next();
	}

	db.execute('DELETE from jctFacetETF WHERE ETFVersionId in ' + ' (SELECT ETFVersionId FROM ETFVersion WHERE ETFId = ? and VersionNum < ? )', mietfID, VersionNum);

	db.execute('DELETE from ETFVersion WHERE ETFId = ? and VersionNum < ?', mietfID, VersionNum);

	db.close();
};

function getETFFromVersion(ETFVersionId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT ETFId from ETFVersion WHERE ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var mietfID = rs.fieldByName('ETFid');
		rs.next();
	}

	db.close();

	return mietfID;

}

function updateJctMiETFETF(ETFVersionId, rows) {
	//this table told you which comparison MiETFs you wanted

	var db = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT ETFId, VersionNum from ETFVersion WHERE ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var VersionNum = rs.fieldByName('VersionNum');
		var mietfID = rs.fieldByName('ETFid');
		rs.next();
	}

	db.execute('DELETE from jctMiETFETF where MiETFId = ?', mietfID);
	var cnt = 0;
	for ( i = 0; i < rows.length; i++) {
		if (rows[i].onSwitch) {
			cnt++;
			if (cnt > 1)
				alert('big problem');
			rs = db.execute('INSERT INTO jctMiETFETF (jctMiETFETFId, MiETFid, ETFid) VALUES (NULL, ?, ?)', mietfID, rows[i].ETFid);
		}
	}

	db.close();
};

function MarketIndexesExistByMietfId(mietfID) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT count(a.marketIndexId) cnt ' + ' from jctMarketIndexETF a ' + ' where a.ETFid= ? ', mietfID);

	var cnt = 0;

	while (rs.isValidRow()) {
		cnt = rs.fieldByName('cnt');
		rs.next();
	}

	db.close();

	return cnt;
}

function ComparisonMiETFExistByMietfId(mietfID) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT count(a.jctMiETFETFId) cnt ' + ' from jctMiETFETF a ' + ' where a.MiETFId= ? ', mietfID);

	var cnt = 0, etfName='';

	while (rs.isValidRow()) {
		cnt = rs.fieldByName('cnt');
		rs.next();
	}

	if (cnt > 0) {

		var rs = db.execute('SELECT a.ETFId etfId, e.MiETFName etfName  ' + ' from jctMiETFETF a JOIN ETF e ON e.ETFId = a.ETFId' + ' where a.MiETFId= ? ', mietfID);

		while (rs.isValidRow()) {
			cnt = rs.fieldByName('etfId');
			etfName = rs.fieldByName('etfName');
			rs.next();
		}

	}
	db.close();

	return {etfId:cnt,etfName:etfName};
}

function getMarketIndexesByMietfId(mietfID) {
	var marketIndexIdArray = new Array();
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT a.marketIndexId ' + ' from jctMarketIndexETF a ' + ' where a.ETFid= ? ', mietfID);

	while (rs.isValidRow()) {
		marketIndexIdArray.push({
			marketIndexId : rs.fieldByName('marketIndexId')
		});
		rs.next();
	}

	db.close();

	return marketIndexIdArray;

}

function getAddButtonTableDataById(ETFVersionId) {
	var db = Ti.Database.open('cloud');
	var rs = db.execute(' SELECT ETFId, VersionNum from ETFVersion WHERE ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var VersionNum = rs.fieldByName('VersionNum');
		var mietfID = rs.fieldByName('ETFid');
		rs.next();
	}

	var returnData = [];

	//1. Get title of this

	var rs = db.execute('SELECT a.MiETFName ' + ' from ETF a ' + ' where a.ETFid= ? ', mietfID);

	while (rs.isValidRow()) {
		var title = toTitleCase(rs.fieldByName('MiETFName'));
		returnData.push({
			other : false,
			action : false,
			header : 'This MiETF',
			title : title,
			rightImage : 'images/ifapps/checkmarkGrey.pn8',
			font : {
				fontSize : '13sp',
				fontFamily : 'AvenirNextCondensed-Bold',
				fontWeight : 'bold'
			}
		});
		rs.next();
	}

	//1b is there a previous version?
	var test = savedMietfExists(mietfID);

	if (test) {

		returnData.push({
			other : false,
			action : false,
			title : title + ' (no Strategy)',
			rightImage : 'images/ifapps/checkmarkGrey.pn8',
			font : {
				fontSize : '13sp',
				fontFamily : 'AvenirNextCondensed-Bold',
				fontWeight : 'bold'
			}
		});

	}

	var rs = db.execute('SELECT a.marketIndexName, ifnull(b.ETFid, 0) selected, a.marketIndexId ' + ' from marketIndex a ' + ' left join jctMarketIndexETF b ON (a.marketIndexId = b.marketIndexId and b.ETFid = ?) ' + '  ', mietfID);

	var firstRow = 0;

	while (rs.isValidRow()) {
		var onSwitch = true;
		var rightImage = 'images/ifapps/checkmark.pn8';
		if (rs.fieldByName('selected') == 0) {
			rightImage = '';
			onSwitch = false;
		}
		if (firstRow == 0) {
			returnData.push({
				other : false,
				marketIndexId : rs.fieldByName('marketIndexId'),
				action : true,
				onSwitch : onSwitch,
				header : 'Index',
				title : rs.fieldByName('marketIndexName'),
				rightImage : rightImage,
				font : {
					fontSize : '13sp',
					fontFamily : 'AvenirNextCondensed-Bold',
					fontWeight : 'bold'
				}
			});
		} else {
			returnData.push({
				other : false,
				marketIndexId : rs.fieldByName('marketIndexId'),
				action : true,
				onSwitch : onSwitch,
				title : rs.fieldByName('marketIndexName'),
				rightImage : rightImage,
				font : {
					fontSize : '13sp',
					fontFamily : 'AvenirNextCondensed-Bold',
					fontWeight : 'bold'
				}
			});
		}

		firstRow++;
		rs.next();
	}

	var rs = db.execute('SELECT a.MiETFName, ifnull(b.MiETFid, 0) selected, a.ETFid pass ' + ' from ETF a ' + ' left join jctMiETFETF b ON (a.ETFid = b.ETFid and b.MiETFid = ?) ' + ' where a.ETFid NOT IN (?) ', mietfID, mietfID);

	var firstRow = 0;

	while (rs.isValidRow()) {
		var onSwitch = true;
		var rightImage = 'images/ifapps/circleStar.pn8';
		if (rs.fieldByName('selected') == 0) {
			rightImage = '';
			onSwitch = false;
		}
		if (firstRow == 0) {
			returnData.push({
				other : true,
				ETFid : rs.fieldByName('pass'),
				action : true,
				onSwitch : onSwitch,
				header : 'Comparison MiETF',
				title : toTitleCase(rs.fieldByName('MiETFName')),
				rightImage : rightImage,
				font : {
					fontSize : '13sp',
					fontFamily : 'AvenirNextCondensed-Bold',
					fontWeight : 'bold'
				}
			});
		} else {
			returnData.push({
				other : true,
				ETFid : rs.fieldByName('pass'),
				action : true,
				onSwitch : onSwitch,
				title : toTitleCase(rs.fieldByName('MiETFName')),
				rightImage : rightImage,
				font : {
					fontSize : '13sp',
					fontFamily : 'AvenirNextCondensed-Bold',
					fontWeight : 'bold'
				}
			});
		}

		firstRow++;
		rs.next();
	}

	db.close();

	return returnData;
};

function get_time_difference(earlierDate, laterDate)//oDiff.mseconds
{
	var oDiff = new Object();

	//  Calculate Differences
	//  -------------------------------------------------------------------  //
	var nTotalDiff = laterDate.getTime() - earlierDate.getTime();

	oDiff.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
	nTotalDiff -= oDiff.days * 1000 * 60 * 60 * 24;

	oDiff.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
	nTotalDiff -= oDiff.hours * 1000 * 60 * 60;

	oDiff.minutes = Math.floor(nTotalDiff / 1000 / 60);
	nTotalDiff -= oDiff.minutes * 1000 * 60;

	oDiff.seconds = Math.floor(nTotalDiff / 1000);

	oDiff.mseconds = Math.floor(nTotalDiff);
	//  -------------------------------------------------------------------  //

	//  Format Duration
	//  -------------------------------------------------------------------  //
	//  Format Hours
	var hourtext = '00';
	if (oDiff.days > 0) {
		hourtext = String(oDiff.days);
	}
	if (hourtext.length == 1) {
		hourtext = '0' + hourtext;
	};

	//  Format Minutes
	var mintext = '00';
	if (oDiff.minutes > 0) {
		mintext = String(oDiff.minutes);
	}
	if (mintext.length == 1) {
		mintext = '0' + mintext;
	};

	//  Format Seconds
	var sectext = '00';
	if (oDiff.seconds > 0) {
		sectext = String(oDiff.seconds);
	}
	if (sectext.length == 1) {
		sectext = '0' + sectext;
	};

	//  Set Duration

	var sDuration = hourtext + ':' + mintext + ':' + sectext;
	oDiff.duration = sDuration;
	//  -------------------------------------------------------------------  //

	return oDiff;
}

function deleteZeroMietfComponents(ETFVersionId) {
	var db = Ti.Database.open('cloud');
	var rs = db.execute('DELETE FROM jctFacetETF WHERE PercentNum = ? and ETFVersionId=?', 0, ETFVersionId);
	db.close();
}

function deletePortfolioById(portfolioId) {
	var db = Ti.Database.open('cloud');
	var rs = db.execute('DELETE FROM portfolio WHERE portfolioId=?', portfolioId);
	db.close();
}

function deleteMiETFById(mietfId) {
	var db = Ti.Database.open('cloud');
	var rs = db.execute('DELETE FROM ETF WHERE ETFId=?', mietfId);
	db.close();
}

function addMietfToMietfComponent(parentETFVersionId, mietfId) {//ETFVersionId is what you are adding to, mietfId is what you are adding
    
  Ti.API.info('addMietfToMietfComponent called');
    
	var db = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT MAX(ETFVersionId) childETFVersionId FROM ETFVersion ' + ' WHERE ETFId = ?', mietfId);
	
	var childETFVersionId;

	while (rs.isValidRow()) {
		childETFVersionId = rs.fieldByName('childETFVersionId');
		rs.next();
	}

 	db.close();
 	 	
 	var insertChildETFVersion = function() {
 		var newETFId = cloneETF(childETFVersionId);
		//parentETFVersionId is what you are adding to, childETFVersionId is the addition

		var db = Ti.Database.open('cloud');
		var rs = db.execute('INSERT INTO jctFacetETF (ETFVersionId, etfAsFacetId, facetQty, PercentNum) VALUES (?,?,?,?)', parentETFVersionId, newETFId, 0, 0);
		db.close();
 	};
		
	setTimeout(function(){
		insertChildETFVersion();
	}, 100);
		
	// I have moved this in function, It needs an timeout	
	/*
	var newETFId = cloneETF(childETFVersionId);
	//parentETFVersionId is what you are adding to, childETFVersionId is the addition

	var db = Ti.Database.open('cloud');
	var rs = db.execute('INSERT INTO jctFacetETF (ETFVersionId, etfAsFacetId, facetQty, PercentNum) VALUES (?,?,?,?)', parentETFVersionId, newETFId, 0, 0);
	db.close();
	*/
}


function cloneETF(childETFVersionId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT a.strategyId, a.VersionNum, a.ETFId, b.portfolioId, b.MiETFName, b.iconImg, b.formulationDate, b.sortNum, b.investValue, b.isClone ' + 
		' FROM ETFVersion a JOIN ETF b ON (a.ETFId = b.ETFId) ' + ' WHERE a.ETFVersionId = ?', childETFVersionId);

	while (rs.isValidRow()) {
		var isClone = rs.fieldByName('isClone');
		var strategyId = rs.fieldByName('strategyId');

		if (isClone) {
			var MiETFName = rs.fieldByName('MiETFName');
		} else {
			var MiETFName = toTitleCase(rs.fieldByName('MiETFName')) + ' v.' + rs.fieldByName('VersionNum');
		}
		
		//above only if not already a clone

		db.execute(' INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg, formulationDate, sortNum, investValue, isClone, clonedETFId ) ' + 
			' VALUES  (null, ?, ?, ?, ?, ?, ?, ?, ?) ', rs.fieldByName('portfolioId'), MiETFName, rs.fieldByName('iconImg'), rs.fieldByName('formulationDate'), rs.fieldByName('sortNum'), rs.fieldByName('investValue'), 1, rs.fieldByName('ETFId'));

		var newETFId = db.lastInsertRowId;
		rs.next();
	}

	db.execute(' INSERT INTO ETFVersion (ETFVersionId, ETFId,    VersionNum, GraphEnabledFlag, DeletedFlag, strategyId) ' + 'VALUES  (null, ?, ?, ?, ?, ?) ', newETFId, 1, 0, 0, strategyId);

	var newETFVersionId = db.lastInsertRowId;

	var rs = db.execute(' SELECT ETFVersionId, facetId, facetQty, sortNum, PercentNum, ifnull(etfAsFacetId, 0) etfAsFacetId from jctFacetETF where ETFVersionId = ?', childETFVersionId);
	var resultsArr = new Array();

	//put into array to release database lock

	while (rs.isValidRow()) {

		resultsArr.push({
			newETFVersionId : newETFVersionId,
			facetId : rs.fieldByName('facetId'),
			facetQty : rs.fieldByName('facetQty'),
			sortNum : rs.fieldByName('sortNum'),
			PercentNum : rs.fieldByName('PercentNum'),
			etfAsFacetId : rs.fieldByName('etfAsFacetId')
		});

		rs.next();

	}

	db.close();

	for ( i = 0; i < resultsArr.length; i++) {
		if (resultsArr[i].etfAsFacetId == 0) {

			var db = Ti.Database.open('cloud');
			Ti.API.info('i:' + i + ', resultsArr[i].etfAsFacetId: ' + resultsArr[i].etfAsFacetId);
			Ti.API.info('i:' + i + ', newETFVersionId:' + resultsArr[i].newETFVersionId);
			db.execute(' INSERT INTO jctFacetETF (jctFacetETFId, ETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId) ' + ' VALUES (null, ?, ?, ?, ?, ?, null) ', resultsArr[i].newETFVersionId, resultsArr[i].facetId, resultsArr[i].facetQty, resultsArr[i].sortNum, resultsArr[i].PercentNum);
			db.close();
		} else {
			Ti.API.info('length: ' + resultsArr.length);
			//2
			mietf.copyResults.push(resultsArr);
			mietf.copyIndex.push(i);
			mietf.copynewETFVersionId.push(newETFVersionId);
			var newETFAsFacetId = cloneETF(resultsArr[i].etfAsFacetId);
			resultsArr = mietf.copyResults.pop();
			i = mietf.copyIndex.pop();
			newETFVersionId = mietf.copynewETFVersionId.pop();

			var db = Ti.Database.open('cloud');
			Ti.API.info('cant touch this');
			Ti.API.info('findme: ' + JSON.stringify(resultsArr));
			//undefined
			Ti.API.info('length: ' + resultsArr.length);
			//2
			Ti.API.info('i:' + i);
			//5
			db.execute(' INSERT INTO jctFacetETF (jctFacetETFId, ETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId) ' + ' VALUES (null, ?, ?, ?, ?, ?, ?) ', resultsArr[i].newETFVersionId, resultsArr[i].facetId, resultsArr[i].facetQty, resultsArr[i].sortNum, resultsArr[i].PercentNum, newETFAsFacetId);
			db.close();

		}

	}

	return newETFVersionId;
}

function cloneETFforExport(childETFVersionId) {
	var db = Ti.Database.open('cloud');
	var mietfdb = Ti.Database.open('mietf');

	var rs = db.execute(' SELECT a.strategyId, a.VersionNum, a.ETFId, b.portfolioId, b.MiETFName, b.iconImg, b.formulationDate, b.sortNum, b.investValue, b.isClone FROM ETFVersion a JOIN ETF b ON (a.ETFId = b.ETFId) ' + ' WHERE a.ETFVersionId = ?', childETFVersionId);

	while (rs.isValidRow()) {
		var isClone = rs.fieldByName('isClone');
		var strategyId = rs.fieldByName('strategyId');

		if (isClone) {
			var MiETFName = rs.fieldByName('MiETFName');
		} else {
			var MiETFName = toTitleCase(rs.fieldByName('MiETFName')) + ' v.' + rs.fieldByName('VersionNum');
		}

		//above only if not already a clone

		mietfdb.execute(' INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg, formulationDate, sortNum, investValue, isClone, clonedETFId ) ' + ' VALUES  (null, ?, ?, ?, ?, ?, ?, ?, ?) ', rs.fieldByName('portfolioId'), MiETFName, rs.fieldByName('iconImg'), rs.fieldByName('formulationDate'), rs.fieldByName('sortNum'), rs.fieldByName('investValue'), 1, rs.fieldByName('ETFId'));

		var newETFId = mietfdb.lastInsertRowId;
		rs.next();
	}

	mietfdb.execute(' INSERT INTO ETFVersion (ETFVersionId, ETFId, VersionNum, GraphEnabledFlag, DeletedFlag, strategyId) ' + 'VALUES  (null, ?, ?, ?, ?, ?) ', newETFId, 1, 0, 0, strategyId);

	var newETFVersionId = mietfdb.lastInsertRowId;

	var rs = db.execute(' SELECT ETFVersionId, facetId, facetQty, sortNum, PercentNum, ifnull(etfAsFacetId, 0) etfAsFacetId from jctFacetETF where ETFVersionId = ?', childETFVersionId);
	var resultsArr = new Array();

	//put into array to release database lock

	while (rs.isValidRow()) {

		resultsArr.push({
			newETFVersionId : newETFVersionId,
			facetId : rs.fieldByName('facetId'),
			facetQty : rs.fieldByName('facetQty'),
			sortNum : rs.fieldByName('sortNum'),
			PercentNum : rs.fieldByName('PercentNum'),
			etfAsFacetId : rs.fieldByName('etfAsFacetId')
		});

		rs.next();

	}

	db.close();
	mietfdb.close();

	for ( i = 0; i < resultsArr.length; i++) {
		if (resultsArr[i].etfAsFacetId == 0) {

			var db = Ti.Database.open('mietf');
			Ti.API.info('i:' + i + ', resultsArr[i].etfAsFacetId: ' + resultsArr[i].etfAsFacetId);
			Ti.API.info('i:' + i + ', newETFVersionId:' + resultsArr[i].newETFVersionId);
			db.execute(' INSERT INTO jctFacetETF (jctFacetETFId, ETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId) ' + ' VALUES (null, ?, ?, ?, ?, ?, null) ', resultsArr[i].newETFVersionId, resultsArr[i].facetId, resultsArr[i].facetQty, resultsArr[i].sortNum, resultsArr[i].PercentNum);
			db.close();
		} else {
			Ti.API.info('length: ' + resultsArr.length);
			//2
			mietf.copyResults.push(resultsArr);
			mietf.copyIndex.push(i);
			mietf.copynewETFVersionId.push(newETFVersionId);
			var newETFAsFacetId = cloneETFforExport(resultsArr[i].etfAsFacetId);
			resultsArr = mietf.copyResults.pop();
			i = mietf.copyIndex.pop();
			newETFVersionId = mietf.copynewETFVersionId.pop();

			var db = Ti.Database.open('mietf');
			Ti.API.info('cant touch this');
			Ti.API.info('findme: ' + JSON.stringify(resultsArr));
			//undefined
			Ti.API.info('length: ' + resultsArr.length);
			//2
			Ti.API.info('i:' + i);
			//5
			db.execute(' INSERT INTO jctFacetETF (jctFacetETFId, ETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId) ' + ' VALUES (null, ?, ?, ?, ?, ?, ?) ', resultsArr[i].newETFVersionId, resultsArr[i].facetId, resultsArr[i].facetQty, resultsArr[i].sortNum, resultsArr[i].PercentNum, newETFAsFacetId);
			db.close();

		}

	}

	return newETFVersionId;
}

function importETF(childETFVersionId) {
	Ti.API.info('importETF called');
	var db = Ti.Database.open('mietf');
	var mietfdb = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT a.strategyId, a.VersionNum, a.ETFId, b.portfolioId, b.MiETFName, b.iconImg, b.formulationDate, b.sortNum, b.investValue, b.isClone FROM ETFVersion a JOIN ETF b ON (a.ETFId = b.ETFId) ' + ' WHERE a.ETFVersionId = ?', childETFVersionId);

	while (rs.isValidRow()) {
		var isClone = rs.fieldByName('isClone');
		var strategyId = rs.fieldByName('strategyId');

		if (isClone) {
			var MiETFName = rs.fieldByName('MiETFName');
		} else {
			var MiETFName = toTitleCase(rs.fieldByName('MiETFName')) + ' v.' + rs.fieldByName('VersionNum');
		}

		//above only if not already a clone

		mietfdb.execute(' INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg, formulationDate, sortNum, investValue, isClone, clonedETFId ) ' + ' VALUES  (null, ?, ?, ?, ?, ?, ?, ?, ?) ', rs.fieldByName('portfolioId'), MiETFName, rs.fieldByName('iconImg'), rs.fieldByName('formulationDate'), rs.fieldByName('sortNum'), rs.fieldByName('investValue'), 1, rs.fieldByName('ETFId'));

		var newETFId = mietfdb.lastInsertRowId;
		rs.next();
	}

	mietfdb.execute(' INSERT INTO ETFVersion (ETFVersionId, ETFId, VersionNum, GraphEnabledFlag, DeletedFlag, strategyId) ' + 'VALUES  (null, ?, ?, ?, ?, ?) ', newETFId, 1, 0, 0, strategyId);

	var newETFVersionId = mietfdb.lastInsertRowId;

	var rs = db.execute(' SELECT ETFVersionId, facetId, facetQty, sortNum, PercentNum, ifnull(etfAsFacetId, 0) etfAsFacetId from jctFacetETF where ETFVersionId = ?', childETFVersionId);
	var resultsArr = new Array();

	//put into array to release database lock

	while (rs.isValidRow()) {

		resultsArr.push({
			newETFVersionId : newETFVersionId,
			facetId : rs.fieldByName('facetId'),
			facetQty : rs.fieldByName('facetQty'),
			sortNum : rs.fieldByName('sortNum'),
			PercentNum : rs.fieldByName('PercentNum'),
			etfAsFacetId : rs.fieldByName('etfAsFacetId')
		});

		rs.next();

	}

	db.close();
	mietfdb.close();

	for ( i = 0; i < resultsArr.length; i++) {
		if (resultsArr[i].etfAsFacetId == 0) {

			var db = Ti.Database.open('cloud');
			Ti.API.info('i:' + i + ', resultsArr[i].etfAsFacetId: ' + resultsArr[i].etfAsFacetId);
			Ti.API.info('i:' + i + ', newETFVersionId:' + resultsArr[i].newETFVersionId);
			db.execute(' INSERT INTO jctFacetETF (jctFacetETFId, ETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId) ' + ' VALUES (null, ?, ?, ?, ?, ?, null) ', resultsArr[i].newETFVersionId, resultsArr[i].facetId, resultsArr[i].facetQty, resultsArr[i].sortNum, resultsArr[i].PercentNum);
			db.close();
		} else {
			Ti.API.info('length: ' + resultsArr.length);
			//2
			mietf.copyResults.push(resultsArr);
			mietf.copyIndex.push(i);
			mietf.copynewETFVersionId.push(newETFVersionId);
			var newETFAsFacetId = importETF(resultsArr[i].etfAsFacetId);
			resultsArr = mietf.copyResults.pop();
			i = mietf.copyIndex.pop();
			newETFVersionId = mietf.copynewETFVersionId.pop();

			var db = Ti.Database.open('cloud');
			Ti.API.info('cant touch this');
			Ti.API.info('findme: ' + JSON.stringify(resultsArr));
			//undefined
			Ti.API.info('length: ' + resultsArr.length);
			//2
			Ti.API.info('i:' + i);
			//5
			db.execute(' INSERT INTO jctFacetETF (jctFacetETFId, ETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId) ' + ' VALUES (null, ?, ?, ?, ?, ?, ?) ', resultsArr[i].newETFVersionId, resultsArr[i].facetId, resultsArr[i].facetQty, resultsArr[i].sortNum, resultsArr[i].PercentNum, newETFAsFacetId);
			db.close();

		}

	}

	return newETFVersionId;
}

function finalizeImportETF(ETFVersionId) {
	//in a certain portfolioId
	//set other switches
	var db = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT ETFId from ETFVersion where ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var mietfId = rs.fieldByName('ETFId');
		rs.next();
	}

	var rs = db.execute(' SELECT portfolioId from portfolio where specialFlag = ?', 'DOWNLOAD');

	while (rs.isValidRow()) {
		var portfolioId = rs.fieldByName('portfolioId');
		rs.next();
	}

	db.execute('UPDATE ETF SET portfolioId=?, isClone=?, clonedETFId = ? WHERE ETFId=?', portfolioId, 0, 0, mietfId);

	db.close();

}

function addMietfComponent(ETFVersionId, facetId, facetQty, PercentNum) {
	//jctFacetETFId INTEGER PRIMARY KEY AUTOINCREMENT, ETFid INTEGER, facetId INTEGER, facetQty NUMBER
    
	var db = Ti.Database.open('cloud');
	var rs = db.execute('DELETE FROM jctFacetETF WHERE ETFVersionId = ? and facetId=?', ETFVersionId, facetId);
	var rs = db.execute('INSERT INTO jctFacetETF (ETFVersionId, facetId, facetQty, PercentNum) VALUES (?,?,?,?)', ETFVersionId, facetId, facetQty?facetQty:0, PercentNum?PercentNum:0);
	db.close();
}


function deleteMietfComponent(ETFVersionId, facetId) {
	var db = Ti.Database.open('cloud');
	var rs = db.execute('DELETE FROM jctFacetETF WHERE ETFVersionId = ? and facetId=?', ETFVersionId, facetId);
	db.close();
}

function savedMietfExists(mietfId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT COUNT(*) CNT FROM ETFVersion ' + ' WHERE ETFId = ?', mietfId);

	while (rs.isValidRow()) {
		var CNT = rs.fieldByName('CNT');
		rs.next();
	}

	db.close();

	var returnVal = false;
	if (CNT > 1) {
		returnVal = true;
	}

	return returnVal;
};

function saveMietfComponents(ETFVersionId) {

	var db = Ti.Database.open('cloud');

	//What this procedure does, is creates a new version as a copy of the old one.
	//then it should return the new ETFVersionId

	//current revision is the max
	var rs = db.execute(' SELECT ETFId, VersionNum, strategyId from ETFVersion WHERE ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var VersionNum = rs.fieldByName('VersionNum');
		var ETFId = rs.fieldByName('ETFid');
		var strategyId = rs.fieldByName('strategyId');
		if (!strategyId)
			strategyId = 0;
		rs.next();
	}

	//update GraphEnabledFlag on old version, create new version

	db.execute(' UPDATE ETFVersion SET GraphEnabledFlag = ? WHERE ETFVersionId = ?', 0, ETFVersionId);
	db.execute(' INSERT INTO ETFVersion (ETFVersionId, ETFId, VersionNum, GraphEnabledFlag, DeletedFlag, strategyId) ' + 'VALUES  (null, ?, ?, ?, ?, ?) ', ETFId, (VersionNum + 1), 1, 0, strategyId);

	//alert('old to return to is : ' + mietf.strategyArr[strategyId].displayLine1 + ' ' + mietf.strategyArr[strategyId].displayLine2);

	var newETFVersionId = db.lastInsertRowId;

	db.execute('DELETE FROM ETFVersion WHERE ETFId=?  and VersionNum < ?', ETFId, (VersionNum));
	//was -2

	var rs = db.execute(' SELECT facetId, facetQty, sortNum, PercentNum, etfAsFacetId FROM jctFacetETF ' + ' WHERE ETFVersionId = ?', ETFVersionId);
	while (rs.isValidRow()) {
		var facetId = rs.fieldByName('facetId');
		var facetQty = rs.fieldByName('facetQty');
		var sortNum = rs.fieldByName('sortNum');
		var PercentNum = rs.fieldByName('PercentNum');
		var etfAsFacetId = rs.fieldByName('etfAsFacetId');

		db.execute(' INSERT INTO jctFacetETF (ETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId) ' + ' VALUES (?, ?, ?, ?, ?, ?)', newETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId);
		//alert('newETFVersionId:' + newETFVersionId + ', facetId: ' + facetId + ', PercentNum:' + PercentNum);
		rs.next();
	}

	db.execute(' DELETE FROM jctFacetETF where ETFVersionId=? and facetQty = 0', ETFVersionId);
	//don't want zeros to be restored.

	db.close();

	return newETFVersionId;
};

function undoMietfComponents(ETFVersionId) {

	var db = Ti.Database.open('cloud');

	//What this procedure does, is creates a new version as a copy of the old one.
	//then it should return the new ETFVersionId

	//current revision is the max
	var rs = db.execute(' SELECT ETFId, VersionNum, strategyId from ETFVersion WHERE ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var VersionNum = rs.fieldByName('VersionNum');
		var ETFId = rs.fieldByName('ETFid');
		rs.next();
	}

	var rs = db.execute(' SELECT ETFVersionId, strategyId from ETFVersion WHERE VersionNum = ? and ETFId = ? ', VersionNum - 1, ETFId);

	while (rs.isValidRow()) {
		var oldETFVersionId = rs.fieldByName('ETFVersionId');
		var strategyId = rs.fieldByName('strategyId');
		rs.next();
	}

	//update GraphEnabledFlag on old version, create new version

	db.execute(' UPDATE ETFVersion SET GraphEnabledFlag = ? WHERE ETFVersionId = ?', 0, ETFVersionId);
	db.execute(' INSERT INTO ETFVersion (ETFVersionId, ETFId, VersionNum, GraphEnabledFlag, DeletedFlag, strategyId) ' + 'VALUES  (null, ?, ?, ?, ?, ?) ', ETFId, (VersionNum + 1), 1, 0, strategyId);

	//alert('going back to : ' + mietf.strategyArr[strategyId].displayLine1 + ' ' + mietf.strategyArr[strategyId].displayLine2);

	var newETFVersionId = db.lastInsertRowId;

	var rs = db.execute(' SELECT facetId, facetQty, sortNum, PercentNum, etfAsFacetId FROM jctFacetETF ' + ' WHERE ETFVersionId = ?', oldETFVersionId);
	while (rs.isValidRow()) {
		var facetId = rs.fieldByName('facetId');
		var facetQty = rs.fieldByName('facetQty');
		var sortNum = rs.fieldByName('sortNum');
		var PercentNum = rs.fieldByName('PercentNum');
		var etfAsFacetId = rs.fieldByName('etfAsFacetId');

		db.execute(' INSERT INTO jctFacetETF (ETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId) ' + ' VALUES (?, ?, ?, ?, ?, ?)', newETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId);
		//alert('newETFVersionId:' + newETFVersionId + ', facetId: ' + facetId + ', PercentNum:' + PercentNum);
		rs.next();
	}

	db.execute('DELETE FROM ETFVersion WHERE ETFId=?  and VersionNum < ?', ETFId, (VersionNum));
	//was -2
	db.execute(' DELETE FROM jctFacetETF where ETFVersionId=? and facetQty = 0', ETFVersionId);
	//don't want zeros to be restored.

	db.close();

	return newETFVersionId;
};

function revertToSavedMietfComponents(mietfId) {
	var db = Ti.Database.open('cloud');

	db.execute(' DELETE FROM jctFacetETF where ETFid=?', mietfId);

	var rs = db.execute(' SELECT ETFid, facetId, facetQty, sortNum, PercentNum FROM jctFacetETFRevision ' + ' WHERE ETFid = ?', mietfId);

	db.execute("BEGIN IMMEDIATE TRANSACTION");
	while (rs.isValidRow()) {
		var ETFid = rs.fieldByName('ETFid');
		var facetId = rs.fieldByName('facetId');
		var facetQty = rs.fieldByName('facetQty');
		var sortNum = rs.fieldByName('sortNum');
		var PercentNum = rs.fieldByName('PercentNum');

		db.execute(' INSERT INTO jctFacetETF (ETFid, facetId, facetQty, sortNum, PercentNum) ' + ' VALUES (?, ?, ?, ?, ?)', ETFid, facetId, facetQty, sortNum, PercentNum);

		rs.next();
	}

	db.execute("COMMIT TRANSACTION");

	db.execute(' DELETE FROM jctFacetETFRevision where ETFid=?', mietfId);

	db.close();
}

function changeFormulationForDateRange2(ETFVersionId, startDate, todayDate) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT  COUNT(b.jctFacetETFId) CNT ' + ' from ETF a join ETFVersion e on (a.ETFId = e.ETFid) ' + ' join jctFacetETF b on (e.ETFVersionId = b.ETFVersionId) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join facetType d on (c.facetTypeId = d.facetTypeId) ' + ' where e.ETFVersionId=? and d.facetTypeId in (1,2) and b.etfAsFacetId is null ', ETFVersionId);

	while (rs.isValidRow()) {
		var rowCnt = rs.fieldByName('CNT');

		rs.next();
	}

	var results = db.execute('SELECT MIN(closeDate) closeDate FROM (SELECT  d.closeDate, COUNT(d.Ticker) CNT ' + ' from ETF a join ETFVersion e on (a.ETFId = e.ETFid) ' + ' join jctFacetETF b on (e.ETFVersionId = b.ETFVersionId) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join facetType f on (c.facetTypeId = f.facetTypeId) ' + ' join stockData d on (c.facetTickerSymbol = d.Ticker) ' + ' where e.ETFVersionId=? and d.closeDate >= DATE(?) and d.closeDate <= DATE(?) and f.facetTypeId in (1,2) and b.etfAsFacetId is null ' + ' GROUP BY d.closeDate ' + ' HAVING COUNT(d.Ticker) = ? ' + ' ) tab', ETFVersionId, startDate, todayDate, rowCnt);

	while (results.isValidRow()) {
		var formulationDate = results.fieldByName('closeDate');
		results.next();
	}

	//update formulationDate

	var rs = db.execute(' SELECT ETFId from ETFVersion where ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var mietfId = rs.fieldByName('ETFId');
		rs.next();
	}

	var newRS = db.execute('SELECT formulationDate from ETF where ETFId = ?', mietfId);

	while (newRS.isValidRow()) {
		var testFormulationDate = newRS.fieldByName('formulationDate');
		newRS.next();
	}

	db.execute("BEGIN IMMEDIATE TRANSACTION");
	if (testFormulationDate != formulationDate)
		db.execute('UPDATE ETF set formulationDate = ? WHERE ETFId = ?', formulationDate, mietfId);
	db.execute("COMMIT TRANSACTION");

	var rsOuter = db.execute('SELECT  b.jctFacetETFId, d.facetTypeId, b.PercentNum, c.facetTickerSymbol  ' + ' from ETF a ' + ' join ETFVersion e on (a.ETFId = e.ETFid) ' + ' join jctFacetETF b on (e.ETFVersionId = b.ETFVersionId) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join facetType d on (c.facetTypeId = d.facetTypeId) ' + ' where e.ETFVersionId=?  ', ETFVersionId);

	var updateArray = new Array();
	while (rsOuter.isValidRow()) {

		var facetTypeId = rsOuter.fieldByName('facetTypeId');
		var PercentNum = rsOuter.fieldByName('PercentNum');
		var jctFacetETFId = rsOuter.fieldByName('jctFacetETFId');
		var facetTickerSymbol = rsOuter.fieldByName('facetTickerSymbol');
		//if cash do one thing
		if (facetTypeId == 3) {
			var newFacetQty = (PercentNum * 100);
		} else {//if not cash, then query

			var rs = db.execute(' SELECT  Close Close' + ' FROM stockData a ' + ' WHERE a.closeDate = ? AND a.Ticker = ? ', formulationDate, facetTickerSymbol);

			while (rs.isValidRow()) {
				var Close = rs.fieldByName('Close');
				rs.next();
			}

			var newFacetQty = (Number(PercentNum) * 100) / Number(Close);
		}

		updateArray.push({
			newFacetQty : newFacetQty,
			jctFacetETFId : jctFacetETFId
		});

		rsOuter.next();
	}

	db.close();

	return updateArray;

}

function changeFormulationForDateRangeRevision(mietfId, startDate, todayDate) {
	var db = Ti.Database.open('cloud');
	var rs = db.execute('SELECT  COUNT(b.jctFacetETFId) CNT ' + ' from ETF a join jctFacetETFRevision b on (a.ETFId = b.ETFid) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join facetType d on (c.facetTypeId = d.facetTypeId) ' + ' where a.ETFId=? and d.facetTypeId in (1,2) ', mietfId);

	while (rs.isValidRow()) {
		var rowCnt = rs.fieldByName('CNT');
		rs.next();
	}

	var results = db.execute('SELECT MIN(closeDate) closeDate FROM (SELECT  d.closeDate, COUNT(d.Ticker) CNT ' + ' from ETF a join jctFacetETFRevision b on (a.ETFId = b.ETFid) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join stockData d on (c.facetTickerSymbol = d.Ticker) ' + ' where a.ETFId=? and d.closeDate >= DATE(?) and d.closeDate <= DATE(?)' + ' GROUP BY d.closeDate ' + ' HAVING COUNT(d.Ticker) = ? ' + ' ) tab', mietfId, startDate, todayDate, rowCnt);

	while (results.isValidRow()) {
		var formulationDate = results.fieldByName('closeDate');
		results.next();
	}

	//update formulationDate
	db.execute('UPDATE ETF set formulationDate = ? WHERE ETFId = ?', formulationDate, mietfId);

	var rsOuter = db.execute('SELECT  b.jctFacetETFId, d.facetTypeId, b.PercentNum, c.facetTickerSymbol  ' + ' from ETF a ' + ' join jctFacetETFRevision b on (a.ETFId = b.ETFid) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join facetType d on (c.facetTypeId = d.facetTypeId) ' + ' where a.ETFId=?  ', mietfId);

	var updateArray = new Array();
	while (rsOuter.isValidRow()) {

		var facetTypeId = rsOuter.fieldByName('facetTypeId');
		var PercentNum = rsOuter.fieldByName('PercentNum');
		var jctFacetETFId = rsOuter.fieldByName('jctFacetETFId');
		var facetTickerSymbol = rsOuter.fieldByName('facetTickerSymbol');
		//if cash do one thing
		if (facetTypeId == 3) {
			var newFacetQty = (PercentNum * 100);
		} else {//if not cash, then query

			var rs = db.execute(' SELECT  Close Close' + ' FROM stockData a ' + ' WHERE a.closeDate = ? AND a.Ticker = ? ', formulationDate, facetTickerSymbol);

			while (rs.isValidRow()) {
				var Close = rs.fieldByName('Close');
				rs.next();
			}

			var newFacetQty = (Number(PercentNum) * 100) / Number(Close);
		}

		updateArray.push({
			newFacetQty : newFacetQty,
			jctFacetETFId : jctFacetETFId
		});

		rsOuter.next();
	}

	db.close();

	return updateArray;

}

function changeMietfComponents(ETFVersionId, jctFacetETFId, PercentNumChange) {
	var db = Ti.Database.open('cloud');

	if (jctFacetETFId == 0) {//this only happens if this is CASH and auto-added to form by a MiETF that doesn't have cash in its formula
		var Close = 1;
		var oldPercentNum = 0;
		var newPercentNum = oldPercentNum + PercentNumChange;
		var newFacetQty = (newPercentNum * 100) / Close;

		rs = db.execute('SELECT facetId from facet where facet_code = ?', 'CASH');

		while (rs.isValidRow()) {
			var facetId = rs.fieldByName('facetId');
			rs.next();
		}

		rs = db.execute('INSERT INTO jctFacetETF (ETFVersionId, facetId, facetQty, PercentNum, sortNum) ' + ' VALUES (?, ?, ?, ?, ?) ', ETFVersionId, facetId, newFacetQty, newPercentNum, 0);

		db.close();
		return;
	}

	//determine if this is a MiETF component
	var etfAsFacetId = 0;

	var rs = db.execute('SELECT ifnull(a.etfAsFacetId, 0) etfAsFacetId, PercentNum ' + ' from jctFacetETF a' + ' where a.jctFacetETFId = ?', jctFacetETFId);

	while (rs.isValidRow()) {
		etfAsFacetId = rs.fieldByName('etfAsFacetId');
		var oldPercentNum = Number(rs.fieldByName('PercentNum'));
		rs.next();
	}

	if (etfAsFacetId > 0) {//this is a MiETF component
		var newPercentNum = oldPercentNum + PercentNumChange;
		rs = db.execute('UPDATE jctFacetETF ' + ' SET PercentNum = ? ' + ' WHERE jctFacetETFId = ?', newPercentNum, jctFacetETFId);

		db.close();

		return;
	}

	//get formulation date

	//get ETFid from ETFVersion

	var rs = db.execute(' SELECT ETFId from ETFVersion where ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var mietfId = rs.fieldByName('ETFId');
		rs.next();
	}

	var rs = db.execute(' SELECT formulationDate ' + ' FROM ETF ' + ' WHERE ETFId=?', mietfId);

	while (rs.isValidRow()) {
		var formulationDate = rs.fieldByName('formulationDate');
		rs.next();
	}

	//get facetTypeId (3 is cash)
	var rs = db.execute('SELECT a.facetQty, a.PercentNum, a.etfAsFacetId, b.facetTypeId, b.facetTickerSymbol ' + ' from jctFacetETF a' + ' join facet b on (a.facetId = b.facetId) ' + ' where a.jctFacetETFId = ?', jctFacetETFId);

	while (rs.isValidRow()) {
		var oldFacetQty = Number(rs.fieldByName('facetQty'));
		var oldPercentNum = Number(rs.fieldByName('PercentNum'));
		var facetTypeId = Number(rs.fieldByName('facetTypeId'));
		var facetTickerSymbol = rs.fieldByName('facetTickerSymbol');
		rs.next();
	}

	//if not cash, get closest price to formulation date, assume stock

	if (facetTypeId != 3) {

		var rs = db.execute(' SELECT MIN(a.closeDate) closeDate ' + ' FROM stockData a ' + ' WHERE a.closeDate >= ? AND a.Ticker = ? ', formulationDate, facetTickerSymbol);

		while (rs.isValidRow()) {
			var closeDate = rs.fieldByName('closeDate');
			rs.next();
		}

		//AdjClose

		var rs = db.execute(' SELECT  Close Close' + ' FROM stockData a ' + ' WHERE a.closeDate = ? AND a.Ticker = ? ', closeDate, facetTickerSymbol);

		while (rs.isValidRow()) {
			var Close = rs.fieldByName('Close');
			rs.next();
		}
	} else {
		var Close = 1;
	}

	var newPercentNum = oldPercentNum + PercentNumChange;
	var newFacetQty = (newPercentNum * 100) / Close;

	//alert('newPercentNum: ' + newPercentNum + ', newFacetQty: ' + newFacetQty + ', ticker:' + facetTickerSymbol);
	rs = db.execute('UPDATE jctFacetETF ' + ' SET PercentNum = ?, facetQty = ? ' + ' WHERE jctFacetETFId = ?', newPercentNum, newFacetQty, jctFacetETFId);

	db.close();
};

function getMietfComponentsChart(ETFVersionId) {

  Ti.API.info('getMietfComponentsChart ' +ETFVersionId);
	var db = Ti.Database.open('cloud');
	var mietfsArray = new Array();

	//first column is always Cash

	var rs = db.execute('SELECT b.facetTickerSymbol, b.facetName, a.PercentNum PercentNum, a.jctFacetETFId jctFacetETFId, a.facetQty facetQty, 0 ETFVersionId ' + 
						' from facet b ' + ' join jctFacetETF a on (a.facetId = b.facetId AND a.ETFVersionId=?) ' + 
						' WHERE b.facetId in (SELECT facetId from facet where facet_code=?) ORDER by a.sortNum, a.facetId asc', ETFVersionId, 'CASH');

	while (rs.isValidRow()) {
		mietfsArray.push({
			mietfSymbol : {
				title : 'Cash'
			},
			mietfPercent : {
				title : rs.fieldByName('PercentNum') + '%'
			},
			rowbottom : {},
			"jctFacetETFId" : rs.fieldByName('jctFacetETFId'),
			"facetTickerSymbol" : rs.fieldByName('facetTickerSymbol'),
			"facetName" : rs.fieldByName('facetName'),
			"PercentNum" : rs.fieldByName('PercentNum'),
			"facetQty" : rs.fieldByName('facetQty') == null ? 0.00 : rs.fieldByName('facetQty'),
			"ETFVersionId" : rs.fieldByName('ETFVersionId')
		});

		rs.next();
	}

	var rs = db.execute('SELECT facetTickerSymbol, facetName, PercentNum, jctFacetETFId, facetQty, sortNum, jctFacetETFId, ETFVersionId FROM ' + 
						'(SELECT b.facetTickerSymbol facetTickerSymbol, b.facetName facetName, a.PercentNum, a.jctFacetETFId, a.facetQty facetQty, a.sortNum, a.facetId, 0 ETFVersionId ' + 
						' from jctFacetETF a ' + ' join facet b on (a.facetId = b.facetId AND b.facetId NOT IN (SELECT facetId from facet where facet_code=?)) ' + ' where a.ETFVersionId= ? ' + 
						' UNION ' + 
						' SELECT \'MiETF\' facetTickerSymbol, c.MiETFName facetName, a.PercentNum, a.jctFacetETFId, a.facetQty facetQty, a.sortNum, a.facetId, d.ETFVersionId ' + 
						' from jctFacetETF a ' + ' join ETFVersion d on (a.etfAsFacetId = d.ETFVersionId ) ' + ' join ETF c on (d.ETFId = c.ETFId) ' + ' where a.ETFVersionId= ? )' + 
						' ORDER by sortNum, facetId asc', 'CASH', ETFVersionId, ETFVersionId);

	while (rs.isValidRow()) {

		mietfsArray.push({
			mietfSymbol : {
				title : rs.fieldByName('facetName')
			},
			mietfPercent : {
				title : rs.fieldByName('PercentNum') + '%'
			},
			rowbottom : {},
			"jctFacetETFId" : rs.fieldByName('jctFacetETFId'),
			"facetTickerSymbol" : rs.fieldByName('facetTickerSymbol'),
			"facetName" : rs.fieldByName('facetName'),
			"PercentNum" : rs.fieldByName('PercentNum'),
			"facetQty" : rs.fieldByName('facetQty') == null ? 0.00 : rs.fieldByName('facetQty'),
			"ETFVersionId" : rs.fieldByName('ETFVersionId')
		});
		//mietfListData.push({mietfSymbol: { title : 'Foreign Growth v.0'}, mietfPercent: { title : '50%'}, rowbottom: {}} );

		rs.next();
	}

	db.close();

	return mietfsArray;
};


function getMietfComponentsChartResursive(ETFVersionId, facetName) {

    Ti.API.info('getMietfComponentsChartResursive ' +facetName);
	var db = Ti.Database.open('cloud');
	var mietfsArray = new Array();

	//first column is always Cash
	//if(isParent){
	var rs = db.execute('SELECT b.facetTickerSymbol, b.facetName, a.PercentNum PercentNum, a.jctFacetETFId jctFacetETFId, a.facetQty facetQty, 0 ETFVersionId ' + 
						' from facet b ' + ' join jctFacetETF a on (a.facetId = b.facetId AND a.ETFVersionId=?) ' + 
						' WHERE b.facetId in (SELECT facetId from facet where facet_code=?) ORDER by a.sortNum, a.facetId asc', ETFVersionId, 'CASH');

	while (rs.isValidRow()) {
		mietfsArray.push({
			mietfSymbol : {
				title : 'Cash'
			},
			mietfPercent : {
				title : rs.fieldByName('PercentNum') + '%'
			},
			rowbottom : {},
			"jctFacetETFId" : rs.fieldByName('jctFacetETFId'),
			"facetTickerSymbol" : rs.fieldByName('facetTickerSymbol'),
			"facetName" : rs.fieldByName('facetName'),
			"PercentNum" : rs.fieldByName('PercentNum'),
			"facetQty" : rs.fieldByName('facetQty') == null ? 0.00 : rs.fieldByName('facetQty'),
			"ETFVersionId" : rs.fieldByName('ETFVersionId'), 
			parent : facetName
		});

		rs.next();
	}
	//}
	var rs = db.execute('SELECT facetTickerSymbol, facetName, PercentNum, jctFacetETFId, facetQty, sortNum, jctFacetETFId, ETFVersionId FROM ' + 
						'(SELECT b.facetTickerSymbol facetTickerSymbol, b.facetName facetName, a.PercentNum, a.jctFacetETFId, a.facetQty facetQty, a.sortNum, a.facetId, 0 ETFVersionId ' + 
						' from jctFacetETF a ' + ' join facet b on (a.facetId = b.facetId AND b.facetId NOT IN (SELECT facetId from facet where facet_code=?)) ' + ' where a.ETFVersionId= ? ' + 
						' UNION ' + 
						' SELECT \'MiETF\' facetTickerSymbol, c.MiETFName facetName, a.PercentNum, a.jctFacetETFId, a.facetQty facetQty, a.sortNum, a.facetId, d.ETFVersionId ' + 
						' from jctFacetETF a ' + ' join ETFVersion d on (a.etfAsFacetId = d.ETFVersionId ) ' + ' join ETF c on (d.ETFId = c.ETFId) ' + ' where a.ETFVersionId= ? )' + 
						' ORDER by sortNum, facetId asc', 'CASH', ETFVersionId, ETFVersionId);

	while (rs.isValidRow()) {
		if(rs.fieldByName('ETFVersionId')){
		   mietfsArray = mietfsArray.concat(getMietfComponentsChartResursive(rs.fieldByName('ETFVersionId'), rs.fieldByName('facetName')));
		}else{
			mietfsArray.push({
				mietfSymbol : {
					title : rs.fieldByName('facetName')
				},
				mietfPercent : {
					title : rs.fieldByName('PercentNum') + '%'
				},
				rowbottom : {},
				"jctFacetETFId" : rs.fieldByName('jctFacetETFId'),
				"facetTickerSymbol" : rs.fieldByName('facetTickerSymbol'),
				"facetName" : rs.fieldByName('facetName'),
				"PercentNum" : rs.fieldByName('PercentNum'),
				"facetQty" : rs.fieldByName('facetQty') == null ? 0.00 : rs.fieldByName('facetQty'),
				"ETFVersionId" : rs.fieldByName('ETFVersionId'),
				parent : facetName
			});
		}
		//mietfListData.push({mietfSymbol: { title : 'Foreign Growth v.0'}, mietfPercent: { title : '50%'}, rowbottom: {}} );

		rs.next();
	}

	db.close();

	return mietfsArray;
};

function getMietfComponents(ETFVersionId) {

	var db = Ti.Database.open('cloud');
	var mietfsArray = new Array();

	//first column is always Cash

	var rs = db.execute('SELECT b.facetTickerSymbol, b.facetName, ifnull(a.PercentNum, 0) PercentNum, ifnull(a.jctFacetETFId,0) jctFacetETFId ' + ' from facet b ' + ' left join jctFacetETF a on (a.facetId = b.facetId AND a.ETFVersionId=?) ' + ' WHERE b.facetId in (SELECT facetId from facet where facet_code=?) ORDER by a.sortNum, a.facetId asc', ETFVersionId, 'CASH');

	while (rs.isValidRow()) {
		mietfsArray.push({
			"jctFacetETFId" : rs.fieldByName('jctFacetETFId'),
			"facetTickerSymbol" : rs.fieldByName('facetTickerSymbol'),
			"facetName" : rs.fieldByName('facetName'),
			"PercentNum" : rs.fieldByName('PercentNum')
		});
		rs.next();
	}

	var rs = db.execute('SELECT facetTickerSymbol, facetName, PercentNum, jctFacetETFId, facetQty, sortNum, jctFacetETFId FROM ' + '(SELECT b.facetTickerSymbol facetTickerSymbol, b.facetName facetName, a.PercentNum, a.jctFacetETFId, a.facetQty facetQty, a.sortNum, a.facetId ' + ' from jctFacetETF a ' + ' join facet b on (a.facetId = b.facetId AND b.facetId NOT IN (SELECT facetId from facet where facet_code=?)) ' + ' where a.ETFVersionId= ? ' + ' UNION ' + ' SELECT \'MiETF\' facetTickerSymbol, c.MiETFName facetName, a.PercentNum, a.jctFacetETFId, a.facetQty facetQty, a.sortNum, a.facetId ' + ' from jctFacetETF a ' + ' join ETFVersion d on (a.etfAsFacetId = d.ETFVersionId ) ' + ' join ETF c on (d.ETFId = c.ETFId) ' + ' where a.ETFVersionId= ? )' + ' ORDER by sortNum, facetId asc', 'CASH', ETFVersionId, ETFVersionId);

	while (rs.isValidRow()) {
		mietfsArray.push({
			"jctFacetETFId" : rs.fieldByName('jctFacetETFId'),
			"facetTickerSymbol" : rs.fieldByName('facetTickerSymbol'),
			"facetName" : rs.fieldByName('facetName'),
			"PercentNum" : rs.fieldByName('PercentNum')
		});
		rs.next();
	}

	db.close();

	return mietfsArray;
};

function formatDate(date) {
	var d = new Date(date),
	    month = '' + (d.getMonth() + 1),
	    day = '' + d.getDate(),
	    year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	return [year, month, day].join('-');
}

function getLastInsertDateByIndex(Ticker) {

	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT MAX(a.closeDate) closeDate ' + ' FROM marketIndexData a  ' + ' WHERE a.Ticker=? ', Ticker);

	while (rs.isValidRow()) {
		var closeDate = rs.fieldByName('closeDate');
		rs.next();
	}
	db.close();
	return closeDate;

}

function getLastInsertDateByTicker(ticker) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT MAX(a.closeDate) closeDate ' + ' FROM stockData a  ' + ' WHERE a.Ticker=? ', ticker);

	while (rs.isValidRow()) {
		var closeDate = rs.fieldByName('closeDate');
		rs.next();
	}
	db.close();
	return closeDate;

}

function getMietfNameById(mietfId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT MiETFName MiETFName ' + ' FROM ETF a  ' + ' WHERE a.ETFId=? ', mietfId);

	while (rs.isValidRow()) {
		var MiETFName = toTitleCase(rs.fieldByName('MiETFName'));
		rs.next();
	}
	db.close();
	return MiETFName;
	//rs = db.execute('CREATE TABLE ETF (ETFId INTEGER PRIMARY KEY AUTOINCREMENT, portfolioId INTEGER, MiETFName TEXT, iconImg TEXT)');

}

function getStockPriceByDate(facetTickerSymbol, closeDate) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT Close Close ' + ' FROM stockData a  ' + ' WHERE a.Ticker=? AND closeDate=DATE(?)', facetTickerSymbol, closeDate);

	while (rs.isValidRow()) {
		var Close = rs.fieldByName('Close');
		rs.next();
	}
	db.close();
	return Close;

}

function getMietfComponentCountById(ETFVersionId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT  COUNT(b.jctFacetETFId) CNT ' + ' from ETF a join ETFVersion e on (a.ETFId = e.ETFid) ' + ' join jctFacetETF b on (e.ETFVersionId = b.ETFVersionId) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join facetType d on (c.facetTypeId = d.facetTypeId) ' + ' where e.ETFVersionId=? and d.facetTypeId in (1,2) ', ETFVersionId);

	while (rs.isValidRow()) {
		var rowCnt = rs.fieldByName('CNT');
		rs.next();
	}

	db.close();
	return rowCnt;
	//rs = db.execute('CREATE TABLE ETF (ETFId INTEGER PRIMARY KEY AUTOINCREMENT, portfolioId INTEGER, MiETFName TEXT, iconImg TEXT)');

}

function getMietfNameByVersionId(ETFVersionId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('select MiETFName from ETFVersion v join  ETF e on e.ETFId=v.ETFId where v.ETFVersionId=? ', ETFVersionId);

	while (rs.isValidRow()) {
		return rs.fieldByName('MiETFName');
		rs.next();
	}

	db.close();
	return "";
}

function sqlDateToNative(dateStr) {
	var t = dateStr.split("-");
	var date = new Date(t[0], t[1] - 1, t[2], 0, 0, 0, 0);
	return date;
};

function sqlDateToNextDay(dateStr) {
	var t = dateStr.split("-");
	var date = new Date(t[0], t[1] - 1, t[2], 0, 0, 0, 0);
	var tomorrow = date;
	tomorrow.setDate(tomorrow.getDate() + 1);

	var returnDate = nativeDateToSql(tomorrow);
	return returnDate;
};

function nativeDateToSql(date) {
	var d = new Date(date),
	    month = '' + (d.getMonth() + 1),
	    day = '' + d.getDate(),
	    year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	return [year, month, day].join('-');
};

function TempGetIndexDataById(indexId, dateRange) {

	var startDate = getStartDateForDateRange(dateRange);
	var todayDate = formatDate(new Date());

	var db = Ti.Database.open('cloud');

	var mietfData = new Array();

	if (dateRange == '2year' || dateRange == '5year') {

		var rs = db.execute('SELECT ' + ' strftime(\'%W\', a.closeDate) WeekNumber, ' + ' strftime(\'%Y\', a.closeDate) as Year, ' + ' min(a.closeDate) closeDate, avg(a.Close) value, min(b.marketShortName) ' + ' FROM marketIndexData a JOIN marketIndex b on (a.Ticker = b.marketShortName) ' + ' WHERE b.marketIndexId=? ' + ' and a.closeDate >= DATE(?) and a.closeDate <= DATE(?) ' + ' GROUP BY WeekNumber, Year ' + ' ORDER BY a.closeDate ASC', indexId, startDate, todayDate);

	} else {
		if (dateRange == '10year') {
			var rs = db.execute('SELECT ' + ' strftime(\'%m\', a.closeDate) as Month, ' + ' strftime(\'%Y\', a.closeDate) as Year, ' + ' min(a.closeDate) closeDate, avg(a.Close) value, min(b.marketShortName) ' + ' FROM marketIndexData a JOIN marketIndex b on (a.Ticker = b.marketShortName) ' + ' WHERE b.marketIndexId=? ' + ' and a.closeDate >= DATE(?) and a.closeDate <= DATE(?) ' + ' GROUP BY Month, Year ' + ' ORDER BY a.closeDate ASC', indexId, startDate, todayDate);

		} else if (dateRange == '6month' || dateRange == '1year'){
			//all others - which is 6month and 1 year
			var rs = db.execute('SELECT a.closeDate, a.Close value, b.marketShortName ' + ' FROM marketIndexData a JOIN marketIndex b on (a.Ticker = b.marketShortName) ' + ' WHERE b.marketIndexId=? ' + ' and a.closeDate >= DATE(?) and a.closeDate <= DATE(?) ' + ' ORDER BY a.closeDate ASC', indexId, startDate, todayDate);
		}else{
			Ti.API.info('TempGetIndexDataById ' +dateRange);
			var rs = db.execute('SELECT ' + ' strftime(\'%W\', a.closeDate) WeekNumber, ' + ' strftime(\'%Y\', a.closeDate) as Year, ' + ' min(a.closeDate) closeDate, avg(a.Close) value, min(b.marketShortName) ' + ' FROM marketIndexData a JOIN marketIndex b on (a.Ticker = b.marketShortName) ' + ' WHERE b.marketIndexId=? ' + ' and a.closeDate >= DATE(?) and a.closeDate <= DATE(?) ' + ' GROUP BY WeekNumber, Year ' + ' ORDER BY a.closeDate ASC', indexId, startDate, todayDate);
		}
	}

	var rows = 0;

	while (rs.isValidRow()) {
		if (rows == 0) {
			var firstRowValue = rs.fieldByName('value');
			rows = 1;
		}
		mietfData.push([0, rs.fieldByName('value'), firstRowValue]);
		rs.next();
	}

	db.close();

	return mietfData;
};

/*function TempGetMietfPreviousById(mietfID, dateRange) {

	var startDate = getStartDateForDateRange(dateRange);
	var todayDate = formatDate(new Date());

	var db = Ti.Database.open('cloud');
	var mietfData = new Array();

	return mietfData;
	//this is not going to do anything right now.....in progress changes

	var rs = db.execute('SELECT  COUNT(b.jctFacetETFId) CNT ' + ' from ETF a join jctFacetETFRevision b on (a.ETFId = b.ETFid) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join facetType d on (c.facetTypeId = d.facetTypeId) ' + ' where a.ETFId=? and d.facetTypeId in (1,2) ', mietfID);

	while (rs.isValidRow()) {
		var rowCnt = rs.fieldByName('CNT');
		rs.next();
	}

	if (dateRange == '2year' || dateRange == '5year') {

		var rs = db.execute('SELECT ' + ' strftime(\'%W\', closeDate) WeekNumber, ' + ' strftime(\'%Y\', closeDate) as Year, ' + ' min(closeDate) closeDate, avg(value) value FROM ' + ' (SELECT  d.closeDate closeDate, ' + ' (SUM((d.Close * b.facetQty)) + ifnull(e.facetQty,0)) value, COUNT(d.Ticker) CNT ' + ' from ETF a join jctFacetETFRevision b on (a.ETFId = b.ETFid) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join stockData d on (c.facetTickerSymbol = d.Ticker) ' + ' left join jctFacetETFRevision e on (a.ETFId = e.ETFId AND e.facetId = (SELECT facetId from facet where facet_code=?)) ' + //this is cash
		' where a.ETFId=? and d.closeDate >= DATE(?) and d.closeDate <= DATE(?)' + ' GROUP BY d.closeDate ' + ' HAVING COUNT(d.Ticker) = ? ) ' + ' GROUP BY WeekNumber, Year ' + ' ORDER BY closeDate ASC', 'CASH', mietfID, startDate, todayDate, rowCnt);

	} else {
		if (dateRange == '10year') {
			var rs = db.execute('SELECT ' + ' strftime(\'%m\', closeDate) as Month, ' + ' strftime(\'%Y\', closeDate) as Year, ' + ' min(closeDate) closeDate, avg(value) value FROM ' + ' (SELECT  d.closeDate closeDate, ' + ' (SUM((d.Close * b.facetQty)) + ifnull(e.facetQty,0)) value, COUNT(d.Ticker) CNT ' + ' from ETF a join jctFacetETFRevision b on (a.ETFId = b.ETFid) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join stockData d on (c.facetTickerSymbol = d.Ticker) ' + ' left join jctFacetETFRevision e on (a.ETFId = e.ETFId AND e.facetId = (SELECT facetId from facet where facet_code=?)) ' + //this is cash
			' where a.ETFId=? and d.closeDate >= DATE(?) and d.closeDate <= DATE(?)' + ' GROUP BY d.closeDate ' + ' HAVING COUNT(d.Ticker) = ? ) ' + ' GROUP BY Month, Year ' + ' ORDER BY closeDate ASC', 'CASH', mietfID, startDate, todayDate, rowCnt);

		} else {//all others 6month, 1year
			var rs = db.execute('SELECT  d.closeDate, (SUM((d.Close * b.facetQty)) + ifnull(e.facetQty,0)) value, COUNT(d.Ticker) CNT ' + ' from ETF a join jctFacetETFRevision b on (a.ETFId = b.ETFid) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join stockData d on (c.facetTickerSymbol = d.Ticker) ' + ' left join jctFacetETFRevision e on (a.ETFId = e.ETFId AND e.facetId = (SELECT facetId from facet where facet_code=?)) ' + //this is cash
			' where a.ETFId=? and d.closeDate >= DATE(?) and d.closeDate <= DATE(?)' + ' GROUP BY d.closeDate ' + ' HAVING COUNT(d.Ticker) = ? ' + ' ORDER BY d.closeDate ASC', 'CASH', mietfID, startDate, todayDate, rowCnt);

		}

	}

	var rows = 0;

	while (rs.isValidRow()) {
		if (rows == 0) {
			var firstRowValue = rs.fieldByName('value');
			rows = 1;
		}

		mietfData.push([0, rs.fieldByName('value'), firstRowValue]);

		rs.next();
	}

	db.close();

	return mietfData;
};*/
/*
 function TempGetMietfDataById(mietfID, dateRange) {

 //6 months is daily
 //1 year to 5 year is weekly
 //10 year is monthly

 var startDate=getStartDateForDateRange(dateRange);
 var todayDate = formatDate(new Date());

 var db = Ti.Database.open('cloud');
 var mietfData = new Array();

 var rs = db.execute('SELECT  COUNT(b.jctFacetETFId) CNT ' +
 ' from ETF a join jctFacetETF b on (a.ETFId = b.ETFid) ' +
 ' join facet c on (b.facetId = c.facetId) ' +
 ' join facetType d on (c.facetTypeId = d.facetTypeId) ' +
 ' where a.ETFId=? and d.facetTypeId in (1,2) ', mietfID);

 while (rs.isValidRow()) {
 var rowCnt = rs.fieldByName('CNT');
 rs.next();
 }

 if (dateRange == '2year' || dateRange == '5year') {

 var rs = db.execute('SELECT ' +
 ' strftime(\'%W\', closeDate) WeekNumber, ' +
 ' strftime(\'%Y\', closeDate) as Year, ' +
 ' min(closeDate) closeDate, avg(value) value FROM ' +
 ' (SELECT  d.closeDate closeDate, ' +
 ' (SUM((d.Close * b.facetQty)) + ifnull(e.facetQty,0)) value, COUNT(d.Ticker) CNT ' +
 ' from ETF a join jctFacetETF b on (a.ETFId = b.ETFid) ' +
 ' join facet c on (b.facetId = c.facetId) ' +
 ' join stockData d on (c.facetTickerSymbol = d.Ticker) ' +
 ' left join jctFacetETF e on (a.ETFId = e.ETFId AND e.facetId = (SELECT facetId from facet where facet_code=?)) ' + //this is cash
 ' where a.ETFId=? and d.closeDate >= DATE(?) and d.closeDate <= DATE(?)' +
 ' GROUP BY d.closeDate ' +
 ' HAVING COUNT(d.Ticker) = ? ) ' +
 ' GROUP BY WeekNumber, Year ' +
 ' ORDER BY closeDate ASC', 'CASH', mietfID, startDate, todayDate, rowCnt);

 } else {
 if (dateRange == '10year') {
 var rs = db.execute('SELECT ' +
 ' strftime(\'%m\', closeDate) as Month, ' +
 ' strftime(\'%Y\', closeDate) as Year, ' +
 ' min(closeDate) closeDate, avg(value) value FROM ' +
 ' (SELECT  d.closeDate closeDate, ' +
 ' (SUM((d.Close * b.facetQty)) + ifnull(e.facetQty,0)) value, COUNT(d.Ticker) CNT ' +
 ' from ETF a join jctFacetETF b on (a.ETFId = b.ETFid) ' +
 ' join facet c on (b.facetId = c.facetId) ' +
 ' join stockData d on (c.facetTickerSymbol = d.Ticker) ' +
 ' left join jctFacetETF e on (a.ETFId = e.ETFId AND e.facetId = (SELECT facetId from facet where facet_code=?)) ' + //this is cash
 ' where a.ETFId=? and d.closeDate >= DATE(?) and d.closeDate <= DATE(?)' +
 ' GROUP BY d.closeDate ' +
 ' HAVING COUNT(d.Ticker) = ? ) ' +
 ' GROUP BY Month, Year ' +
 ' ORDER BY closeDate ASC', 'CASH', mietfID, startDate, todayDate, rowCnt);

 } else { //all others 6month, 1year
 var rs = db.execute('SELECT  d.closeDate, (SUM((d.Close * b.facetQty)) + ifnull(e.facetQty,0)) value, COUNT(d.Ticker) CNT ' +
 ' from ETF a join jctFacetETF b on (a.ETFId = b.ETFid) ' +
 ' join facet c on (b.facetId = c.facetId) ' +
 ' join stockData d on (c.facetTickerSymbol = d.Ticker) ' +
 ' left join jctFacetETF e on (a.ETFId = e.ETFId AND e.facetId = (SELECT facetId from facet where facet_code=?)) ' + //this is cash
 ' where a.ETFId=? and d.closeDate >= DATE(?) and d.closeDate <= DATE(?)' +
 ' GROUP BY d.closeDate ' +
 ' HAVING COUNT(d.Ticker) = ? ' +
 ' ORDER BY d.closeDate ASC', 'CASH', mietfID, startDate, todayDate, rowCnt);

 }

 }

 var rows=0;

 while (rs.isValidRow()) {
 if (rows ==0) {
 var firstRowValue = rs.fieldByName('value');
 var firstRowDate = rs.fieldByName('closeDate');
 //alert('firstRowValue: ' + firstRowValue + ', firstRowDate: ' + firstRowDate);
 rows=1;
 }
 var lastRowValue= rs.fieldByName('value');
 var lastRowDate = rs.fieldByName('closeDate');

 mietfData.push([0, rs.fieldByName('value'), firstRowValue]);

 rs.next();
 }

 db.close();

 //alert('lastRowValue: ' + lastRowValue + ', lastRowDate: ' + lastRowDate);

 Ti.App.fireEvent('updateTelemetry', {ETFVersionId: ETFVersionId, dateRange: dateRange, firstRowValue: firstRowValue, firstRowDate: firstRowDate, lastRowValue: lastRowValue, lastRowDate: lastRowDate});

 return mietfData;
 };

 */
function deleteOlderVersions(ETFVersionId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT VersionNum, ETFId FROM ETFVersion WHERE ETFVersionId=? ', ETFVersionId);

	while (rs.isValidRow()) {
		var VersionNum = rs.fieldByName('VersionNum');
		var ETFId = rs.fieldByName('ETFId');
		rs.next();
	}

	db.execute('DELETE FROM ETFVersion where ETFId=? and VersionNum < ?', ETFId, VersionNum);
	db.close();

};

function deleteFacet(jctFacetETFId) {//deleteFacet(e.source.jctFacetETFId);
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT PercentNum, ETFVersionId FROM jctFacetETF WHERE jctFacetETFId=?', jctFacetETFId);

	while (rs.isValidRow()) {
		var PercentNum = rs.fieldByName('PercentNum');
		var ETFVersionId = rs.fieldByName('ETFVersionId');
		rs.next();
	}

	db.execute('DELETE FROM jctFacetETF where jctFacetETFId=?', jctFacetETFId);

	//get cashFacetId
	var rs = db.execute('SELECT facetId from facet where facet_code=?', 'CASH');

	while (rs.isValidRow()) {
		var cashFacetId = rs.fieldByName('facetId');
		rs.next();
	}

	//see if cash exists
	var rs = db.execute('SELECT PercentNum, jctFacetETFId from jctFacetETF WHERE facetId=? AND ETFVersionId = ?', cashFacetId, ETFVersionId);
	var cashFacetPercentNum = 0;
	var cashJctFacetETFId = 0;

	while (rs.isValidRow()) {
		cashFacetPercentNum = rs.fieldByName('PercentNum');
		cashJctFacetETFId = rs.fieldByName('jctFacetETFId');
		rs.next();
	}

	if (cashFacetPercentNum) {
		var newCashPercentNum = cashFacetPercentNum + PercentNum;
		db.execute('UPDATE jctFacetETF SET PercentNum = ? WHERE jctFacetETFId = ?', newCashPercentNum, cashJctFacetETFId);

	} else {

		var rs = db.execute('SELECT MAX(sortNum) sortNum from jctFacetETF where ETFVersionId=?', ETFVersionId);

		while (rs.isValidRow()) {
			var sortNum = rs.fieldByName('sortNum');
			rs.next();
		}

		db.execute('INSERT INTO jctFacetETF (ETFVersionId, facetId, facetQty, sortNum, PercentNum) VALUES (?, ?, ?, ?, ?)', ETFVersionId, cashFacetId, (PercentNum * 100), sortNum + 1, PercentNum);

	}

	db.close();

};

function getStrategyByETFVersionId(ETFVersionId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT strategyId FROM ETFVersion WHERE ETFVersionId=?', ETFVersionId);

	while (rs.isValidRow()) {
		var strategyId = rs.fieldByName('strategyId');
		rs.next();
	}

	db.close();

	return strategyId;
}

function saveStrategyByETFVersionId(ETFVersionId, strategyId) {
	var db = Ti.Database.open('cloud');

	db.execute('UPDATE ETFVersion set strategyId=? WHERE ETFVersionId=?', strategyId, ETFVersionId);

	db.close();

}

function getETFVersionId(ETFId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT MAX(ETFVersionId) ETFVersionId FROM ETFVersion WHERE ETFId=? AND DeletedFlag = 0', ETFId);

	while (rs.isValidRow()) {
		var ETFVersionId = rs.fieldByName('ETFVersionId');
		rs.next();
	}

	db.close();

	if (ETFVersionId)
		return ETFVersionId;
	return 0;

};

function getMiETFData(MiETF, dateRange) {
	MiETF = 'AZN';
	//1. get interval for this date range
	var interval = 'daily';
	var startDate = formatDate(new Date() - 90);
	var todayDate = formatDate(new Date());
	var stockData = new Array();
	var rows = 0;

	switch(dateRange) {
	case '2year':
		interval = 'weekly';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '5year':
		interval = 'weekly';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '10year':
		interval = 'monthly';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '6month':
		interval = 'daily';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '1year':
		interval = 'daily';
		startDate = getStartDateForDateRange(dateRange);
		break;
	default:
	   if(dateRange.search('year')>0){
		    interval = 'weekly';
		    startDate = getStartDateForDateRange(dateRange);
	   }else{
			var res = dateRange.split("|");
			interval = res[0];
			startDate = res[1];
			todayDate = res[2];
	   }
	}

	//build query based on the date range
	var db = Ti.Database.open('cloud');

	if (interval == 'weekly') {

		rs = db.execute(' SELECT  ' + ' strftime(\'%W\', closeDate) as WeekNumber,   ' + ' strftime(\'%Y\', closeDate) as Year,   ' + ' min(closeDate) closeDate, avg(Close) AvgClose  ' + ' FROM (  ' + ' SELECT Close Close, closeDate from stockData where Ticker = ?   ' + ' and closeDate >= DATE(?)   ' + ' and closeDate <= DATE(?)  ' + ' order by closeDate ASC )  ' + ' GROUP BY WeekNumber, Year  ' + ' ORDER BY closeDate ASC', ticker, startDate, todayDate);

	} else {
		if (interval == 'monthly') {
			rs = db.execute(' SELECT  ' + ' strftime(\'%m\', closeDate) as Month,   ' + ' strftime(\'%Y\', closeDate) as Year,   ' + ' min(closeDate) closeDate, avg(Close) AvgClose  ' + ' FROM (  ' + ' SELECT Close Close, closeDate from stockData where Ticker = ?   ' + ' and closeDate >= DATE(?)   ' + ' and closeDate <= DATE(?)  ' + ' order by closeDate ASC )  ' + ' GROUP BY Month, Year  ' + ' ORDER BY closeDate ASC', ticker, startDate, todayDate);

		} else {//defaults to daily interval

			rs = db.execute('SELECT Close AvgClose, closeDate ' + ' from stockData where Ticker = ? ' + ' and closeDate >= DATE(?) and closeDate <=DATE(?) ' + ' order by closeDate ASC ', ticker, startDate, todayDate);
		}
	}
	//build
	while (rs.isValidRow()) {

		if (rows == 0) {
			var firstValue = rs.fieldByName('AvgClose');
			//useless first row
			var firstRowDate = rs.fieldByName('closeDate');
			var highValue = firstValue;
			var lowValue = firstValue;
			rows = 1;
		}

		if (rs.fieldByName('AvgClose') > highValue)
			highValue = rs.fieldByName('AvgClose');
		if (rs.fieldByName('AvgClose') < lowValue)
			lowValue = rs.fieldByName('AvgClose');

		stockData.push([firstRowDate, rs.fieldByName('AvgClose')]);

		rs.next();
	}

	var highPointPercentage = (highValue / firstValue * 100) - 100;
	var lowPointPercentage = (lowValue / firstValue * 100) - 100;

	db.close();

	return {
		stockData : stockData,
		highPointPercentage : highPointPercentage,
		lowPointPercentage : lowPointPercentage
	};
}

function getStockData(ticker, dateRange) {

	//1. get interval for this date range
	var interval = 'daily';
	var startDate = formatDate(new Date() - 90);
	var todayDate = formatDate(new Date());
	var stockData = new Array();
	var rows = 0;

	switch(dateRange) {
	case '2year':
		interval = 'weekly';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '5year':
		interval = 'weekly';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '10year':
		interval = 'monthly';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '6month':
		interval = 'daily';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '1year':
		interval = 'daily';
		startDate = getStartDateForDateRange(dateRange);
		break;
	default:
	   if(dateRange.search('year')>0){
		    interval = 'weekly';
		    startDate = getStartDateForDateRange(dateRange);
	   }else{
			var res = dateRange.split("|");
			interval = res[0];
			startDate = res[1];
			todayDate = res[2];
	   }
	}

	//build query based on the date range
	var db = Ti.Database.open('cloud');

	if (interval == 'weekly') {

		rs = db.execute(' SELECT  ' + ' strftime(\'%W\', closeDate) as WeekNumber,   ' + ' strftime(\'%Y\', closeDate) as Year,   ' + ' min(closeDate) closeDate, avg(Close) AvgClose  ' + ' FROM (  ' + ' SELECT Close Close, closeDate from stockData where Ticker = ?   ' + ' and closeDate >= DATE(?)   ' + ' and closeDate <= DATE(?)  ' + ' order by closeDate ASC )  ' + ' GROUP BY WeekNumber, Year  ' + ' ORDER BY closeDate ASC', ticker, startDate, todayDate);

	} else {
		if (interval == 'monthly') {
			rs = db.execute(' SELECT  ' + ' strftime(\'%m\', closeDate) as Month,   ' + ' strftime(\'%Y\', closeDate) as Year,   ' + ' min(closeDate) closeDate, avg(Close) AvgClose  ' + ' FROM (  ' + ' SELECT Close Close, closeDate from stockData where Ticker = ?   ' + ' and closeDate >= DATE(?)   ' + ' and closeDate <= DATE(?)  ' + ' order by closeDate ASC )  ' + ' GROUP BY Month, Year  ' + ' ORDER BY closeDate ASC', ticker, startDate, todayDate);

		} else {//defaults to daily interval

			rs = db.execute('SELECT Close AvgClose, closeDate ' + ' from stockData where Ticker = ? ' + ' and closeDate >= DATE(?) and closeDate <=DATE(?) ' + ' order by closeDate ASC ', ticker, startDate, todayDate);
		}
	}
	//build
	while (rs.isValidRow()) {

		if (rows == 0) {
			var firstValue = rs.fieldByName('AvgClose');
			//useless first row
			var firstRowDate = rs.fieldByName('closeDate');
			var highValue = firstValue;
			var lowValue = firstValue;
			rows = rows + 1;
		}

		if (rows == 1) {
			var secondRowDate = rs.fieldByName('closeDate');
			rows = rows + 1;
		}

		if (rs.fieldByName('AvgClose') > highValue)
			highValue = rs.fieldByName('AvgClose');
		if (rs.fieldByName('AvgClose') < lowValue)
			lowValue = rs.fieldByName('AvgClose');

		stockData.push([firstRowDate, rs.fieldByName('AvgClose')]);

		rs.next();
	}

	var highPointPercentage = (highValue / firstValue * 100) - 100;
	var lowPointPercentage = (lowValue / firstValue * 100) - 100;

	db.close();

	return {
		stockData : stockData,
		highPointPercentage : highPointPercentage,
		lowPointPercentage : lowPointPercentage
	};
}

function getUSDExchangeRates() {
	var db = Ti.Database.open('cloud');
	var exchangeRates = new Array();

	rs = db.execute('SELECT symbol, currencyName, currencyValue from USDExchangeRate order by symbol');
	while (rs.isValidRow()) {
		exchangeRates.push({
			rowSymbol : {
				image : 'images/ifapps/flags/' + rs.fieldByName('symbol') + '.png'
			},
			rowCurrency : {
				title : rs.fieldByName('currencyName')
			},
			rowValue : {
				title : rs.fieldByName('currencyValue') + ' ' + rs.fieldByName('symbol')
			}
		});
		rs.next();
	}
	db.close();

	//exchangeRates.push({rowSymbol: {opacity: 0 }, rowCurrency: {title : ''}, rowValue: { title : ''}});

	return exchangeRates;
}

var dividend = require('services/dividend');


function getGraphData(ETFVersionId, dateRange) {
	Ti.API.info('getGraphData dateRange '+dateRange);
	var abort = false;
	if (!ETFVersionId > 0)
		abort = true;
	if (abort)
		return;

	//1. get interval for this date range
	var interval = 'daily';
	var startDate = formatDate(new Date() - 90);
	var todayDate = formatDate(new Date());
	var mietfData = new Array();

	switch(dateRange) {
		case '2year':
			interval = 'weekly';
			startDate = getStartDateForDateRange(dateRange);
			break;
		case '5year':
			interval = 'weekly';
			startDate = getStartDateForDateRange(dateRange);
			break;
		case '10year':
			interval = 'monthly';
			startDate = getStartDateForDateRange(dateRange);
			break;
		case '6month':
			interval = 'daily';
			startDate = getStartDateForDateRange(dateRange);
			break;
		case '1year':
			interval = 'daily';
			startDate = getStartDateForDateRange(dateRange);
			break;
		default:
		    if(dateRange.search('year')>0){
		    	interval = 'weekly';
		    	startDate = getStartDateForDateRange(dateRange);
		    	Ti.API.info('startDate '+startDate);
		    }else{
			  var res = dateRange.split("|");
			  interval = res[0];
			  startDate = res[1];
			  todayDate = res[2];
			}
	}

	//2. update Formulations for this dateRange

	//query to get list of mietfId's ....

	var ETFList = new Array();

	var db = Ti.Database.open('cloud');

	rs = db.execute(' SELECT ETFId from ETFVersion WHERE ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var tempETFId = rs.fieldByName('ETFId');
		rs.next();
	}

	db.execute('DELETE from jctETFVersionToETF where parentETFVersionId = ?', ETFVersionId);
	//first for this MiETF
	rs = db.execute('WITH RECURSIVE ' + 'is_in_etf_version(n) AS (  ' + 'VALUES(?)  ' + 'UNION ALL  ' + 'SELECT etfAsFacetId FROM jctFacetETF a ' + ' JOIN  ETFVersion b ON (a.ETFVersionId = b.ETFVersionId) ' + ' JOIN is_in_etf_version c ON (b.ETFVersionId = c.n) ' + ')  ' + 'SELECT	DISTINCT a.ETFId ' + 'from ETF a  ' + ' join ETFVersion b on (a.ETFId = b.ETFId ) ' + ' join jctFacetETF c on (b.ETFVersionId = c.ETFVersionId)  ' + ' join is_in_etf_version g on (g.n = b.ETFVersionId)  ', ETFVersionId);

	while (rs.isValidRow()) {

		var ETFId = rs.fieldByName('ETFId');
		ETFList.push(ETFId);
		db.execute('INSERT INTO jctETFVersionToETF (parentETFVersionId, childETFId, parentETFId) VALUES (?,?, ?)', ETFVersionId, ETFId, tempETFId);
		rs.next();
	}

	//and again for Comparisons

	var outerRs = db.execute('SELECT ETFid from jctMiETFETF where MiETFId in (SELECT ETFId from ETFVersion where ETFVersionId = ?)', ETFVersionId);

	while (outerRs.isValidRow()) {
		var tETFId = outerRs.fieldByName('ETFid');

		var newRS = db.execute('SELECT ETFVersionId from ETFVersion WHERE ' + ' VersionNum = (SELECT MAX(VersionNum) FROM ETFVersion WHERE ETFId = ?) ' + ' AND ETFId = ?', tETFId, tETFId);

		while (newRS.isValidRow()) {
			var tETFVersionId = newRS.fieldByName('ETFVersionId');
			newRS.next();
		}

		rs = db.execute('WITH RECURSIVE ' + 'is_in_etf_version(n) AS (  ' + 'VALUES(?)  ' + 'UNION ALL  ' + 'SELECT etfAsFacetId FROM jctFacetETF a ' + ' JOIN  ETFVersion b ON (a.ETFVersionId = b.ETFVersionId) ' + ' JOIN is_in_etf_version c ON (b.ETFVersionId = c.n) ' + ')  ' + 'SELECT	DISTINCT a.ETFId ' + 'from ETF a  ' + ' join ETFVersion b on (a.ETFId = b.ETFId ) ' + ' join jctFacetETF c on (b.ETFVersionId = c.ETFVersionId)  ' + ' join is_in_etf_version g on (g.n = b.ETFVersionId)  ', tETFVersionId);

		while (rs.isValidRow()) {

			var ETFId = rs.fieldByName('ETFId');
			ETFList.push(ETFId);
			rs.next();
		}
		outerRs.next();
	}

	db.close();
	var db = Ti.Database.open('cloud');

	for ( b = 0; b < ETFList.length; b++) {
		var etfId = ETFList[b];

		var rs = db.execute('SELECT ETFVersionId from ETFVersion where ETFId = ?', etfId);
		while (rs.isValidRow()) {

			var etfV = rs.fieldByName('ETFVersionId');
			updateFormulations(etfV, startDate, todayDate);
			rs.next();
		}

	}

	db.close();
	var db = Ti.Database.open('cloud');

	//construct tempETF properly
	//

	//clear tempETF
	db.execute('delete from tempETF');

	//get all comparisonETF - jctMiETFETF

	rs = db.execute('SELECT ETFid from jctMiETFETF where MiETFId in (SELECT ETFId from ETFVersion where ETFVersionId = ?)', ETFVersionId);

	var sortNum = 1;
	var tETFVersionId = 0;

	while (rs.isValidRow()) {
		var tETFId = rs.fieldByName('ETFid');

		var newRS = db.execute('SELECT ETFVersionId from ETFVersion WHERE ' + ' VersionNum = (SELECT MAX(VersionNum) FROM ETFVersion WHERE ETFId = ?) ' + ' AND ETFId = ?', tETFId, tETFId);

		while (newRS.isValidRow()) {
			tETFVersionId = newRS.fieldByName('ETFVersionId');
			newRS.next();
		}
		db.execute('INSERT INTO tempETF (ETFVersionId, level, percentNum, sortNum, etfType) ' + ' VALUES (?, 0, 100, ?, ?)', tETFVersionId, sortNum, 'COMP');
		sortNum++;
		rs.next();
	}

	//get all previous ETF, for this ETFVersionId, look up ETFId (subquery)
	//for this ETFId, GraphEnabledFlag = 1, DeletedFlag = 0, VersionNum sort

	rs = db.execute('SELECT ETFVersionId from ETFVersion WHERE  ETFId in (SELECT ETFId from ETFVersion WHERE ETFVersionId = ?) AND ETFVersionId not in (?)  ORDER BY VersionNum ASC', ETFVersionId, ETFVersionId);

	while (rs.isValidRow()) {
		var tETFVersion = rs.fieldByName('ETFVersionId');
		db.execute('INSERT INTO tempETF (ETFVersionId, level, percentNum, sortNum, etfType) ' + ' VALUES (?, 0, 100, ?, ?)', tETFVersion, sortNum, 'PREV');
		sortNum++;
		rs.next();
	}

	//this ETFVersionID
	db.execute('INSERT INTO tempETF (ETFVersionId, level, percentNum, sortNum, etfType) ' + ' VALUES (?, 0, 100, ?, ?)', ETFVersionId, sortNum, 'ETF');

	mietf.firstRowDate = startDate;
	mietf.lastRowDate = todayDate;

	getStrategyClose();

	if (tETFVersionId) {
		var compData = getGraphDataByETFVersion(tETFVersionId, interval, 'COMP');
		mietfData = compData;
		//which means accepting only 1 not any number
	}

	var etfData = getGraphDataByETFVersion(ETFVersionId, interval, 'ETF');
	mietfData = mietfData.concat(etfData);
	
	//////////////// Add Strategy Data
	if (mietf.strategyNum > 0) {
		//step 2
		var sgyData = getGraphDataByETFVersion(ETFVersionId, interval, 'SGY');

		//step 3 add the data
		mietfData = mietfData.concat(sgyData);
	}

	clearStrategyClose();
	db.close();
	//Ti.API.info('about to update Telemetry');

	//mietfData.push([firstRowDate, close, 10000000, etfType, parentVersionId]);

	
	mietf.firstRowValue = etfData[0][1];
	mietf.lastRowValue = etfData[etfData.length-1][1];
  if(mietf.viewMode==false) {
    var firstRowDate = etfData[0][0];
		Ti.App.fireEvent('updateTelemetry', {
			ETFVersionId : ETFVersionId,
			dateRange : dateRange,
			firstRowValue : mietf.firstRowValue,
			firstRowDate : firstRowDate,
			lastRowValue : mietf.lastRowValue,
			lastRowDate : mietf.lastRowDate
		});
  }
	return mietfData;
}

function getStrategyClose() {
	mietf.strategyClose = [];

	var db = Ti.Database.open('cloud');

	db.execute('CREATE TEMP TABLE STOCK_TEMP ( ' + 'STOCK_TEMP_ID	INTEGER PRIMARY KEY AUTOINCREMENT, ' + 'TICKER	TEXT, ' + 'PERCENT_NUM	NUMERIC, ' + 'CLOSE	NUMERIC ' + ') ');

	rs = db.execute('WITH RECURSIVE ' + 
					'etf_recursive (ETFVersionId, level, percentNum, parentVersionId, sortNum, etfType) AS ( ' + 
					'SELECT ETFVersionId, level, percentNum, ETFVersionId, sortNum, etfType from tempETF WHERE etfType = \'ETF\' ' + 
					'UNION ALL ' + 'SELECT a.etfAsFacetId, b.level+1, (b.percentNum*1.0/100) * a.percentNum, ' + 
					'CAST(SUBSTR(TRIM(b.parentVersionId ||\'.\' ||a.ETFVersionId, \'.\'),0, INSTR(TRIM(b.parentVersionId ||\'.\' ||a.ETFVersionId, \'.\'),\'.\')) as INTEGER), ' + 
					'b.sortNum, b.etfType ' + 
					'FROM jctFacetETF a ' + 
					'JOIN etf_recursive b on (a.ETFVersionId = b.ETFVersionId) ' + ') ' + 
					'SELECT facetTickerSymbol TICKER, SUM(perc) PERCENTNUM FROM ( ' + 
					'SELECT	g.parentVersionId, b.facetId,  ' + 
					'b.percentNum*1.0*(g.percentNum*1.0/100) perc, g.ETFVersionId, g.sortNum, g.etfType , c.facetTickerSymbol ' + 
					'from ETF a ' + 
					'join ETFVersion e on (a.ETFId = e.ETFid) ' + 
					'join jctFacetETF b on (e.ETFVersionId = b.ETFVersionId) ' + 
					'join facet c on (b.facetId = c.facetId) ' + 
					'join etf_recursive g on (g.ETFVersionId = b.ETFVersionId) ' + 
					'GROUP BY g.parentVersionId, b.ETFVersionId , b.facetId) tab ' + 
					'GROUP BY facetTickerSymbol ' + 
					'ORDER BY facetTickerSymbol ASC ');

	//first insert into new table
	var cnt = 0;

	while (rs.isValidRow()) {
		cnt = cnt + 1;
		db.execute('INSERT INTO STOCK_TEMP (TICKER, PERCENT_NUM, CLOSE) VALUES (?,?,?) ', rs.fieldByName('TICKER'), rs.fieldByName('PERCENTNUM'), 0);
		mietf.strategyClose[rs.fieldByName('TICKER')] = new Array();
		rs.next();
	}
	
	//USE stock temp to get all closing data by ticker

	rs = db.execute('SELECT a.Ticker, a.closeDate, ' + ' avg(a.Close) Close, a.Split ' + 'FROM stockData a ' + 'JOIN STOCK_TEMP b on (a.Ticker=b.TICKER) ' + 
					'WHERE a.closeDate >= ? and a.closeDate <= ? ' + 'AND a.closeDate in (SELECT a.closeDate FROM  ' + 
					' stockData a JOIN STOCK_TEMP b on (a.Ticker=b.TICKER) ' + ' WHERE a.closeDate >= ? and a.closeDate <= ? ' + 
					' GROUP BY a.closeDate ' + ' HAVING COUNT(a.Ticker) = ? ) ' + 'GROUP BY a.closeDate, a.Ticker ' + 
					'ORDER BY a.closeDate asc ', mietf.firstRowDate, mietf.lastRowDate, mietf.firstRowDate, mietf.lastRowDate, cnt);

	
	var previousSplits = {};
	function getSplitValue(ticker, split) {
		if(ticker == "Cash") {
			return 1;
		}
		if (previousSplits[ticker] ==  undefined) {
			previousSplits[ticker] = 1;
		} else {
			var tmp = previousSplits[ticker];
			previousSplits[ticker] = previousSplits[ticker] * split; 
		}
		return previousSplits[ticker];
	}
	
	while (rs.isValidRow()) {
		//Apply split to stock value
		var closeValue = rs.field(2) * getSplitValue(rs.field(0), rs.fieldByName('Split'));
		//mietf.strategyClose[rs.field(0)].push([rs.field(1), rs.field(2)]);
		mietf.strategyClose[rs.field(0)].push([rs.field(1), closeValue]);
		rs.next();
	}

	db.close();

};

function clearStrategyClose() {
	mietf.strategyClose = [];
};

function getGraphDataByETFVersion(ETFVersionId, interval, etfType) {
	
	mietf.plainCount = 0;
	mietf.plainElapsed = 0;

	var overrideStrategy = 0;
	if (etfType == 'ETF')
		overrideStrategy = 1;
   if (mietf.strategyNum == 0 || mietf.strategyNum == 768) {
   		overrideStrategy = 0;
   }		
	var sgyData = strategy_tree_walker(ETFVersionId, overrideStrategy);

	var mietfData = new Array();

	//put data in table

	var db = Ti.Database.open('cloud');

	db.execute('CREATE TEMP TABLE stockDataTemp ( ' + 'stockDataTempId	INTEGER PRIMARY KEY AUTOINCREMENT, ' + 'Ticker	TEXT, ' + //or keyword MiETF
	'closeDate	INTEGER, ' + 'Close	NUMERIC ' + ') ');

	for (var j = 0; j < sgyData.length; j++) {
		db.execute(' insert into stockDataTemp (Ticker, closeDate, Close) ' + ' VALUES (?,?,?) ', 'SGY', sgyData[j][0], sgyData[j][1]);
	}

	rs = db.execute('SELECT ROUND(sd.Close,2) Close, sd.closeDate, sd.Ticker, tab.WeekNumber WeekNumber, tab.MonthNumber MonthNumber ' + 'FROM stockDataTemp sd ' + 'JOIN (' + 'SELECT strftime(\'%W\', a.closeDate) as WeekNumber, ' + ' strftime(\'%Y\', a.closeDate) as YearNumber,  ' + ' strftime(\'%m\', a.closeDate) as MonthNumber, ' + ' a.closeDate, ' + ' a.Ticker, avg(a.Close) Close ' + 'FROM stockDataTemp a ' + 'GROUP BY a.closeDate, a.Ticker ' + 'ORDER BY a.closeDate asc ) tab ' + 'ON (sd.Ticker=tab.Ticker AND sd.closeDate = tab.closeDate) ' + 'ORDER BY tab.closeDate asc');

	var l_week_number = '55';
	var l_month_number = '15';

	//getGraphDat
	var row = 0;

	while (rs.isValidRow()) {

		if (row == 0) {
			var firstRowDate = rs.fieldByName('closeDate');
			var parentVersionId = ETFVersionId;
			//don't know why this is being sent
			row = 1;
			mietf.firstRowValue = rs.fieldByName('Close');
			mietf.lastRowValue = rs.fieldByName('Close');
		}
		var lastRowDate = rs.fieldByName('closeDate');
		var close = rs.fieldByName('Close');

		if (interval == 'daily') {
			mietfData.push([firstRowDate, close, 10000000, etfType, parentVersionId]);
			mietf.lastRowValue = close;

		}

		if (interval == 'weekly') {
			if (rs.fieldByName('WeekNumber') != l_week_number) {
				l_week_number = rs.fieldByName('WeekNumber');
				mietfData.push([firstRowDate, close, 10000000, etfType, parentVersionId]);
				mietf.lastRowValue = close;
			}
		}

		if (interval == 'monthly') {
			if (rs.fieldByName('MonthNumber') != l_month_number) {
				l_month_number = rs.fieldByName('MonthNumber');
				mietfData.push([firstRowDate, close, 10000000, etfType, parentVersionId]);
				mietf.lastRowValue = close;
			}
		}

		rs.next();
	}

	db.close();
    Ti.API.info('sgyData ' + JSON.stringify(sgyData));
    Ti.API.info('mietfData ' + JSON.stringify(mietfData));
	return mietfData;
};

function strategy_tree_walker(ETFVersionId, overrideStrategy) {
	Ti.API.info('ETFVersionId : ' + ETFVersionId);
	var firstRowDate = mietf.firstRowDate;
	var lastRowDate = mietf.lastRowDate;
	var sgyData = new Array();

	//step 1, Get a list of components

	var db = Ti.Database.open('cloud');

	var stock = new Array();

	rs = db.execute('select b.percentNum, b.facetId, ifnull(b.etfAsFacetId, 0) etfAsFacetId, c.facetTickerSymbol Ticker, e.MiETFName from ETFVersion a join jctFacetETF b on (a.ETFVersionId = b.ETFVersionId) left join facet c on (b.facetId = c.facetId) left join ETFVersion d on (b.etfAsFacetId = d.ETFVersionId) left join etf e on (d.etfId = e.etfId) where b.ETFVersionId = ? ', ETFVersionId);

	while (rs.isValidRow()) {

		stock.push(new Object());
		var currStock = stock.length - 1;
		stock[currStock].graphData = [];
		if (rs.fieldByName('etfAsFacetId')) {//MiETF

			stock[currStock].TICKER = 'MiETF-' + rs.fieldByName('etfAsFacetId');
			stock[currStock].PERCENTNUM = rs.fieldByName('PERCENTNUM');
			stock[currStock].CLOSE = 10000;
			stock[currStock].ISMIETF = 1;
			stock[currStock].FACETQTY = (10000 * (rs.fieldByName('PERCENTNUM') / 100)) / 100 / 100;
			stock[currStock].ETFVERSIONID = rs.fieldByName('etfAsFacetId');

			//handle MiETF
		} else {//stock
			var close = 0;

			var closeRS = db.execute('SELECT  ROUND(Close, 3) Close, closeDate from stockData WHERE Ticker = ? and closeDate < ? ORDER BY closeDate DESC LIMIT 1', rs.fieldByName('TICKER'), firstRowDate);

			while (closeRS.isValidRow()) {
				close = closeRS.fieldByName('Close');
				closeRS.next();
			}

			if (close == 0) {

				var closeRS = db.execute('SELECT ROUND(Close, 3) Close, closeDate from stockData WHERE Ticker = ? and closeDate >= ? ORDER BY closeDate DESC LIMIT 1', rs.fieldByName('TICKER'), firstRowDate);

				while (closeRS.isValidRow()) {
					close = closeRS.fieldByName('Close');
					closeRS.next();
				}
			}

			stock[currStock].TICKER = rs.fieldByName('TICKER');
			stock[currStock].PERCENTNUM = rs.fieldByName('PERCENTNUM');
			stock[currStock].CLOSE = close;
			stock[currStock].ISMIETF = 0;
			stock[currStock].FACETQTY = (10000 * (rs.fieldByName('PERCENTNUM') / 100)) / close;
			stock[currStock].ETFVERSIONID = rs.fieldByName('etfAsFacetId');

		}
		rs.next();
	}

	rs.close();
	db.close();

   Ti.API.info('strategy_tree_walker stock.length '+stock.length);
	///
	var split = require('services/split');

	for (var i = 0; i < stock.length; i++) {
		if (stock[i].ISMIETF) {
			mietf.stockStack.push(stock);
			mietf.indexStack.push(i);
			stock[i].graphData = strategy_tree_walker(stock[i].ETFVERSIONID, 0);
			Ti.API.warn('strategy_tree_walker ' + stock[i].ETFVERSIONID + ' '+stock[i].graphData);
			stock = mietf.stockStack.pop();
			i = mietf.indexStack.pop();
		} else {
			var start = new Date().getTime();
			stock[i].graphData = get_plain_stock_data(stock[i].TICKER);
			stock[i].splitData = split.getPlainSplitStockData(stock[i].TICKER);
			Ti.API.warn('get_plain_stock_data ' + stock[i].TICKER +' '+ stock[i].graphData);
			Ti.API.warn(stock[i].TICKER + ' ' + stock[i].graphData.length);
			var end = new Date().getTime();
			var time = end - start;
			mietf.plainCount = mietf.plainCount + 1;
			mietf.plainElapsed = mietf.plainElapsed + time;
		}
	}
 
	var l_start_value = 10000;
	var l_current_date = '1900-01-01';
	var stockCount = 0;
	var dateNo = 3000;

	//step 2, lookup the strategy for this MiETF

	var strategyId = getStrategyByETFVersionId(ETFVersionId);
	if (overrideStrategy)
		strategyId = 0;

	var strategy = new newStrategy(strategyId);
	
	var dividend = require('services/dividend');
	
	/*
	 this.strategy
	 this.realloc =  realloc;
	 this.type = type;
	 this.period = period;
	 this.priceMove = Number(col4+1) + '%';
	 if (type == 0) this.col4Title = periodChoices[period];
	 if (type == 1) this.col4Title = Number(col4+1) + '%';
	 */
try{
	if (strategy.strategy == 3 || (strategy.strategy == 0 && strategy.type == 0)) {
		for (var i = 0; stock[0].graphData && i < stock[0].graphData.length; i++) {//all are aligned so the first one will represent the length
			
			l_start_value = 0;
			l_current_date = stock[0].graphData[i][0];
			var newDateNo = 3000;
			//never fire, no strategy
			if (strategy.strategy == 0 && strategy.period == 0)
				newDateNo = 3001;
			//always fire, daily
			if (strategy.strategy == 0 && strategy.period == 1)
				newDateNo = getWeekNumber(new Date(l_current_date));
			if (strategy.strategy == 0 && strategy.period == 2)
				newDateNo = new Date(l_current_date).getMonth();
			if (strategy.strategy == 0 && strategy.period == 3)
				newDateNo = Math.floor((new Date(l_current_date).getMonth() + 3) / 3);
			if (strategy.strategy == 0 && strategy.period == 4)
				newDateNo = new Date(l_current_date).getYear();

			for (var l_idx = 0; l_idx < stock.length; l_idx++) {//loop 1 add them all together
				l_start_value = l_start_value + ((stock[l_idx].FACETQTY * stock[l_idx].graphData[i][1]) );
			}

			//only if date period has passed
			if (dateNo != newDateNo) {
				for (var l_idx = 0; l_idx < stock.length; l_idx++) {//loop 2 adjust facetQty
					stock[l_idx].FACETQTY = (l_start_value * (stock[l_idx].PERCENTNUM / 100)) / stock[l_idx].graphData[i][1];
				}
				dateNo = newDateNo;
			}
			
			//adding total dividend sum for the last value	
			if(i== stock[0].graphData.length -1) {
				var sumDividend = dividend.getTotalSum(dividend.getPlainDataDividensForMietf(ETFVersionId));
				l_start_value = l_start_value + sumDividend;
			}
	
			sgyData.push([l_current_date, l_start_value]);
		}

	}//end 0 - 5

	if (strategy.strategy == 0 && strategy.type == 1) {
		var triggerPercent = strategy.priceTrigger;

		for (var i = 0; stock[0].graphData && i < stock[0].graphData.length; i++) {
			l_start_value = 0;
			l_current_date = stock[0].graphData[i][0];
			var rebalanceFlag = false;
			for (var l_idx = 0; l_idx < stock.length; l_idx++) {
				//getting daily value
				l_start_value = l_start_value + ((stock[l_idx].FACETQTY * stock[l_idx].graphData[i][1]));

				//check for trigger point
				if (Math.abs(100 * (((stock[l_idx].graphData[i][1]) - stock[l_idx].CLOSE) / stock[l_idx].CLOSE)) > triggerPercent) {
					rebalanceFlag = true;
				}

			}

			if (rebalanceFlag) {
				for (var l_idx = 0; l_idx < stock.length; l_idx++) {//loop 2 adjust facetQty
					stock[l_idx].FACETQTY = (l_start_value * (stock[l_idx].PERCENTNUM / 100)) / (stock[l_idx].graphData[i][1]);
					stock[l_idx].CLOSE = stock[l_idx].graphData[i][1];
				}
			}
			
			//adding total dividend sum for the last value	
			if(i== stock[0].graphData.length -1) {
				var sumDividend = dividend.getTotalSum(dividend.getPlainDataDividensForMietf(ETFVersionId));
				l_start_value = l_start_value + sumDividend;
			}

			sgyData.push([l_current_date, l_start_value]);
		}

	}//end 6 - 11
	if (strategy.strategy == 1 && strategy.type == 0) {
		var realloc = 5;
		if (strategy.realloc == 1)
			realloc = 10;

		for (var i = 0; stock[0].graphData && i < stock[0].graphData.length; i++) {
			l_start_value = 0;
			l_current_date = stock[0].graphData[i][0];
			var newDateNo = 3001;
			//always different than dateNo, this is strategy 12, daily
			if (strategy.period == 1)
				newDateNo = getWeekNumber(new Date(l_current_date));
			if (strategy.period == 2)
				newDateNo = new Date(l_current_date).getMonth();
			if (strategy.period == 3)
				newDateNo = Math.floor((new Date(l_current_date).getMonth() + 3) / 3);
			if (strategy.period == 4)
				newDateNo = new Date(l_current_date).getYear();

			for (var l_idx = 0; l_idx < stock.length; l_idx++) {//loop 1 add them all together
				l_start_value = l_start_value + ((stock[l_idx].FACETQTY * stock[l_idx].graphData[i][1]) );
				//l_start_value = l_start_value + ((stock[l_idx].FACETQTY * stock[l_idx].graphData[i][1]));
				stock[l_idx].MOVE = (100 * (( (stock[l_idx].graphData[i][1]) - stock[l_idx].CLOSE) / stock[l_idx].CLOSE));
			}

			//only if date period has passed
			if (dateNo != newDateNo) {

				//logic to tweak the winners PERCENTNUM
				//how many winners?
				var winnerCnt = Math.floor(stock.length / 2);

				//sort in order

				stock.sort(function(a, b) {
					var keyA = a.MOVE,
					    keyB = b.MOVE;
					// Compare the 2 values
					if (keyA < keyB)
						return 1;
					if (keyA > keyB)
						return -1;
					return 0;
				});

				//figure out how much PERCENTNUM you can re-distribute, might be zero
				var redistributablePercentNum = 0;

				for ( j = stock.length - 1; j > ((stock.length - 1) - winnerCnt); j--) {
					if (stock[j].PERCENTNUM >= realloc) {
						stock[j].PERCENTNUM = stock[j].PERCENTNUM - realloc;
						redistributablePercentNum = redistributablePercentNum + realloc;
					}
				}

				for ( k = 0; k < winnerCnt; k++) {
					if (redistributablePercentNum >= realloc) {
						stock[k].PERCENTNUM = stock[k].PERCENTNUM + realloc;
						redistributablePercentNum = redistributablePercentNum - realloc;
					}
				}

				for (var l_idx = 0; l_idx < stock.length; l_idx++) {//loop 2 adjust facetQty
					stock[l_idx].FACETQTY = (l_start_value * (stock[l_idx].PERCENTNUM / 100)) / stock[l_idx].graphData[i][1];
					stock[l_idx].CLOSE = stock[l_idx].graphData[i][1];
				}
				dateNo = newDateNo;
			}
			
			//adding total dividend sum for the last value	
			if(i== stock[0].graphData.length -1) {
				var sumDividend = dividend.getTotalSum(dividend.getPlainDataDividensForMietf(ETFVersionId));
				l_start_value = l_start_value + sumDividend;
			}
			
			sgyData.push([l_current_date, l_start_value]);
		}

	}//end 12 - 16

	if (strategy.strategy == 1 && strategy.type == 1) {
		var realloc = 5;
		if (strategy.realloc == 1)
			realloc = 10;
		var triggerPercent = strategy.priceTrigger;

		for (var i = 0; stock[0].graphData && i < stock[0].graphData.length; i++) {
			l_start_value = 0;
			l_current_date = stock[0].graphData[i][0];
			var rebalanceFlag = false;
			for (var l_idx = 0; l_idx < stock.length; l_idx++) {
				//getting daily value
				
				l_start_value = l_start_value + ((stock[l_idx].FACETQTY * stock[l_idx].graphData[i][1]));
				stock[l_idx].MOVE = (100 * ((stock[l_idx].graphData[i][1] - stock[l_idx].CLOSE) / stock[l_idx].CLOSE));

				//check for trigger point
				if (Math.abs(100 * ((stock[l_idx].graphData[i][1] - stock[l_idx].CLOSE) / stock[l_idx].CLOSE)) > triggerPercent) {
					rebalanceFlag = true;
					Ti.API.info('triggered on date: ' + l_current_date + ', stock:' + stock[l_idx].TICKER + ', Move:' + Math.abs(100 * ((stock[l_idx].graphData[i][1] - stock[l_idx].CLOSE) / stock[l_idx].CLOSE)));
				}

			}

			if (rebalanceFlag) {

				//logic to tweak the winners PERCENTNUM
				//how many winners?
				var winnerCnt = Math.floor(stock.length / 2);

				//sort in order

				stock.sort(function(a, b) {
					var keyA = a.MOVE,
					    keyB = b.MOVE;
					// Compare the 2 dates
					if (keyA < keyB)
						return 1;
					if (keyA > keyB)
						return -1;
					return 0;
				});

				for (var m = 0; m < stock.length; m++) {
					Ti.API.info(JSON.stringify(stock[m].TICKER + ':' + stock[m].PERCENTNUM + ', move: ' + +stock[m].MOVE));
				}

				//figure out how much PERCENTNUM you can re-distribute, might be zero
				var redistributablePercentNum = 0;

				for ( j = stock.length - 1; j > ((stock.length - 1) - winnerCnt); j--) {
					if (stock[j].PERCENTNUM >= realloc) {
						stock[j].PERCENTNUM = stock[j].PERCENTNUM - realloc;
						redistributablePercentNum = redistributablePercentNum + realloc;
					}
				}

				for ( k = 0; k < winnerCnt; k++) {
					if (redistributablePercentNum >= realloc) {
						stock[k].PERCENTNUM = stock[k].PERCENTNUM + realloc;
						redistributablePercentNum = redistributablePercentNum - realloc;
					}
				}

				for (var l_idx = 0; l_idx < stock.length; l_idx++) {//loop 2 adjust facetQty
					stock[l_idx].FACETQTY = (l_start_value * (stock[l_idx].PERCENTNUM / 100)) / stock[l_idx].graphData[i][1];
					stock[l_idx].CLOSE = stock[l_idx].graphData[i][1];
				}
			}
			
			//adding total dividend sum for the last value	
			if(i== stock[0].graphData.length -1) {
				var sumDividend = dividend.getTotalSum(dividend.getPlainDataDividensForMietf(ETFVersionId));
				l_start_value = l_start_value + sumDividend;
			}
			
			sgyData.push([l_current_date, l_start_value]);
		}

	}//end 17-22

	if (strategy.strategy == 2 && strategy.type == 0) {
		var realloc = 5;
		if (strategy.realloc == 1)
			realloc = 10;

		for (var i = 0; stock[0].graphData && i < stock[0].graphData.length; i++) {
			l_start_value = 0;
			l_current_date = stock[0].graphData[i][0];
			var newDateNo = 3001;
			//always different than dateNo, this is strategy 12, daily
			if (strategy.period == 1)
				newDateNo = getWeekNumber(new Date(l_current_date));
			if (strategy.period == 2)
				newDateNo = new Date(l_current_date).getMonth();
			if (strategy.period == 3)
				newDateNo = Math.floor((new Date(l_current_date).getMonth() + 3) / 3);
			if (strategy.period == 4)
				newDateNo = new Date(l_current_date).getYear();

			for (var l_idx = 0; l_idx < stock.length; l_idx++) {//loop 1 add them all together
				l_start_value = l_start_value + ((stock[l_idx].FACETQTY * stock[l_idx].graphData[i][1]));
				stock[l_idx].MOVE = (100 * ((stock[l_idx].graphData[i][1] - stock[l_idx].CLOSE) / stock[l_idx].CLOSE));
			}

			//only if date period has passed
			if (dateNo != newDateNo) {

				//logic to tweak the winners PERCENTNUM
				//how many winners?
				var winnerCnt = Math.floor(stock.length / 2);

				//sort in order

				stock.sort(function(a, b) {
					var keyA = a.MOVE,
					    keyB = b.MOVE;
					// Compare the 2 values
					if (keyA < keyB)
						return -1;
					if (keyA > keyB)
						return 1;
					return 0;
				});

				//figure out how much PERCENTNUM you can re-distribute, might be zero
				var redistributablePercentNum = 0;

				for ( j = stock.length - 1; j > ((stock.length - 1) - winnerCnt); j--) {
					if (stock[j].PERCENTNUM >= realloc) {
						stock[j].PERCENTNUM = stock[j].PERCENTNUM - realloc;
						redistributablePercentNum = redistributablePercentNum + realloc;
					}
				}

				for ( k = 0; k < winnerCnt; k++) {
					if (redistributablePercentNum >= realloc) {
						stock[k].PERCENTNUM = stock[k].PERCENTNUM + realloc;
						redistributablePercentNum = redistributablePercentNum - realloc;
					}
				}

				for (var l_idx = 0; l_idx < stock.length; l_idx++) {//loop 2 adjust facetQty
					stock[l_idx].FACETQTY = (l_start_value * (stock[l_idx].PERCENTNUM / 100)) / stock[l_idx].graphData[i][1];
					stock[l_idx].CLOSE = stock[l_idx].graphData[i][1];
				}
				dateNo = newDateNo;
			}
			
			//adding total dividend sum for the last value	
			if(i== stock[0].graphData.length -1) {
				var sumDividend = dividend.getTotalSum(dividend.getPlainDataDividensForMietf(ETFVersionId));
				l_start_value = l_start_value + sumDividend;
			}

			sgyData.push([l_current_date, l_start_value]);
		}

	}//end 23 - 27
	if (strategy.strategy == 2 && strategy.type == 1) {
		var realloc = 5;
		if (strategy.realloc == 1)
			realloc = 10;
		var triggerPercent = strategy.priceTrigger;

		for (var i = 0; stock[0].graphData && i < stock[0].graphData.length; i++) {
			l_start_value = 0;
			l_current_date = stock[0].graphData[i][0];
			var rebalanceFlag = false;
			for (var l_idx = 0; l_idx < stock.length; l_idx++) {
				//getting daily value
				l_start_value = l_start_value + ((stock[l_idx].FACETQTY * stock[l_idx].graphData[i][1]));
				stock[l_idx].MOVE = (100 * ((stock[l_idx].graphData[i][1] - stock[l_idx].CLOSE) / stock[l_idx].CLOSE));

				//check for trigger point
				if (Math.abs(100 * ((stock[l_idx].graphData[i][1] - stock[l_idx].CLOSE) / stock[l_idx].CLOSE)) > triggerPercent) {
					rebalanceFlag = true;
					Ti.API.info('triggered on date: ' + l_current_date + ', stock:' + stock[l_idx].TICKER + ', Move:' + Math.abs(100 * ((stock[l_idx].graphData[i][1] - stock[l_idx].CLOSE) / stock[l_idx].CLOSE)));
				}

			}

			if (rebalanceFlag) {

				//logic to tweak the winners PERCENTNUM
				//how many winners?
				var winnerCnt = Math.floor(stock.length / 2);

				//sort in order

				stock.sort(function(a, b) {
					var keyA = a.MOVE,
					    keyB = b.MOVE;
					// Compare the 2 dates
					if (keyA < keyB)
						return -1;
					if (keyA > keyB)
						return 1;
					return 0;
				});

				for (var m = 0; m < stock.length; m++) {
					Ti.API.info(JSON.stringify(stock[m].TICKER + ':' + stock[m].PERCENTNUM + ', move: ' + +stock[m].MOVE));
				}

				//figure out how much PERCENTNUM you can re-distribute, might be zero
				var redistributablePercentNum = 0;

				for ( j = stock.length - 1; j > ((stock.length - 1) - winnerCnt); j--) {
					if (stock[j].PERCENTNUM >= realloc) {
						stock[j].PERCENTNUM = stock[j].PERCENTNUM - realloc;
						redistributablePercentNum = redistributablePercentNum + realloc;
					}
				}

				for ( k = 0; k < winnerCnt; k++) {
					if (redistributablePercentNum >= realloc) {
						stock[k].PERCENTNUM = stock[k].PERCENTNUM + realloc;
						redistributablePercentNum = redistributablePercentNum - realloc;
					}
				}

				for (var l_idx = 0; l_idx < stock.length; l_idx++) {//loop 2 adjust facetQty
					stock[l_idx].FACETQTY = (l_start_value * (stock[l_idx].PERCENTNUM / 100)) / stock[l_idx].graphData[i][1];
					stock[l_idx].CLOSE = stock[l_idx].graphData[i][1];
				}
			}
			
			//adding total dividend sum for the last value	
			if(i== stock[0].graphData.length -1) {
				var sumDividend = dividend.getTotalSum(dividend.getPlainDataDividensForMietf(ETFVersionId));
				l_start_value = l_start_value + sumDividend;
			}

			sgyData.push([l_current_date, l_start_value]);
		}

	}//end 28-33

	//db.close();
	}catch(e){
		Ti.API.error(e);
	}
	Ti.API.info("stock : " +JSON.stringify(stock));
	return sgyData;
};

function getWeekNumber(d) {
	// Copy date so don't modify original
	d = new Date(+d);
	d.setHours(0, 0, 0);
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	d.setDate(d.getDate() + 4 - (d.getDay() || 7));
	// Get first day of year
	var yearStart = new Date(d.getFullYear(), 0, 1);
	// Calculate full weeks to nearest Thursday
	return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function get_plain_stock_data(ticker) {
	//alert("get_plain_stock_data:" + ticker)
	if (mietf.strategyClose.length>0) {
    //if(mietf.strategyClose.length>0 &&  mietf.strategyClose[ticker]){
		return mietf.strategyClose[ticker]; 
	}
   // Ti.API.info('mietf.strategyClose ' + JSON.stringify(mietf.strategyClose));
	return mietf.strategyClose[ticker];
	
	// I have used above because for CASH returns data for every day
	// and not on days when market it's opened
	// if changed bellow data instead of above be carefull to apply split on close value
	
	/*
	 var stockData = new Array();
	 var firstRowDate = mietf.firstRowDate;
	 var lastRowDate = mietf.lastRowDate;

	 var db = Ti.Database.open('cloud');

	 rs = db.execute('SELECT a.closeDate, ' +
	 'ROUND(a.Close, 3) Close ' +
	 'FROM stockData a ' +
	 'WHERE a.closeDate >= ? and a.closeDate <= ? and a.Ticker = ? ' +
	 'ORDER BY a.closeDate asc ', firstRowDate, lastRowDate, ticker);

	 while (rs.isValidRow()) {
	 	stockData.push([rs.fieldByName('closeDate'), rs.fieldByName('Close')]);
	 	rs.next();
	 }

	 db.close();
	 return stockData;
	 */
};

function getComparison() {
	var prevArray = new Array();
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT ETFVersionId from tempETF WHERE etfType = ? ORDER BY sortNum ASC', 'COMP');
	while (rs.isValidRow()) {
		prevArray.push(rs.fieldByName('ETFVersionId'));
		rs.next();
	}

	db.close();
	return prevArray;
}

function getPrevious() {
	var prevArray = new Array();
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT ETFVersionId from tempETF WHERE etfType = ? ORDER BY sortNum ASC', 'PREV');
	while (rs.isValidRow()) {
		prevArray.push(rs.fieldByName('ETFVersionId'));
		rs.next();
	}

	db.close();
	return prevArray;
}

function getComparisonGraphData(ETFVersionId, graphData) {
	var mietfData = new Array();

	if (graphData) {

		for ( i = 0; i < graphData.length; i++) {
			if (graphData[i][3] == 'COMP' && graphData[i][4] == ETFVersionId)
				mietfData.push([graphData[i][0], graphData[i][1], graphData[i][2]]);
		}

	}

	return mietfData;
}

function getPrevGraphData(ETFVersionId, graphData) {
	var mietfData = new Array();

	for ( i = 0; i < graphData.length; i++) {
		if (graphData[i][3] == 'PREV' && graphData[i][4] == ETFVersionId)
			mietfData.push([graphData[i][0], graphData[i][1], graphData[i][2]]);
	}

	return mietfData;
}

function getETFGraphData(graphData) {
	var mietfData = new Array();

	if (graphData) {
		for ( i = 0; i < graphData.length; i++) {
			if (graphData[i][3] == 'ETF')
				mietfData.push([graphData[i][0], graphData[i][1], graphData[i][2]]);
		}

	}

	return mietfData;
}

function getETFStrategyData(graphData) {
	var mietfData = new Array();

	if (graphData) {
		for ( i = 0; i < graphData.length; i++) {
			if (graphData[i][3] == 'SGY')
				mietfData.push([graphData[i][0], graphData[i][1], graphData[i][2]]);
		}

	}

	return mietfData;
}

function tempGetHighLowPointPercentageByMiETFId(ETFVersionId, dateRange, graphData, considerIndex) {

	var abort = false;
	if (!ETFVersionId > 0)
		abort = true;
	if (abort)
		return {
			highPointPercentage : 100,
			lowPointPercentage : 0
		};

	//1. get interval for this date range
	var interval = 'daily';
	var startDate = formatDate(new Date() - 90);
	var todayDate = formatDate(new Date());
	var mietfData = new Array();

	var highValue;
	var lowValue;

	switch(dateRange) {
	case '2year':
		interval = 'weekly';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '5year':
		interval = 'weekly';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '10year':
		interval = 'monthly';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '6month':
		interval = 'daily';
		startDate = getStartDateForDateRange(dateRange);
		break;
	case '1year':
		interval = 'daily';
		startDate = getStartDateForDateRange(dateRange);
		break;
	default:
	   if(dateRange.search('year')>0){
		    interval = 'weekly';
		    startDate = getStartDateForDateRange(dateRange);
	   }else{
			var res = dateRange.split("|");
			interval = res[0];
			startDate = res[1];
			todayDate = res[2];
	   }
	}

	//ETF

	Ti.API.info('ETF MAIN');
	var compData = getETFGraphData(graphData);
	Ti.API.info('compData.length:' + compData.length);

	if (compData.length == 0) {
		var highValue = 100;
		var lowValue = 100;
		var firstValue = 100;
	}

	for ( j = 0; j < compData.length; j++) {
		if (j == 0) {
			var firstValue = compData[j][1];
			var firstDate = compData[j][0];
			var highValue = firstValue;
			var lowValue = firstValue;
		}

		if (compData[j][1] > highValue)
			highValue = compData[j][1];
		if (compData[j][1] < lowValue)
			lowValue = compData[j][1];

	}

	var highPointPercentage = (highValue / firstValue * 100) - 100;
	var lowPointPercentage = (lowValue / firstValue * 100) - 100;

	Ti.API.info('MAIN highPointPercentage currently:' + highPointPercentage);
	Ti.API.info('lowPointPercentage currently:' + lowPointPercentage);
	
	//I have added this for fixing error when importing MiETF
	if(!considerIndex) {
		return {
			highPointPercentage : highPointPercentage+1,
			lowPointPercentage : lowPointPercentage+1
		};
	}
	// End added
	
	//COMP
	if(considerIndex) {
		var compArr = getComparison();
		for ( i = 0; i < compArr.length; i++) {
			var compData = getComparisonGraphData(compArr[i], graphData);
			for ( j = 0; j < compData.length; j++) {
				if (j == 0) {
					var firstValue = compData[j][1];
					var firstDate = compData[j][0];
					var highValue = firstValue;
					var lowValue = firstValue;
					Ti.API.info('firstValue:' + firstValue);
					Ti.API.info('firstDate:' + firstDate);
				}
				if (compData[j][1] > highValue)
					highValue = compData[j][1];
				if (compData[j][1] < lowValue)
					lowValue = compData[j][1];
			}
	
			if (((highValue / firstValue * 100) - 100) > highPointPercentage)
				highPointPercentage = ((highValue / firstValue * 100) - 100);
			if (((lowValue / firstValue * 100) - 100) < lowPointPercentage)
				lowPointPercentage = ((lowValue / firstValue * 100) - 100);
		}
	}
	

	//SGY  FINDME  getETFStrategyData
	var compData = getETFStrategyData(graphData);

	for ( j = 0; j < compData.length; j++) {
		if (j == 0) {
			var firstValue = compData[j][1];
			var firstDate = compData[j][0];
			var highValue = firstValue;
			var lowValue = firstValue;
			Ti.API.info('firstValue:' + firstValue);
			Ti.API.info('firstDate:' + firstDate);
		}
		if (compData[j][1] > highValue)
			highValue = compData[j][1];
		if (compData[j][1] < lowValue)
			lowValue = compData[j][1];
	}

	if (((highValue / firstValue * 100) - 100) > highPointPercentage)
		highPointPercentage = ((highValue / firstValue * 100) - 100);
	if (((lowValue / firstValue * 100) - 100) < lowPointPercentage)
		lowPointPercentage = ((lowValue / firstValue * 100) - 100);

	//PREV
	var compArr = new Array();
	//never run previous because it never show again.
	//getPrevious();
	var loopDist = compArr.length;
	for ( loopI = 0; loopI < loopDist; loopI++) {

		var thisVersion = compArr[loopI];
		var compData = getPrevGraphData(thisVersion, graphData);
		for ( j = 0; j < compData.length; j++) {
			if (j == 0) {
				var firstValue = compData[j][1];
				var firstDate = compData[j][0];
				var highValue = firstValue;
				var lowValue = firstValue;
			}
			if (compData[j][1] > highValue)
				highValue = compData[j][1];
			if (compData[j][1] < lowValue)
				lowValue = compData[j][1];
			Ti.API.info('compArr[i]:' + thisVersion + ', compData[j][1]:' + compData[j][1] + ', firstValue:' + firstValue);
		}
		if (((highValue / firstValue * 100) - 100) > highPointPercentage)
			highPointPercentage = ((highValue / firstValue * 100) - 100);
		if (((lowValue / firstValue * 100) - 100) < lowPointPercentage)
			lowPointPercentage = ((lowValue / firstValue * 100) - 100);

	}
	
  if(considerIndex) {
		var db = Ti.Database.open('cloud');
	
		var rs = db.execute(' SELECT ETFId from ETFVersion where ETFVersionId = ?', ETFVersionId);
	
		while (rs.isValidRow()) {
			var mietfId = rs.fieldByName('ETFId');
			rs.next();
		}
	
		if (MarketIndexesExistByMietfId(mietfId)) {
	
			var rs = db.execute('SELECT b.MarketIndexId, MAX(a.Close) maxClose, MIN(a.Close) minClose, MIN(a.closeDate) firstDate' + 
						' FROM marketIndexData a JOIN marketIndex b on (a.Ticker = b.marketShortName) ' + 
						' JOIN jctMarketIndexETF c on (b.marketIndexId = c.MarketIndexId) ' + ' WHERE c.ETFid=? ' + 
						' and a.closeDate >= DATE(?) and a.closeDate <= DATE(?) ' + ' GROUP BY b.MarketIndexId ', mietfId, startDate, todayDate);
	
			while (rs.isValidRow()) {
				var highValue = rs.fieldByName('maxClose');
				var lowValue = rs.fieldByName('minClose');
				var firstDate = rs.fieldByName('firstDate');
				var marketIndexId = rs.fieldByName('MarketIndexId');
	
				var innerRS = db.execute('SELECT a.Close ' + ' FROM marketIndexData a JOIN marketIndex b on (a.Ticker = b.marketShortName) ' + 
						' JOIN jctMarketIndexETF c on (b.marketIndexId = c.MarketIndexId) ' + 
						' WHERE c.ETFid=? ' + ' and a.closeDate = ? and b.MarketIndexId = ?' + ' ', mietfId, firstDate, marketIndexId);
	
				while (innerRS.isValidRow()) {
					var firstRowValue = innerRS.fieldByName('Close');
					innerRS.next();
				}
	
				if (((highValue / firstRowValue * 100) - 100) > highPointPercentage)
					highPointPercentage = ((highValue / firstRowValue * 100) - 100);
				if (((lowValue / firstRowValue * 100) - 100) < lowPointPercentage)
					lowPointPercentage = ((lowValue / firstRowValue * 100) - 100);
				rs.next();
			}
	
		}
	
		db.close();
	}
	Ti.API.info('(final) highPointPercentage:' + highPointPercentage + ',(final) lowPointPercentage:' + lowPointPercentage);

	
	//Added 1 to keep graph within range. Overall Graph value is OK as it is ratio only
	return {
		highPointPercentage : highPointPercentage+1,
		lowPointPercentage : lowPointPercentage+1
	};

};

function getFacetCount(mietfId) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT  COUNT(b.jctFacetETFId) CNT ' + ' from ETF a join jctFacetETF b on (a.ETFId = b.ETFid) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join facetType d on (c.facetTypeId = d.facetTypeId) ' + ' where a.ETFId=? and d.facetTypeId in (1,2) ' + //this insures NASDAQ, NYSE, but not Cash
	' UNION ' + 'SELECT  COUNT(b.jctFacetETFId) CNT ' + ' from ETF a join jctFacetETF b on (a.ETFId = b.ETFid) ' + ' join facet c on (b.etfAsFacetId = c.facetId) ' + ' join facetType d on (c.facetTypeId = d.facetTypeId) ' + ' where b.ETFId=? and b.etfAsFacetId is not null ', mietfId, mietfId);

	var rowCnt = 0;
	while (rs.isValidRow()) {
		rowCnt = rowCnt + rs.fieldByName('CNT');
		rs.next();
	}

	db.close();

	return rowCnt;
}

function updateFormulations(ETFVersionId, startDate, todayDate) {
	//2. update Formulations for this dateRange
	var updateArray = changeFormulationForDateRange2(ETFVersionId, startDate, todayDate);

	//todo: this must be changed for the selected Revisions to be displayed, not simply one revision

	//	var revisionArray = changeFormulationForDateRangeRevision(mietfID, startDate, todayDate);

	var db = Ti.Database.open('cloud');

	for ( i = 0; i < updateArray.length; i++) {

		db.execute('UPDATE jctFacetETF ' + ' SET facetQty = ? ' + ' WHERE jctFacetETFId = ?', updateArray[i].newFacetQty, updateArray[i].jctFacetETFId);

	}

	db.close();
};

function checkMasterPassword(input) {
	if (input.toUpperCase() == Ti.App.Properties.getString('masterPassword').toUpperCase()) {
		return true;
	} else {
		return false;
	}
};

function getMietfDataById(mietfID) {

	var db = Ti.Database.open('cloud');
	var mietfData = new Array();
	var rs = db.execute('SELECT  d.closeDate, (SUM((d.Close * b.facetQty)) + ifnull(e.facetQty,0))/100 value ' + ' from ETF a join jctFacetETF b on (a.ETFId = b.ETFid) ' + ' join facet c on (b.facetId = c.facetId) ' + ' join stockData d on (c.facetTickerSymbol = d.Ticker) ' + ' left join jctFacetETF e on (a.ETFId = e.ETFId AND e.facetId = (SELECT facetId from facet where facet_code=?)) ' + ' where a.ETFId=? ' + ' GROUP BY d.closeDate ', 'CASH', mietfID);

	while (rs.isValidRow()) {
		var str = rs.fieldByName('closeDate');
		var t = str.split("-");
		var date = new Date(t[0], t[1] - 1, t[2], 0, 0, 0, 0);

		mietfData.push([date.getTime(), rs.fieldByName('value')]);
		rs.next();
	}

	db.close();

	return mietfData;
};

function deleteStockDataByTickerSymbol(ticker) {
	var db = Ti.Database.open('cloud');
	db.execute('DELETE from stockData where Ticker = ?', ticker);
	db.close();
}

function deleteIndexDataByTickerSymbol(ticker) {
	var db = Ti.Database.open('cloud');
	db.execute('DELETE from marketIndexData where Ticker = ?', ticker);
	db.close();
}

function insertIndexData(data, tickerSymbol) {
	if (tickerSymbol == 'SPY') {
		var db = Ti.Database.open('cloud');
		db.execute("BEGIN IMMEDIATE TRANSACTION");
		for ( i = 0; i < data.length; i++) {
			var marketIndex = {};
			marketIndex.Ticker = tickerSymbol;
			marketIndex.closeDate = data[i][0];
			marketIndex.Open = data[i][1];
			marketIndex.High = data[i][2];
			marketIndex.Low = data[i][3];
			marketIndex.Close = data[i][4];
			//Other data, right now, has only adjusted close, so this is different.
			marketIndex.Volume = data[i][5];
			marketIndex.AdjClose = data[i][12];
			//["Date","Open","High","Low","Close","Volume","Adjusted Close"]
			db.execute('INSERT INTO marketIndexData (marketIndexDataId, Ticker, closeDate, Open, High, Low, Close, Volume, AdjClose) VALUES (NULL, ?, DATE(?), ?, ?, ?, ?, ?, ?)', marketIndex.Ticker, marketIndex.closeDate, marketIndex.Open, marketIndex.High, marketIndex.Low, marketIndex.Close, marketIndex.Volume, marketIndex.AdjClose);

		}
		db.execute("COMMIT TRANSACTION");
		db.execute("ANALYZE marketIndexData");
		db.close();

	}

	if (tickerSymbol == 'DIA') {
		var db = Ti.Database.open('cloud');
		db.execute("BEGIN IMMEDIATE TRANSACTION");
		for ( i = 0; i < data.length; i++) {
			var marketIndex = {};
			marketIndex.Ticker = tickerSymbol;
			marketIndex.closeDate = data[i][0];
			marketIndex.Open = data[i][1];
			marketIndex.High = data[i][2];
			marketIndex.Low = data[i][3];
			marketIndex.Close = data[i][4];
			//Other data, right now, has only adjusted close, so this is different.
			marketIndex.Volume = data[i][5];
			marketIndex.AdjClose = data[i][12];
			//["Date","Open","High","Low","Close","Volume","Adjusted Close"]
			db.execute('INSERT INTO marketIndexData (marketIndexDataId, Ticker, closeDate, Open, High, Low, Close, Volume, AdjClose) VALUES (NULL, ?, DATE(?), ?, ?, ?, ?, ?, ?)', marketIndex.Ticker, marketIndex.closeDate, marketIndex.Open, marketIndex.High, marketIndex.Low, marketIndex.Close, marketIndex.Volume, marketIndex.AdjClose);

		}
		db.execute("COMMIT TRANSACTION");
		db.execute("ANALYZE marketIndexData");
		db.close();

	}

	if (tickerSymbol == 'NDX') {
		var db = Ti.Database.open('cloud');
		db.execute("BEGIN IMMEDIATE TRANSACTION");
		for ( i = 0; i < data.length; i++) {
			var marketIndex = {};
			marketIndex.Ticker = tickerSymbol;
			marketIndex.closeDate = data[i][0];
			//Trade Date
			marketIndex.Close = data[i][1];
			//Index Value - called Close
			marketIndex.High = data[i][2];
			//High
			marketIndex.Low = data[i][3];
			//Low
			marketIndex.TotalMarketValue = data[i][4];
			//TotalMarketValue, not used
			marketIndex.DividendMarketValue = data[i][5];
			//Dividend Market Value, not used
			marketIndex.AdjClose = marketIndex.Close;
			marketIndex.Volume = '0';
			//not used

			//["Trade Date","Index Value","High","Low","Total Market Value","Dividend Market Value"]
			db.execute('INSERT INTO marketIndexData (marketIndexDataId, Ticker, closeDate, Open, High, Low, Close, Volume, AdjClose) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)', marketIndex.Ticker, marketIndex.closeDate, marketIndex.Open, marketIndex.High, marketIndex.Low, marketIndex.Close, marketIndex.Volume, marketIndex.AdjClose);

		}
		db.execute("COMMIT TRANSACTION");
		db.close();
	}
}


function displayStockByDate(tickerSymbol, date) {
	var db = Ti.Database.open('cloud');
	rs = db.execute('select * from stockData where Ticker=? and closeDate=?', tickerSymbol, date)
	while (rs.isValidRow()) {
		var obj = {};
		obj.stockDataId = rs.fieldByName('stockDataId');
		obj.close = rs.fieldByName("Close")
		obj.closeDate = rs.fieldByName("closeDate")
		Ti.API.info("display stock information:")
		Ti.API.info(obj)
		rs.next();
	}
	db.close();
}


function getStockDataBySymbol(tickerSymbol) {
	var db = Ti.Database.open('cloud');
	rs = db.execute('select * from stockData where Ticker=?', tickerSymbol);
	var stocks = [];
	while (rs.isValidRow()) {
		var obj = {};
		obj.stockDataId = rs.fieldByName('stockDataId');
		obj.close = rs.fieldByName("Close");
		obj.closeDate = rs.fieldByName("closeDate");
		stocks.push(obj);
		rs.next();
	}
	db.close();
	return stocks;
}

function insertStockData(data, tickerSymbol) {
	var db = Ti.Database.open('cloud');
	db.execute("BEGIN IMMEDIATE TRANSACTION");
	for ( i = 0; i < data.length; i++) {
		var stock = {};
		stock.Ticker = tickerSymbol;
		stock.closeDate = data[i][0];
		var posClose = (data[i].length == 13) ? 4 : 1; // it's using 2 ways to get data 
		stock.Close = Math.round(data[i][posClose] * 100);
		stock.Dividend = data[i][6] * 100;
		stock.Split = data[i][7];
		Ti.API.info(stock.closeDate+ '  ' + stock.Dividend + '    ' + stock.Split);
		db.execute('INSERT INTO stockData (stockDataId, Ticker, closeDate, Close, Dividend, Split) VALUES (NULL, ?, DATE(?), ?, ?, ?)', stock.Ticker, stock.closeDate, stock.Close, stock.Dividend, stock.Split);
		//db.execute('INSERT INTO stockData (Ticker, closeDate, Close) VALUES (?, DATE(?), ?)', stock.Ticker, stock.closeDate, stock.Close);
	}
	db.execute("COMMIT TRANSACTION");
	db.execute("ANALYZE stockData");
	db.close();
};
 
function insertStockDataCash() {//Cashme
	var db = Ti.Database.open('cloud');

	var cashFacetId = 4819;
	var facetTickerySymbolCash = 'Cash';

	rs = db.execute('SELECT facetId, facetTickerSymbol from facet where facet_code = ?', 'CASH');
	//facetTickerSymbo 'Cash'

	while (rs.isValidRow()) {
		cashFacetId = rs.fieldByName('facetId');
		facetTickerSymbolCash = rs.fieldByName('facetTickerSymbol');
		rs.next();
	}

	db.execute("BEGIN IMMEDIATE TRANSACTION");

	for (var d = new Date(1985, 0, 1); d <= new Date(2025, 0, 1); d.setDate(d.getDate() + 1)) {
		var stock = [];
		stock.Ticker = facetTickerSymbolCash;
		stock.closeDate = formatDate(d);
		stock.Open = 1;
		stock.High = 1;
		stock.Low = 1;
		stock.Close = 100;
		stock.Volume = 1;
		stock.AdjClose = 1;

		db.execute('INSERT INTO stockData (stockDataId, Ticker, closeDate, Close) VALUES (NULL, ?, DATE(?), ?)', stock.Ticker, stock.closeDate, stock.Close);

	}

	db.execute("COMMIT TRANSACTION");
	db.execute("ANALYZE stockData");
	db.close();

};

function getFacetList(_args) {
	var db = Ti.Database.open('cloud');
	var stocksArray = new Array();
	var rs = db.execute('SELECT a.facetTickerSymbol, b.facetTypeCode ' + ' from facet a join facetType b on (a.facetTypeId = b.facetTypeId) ' + ' where a.facetTickerSymbol <> ? AND a.facetId IN (SELECT facetId from jctFacetETF)', 'Cash');

	while (rs.isValidRow()) {
		stocksArray.push({
			"TickerSymbol" : rs.fieldByName('facetTickerSymbol'),
			"TickerSource" : rs.fieldByName('facetTypeCode'),
			"lastUpdate" : '01-01-2005'
		});
		//Ti.API.info(rs.fieldByName('facetTickerSymbol') + "   " + rs.fieldByName('facetTypeCode') )
		
		rs.next();
	}

	db.close();

	return stocksArray;
};

function getAllFacets(mietfID) {
	var db = Ti.Database.open('cloud');
	var stocksArray = new Array();
	var rs = db.execute('SELECT a.facetTickerSymbol, b.facetTypeCode, a.facetName, a.facetId, a.QuandlCode,  ' + ' a.LastSale, a.MarketCap, a.IPOyear, a.Sector, a.Industry ' + ' from facet a join facetType b on (a.facetTypeId = b.facetTypeId) ' + ' where a.facetTickerSymbol <> ? ' + ' and a.facetId not in (SELECT facetId from jctFacetETF where ETFId = ?) ' + ' ORDER BY a.facetTickerSymbol ', 'Cash', mietfID);

	while (rs.isValidRow()) {

		stocksArray.push({
			properties : {
				LastSale : rs.fieldByName('LastSale'),
				MarketCap : rs.fieldByName('MarketCap'),
				IPOyear : rs.fieldByName('IPOyear'),
				Sector : rs.fieldByName('Sector'),
				Industry : rs.fieldByName('Industry'),
				QuandlCode : rs.fieldByName('QuandlCode'),
				facetId : rs.fieldByName('facetId'),
				title : rs.fieldByName('facetTickerSymbol') + ' - ' + rs.fieldByName('facetName'),
				searchableText : rs.fieldByName('facetTickerSymbol') + ' - ' + rs.fieldByName('facetName'),
				TickerSymbol : rs.fieldByName('facetTickerSymbol'),
				TickerSource : rs.fieldByName('facetTypeCode')
			}
		});
		rs.next();
	}

	db.close();

	return stocksArray;

};

function getFacetsTickerSearch(ETFVersionId, searchTerm) {
	var db = Ti.Database.open('cloud');
	var stocksArray = new Array();

	var rs = db.execute('SELECT a.facetTickerSymbol, b.facetTypeCode, a.facetName, a.facetId, a.QuandlCode,  ' + ' a.LastSale, a.MarketCap, a.IPOyear, a.Sector, a.Industry ' + ' from facet a join facetType b on (a.facetTypeId = b.facetTypeId) ' + ' where ((a.facetTickerSymbol like \'' + searchTerm + '%\') ' +
	//' OR a.facetName like \'%' + searchTerm + '%\' ' +
	' ) and a.facetTickerSymbol <> ? ' + ' and a.facetId not in (SELECT facetId from jctFacetETF where ETFVersionId = ? and facetId is not null) ' + ' ORDER BY a.facetTickerSymbol ', 'Cash', ETFVersionId);

	while (rs.isValidRow()) {

		stocksArray.push({
			rowtitle : {
				title : rs.fieldByName('facetTickerSymbol') + ' - ' + rs.fieldByName('facetName')
			},
			properties : {
				LastSale : rs.fieldByName('LastSale'),
				MarketCap : rs.fieldByName('MarketCap'),
				IPOyear : rs.fieldByName('IPOyear'),
				Sector : rs.fieldByName('Sector'),
				Industry : rs.fieldByName('Industry'),
				QuandlCode : rs.fieldByName('QuandlCode'),
				facetId : rs.fieldByName('facetId'),
				title : rs.fieldByName('facetTickerSymbol') + ' - ' + rs.fieldByName('facetName'),
				searchableText : rs.fieldByName('facetTickerSymbol') + ' - ' + rs.fieldByName('facetName'),
				TickerSymbol : rs.fieldByName('facetTickerSymbol'),
				TickerSource : rs.fieldByName('facetTypeCode')
			}
		});
		rs.next();
	}

	var rs = db.execute('SELECT a.facetTickerSymbol, b.facetTypeCode, a.facetName, a.facetId, a.QuandlCode,  ' + ' a.LastSale, a.MarketCap, a.IPOyear, a.Sector, a.Industry ' + ' from facet a join facetType b on (a.facetTypeId = b.facetTypeId) ' + ' where ( a.facetName like \'%' + searchTerm + '%\' ' + ' ) and a.facetTickerSymbol <> ? ' + ' and a.facetId not in (SELECT facetId from jctFacetETF where ETFVersionId = ? and facetId is not null) ' + ' and a.facetId not in ( ' + ' SELECT a.facetId ' + ' from facet a join facetType b on (a.facetTypeId = b.facetTypeId) ' + ' where ((a.facetTickerSymbol like \'' + searchTerm + '%\') ' + ' ) and a.facetTickerSymbol <> ? ' + ' and a.facetId not in (SELECT facetId from jctFacetETF where ETFVersionId = ? and facetId is not null)) ' + ' ORDER BY a.facetTickerSymbol ', 'Cash', ETFVersionId, 'Cash', ETFVersionId);

	while (rs.isValidRow()) {

		stocksArray.push({
			rowtitle : {
				title : rs.fieldByName('facetTickerSymbol') + ' - ' + rs.fieldByName('facetName')
			},
			properties : {
				LastSale : rs.fieldByName('LastSale'),
				MarketCap : rs.fieldByName('MarketCap'),
				IPOyear : rs.fieldByName('IPOyear'),
				Sector : rs.fieldByName('Sector'),
				Industry : rs.fieldByName('Industry'),
				QuandlCode : rs.fieldByName('QuandlCode'),
				facetId : rs.fieldByName('facetId'),
				title : rs.fieldByName('facetTickerSymbol') + ' - ' + rs.fieldByName('facetName'),
				searchableText : rs.fieldByName('facetTickerSymbol') + ' - ' + rs.fieldByName('facetName'),
				TickerSymbol : rs.fieldByName('facetTickerSymbol'),
				TickerSource : rs.fieldByName('facetTypeCode')
			}
		});
		rs.next();
	}

	db.close();

	return stocksArray;

};

function getFacetsMietfSearch(ETFVersionId, searchTerm) {
	var db = Ti.Database.open('cloud');
	var stocksArray = new Array();

	var rs = db.execute(' SELECT ETFId from ETFVersion WHERE ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var ETFId = rs.fieldByName('ETFId');
		rs.next();
	}

	//goto jctFacetETF get all etfAsFacetId from this ETFVersionId

	var rs = db.execute(' SELECT ETF.ETFId, MiETFName, formulationDate, investValue, ETFVersionId from ETF' + 
	                    ' JOIN ETFVersion on ETF.ETFId = ETFVersion.ETFId' +
						' WHERE ETF.ETFId not in (SELECT clonedEtfId FROM ETF where ETFId in ( ' + 
						' SELECT etfAsFAcetId from jctFacetETF where ETFVersionId = ? and etfAsFAcetId is not null)) ' + 
						' AND ETF.ETFId not in (SELECT b.ETFId from jctFacetETF a JOIN ETFVersion b on (a.etfAsFacetId = b.ETFVersionId) where a.ETFVersionId = ? and a.etfAsFacetId is not null) ' + 
						' AND isClone = 0 AND ETF.ETFId not in (SELECT c.ETFId from ETFVersion c WHERE c.ETFVersionId = ?) ' + 
						' AND ETF.ETFId not in (SELECT parentETFId from jctETFVersionToETF where childETFId = ?) ' + 
						' AND ETF.ETFId not in (SELECT parentETFId from jctETFVersionToETF WHERE childETFId in (select ETFId from ETF where clonedETFId = ?)) ' + 
						' AND ETF.ETFId not in (SELECT clonedETFId from ETF WHERE ETFId in (SELECT ETFId FROM ETFVersion WHERE ETFVersionId in (SELECT a.etfAsFacetId FROM jctFacetETF a join ETFVersion b on (a.ETFVersionId = b.ETFVersionId) WHERE b.ETFVersionId=? and a.etfAsFacetId is not null))) group by ETF.ETFId', ETFVersionId, ETFVersionId, ETFVersionId, ETFId, ETFId, ETFVersionId);

	//if the parentETFId contains any entry with a childETFId for this ETFVersionId eliminate it

	while (rs.isValidRow()) {
		stocksArray.push({
			rowtitle : {
				title : 'MiETF (' + toTitleCase(rs.fieldByName('MiETFName')) + ')'
			},
			properties : {
				ETFId : rs.fieldByName('ETFId'),
				MiETFName : toTitleCase(rs.fieldByName('MiETFName')),
				ETFVersionId : rs.fieldByName('ETFVersionId'),
				formulationDate : rs.fieldByName('formulationDate'),
				investValue : rs.fieldByName('investValue'),
				title : 'MiETF (' + toTitleCase(rs.fieldByName('MiETFName')) + ')',
				searchableText : 'MiETF (' + rs.fieldByName('MiETFName') + ')'
			}
		});
		rs.next();
	}

	db.close();

	return stocksArray;

};

function getFacetsNameSearch(ETFVersionId, searchTerm) {
	var db = Ti.Database.open('cloud');
	var stocksArray = new Array();

	//Name

	var rs = db.execute('SELECT a.facetTickerSymbol, b.facetTypeCode, a.facetName, a.facetId, a.QuandlCode,  ' + ' a.LastSale, a.MarketCap, a.IPOyear, a.Sector, a.Industry ' + ' from facet a join facetType b on (a.facetTypeId = b.facetTypeId) ' + ' where a.facetName like \'%' + searchTerm + '%\' and a.facetTickerSymbol <> ? ' + ' and a.facetId not in (SELECT facetId from jctFacetETF where ETFVersionId = ?) ' + ' ORDER BY a.facetTickerSymbol ', 'Cash', ETFVersionId);

	while (rs.isValidRow()) {

		stocksArray.push({
			properties : {
				LastSale : rs.fieldByName('LastSale'),
				MarketCap : rs.fieldByName('MarketCap'),
				IPOyear : rs.fieldByName('IPOyear'),
				Sector : rs.fieldByName('Sector'),
				Industry : rs.fieldByName('Industry'),
				QuandlCode : rs.fieldByName('QuandlCode'),
				facetId : rs.fieldByName('facetId'),
				title : rs.fieldByName('facetTickerSymbol') + ' - ' + rs.fieldByName('facetName'),
				searchableText : rs.fieldByName('facetTickerSymbol') + ' - ' + rs.fieldByName('facetName'),
				TickerSymbol : rs.fieldByName('facetTickerSymbol'),
				TickerSource : rs.fieldByName('facetTypeCode')
			}
		});
		rs.next();
	}

	db.close();

	return stocksArray;

};

function getMietfs(e) {
	//		rs = db.execute('CREATE TABLE ETF (ETFId INTEGER PRIMARY KEY AUTOINCREMENT, portfolioId INTEGER, MiETFName TEXT)');

	var db = Ti.Database.open('cloud');
	var mietfsArray = new Array();
	var rs = db.execute('SELECT a.ETFId, a.MiETFName, a.iconImg ' + ' from ETF a where a.portfolioId= ? and a.isClone = 0 ORDER by a.sortNum asc', mietf.currentPortfolioId);

	while (rs.isValidRow()) {
		mietfsArray.push({
			"ETFId" : rs.fieldByName('ETFId'),
			"MiETFName" : toTitleCase(rs.fieldByName('MiETFName')),
			"iconImg" : rs.fieldByName('iconImg')
		});
		rs.next();
	}

	db.close();

	return mietfsArray;
};

function getSearchResults(searchTerm, sortOrder) {

	var db = Ti.Database.open('cloud');
	var searchArray = new Array();
	searchTerm = searchTerm.toUpperCase();
	//first search vaults by name
	if (searchTerm != 'VAULTS') {
		if (sortOrder == 'Date Created') {

			var rs = db.execute('SELECT a.*' + ' from vault a where UPPER(a.vaultName) LIKE ? ORDER BY a.createDate ASC LIMIT ?', '%' + searchTerm + '%', 20);

		} else {

			var rs = db.execute('SELECT a.*' + ' from vault a where UPPER(a.vaultName) LIKE ? ORDER BY a.vaultName ASC LIMIT ?', '%' + searchTerm + '%', 20);
		}

		// CREATE TABLE   vault (vaultId INTEGER PRIMARY KEY,
		//vaultName  TEXT,
		//vaultColor TEXT,
		//vaultIconImg TEXT,
		//vaultImg TEXT,
		//isLocked TEXT,
		//lockPasscode TEXT,
		//vaultNum TEXT,
		//vaultDisplayOrder INTEGER,
		//unlockTime TEXT,
		//isSampleVault TEXT,
		//vaultScreen INTEGER,
		//isTitleEditable TEXT,
		//canSetPasscode TEXT,
		//requiresPasscode TEXT,
		//isMoveable TEXT,
		//isDeletable TEXT)');

		while (rs.isValidRow()) {
			searchArray.push({
				"vaultId" : rs.fieldByName('vaultId'),
				"vaultName" : toTitleCase(rs.fieldByName('vaultName')),
				"vaultColor" : rs.fieldByName('vaultColor'),
				"vaultIconImg" : rs.fieldByName('vaultIconImg'),
				"vaultImg" : rs.fieldByName('vaultImg'),
				"isLocked" : rs.fieldByName('isLocked'),
				"lockPasscode" : rs.fieldByName('lockPasscode'),
				"vaultNum" : rs.fieldByName('vaultNum'),
				"vaultDisplayOrder" : rs.fieldByName('vaultDisplayOrder')
			});
			rs.next();
		}
	}

	//second if search term is "Vaults" then return all Vaults

	if (searchTerm == 'VAULTS') {
		if (sortOrder == 'Date Created') {
			var rs = db.execute('SELECT a.*' + ' from vault a ORDER BY a.createDate ASC');
		} else {

			var rs = db.execute('SELECT a.*' + ' from vault a ORDER BY a.vaultName ASC');

		}

		while (rs.isValidRow()) {
			searchArray.push({
				"vaultId" : rs.fieldByName('vaultId'),
				"vaultName" : toTitleCase(rs.fieldByName('vaultName')),
				"vaultColor" : rs.fieldByName('vaultColor'),
				"vaultIconImg" : rs.fieldByName('vaultIconImg'),
				"vaultImg" : rs.fieldByName('vaultImg'),
				"isLocked" : rs.fieldByName('isLocked'),
				"lockPasscode" : rs.fieldByName('lockPasscode'),
				"vaultNum" : rs.fieldByName('vaultNum'),
				"vaultDisplayOrder" : rs.fieldByName('vaultDisplayOrder')
			});
			rs.next();
		}
	}

	db.close();

	return searchArray;
};

function addOneToAllVaults(nextScreen) {
	var db = Ti.Database.open('cloud');
	db.execute('UPDATE vault SET vaultDisplayOrder = vaultDisplayOrder + 1 where vaultScreen = ?', nextScreen);
	db.close();

};

function updateIconImg(ETFVersionId, nativePath) {
	var db = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT ETFId, VersionNum from ETFVersion WHERE ETFVersionId = ?', ETFVersionId);

	while (rs.isValidRow()) {
		var VersionNum = rs.fieldByName('VersionNum');
		var mietfID = rs.fieldByName('ETFid');
		rs.next();
	}

	db.execute('UPDATE ETF SET iconImg = ? where ETFId = ?', nativePath, mietfID);
	db.close();
};

function moveLastVaultRight(thisScreen) {

	var db = Ti.Database.open('cloud');
	var rs = db.execute('SELECT max(a.vaultDisplayOrder) vaultDisplayOrder' + ' from vault a WHERE a.vaultScreen = ?', thisScreen);
	while (rs.isValidRow()) {
		var vaultDisplayOrder = rs.fieldByName('vaultDisplayOrder');
		rs.next();
	}

	db.execute('UPDATE vault SET vaultDisplayOrder = 0, vaultScreen=vaultScreen+1 where vaultScreen = ? and vaultDisplayOrder= ?', thisScreen, vaultDisplayOrder);

	db.close();

};

function deleteVaultById(e) {
	var vaultId = e.vaultId;

	var db = Ti.Database.open('cloud');
	db.execute('DELETE from vault where vaultId = ?', vaultId);

	var vaultsArray = new Array();
	var rs = db.execute('SELECT a.vaultId, a.vaultScreen' + ' from vault a ORDER BY a.vaultScreen, a.vaultDisplayOrder ASC');
	var scrn = 0;
	var dispOrd = 0;

	while (rs.isValidRow()) {
		//vaultsArray.push({"vaultId":rs.fieldByName('vaultId'), "vaultName":rs.fieldByName('vaultName'), "vaultColor":rs.fieldByName('vaultColor'), "vaultIconImg":rs.fieldByName('vaultIconImg'), "vaultImg":rs.fieldByName('vaultImg'), "isLocked":rs.fieldByName('isLocked'), "lockPasscode":rs.fieldByName('lockPasscode'), "vaultNum":rs.fieldByName('vaultNum'), "vaultDisplayOrder":rs.fieldByName('vaultDisplayOrder')});
		var currentScreen = rs.fieldByName('vaultScreen');

		if (scrn != currentScreen) {
			scrn = currentScreen;
			dispOrd = 0;
		}

		var vaultId = rs.fieldByName('vaultId');
		db.execute('UPDATE vault SET vaultDisplayOrder = ? where vaultId = ?', dispOrd, vaultId);
		rs.next();

		dispOrd++;
	}

	db.close();

	//need to also update vaultDisplayOrder

};

function numberOfButtonsBefore(vaultScreen) {

	var db = Ti.Database.open('cloud');
	var vaultsArray = new Array();
	var rs = db.execute('SELECT COUNT(vaultId) vaultCount' + ' from vault WHERE vaultScreen < ?', vaultScreen);

	while (rs.isValidRow()) {
		var vaultCount = rs.fieldByName('vaultCount');
		rs.next();
	}

	db.close();

	return vaultCount;
};

function numberOfButtons(vaultScreen) {

	var db = Ti.Database.open('cloud');
	var vaultsArray = new Array();
	var rs = db.execute('SELECT COUNT(vaultId) vaultCount' + ' from vault WHERE vaultScreen = ?', vaultScreen);

	while (rs.isValidRow()) {
		var vaultCount = rs.fieldByName('vaultCount');
		rs.next();
	}

	db.close();

	return vaultCount;
};

function numberOfScreens() {

	var db = Ti.Database.open('cloud');
	var vaultsArray = new Array();
	var rs = db.execute('SELECT MAX(vaultScreen) vaultScreen' + ' from vault');

	while (rs.isValidRow()) {
		var vaultScreen = rs.fieldByName('vaultScreen');
		rs.next();
	}

	db.close();
    Ti.API.info('numberOfScreens '+vaultScreen);
	return vaultScreen;
};

function newGetVaults(e) {

	var db = Ti.Database.open('cloud');
	var vaultsArray = new Array();

	var outside = db.execute('SELECT DISTINCT a.vaultScreen' + ' from vault a ORDER BY a.vaultScreen ASC');
	while (outside.isValidRow()) {
		var vault = new Vault();
		var vaultScreen = outside.fieldByName('vaultScreen');
		vaultsArray[vaultScreen] = new Array();

		outside.next();
	}
	outside.close();
	db.close();

	//this is OK is vaultsArray is dense, which it should be, but you'll have to write code to guarantee it

	for (var scrn = 0; scrn < vaultsArray.length; scrn++) {
		var db = Ti.Database.open('cloud');
		var pos = 0;
		var inside = db.execute('SELECT a.vaultId' + ' from vault a WHERE a.vaultScreen = ? ORDER BY a.vaultDisplayOrder ASC', scrn);
		while (inside.isValidRow()) {
			vaultsArray[scrn][pos] = new Vault();
			vaultsArray[scrn][pos].getVaultById(inside.fieldByName('vaultId'));
			inside.next();
			pos++;
		}
		inside.close();
		db.close();
	}

	return vaultsArray;
};

function getVaults(e) {

	var db = Ti.Database.open('cloud');
	var vaultsArray = new Array();

	var rs = db.execute('SELECT DISTINCT a.vaultScreen' + ' from vault a ORDER BY a.vaultScreen ASC');

	var counter = 0;
	while (rs.isValidRow()) {
		var vaultScreenToChange = rs.fieldByName('vaultScreen');
		db.execute('UPDATE vault set vaultScreen = ? WHERE vaultScreen = ?', counter, vaultScreenToChange);
		counter++;
		rs.next();
	}

	var rs = db.execute('SELECT a.vaultId' + ' from vault a ORDER BY a.vaultScreen, a.vaultDisplayOrder ASC');
	var i = 0;
	vaultIdDictionary = {};
	while (rs.isValidRow()) {
		var vault = new Vault();
		//vaultsArray.push({"vaultId":rs.fieldByName('vaultId'), "vaultName":rs.fieldByName('vaultName'), "vaultColor":rs.fieldByName('vaultColor'), "vaultIconImg":rs.fieldByName('vaultIconImg'), "vaultImg":rs.fieldByName('vaultImg'), "isLocked":rs.fieldByName('isLocked'), "lockPasscode":rs.fieldByName('lockPasscode'), "vaultNum":rs.fieldByName('vaultNum'), "vaultDisplayOrder":rs.fieldByName('vaultDisplayOrder')});
		vaultsArray.push(vault.getVaultById(rs.fieldByName('vaultId')));
		vaultIdDictionary[rs.fieldByName('vaultId')] = i;

		i++;
		rs.next();
	}

	db.close();

	return vaultsArray;
};

function getVaultsByScreen(screenNum) {

	var db = Ti.Database.open('cloud');
	var vaultsArray = new Array();
	var rs = db.execute('SELECT a.vaultId' + ' from vault a WHERE a.vaultScreen = ? ORDER BY a.vaultScreen, a.vaultDisplayOrder ASC', screenNum);

	while (rs.isValidRow()) {
		var vault = new Vault();
		//vaultsArray.push({"vaultId":rs.fieldByName('vaultId'), "vaultName":rs.fieldByName('vaultName'), "vaultColor":rs.fieldByName('vaultColor'), "vaultIconImg":rs.fieldByName('vaultIconImg'), "vaultImg":rs.fieldByName('vaultImg'), "isLocked":rs.fieldByName('isLocked'), "lockPasscode":rs.fieldByName('lockPasscode'), "vaultNum":rs.fieldByName('vaultNum'), "vaultDisplayOrder":rs.fieldByName('vaultDisplayOrder')});
		vaultsArray.push(vault.getVaultById(rs.fieldByName('vaultId')));
		rs.next();
	}

	db.close();

	return vaultsArray;
};

function resetVaultOrder() {

	var db = Ti.Database.open('cloud');

	var rs = db.execute('SELECT a.vaultId, a.vaultScreen' + ' from vault a ORDER BY a.vaultScreen, a.vaultDisplayOrder ASC');
	var scrn = 0;
	var dispOrd = 0;

	while (rs.isValidRow()) {
		//vaultsArray.push({"vaultId":rs.fieldByName('vaultId'), "vaultName":rs.fieldByName('vaultName'), "vaultColor":rs.fieldByName('vaultColor'), "vaultIconImg":rs.fieldByName('vaultIconImg'), "vaultImg":rs.fieldByName('vaultImg'), "isLocked":rs.fieldByName('isLocked'), "lockPasscode":rs.fieldByName('lockPasscode'), "vaultNum":rs.fieldByName('vaultNum'), "vaultDisplayOrder":rs.fieldByName('vaultDisplayOrder')});
		var currentScreen = rs.fieldByName('vaultScreen');

		if (scrn != currentScreen) {
			scrn = currentScreen;
			dispOrd = 0;
		}

		var vaultId = rs.fieldByName('vaultId');
		db.execute('UPDATE vault SET vaultDisplayOrder = ? where vaultId = ?', dispOrd, vaultId);
		rs.next();

		dispOrd++;
	}

	db.close();

	return;
};

function getPortfolios(e) {
	//alert('vaultId: ' + e.vaultId);

	var vaultId = e.vaultId;
	var db = Ti.Database.open('cloud');
	var portfoliosArray = new Array();
	var rs = db.execute('SELECT a.portfolioId, a.portfolioName ' + ' from portfolio a where a.vaultId= ? order by sortNum Asc', vaultId);

	while (rs.isValidRow()) {
		portfoliosArray.push({
			"portfolioId" : rs.fieldByName('portfolioId'),
			"portfolioName" : toTitleCase(rs.fieldByName('portfolioName'))
		});
		rs.next();
	}

	db.close();

	return portfoliosArray;
};

function setPasscode(e) {

	var lockPasscode = e.lockPasscode;
	var vaultId = e.vaultId;

	var db = Ti.Database.open('cloud');

	var rs = db.execute('UPDATE vault set lockPasscode = ? where vaultId = ?', lockPasscode, vaultId);

	db.close();

	return;
};

function checkPasscode(e) {

	var lockPasscode = e.lockPasscode;
	var vaultId = e.vaultId;

	var db = Ti.Database.open('cloud');
	var passCode = 'NO';

	var rs = db.execute('SELECT a.lockPasscode from vault a where vaultId = ?', vaultId);

	while (rs.isValidRow()) {
		passCode = rs.fieldByName('lockPasscode');
		rs.next();
	}

	db.close();

	return passCode;
};

var component = [{
	NYSETickerSymbol : 'ABT',
	shortName : 'Abbott',
	fullName : 'Abbott Laboratories',
	rowOrder : 1,
	colorCode : '#268fca'
}, {
	NYSETickerSymbol : 'AMGN',
	shortName : 'Amgen',
	fullName : 'Amgen Inc.',
	rowOrder : 2,
	colorCode : '#0073cf'
}, {
	NYSETickerSymbol : 'AZN',
	shortName : 'AstraZenica',
	fullName : 'AstraZeneca PLC',
	rowOrder : 3,
	colorCode : '#164f86'
}, {
	NYSETickerSymbol : 'BMY',
	shortName : 'Bristol-Meyers Squib',
	fullName : 'Bristol–Meyers Squibb Company',
	rowOrder : 4,
	colorCode : '#235d0b'
}, {
	NYSETickerSymbol : 'CAH',
	shortName : 'Cardinal Health',
	fullName : 'Cardinal Health Incorporated',
	rowOrder : 5,
	colorCode : '#1a941f'
}, {
	NYSETickerSymbol : 'FRX',
	shortName : 'Forest',
	fullName : 'Forest Laboratories',
	rowOrder : 6,
	colorCode : '#7ccb25'
}, {
	NYSETickerSymbol : 'GSK',
	shortName : 'GlaxoSmithKline',
	fullName : 'GlaxoSmithKline plc',
	rowOrder : 7,
	colorCode : '#f39019'
}, {
	NYSETickerSymbol : 'IXJ',
	shortName : 'iShares',
	fullName : 'iShares Global Healthcare',
	rowOrder : 8,
	colorCode : '#de6a10'
}, {
	NYSETickerSymbol : 'JNJ',
	shortName : 'Johnson & Johnson',
	fullName : 'Johnson & Johnson',
	rowOrder : 9,
	colorCode : '#bd5b0c'
}, {
	NYSETickerSymbol : 'LLY',
	shortName : 'Eli Lilly',
	fullName : 'Eli Lilly and Company',
	rowOrder : 10,
	colorCode : '#861001'
}, {
	NYSETickerSymbol : 'MCK',
	shortName : 'McKesson',
	fullName : 'Mckesson Corporation',
	rowOrder : 11,
	colorCode : '#c82506'
}, {
	NYSETickerSymbol : 'MRK',
	shortName : 'Merck',
	fullName : 'Merck & Co. Inc.',
	rowOrder : 12,
	colorCode : '#ec5d57'
}, {
	NYSETickerSymbol : 'NVO',
	shortName : 'Novo Nordisk',
	fullName : 'Novo Nordisk A/S',
	rowOrder : 13,
	colorCode : '#f5d328'
}, {
	NYSETickerSymbol : 'NVS',
	shortName : 'Novartis',
	fullName : 'Novartis AG',
	rowOrder : 14,
	colorCode : '#c3971a'
}, {
	NYSETickerSymbol : 'PFE',
	shortName : 'Pfizer',
	fullName : 'Pfizer Inc.',
	rowOrder : 15,
	colorCode : '#a37512'
}, {
	NYSETickerSymbol : 'SNY',
	shortName : 'Sanofi',
	fullName : 'Sanofi',
	rowOrder : 16,
	colorCode : '#5f327c'
}, {
	NYSETickerSymbol : 'TEVA',
	shortName : 'Teva',
	fullName : 'Teva Pharmaceutical Industries',
	rowOrder : 17,
	colorCode : '#773f9b'
}, {
	NYSETickerSymbol : 'XLV',
	shortName : 'SPDR Select',
	fullName : 'Health Care Select Sector SPDR ETF',
	rowOrder : 18,
	colorCode : '#b36ae2'
}, {
	NYSETickerSymbol : 'NVO',
	shortName : 'Novo Nordisk',
	fullName : 'Novo Nordisk A/S',
	rowOrder : 19,
	colorCode : '#FF7F66'
}, {
	NYSETickerSymbol : 'NVS',
	shortName : 'Novartis',
	fullName : 'Novartis AG',
	rowOrder : 20,
	colorCode : '#FF6699'
}, {
	NYSETickerSymbol : 'PFE',
	shortName : 'Pfizer',
	fullName : 'Pfizer Inc.',
	rowOrder : 21,
	colorCode : '#FF66E6'
}, {
	NYSETickerSymbol : 'SNY',
	shortName : 'Sanofi',
	fullName : 'Sanofi',
	rowOrder : 22,
	colorCode : '#FFCC66'
}, {
	NYSETickerSymbol : 'TEVA',
	shortName : 'Teva',
	fullName : 'Teva Pharmaceutical Industries',
	rowOrder : 23,
	colorCode : '#9C00EB'
}, {
	NYSETickerSymbol : 'XLV',
	shortName : 'SPDR Select',
	fullName : 'Health Care Select Sector SPDR ETF',
	rowOrder : 24,
	colorCode : '#B829FF'
}];

Ti.Gesture.addEventListener('orientationchange', function(e) {
	Ti.App.fireEvent('orient', {
		portrait : e.source.isPortrait(),
		landscape : e.source.isLandscape()
	});
});

function getTagValue(tag, text) {
	var beginTag = '<' + tag + '>';
	var endTag = '</' + tag + '>';

	var tagExists = text.indexOf(beginTag);
	var returnValue = 'NULL';

	if (tagExists > -1) {
		returnValue = text.substring(text.indexOf(beginTag) + beginTag.length, text.indexOf(endTag));
	}

	return returnValue;
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function getStartDateForDateRange(dateRange) {
	//for the Mietf
	var d = new Date();
	var todayDate = formatDate(d);

	//default to 5 year
	d.setFullYear(d.getFullYear() - 5);
	var startDate = formatDate(d);

	if (dateRange == '1year') {
		var d = new Date();
		var todayDate = formatDate(d);
		d.setFullYear(d.getFullYear() - 1);
		var startDate = formatDate(d);
	}else if (dateRange == '2year') {
		var d = new Date();
		var todayDate = formatDate(d);
		d.setFullYear(d.getFullYear() - 2);
		var startDate = formatDate(d);
	}else if (dateRange == '5year') {
		var d = new Date();
		var todayDate = formatDate(d);
		d.setFullYear(d.getFullYear() - 5);
		var startDate = formatDate(d);
	}else if (dateRange == '10year') {
		var d = new Date();
		var todayDate = formatDate(d);
		d.setFullYear(d.getFullYear() - 10);
		var startDate = formatDate(d);
	}else if (dateRange == '6month') {
		var d = new Date();
		var todayDate = formatDate(d);
		d.setMonth(d.getMonth() - 6);
		var startDate = formatDate(d);
	}else if(dateRange.search('year')>0){
		startDate = formatDate(moment().subtract(dateRange.replace('year',''), 'years').toDate()); 
	}

	return startDate;
}


function cloneMiETF(childETFVersionId, portfolioId, MiETFName) {
	Ti.API.info('cloneMiETF called');
	var db = Ti.Database.open('cloud');

	var rs = db.execute(' SELECT a.strategyId, a.VersionNum, a.ETFId, b.portfolioId, b.MiETFName, b.iconImg, b.formulationDate, b.sortNum, b.investValue, b.isClone FROM ETFVersion a JOIN ETF b ON (a.ETFId = b.ETFId) ' + ' WHERE a.ETFVersionId = ?', childETFVersionId);

	while (rs.isValidRow()) {
		
		var strategyId = rs.fieldByName('strategyId');
		
		var oldETFId = rs.fieldByName('ETFId');
		
		db.execute('UPDATE ETF set sortNum = sortNum + 1 WHERE portfolioId = ?', portfolioId);
		
		db.execute(' INSERT INTO ETF (portfolioId, MiETFName, iconImg, formulationDate, sortNum, investValue, isClone, clonedETFId ) ' + ' VALUES  (?, ?, ?, ?, ?, ?, ?, ?) ', portfolioId, MiETFName, rs.fieldByName('iconImg'), rs.fieldByName('formulationDate'), 0 , rs.fieldByName('investValue'), 0 , 0);

		var newETFId = db.lastInsertRowId;
		Ti.API.info('newETFId : '+newETFId);
		rs.next();
	}

	db.execute(' INSERT INTO ETFVersion (ETFVersionId, ETFId, VersionNum, GraphEnabledFlag, DeletedFlag, strategyId) ' + 'VALUES  (null, ?, ?, ?, ?, ?) ', newETFId, 1, 0, 0, strategyId);
   
    var newETFVersionId = db.lastInsertRowId;
   
    var rs = db.execute(' SELECT marketIndexId from jctMarketIndexETF WHERE ETFid = ?', oldETFId);
   	while (rs.isValidRow()) {
    	db.execute('INSERT INTO jctMarketIndexETF (ETFid, marketIndexId) VALUES (?,?)', newETFId, rs.fieldByName('marketIndexId'));
	    rs.next();
	}
	
	var rs = db.execute(' SELECT ETFVersionId, facetId, facetQty, sortNum, PercentNum, ifnull(etfAsFacetId, 0) etfAsFacetId from jctFacetETF where ETFVersionId = ?', childETFVersionId);
	var resultsArr = new Array();

	//put into array to release database lock

	while (rs.isValidRow()) {

		resultsArr.push({
			newETFVersionId : newETFVersionId,
			facetId : rs.fieldByName('facetId'),
			facetQty : rs.fieldByName('facetQty'),
			sortNum : rs.fieldByName('sortNum'),
			PercentNum : rs.fieldByName('PercentNum'),
			etfAsFacetId : rs.fieldByName('etfAsFacetId')
		});

		rs.next();

	}

	db.close();

	for ( i = 0; i < resultsArr.length; i++) {
		if (resultsArr[i].etfAsFacetId == 0) {

			var db = Ti.Database.open('cloud');
			Ti.API.info('i:' + i + ', resultsArr[i].etfAsFacetId: ' + resultsArr[i].etfAsFacetId);
			Ti.API.info('i:' + i + ', newETFVersionId:' + resultsArr[i].newETFVersionId);
			db.execute(' INSERT INTO jctFacetETF (jctFacetETFId, ETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId) ' + ' VALUES (null, ?, ?, ?, ?, ?, null) ', resultsArr[i].newETFVersionId, resultsArr[i].facetId, resultsArr[i].facetQty, resultsArr[i].sortNum, resultsArr[i].PercentNum);
			db.close();
		} else {
			Ti.API.info('length: ' + resultsArr.length);
			//2
			mietf.copyResults.push(resultsArr);
			mietf.copyIndex.push(i);
			mietf.copynewETFVersionId.push(newETFVersionId);
			Ti.API.info('cloneETF called in cloneMiETF');
			var newETFAsFacetId = cloneETF(resultsArr[i].etfAsFacetId);
			resultsArr = mietf.copyResults.pop();
			i = mietf.copyIndex.pop();
			newETFVersionId = mietf.copynewETFVersionId.pop();

			var db = Ti.Database.open('cloud');
			Ti.API.info('cant touch this');
			Ti.API.info('findme: ' + JSON.stringify(resultsArr));
			//undefined
			Ti.API.info('length: ' + resultsArr.length);
			//2
			Ti.API.info('i:' + i);
			//5
			db.execute(' INSERT INTO jctFacetETF (jctFacetETFId, ETFVersionId, facetId, facetQty, sortNum, PercentNum, etfAsFacetId) ' + ' VALUES (null, ?, ?, ?, ?, ?, ?) ', resultsArr[i].newETFVersionId, resultsArr[i].facetId, resultsArr[i].facetQty, resultsArr[i].sortNum, resultsArr[i].PercentNum, newETFAsFacetId);
			db.close();

		}
		

	}

	return newETFVersionId;
};