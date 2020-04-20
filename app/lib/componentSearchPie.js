var Config = require('configuration');

function componentSearchPie(_args) {
  Ti.API.info('initializing componentSearchPie ' + JSON.stringify(_args));	
  var filterBy = _args.filterBy ? _args.filterBy  : 0;
	var self = Ti.UI.createView({
		left : '110%', // left: 330
		width : 416,
		height : 448 + 48,
		touchEnabled : true,
		top : 25,
		//backgroundImage: 'images/ifapps/infoBackground.png',
		item : []
	});

	var edgeBackground = Ti.UI.createView({
		top : 6,
		left : 6,
		width : 401,
		height : 433 + 48,
		borderWidth : 2,
		borderRadius : 50,
		borderColor : '#a4a2a7',
		backgroundGradient : {
			type : 'linear',
			colors : ['#f7f9fd', '#a4a2a7'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 400,
				y : 432 + 48
			},
			backFillStart : false
		},

	});

	self.add(edgeBackground);

	var roundX = Titanium.UI.createView({
		top : 24,
		right : 24,
		width : 40,
		height : 40,
		borderColor : '#a4a2a7',
		borderRadius : 10,
		borderWidth : 2, //3
		backgroundGradient : {
			type : 'linear',
			colors : ['#f7f9fd', '#a4a2a7'],
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

	var parent = _args.parent;

	//////////////

	//24 + 48 + 16

	var searchInp = Titanium.UI.createTextField({
		autocorrect:false,
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '21sp',
			fontWeight : 'Bold'
		},
		height : 40,
		top : 0,
		width : _args.disableFilterSelect ? 298 : 248,
		left : 0,
		hintText : 'Search ' + mietf.filterValues[filterBy],
		//backgroundImage : 'images/ifapps/search_component_field.png',
		borderRadius : 0,
		borderWidth : 0,
		borderColor : 'transparent',
		paddingLeft : 60,
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
		searchData();
	});

    function searchData(){
    	Ti.API.info('Fire Onchange');
    	if (searchInp.value.length < 2 && !_args.autoPopulate) {
				stockList.searchText = '';
				mietfSection = Ti.UI.createListSection();
				mietfData = [];
				mietfSection.setItems(mietfData);
				stockList.sections = [mietfSection];
				dataSet = false;
			} else {
				//Hack to auto populate Create from Existing
				if(filterBy!=2){
					_args.autoPopulate = false;
				}
				stockList.searchText = searchInp.value;
				if (!dataSet) {
					mietfSection = Ti.UI.createListSection({});
					tickerSection = Ti.UI.createListSection({});
	
					mietfData = [];
					tickerData =[];
				Ti.API.info("filterBy:" + filterBy);
	      	if(filterBy===2 || filterBy===0) {
						mietfData = getFacetsMietfSearch(mietf.ETFVersionId, searchInp.value);
					}  
				 
					//getFacetsMietfSearch
					if(filterBy===1 || filterBy===0) {
						tickerData = getFacetsTickerSearch(mietf.ETFVersionId, searchInp.value);
					}
	
					mietfSection.setItems(mietfData);
					tickerSection.setItems(tickerData);

		
		Ti.API.info("data:")
		
		//Ti.API.info(tickerData)
		
					stockList.sections = [mietfSection, tickerSection];
					stockList.searchText = searchInp.value;
					dataSet = true;
				}
			}
		
    }
 
	function buttonClick(e) {
		searchInp.blur();
		Ti.API.info('self.mietfID '+ self.mietfID);
		Ti.API.info("section index:" + e.sectionIndex)
		Ti.API.info(e)
		if (e.sectionIndex == 0) {
			self.item = mietfData[e.itemIndex];
      //addMietfToMietfComponent(mietf.ETFVersionId, self.item.properties.ETFId);
      Ti.API.info('self.item ' + JSON.stringify(self.item));
      Ti.API.info('mietf.ETFVersionId ' + mietf.ETFVersionId);
      parent.showTickerDetailToAdd({buttonTitle : self.item.properties.title , 
			  tickerSymbol : '', 
			  ETFVersionId : self.item.properties.ETFVersionId,  
			  mietfID : self.item.properties.ETFId,
			  isMiETF : true,
			  importFromExisting : _args.filterBy ? true  : false
			});
			self.mietfID = self.item.properties.ETFId; 						  
		} else {
			self.item = tickerData[e.itemIndex];
      Ti.API.info('self.item ' + JSON.stringify(self.item));
      Ti.API.info('mietf.ETFVersionId ' + mietf.ETFVersionId);
			self.mietfID = self.item.properties.ETFId; 	
			var stockData = getStockDataBySymbol(tickerData[e.itemIndex].properties.TickerSymbol);
			if(stockData.length > 0)
				addInformationAboutTickerFromDatabase();
			else {
				getQuandlData(Config.dataset() + tickerData[e.itemIndex].properties.TickerSymbol, tickerData[e.itemIndex].properties.TickerSymbol, e.source.title);	
			}
			
		}
	};
	
	function addInformationAboutTickerFromDatabase() {
		Ti.API.info("get information about ticker from database");
		addMietfComponent(mietf.ETFVersionId, self.item.properties.facetId);
		parent.showTickerDetailToAdd({buttonTitle : self.item.properties.title , 
		  tickerSymbol : self.item.properties.TickerSymbol, 
		  ETFVersionId : mietf.ETFVersionId, 
		  facetId : self.item.properties.facetId, 
		  mietfID : self.mietfID,
		  isMiETF : false
		});
	}

  var searchInpBack= Ti.UI.createView({		
  	height : 40,
		top : 24,
		width : _args.disableFilterSelect ? 298 : 248,
		left : 24,
		borderColor : '#a4a2a7',
		borderRadius : 10,
		borderWidth : 2,
		backgroundGradient : {
			type : 'linear',
			colors : ['#f7f9fd', '#a4a2a7'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 40,
				y : 300
			},
			backFillStart : false
		}
	});
	searchInpBack.add(searchInp);
	searchInpBack.add(Ti.UI.createImageView({		
    height : 30,
		width : Ti.UI.SIZE,
		left : 10,
		image : 'images/ifapps/search_icon.png'
	}));	
	edgeBackground.add(searchInpBack);

	/////list view

	/*
	* 	buttons[i] = Titanium.UI.createButton({
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	borderRadius:10,
	font:{fontSize:16,fontWeight:'bold'},
	backgroundGradient:{type:'linear',
	colors:['#000001','#666666'],
	startPoint:{x:0,y:0},
	endPoint:{x:2,y:50},
	backFillStart:false},
	borderWidth:1,
	borderColor:'#666',
	width: 240,
	left: 0,
	height: 32,
	bottom: 8,
	i: i,
	vaultName: rs.vaultName,
	vaultImg : rs.vaultImg,
	isLocked: rs.isLocked,
	isSampleVault: rs.isSampleVault,
	vaultColor: rs[i].vaultColor
	});
	*
	*
	*
	*
	*
	*/

	var mietfData = [];
	var tickerData = [];

	var template = {
		properties : {
			backgroundColor : 'transparent'
		},
		childTemplates : [{
			type : 'Ti.UI.Button',
			bindId : 'rowtitle',
			properties : {
				title : 'hello',
				textAlign : 'left',
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				borderRadius : 10,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '14sp',
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
				bottom : 8
			},
			events : {
				click : buttonClick
			}
		}]
	};

	var stockList = Ti.UI.createListView({
		width : 248, //656,
		caseInsensitiveSearch : true,
		top : 96,
		left : 84,
		bottom : 36,
		bubbleParent : false,
		templates : {
			'plain' : template
		},
		defaultItemTemplate : 'plain',
		backgroundColor : 'transparent',
		separatorColor : 'transparent'
	});

	stockList.footerView = Ti.UI.createView({
		height : 1,
		backgroundColor : 'transparent'
	});

	stockList.addEventListener('itemclick', buttonClick);

	var mietfSection = Ti.UI.createListSection();
	var tickerSection = Ti.UI.createListSection();
	//tickerSection.setItems(tickerData);
	//nameSection.setItems(nameData);
	stockList.sections = [mietfSection];

	edgeBackground.add(stockList);

	roundX.addEventListener('click', function(e) {
		parent.clickPieImageView();
	});

	edgeBackground.add(roundX);

	var searchEllipses = Titanium.UI.createLabel({
		text:'. . .',
		color:'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '18sp',
			fontWeight : 'Regular'
		},
		textAlign:'center',
		top : 24,
		right : 75,
		width : 40,
		height : 40,
		borderColor : '#a4a2a7',
		borderRadius : 10,
		borderWidth : 2, //3
		backgroundGradient : {
			type : 'linear',
			colors : ['#f7f9fd', '#a4a2a7'],
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

	/*searchEllipses.addEventListener('click', function(e) {
		alert('coming soon');
	});*/
	if(!_args.disableFilterSelect)
		edgeBackground.add(searchEllipses);

	/////////////

	self.slideIn = function(e) {
		self.opacity = 0;
		self.left = 330;
		animation.popIn(self);
	};

	self.slideOut = function(e) {
		var fadeOutAnim = Ti.UI.createAnimation({
			duration : 500,
			opacity : 0
		});
		self.animate(fadeOutAnim);
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

	function getQuandlData(QuandlCode, tickerSymbol, title) {
		
		var ProgressIndicator = require('graphOverlay');
		progressIndicator = new ProgressIndicator();
		_args.parent.add(progressIndicator);
		//animation.fadeIn(progressIndicator, 500);
		
		var lastUpdate = getLastInsertDateByTicker(tickerSymbol);

		if (!lastUpdate) {
			lastUpdate = '2005-01-01';
		}
		lastUpdate = sqlDateToNextDay(lastUpdate);

		if (Titanium.Network.online == true) {
			var request = Titanium.Network.createHTTPClient();
			var url = Config.apiPath() + QuandlCode + '.json?auth_token=' + Config.authToken() + '&trim_start=' + lastUpdate + '&exclude_headers=true';
			request.open('GET', url);
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
					if (data.length==0 && (new Date().getTime() - sqlDateToNative(lastUpdate).getTime()) > 1000*60*60*24*30*6) {
						Ti.API.info('lastUpdate : ' +lastUpdate + ' today : ' + nativeDateToSql(new Date()));
						self.removeProgressIndicator();
						Alloy.createController('alertPopup', {text:'Data not available for this ticker'}).getView().open();
					} else {
						if (data.length>0 && (new Date().getTime() - sqlDateToNative(data[0][0]).getTime()) > 1000*60*60*24*30*6) {
							Ti.API.info('lastUpdate : ' +data[0][0] + ' today : ' + nativeDateToSql(new Date()));
							self.removeProgressIndicator();
							Alloy.createController('alertPopup', {text:'Data not available for this ticker'}).getView().open();
						} else {
							getQuandlDataSuccess(tickerSymbol, data, title);
					  }
					}
				};
				
			  if(typeof progressIndicator!=='undefined' && progressIndicator!=null) {
		    	animation.fadeOut(progressIndicator, 500, function() {
		    		_args.parent.remove(progressIndicator);
		    	});
	    	}
			};
			request.onerror = function requestFailed() {
				Ti.API.error(url + " : " +request.status + ' - ' + request.statusText);
				self.removeProgressIndicator();
				Alloy.createController('alertPopup', {text:'Data not available for this ticker'}).getView().open();
			};

		} else {
			self.removeProgressIndicator();
			Alloy.createController('alertPopup', {text:'Downloading not complete, and you are currently off-line. Your selection is not in the off-line database yet!!!', widthText: 370, topText: 20}).getView().open();
		}

	};

	function getQuandlDataSuccess(tickerSymbol, data, buttonTitle) {

		if (data.length > 0) {
			insertStockData(data, tickerSymbol);
		}

		addMietfComponent(mietf.ETFVersionId, self.item.properties.facetId);
		self.removeProgressIndicator();
		/*Ti.App.fireEvent('startPercentAllocChooser', {
			mietfID : self.mietfID,
			addComponent : false
		});*/
		//parent.clickSmallPie();
		parent.showTickerDetailToAdd({buttonTitle : buttonTitle , 
									  tickerSymbol : tickerSymbol, 
									  ETFVersionId : mietf.ETFVersionId, 
									  facetId : self.item.properties.facetId, 
									  mietfID : self.mietfID,
									  isMiETF : false});

		};

    self.removeProgressIndicator = function(immediate){		
	    if(typeof progressIndicator!=='undefined' && progressIndicator!=null){
	    	if(immediate){
	    		_args.parent.remove(progressIndicator);
    			progressIndicator = null;
	    	}else{
	    		animation.fadeOut(progressIndicator, 500, function(){
	    			_args.parent.remove(progressIndicator);
	    			progressIndicator = null;
	    		});
    		}
			}
    };
    
    /*Ti.App.addEventListener('removeAnimationImage', function (e) {
		self.removeProgressIndicator();
	});*/
	
	
	var picker = Ti.UI.createPicker({
		backgroundColor:"#4C4C4E",
		touchEnabled : !_args.disableFilterSelect
	});

	picker.setLocale('fr');
	//hacked to make grey, don't ask

	var column = Ti.UI.createPickerColumn({backgroundColor:"#4C4C4E"});

	for (var i = 0; i < mietf.filterValues.length; i++) {
		var row = Ti.UI.createPickerRow({
			id : i,
			backgroundColor:"#4C4C4E"
		});
		var label = Ti.UI.createLabel({
			text : mietf.filterValues[i],
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '12sp'
			},
			width : 100,
			height : 44,
			color : 'white',
			backgroundColor:"#4C4C4E"
		});
		//5, -94
		row.add(label);
		column.addRow(row);
	}

	picker.add(column);
	picker.selectionIndicator = true;

	picker.addEventListener('change', function(e) {
    Ti.API.info('Picker Change '+JSON.stringify(e)); 
		filterBy = e.row.id;
	});

	var pickerV = Ti.UI.createView({
		width : 120,
		height : 230,
		backgroundColor:"#4C4C4E"
	});

  var pickerContainer =  Ti.UI.createView({
  	top: 25,
    bottom: 5,
		width: 120,
		height: 200,
		backgroundColor:"#4C4C4E"
	});
	pickerContainer.add(picker);
	
	var closeX = Ti.UI.createView({
    height:20,
    width:150,
    backgroundColor:'transparent'
	});

	pickerContainer.add(closeX);

	closeX.addEventListener('click', function(e) {
		popover.hide();
	});
	
	pickerV.add(pickerContainer);

	var popover = Ti.UI.iPad.createPopover({
		width : 120,
		height : 200,
		contentView : pickerV,
		backgroundColor:"#4C4C4E",
		arrowDirection :Titanium.UI.iPad.POPOVER_ARROW_DIRECTION_UP
	});

	var titleLbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '12sp',
			fontWeight:'bold'
		},
		text : 'Filter By',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false,
		top : 8
	});

	pickerV.add(titleLbl);

	popover.addEventListener('hide', function(e) {
		if(filterBy>2) {
			Alloy.createController('alertPopup', {text:'Not available yet.'}).getView().open();
			//alert('Not available yet.');
		} else {
			var temp =  searchInp.value;
			searchInp.value = '';
			searchData();
			searchInp.value = temp;
			searchData();
			searchInp.hintText = 'Search ' + mietf.filterValues[filterBy];
		}
	});

	searchEllipses.addEventListener('click', function(e) {
		picker.setSelectedRow(0, filterBy, false);
		popover.show({
			view : searchEllipses
		});
	});
	
	if(_args.autoPopulate){searchData();};
	return self;
};

module.exports = componentSearchPie;
