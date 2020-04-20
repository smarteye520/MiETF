function componentInfoPie(_args) {

  Ti.API.info('componentInfoPie init ' +JSON.stringify(_args));
     
	Ti.App.addEventListener('chartPeriodChange', respondToChartPeriodChange);

	var pieMode = 'currency',importFromExisting =  _args.customData && _args.customData.importFromExisting ? true : false ;
	function respondToChartPeriodChange(e) {

		//pieMode = 'currency'/'mietf'/'stock'
		if (pieMode == 'mietf' || pieMode == 'stock') {
			self.popIn(scolors, spause, scomponentTitle, scomponentStockTicker, sisMiETF, sETFVersionId);
		}

	};

	var win = [];

	var self = Ti.UI.createView({
		left : '110%', // left: 330
		width : 416,
		height : 448 + 48,
		touchEnabled : true,
		top : 25,
		//backgroundImage: 'images/ifapps/infoBackground.png'
	});

	self.removeListener = function(e) {
		Ti.App.removeEventListener('chartPeriodChange', respondToChartPeriodChange);
	};

	var edgeBackground = Ti.UI.createView({
		top : 6,
		left : 6,
		width : 401,
		height : 433 + 48,
		borderWidth : 2,
		borderRadius : 50,
		borderColor : '#f39019',
		backgroundGradient : {
			type : 'linear',
			colors : ['#f7f9fd', '#a4a2a7'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 400,
				y : 432
			},
			backFillStart : false
		}
	});

	self.add(edgeBackground);

	var currencyView = Ti.UI.createView({
		top : 54,
		left : 42,
		width : 401,
		height : 433,
	});

	self.add(currencyView);

	//
	var topLabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '14sp'
		},
		text : 'Each 1 USD is equal to:',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 32,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		right : 102
	});

	currencyView.add(topLabel);

	var mietfLabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '14sp'
		},
		text : 'MiETF Components',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 240+14,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		left : 24
	});

	edgeBackground.add(mietfLabel);

	////////list for MiETF

	////////currencyList
	var mietfTemplate = {
		properties : {
			backgroundColor : 'transparent'
		},
		childTemplates : [{
			type : 'Ti.UI.Button',
			bindId : 'mietfSymbol',
			properties : {
				textAlign : 'left',
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				font : {
					fontFamily : 'AvenirNextCondensed-Regular',
					fontSize : '14sp'
				},
				width : 250,
				left : -7
			}, //,
			// events : {
			//     click : buttonClick
			// }
		}, {
			type : 'Ti.UI.Button',
			bindId : 'mietfPercent',
			properties : {
				title : 'hello',
				textAlign : 'right',
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '14sp',
					fontWeight : 'bold'
				},
				right : 0, //182
				left : 0,
				height : 32,
				top : 12
			}, //,
			// events : {
			//     click : buttonClick
			// }
		}, {
			type : 'Ti.UI.View',
			bindId : 'rowbottom',
			properties : {
				height : .5,
				bottom : 0,
				backgroundColor : '#A0A0A0',
				left : 3,
				right : 0
			}, //,
			// events : {
			//     click : buttonClick
			// }
		}]
	};

	var mietfList = Ti.UI.createListView({
		width : 352, //340
		caseInsensitiveSearch : true,
		top : 264 +14,
		left : 24,
		bottom : 72 -14,
		bubbleParent : false,
		templates : {
			'plain' : mietfTemplate
		},
		defaultItemTemplate : 'plain',
		backgroundColor : 'transparent',
		separatorColor : 'transparent', //'#A0A0A0',
		selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		opacity : 0
	});

	mietfList.footerView = Ti.UI.createView({
		height : 4,
		backgroundColor : 'transparent'
	});

	var mietfListData = new Array();
	mietfListData.push({
		mietfSymbol : {
			title : 'Foreign Growth v.0'
		},
		mietfPercent : {
			title : '50%'
		},
		rowbottom : {}
	});
	mietfListData.push({
		mietfSymbol : {
			title : 'Hi Tech v.0'
		},
		mietfPercent : {
			title : '50%'
		},
		rowbottom : {}
	});

	var mietfSection = Ti.UI.createListSection();
	mietfSection.setItems(mietfListData);

	mietfList.sections = [mietfSection];

	edgeBackground.add(mietfList);



	////////currencyList
	var currTemplate = {
		properties : {
			backgroundColor : 'transparent'
		},
		childTemplates : [{
			type : 'Ti.UI.Button',
			bindId : 'rowSymbol',
			properties : {
				textAlign : 'left',
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '14sp'
				},
				width : 50,
				left : -7
			}, //,
			// events : {
			//     click : buttonClick
			// }
		}, {
			type : 'Ti.UI.Button',
			bindId : 'rowCurrency',
			properties : {
				title : 'hello',
				textAlign : 'right',
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '14sp',
					fontWeight : 'bold'
				},
				right : 178, //182
				left : 0,
				height : 32,
				top : 12
			}, //,
			// events : {
			//     click : buttonClick
			// }
		}, {
			type : 'Ti.UI.Button',
			bindId : 'rowValue',
			properties : {
				text : 'hello',
				textAlign : 'left',
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '14sp'
				},
				width : Ti.UI.SIZE,
				right : 74
			}, //,
			// events : {
			//     click : buttonClick
			// }
		}]
	};

	var currencyList = Ti.UI.createListView({
		width : 352, //340
		caseInsensitiveSearch : true,
		top : 64,
		left : 24,
		bottom : 64,
		bubbleParent : false,
		templates : {
			'plain' : currTemplate
		},
		defaultItemTemplate : 'plain',
		backgroundColor : 'transparent',
		separatorColor : 'transparent', //'#A0A0A0',
		selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
	});

	currencyList.footerView = Ti.UI.createView({
		height : 4,
		backgroundColor : 'transparent'
	});

	var currencyData = new Array();
	currencyData.push({
		rowSymbol : {
			title : 'CAD'
		},
		rowCurrency : {
			title : 'Canadian Dollar'
		},
		rowValue : {
			title : '1.31'
		}
	});

	var currSection = Ti.UI.createListSection();
	currSection.setItems(currencyData);

	currencyList.sections = [currSection];

	currencyView.add(currencyList);

	/////////////

	///

	var cnvs = mietf.Canvas.createView({
		height : 170,
		zIndex : 1,
		top : 74,
		left : 24,
		//backgroundColor: "#ff0000",
		right : 24
	});

	edgeBackground.add(cnvs);

	var zeroLineView = Ti.UI.createView({
		height : 182,
		zIndex : 2,
		top : 76+14,
		left : 24,
		right : 24
	});

	edgeBackground.add(zeroLineView);

	var ChartZeroLine = require('smallChartZeroLine'),
	    chartZeroLine = new ChartZeroLine({
				bottom : 50
			});

	zeroLineView.add(chartZeroLine);

	function fakecnvs(e) {
		cnvs.begin();

		// First, let's draw some lines.
		var lines = [{
			x1 : 30,
			y1 : 80,
			x2 : 80,
			y2 : 70
		}, {
			x1 : 80,
			y1 : 70,
			x2 : 130,
			y2 : 122
		}, {
			x1 : 130,
			y1 : 122,
			x2 : 180,
			y2 : 57
		}, {
			x1 : 180,
			y1 : 57,
			x2 : 230,
			y2 : 99
		}, {
			x1 : 230,
			y1 : 99,
			x2 : 280,
			y2 : 33
		}, {
			x1 : 280,
			y1 : 33,
			x2 : 330,
			y2 : 12
		}];
		while (lines.length) {
			var line = lines.pop();
			cnvs.lineWidth(2);
			var strokeColor = '#F1F1F1';
			cnvs.strokeStyle(strokeColor);
			//mietf.canvas.strokeStyle('green');
			mietf.canvas.lineWidth(2);
			mietf.canvas.lineCap('round');
			cnvs.lineCap('round');
			cnvs.moveTo(line.x1, line.y1);
			cnvs.lineTo(line.x2, line.y2);
			cnvs.stroke();
		}

		cnvs.commit();
	}

	/////////////

	var template = {
		properties : {
			backgroundColor : 'transparent'
		},
		childTemplates : [{
			type : 'Ti.UI.Button',
			bindId : 'rowtitle',
			properties : {
				text : '',
				textAlign : 'left',
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				font : {
					fontFamily : 'AvenirNextCondensed-Regular',
					fontSize : '14sp'
				},
				width : Ti.UI.SIZE,
				left : -7
			}, //,
			// events : {
			//     click : buttonClick
			// }
		}, {
			type : 'Ti.UI.Button',
			bindId : 'rowmeta',
			properties : {
				title : '',
				textAlign : 'right',
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '14sp',
					fontWeight : 'bold'
				},
				right : 194, //182
				left : 0,
				height : 32,
				top : 12
			}, //,
			// events : {
			//     click : buttonClick
			// }
		}, {
			type : 'Ti.UI.Button',
			bindId : 'rRowtitle',
			properties : {
				text : '',
				textAlign : 'left',
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				font : {
					fontFamily : 'AvenirNextCondensed-Regular',
					fontSize : '14sp'
				},
				width : Ti.UI.SIZE,
				left : 187 //175
			}, //,
			// events : {
			//     click : buttonClick
			// }
		}, {
			type : 'Ti.UI.Button',
			bindId : 'rRowmeta',
			properties : {
				title : '',
				textAlign : 'right',
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '14sp',
					fontWeight : 'bold'
				},
				right : 0,
				left : 0,
				height : 32,
				top : 12
			}, //,
			events : {
				click : browserClick
			}
		}, {
			type : 'Ti.UI.View',
			bindId : 'rowbottom',
			properties : {
				height : .5,
				bottom : 0,
				backgroundColor : '#A0A0A0',
				right : 0,
				width : 155
			}, //,
			// events : {
			//     click : buttonClick
			// }
		}, {
			type : 'Ti.UI.View',
			bindId : 'rowbottom',
			properties : {
				height : .5,
				bottom : 0,
				backgroundColor : '#A0A0A0',
				left : 3,
				width : 155
			}, //,
			// events : {
			//     click : buttonClick
			// }
		},{
			type : 'Ti.UI.ImageView',
			bindId : 'rowYahooFinance',
			properties : {
				right : 5,
				width : 0,
				height : 32,
				borderRadius : 10,
				borderWidth : 2,
				textAlign:'center',
				borderColor :  "#666666",
				backgroundGradient : {
										type : 'linear',
										colors : ["#666666", "#EEEEEE"],
										startPoint : {
											x : 0,
											y : 0
										},
										endPoint : {
											x : 2,
											y : 50
										},
										backFillStart : false
									}
			}, //,
			events : {
				click : browserClick
			}
		}
		]
	};
	var bb1 = Titanium.UI.createButtonBar({
		labels : ['6 Month', '1 Year', '2 Year', '5 Year', '10 Year'],
		backgroundColor : 'white',
		color : 'white',
		style : Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height : 24,
		width : 292,
		top : 264 - 24,
		index : 0
	});
	//edgeBackground.add(bb1);

	function browserClick(e) {
		Ti.API.info('browserClick ' + JSON.stringify(e));
		if (e.source.isLink) {
			//
			var yahoo = Alloy.createController('yahooFull');
			var win = yahoo.getView();
			win.open({
				transition : Ti.UI.iPhone.AnimationStyle.NONE
			});
			yahoo.setUrl("http://finance.yahoo.com/q/pr?s=" + e.source.ticker, e.source.facetName);
		}
	}

	var stockMetaList = Ti.UI.createListView({
		width : 352, //340
		caseInsensitiveSearch : true,
		top : 264+14,
		left : 24,
		bottom : 72-14,
		bubbleParent : false,
		templates : {
			'plain' : template
		},
		defaultItemTemplate : 'plain',
		backgroundColor : 'transparent',
		separatorColor : 'transparent', //'#A0A0A0',
		allowsSelection : false,
		selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
	});

	stockMetaList.footerView = Ti.UI.createView({
		height : 1,
		backgroundColor : 'transparent'
	});

	var itemData = new Array();

	itemData.push({
		rowtitle : {
			title : 'Last Close'
		},
		rowmeta : {
			title : '1.79'
		},
		properties : {
			title : 'Last Close'
		},
		value : '1.79'
	});
	itemData.push({
		rowtitle : {
			title : 'Volume'
		},
		rowmeta : {
			title : '6,183,360'
		},
		properties : {
			title : 'Volume'
		},
		value : '6,183,360'
	});
	itemData.push({
		rowtitle : {
			title : 'Range'
		},
		rowmeta : {
			title : '1.75 - 1.80'
		},
		properties : {
			title : 'Range'
		},
		value : '1.75 - 1.80'
	});
	itemData.push({
		rowtitle : {
			title : '52wk Range'
		},
		rowmeta : {
			title : '1.61 - 4.83'
		},
		properties : {
			title : '52wk Rnage'
		},
		value : '1.61 - 4.83'
	});
	itemData.push({
		rowtitle : {
			title : 'Market Cap'
		},
		rowmeta : {
			title : '$356.97B'
		},
		properties : {
			title : 'Market Cap'
		},
		value : '$356.97B'
	});
	itemData.push({
		rowtitle : {
			title : 'IPO Year'
		},
		rowmeta : {
			title : '1997'
		},
		properties : {
			title : 'IPO Year'
		},
		value : '1997'
	});

	var onlySection = Ti.UI.createListSection();
	onlySection.setItems(itemData);

	stockMetaList.sections = [onlySection];

	edgeBackground.add(stockMetaList);
	//////
	var componentTitleButton = Titanium.UI.createLabel({
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius:10,
		/*backgroundGradient:{type:'linear',
		 colors:['#333234','#a0a1a3'],
		 startPoint:{x:0,y:0},
		 endPoint:{x:2,y:80},
		 backFillStart:false},
		 borderWidth:2,
		 borderColor:'#222222',
		 */
		borderWidth:2,
		height : 40,
		top : 24,
		left : 24,
		right: 70,
		width : 'auto',
		zIndex : 20,
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '21sp',
			fontWeight : 'bold'
		},
		text : 'title',
		prevText :'title',
		color:'white'

	});
	componentTitleButton.addEventListener('click', function(e){
		Ti.API.info('componentTitleButton.click ' + sETFVersionId);
	   	if(sisMiETF && mietf.viewMode==false){
	   		mietf.viewMode = true;
	   		mietf.pieMode = 'pieMode';
	   		mietf.prevETFVersionId = mietf.ETFVersionId;
	   		mietf.ETFVersionId = sETFVersionId;
	   		mietf.prevCanvas = mietf.canvas;
	   		mietf.canvas = mietf.Canvas.createView({
													width: 768,
													height: 544,
													zIndex: 1,
													left: 0
												});		
											   		
	   		var MIETFInterface  = require('_9_mietf_interface');
	   		var mietfInterface = new MIETFInterface({parent: currentWindow, title: componentTitleButton.text.trim() , mietfID:  _args.parent.button.jctFacetETFId, ETFVersionId: sETFVersionId , portfolioId: _args.parent.portfolioId});	
	   		mietfInterface.updateTitle(componentTitleButton.text);
	   		mietfInterface.left = Ti.Platform.displayCaps.platformWidth;
	   		mietfInterface.applyProperties({opacity:1});
	   		mietfInterface.scrollToPie();
	   		mietf.viewInterface = mietfInterface;
	   		currentWindow.add(mietfInterface);
	   		Ti.API.info('MIETFInterface added');
	   		var mietfInterfaceShow = Titanium.UI.createAnimation({left: 224, duration: 1000});
			mietfInterfaceShow.addEventListener('complete', function(e) {
				mietfInterface.scrollToPie();
			});
			mietfInterface.animate(mietfInterfaceShow);
        }
	}); 
	

	edgeBackground.add(componentTitleButton);

	var roundX = Titanium.UI.createView({
		top : 24,
		right : 24,
		width : 40,
		height : 40,
		borderColor : 'green',
		borderRadius : 10,
		borderWidth : 2, //3
		backgroundGradient : {
			type : 'linear',
			colors : ['blue', 'black'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 40,
				y : 40
			},
			backFillStart : false
		}
	});

	var XLbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '18sp',
			fontWeight : 'Regular'
		},
		text : 'X',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});

	roundX.add(XLbl);

	roundX.addEventListener('click', function(e) {
		if (_args.customData) {
			mietf.pieMode = 'searchMode';
			delete _args.customData;
			var fadeOutAnim = Ti.UI.createAnimation({
				duration : 500,
				opacity : 0,
				delay : 0
			});
			fadeOutAnim.addEventListener('complete', function(){
			   parent.showMietfSearch(); 	
			});
			self.animate(fadeOutAnim);
		}else{
			parent.clickPieImageView();
		}
	});

	edgeBackground.add(roundX);

	var parent = _args.parent;
    
	var deleteButton = Titanium.UI.createView({
		bottom : 16,
		width : 208,
		height : 32,
		//borderColor : 'green',
		borderRadius : 10,
		borderWidth : 2, //3
	});

	if(mietf.viewMode == false){
	   edgeBackground.add(deleteButton);
	}

	var deleteLbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '14sp',
			fontWeight : 'Regular'
		},
		text : _args.toAddNew ? (importFromExisting ?  'Import MiETF' :  'Add to MiETF') : 'Remove from MiETF',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});

	deleteButton.add(deleteLbl);

	deleteButton.addEventListener('click', function(e) {
		if (_args.customData) {
			Ti.API.info('_args.customData.isMiETF : ' + _args.customData.isMiETF);
			Ti.API.info('sisMiETF : ' + sisMiETF);
			Ti.API.info('_args.customData : ' + JSON.stringify(_args.customData));
			
			Ti.API.info('importFromExisting ' +importFromExisting);
			
			if(importFromExisting){
				parent.importFromExisting(_args.customData.ETFVersionId);
			}else if(sisMiETF){
				addMietfToMietfComponent(mietf.ETFVersionId, _args.customData.mietfID);	
			}else{
				addMietfComponent(_args.customData.ETFVersionId, _args.customData.facetId);
			}
			
			if(!importFromExisting) {
				parent.clickPieImageView();
				var sendEvent = function() {
					Ti.App.fireEvent('startPercentAllocChooser', {
						mietfID : _args.customData.mietfID,
						addComponent : false
					});
				};
				
				setTimeout(function(){
					sendEvent();
					delete _args.customData;
				}, 100);
				
			}
			
		} else {
			mietf.buttonTitle = parent.buttonLabel.text;
			mietf.source.jctFacetETFId = parent.button.jctFacetETFId;
			win = Alloy.createController('confirmationPopup').getView();
			win.open({
				transition : Ti.UI.iPhone.AnimationStyle.NONE
			});

		}

	});

	self.closeConfirmation = function(e) {
		win.close();
	};

	var scolors,
	    spause,
	    scomponentTitle,
	    scomponentStockTicker,
	    sisMiETF,
	    sETFVersionId;
	self.popIn = function(colors, pause, componentTitle, componentStockTicker, isMiETF, ETFVersionId) {
		Ti.API.info('isMiETF : '+isMiETF);
		scolors = colors;
		spause = pause;
		scomponentTitle = componentTitle;
		scomponentStockTicker = componentStockTicker;
		sisMiETF = isMiETF;
		sETFVersionId = ETFVersionId;

        if(componentTitle.length>30){
        	componentTitleButton.height = Ti.UI.SIZE;
        }else{
        	componentTitleButton.height = 40;
        }
        
		if (isMiETF) {
			pieMode = 'mietf';
			mietfLabel.opacity = 1;
			edgeBackground.remove(componentTitleButton);
			componentTitleButton.textAlign = 'center';
			componentTitle = componentTitle.replace('MiETF (','');
			if(componentTitle.lastIndexOf(")")>0)
				componentTitle = componentTitle.substring(0,componentTitle.lastIndexOf(")"))+ '  ';
			componentTitleButton.text = '' +componentTitle+'          ';
			edgeBackground.add(componentTitleButton);
			//componentTitleButton.width = componentTitleButton.toImage().width;
			//fakecnvs();
			drawcnvsMiETF(ETFVersionId);
			
			itemData = [];
			currencyView.opacity = 0;
			chartZeroLine.opacity = 1;
			mietfList.opacity = 1;
			stockMetaList.opacity = 0;
			cnvs.opacity = 1;

			mietfListData = getMietfComponentsChart(ETFVersionId);
			//mietfListData.push({mietfSymbol: { title : 'Foreign Growth v.0'}, mietfPercent: { title : '50%'}, rowbottom: {}} );

			mietfSection.setItems(mietfListData);
			mietfList.sections = [mietfSection];

		} else {
			mietfLabel.opacity = 0;
			componentTitleButton.textAlign = 'left';
			if (componentStockTicker != 'Cash') {
				pieMode = 'stock';
				chartZeroLine.opacity = 1;
				edgeBackground.remove(componentTitleButton);
				componentTitleButton.text = componentTitle;
				edgeBackground.add(componentTitleButton);
				//componentTitleButton.width = componentTitleButton.toImage().width;
				currencyView.opacity = 0;
				stockMetaList.opacity = 1;
				mietfList.opacity = 0;
				cnvs.opacity = 1;
				drawcnvsTicker(componentStockTicker);				
				itemData = getItemData(componentStockTicker);
			} else {
				pieMode = 'currency';
				edgeBackground.remove(componentTitleButton);
				componentTitleButton.text = 'USD Exchange Rate';
				edgeBackground.add(componentTitleButton);
				//componentTitleButton.width = componentTitleButton.toImage().width;
				chartZeroLine.opacity = 0;
				stockMetaList.opacity = 0;
				mietfList.opacity = 0;
				cnvs.opacity = 0;
				currencyView.opacity = 1;
				currencyData = getUSDExchangeRates();
				currSection.setItems(currencyData);
				currencyList.sections = [currSection];
			}
		}

		onlySection.setItems(itemData);
		stockMetaList.sections = [onlySection];
		
		////////////



		if (parent.buttonLabel && parent.buttonLabel.facetName == '$') {
			deleteButton.opacity = 0;
		} else {
			deleteButton.opacity = 1;
		}

		deleteButton.backgroundGradient = {
			type : 'linear',
			colors : [colors[0], colors[1]],
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

		edgeBackground.backgroundGradient = {
			type : 'linear',
			colors : [colors[1], colors[0]],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 400,
				y : 435 + 48
			},
			backFillStart : false
		};

		roundX.backgroundGradient = {
			type : 'linear',
			colors : [colors[1], colors[0]],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 40,
				y : 40
			},
			backFillStart : false
		};

		edgeBackground.borderColor = colors[0];
		roundX.borderColor = colors[0];
		deleteButton.borderColor = colors[0];
		if(sisMiETF && mietf.viewMode==false){
		  componentTitleButton.backgroundGradient=deleteButton.backgroundGradient;
		  componentTitleButton.borderColor = colors[0];
		  componentTitleButton.textAlign = 'center';
		}else{
		  componentTitleButton.backgroundGradient={};
		  componentTitleButton.borderWidth = 0;
		  componentTitleButton.textAlign = 'left';
		}
		self.opacity = 0;
		self.left = 330;
		
		var item = onlySection.getItemAt(itemData.length-1);
		if(item && item.rowYahooFinance){
			item.rowYahooFinance.backgroundGradient = deleteButton.backgroundGradient;
			item.rowYahooFinance.borderColor = deleteButton.borderColor;
        	onlySection.updateItemAt(itemData.length-1, item); 
       	}
      
		setTimeout(function(e) {
			animation.popIn(self);
		}, pause);

	};

	self.slideOut = function(e) {
		self.animate(hideView);
	};

	//animation
	var showView = Titanium.UI.createAnimation();
	showView.left = 330;
	showView.duration = 500;

	showView.addEventListener('complete', function(e) {
		//reset some values
	});

	var hideView = Titanium.UI.createAnimation();
	hideView.left = '110%';
	hideView.duration = 500;

	hideView.addEventListener('complete', function(e) {
		parent.remove(self);
	});

	function drawcnvsMiETF(ETFVersionId) {
		Ti.API.info('drawcnvsMiETF ');
		//fakecnvs();
		var chartDatePeriod = Ti.App.Properties.getString('chartDatePeriod', '6month');

		var constXOffset = 0;
		var constYOffset = 12;
		//var mietfData = getMiETFData(MiETF, mietf.chartDatePeriod);
		//var highLow = tempGetHighLowPointPercentageByMiETFId(mietf.ETFVersionId, mietf.chartDatePeriod, graphData);
		
		var graphData = getGraphData(ETFVersionId, chartDatePeriod);
		var half_length = Math.ceil(graphData.length / 2);    
		graphData = graphData.splice(0,half_length);
		Ti.API.info('graphData '+graphData);	
		
		var highLow = tempGetHighLowPointPercentageByMiETFId(ETFVersionId, chartDatePeriod, graphData, false);
		var lowPointPercentage = highLow.lowPointPercentage;
		var highPointPercentage = highLow.highPointPercentage;

		var percentageDistance = highPointPercentage - lowPointPercentage;
		var constGraphYDistance = 140;
		if (percentageDistance == 0)
			percentageDistance = 1;
			
		Ti.API.info('ETFVersionId '+ETFVersionId);	
		Ti.API.info('chartDatePeriod '+chartDatePeriod);		
		Ti.API.info('percentageDistance '+percentageDistance);	
		//don't want infinity
		var YpixelPerPercentagePoint = constGraphYDistance / percentageDistance;
		var constGraphXDistance = 352;
		var StartingPointY = 0;
		var StartingPointX = 0;
		var realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
		//if graph only goes up, lowPointPercentage is 0
		var XStrokeColorSave = 0;
		var YStrokeColorSave = 0;

		var dowId = 1;
		var nasdaqId = 2;
		cnvs.begin();

		var realX = 0 + constXOffset;
		//of course this equals zero, sanity check
		var saveX = realX;
		var saveY = realY;
		chartZeroLine.move(saveY);

		var xX = 0;
		var yY = 0;
		var XpixelPerDataPoint = constGraphXDistance / (graphData.length - 1);
		//btw, for now, in the future they aren't equidistant

		//here1
		cnvs.lineWidth(2);
		strokeColor = 'white';
		//here2
		// cnvs.strokeStyle(strokeColor);
		cnvs.lineCap('round');

		XStrokeColorSave = realX;
		YStrokeColorSave = realY;
		//here3

		cnvs.moveTo(realX, realY);
		for ( i = 0; i < graphData.length; i++) {
			if (i == 0)
				startingValue = graphData[i][1];
			StartingPointY = ((graphData[i][1] / startingValue) * 100) - 100;
			lastMiETFPercentage = StartingPointY;
			//strangelynamed percentage value

			StartingPointX = i;
			realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
			//if graph only goes up, lowPointPercentage is 0
			realX = Math.round(StartingPointX * XpixelPerDataPoint) + constXOffset;

			if (XStrokeColorSave != realX) {
				cnvs.stroke();
				//draw what you have so far

				//and set up change
				//here5
				cnvs.lineWidth(2);

				strokeColor = '#F1F1F1';
				cnvs.strokeStyle(strokeColor);
				cnvs.lineCap('round');
				//cnvs.globalCompositeOperation('destination-out');
				cnvs.moveTo(XStrokeColorSave, YStrokeColorSave);
				XStrokeColorSave = realX;
				YStrokeColorSave = realY;
				cnvs.lineTo(realX, realY);

			} else {
				if (xX != realX)
					cnvs.lineTo(realX, realY);
				//here9
				xX = realX;
				yY = realY;

			}
			lastMiETFY = realY;

		}

		cnvs.stroke();
		cnvs.commit();

	}

	function drawcnvsTicker(ticker) {
		Ti.API.info('drawcnvsTicker ');
		
		var chartDatePeriod = '6month';

		var constXOffset = 0;
		var constYOffset = 12;
		var stockData = getStockData(ticker, mietf.chartDatePeriod);
		var graphData = stockData.stockData;

		var lowPointPercentage = stockData.lowPointPercentage;
		var highPointPercentage = stockData.highPointPercentage;

		var percentageDistance = highPointPercentage - lowPointPercentage;
		var constGraphYDistance = 140;
		if (percentageDistance == 0)
			percentageDistance = 1;
		//don't want infinity
		var YpixelPerPercentagePoint = constGraphYDistance / percentageDistance;
		var constGraphXDistance = 352;
		var StartingPointY = 0;
		var StartingPointX = 0;
		var realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
		//if graph only goes up, lowPointPercentage is 0
		var XStrokeColorSave = 0;
		var YStrokeColorSave = 0;

		var dowId = 1;
		var nasdaqId = 2;
		cnvs.begin();

		var realX = 0 + constXOffset;
		//of course this equals zero, sanity check
		var saveX = realX;
		var saveY = realY;
		chartZeroLine.move(saveY);

		var xX = 0;
		var yY = 0;
		var XpixelPerDataPoint = constGraphXDistance / (graphData.length - 1);
		//btw, for now, in the future they aren't equidistant

		//here1
		cnvs.lineWidth(2);
		strokeColor = 'white';
		//here2
		// cnvs.strokeStyle(strokeColor);
		cnvs.lineCap('round');

		XStrokeColorSave = realX;
		YStrokeColorSave = realY;
		//here3

		cnvs.moveTo(realX, realY);
		for ( i = 0; i < graphData.length; i++) {
			if (i == 0)
				startingValue = graphData[i][1];
			StartingPointY = ((graphData[i][1] / startingValue) * 100) - 100;
			lastMiETFPercentage = StartingPointY;
			//strangelynamed percentage value

			StartingPointX = i;
			realY = constYOffset + constGraphYDistance - Math.round((StartingPointY - lowPointPercentage) * YpixelPerPercentagePoint);
			//if graph only goes up, lowPointPercentage is 0
			realX = Math.round(StartingPointX * XpixelPerDataPoint) + constXOffset;

			if (XStrokeColorSave != realX) {
				cnvs.stroke();
				//draw what you have so far

				//and set up change
				//here5
				cnvs.lineWidth(2);

				strokeColor = '#F1F1F1';
				cnvs.strokeStyle(strokeColor);
				cnvs.lineCap('round');
				//cnvs.globalCompositeOperation('destination-out');
				cnvs.moveTo(XStrokeColorSave, YStrokeColorSave);
				XStrokeColorSave = realX;
				YStrokeColorSave = realY;
				cnvs.lineTo(realX, realY);

			} else {
				if (xX != realX)
					cnvs.lineTo(realX, realY);
				//here9
				xX = realX;
				yY = realY;

			}
			lastMiETFY = realY;

		}

		cnvs.stroke();
		cnvs.commit();

	};

	//Ticker         Last Close
	//Sector     	 Market Cap
	//Volume     	 Range
	//IPO Year       More Info
    if(_args.toAddNew){
    	if(_args.customData.isMiETF){
    		//deleteFacet(_args.parent.button.jctFacetETFId);
    	}else{
    	    deleteMietfComponent(_args.customData.ETFVersionId, _args.customData.facetId);	
    	}
		delete _args.toAddNew;
    }
	return self;
};

module.exports = componentInfoPie;
