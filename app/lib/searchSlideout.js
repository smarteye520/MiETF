function searchSlideout(_args) {

	var self = Ti.UI.createView({
		left : '110%',
		width : '100%',
		touchEnabled : true,
		zIndex : 60,
		top : 96,
		bubbleParent : false
	});

	var parent = _args.parent;
	var buttons = [];
	var buttonLbls = [];
	var rs = [];
	var currentSortOrder = 'Date Created';

	Ti.App.addEventListener('closeSlideouts', function(e) {
		self.animate(hideView);
	});

	var sv = Ti.UI.createScrollView({
		touchEnabled : true,
		contentWidth : 'auto',
		contentHeight : 'auto',
		top : 0,
		left : 0,
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true
	});

	self.add(sv);

	var whiteView = Ti.UI.createView({
		height : imgs.whiteViewHeight,
		width : imgs.whiteViewWidth,
		top : 0,
		borderRadius : imgs.whiteViewBorderRadius,
		backgroundImage : imgs.whiteViewBackgroundImage,
		left : 0,
		touchEnabled : true
	});

	sv.add(whiteView);

	var contentView = Ti.UI.createView({
		left : -150,
		right : 150,
		height : 'auto',
		top : 0,
		touchEnabled : true
	});

	sv.add(contentView);

	var insideView = Ti.UI.createView({
		left : 150,
		width : 920,
		height : 625,
		top : 32

	});

	contentView.add(insideView);

	var closeButton = Titanium.UI.createButton({
		top : imgs.closeButtonTop,
		width : imgs.closeButtonWidth,
		height : imgs.closeButtonHeight,
		backgroundImage : imgs.closeButtonBackgroundImage,
		right : imgs.closeButtonRight
	});

	insideView.add(closeButton);

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

	searchInp.addEventListener('return', function(e) {
		var searchTerm = searchInp.value;
		rs = getSearchResults(searchTerm, currentSortOrder);
		//var resultMsg = '' + rs.length + ' results found.';
		//if (rs.length == 1) resultMsg = '1 result found.';
		//resultsLbl.text = resultMsg;

		if (rs.length == 0) {
			resultsLbl.text = '0 results found.';
		} else {
			resultsLbl.text = '';
		}

		if (rs.length > 0)
			populateResults(rs);

	});

	function populateResults(rs) {

		Ti.API.info('pouplateResults');
		animation.popIn(sortButton);

		leftPaneSV.opacity = 0;

		leftPaneSV.remove(leftPane);

		leftPane = Ti.UI.createView({
			top : 0,
			borderWidth : 0,
			width : 272,
			width : '100%',
			layout : 'vertical',
			opacity : 1
		});

		leftPaneSV.add(leftPane);
		buttons = [];
		buttonLbls = [];

		for ( i = 0; i < rs.length; i++) {

			buttons[i] = Titanium.UI.createButton({
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				borderRadius : 10,
				font : {
					fontSize : 16,
					fontWeight : 'bold'
				},
				backgroundGradient : {
					type : 'linear',
					colors : ['#666666', '#EEEEEE'],
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
				borderWidth : 1,
				borderColor : '#666',
				width : 240,
				left : 0,
				height : 32,
				bottom : 8,
				i : i,
				vaultName : rs.vaultName,
				vaultImg : rs.vaultImg,
				isLocked : rs.isLocked,
				isSampleVault : rs.isSampleVault,
				vaultColor : rs[i].vaultColor
			});

			buttons[i].addEventListener('click', function(e) {
				//e.source.image = 'images/latest/search_field_blue.pn8';

				var goRight = Titanium.UI.createAnimation();
				goRight.left = 32;
				goRight.duration = 400;

				var goLeft = Titanium.UI.createAnimation();
				goLeft.left = 0;
				goLeft.duration = 400;

				e.source.animate(goRight);

				e.source.backgroundGradient = {
					type : 'linear',
					colors : [e.source.vaultColor, e.source.vaultColor],
					startPoint : {
						x : 0,
						y : 0
					},
					endPoint : {
						x : 2,
						y : 50
					},
					backFillStart : false
				};

				//borderWidth:1,
				//borderColor:'#666',

				var vault = new Vault();
				vault.getVaultById(rs[e.source.i].vaultId);

				if (vault.isSampleVault == 'NO' && vault.shouldOpenComboLock() != 'NO') {
					if (Ti.App.Properties.getString('unlockControlPreference', 'comboLock') == 'comboLock') {
						previewImage.image = 'images/ifapps/combo' + vault.vaultNum + '.pn8';
					} else {
						previewImage.image = 'images/ifapps/keypad' + vault.vaultNum + '.pn8';
					}

				} else {
					previewImage.image = 'images/ifapps/unlocked' + vault.vaultNum + '.pn8';
				}

				previewImage.vaultId = vault.vaultId;

				animation.popIn(previewImage);

				for ( i = 0; i < buttons.length; i++) {
					if (i != e.source.i) {
						buttons[i].animate(goLeft);
						buttons[i].backgroundGradient = {
							type : 'linear',
							colors : ['#000001', '#666666'],
							startPoint : {
								x : 0,
								y : 0
							},
							endPoint : {
								x : 2,
								y : 50
							},
							backFillStart : false
						};
						//buttons[i].image = 'images/latest/search_field_black.pn8';
					}
				}

			});

			leftPane.add(buttons[i]);

			buttonLbls[i] = Ti.UI.createLabel({
				left : 10,
				top : 8,
				color : '#white',
				font : {
					fontSize : '13sp',
					fontWeight : 'bold'
				},
				text : '' + (i + 1) + '. ' + rs[i].vaultName,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false
			});

			buttons[i].add(buttonLbls[i]);
		}

		setTimeout(function(e) {
			animation.fadeIn(leftPaneSV);
		}, 450);

		setTimeout(function(e) {
			animation.popIn(filterButton);
		}, 850);

	}


	searchInp.addEventListener('change', function(e) {
		e.source.value = e.source.value.slice(0, 46);
		resultsLbl.text = '';
		sortButton.opacity = 0;
		filterButton.opacity = 0;
		previewImage.opacity = 0;
	});

	insideView.add(searchInp);

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
		backgroundColor : '#6e6e6e',
		title : 'Sort'
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
			previewImage.opacity = 0;
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
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
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

	var filterButton = Titanium.UI.createButton({
		backgroundImage : 'images/latest/filterButton.pn8',
		top : 544,
		width : 272,
		height : 32,
		left : 64,
		opacity : 0
	});

	insideView.add(filterButton);

	var filterPop = Ti.UI.iPad.createPopover({
		width : 272,
		height : 88, //may need to calculate
		arrowDirection : Ti.UI.iPad.POPOVER_ARROW_DIRECTION_DOWN,
		backgroundColor : '#6e6e6e',
		title : 'Filter'
	});

	//leftImage: 'images/ifapps/off.pn8'
	var filterTableData = [{
		title : 'Show All',
		hasCheck : true,
		i : 0
	}, {
		title : 'Vaults',
		hasCheck : false,
		i : 1
	}];

	var filterTable = Ti.UI.createTableView({
		data : filterTableData
	});
	var tblFooterView2 = Ti.UI.createView({
		width : 275,
		height : 1,
		backgroundColor : '#ccc'
	});

	filterTable.footerView = tblFooterView2;

	filterTable.addEventListener('click', function(e) {

		var text = e.row.title;

		for ( i = 0; i < filterTableData.length; i++) {
			filterTableData[i].hasCheck = false;
			if (e.row.i == i)
				filterTableData[i].hasCheck = true;
		}
		filterTable.data = filterTableData;

		var attr = Ti.UI.createAttributedString({
			text : text,
			attributes : [{
				type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
				value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
				range : [0, text.length]
			}]
		});

		filterLbl.attributedString = attr;

	});

	filterPop.contentView = filterTable;

	filterButton.addEventListener('click', function(e) {
		filterPop.show({
			view : filterButton,
			animated : true
		});
	});

	var text = 'Show All';

	var attr = Ti.UI.createAttributedString({
		text : text,
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, text.length]
		}]
	});

	var filterLbl = Ti.UI.createLabel({
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

	filterButton.add(filterLbl);

	var leftPaneSV = Titanium.UI.createScrollView({
		top : 144,
		left : 64,
		height : 356,
		width : 272,
		contentHeight : 'auto',
		contentWidth : '100%'
	});

	var leftPane = Ti.UI.createView({
		top : 0,
		borderWidth : 0,
		width : 272,
		width : '100%',
		layout : 'vertical'
	});

	insideView.add(leftPaneSV);
	leftPaneSV.add(leftPane);

	/*
	 var sortLbl = Ti.UI.createLabel({
	 left: 10,
	 color: '#3f3f3f',
	 font: {  fontSize: '14sp'  },
	 text: 'Sort by: Date',
	 textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	 });

	 sortBy.add(sortLbl);
	 */

	/*
	 var sortPop = Ti.UI.iPad.createPopover({
	 width:275,
	 height: 300,
	 arrowDirection: Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP,
	 backgroundColor: '#6e6e6e',
	 title: 'Sort'
	 });

	 var tableData = [ {title: 'Apples'}, {title: 'Bananas'}, {title: 'Carrots'}, {title: 'Potatoes'} ];

	 var table = Ti.UI.createTableView({
	 data: tableData
	 });
	 sortPop.add(table);

	 sortBy.addEventListener('click', function(e){
	 sortPop.show({view: sortBy, animated:true});
	 });

	 var resultTableRows = [];

	 var TableRow = require('searchTableViewRow'),
	 tableRow1 = new TableRow({title: 'Samples', date: '8:12 AM', tags: 'Blue, Examples', img: 'images/ifapps/keypad3.pn8'}),
	 tableRow2 = new TableRow({title: 'Ideas', date: 'Yesterday', tags: 'Blue, Apps, Inventions, GMO, Stocks' , img: 'images/ifapps/keypad10.pn8'}),
	 tableRow3 = new TableRow({title: 'Tracking', date: 'Friday', tags: 'Red, IBM, Apple, Sales, Prices' , img: 'images/ifapps/keypad7.pn8'}),
	 tableRow4 = new TableRow({title: 'Games', date: 'August 14', tags: 'Yellow, Mario, Kart, Donkey, Kong' , img: 'images/ifapps/keypad1.pn8' });

	 resultTableRows.push(tableRow1);
	 resultTableRows.push(tableRow2);
	 resultTableRows.push(tableRow3);
	 resultTableRows.push(tableRow4);

	 var resultsTable = Ti.UI.createTableView({
	 data: resultTableRows,
	 top: 100,
	 backgroundColor:'transparent',
	 rowBackgroundColor:'transparent',
	 width: '100%',
	 //separatorStyle : Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
	 allowsSelection:true,
	 selectedBackgroundColor : 'yellow'
	 });
	 leftPane.add(resultsTable);

	 var tblFooterView = Ti.UI.createView({
	 width: 275,
	 height: 1,
	 backgroundColor: '#666'
	 });

	 resultsTable.footerView = tblFooterView;

	 resultsTable.addEventListener('click', function(e) {

	 previewImage.image = e.row.img;

	 tagsTxt.text = e.row.tags;
	 });

	 */

	var rightPane = Ti.UI.createView({
		top : 96,
		left : 352,
		borderWidth : 0,
		height : 480,
		width : 368
	});

	insideView.add(rightPane);

	var previewPane = Ti.UI.createView({
		top : 0,
		width : '100%'
	});

	rightPane.add(previewPane);

	var previewImage = Ti.UI.createImageView({
		image : 'images/ifapps/keypad10.pn8',
		width : 336,
		opacity : 0,
		vaultId : 1000,
		vaultScreen : 0
	});

	previewImage.addEventListener('click', function(e) {
		self.animate(hideView);
		Ti.App.fireEvent('VaultButtonClick', {
			vaultId : previewImage.vaultId,
			isSearch : true
		});
		//Ti.App.fireEvent('gotoVault', { vaultId: previewImage.vaultId});
	});

	previewPane.add(previewImage);

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

	return self;
};

module.exports = searchSlideout;
