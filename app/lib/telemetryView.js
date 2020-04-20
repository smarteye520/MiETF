function telemetryView(_args) {

	var self = Ti.UI.createView({
		left : '0%',
		width : '100%',
		touchEnabled : true,
		zIndex : 0,
		top : 0,
		bubbleParent : false,
		height : 544,
		opacity : 0,
		zIndex : 10
	});

	var parent = _args.parent;

	var pieTitleButton = Titanium.UI.createButton({
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius : 10,
		backgroundGradient : {
			type : 'linear',
			colors : ['#333234', '#a0a1a3'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 100
			},
			backFillStart : false
		},
		borderWidth : 1,
		borderColor : '#666',
		width : 288,
		height : 48,
		top : 32,
		left : 32,
		zIndex : 20
	});

	var pieTitleLabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		text : 'Test',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		touchEnabled : false,
		height : 48,
		top : 32,
		left : 48,
		zIndex : 20
	});

	self.add(pieTitleButton);
	self.add(pieTitleLabel);

	self.updateTelemetryTitle = function(title) {
		pieTitleLabel.text = title;
	};

	var sv = Ti.UI.createView({
		touchEnabled : true,
		contentWidth : 'auto',
		contentHeight : 'auto',
		top : 0,
		left : 0,
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true,
		scrollingEnabled : false
	});

	self.add(sv);

	var whiteView = Ti.UI.createView({
		height : '100%',
		width : '100%',
		top : 0,
		borderRadius : imgs.whiteViewBorderRadius,
		backgroundImage : 'images/ifapps/telemetryPaper.pn8',
		left : 0,
		touchEnabled : true
	});

	sv.add(whiteView);

	//////////////START

	var titleLbl = Ti.UI.createLabel({//title of page
		top : 62,
		left : 64,
		width : 600,
		text : 'MiETF Engine Telemetry',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '21sp',
			fontWeight : 'bold'
		},
		zIndex : 62,
		opacity : 0
	});

	whiteView.add(titleLbl);

	var mietfNameLbl = Ti.UI.createLabel({//title of page
		top : 60 + 48,
		left : 64,
		width : 600,
		text : '',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '16sp',
			fontWeight : 'bold'
		},
		zIndex : 62,
		opacity : 0
	});

	whiteView.add(mietfNameLbl);

	var chartPeriod = Ti.UI.createLabel({//title of page
		top : 62 + 64,
		left : 64,
		width : 600,
		text : '',
		color : '#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62,
		opacity : 0
	});

	whiteView.add(chartPeriod);

	var startValueLbl = Ti.UI.createLabel({//title of page
		top : 62 + 80,
		left : 64,
		width : 600,
		text : 'Start Value: ',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62,
		opacity : 0
	});

	whiteView.add(startValueLbl);

	var endValueLbl = Ti.UI.createLabel({//title of page
		top : 62 + 96,
		left : 64,
		width : 600,
		text : 'End Value: ',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62,
		opacity : 0
	});

	whiteView.add(endValueLbl);

	var percentageChangeLbl = Ti.UI.createLabel({//title of page
		top : 62 + 112,
		left : 64,
		width : 600,
		text : 'Percentage Change: ',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62,
		opacity : 0
	});

	whiteView.add(percentageChangeLbl);

	var highLowLbl = Ti.UI.createLabel({//title of page
		top : 62 + 128,
		left : 64,
		width : 600,
		text : 'High Value: ',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62,
		opacity : 0
	});

	whiteView.add(highLowLbl);

	var startInvestValueLbl = Ti.UI.createLabel({//title of page
		top : 224,
		right : 400,
		width : Ti.UI.SIZE,
		text : 'Investment Value',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62,
		opacity : 0
	});

	whiteView.add(startInvestValueLbl);

	var endInvestValueLbl = Ti.UI.createLabel({//title of page
		top : 224,
		right : 85,
		width : Ti.UI.SIZE,
		text : 'Investment Value',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62,
		opacity : 0
	});

	whiteView.add(endInvestValueLbl);

	var unitsPurchasedLbl = Ti.UI.createLabel({//title of page
		top : 224,
		right : 276,
		width : Ti.UI.SIZE,
		text : '# of Units Purchased',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62,
		opacity : 0
	});

	whiteView.add(unitsPurchasedLbl);

	var ComponentsSV = Ti.UI.createScrollView({
		touchEnabled : true,
		contentWidth : 'auto',
		contentHeight : 'auto',
		top : 88,
		left : 32,
		right : 64,
		height : 382,
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true,
		scrollingEnabled : true,
		zIndex : 5,
		width : 432
	});

	whiteView.add(ComponentsSV);

	var footerView = Titanium.UI.createView({
		left : 32,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		bottom : 16,
		layout : 'horizontal'
	});
	whiteView.add(footerView);

	var footNote1 = Titanium.UI.createView({
		backgroundColor : '#dcdee0',
		left : 0,
		width : 96,
		height : 48
	});

	var footNote2 = Titanium.UI.createView({
		backgroundColor : '#dcdee0',
		left : 20,
		width : 96,
		height : 48
	});

	var footNote3 = Titanium.UI.createView({
		backgroundColor : '#dcdee0',
		left : 20,
		width : 96,
		height : 48
	});

	footerView.add(footNote1);
	footerView.add(footNote2);
	footerView.add(footNote3);

	var startDateLbl1 = Ti.UI.createLabel({//title of page
		top : 6,
		width : Ti.UI.SIZE,
		text : '',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62
	});

	var startDateLbl2 = Ti.UI.createLabel({//title of page
		top : 6,
		width : Ti.UI.SIZE,
		text : '',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62
	});

	footNote1.add(startDateLbl1);
	footNote2.add(startDateLbl2);

	var endDateLbl = Ti.UI.createLabel({//title of page
		top : 6,
		width : Ti.UI.SIZE,
		text : '',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62
	});

	footNote3.add(endDateLbl);

	var allocLbl = Ti.UI.createLabel({//title of page
		bottom : 6,
		width : Ti.UI.SIZE,
		text : 'Allocation %',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62
	});

	footNote1.add(allocLbl);

	var foot1Lbl = Ti.UI.createLabel({//title of page
		top : 0,
		left : 1,
		width : Ti.UI.SIZE,
		text : '1',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '14sp',
			fontWeight : 'bold'
		},
		zIndex : 62
	});

	footNote1.add(foot1Lbl);

	var startUnitValueLbl = Ti.UI.createLabel({//title of page
		bottom : 6,
		width : Ti.UI.SIZE,
		text : 'Unit Price',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62
	});

	footNote2.add(startUnitValueLbl);

	var foot2Lbl = Ti.UI.createLabel({//title of page
		top : 0,
		left : 1,
		width : Ti.UI.SIZE,
		text : '2',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '14sp',
			fontWeight : 'bold'
		},
		zIndex : 62
	});

	footNote2.add(foot2Lbl);

	var endUnitValueLbl = Ti.UI.createLabel({//title of page
		bottom : 6,
		width : Ti.UI.SIZE,
		text : 'Unit Price',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		zIndex : 62
	});

	footNote3.add(endUnitValueLbl);

	var foot3Lbl = Ti.UI.createLabel({//title of page
		top : 0,
		left : 1,
		width : Ti.UI.SIZE,
		text : '3',
		color : '#57585d', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '14sp',
			fontWeight : 'bold'
		},
		zIndex : 62
	});

	footNote3.add(foot3Lbl);

	var ComponentsTblView = Ti.UI.createView({
		top : 0,
		left : 0,
		right : 0,
		height : Ti.UI.SIZE,
		zIndex : 62,
		layout : 'Composite',
		width : 432
	});

	ComponentsSV.add(ComponentsTblView);

	var baseImage = Ti.UI.createImageView({
		width : 768,
		height : '100%',
		image : 'images/ifapps/telemetryPaperCut.pn8'
	});

	var cropView = Titanium.UI.createView({
		top : -10,
		width : 432,
		bottom : 0,
		zIndex : 6
	});

	cropView.add(baseImage);
	baseImage.left = -32;

	ComponentsTblView.add(cropView);

	var rs = [];
	var buttons = [];
	var greyView1s = [];
	var greyView2s = [];
	var buttonLbls = [];
	/*var colorCount = 0;
	for ( i = 0; i < rs.length; i++) {
	if (mietf.colors.length >= colorCount) {
	colorCount = 0;
	}
	buttons[i] = Titanium.UI.createButton({
	style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	borderRadius : 10,
	font : {
	fontSize : 16,
	fontWeight : 'bold',
	fontFamily : 'AvenirNextCondensed-Bold'
	},
	backgroundGradient : {
	type : 'linear',
	colors : mietf.colors[colorCount], //['#000001','#666666'],
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
	width : 432,
	left : 0,
	height : 32,
	top : (i * 32) + 8
	});
	colorCount++;

	ComponentsTblView.add(buttons[i]);

	buttonLbls[i] = Ti.UI.createLabel({
	left : 10,
	top : 8,
	color : '#white',
	font : {
	fontFamily : 'AvenirNextCondensed-Bold',
	fontSize : '13sp',
	fontWeight : 'bold'
	},
	text : '' + (i + 1) + '. ' + rs[i].ticker,
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	touchEnabled : false
	});

	buttons[i].add(buttonLbls[i]);
	}*/

	//////////////////////////////////////END

	var closeButton = Titanium.UI.createButton({
		top : 32 - 4,
		width : imgs.closeButtonWidth,
		height : imgs.closeButtonHeight,
		backgroundImage : imgs.closeButtonBackgroundImage,
		right : 32,
		zIndex : 12
	});

	whiteView.add(closeButton);

	closeButton.addEventListener('click', function(e) {
		parent.flipOver();
	});

	self.slideIn = function(e) {
		self.animate(showView);
	};

	self.slideOut = function(e) {
		self.animate(hideView);
	};
	//animation
	var showView = Titanium.UI.createAnimation();
	showView.left = 0;
	showView.duration = 500;
	showView.delay = 500;

	var hideView = Titanium.UI.createAnimation();
	hideView.left = '110%';
	hideView.duration = 500;

	function resetOnClose() {
		parent.remove(self);
	};
	hideView.addEventListener('complete', resetOnClose);

	Ti.App.addEventListener('clearTelemetry', function(e) {

		for ( i = 0; i < buttons.length; i++) {
			ComponentsTblView.remove(buttons[i]);
			ComponentsTblView.remove(greyView1s[i]);
			ComponentsTblView.remove(greyView2s[i]);
		}

		mietfNameLbl.text = '';
		chartPeriod.text = '';
		startValueLbl.text = '';
		endValueLbl.text = '';
		percentageChangeLbl.text = '';
		highLowLbl.text = '';
		startDateLbl1.text = '';
		startDateLbl2.text = '';
		endDateLbl.text = '';

		buttons = [];
		greyView1s = [];
		greyView2s = [];
		buttonLbls = [];

	});

	Ti.App.addEventListener('updateTelemetry', function(e) {

		Ti.API.info('updateTelemetry : ' + e.ETFVersionId);
		//"jctFacetETFId":rs.fieldByName('jctFacetETFId'),"facetTickerSymbol":rs.fieldByName('facetTickerSymbol'), "facetName":rs.fieldByName('facetName'), "PercentNum":rs.fieldByName('PercentNum'), "facetQty":rs.fieldByName('facetQty')});

		var period = e.dateRange;
		if (period == '6month')
			period = '6 months';
		else
			period = period.replace('year', ' Years');

		var chartPeriodEndText = ' (' + e.firstRowDate + ' to ' + e.lastRowDate + ')';
		var cnt = getMietfComponentCountById(e.ETFVersionId);
		Ti.API.info('getMietfComponentCountById ' + cnt);
		if ( typeof e.firstRowDate == 'undefined') {
			//check if Cash Only
			if (cnt == 0)
				chartPeriodEndText = ' (Cash Only)';
		}
		chartPeriod.text = 'Investment Period: ' + period + chartPeriodEndText;

		var rs = getMietfComponentsChartResursive(e.ETFVersionId, getMietfNameByVersionId(e.ETFVersionId));
		_.sortBy(rs, function(o) {
			return o.parent;
		});
		Ti.API.info('getMietfComponentsChartResursive:' + JSON.stringify(rs));

		ComponentsTblView.height = (rs.length * 40);
		var colorCount = 0;
		for ( i = 0; i < rs.length; i++) {
			if (rs[i].facetTickerSymbol === 'Cash') {
				colorCount = 0;
				cnt = getMietfComponentCountById(rs[i].ETFVersionId);
				rs[i].facetTickerSymbol = rs[i].parent + ' - ' + rs[i].facetTickerSymbol;
			}
			var top = (i * 40);
			buttons[i] = Titanium.UI.createButton({
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				borderRadius : 10,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : 16,
					fontWeight : 'bold'
				},
				backgroundGradient : {
					type : 'linear',
					colors : mietf.colors[colorCount], //['#57585d','#767676'],
					startPoint : {
						x : 0,
						y : 0
					},
					endPoint : {
						x : 1,
						y : 50
					},
					backFillStart : false
				},
				borderWidth : 2,
				borderColor : mietf.colors[colorCount][0],
				width : 432,
				left : 0,
				height : 32,
				top : top
			});
			colorCount++;
			greyView1s[i] = Titanium.UI.createView({
				backgroundColor : '#58595e',
				width : 112,
				left : 216,
				height : 32,
				top : top,
				zIndex : 10
			});

			greyView2s[i] = Titanium.UI.createView({
				backgroundColor : '#58595e',
				width : 72,
				left : 336,
				height : 32,
				top : top,
				zIndex : 10
			});

			ComponentsTblView.add(buttons[i]);
			ComponentsTblView.add(greyView1s[i]);
			ComponentsTblView.add(greyView2s[i]);

			var startValue = 1;
			var endValue = 1;

			if (cnt > 0) {

				startValue = getStockPriceByDate(rs[i].facetTickerSymbol, e.firstRowDate);
				endValue = getStockPriceByDate(rs[i].facetTickerSymbol, e.lastRowDate);
				startDateLbl1.text = e.firstRowDate;
				startDateLbl2.text = e.firstRowDate;

				endDateLbl.text = e.lastRowDate;
			}

			var dontDisplay = false;

			if ( typeof startValue == 'undefined') {
				startValue = 1;
				dontDisplay = true;
			}
			if ( typeof endValue == 'undefined') {
				endValue = 1;
			}

			buttonLbls[i] = new Object();
			buttonLbls[i].ticker = Ti.UI.createLabel({
				left : 10,
				top : 8,
				color : '#white',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '13sp',
					fontWeight : 'bold'
				},
				text : '' + (i + 1) + '. ' + rs[i].facetTickerSymbol + ' (' + rs[i].facetName + ')',
				textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
				touchEnabled : false,
				width : 194
			});

			buttonLbls[i].PercentNum = Ti.UI.createLabel({
				right : 74,
				top : 8,
				color : '#white',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '13sp',
					fontWeight : 'bold'
				},
				text : rs[i].PercentNum.toFixed(0) + '%',
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false
			});

			buttonLbls[i].startUnitPrice = Ti.UI.createLabel({
				right : 12,
				top : 8,
				color : '#white',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '13sp',
					fontWeight : 'bold'
				},
				text : '$' + startValue.toFixed(2),
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false
			});

			buttonLbls[i].startInvestValue = Ti.UI.createLabel({
				right : 350,
				top : 8,
				color : '#white',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '13sp',
					fontWeight : 'bold'
				},
				text : '$' + (startValue * rs[i].facetQty).toFixed(2),
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false
			});

			buttonLbls[i].unitsPurchased = Ti.UI.createLabel({
				right : 244,
				top : 8,
				color : '#white',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '13sp',
					fontWeight : 'bold'
				},
				text : rs[i].facetQty.toFixed(2),
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false
			});

			buttonLbls[i].endUnitPrice = Ti.UI.createLabel({
				right : 12,
				top : 8,
				color : '#white',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '13sp',
					fontWeight : 'bold'
				},
				text : '$' + endValue.toFixed(2),
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false
			});
			if (dontDisplay) {
				buttonLbls[i].endUnitPrice.text = '';
				buttonLbls[i].startUnitPrice.text = '';
			}

			buttonLbls[i].endInvestValue = Ti.UI.createLabel({
				right : 36,
				top : 8,
				color : '#white',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '13sp',
					fontWeight : 'bold'
				},
				text : '$' + (endValue * rs[i].facetQty).toFixed(2),
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false
			});

			buttons[i].add(buttonLbls[i].ticker);
			greyView1s[i].add(buttonLbls[i].PercentNum);
			greyView1s[i].add(buttonLbls[i].startUnitPrice);
			//buttons[i].add(buttonLbls[i].startInvestValue);
			//buttons[i].add(buttonLbls[i].unitsPurchased);
			greyView2s[i].add(buttonLbls[i].endUnitPrice);
			//buttons[i].add(buttonLbls[i].endInvestValue);
			if (i == 0) {

				greyView1s[i].add(Ti.UI.createLabel({//title of page
					top : 1,
					right : 65,
					width : Ti.UI.SIZE,
					text : '1',
					color : 'white', //'#57585d',
					font : {
						fontFamily : 'AvenirNextCondensed-Bold',
						fontSize : '13sp',
						fontWeight : 'bold'
					},
					zIndex : 62
				}));

				greyView1s[i].add(Ti.UI.createLabel({//title of page
					top : 1,
					right : 2,
					width : Ti.UI.SIZE,
					text : '2',
					color : 'white', //'#57585d',
					font : {
						fontFamily : 'AvenirNextCondensed-Bold',
						fontSize : '13sp',
						fontWeight : 'bold'
					},
					zIndex : 62
				}));

				greyView2s[i].add(Ti.UI.createLabel({//title of page
					top : 1,
					right : 3,
					width : Ti.UI.SIZE,
					text : '3',
					color : 'white', //'#57585d',
					font : {
						fontFamily : 'AvenirNextCondensed-Bold',
						fontSize : '13sp',
						fontWeight : 'bold'
					},
					zIndex : 62
				}));

			}
		}

		mietfNameLbl.text = getMietfNameById(e.mietfID) + ' MiETF';
		try {
			startValueLbl.text = 'Start Value: $' + e.firstRowValue.toFixed(2);
			endValueLbl.text = 'End Value: $' + e.lastRowValue.toFixed(2);
		} catch (e) {

		}

		percentageChangeLbl.text = '';

	});

	Ti.App.addEventListener('updateTelemetryPercentage', function(e) {
		if ( typeof e.lastMiETFPercentage == 'undefined') {
		} else {
			percentageChangeLbl.text = 'Percentage Change: ' + e.lastMiETFPercentage.toFixed(1) + '%';
		}

	});

	Ti.App.addEventListener('updateTelemetryhighLow', function(e) {
		if ( typeof e.highPointPercentage == 'undefined') {
		} else {
			highLowLbl.text = 'High/Low Percentage Change: ' + e.highPointPercentage.toFixed(1) + '%/' + e.lowPointPercentage.toFixed(1) + '%';
		}

	});

	return self;
};

module.exports = telemetryView;
var i = [{
	"mietfSymbol" : {
		"title" : "Cash"
	},
	"mietfPercent" : {
		"title" : "10%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 45,
	"facetTickerSymbol" : "Cash",
	"facetName" : "$",
	"PercentNum" : 10,
	"facetQty" : 1000,
	"ETFVersionId" : 0
}, {
	"mietfSymbol" : {
		"title" : "Cash"
	},
	"mietfPercent" : {
		"title" : "100%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 36,
	"facetTickerSymbol" : "Cash",
	"facetName" : "$",
	"PercentNum" : 100,
	"facetQty" : 10000,
	"ETFVersionId" : 0,
	"parent" : "Guggenheim v.1"
}, {
	"mietfSymbol" : {
		"title" : "Wal-Mart Stores, Inc."
	},
	"mietfPercent" : {
		"title" : "20%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 38,
	"facetTickerSymbol" : "WMT",
	"facetName" : "Wal-Mart Stores, Inc.",
	"PercentNum" : 20,
	"facetQty" : 0.2894356005788712,
	"ETFVersionId" : 0
}, {
	"mietfSymbol" : {
		"title" : "Apple Inc."
	},
	"mietfPercent" : {
		"title" : "20%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 39,
	"facetTickerSymbol" : "AAPL",
	"facetName" : "Apple Inc.",
	"PercentNum" : 20,
	"facetQty" : 0.17998560115190784,
	"ETFVersionId" : 0
}, {
	"mietfSymbol" : {
		"title" : "Bank of America Corporation"
	},
	"mietfPercent" : {
		"title" : "15%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 40,
	"facetTickerSymbol" : "BAC",
	"facetName" : "Bank of America Corporation",
	"PercentNum" : 15,
	"facetQty" : 1.1102886750555145,
	"ETFVersionId" : 0
}, {
	"mietfSymbol" : {
		"title" : "Starbucks Corporation"
	},
	"mietfPercent" : {
		"title" : "10%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 41,
	"facetTickerSymbol" : "SBUX",
	"facetName" : "Starbucks Corporation",
	"PercentNum" : 10,
	"facetQty" : 0.16597510373443983,
	"ETFVersionId" : 0
}, {
	"mietfSymbol" : {
		"title" : "Cash"
	},
	"mietfPercent" : {
		"title" : "25%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 30,
	"facetTickerSymbol" : "Cash",
	"facetName" : "$",
	"PercentNum" : 25,
	"facetQty" : 2500,
	"ETFVersionId" : 0,
	"parent" : "Foreign Growth v.1"
}, {
	"mietfSymbol" : {
		"title" : "Merck & Company, Inc."
	},
	"mietfPercent" : {
		"title" : "20%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 26,
	"facetTickerSymbol" : "MRK",
	"facetName" : "Merck & Company, Inc.",
	"PercentNum" : 20,
	"facetQty" : 0.36764705882352944,
	"ETFVersionId" : 0,
	"parent" : "Foreign Growth v.1"
}, {
	"mietfSymbol" : {
		"title" : "Astrazeneca PLC"
	},
	"mietfPercent" : {
		"title" : "30%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 27,
	"facetTickerSymbol" : "AZN",
	"facetName" : "Astrazeneca PLC",
	"PercentNum" : 30,
	"facetQty" : 1.050420168067227,
	"ETFVersionId" : 0,
	"parent" : "Foreign Growth v.1"
}, {
	"mietfSymbol" : {
		"title" : "Johnson & Johnson"
	},
	"mietfPercent" : {
		"title" : "15%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 28,
	"facetTickerSymbol" : "JNJ",
	"facetName" : "Johnson & Johnson",
	"PercentNum" : 15,
	"facetQty" : 0.13813426650704486,
	"ETFVersionId" : 0,
	"parent" : "Foreign Growth v.1"
}, {
	"mietfSymbol" : {
		"title" : "General Electric Company"
	},
	"mietfPercent" : {
		"title" : "10%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 29,
	"facetTickerSymbol" : "GE",
	"facetName" : "General Electric Company",
	"PercentNum" : 10,
	"facetQty" : 0.3202049311559398,
	"ETFVersionId" : 0,
	"parent" : "Foreign Growth v.1"
}, {
	"mietfSymbol" : {
		"title" : "Cash"
	},
	"mietfPercent" : {
		"title" : "20%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 35,
	"facetTickerSymbol" : "Cash",
	"facetName" : "$",
	"PercentNum" : 20,
	"facetQty" : 2000,
	"ETFVersionId" : 0,
	"parent" : "Big Pharma v.1"
}, {
	"mietfSymbol" : {
		"title" : "Cash"
	},
	"mietfPercent" : {
		"title" : "100%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 25,
	"facetTickerSymbol" : "Cash",
	"facetName" : "$",
	"PercentNum" : 100,
	"facetQty" : 10000,
	"ETFVersionId" : 0,
	"parent" : "Renaissance v.1"
}, {
	"mietfSymbol" : {
		"title" : "Johnson & Johnson"
	},
	"mietfPercent" : {
		"title" : "20%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 32,
	"facetTickerSymbol" : "JNJ",
	"facetName" : "Johnson & Johnson",
	"PercentNum" : 20,
	"facetQty" : 0.18417902200939312,
	"ETFVersionId" : 0,
	"parent" : "Big Pharma v.1"
}, {
	"mietfSymbol" : {
		"title" : "Astrazeneca PLC"
	},
	"mietfPercent" : {
		"title" : "20%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 33,
	"facetTickerSymbol" : "AZN",
	"facetName" : "Astrazeneca PLC",
	"PercentNum" : 20,
	"facetQty" : 0.7002801120448179,
	"ETFVersionId" : 0,
	"parent" : "Big Pharma v.1"
}, {
	"mietfSymbol" : {
		"title" : "Bristol-Myers Squibb Company"
	},
	"mietfPercent" : {
		"title" : "20%"
	},
	"rowbottom" : {},
	"jctFacetETFId" : 34,
	"facetTickerSymbol" : "BMY",
	"facetName" : "Bristol-Myers Squibb Company",
	"PercentNum" : 20,
	"facetQty" : 0.3031681067151736,
	"ETFVersionId" : 0,
	"parent" : "Big Pharma v.1"
}]; 