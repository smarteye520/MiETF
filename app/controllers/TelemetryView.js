var args = $.args;

var parent = args.parent;

var rs = [];
var buttons = [];
var greyView1s = [];
var greyView2s = [];
var buttonLbls = [];

//elements from view
var self = $.self;
var pieTitleLabel = $.pieTitleLabel;
var chartPeriod = $.chartPeriod;
var mietfNameLbl = $.mietfNameLbl;
var ComponentsTblView = $.ComponentsTblView;
var startDateLbl1 = $.startDateLbl1;
var startDateLbl2 = $.startDateLbl2;
var startValueLbl = $.startValueLbl;
var endValueLbl = $.endValueLbl;
var percentageChangeLbl = $.percentageChangeLbl;
var highLowLbl = $.highLowLbl;
var endDateLbl = $.endDateLbl;

/** animations **/
var showView = Titanium.UI.createAnimation();
showView.left = 0;
showView.duration = 500;
showView.delay = 500;

var hideView = Titanium.UI.createAnimation();
hideView.left = '110%';
hideView.duration = 500;

init();

/*** Events ***/
Ti.App.addEventListener('clearTelemetry', handlerClearTelemetry);
Ti.App.addEventListener('updateTelemetry', handlerUpdateTelemetry);
Ti.App.addEventListener('updateTelemetryPercentage', handlerUpdateTelemetryPercentage);
Ti.App.addEventListener('updateTelemetryhighLow', handlerUpdateTelemetryhighLow);
$.closeButton.addEventListener('click', function(e) {
	parent.flipOver();
});

hideView.addEventListener('complete', resetOnClose);

/*** FUNCTIONS ***/
function init() {
	updateView();
}

function updateView() {
	$.whiteView.borderRadius = imgs.whiteViewBorderRadius;
	//$.baseImage.left = -32;
	
	$.closeButton.width = imgs.closeButtonWidth;
	$.closeButton.height = imgs.closeButtonHeight;
	$.closeButton.backgroundImage = imgs.closeButtonBackgroundImage;
}

function handlerClearTelemetry() {
	$.itemsTable.removeAllChildren();
	
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
	//endDateLbl.text = '';

	buttons = [];
	greyView1s = [];
	greyView2s = [];
	buttonLbls = [];
	
}

function updateTelemetryTitle(title) {
	pieTitleLabel.text = title;
}
exports.updateTelemetryTitle = updateTelemetryTitle;

function slideIn(e) {
	self.animate(showView);
}
exports.slideIn = slideIn;

function slideOut(e) {
	self.animate(hideView);
}
exports.slideOut = slideOut;

function resetOnClose() {
	parent.remove(self);
};


function handlerUpdateTelemetry(e) {
	Ti.API.info('updateTelemetry : ' + e.ETFVersionId);
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
	Ti.API.info("rs");
	Ti.API.info(e);
	//Ti.API.info(rs);
	_.sortBy(rs, function(o) {
		return o.parent;
	});
	Ti.API.info('getMietfComponentsChartResursive:' + JSON.stringify(rs));
	
	$.itemsTable.height = ( (rs.length +1) * 40);
	var colorCount = 0;
	
	$.itemsTable.width = 460;
	
	//add dates row
	var paramDates = [e.firstRowDate, e.lastRowDate];
	var telemetryDateRow = Alloy.createController("telemetry/TelemetryStockDateItemView", {dates: paramDates});
	$.itemsTable.add( telemetryDateRow.getView() );
	
	for ( i = 0; i < rs.length; i++) {
		Ti.API.info("i:" + i + ' ' + rs[i].facetTickerSymbol);
		if (rs[i].facetTickerSymbol === 'Cash') {
			colorCount = 0;
			cnt = getMietfComponentCountById(rs[i].ETFVersionId);
			rs[i].facetTickerSymbol = rs[i].parent + ' - ' + rs[i].facetTickerSymbol;
		}
		var top = ((i+1) * 40);
		colorCount++;
			
		var telemetryStockItem = Alloy.createController("TelemetryStockItemView", {top: top, colorCount: colorCount, rs: rs[i], pos: i, e: e});
		$.itemsTable.add( telemetryStockItem.getView() );
	}
}

function handlerUpdateTelemetryPercentage(e) {
	if ( typeof e.lastMiETFPercentage == 'undefined') {
	} else {
		percentageChangeLbl.text = 'Percentage Change: ' + e.lastMiETFPercentage.toFixed(1) + '%';
	}
}

function handlerUpdateTelemetryhighLow(e) {
	if ( typeof e.highPointPercentage == 'undefined') {
	} else {
		highLowLbl.text = 'High/Low Percentage Change: ' + e.highPointPercentage.toFixed(1) + '%/' + e.lowPointPercentage.toFixed(1) + '%';
	}
};


// this it's not used anymore I'm using handlerUpdateTelemetry
function handlerUpdateTelemetry1(e) {
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
	
	// end handlerUpdateTelemetry
}
