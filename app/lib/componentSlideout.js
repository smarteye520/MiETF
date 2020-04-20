function componentSlideout(_args) {

	var self = Ti.UI.createView({
		left : '110%',
		width : '100%',
		touchEnabled : true,
		zIndex : 60,
		top : 16,
		bubbleParent : false,
		height : '100%'
	});

	var parent = _args.parent;
	var buttons = [];
	var buttonLbls = [];
	var rs = [];
	var currentSortOrder = 'Date Created';
	var ETFVersionId = _args.ETFVersionId;

	var whiteView = Ti.UI.createView({
		height : imgs.whiteViewHeight,
		width : imgs.whiteViewWidth,
		top : 0,
		borderRadius : imgs.whiteViewBorderRadius,
		backgroundImage : imgs.whiteViewBackgroundImage,
		left : 0,
		touchEnabled : true
	});

	self.add(whiteView);

	var insideView = Ti.UI.createView({
		left : 0,
		width : 920,
		height : 625,
		top : 32

	});

	self.add(insideView);

	var closeButton = Titanium.UI.createButton({
		top : imgs.closeButtonTop + 32,
		width : imgs.closeButtonWidth,
		height : imgs.closeButtonHeight,
		backgroundImage : imgs.closeButtonBackgroundImage,
		right : imgs.closeButtonRight
	});

	insideView.add(closeButton);

	var addComponentButton = Titanium.UI.createButton({
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius : 10,
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : 14 + 'sp',
			fontWeight : 'bold'
		},
		title : 'Add Component',
		color : 'white',
		backgroundGradient : {
			type : 'linear',
			colors : ['#A2A0A5', '#666666'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		},
		borderWidth : 2,
		borderColor : '#A2A0A5',
		width : 144,
		height : 32,
		bottom : 32,
		opacity : 0,
		selectedItem : [],
		zIndex : 100
	});

	addComponentButton.addEventListener('click', function(e) {
		getQuandlData(Config.dataset() + addComponentButton.selectedItem.properties.TickerSymbol, addComponentButton.selectedItem.properties.TickerSymbol);
	});

	insideView.add(addComponentButton);

	closeButton.addEventListener('click', function(e) {
		self.animate(hideView);
	});

	var searchInp = Titanium.UI.createTextField({
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '21sp',
			fontWeight : 'Bold'
		},
		height : 48,
		top : 32,
		width : 656,
		left : 64,
		hintText : 'Search',
		backgroundImage : 'images/latest/search_field.pn8',
		borderRadius : 0,
		borderWidth : 0,
		borderColor : 'transparent',
		paddingLeft : 72,
		paddingRight : 15,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		value : '',
		passwordMask : false,
		zIndex : 20,
		opacity : 1
	});

	var dataSet = false;
	searchInp.addEventListener('change', function(e) {
		rightPane.opacity = 0;
		if (searchInp.value.length < 2) {
			stockList.searchText = '';
			tickerData = [];
			nameData = [];
			tickerSection.setItems(tickerData);
			nameSection.setItems(nameData);
			stockList.sections = [tickerSection, nameSection];
			dataSet = false;
		} else {
			stockList.searchText = searchInp.value;
			if (!dataSet) {
				tickerData = getFacetsTickerSearch(ETFVersionId, searchInp.value);
				nameData = getFacetsNameSearch(ETFVersionId, searchInp.value);
				tickerSection.setItems(tickerData);
				nameSection.setItems(nameData);
				stockList.sections = [tickerSection, nameSection];
				dataSet = true;
			}

		}

	});

	insideView.add(searchInp);

	var tickerData = [];
	var nameData = [];

	var stockList = Ti.UI.createListView({
		width : 272, //656,
		left : 64,
		caseInsensitiveSearch : true,
		top : 112,
		bubbleParent : false
	});

	stockList.addEventListener('itemclick', function(e) {
		var item = e.section.getItemAt(e.itemIndex);
		if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		} else {
			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
		}
		e.section.updateItemAt(e.itemIndex, item);
		addComponentButton.selectedItem = item;
		animation.fadeIn(addComponentButton, 500);
		LastSale.text = 'Last Sale : ' + item.properties.LastSale;
		MarketCap.text = 'Market Cap : ' + item.properties.MarketCap;
		IPOyear.text = 'IPO Year : ' + item.properties.IPOyear;
		Sector.text = 'Sector: ' + item.properties.Sector;
		Industry.text = 'Industry : ' + item.properties.Industry;

		animation.fadeIn(rightPane, 500);
	});

	var tickerSection = Ti.UI.createListSection();
	var nameSection = Ti.UI.createListSection();
	tickerSection.setItems(tickerData);
	nameSection.setItems(nameData);
	stockList.sections = [tickerSection, nameSection];

	insideView.add(stockList);

	var resultsLbl = Ti.UI.createLabel({
		left : 66,
		top : 85 + 4,
		color : 'black',
		font : {
			fontSize : '16sp',
			fontWeight : 'bold',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		text : '',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	insideView.add(resultsLbl);

	var sortButton = Titanium.UI.createButton({
		backgroundImage : 'images/latest/sortButton.pn8',
		top : 96, //117,
		width : 272,
		height : 32,
		left : 64,
		opacity : 0
	});

	insideView.add(sortButton);

	var sortPop = Ti.UI.iPad.createPopover({
		width : 272,
		height : 88, //may need to calculate
		arrowDirection : Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP,
		backgroundColor : '#6e6e6e'
	});

	//leftImage: 'images/ifapps/off.pn8'
	var sortTableData = [{
		title : 'Alphabetical',
		hasCheck : false,
		i : 0
	}, {
		title : 'Date Created',
		hasCheck : true,
		i : 1
	}];

	var sortTable = Ti.UI.createTableView({
		data : sortTableData
	});
	var tblFooterView1 = Ti.UI.createView({
		width : 272,
		height : 1,
		backgroundColor : '#ccc'
	});

	sortTable.footerView = tblFooterView1;

	sortTable.addEventListener('click', function(e) {
		var text = e.row.title;

		//resort area
		if (currentSortOrder != text) {
			currentSortOrder = text;
			rs = getSearchResults(searchInp.value, currentSortOrder);
			populateResults(rs);
		}

		for ( i = 0; i < sortTableData.length; i++) {
			sortTableData[i].hasCheck = false;
			if (e.row.i == i)
				sortTableData[i].hasCheck = true;
		}
		sortTable.data = sortTableData;

		var attr = Ti.UI.createAttributedString({
			text : text,
			attributes : [{
				type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
				value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
				range : [0, text.length]
			}]
		});

		sortLbl.attributedString = attr;

	});

	sortPop.contentView = sortTable;

	sortButton.addEventListener('click', function(e) {
		sortPop.show({
			view : sortButton,
			animated : true
		});
	});

	var text = 'Date Created';

	var attr = Ti.UI.createAttributedString({
		text : text,
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.iOS.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, text.length]
		}]
	});

	var sortLbl = Ti.UI.createLabel({
		left : 50,
		top : 7,
		color : '#5b5b5b',
		font : {
			fontSize : '16sp',
			fontWeight : 'bold'
		},
		attributedString : attr,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	sortButton.add(sortLbl);

	var rightPane = Ti.UI.createView({
		top : 96,
		left : 352,
		height : 200,
		borderWidth : 0,
		height : 480,
		width : 368,
		opacity : 0
	});

	insideView.add(rightPane);

	var LastSale = Ti.UI.createLabel({
		left : 66,
		top : 32,
		color : 'black',
		font : {
			fontSize : '16sp',
			fontWeight : 'bold',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		text : 'Last Sale : ',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	rightPane.add(LastSale);

	var MarketCap = Ti.UI.createLabel({
		left : 66,
		top : 64,
		color : 'black',
		font : {
			fontSize : '16sp',
			fontWeight : 'bold',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		text : 'Market Cap : ',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	rightPane.add(MarketCap);

	var IPOyear = Ti.UI.createLabel({
		left : 66,
		top : 96,
		color : 'black',
		font : {
			fontSize : '16sp',
			fontWeight : 'bold',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		text : 'IPO Year : ',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	rightPane.add(IPOyear);

	var Sector = Ti.UI.createLabel({
		left : 66,
		top : 128,
		color : 'black',
		font : {
			fontSize : '16sp',
			fontWeight : 'bold',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		text : 'Sector : ',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	rightPane.add(Sector);

	var Industry = Ti.UI.createLabel({
		left : 66,
		top : 160,
		color : 'black',
		font : {
			fontSize : '16sp',
			fontWeight : 'bold',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		text : 'Industry : ',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	rightPane.add(Industry);

	self.slideIn = function(e) {
		self.animate(showView);
	};

	self.slideOut = function(e) {
		self.animate(hideView);
	};
	//animation
	var showView = Titanium.UI.createAnimation();
	showView.left = 208;
	showView.duration = 500;
	showView.delay = 500;

	showView.addEventListener('complete', function(e) {
		//reset some values

	});

	var hideView = Titanium.UI.createAnimation();
	hideView.left = '110%';
	hideView.duration = 500;

	function resetOnClose() {
		//reset some values

		parent.remove(self);
	};
	hideView.addEventListener('complete', resetOnClose);

	self.addEventListener('swipe', function(e) {
		if (e.direction === 'right')
			self.animate(hideView);
	});

	function getQuandlData(QuandlCode, tickerSymbol) {

		var lastUpdate = getLastInsertDateByTicker(tickerSymbol);

		if (!lastUpdate) {
			lastUpdate = '2005-01-01';
		}
		lastUpdate = sqlDateToNextDay(lastUpdate);

		if (Titanium.Network.online == true) {
			var request = Titanium.Network.createHTTPClient();
		  var url = Config.apiPath() + QuandlCode + '.json?auth_token=' + Config.authToken() + '&trim_start=' + lastUpdate + '&exclude_headers=true';
		  request.open("GET", url);
		  Ti.API.info(url);
			request.send();

			request.onload = function requestReceived() {

				var statusCode = request.status;
				if (statusCode == 200) {
					var response = request.responseText;
					var responseObj = JSON.parse(response);
					responseObj = responseObj.dataset;
					var data = responseObj.data;
					Ti.API.info("source_name: " + responseObj.source_name + " for " + responseObj.dataset_code + ", length is: " + data.length);

					getQuandlDataSuccess(tickerSymbol, data);

				};
			};
			
			request.onerror = function requestFailed() {
				Ti.API.error(request.status + ' - ' + request.statusText);
			};

		};

	};

	function getQuandlDataSuccess(tickerSymbol, data) {
		if (data.length > 0) {
			insertStockData(data, tickerSymbol);
		}

		addMietfComponent(ETFVersionId, addComponentButton.selectedItem.properties.facetId);
		parent.update();
		closeButton.fireEvent('click', {});
	};

	return self;
};

module.exports = componentSlideout;
