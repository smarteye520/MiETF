var Config = require('configuration');

function progressBar(_args) {

	var self = Ti.UI.createView({
		top : 304 + 304 + 192 - 112,
		left : 32,
		width : 160,
		height : 160,
		opacity : 1
	});

	var pb = Ti.UI.createProgressBar({
		top : 16,
		width : 160,
		min : 0,
		max : 10,
		value : 0,
		color : 'white',
		message : 'Downloading 0 of 10',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : 13,
			fontWeight : 'bold'
		},
		style : Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
	});

	self.add(pb);

	self.downloadStocks = function(e) {
		if (mietf.notRunningDownloads) {
			animation.fadeIn(self, 500, downloadStocks1);
		}
	};

	self.updateStocks = function(e) {
		var host = Config.apiPath();
		host = host.substring(0, host.length-2);
		var quandlUrl = host + "s.json?database_code=EOD&per_page=100&sort_by=oldest_available_date&page=1&api_key=" + Config.authToken();

		var request = Titanium.Network.createHTTPClient();

		Ti.API.info('quandlUrl Update new stocks '+quandlUrl);
		request.open('GET', quandlUrl);

		//And then you send it with:
		request.send();

		//Next specify a function to run when the response comes back (using a .onload event):
		request.onload = function requestReceived() {

			// now the response status will tell you if it's worked (or the response is actually an error
			var statusCode = request.status;
			if (statusCode == 200) {
				Ti.API.info("Processing any new symbols")
				var response = request.responseText;
				var responseObj = JSON.parse(response);
				var data = responseObj.datasets;
				var db = Ti.Database.open('cloud');

				for (var i=0;i<data.length;i++) {
					var ticker_date = new Date(data[i].oldest_available_date);
					var last_refreshed = new Date(ticker_last_updated);
					//Check if any new symbol got added since the last refresh
					if (ticker_date >= last_refreshed) {
						var rs = db.execute('SELECT facetId from facet where facetId = ?', data[i].id);
						var count = 0;
						while (rs.isValidRow()) {
							count += 1;
							rs.next();
						}
						rs.close();
						if (count == 0) {
							//insert new symbol in db.
							Ti.API.info("Inserting data into facet table for " + data[i].dataset_code);
							var ticker_name = data[i].name;
							ticker_name = ticker_name.replace(' Stock Prices, Dividends and Splits', '');
							ticker_name = ticker_name.replace(/ *\([^)]*\) */g, "");
							rs_insert = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (?, ?, ?, ?)', data[i].id, 1, data[i].dataset_code, ticker_name);
						} else {
							Ti.API.info("Ticker already in DB");
						} 
					}
				}

				i -= 1;
				var ticker_date = new Date(data[i].oldest_available_date);
				var last_refreshed = new Date(ticker_last_updated);

				if (ticker_date >= last_refreshed) {
					Ti.API.info("More new tickers available. Reload next page");
					UpdateStocksNextPage(2);
				} else {
					var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

				    if (month.length < 2) month = '0' + month;
				    if (day.length < 2) day = '0' + day;

				    var updated_date = [year, month, day].join('-');
					Ti.App.Properties.setString('ticker_last_updated', updated_date);

					Ti.API.info("No new tickers available. Refresh date updated to " + updated_date);
				}

				db.close();
			};
		};

		request.onerror = function requestFailed() {
			Ti.API.error(quandlUrl + " : " +request.status + ' - ' + request.statusText);
			//mietf.notRunningDownloads = true;
		};

	}

	function UpdateStocksNextPage(page_number) {
		var host = Config.apiPath();
		host = host.substring(0, host.length-2);
		var quandlUrl = host + "s.json?database_code=EOD&per_page=100&sort_by=oldest_available_date&page=" + page_number + "&api_key=" + Config.authToken();

		var request = Titanium.Network.createHTTPClient();

		Ti.API.info('quandlUrl Update new stocks '+quandlUrl);
		request.open('GET', quandlUrl);

		//And then you send it with:
		request.send();

		//Next specify a function to run when the response comes back (using a .onload event):
		request.onload = function requestReceived() {

			// now the response status will tell you if it's worked (or the response is actually an error
			var statusCode = request.status;
			if (statusCode == 200) {
				Ti.API.info("Processing any new symbols")
				var response = request.responseText;
				var responseObj = JSON.parse(response);
				var data = responseObj.datasets;
				var db = Ti.Database.open('cloud');

				for (var i=0;i<data.length;i++) {
					var ticker_date = new Date(data[i].oldest_available_date);
					var last_refreshed = new Date(ticker_last_updated);
					//Check if any new symbol got added since the last refresh
					if (ticker_date >= last_refreshed) {
						var rs = db.execute('SELECT facetId from facet where facetId = ?', data[i].id);
						var count = 0;
						while (rs.isValidRow()) {
							count += 1;
							rs.next();
						}
						rs.close();
						if (count == 0) {
							//insert new symbol in db.
							Ti.API.info("Inserting data into facet table for " + data[i].dataset_code);
							var ticker_name = data[i].name;
							ticker_name = ticker_name.replace(' Stock Prices, Dividends and Splits', '');
							ticker_name = ticker_name.replace(/ *\([^)]*\) */g, "");
							rs_insert = db.execute('INSERT INTO facet (facetId, facetTypeId, facetTickerSymbol, facetName) VALUES (?, ?, ?, ?)', data[i].id, 1, data[i].dataset_code, ticker_name);
						} else {
							Ti.API.info("Ticker already in DB");
						} 
					}
				}

				i -= 1;
				var ticker_date = new Date(data[i].oldest_available_date);
				var last_refreshed = new Date(ticker_last_updated);

				if (ticker_date >= last_refreshed) {
					Ti.API.info("More new tickers available. Reload next page");
					page_number = page_number + 1;
					UpdateStocksNextPage(page_number);
				} else {
					var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

				    if (month.length < 2) month = '0' + month;
				    if (day.length < 2) day = '0' + day;

				    var updated_date = [year, month, day].join('-');
					Ti.App.Properties.setString('ticker_last_updated', updated_date);

					Ti.API.info("No new tickers available. Refresh date updated to " + updated_date);
				}

				db.close();
			};
		};

		request.onerror = function requestFailed() {
			Ti.API.error(quandlUrl + " : " +request.status + ' - ' + request.statusText);
			//mietf.notRunningDownloads = true;
		};
	}


	function fadeOutSelf(e) {
		animation.fadeOut(self, 500);
		//mietf.notRunningDownloads = true;
	};

	function downloadStocks1(e) {
		setTimeout(function(e) {
			fadeOutSelf();
		}, 6000);
		mietf.notRunningDownloads = false;
		var stockList = getFacetList();

		//update stockList with correct lastUpdate and remove stocks if you already have the data.

		for ( i = stockList.length - 1; i >= 0; i--) {
			var lUpdate = getLastInsertDateByTicker(stockList[i].TickerSymbol);
			if (!lUpdate) {
				//don't change
			} else {
				stockList[i].lastUpdate = lUpdate;
			}

			var today = nativeDateToSql(new Date());
			if (stockList[i].lastUpdate == today) {
				stockList.splice(i, 1);
			}
		}

		///

		if (stockList.length > 0) {
			pb.min = 0;
			pb.value = 0;
			pb.max = stockList.length;
			pb.message = 'Updating stock data';
			pb.show();

			//for ( j = 0; j < stockList.length; j++) {
		  var j = 0;		
			var timer = setInterval(function() {  
				getQuandl(Config.dataset() + stockList[j].TickerSymbol, stockList[j].TickerSymbol, sqlDateToNextDay(stockList[j].lastUpdate));
				
				j++;
				if(j==stockList.length) {
					clearInterval(timer);
				};
				
			}, 1000);
		} else {
			if (Ti.App.Properties.getBool('firstTime', true))
				Ti.App.fireEvent('downloadsComplete', {});
		}
	};

	function getNDX() {
		//'INSERT INTO marketIndex (marketIndexId, marketIndexName, marketShortName, quandlSource, quandlCode)

		//NASDAQ 100 Index
		var tickerSymbol = 'NDX';
		//hard coded
		var lUpdate = getLastInsertDateByIndex(tickerSymbol);

		if (!lUpdate) {
			lUpdate = '2005-01-01';
		}

		var quandlUrl = Config.apiPath() + 'NASDAQOMX/NDX.json?auth_token=' + Config.authToken() + '&trim_start=' + lUpdate + '&exclude_headers=true';
		
		Ti.API.info('quandlUrl 3 '+quandlUrl);
		getIndexDataForNDX(quandlUrl, tickerSymbol);

	};

	function getDOW() {

		//Dow Jones Industrial Average
		var tickerSymbol = 'DIA';
		var lUpdate = getLastInsertDateByIndex(tickerSymbol);

		if (!lUpdate) {
			lUpdate = '2005-01-01';
		}
		
		var QuandlCode = "EOD/" + tickerSymbol;
		quandlUrl = Config.apiPath() + QuandlCode + '.json?auth_token=' + Config.authToken() + '&trim_start=' + lUpdate + '&exclude_headers=true';
		
		Ti.API.info('quandlUrl 4 '+quandlUrl);
		getIndexDataForDOW(quandlUrl, tickerSymbol);

	};
	
	/* 
	 * S&P 500 Index
	 */
	function getSP() {
		var tickerSymbol = 'SPY';
		var lUpdate = getLastInsertDateByIndex(tickerSymbol);

		if (!lUpdate) {
			lUpdate = '2005-01-01';
		}
		
		//var quandlUrl = Config.apiPath() + 'YAHOO/INDEX_GSPC.json?auth_token=' + Config.authToken() + '&trim_start=' + lUpdate + '&exclude_headers=true';
		var quandlUrl = Config.apiPath() + 'EOD/SPY.json?auth_token=' + Config.authToken() + '&trim_start=' + lUpdate + '&exclude_headers=true';
		
		Ti.API.info('quandlUrl 1 '+quandlUrl);
		getIndexDataForSP(quandlUrl, tickerSymbol);

	};

	function getQuandl(QuandlCode, tickerSymbol, lastUpdate) {
		//alert(lastUpdate);
		//First, you'll want to check the user can access the web:
		if (Titanium.Network.online == true) {

			//Then you'll need to create an object for your request and open it with the type of call and URL:
			var request = Titanium.Network.createHTTPClient();

			//what is today?
			//what is the last value?
			//should you make any call at all?
			//alert('https://www.quandl.com/api/v1/datasets/' + QuandlCode ) ;
			//request.open('GET', 'https://www.quandl.com/api/v1/datasets/GOOG/' + QuandlCode + '.json?auth_token=hvkEJgEXcheXGXz3E47F&trim_start=' + lastUpdate + '&exclude_headers=true');
			var quandUrl = Config.apiPath() + QuandlCode + '.json?auth_token=' + Config.authToken() + '&trim_start=' + lastUpdate + '&exclude_headers=true';
			Ti.API.info('quandlUrl 2 '+quandUrl);
			request.open('GET', quandUrl);

			//And then you send it with:
			request.send();

			//Next specify a function to run when the response comes back (using a .onload event):
			request.onload = function requestReceived() {

				// now the response status will tell you if it's worked (or the response is actually an error
				var statusCode = request.status;
				if (statusCode == 200) {
					var response = request.responseText;
					var responseObj = JSON.parse(response);
					responseObj = responseObj.dataset;
					var data = responseObj.data;
					Ti.API.info("source_name: " + responseObj.source_name + " for " + responseObj.code + ", length is: " + data.length);

					getQuandlSuccess(tickerSymbol, data);

				};
			};

			request.onerror = function requestFailed() {
				Ti.API.error(quandUrl + " : " +request.status + ' - ' + request.statusText);
				mietf.notRunningDownloads = true;
			};

		};

	};

	function getQuandlSuccess(tickerSymbol, data) {
		Ti.API.info(tickerSymbol + ' ' + JSON.stringify(data));
		pb.message = 'Downloading ' + ++pb.value + ' of ' + pb.max;

		if (data.length > 0) {

			//deleteStockDataByTickerSymbol(tickerSymbol);
			//don't need, doing differential insert now.
			
			insertStockData(data, tickerSymbol);

			//check if done
			if (pb.value == pb.max) {
				animation.fadeOut(self);
				getNDX();
			}
			
		}
		

	};

	function getIndexDataForNDX(quandlUrl, tickerSymbol) {
		//First, you'll want to check the user can access the web:
		if (Titanium.Network.online == true) {

			//Then you'll need to create an object for your request and open it with the type of call and URL:
			var request = Titanium.Network.createHTTPClient();

			request.open('GET', quandlUrl);

			//And then you send it with:
			request.send();

			//Next specify a function to run when the response comes back (using a .onload event):
			request.onload = function requestReceived() {

				// now the response status will tell you if it's worked (or the response is actually an error
				var statusCode = request.status;
				if (statusCode == 200) {
					var response = request.responseText;
					var responseObj = JSON.parse(response);
					responseObj = responseObj.dataset;
					Ti.API.info("source_name: " + responseObj.source_name + " for " + responseObj.code);

					var data = responseObj.data;

					Ti.API.info(JSON.stringify(data));

					getIndexDataNDXSuccess(tickerSymbol, data);

				};
			};

			request.onerror = function requestFailed() {
				Ti.API.error(quandlUrl + " : " + request.status + ' - ' + request.statusText);
				mietf.notRunningDownloads = true;
			};

		};

	};

	function getIndexDataNDXSuccess(tickerSymbol, data) {
		pb.message = 'Downloading ' + ++pb.value + ' of ' + pb.max;
		if (data.length > 0) {
			//deleteIndexDataByTickerSymbol(tickerSymbol);
			insertIndexData(data, tickerSymbol);
			//setTimeout(function(e) { getDOW(); }, 500);
			getDOW();
		};
	};

	function getIndexDataForDOW(quandlUrl, tickerSymbol) {
		//First, you'll want to check the user can access the web:
		if (Titanium.Network.online == true) {

			//Then you'll need to create an object for your request and open it with the type of call and URL:
			var request = Titanium.Network.createHTTPClient();

			request.open('GET', quandlUrl);

			//And then you send it with:
			request.send();

			//Next specify a function to run when the response comes back (using a .onload event):
			request.onload = function requestReceived() {

				// now the response status will tell you if it's worked (or the response is actually an error
				var statusCode = request.status;
				if (statusCode == 200) {
					var response = request.responseText;
					var responseObj = JSON.parse(response);
					responseObj = responseObj.dataset;
					Ti.API.info("source_name: " + responseObj.source_name + " for " + responseObj.code);

					var data = responseObj.data;

					Ti.API.info(JSON.stringify(data));

					getIndexDataDOWSuccess(tickerSymbol, data);

				};
			};

			request.onerror = function requestFailed() {
				Ti.API.error(quandlUrl + " : " +request.status + ' - ' + request.statusText);
				mietf.notRunningDownloads = true;
			};

		};

	};

	function getIndexDataDOWSuccess(tickerSymbol, data) {
		pb.message = 'Downloading Dow data.';
		if (data.length > 0) {
			//deleteIndexDataByTickerSymbol(tickerSymbol);
			insertIndexData(data, tickerSymbol);
			getSP();
		};
	};

	function getIndexDataForSP(quandlUrl, tickerSymbol) {
		//First, you'll want to check the user can access the web:
		if (Titanium.Network.online == true) {

			//Then you'll need to create an object for your request and open it with the type of call and URL:
			var request = Titanium.Network.createHTTPClient();

			request.open('GET', quandlUrl);

			//And then you send it with:
			request.send();

			//Next specify a function to run when the response comes back (using a .onload event):
			request.onload = function requestReceived() {

				// now the response status will tell you if it's worked (or the response is actually an error
				var statusCode = request.status;
				if (statusCode == 200) {
					var response = request.responseText;
					var responseObj = JSON.parse(response);
					responseObj = responseObj.dataset;
					Ti.API.info("source_name: " + responseObj.source_name + " for " + responseObj.code);

					var data = responseObj.data;

					Ti.API.info(JSON.stringify(data));

					getIndexDataSPSuccess(tickerSymbol, data);

				};
			};

			request.onerror = function requestFailed() {
				Ti.API.error(quandlUrl + " : " +request.status + ' - ' + request.statusText);
				mietf.notRunningDownloads = true;
			};

		};

	};

	function getIndexDataSPSuccess(tickerSymbol, data) {
		pb.message = 'Downloading S&P data.';
		//alert('dow length: '+ data.length);
		if (data.length > 0) {
			//deleteIndexDataByTickerSymbol(tickerSymbol);
			insertIndexData(data, tickerSymbol);
			if (Ti.App.Properties.getBool('firstTime', true))
				Ti.App.fireEvent('downloadsComplete', {});
		};
		mietf.notRunningDownloads = true;
	};

	return self;
};

module.exports = progressBar; 