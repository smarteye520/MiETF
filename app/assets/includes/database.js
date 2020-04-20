var db = Ti.Database.install('/database/cloud.db', 'cloud');

var dbVersion = (!Ti.App.Properties.hasProperty('dbVersion')) ? '1.0.4' : Ti.App.Properties.getString('dbVersion');

//insertStockDataCash();

if (dbVersion == '1.0.0') {
	
		try {
  		var db = Ti.Database.open('cloud'); 
   
		rs = db.execute('CREATE TABLE vault (vaultId INTEGER PRIMARY KEY AUTOINCREMENT, vaultName TEXT, vaultColor TEXT, vaultIconImg TEXT, vaultImg TEXT, isLocked TEXT, lockPasscode TEXT, vaultNum TEXT, vaultDisplayOrder INTEGER, unlockTime TEXT, isSampleVault TEXT, vaultScreen INTEGER, isTitleEditable TEXT, canSetPasscode TEXT, requiresPasscode TEXT, isMoveable TEXT, isDeletable TEXT, canAddNew TEXT, createDate DATETIME)');
		rs = db.execute('CREATE TABLE portfolio (portfolioId INTEGER PRIMARY KEY AUTOINCREMENT, vaultId INTEGER, portfolioName TEXT)');
		rs = db.execute('CREATE TABLE ETF (ETFId INTEGER PRIMARY KEY AUTOINCREMENT, portfolioId INTEGER, MiETFName TEXT, iconImg TEXT)');
		rs = db.execute('CREATE TABLE facet (facetId INTEGER PRIMARY KEY AUTOINCREMENT, facetTypeId INTEGER, facetTickerSymbol TEXT, facetName TEXT)');
		rs = db.execute('CREATE TABLE facetType (facetTypeId INTEGER PRIMARY KEY AUTOINCREMENT, facetTypeCode INTEGER, facetTypeDesc TEXT)');
		rs = db.execute('CREATE TABLE jctFacetETF (jctFacetETFId INTEGER PRIMARY KEY AUTOINCREMENT, ETFid INTEGER, facetId INTEGER, facetQty NUMBER)');
		rs = db.execute('CREATE TABLE stockData (stockDataId INTEGER PRIMARY KEY AUTOINCREMENT, Ticker TEXT, closeDate INTEGER, Close INTEGER, Dividend NUMBER, Split NUMBER)');
		rs = db.execute('CREATE TABLE marketIndex (marketIndexId INTEGER PRIMARY KEY AUTOINCREMENT, marketIndexName TEXT, marketShortName TEXT, quandlSource TEXT, quandlCode TEXT)');
		rs = db.execute('CREATE TABLE marketIndexData (marketIndexDataId INTEGER PRIMARY KEY AUTOINCREMENT, Ticker TEXT, closeDate INTEGER, Open NUMBER, High NUMBER, Low NUMBER, Close NUMBER, Volume NUMBER, AdjClose NUMBER)');
	    rs = db.execute('CREATE TABLE jctMarketIndexETF (jctMarketIndexETFId INTEGER PRIMARY KEY AUTOINCREMENT, ETFid INTEGER, marketIndexId INTEGER)');
	    
	    rs = db.execute('CREATE INDEX tickerIDX1 ON stockData (Ticker)');
	    rs = db.execute('CREATE INDEX closeDateIDX1 ON stockData (closeDate, Close)');
	    rs = db.execute('CREATE INDEX closeDateIDX2 ON marketIndexData (closeDate)');
	    rs = db.execute('CREATE INDEX facetIDX ON facet (facetTickerSymbol)');
	    rs = db.execute('CREATE INDEX tickerIDX2 ON marketIndexData (Ticker)');
	    rs = db.execute('CREATE INDEX facetIDX1 ON jctFacetETF (facetId)');
	    rs = db.execute('CREATE INDEX ETFidIDX1 ON jctFacetETF (ETFid)');  
	    rs = db.execute('CREATE INDEX marketIndexIdIDX1 ON jctMarketIndexETF (marketIndexId)');
	    rs = db.execute('CREATE INDEX marketShortNameIDX1 ON marketIndex (marketShortName)');

	     
	    

	    

		} catch (err) {
			alert('dbVersion 1.0.0 create table task error');
		}
		

	//	try {
		//insert data
	
		if (mietf.buildTarget == 'MiVaults') {
					
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Samples', '#2d9bd9', 'images/latest/vault_3_sm.png', 'images/latest/vault_3_lg.png', 'NO', 'SET', '3', 0, 1406065700451, 'YES', 0, 'NO', 'NO', 'NO', 'YES', 'NO', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Legal', '#53489c', 'images/latest/vault_10_sm.png', 'images/latest/vault_10_lg.png', 'NO', 'SET', '10', 1, 1406065700451, 'YES', 0,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Downloads', '#eb3527', 'images/latest/vault_7_sm.png', 'images/latest/vault_7_lg.png', 'NO', 'SET', '7', 2, 1406065700451, 'YES', 0,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Store', '#ed6c1a', 'images/latest/vault_4_sm.png', 'images/latest/vault_4_lg.png', 'NO', 'SET', '4', 3, 1406065700451, 'YES', 0, 'NO', 'YES', 'YES', 'NO', 'NO', 'NO');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Games', '#ffb706', 'images/latest/vault_1_sm.png', 'images/latest/vault_1_lg.png', 'NO', 'SET', '1', 4, 1406065700451, 'YES', 0, 'NO', 'NO',  'NO', 'YES', 'NO', 'NO');
		
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Zack’s', '#494848', 'images/latest/vault_8_sm.png', 'images/latest/vault_8_lg.png', 'NO', 'SET', '8', 0, 1406065700451, 'YES', 1,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Meggi’s', '#ff69b4', 'images/latest/vault_5_sm.png', 'images/latest/vault_5_lg.png', 'NO', 'SET', '5', 1, 1406065700451, 'YES', 1,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Matthew’s', '#4da7de', 'images/latest/vault_3_sm.png', 'images/latest/vault_3_lg.png', 'NO', 'SET', '3', 2, 1406065700451, 'YES', 1,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Zoё’s', '#4fc5c8', 'images/latest/vault_2_sm.png', 'images/latest/vault_2_lg.png', 'NO', 'SET', '2', 3, 1406065700451, 'YES', 1,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'My Love’s', '#69489c', 'images/latest/vault_10_sm.png', 'images/latest/vault_10_lg.png', 'NO', 'SET', '10', 4, 1406065700451, 'YES', 1,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
			
		} else {
			
				//Dow, Nasdaq, 
				rs = db.execute('INSERT INTO marketIndex (marketIndexId, marketIndexName, marketShortName, quandlSource, quandlCode) VALUES (NULL, ?, ?, ?, ?)', 'Dow Jones Industrial Average', 'DJI', 'YAHOO', 'INDEX_DJI');
				rs = db.execute('INSERT INTO marketIndex (marketIndexId, marketIndexName, marketShortName, quandlSource, quandlCode) VALUES (NULL, ?, ?, ?, ?)', 'NASDAQ 100 Index', 'NDX', 'NASDAQOMX', 'NDX');
		
				//test data
				//jctMarketIndexETF (jctMarketIndexETFId INTEGER PRIMARY KEY AUTOINCREMENT, ETFid INTEGER, marketIndexId INTEGER)
				//rs = db.execute('INSERT INTO jctMarketIndexETF (jctMarketIndexETFId, ETFid, marketIndexId) VALUES (NULL, ?, ?)', 1, 1);
				//rs = db.execute('INSERT INTO jctMarketIndexETF (jctMarketIndexETFId, ETFid, marketIndexId) VALUES (NULL, ?, ?)', 1, 2);
				rs = db.execute('INSERT INTO jctMarketIndexETF (jctMarketIndexETFId, ETFid, marketIndexId) VALUES (NULL, ?, ?)', 2, 1);
				rs = db.execute('INSERT INTO jctMarketIndexETF (jctMarketIndexETFId, ETFid, marketIndexId) VALUES (NULL, ?, ?)', 2, 2);
						
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Samples', '#2d9bd9', 'images/latest/vault_3_sm.png', 'images/latest/vault_3_lg.png', 'NO', 'SET', '3', 0, 1406065700451, 'YES', 0, 'NO', 'NO', 'NO', 'YES', 'NO', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Ideas', '#53489c', 'images/latest/vault_10_sm.png', 'images/latest/vault_10_lg.png', 'NO', 'SET', '10', 1, 1406065700451, 'YES', 0,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Tracking', '#eb3527', 'images/latest/vault_7_sm.png', 'images/latest/vault_7_lg.png', 'NO', 'SET', '7', 2, 1406065700451, 'YES', 0,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Store', '#ed6c1a', 'images/latest/vault_4_sm.png', 'images/latest/vault_4_lg.png', 'NO', 'SET', '4', 3, 1406065700451, 'YES', 0, 'NO', 'YES', 'YES', 'NO', 'NO', 'NO');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Games', '#ffb706', 'images/latest/vault_1_sm.png', 'images/latest/vault_1_lg.png', 'NO', 'SET', '1', 4, 1406065700451, 'YES', 0, 'NO', 'NO',  'NO', 'YES', 'NO', 'NO');
		
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Zack’s', '#494848', 'images/latest/vault_8_sm.png', 'images/latest/vault_8_lg.png', 'NO', 'SET', '8', 0, 1406065700451, 'YES', 1,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Meggi’s', '#ff69b4', 'images/latest/vault_5_sm.png', 'images/latest/vault_5_lg.png', 'NO', 'SET', '5', 1, 1406065700451, 'YES', 1,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Matthew’s', '#4da7de', 'images/latest/vault_3_sm.png', 'images/latest/vault_3_lg.png', 'NO', 'SET', '3', 2, 1406065700451, 'YES', 1,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'Zoё’s', '#4fc5c8', 'images/latest/vault_2_sm.png', 'images/latest/vault_2_lg.png', 'NO', 'SET', '2', 3, 1406065700451, 'YES', 1,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');
				rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', 'My Love’s', '#69489c', 'images/latest/vault_10_sm.png', 'images/latest/vault_10_lg.png', 'NO', 'SET', '10', 4, 1406065700451, 'YES', 1,'YES', 'YES', 'NO', 'YES', 'YES', 'YES');	
			
		}


		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 1, 'Examples');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 1, 'Growth');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 1, 'Foreign');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 1, 'Boutique');
		
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 2, 'Examples');
		
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 3, 'Pos 0');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 3, 'Pos 1');	
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 3, 'Pos 2');
		
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 4, 'Mi For Sale');	
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 4, 'Mi Purchases');	
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 4, 'Browse Store');
																
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 5, 'Spectator');	
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 5, 'Existing Games');	
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 5, 'New Games');													
																
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 6, 'Balloons');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 7, 'Tigers');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 7, 'Bears');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 8, 'June');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 8, 'July');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 8, 'August');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 8, 'September');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 9, 'Eclair'); //19
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 9, 'Jelly Beans');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 9, 'Sugar Cookies');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 9, 'Brownies');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 9, 'Cotton Candy');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 9, 'Rice Pudding');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 9, 'Donuts');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 9, 'Cake');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 1');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 2');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 3');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 4');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 5');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 6');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 7');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 8');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 9');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 10');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 11');
		rs = db.execute('INSERT INTO portfolio (portfolioId, vaultId, portfolioName) VALUES (NULL, ?, ?)', 10, 'Sample Vault 12');
		
		//Example MiETF
		rs = db.execute('INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg) VALUES (NULL, ?, ?, ?)', 1, 'Blue Chip Stocks', 'images/ifapps/pharmaSample.png');
		rs = db.execute('INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg) VALUES (NULL, ?, ?, ?)', 1, 'Big Pharma', 'images/ifapps/pharmaSample.png');

		//facets
		rs = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (NULL, ?, ?, ?)', 1, 'MRK', 'Merck' );
		rs = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (NULL, ?, ?, ?)', 1, 'JNJ', 'Johnson & Johnson' );
		rs = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (NULL, ?, ?, ?)', 1, 'AZN', 'AstraZenica' );
		rs = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (NULL, ?, ?, ?)', 1, 'BMY', 'Bristol-Meyers Squib' );
		rs = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (NULL, ?, ?, ?)', 3, 'Cash', '$' );
		rs = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (NULL, ?, ?, ?)', 1, 'WMT', 'Wal-Mart Stores Inc.' );
		rs = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (NULL, ?, ?, ?)', 2, 'AAPL', 'Apple Inc.' );
		rs = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (NULL, ?, ?, ?)', 1, 'BAC', 'Bank of America' );
		rs = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (NULL, ?, ?, ?)', 2, 'SBUX', 'Starbucks Corporation' );
		rs = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (NULL, ?, ?, ?)', 1, 'PFE', 'Pfizer Inc.' );

		//related to faces
		rs = db.execute('INSERT INTO facetType (facetTypeId, facetTypeCode, facetTypeDesc) VALUES (NULL, ?, ?)', 'NYSE', 'New York Stock Exchange' );
		rs = db.execute('INSERT INTO facetType (facetTypeId, facetTypeCode, facetTypeDesc) VALUES (NULL, ?, ?)', 'NASDAQ', 'Nasdaq' );
		rs = db.execute('INSERT INTO facetType (facetTypeId, facetTypeCode, facetTypeDesc) VALUES (NULL, ?, ?)', 'CASH', 'Cash' );

		//junction table for MiETFs
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty) VALUES (NULL, ?, ?, ?)', 2, 1, 127.96); //ETFId, //FacetId
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty) VALUES (NULL, ?, ?, ?)', 2, 2, 50.43);
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty) VALUES (NULL, ?, ?, ?)', 2, 3, 33.76);
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty) VALUES (NULL, ?, ?, ?)', 2, 4, 56.31);
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty) VALUES (NULL, ?, ?, ?)', 2, 5, 500);
		
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty) VALUES (NULL, ?, ?, ?)', 1, 6, 73.88); //WMT 40% 4000/54.14
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty) VALUES (NULL, ?, ?, ?)', 1, 7, 95.91); //AAPL 30% //31.28
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty) VALUES (NULL, ?, ?, ?)', 1, 8, 89.82); //BAC  15% 16.70
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty) VALUES (NULL, ?, ?, ?)', 1, 9, 42.79); //SBUX 10% 23.37
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty) VALUES (NULL, ?, ?, ?)', 1, 10, 28.60);  //PFE 5% 17.48
		
		
		
	//	} catch (err) {
	//		alert('dbVersion 1.0.0 insert data error ' + err.message);
	//	}
		
		db.close();
	 dbVersion = '1.0.0';	
}

if (dbVersion == '1.0.0') {
	var db = Ti.Database.open('cloud');
	
  	//chartJctETFMiETF
  	rs = db.execute('CREATE TABLE jctMiETFETF (jctMiETFETFId INTEGER PRIMARY KEY AUTOINCREMENT, MiETFId INTEGER, ETFid INTEGER)');
	//Blue Chip - 1; Big Pharma - 2
	//rs = db.execute('INSERT INTO jctMiETFETF (jctMiETFETFId, MiETFid, ETFid) VALUES (NULL, ?, ?)', 1, 2); 
	 
				//rs = db.execute('INSERT INTO marketIndex (marketIndexId, marketIndexName, marketShortName, quandlSource, quandlCode) VALUES (NULL, ?, ?, ?, ?)', 'Dow Jones Industrial Average', 'DJI', 'YAHOO', 'INDEX_DJI');
				//rs = db.execute('INSERT INTO marketIndex (marketIndexId, marketIndexName, marketShortName, quandlSource, quandlCode) VALUES (NULL, ?, ?, ?, ?)', 'NASDAQ 100 Index', 'NDX', 'NASDAQOMX', 'NDX');

	rs = db.execute('ALTER TABLE marketIndex ADD COLUMN chartName TEXT');
	rs = db.execute('ALTER TABLE marketIndex ADD COLUMN chartPic TEXT');
	rs = db.execute('UPDATE marketIndex SET chartName=?, chartPic=? WHERE marketIndexId=?', 'Dow', 'images/ifapps/dowGraph.png', 1);
	rs = db.execute('UPDATE marketIndex SET chartName=?, chartPic=? WHERE marketIndexId=?', 'Nasdaq', 'images/ifapps/nasdaqGraph.png', 2);
	
	rs = db.execute('ALTER TABLE jctFacetETF ADD COLUMN sortNum INTEGER');
	
	rs = db.execute('INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg) VALUES (NULL, ?, ?, ?)', 1, 'Foreign Growth', 'images/ifapps/pharmaSample.png');			

		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum) VALUES (NULL, ?, ?, ?, ?)', 3, 1, 127.96, 1); //ETFId, //FacetId
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum) VALUES (NULL, ?, ?, ?, ?)', 3, 3, 67.52, 2);
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum) VALUES (NULL, ?, ?, ?, ?)', 3, 2, 25.22, 3);
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum) VALUES (NULL, ?, ?, ?, ?)', 3, 4, 56.31, 4);
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum) VALUES (NULL, ?, ?, ?, ?)', 3, 5, 500, 5);
	
		 db.execute('ANALYZE facet');
	     db.execute('ANALYZE jctFacetETF');
	     db.execute('ANALYZE jctMarketIndexETF');
	     db.execute('ANALYZE marketIndex');
	
	db.close();
	dbVersion = '1.0.1';
}

if (dbVersion == '1.0.2') {
	  		var db = Ti.Database.open('cloud'); 
	  		rs = db.execute('ALTER TABLE jctFacetETF ADD COLUMN PercentNum INTEGER');
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 20, facetQty = 63.98 where ETFid=3 and sortNum = 1');
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 30 where ETFid=3 and sortNum = 2');
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 15 where ETFid=3 and sortNum = 3');
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 10 where ETFid=3 and sortNum = 4');
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 25, facetQty = 2500 where ETFid=3 and sortNum = 5');
  		
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 20, facetQty = 63.98 where ETFid=2 and facetId = 1'); //40
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 20, facetQty = 33.62 where ETFid=2 and facetId = 2'); //30
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 20, facetQty = 45.00 where ETFid=2 and facetId = 3'); //15
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 20, facetQty = 112.62 where ETFid=2 and facetId = 4'); //10
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 20, facetQty = 2000 where ETFid=2 and facetId = 5');
	  		
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 40 where ETFid=1 and facetId = 6');
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 30 where ETFid=1 and facetId = 7');
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 15 where ETFid=1 and facetId = 8');
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 10 where ETFid=1 and facetId = 9');
	  		rs = db.execute('UPDATE jctFacetETF SET PercentNum = 5 where ETFid=1 and facetId = 10');
	  		
	  		rs = db.execute('ALTER TABLE ETF ADD COLUMN formulationDate INTEGER');
	  		rs = db.execute('UPDATE ETF set formulationDate=DATE(?)', '2010-02-01');
	  		
	  		rs = db.execute('INSERT INTO marketIndex (marketIndexId, marketIndexName, marketShortName, quandlSource, quandlCode) VALUES (NULL, ?, ?, ?, ?)', 'S&P 500 Index', 'GSPC', 'YAHOO', 'INDEX_GSPC');
	  		rs = db.execute('UPDATE marketIndex SET chartName=?, chartPic=? WHERE marketIndexId=?', 'S&P 500', 'images/ifapps/spGraph.png', 3);
	  		
	  			rs = db.execute('DELETE FROM jctMarketIndexETF');
	  			rs = db.execute('INSERT INTO jctMarketIndexETF (jctMarketIndexETFId, ETFid, marketIndexId) VALUES (NULL, ?, ?)', 1, 3);
				rs = db.execute('INSERT INTO jctMarketIndexETF (jctMarketIndexETFId, ETFid, marketIndexId) VALUES (NULL, ?, ?)', 2, 3);
				rs = db.execute('INSERT INTO jctMarketIndexETF (jctMarketIndexETFId, ETFid, marketIndexId) VALUES (NULL, ?, ?)', 3, 3);
	  		
	  		rs = db.execute('CREATE TABLE jctFacetETFRevision (jctFacetETFId INTEGER PRIMARY KEY AUTOINCREMENT, ETFid INTEGER, facetId INTEGER, facetQty NUMBER, sortNum INTEGER, PercentNum INTEGER)');
	  		rs = db.execute('CREATE INDEX ETFidIDX2 ON jctFacetETFRevision (ETFid)'); 
	  		
	  		//already in db
	  	      rs = db.execute ('CREATE UNIQUE INDEX closeDateTickerUNQ ON stockData (closeDate,Ticker)');
	  		  //rs = db.execute('ANALYZE closeDateTickerUNQ');
	  		  rs = db.execute ('CREATE UNIQUE INDEX facetIdETFId ON jctFacetETF (facetId, ETFid)');
	  		  rs = db.execute('ANALYZE stockData');
	  		   rs = db.execute('ANALYZE jctFacetETF');
	  		db.close();
	  		
	  		
	dbVersion = '1.0.3';
}

if (dbVersion == '1.0.3') {
	  		var db = Ti.Database.open('cloud'); 
	  		//rs = db.execute('delete from stockData');
	  		

		rs = db.execute('INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg) VALUES (NULL, ?, ?, ?)', 1, 'Wealth', 'images/ifapps/pharmaSample.png');
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum, PercentNum) VALUES (NULL, ?, ?, ?, ?, ?)', 4, 4819, 10000, 1, 100);
		rs = db.execute('INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg) VALUES (NULL, ?, ?, ?)', 1, 'Huntington', 'images/ifapps/pharmaSample.png');
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum, PercentNum) VALUES (NULL, ?, ?, ?, ?, ?)', 5, 4819, 10000, 1, 100);
		rs = db.execute('INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg) VALUES (NULL, ?, ?, ?)', 1, 'Source', 'images/ifapps/pharmaSample.png');
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum, PercentNum) VALUES (NULL, ?, ?, ?, ?, ?)', 6, 4819, 10000, 1, 100);
		rs = db.execute('INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg) VALUES (NULL, ?, ?, ?)', 1, 'Lattice', 'images/ifapps/pharmaSample.png');
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum, PercentNum) VALUES (NULL, ?, ?, ?, ?, ?)', 7, 4819, 10000, 1, 100);
			
		rs = db.execute('INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg) VALUES (NULL, ?, ?, ?)', 2, 'Renaissance', 'images/ifapps/pharmaSample.png');
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum, PercentNum) VALUES (NULL, ?, ?, ?, ?, ?)', 8, 4819, 10000, 1, 100);
		
		rs = db.execute('INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg) VALUES (NULL, ?, ?, ?)', 3, 'Street', 'images/ifapps/pharmaSample.png');
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum, PercentNum) VALUES (NULL, ?, ?, ?, ?, ?)', 9, 4819, 10000, 1, 100);
		rs = db.execute('INSERT INTO ETF (ETFId, portfolioId, MiETFName, iconImg) VALUES (NULL, ?, ?, ?)', 3, 'Guggenheim', 'images/ifapps/pharmaSample.png');
		rs = db.execute('INSERT INTO jctFacetETF (jctFacetETFId, ETFid, facetId, facetQty, sortNum, PercentNum) VALUES (NULL, ?, ?, ?, ?, ?)', 10, 4819, 10000, 1, 100);
           
        rs = db.execute('ALTER TABLE portfolio ADD COLUMN sortNum INTEGER');
        rs = db.execute('UPDATE portfolio SET sortNum = 1');
        
        rs = db.execute('ALTER TABLE ETF ADD COLUMN sortNum INTEGER');
        rs = db.execute('UPDATE ETF SET sortNum = 1');
           
            db.close();
	dbVersion = '1.0.4';
}

if (dbVersion == '1.0.4') {
	dbVersion = '1.0.5';
}

var db = Ti.Database.open('cloud'); 
	rs = db.execute('SELECT COUNT(*) CNT from facet where facet_code = ?', 'CASH');

	while (rs.isValidRow()) {
			var cnt = rs.fieldByName('CNT'); 

		rs.next();
	}
	
	if (cnt != 1) {
		alert('from database: not Cash asset found or not exactly 1! cnt: ' + cnt);
	}

 db.close();
Ti.App.Properties.setString("dbVersion", dbVersion);

//db.execute('DELETE from stockData where Ticker <> ?', 'Cash');

