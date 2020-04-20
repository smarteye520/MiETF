function chartSelector(_args) {

	var self = Ti.UI.createView({
		height : 416,
		width : 128,
		bottom : _args.bottom,
		left : _args.left,
		backgroundColor : 'transparent',
		zIndex : 50
	});

	var PercentageLabels = new Array();

	var Line = Ti.UI.createView({
		height : 416 - 24,
		width : 2,
		bottom : 24,
		backgroundColor : '#808183'
	});

	self.add(Line);

	if (_args.showPercentageLabel) {

		for ( i = 0; i < 20; i++) {
			PercentageLabels[i] = Ti.UI.createLabel({
				color : 'black',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '11sp',
					fontWeight : 'bold'
				},
				text : '',
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false,
				top : -50,
				left : 66,
				width : 62,
				height : 24,
				backgroundImage : 'images/ifapps/paperSquare.pn8',
				borderRadius : 8,
				borderWidth: 2,
				opacity : 0
			});
			self.add(PercentageLabels[i]);

		}

	}
	var percentageFinderButton = Titanium.UI.createButton({
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius : 10,
		backgroundGradient : {
			type : 'linear',
			colors : ['#434244', '#808183'],
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
		borderColor : '#222',
		width : 128,
		height : 24,
		bottom : 0,
		touchEnabled : false
	});

	var touchArea = Ti.UI.createView({
		bottom : 0,
		height : 40,
		width : 128
	});

	self.add(touchArea);

	var anythingwaschanged = false;
	var eRowIndex = Ti.App.Properties.getInt('chartDatePeriodIndex');

	if (_args.type == 'dateSelector') {
		var percentageFinderButtonText = 'Invested ' + mietf.chartChoices[mietf.chartDatePeriodIndex];
	} else {
		var percentageFinderButtonText = _args.text;
	};

	var percentageFinderButtonLabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '11sp',
			fontWeight : 'bold'
		},
		text : percentageFinderButtonText,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		touchEnabled : false
	});

	percentageFinderButton.add(percentageFinderButtonLabel);
	touchArea.add(percentageFinderButton);

	var anythingwaschanged = false;
	var eRowIndex = Ti.App.Properties.getInt('chartDatePeriodIndex');

	if (_args.type == 'dateSelector') {

		Ti.App.addEventListener('closeSlider', function(e) {
            Ti.API.info('ChartSelector closeSlider');
            
            if (typeof popover != 'undefined' && popover != null && popover.fromStrategy) {
				 return;
		      }
				
			try {

				var goSmall = Ti.UI.createAnimation({
					duration : 500,
					height : 0,
					bottom: 0
				});
				goSmall.addEventListener('complete', function(e) {
					if (typeof popover != 'undefined' && popover != null) {
						self.remove(popover);
					}
					//findme

					if (Ti.App.Properties.getInt('chartDatePeriodIndex') != eRowIndex) {
						eRowIndex = Ti.App.Properties.getInt('chartDatePeriodIndex');
						anythingwaschanged = true;
					}
					if (anythingwaschanged) {
						_args.parent.updateCanvasFullWithData();

						Ti.App.fireEvent('chartPeriodChange', {});
					}
					anythingwaschanged = false;

				});
				if (typeof popover != 'undefined' && popover != null) {
					popover.goSmall();
				}

				var percentageFinderButtonText = 'Invested ' + mietf.chartChoices[mietf.chartDatePeriodIndex];
				percentageFinderButtonLabel.text = percentageFinderButtonText;
				Ti.App.Properties.setInt('chartDatePeriodIndex', mietf.chartDatePeriodIndex);
				Ti.App.Properties.setString('chartDatePeriod', mietf.chartKeys[mietf.chartDatePeriodIndex]);
				mietf.chartDatePeriod = mietf.chartKeys[mietf.chartDatePeriodIndex];
				if (typeof popover != 'undefined' && popover != null) {
					popover.animate(goSmall);
				}

			} catch (err) {
				Ti.API.error('error:' + JSON.stringify(err));
			}

		});

		touchArea.addEventListener('click', function(e) {

			var Popover = require('investmentSlider');
			popover = new Popover({parent:self});

			//popover.show({ view: e.source});

			self.add(popover);

			popover.goLarge();

			/*
			popover.addEventListener('hide', function(e) {
			if (Ti.App.Properties.getInt('chartDatePeriodIndex') != eRowIndex) {
			eRowIndex = Ti.App.Properties.getInt('chartDatePeriodIndex') ;
			anythingwaschanged = true;
			}
			if (anythingwaschanged) {
			_args.parent.updateCanvasFullWithData();

			Ti.App.fireEvent('chartPeriodChange', {});
			}
			anythingwaschanged = false;
			});

			*/

			/*
			picker.addEventListener('change',function(e){
			percentageFinderButtonLabel.text = 'Invested ' + mietf.chartChoices[e.rowIndex];
			Ti.App.Properties.setInt('chartDatePeriodIndex', e.rowIndex);
			mietf.chartDatePeriodIndex = e.rowIndex;
			Ti.App.Properties.setString('chartDatePeriod', mietf.chartKeys[e.rowIndex]);
			mietf.chartDatePeriod = mietf.chartKeys[e.rowIndex];

			});

			*/

			//picker.setSelectedRow(0,mietf.chartDatePeriodIndex, true);

		});

	}

	Ti.App.addEventListener('updateValue', function(e) {

		for ( i = 0; i < saveLastPercentages.length; i++) {

			var investment = e.investNum;
			var vText = '$' + numberWithCommas(((((saveLastPercentages[i] * 10) / 10) + 100) * (investment / 100)).toFixed(0)) + '';

			PercentageLabels[i].text = vText;

		}
	});

	Ti.App.addEventListener('updateValue1', function(e) {

		for ( i = 0; i < saveLastPercentages.length; i++) {
			var investment = getInvestment(mietf.ETFVersionId);
			var vText = '$' + numberWithCommas(((((saveLastPercentages[i] * 10) / 10) + 100) * (investment / 100)).toFixed(0)) + '';

			PercentageLabels[i].text = vText;

		}
	});

	var saveLastPercentages = new Array();

	self.updateLabels = function(_args) {

		var sortableArray = new Array();

		for ( i = 0; i < _args.lastPercentage.length; i++) {

			saveLastPercentages[i] = _args.lastPercentage[i];

			var investment = getInvestment(mietf.ETFVersionId);
			var vText = '$' + numberWithCommas(((((saveLastPercentages[i] * 10) / 10) + 100) * (investment / 100)).toFixed(2));

			PercentageLabels[i].text = vText;
			PercentageLabels[i].borderColor = _args.lastPercentageColor[i];
			PercentageLabels[i].borderWidth = _args.lastPercentageStrokeWidth[i];

			if (PercentageLabels[i].text == '$NaN') {
				PercentageLabels[i].text = '';
			} else {
				animation.fadeIn(PercentageLabels[i], 500);
			}
			sortableArray.push({
				top : Math.max(_args.lastY[i] - 108, 0),
				label : PercentageLabels[i]
			});
		}

		var sortedArray = sortableArray.sort(compare);

		function compare(a, b) {
			if (a.top < b.top)
				return -1;
			if (a.top > b.top)
				return 1;
			return 0;
		}

		var lastTop = -5000;
		var thisTop = -5000;

		for ( i = 0; i < _args.lastPercentage.length; i++) {
			PercentageLabels[i].top = 1000;
		}

		for ( i = 0; i < sortedArray.length; i++) {
			var thisTop = sortedArray[i].top;
			if (thisTop < lastTop + 24)
				thisTop = lastTop + 24;
			sortedArray[i].label.top = thisTop;
			lastTop = thisTop;
		};

	};

	self.zeroLabels = function() {

		for ( i = 0; i < 20; i++) {
			PercentageLabels[i].text = '';
			PercentageLabels[i].opacity = 0;
		}

	};
   
	self.updateParent = function() {
		eRowIndex = Ti.App.Properties.getInt('chartDatePeriodIndex');
		mietf.chartChoices = Titanium.App.Properties.getList("chartChoices");
    _args.parent.updateCanvasFullWithData();
    Ti.App.fireEvent('chartPeriodChange', {});
    var percentageFinderButtonText = 'Invested ' + mietf.chartChoices[mietf.chartDatePeriodIndex];
		percentageFinderButtonLabel.text = percentageFinderButtonText;
		Ti.App.Properties.setInt('chartDatePeriodIndex', mietf.chartDatePeriodIndex);
		Ti.App.Properties.setString('chartDatePeriod', mietf.chartKeys[mietf.chartDatePeriodIndex]);
		mietf.chartDatePeriod = mietf.chartKeys[mietf.chartDatePeriodIndex];
  };
  
	return self;
};

module.exports = chartSelector; 