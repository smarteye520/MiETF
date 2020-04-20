function mietfGraph(_args) {
	try {
		var self = Ti.UI.createView({
			top : 544,
			left : 0,
			width : 768,
			height : 544,
			opacity : 1,
			backgroundImage : 'images/ifapps/paperBottom.pn8',
			//backgroundColor: 'blue',
			mietfID : _args.mietfID,
			portfolioId : _args.portfolioId
		});

		//mietf.vaultColorDictionary[ vault.vaultNum-1].color;

		//green,    purple,     green,    blue,    pink,    orange/peach, yellow
		var IndexStrokeColors = ['#88cc55', '#d87cfc', '#88cc55', '#2d9bd9', '#ef92b4', '#f6946e', '#f6bc2c', '#35c6d2', '#2dbd26'];

		var graphTitleButton = Titanium.UI.createButton({
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
			borderColor : '#666',
			width : 288,
			height : 48,
			top : 32,
			left : 32
		});

		var graphTitleText = 'Test';

		var graphTitleLabel = Ti.UI.createLabel({
			color : 'white',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '22sp',
				fontWeight : 'bold'
			},
			text : graphTitleText,
			textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
			touchEnabled : false,
			height : 48,
			top : 32,
			left : 48
		});

		var canvasMask = Ti.UI.createView({
			width : 768,
			height : 544,
			zIndex : 1,
			left : 0
			//backgroundColor: mietf.currentVaultColor
		});

		self.add(canvasMask);

		var DottedLine = require('chartDottedLine');

		//Ti.App.Properties.getString('chartDatePeriod', '6month');
		//6month assumed for now

		var periods = 6;
		var dottedL = new Array();
		for ( i = 0; i < (periods - 1); i++) {
			dottedL[i] = new DottedLine({
				parent : self,
				bottom : 32,
				left : 96 + (i + 1) * (576 / (periods)) // 96 to 544
			});

			canvasMask.add(dottedL[i]);

		}

		canvasMask.add(mietf.canvas);

		var ChartZeroLine = require('chartZeroLine'),
		    chartZeroLine = new ChartZeroLine({
			bottom : 50
		});

		self.add(chartZeroLine);

		var lastPercentage = new Array();
		var lastPercentageColor = new Array();
		var lastPercentageStrokeWidth = new Array();
		var lastY = new Array();
		var lastCounter = 0;

		var PercentageFinder = require('chartSelector'),
		    percentageFinder = new PercentageFinder({
			parent : self,
			bottom : 32,
			left : 608,
			text : 'Value Today',
			showPercentageLabel : true,
			lastPercentage : lastPercentage,
			lastPercentageColor : lastPercentageColor,
			lastPercentageStrokeWidth : lastPercentageStrokeWidth,
			lastY : lastY,
			lastMiETFPercentage : 0,
			lastPrevPercentage : 0,
			lastDowPercentage : 0,
			lastNasdaqPercentage : 0,
			lastComparisonPercentage : 0,
			lastSPPercentage : 0,
			type : 'percentageFinder',
			zIndex : 1
		});
		self.add(percentageFinder);

		var DateRange = require('chartSelector'),
		    dateRange = new DateRange({
			parent : self,
			bottom : 32,
			left : 32,
			text : '6 months ago',
			showPercentageLabel : false,
			type : 'dateSelector',
			zIndex : 2
		});
		self.add(dateRange);

		var tempMietfData = [];
		var tempMietfPrevious = [];
		var tempData = [];
		var comparisonData = [];
		var highLow = [];

		var detailedLogging = false;

		function updateCanvas(_args) {
			if (detailedLogging)
				Ti.API.info('uc: updateCanvas start');

			////dottedL

			for ( i = 0; i < dottedL.length; i++) {
				canvasMask.remove(dottedL[i]);
			}

			var chartDatePeriod = Ti.App.Properties.getString('chartDatePeriod', '6month');
			mietf.chartDatePeriod = chartDatePeriod;
			
			periods = 6;
			if (chartDatePeriod == '6month')
				periods = 6;
			else if (chartDatePeriod == '1year')
				periods = 6;
			else if (chartDatePeriod == '2year')
				periods = 8;
			else if (chartDatePeriod == '3year')
				periods = 6;
			else if (chartDatePeriod == '4year')
				periods = 8;
			else
				periods = parseInt(chartDatePeriod.replace('year', ''));

			dottedL = new Array();
			for ( i = 0; i < (periods - 1); i++) {
				dottedL[i] = new DottedLine({
					parent : self,
					bottom : 32,
					left : 96 + (i + 1) * (576 / (periods)) // 96 to 544
				});

				canvasMask.add(dottedL[i]);

			}

			if (detailedLogging)
				Ti.API.info('uc: done dotted lines');

			var vaultColorIndex = 0;
			var vaultSkipColor = (vault.vaultNum - 1);

			var colorIndex = -1;
			function getGraphColor() {
				colorIndex++;
				return mietf.vaultColorDictionary[mietf.graphIndexColor[colorIndex]].color;
			}


			self.mietfID = getETFFromVersion(mietf.ETFVersionId);
			lastPercentage = new Array();
			lastPercentageColor = new Array();
			lastPercentageStrokeWidth = new Array();
			lastY = new Array();
			lastCounter = 0;

			var startUpdateCanvas = new Date();

			var divisor = _args.divisor;
			var updateData = _args.updateData;

			//Some of this code respects jcMarketIndex, some is hard coded - check it all again.

			var strokeColor = mietf.getNextRainbowColor();
			var constXOffset = 96 / divisor;
			var constYOffset = 96 / divisor;
			var graphData;

			graphData = getGraphData(mietf.ETFVersionId, mietf.chartDatePeriod);
			
			if (detailedLogging)
				Ti.API.info('uc: done get graphData');
			highLow = tempGetHighLowPointPercentageByMiETFId(mietf.ETFVersionId, mietf.chartDatePeriod, graphData, true);
			if (detailedLogging)
				Ti.API.info('uc: done get highLow');

			var lowPointPercentage = highLow.lowPointPercentage;
			var highPointPercentage = highLow.highPointPercentage;
			if (lowPointPercentage == highPointPercentage) {
				lowPointPercentage = lowPointPercentage - 1;
				highPointPercentage = highPointPercentage + 1;
			}

			Ti.API.info('highLow ' + JSON.stringify(highLow));
			var percentageDistance = highPointPercentage - lowPointPercentage;
			var constGraphYDistance = (362) / divisor;
			if (percentageDistance == 0)
				percentageDistance = 1;
			//don't want infinity
			var YpixelPerPercentagePoint = constGraphYDistance / percentageDistance;

			var constGraphXDistance = 576 / divisor;

			var lastDowPercentage;
			var lastNasdaqPercentage;
			var lastSPPercentage;
			var lastMiETFPercentage;
			var lastPrevPercentage;
			var lastComparisonPercentage;

			var lastDowY;
			var lastNasdaqY;
			var lastSPY;
			var lastMiETFY;
			var lastPrevY;
			var lastComparisonY;

			var StartingPointY = 0;
			var StartingPointX = 0;
			var realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
			//if graph only goes up, lowPointPercentage is 0
			var XStrokeColorSave = 0;
			var YStrokeColorSave = 0;

			var constMietfLineWidth = 4 / divisor;
			var dowId = 1;
			var nasdaqId = 2;
			mietf.canvas.begin();

			var realX = 0 + constXOffset;
			//of course this equals zero, sanity check
			var saveX = realX;
			var saveY = realY;
			mietf.canvas.begin();
			if (detailedLogging)
				Ti.API.info('uc: canvas begin');

			var xX = 0;
			var yY = 0;

			//mietf.canvas.drawImage(0, 0, 768, 544, Ti.Filesystem.getFile('images/ifapps/paperBottom.pn8'));
			//mietf.canvas.stroke();

			var mietfCompArray = getComparison();
			if (detailedLogging)
				Ti.API.info('uc: done getComparison var loaded');

			//#################################Market Indexes #############################################################
			if (detailedLogging)
				Ti.API.info('uc: check if market indexes exist');
			if (MarketIndexesExistByMietfId(self.mietfID)) {

				var marketIndexes = getMarketIndexesByMietfId(self.mietfID);
				if (detailedLogging)
					Ti.API.info('uc: market indexes do exist, about to start loop');
				for ( counter = marketIndexes.length - 1; counter >= 0; counter--) {

					j = marketIndexes[counter].marketIndexId;

					if (updateData)
						tempData[j - 1] = TempGetIndexDataById(j, mietf.chartDatePeriod);

					var XpixelPerDataPoint = constGraphXDistance / (tempData[j - 1].length - 1);
					//btw, for now, in the future they aren't equidistant
					var realX = Math.round(StartingPointX * XpixelPerDataPoint) + constXOffset;
					//of course this equals zero, sanity check
					var realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
					//if graph only goes up, lowPointPercentage is 0

					mietf.canvas.lineWidth(2 / divisor);
					var strokeColor = getGraphColor();
					mietf.canvas.strokeStyle(strokeColor);

					if (detailedLogging)
						Ti.API.info('uc: next step is moveTo, with values saveX,SaveY:' + saveX + ',' + saveY);
					mietf.canvas.moveTo(saveX, saveY);

					for ( i = 0; i < tempData[j - 1].length; i++) {

						if (i == 0) {
							startingValue = tempData[j-1][i][1];
						}
						StartingPointY = ((tempData[j-1][i][1] / startingValue) * 100) - 100;

						//HERE
						if (j == 1)
							lastDowPercentage = StartingPointY;
						if (j == 2)
							lastNasdaqPercentage = StartingPointY;
						if (j == 3)
							lastSPPercentage = StartingPointY;

						lastPercentage[lastCounter] = StartingPointY;
						lastPercentageColor[lastCounter] = strokeColor;
						lastPercentageStrokeWidth[lastCounter] = 2;

						StartingPointX = i;
						realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
						//if graph only goes up, lowPointPercentage is 0
						realX = Math.round(StartingPointX * XpixelPerDataPoint) + constXOffset;

						if (detailedLogging)
							Ti.API.info('uc: next step is lineTo, with values realX,realY:' + realX + ',' + realY);
						if (xX != realX) {
							mietf.canvas.lineTo(realX, realY);
							//Ti.API.info(j +' realX : '+ realX + ' realY : '+realY);
						}
						xX = realX;
						yY = realY;

						//HERE
						if (j == 1)
							lastDowY = realY;
						if (j == 2)
							lastNasdaqY = realY;
						if (j == 3)
							lastSPY = realY;

						lastY[lastCounter] = realY;
					}
					lastCounter++;

					if (detailedLogging)
						Ti.API.info('uc: next step is stroke');
					mietf.canvas.stroke();

					/////////////END Loop
					xX = 0;
					yY = 0;

				}

			}

			///#########################################Comparison MiETF####################################################

			//foreach
			// how many?

			if (mietfCompArray.length > 0) {
				var compStrokeColor = getGraphColor();

			}

			if (detailedLogging)
				Ti.API.info('uc: if mietfCompArray is more than zero, start comp loop.  mietfCompArray.length: ' + mietfCompArray.length);
			for ( loopI = 0; loopI < mietfCompArray.length; loopI++) {

				comparisonData = getComparisonGraphData(mietfCompArray[loopI], graphData);
				//comparisonData = TempGetMietfDataById(comparisonMietf, mietf.chartDatePeriod);

				var XpixelPerDataPoint = constGraphXDistance / (comparisonData.length - 1);
				//btw, for now, in the future they aren't equidistant

				var StartingPointY = 0;
				var StartingPointX = 0;
				var realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
				//if graph only goes up, lowPointPercentage is 0
				var XStrokeColorSave = 0;
				var YStrokeColorSave = 0;

				var constMietfLineWidth = 2 / divisor;
				var dowId = 1;
				var nasdaqId = 2;

				var realX = 0 + constXOffset;
				//of course this equals zero, sanity check
				var saveX = realX;
				var saveY = realY;

				mietf.canvas.lineWidth(constMietfLineWidth);

				mietf.canvas.strokeStyle(compStrokeColor);

				XStrokeColorSave = realX;
				YStrokeColorSave = realY;

				if (detailedLogging)
					Ti.API.info('uc: about to moveTo realX,realY:' + realX + ',' + realY);
				mietf.canvas.moveTo(realX, realY);
				Ti.API.info('comparisonData ' + JSON.stringify(comparisonData));
				for ( i = 0; i < comparisonData.length; i++) {
					if (i == 0)
						startingValue = comparisonData[i][1];
					StartingPointY = ((comparisonData[i][1] / startingValue) * 100) - 100;
					lastComparisonPercentage = StartingPointY;
					//strangelynamed percentage value
					lastPercentage[lastCounter] = StartingPointY;
					lastPercentageColor[lastCounter] = compStrokeColor;
					lastPercentageStrokeWidth[lastCounter] = constMietfLineWidth;

					StartingPointX = i;
					realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
					//if graph only goes up, lowPointPercentage is 0
					realX = Math.round(StartingPointX * XpixelPerDataPoint) + constXOffset;

					if (XStrokeColorSave != realX) {
						if (detailedLogging)
							Ti.API.info('uc: about to stroke');
						mietf.canvas.stroke();
						//draw what you have so far

						//and set up change
						mietf.canvas.lineWidth(constMietfLineWidth);

						mietf.canvas.strokeStyle(compStrokeColor);
						mietf.canvas.lineCap('round');
						if (detailedLogging)
							Ti.API.info('uc: about to moveTo XStrokeColorSave, YStrokeColorSave:' + XStrokeColorSave + ',' + YStrokeColorSave);
						mietf.canvas.moveTo(XStrokeColorSave, YStrokeColorSave);
						XStrokeColorSave = realX;
						YStrokeColorSave = realY;
						if (detailedLogging)
							Ti.API.info('uc: about to lineTo realX, realY: ' + realX + ',' + realY);
						mietf.canvas.lineTo(realX, realY);

					} else {
						if (detailedLogging)
							Ti.API.info('uc: in else clause about to lineTo realX, realY: ' + realX + ',' + realY);
						if (xX != realX)
							mietf.canvas.lineTo(realX, realY);
						xX = realX;
						yY = realY;

					}
					lastComparisonY = realY;
					lastY[lastCounter] = realY;
				}
				lastCounter++;
				if (detailedLogging)
					Ti.API.info('uc: about to stroke');
				mietf.canvas.stroke();

			}

			//////###########################THIS IS MiETFPrevious ###################################################

			//foreach
			// how many?
			//var mietfPrevArray = getPrevious();
			var mietfPrevArray = new Array();

			//nuked previous per Michael

			for ( loopI = 0; loopI < mietfPrevArray.length; loopI++) {
				tempMietfPrevious = getPrevGraphData(mietfPrevArray[loopI], graphData);

				var XpixelPerDataPoint = constGraphXDistance / (tempMietfPrevious.length - 1);

				var StartingPointY = 0;
				var StartingPointX = 0;
				var realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
				//if graph only goes up, lowPointPercentage is 0
				var XStrokeColorSave = 0;
				var YStrokeColorSave = 0;

				var constMietfLineWidth = 4 / divisor;
				var dowId = 1;
				var nasdaqId = 2;
				var startingValue;

				var realX = 0 + constXOffset;
				var saveX = realX;
				var saveY = realY;
				mietf.resetRainbowColors();

				mietf.canvas.lineWidth(constMietfLineWidth);
				strokeColor = mietf.getNextGreyColorForGraph();
				if (divisor == 2)
					strokeColor = mietf.getNextGreyColorForGraph();
				//get twice on half graph

				mietf.canvas.strokeStyle(strokeColor);
				mietf.canvas.lineCap('round');

				XStrokeColorSave = realX;
				YStrokeColorSave = realY;
				mietf.canvas.moveTo(realX, realY);
				for ( i = 0; i < tempMietfPrevious.length; i++) {
					if (i == 0) {
						startingValue = tempMietfPrevious[i][1];
					}
					Ti.API.info('loopI:' + loopI + ', tempMietfPrevious[i][1]:' + tempMietfPrevious[i][1] + ', firstValue:' + startingValue);
					StartingPointY = ((tempMietfPrevious[i][1] / startingValue) * 100) - 100;
					lastPrevPercentage = StartingPointY;
					lastPercentage[lastCounter] = StartingPointY;
					lastPercentageColor[lastCounter] = strokeColor;
					lastPercentageStrokeWidth[lastCounter] = constMietfLineWidth;

					StartingPointX = i;
					realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
					//if graph only goes up, lowPointPercentage is 0
					realX = Math.round(StartingPointX * XpixelPerDataPoint) + constXOffset;

					if (XStrokeColorSave != realX) {

						mietf.canvas.stroke();
						//draw what you have so far

						//and set up change
						mietf.canvas.lineWidth(constMietfLineWidth);
						strokeColor = mietf.getNextGreyColorForGraph();
						if (divisor == 2)
							strokeColor = mietf.getNextGreyColorForGraph();

						mietf.canvas.strokeStyle(strokeColor);
						mietf.canvas.lineCap('round');
						mietf.canvas.moveTo(XStrokeColorSave, YStrokeColorSave);
						XStrokeColorSave = realX;
						YStrokeColorSave = realY;
						mietf.canvas.lineTo(realX, realY);

					} else {
						if (xX != realX)
							mietf.canvas.lineTo(realX, realY);
						xX = realX;
						yY = realY;

					}
					lastPrevY = realY;
					lastY[lastCounter] = realY;
				}
				lastCounter++;

				mietf.canvas.stroke();

				/////////////End MiETF Previous
			}
			//####################################### MiETF no Strategy below########################################################
			//drawing the main MiETF's shadow line
			if (detailedLogging)
				Ti.API.info('uc: starting main MiETF shadow line');
			tempMietfData = getETFGraphData(graphData);
			var XpixelPerDataPoint = constGraphXDistance / (tempMietfData.length - 1);
			//btw, for now, in the future they aren't equidistant

			var StartingPointY = 0;
			var StartingPointX = 0;
			var realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
			//if graph only goes up, lowPointPercentage is 0
			var XStrokeColorSave = 0;
			var YStrokeColorSave = 0;

			var constMietfLineWidth = 4 / divisor;
			var dowId = 1;
			var nasdaqId = 2;

			var realX = 0 + constXOffset;
			//of course this equals zero, sanity check
			var saveX = realX;
			var saveY = realY;

			//here1
			mietf.canvas.lineWidth(constMietfLineWidth);
			strokeColor = '#5f5f5f';
			//here2
			mietf.canvas.strokeStyle(strokeColor);
			mietf.canvas.lineCap('round');

			XStrokeColorSave = realX;
			YStrokeColorSave = realY;

			Ti.API.info('tempMietfData ' + JSON.stringify(tempMietfData));
			if (detailedLogging)
				Ti.API.info('black: about to moveTo realX, realY:' + realX + ',' + realY);
			mietf.canvas.moveTo(realX, realY);
			for ( i = 0; i < tempMietfData.length; i++) {
				if (i == 0) {
					startingValue = tempMietfData[i][1];
					Ti.API.info('startingValue ' + startingValue);
				}
				StartingPointY = ((tempMietfData[i][1] / startingValue) * 100) - 100;
				//Ti.API.info(Math.round(tempMietfData[i][1]) +'/' + startingValue + '==' +StartingPointY);
				lastMiETFPercentage = StartingPointY;
				//strangelynamed percentage value
				lastPercentage[lastCounter] = StartingPointY;
				lastPercentageColor[lastCounter] = strokeColor;
				lastPercentageStrokeWidth[lastCounter] = constMietfLineWidth;

				StartingPointX = i;
				realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint) + 2;
				//if graph only goes up, lowPointPercentage is 0
				realX = Math.round(StartingPointX * XpixelPerDataPoint) + constXOffset;

				if (XStrokeColorSave != realX) {
					//here4
					//if (detailedLogging)
					//	Ti.API.info('uc: about to Stroke');
					mietf.canvas.stroke();
					//draw what you have so far

					//and set up change
					//here5
					mietf.canvas.lineWidth(constMietfLineWidth);
					if (mietf.strategyNum == 768) {
						mietf.canvas.lineWidth(constMietfLineWidth + 2);
					}
					//strokeColor = mietf.getNextRainbowColorForGraph();
					//strokeColor = 'rgba(0, 0, 0, 1)';
					strokeColor = '#5f5f5f';
					mietf.canvas.strokeStyle(strokeColor);
					mietf.canvas.lineCap('round');
					//mietf.canvas.globalCompositeOperation('destination-out');
					//if (detailedLogging)
					//	Ti.API.info('uc: about to moveTo XStrokeColorSave, YStrokeColorSave:' + XStrokeColorSave + ',' + YStrokeColorSave);
					mietf.canvas.moveTo(XStrokeColorSave, YStrokeColorSave);
					XStrokeColorSave = realX;
					YStrokeColorSave = realY;
					if (detailedLogging)
						Ti.API.error('uc: about to lineTo realX, realY: ' + realX + ',' + realY);
					mietf.canvas.lineTo(realX, realY);

				} else {
					if (xX != realX)
						mietf.canvas.lineTo(realX, realY);
					//here9
					xX = realX;
					yY = realY;

				}
				if (mietf.strategyNum > 0) {
					lastPrevY = realY;
					lastY[lastCounter] = realY;
				}
			}
			if (mietf.strategyNum > 0)
				lastCounter++;
			if (detailedLogging)
				Ti.API.info('uc: about to stroke');
			mietf.canvas.stroke();
			//####################################### MiETF with Strategy below########################################################
			//drawing the main MiETF
			Ti.API.info('mietf.strategyNum ' + mietf.strategyNum);
			if (mietf.strategyNum == 0 || mietf.strategyNum == 768) {
				tempMietfData = getETFGraphData(graphData);
			} else if (mietf.strategyNum > 0) {
				tempMietfData = getETFStrategyData(graphData);
			}
			Ti.API.info(JSON.stringify(graphData));
			if (detailedLogging)
				Ti.API.info('uc: about to draw main MiETF, tempMietfData.length:' + tempMietfData.length);
			var XpixelPerDataPoint = constGraphXDistance / (tempMietfData.length - 1);
			//btw, for now, in the future they aren't equidistant

			var StartingPointY = 0;
			var StartingPointX = 0;
			var realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
			//if graph only goes up, lowPointPercentage is 0
			var XStrokeColorSave = 0;
			var YStrokeColorSave = 0;

			var constMietfLineWidth = 4 / divisor;
			var dowId = 1;
			var nasdaqId = 2;

			var realX = 0 + constXOffset;
			//of course this equals zero, sanity check
			var saveX = realX;
			var saveY = realY;
			mietf.resetRainbowColors();

			//here1
			mietf.canvas.lineWidth(constMietfLineWidth);
			strokeColor = mietf.getNextRainbowColorForGraph();
			if (divisor == 2)
				strokeColor = mietf.getNextRainbowColorForGraph();
			//get twice on half graph
			//here2
			mietf.canvas.strokeStyle(strokeColor);
			mietf.canvas.lineCap('round');

			XStrokeColorSave = realX;
			YStrokeColorSave = realY;
			//here3
			if (detailedLogging)
				Ti.API.info('uc: about to moveTo realX, realY:' + realX + ',' + realY);
			mietf.canvas.moveTo(realX, realY);
			for ( i = 0; i < tempMietfData.length; i++) {
				if (i == 0) {
					startingValue = tempMietfData[i][1];
					Ti.API.info('startingValue ' + startingValue);
				}
				StartingPointY = ((tempMietfData[i][1] / startingValue) * 100) - 100;

				//Ti.API.info(Math.round(tempMietfData[i][1]) +'/' + startingValue + '==' +StartingPointY);
				lastMiETFPercentage = StartingPointY;
				//strangelynamed percentage value
				lastPercentage[lastCounter] = StartingPointY;
				lastPercentageColor[lastCounter] = strokeColor;
				lastPercentageStrokeWidth[lastCounter] = constMietfLineWidth;

				StartingPointX = i;

				realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
				//if graph only goes up, lowPointPercentage is 0
				realX = Math.round(StartingPointX * XpixelPerDataPoint) + constXOffset;

				if (XStrokeColorSave != realX) {
					//here4
					//if (detailedLogging)
					//	Ti.API.info('uc: about to stroke');
					mietf.canvas.stroke();
					//draw what you have so far

					//and set up change
					//here5
					mietf.canvas.lineWidth(constMietfLineWidth);
					//strokeColor = mietf.getNextRainbowColorForGraph();
					//strokeColor = 'rgba(0, 0, 0, 1)';
					if (mietf.currentVaultColor == 'white')
						mietf.currentVaultColor = 'blue';
					if (mietf.currentVaultColor == 'rainbow') {
						mietf.currentVaultColor = 'blue';
					}
					strokeColor = mietf.currentVaultColor;
					//if (divisor == 2) strokeColor = mietf.getNextRainbowColorForGraph();
					mietf.canvas.strokeStyle(strokeColor);
					mietf.canvas.lineCap('round');
					//mietf.canvas.globalCompositeOperation('destination-out');
					//if (detailedLogging)
					//	Ti.API.info('uc: about to moveTo XStrokeColorSave, YStrokeColorSave ' + XStrokeColorSave + ',' + YStrokeColorSave);
					mietf.canvas.moveTo(XStrokeColorSave, YStrokeColorSave);
					XStrokeColorSave = realX;
					YStrokeColorSave = realY;
					if (detailedLogging)
						Ti.API.info('uc: about to lineTo realX,realY:' + realX + ',' + realY);
					mietf.canvas.lineTo(realX, realY);

				} else {
					if (xX != realX) {
						mietf.canvas.lineTo(realX, realY);
					}
					//here9
					xX = realX;
					yY = realY;

				}
				lastMiETFY = realY;
				lastY[lastCounter] = realY;
				
			}
			lastCounter++;
			if (detailedLogging)
				Ti.API.info('uc: about to stroke');
			mietf.canvas.stroke();

			if (divisor == 2) {
				chartZeroLine.halfSize();
				chartZeroLine.moveHalf(saveY);

			} else {
				chartZeroLine.fullSize();
				chartZeroLine.moveFull(saveY);

			}
			if (detailedLogging)
				Ti.API.info('uc: about to commit');

			mietf.canvas.commit();
			//hack

			if (detailedLogging)
				Ti.API.info('uc: about to addEventListener, is this a memory leak?');

			canvasMaskAnim.addEventListener('complete', function(e) {
				//canvasMask.width=768;
				//canvasRainbow.animate(goColorAnim);

				if (detailedLogging)
					Ti.API.info('uc: about to fire event updateTelemetryPercentage');
				Ti.App.fireEvent('updateTelemetryPercentage', {
					lastMiETFPercentage : lastMiETFPercentage
				});

				if (divisor == 1) {
					if (mietf.strategyNum == 768) {
						//lastPercentage[lastPercentage.length-2] = lastPercentage[lastPercentage.length-1];
					}
					percentageFinder.updateLabels({
						lastPercentage : lastPercentage,
						lastPercentageColor : lastPercentageColor,
						lastPercentageStrokeWidth : lastPercentageStrokeWidth,
						lastY : lastY,
						lastMiETFPercentage : lastMiETFPercentage,
						lastPrevPercentage : lastPrevPercentage,
						lastDowPercentage : lastDowPercentage,
						lastNasdaqPercentage : lastNasdaqPercentage,
						lastComparisonPercentage : lastComparisonPercentage,
						lastSPPercentage : lastSPPercentage,
						lastDowY : lastDowY,
						lastNasdaqY : lastNasdaqY,
						lastMiETFY : lastMiETFY,
						lastPrevY : lastPrevY,
						lastSPY : lastSPY,
						lastComparisonY : lastComparisonY
					});
				} else {

					percentageFinder.zeroLabels();

				}

			});

			var endUpdateCanvas = new Date();
			if (detailedLogging)
				Ti.API.info('uc: about to fire updateValue1');
			Ti.App.fireEvent('updateValue1', {});

			if (detailedLogging)
				Ti.API.info('uc: you have reached the end of the procedure');
		};

		var ChartLegend = require('chartLegend'),
		    chartLegend = new ChartLegend({
			parent : self,
			mietfID : self.mietfID,
			ETFVersionId : mietf.ETFVersionId,
			portfolioId : self.portfolioId
		});

		self.add(chartLegend);

		var ChartRestoreButton = require('chartRestoreButton'),
		    chartRestoreButton = new ChartRestoreButton({
			parent : self,
			ETFVersionId : mietf.ETFVersionId
		});

		self.add(chartRestoreButton);
		chartRestoreButton.setButton();

		var ChartReweighButton = require('chartReweighButton'),
		    chartReweighButton = new ChartReweighButton({
			index : _args.index,
			parent : self,
			ETFVersionId : mietf.ETFVersionId
		});

		self.add(chartReweighButton);

		self.updateRestoreButton = function(_args) {
			chartRestoreButton.setButton();
			chartReweighButton.setButton();
		};

		self.clear = function(_args) {
			//percentageFinder.zeroLabels();
			self.ETFVersionId = _args.ETFVersionId;
			chartRestoreButton.fullSize(_args.ETFVersionId);
			//clearCanvas({divisor: 1});
			graphTitleText = _args.title;
			graphTitleLabel.text = graphTitleText;
			//chartLegend.clear({mietfID : self.mietfID});
			Ti.App.fireEvent('clearTelemetry', {});
		};

		var canWidth = 672;

		var canvasMaskAnim = Ti.UI.createAnimation({
			duration : mietf.animGraphShow,
			width : canWidth
		});

		self.updateCanvasFullWithData = function(e) {
			mietf.strategyNum = getStrategyByETFVersionId(mietf.ETFVersionId);
			Ti.App.fireEvent('updateStrategyButton', {
				strategyNum : mietf.strategyNum
			});

			Ti.API.info('updateCanvasFullWithData start');
			var GraphOverlay = require('graphOverlay'),
			    graphOverlay = new GraphOverlay();

			Ti.API.info('about to add graphOverlay');
			self.add(graphOverlay);
			Ti.API.info('about to fade in graphOverlay');
			animation.fadeIn(graphOverlay, 500);

			try {
				Ti.API.info('about to fire event clearTelemetry');
				Ti.App.fireEvent('clearTelemetry', {});
				percentageFinder.zeroLabels();
				canvasMask.width = 96;
				percentageFinder.left = 32;
				var mietfId = getETFFromVersion(mietf.ETFVersionId);

				Ti.API.info('updateCanvasFullWithData about to chartLegend setFullSize');
				chartLegend.setFullSize({
					mietfID : mietfId,
					ETFVersionId : mietf.ETFVersionId
				});

				Ti.API.info('updateCanvasFullWithData about to updateCanvas');
				updateCanvas({
					divisor : 1,
					updateData : true,
					size : 'full'
				});
				Ti.API.info('updateCanvasFullWithData returned from updateCanvas');
				//animation.fadeOut(graphOverlay, 500, showGraph);
			} catch(e) {
				Ti.API.info(e);
			} finally {
				var fadeOutAnimation = Titanium.UI.createAnimation({
					opacity : 0,
					duration : 500,
					delay : 4000
				});
				Ti.API.info('updateCanvasFullWithData about to addEventListener complete showGraph');
				fadeOutAnimation.addEventListener('complete', showGraph);
				Ti.API.info('updateCanvasFullWithData about to fadeOut graphOverlay, on complete goes to showGraph');
				graphOverlay.animate(fadeOutAnimation);
			}

		};

		function showGraph(e) {
			Ti.API.info('updateCanvasFullWithData-> showGraph start');
			Ti.API.info('updateCanvasFullWithData about to animate canvasMask');
			canvasMask.animate(canvasMaskAnim);

			var perLeft = 608;

			Ti.API.info('about to animate percentageFinder');
			percentageFinder.animate(Ti.UI.createAnimation({
				duration : mietf.animGraphShow,
				left : perLeft
			}));
		};

		self.setFullSize = function(_args) {
			self.mietfID = _args.mietfID;
			chartRestoreButton.fullSize(mietf.ETFVersionId);
			dateRange.bottom = 32;
			dateRange.left = 32;

			percentageFinder.bottom = 32;
			percentageFinder.left = 32;

			//mietf.canvas.width = 768;
			//mietf.canvas.height = 544;
			self.left = 0;
			self.top = 544;
			//0;
			self.width = 768;
			self.height = 544;

			chartZeroLine.moveFull(-50);
			chartZeroLine.fullSize();

			graphTitleLabel.font = {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '22sp',
				fontWeight : 'bold'
			};
			graphTitleLabel.height = 48;
			graphTitleLabel.top = 32;
			graphTitleLabel.left = 48;

			graphTitleButton.borderRadius = 10;
			graphTitleButton.width = 288;
			graphTitleButton.height = 48;
			graphTitleButton.top = 32;
			graphTitleButton.left = 32;
			graphTitleButton.backgroundGradient = {
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
			};
			var mietfId = getETFFromVersion(mietf.ETFVersionId);
			chartLegend.setFullSize({
				mietfID : mietfId,
				ETFVersionId : mietf.ETFVersionId
			});

		};

		self.addEventListener('click', function(e) {
			//right now bottom equals 0 is what is unique about the slider
			if ( typeof e.source.bottom !== 'undefined') {
				if (!e.source.bottom == 0)
					Ti.App.fireEvent('closeSlider', {});
			} else {
				Ti.App.fireEvent('closeSlider', {});
			}
		});
	} catch(e) {
		Ti.API.info(e);
	}
	return self;
};

module.exports = mietfGraph;

//var comparisonData = [["2015-04-06", 10039.06, 10000000], ["2015-04-06", 10075.89, 10000000], ["2015-04-06", 10020.42, 10000000], ["2015-04-06", 10185.5, 10000000], ["2015-04-06", 10189.53, 10000000], ["2015-04-06", 10150.57, 10000000], ["2015-04-06", 10295.54, 10000000], ["2015-04-06", 10139.51, 10000000], ["2015-04-06", 10178.16, 10000000], ["2015-04-06", 10106, 10000000], ["2015-04-06", 10118.88, 10000000], ["2015-04-06", 10213.45, 10000000], ["2015-04-06", 10037.43, 10000000], ["2015-04-06", 10120.81, 10000000], ["2015-04-06", 10210.35, 10000000], ["2015-04-06", 10418.84, 10000000], ["2015-04-06", 10157.76, 10000000], ["2015-04-06", 10167.82, 10000000], ["2015-04-06", 10175.5, 10000000], ["2015-04-06", 10147.22, 10000000], ["2015-04-06", 9245.54, 10000000], ["2015-04-06", 9629.16, 10000000], ["2015-04-06", 9669.94, 10000000], ["2015-04-06", 9669.45, 10000000], ["2015-04-06", 9668.02, 10000000], ["2015-04-06", 9512.5, 10000000], ["2015-04-06", 9675.99, 10000000], ["2015-04-06", 9736.21, 10000000], ["2015-04-06", 9621.45, 10000000], ["2015-04-06", 9746.2, 10000000], ["2015-04-06", 9880.88, 10000000], ["2015-04-06", 9919.71, 10000000], ["2015-04-06", 9776.75, 10000000], ["2015-04-06", 9966.67, 10000000], ["2015-04-06", 9899.8, 10000000], ["2015-04-06", 9975.54, 10000000], ["2015-04-06", 9748.94, 10000000], ["2015-04-06", 9648.9, 10000000], ["2015-04-06", 9722.77, 10000000], ["2015-04-06", 9585.49, 10000000], ["2015-04-06", 9380.71, 10000000], ["2015-04-06", 9214.07, 10000000], ["2015-04-06", 9141.08, 10000000], ["2015-04-06", 9396.29, 10000000], ["2015-04-06", 8989.62, 10000000], ["2015-04-06", 9062.3, 10000000], ["2015-04-06", 9147.07, 10000000], ["2015-04-06", 9130.6, 10000000], ["2015-04-06", 9373.66, 10000000], ["2015-04-06", 9395.98, 10000000], ["2015-04-06", 9480.74, 10000000], ["2015-04-06", 9447.79, 10000000], ["2015-04-06", 9604.33, 10000000], ["2015-04-06", 9496, 10000000], ["2015-04-06", 9678.18, 10000000], ["2015-04-06", 9649.4, 10000000], ["2015-04-06", 9384.39, 10000000], ["2015-04-06", 9305.45, 10000000], ["2015-04-06", 9227.99, 10000000], ["2015-04-06", 9372.85, 10000000], ["2015-04-06", 9517.52, 10000000], ["2015-04-06", 9513.25, 10000000], ["2015-04-06", 9349.34, 10000000], ["2015-04-06", 9334.74, 10000000], ["2015-04-06", 9116.49, 10000000], ["2015-04-06", 9383.48, 10000000], ["2015-04-06", 9483.57, 10000000], ["2015-04-06", 9633.02, 10000000], ["2015-04-06", 9644.17, 10000000], ["2015-04-06", 9804.42, 10000000], ["2015-04-06", 9818.74, 10000000], ["2015-04-06", 9808.47, 10000000], ["2015-04-06", 9798.95, 10000000], ["2015-04-06", 9817.43, 10000000], ["2015-04-06", 9840.76, 10000000], ["2015-04-06", 9758.1, 10000000], ["2015-04-06", 9815.92, 10000000], ["2015-04-06", 9769.97, 10000000], ["2015-04-06", 9817.53, 10000000], ["2015-04-06", 9805.22, 10000000], ["2015-04-06", 9776.75, 10000000], ["2015-04-06", 9880.85, 10000000], ["2015-04-06", 9776.6, 10000000], ["2015-04-06", 9805.55, 10000000], ["2015-04-06", 10057.74, 10000000], ["2015-04-06", 10182.27, 10000000], ["2015-04-06", 10241.97, 10000000], ["2015-04-06", 10299.54, 10000000], ["2015-04-06", 10540.32, 10000000], ["2015-04-06", 10565.54, 10000000], ["2015-04-06", 10524.22, 10000000], ["2015-04-06", 10445.29, 10000000], ["2015-04-06", 10566.62, 10000000], ["2015-04-06", 10507.67, 10000000], ["2015-04-06", 10469.71, 10000000], ["2015-04-06", 10480.32, 10000000], ["2015-04-06", 10656.05, 10000000], ["2015-04-06", 10800.28, 10000000], ["2015-04-06", 11126.81, 10000000], ["2015-04-06", 11117.74, 10000000], ["2015-04-06", 11182.29, 10000000], ["2015-04-06", 11151.34, 10000000], ["2015-04-06", 11138.68, 10000000], ["2015-04-06", 11016.46, 10000000]];
//var tempMietfData =  [["2015-04-06",10039.06,10000000],["2015-04-06",10076.22,10000000],["2015-04-06",10020.47,10000000],["2015-04-06",10184.74,10000000],["2015-04-06",10189.98,10000000],["2015-04-06",10151.41,10000000],["2015-04-06",10295.76,10000000],["2015-04-06",10139.7,10000000],["2015-04-06",10178.25,10000000],["2015-04-06",10106.84,10000000],["2015-04-06",10120.12,10000000],["2015-04-06",10214.74,10000000],["2015-04-06",10038.87,10000000],["2015-04-06",10122.09,10000000],["2015-04-06",10211.91,10000000],["2015-04-06",10419.81,10000000],["2015-04-06",10160.17,10000000],["2015-04-06",10171.27,10000000],["2015-04-06",10178.63,10000000],["2015-04-06",10150.77,10000000],["2015-04-06",9249.68,10000000],["2015-04-06",9632.32,10000000],["2015-04-06",9673.17,10000000],["2015-04-06",9672.01,10000000],["2015-04-06",9670.56,10000000],["2015-04-06",9515.22,10000000],["2015-04-06",9679.49,10000000],["2015-04-06",9739.56,10000000],["2015-04-06",9625.07,10000000],["2015-04-06",9749.46,10000000],["2015-04-06",9883.28,10000000],["2015-04-06",9922.51,10000000],["2015-04-06",9780.64,10000000],["2015-04-06",9970.11,10000000],["2015-04-06",9902.99,10000000],["2015-04-06",9978.89,10000000],["2015-04-06",9752.86,10000000],["2015-04-06",9653.87,10000000],["2015-04-06",9728.04,10000000],["2015-04-06",9590.48,10000000],["2015-04-06",9386.29,10000000],["2015-04-06",9219.41,10000000],["2015-04-06",9145.12,10000000],["2015-04-06",9401.82,10000000],["2015-04-06",8993.94,10000000],["2015-04-06",9066.46,10000000],["2015-04-06",9151.51,10000000],["2015-04-06",9134.99,10000000],["2015-04-06",9377.7,10000000],["2015-04-06",9399.98,10000000],["2015-04-06",9484.19,10000000],["2015-04-06",9451.25,10000000],["2015-04-06",9606.72,10000000],["2015-04-06",9498.52,10000000],["2015-04-06",9681.79,10000000],["2015-04-06",9653.78,10000000],["2015-04-06",9390.83,10000000],["2015-04-06",9311.57,10000000],["2015-04-06",9233.79,10000000],["2015-04-06",9378.41,10000000],["2015-04-06",9522.68,10000000],["2015-04-06",9518.6,10000000],["2015-04-06",9354.31,10000000],["2015-04-06",9340.14,10000000],["2015-04-06",9121.61,10000000],["2015-04-06",9388.69,10000000],["2015-04-06",9488.67,10000000],["2015-04-06",9638.13,10000000],["2015-04-06",9649.98,10000000],["2015-04-06",9808.58,10000000],["2015-04-06",9822.59,10000000],["2015-04-06",9811.98,10000000],["2015-04-06",9802.75,10000000],["2015-04-06",9821.95,10000000],["2015-04-06",9845.03,10000000],["2015-04-06",9762.77,10000000],["2015-04-06",9818.72,10000000],["2015-04-06",9772.68,10000000],["2015-04-06",9820.6,10000000],["2015-04-06",9807.81,10000000],["2015-04-06",9778.84,10000000],["2015-04-06",9883.36,10000000],["2015-04-06",9779.7,10000000],["2015-04-06",9809.64,10000000],["2015-04-06",10064.52,10000000],["2015-04-06",10188.1,10000000],["2015-04-06",10247.89,10000000],["2015-04-06",10306.74,10000000],["2015-04-06",10547.31,10000000],["2015-04-06",10571.78,10000000],["2015-04-06",10530.35,10000000],["2015-04-06",10451.5,10000000],["2015-04-06",10572.48,10000000],["2015-04-06",10512.98,10000000],["2015-04-06",10475.13,10000000],["2015-04-06",10485.53,10000000],["2015-04-06",10659.72,10000000],["2015-04-06",10803.64,10000000],["2015-04-06",11130.47,10000000],["2015-04-06",11121.25,10000000],["2015-04-06",11185.72,10000000],["2015-04-06",11154.74,10000000],["2015-04-06",11141.24,10000000],["2015-04-06",11018.41,10000000]] 