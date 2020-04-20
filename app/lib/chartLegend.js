function chartLegend(_args) {
    Ti.API.info('Creating chartLegend');
	var self = Ti.UI.createView({
		height : 48,
		top : 32,
		right : 32, //see setFullSize
		width : Ti.UI.SIZE,
		mietfID : _args.mietfID,
		ETFVersionId : _args.ETFVersionId,
		//touchEnabled : true,
		zIndex : 5
	});
	
    var buttonContainer = Ti.UI.createView({
		height : '100%',
		width : Ti.UI.SIZE,
		right : 80, 
		layout:'horizontal'
	});
	self.add(buttonContainer);

	var addButton = Titanium.UI.createButton({
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius : 10,
		backgroundGradient : {
			type : 'linear',
			colors : ['#a4a2a7', '#f7f9fd'],
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
		borderColor : '#d6d3d7',
		width : 64,
		height : 48,
		top : 32,
		right : 32,
		zIndex : 5,
		mietfID : _args.mietfID
	});

	self.add(addButton);

	var addButtonImage = Ti.UI.createImageView({
		image : 'images/ifapps/greyGraph.pn8',
		width : 64,
		height : 48,
		touchEnabled : false
	});

	addButton.add(addButtonImage);

	var addButtonLabel = Ti.UI.createLabel({
		color : '#49484a',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '12sp',
			fontWeight : 'bold'
		},
		text : 'Add',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false,
		bottom : 2
	});

	addButton.add(addButtonLabel);

	addButton.addEventListener('click', addButtonClickHandler);

	function addButtonClickHandler(e) {
		if (self.height == 24)
			return;

		var Popover = require('chartPopover'),
		    popover = new Popover({
			parent : _args.parent,
			chartLegend : self,
			mietfID : self.mietfID,
			ETFVersionId : self.ETFVersionId
		});

		popover.show({
			view : addButton
		});
	};

	var mietfButton = Titanium.UI.createButton({
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		width : Ti.UI.SIZE,
		height : 48
	});

	buttonContainer.add(mietfButton);

	var mietfButtonImage = Ti.UI.createImageView({
		image : 'images/ifapps/rainbowGraph.pn8',
		width : 64,
		height : 48
	});

	mietfButton.add(mietfButtonImage);

	var mietfButtonLabel = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '12sp',
			fontWeight : 'bold'
		},
		text : 'MiETF with Strategy',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false,
		bottom : 2
	});
	

	mietfButton.add(mietfButtonLabel);
	
	///////////////////////////////////////////
	var mietfSButton = Titanium.UI.createButton({
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		width : Ti.UI.SIZE,
		height : 48,
		left : 5
	});

	mietfSButton.add(Ti.UI.createImageView({
		image : 'images/ifapps/graphThick7.png',
		width : 64,
		height : 48
	}));

	mietfSButton.add(Ti.UI.createLabel({
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '12sp',
			fontWeight : 'bold'
		},
		text : 'MiETF no Strategy',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false,
		bottom : 2
	}));
	
   buttonContainer.add(mietfSButton);

	var prevButtons = [];
	var prevImages = [];
	var prevLabels = [];

	//var prevMietf = savedMietfExists(self.mietfID);
	var prevMietf = 0;
	var modifier = 0;

	if (prevMietf) {
		modifier = 80;
		prevButtons[0] = Titanium.UI.createButton({
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			width : 64,
			height : 48,
			top : 0,
			right : modifier
		});

		self.add(prevButtons[0]);

		prevImages[0] = Ti.UI.createImageView({
			image : 'images/ifapps/rainbowGreyGraph.pn8',
			width : 64,
			height : 48
		});

		prevButtons[0].add(prevImages[0]);

		prevLabels[0] = Ti.UI.createLabel({
			color : 'black',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '12sp',
				fontWeight : 'bold'
			},
			text : 'Previous',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			touchEnabled : false,
			bottom : 2
		});

		prevButtons[0].add(prevLabels[0]);
	}

	//createIndexButtons

	var indexButtons = [];
	var indexImages = [];
	var indexLabels = [];

	var rs = getIndexButtons(self.mietfID);

	for ( i = 0; i < rs.length; i++) {
		indexButtons[i] = Titanium.UI.createButton({
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			width : Ti.UI.SIZE,
			height : 48,
			left:5
		});

		buttonContainer.add(indexButtons[i]);

		indexImages[i] = Ti.UI.createImageView({
			image : rs[i].chartPic,
			width : 64,
			height : 48
		});

		indexButtons[i].add(indexImages[i]);

		indexLabels[i] = Ti.UI.createLabel({
			color : 'black',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '12sp',
				fontWeight : 'bold'
			},
			text : rs[i].chartName,
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			touchEnabled : false,
			bottom : 2
		});

		indexButtons[i].add(indexLabels[i]);

	}

	var comparisonMietf = ComparisonMiETFExistByMietfId(self.mietfID);

	if (comparisonMietf.etfId) {

		indexButtons[i] = Titanium.UI.createButton({
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			width : Ti.UI.SIZE,
			height : 48,
			left:5
		});

		buttonContainer.add(indexButtons[i]);

		indexImages[i] = Ti.UI.createImageView({
			image : 'images/ifapps/redGraph.pn8',
			width : 64,
			height : 48
		});

		indexButtons[i].add(indexImages[i]);

		indexLabels[i] = Ti.UI.createLabel({
			color : 'black',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '12sp',
				fontWeight : 'bold'
			},
			text : comparisonMietf.etfName,
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			touchEnabled : false,
			bottom : 2,
			width: Ti.UI.SIZE
		});

		indexButtons[i].add(indexLabels[i]);

	}

	function updateIndexButtons(divisor) {
		//first remove existing

		var vault = new Vault();
		vault.getVaultById(getVaultIdByPortfolioId(mietf.currentPortfolioId));
		//until you pass it around, just getting it again

        var colorIndex=-1;
		function getGraphImage() {
			colorIndex++;
			return 'images/ifapps/graph' + mietf.graphIndexColor[colorIndex] + '.png';
		}

		for ( i = 0; i < indexButtons.length; i++) {
			buttonContainer.remove(indexButtons[i]);
		}

		for ( i = 0; i < prevButtons.length; i++) {
			self.remove(prevButtons[i]);
		}

		//var prevMietf = savedMietfExists(self.mietfID);
		var prevMietf = 0;
		var modifier = 0;

		indexButtons = [];

		
		var k = 0;

		//now recreate index buttons

		var rs = getIndexButtons(self.mietfID);

		var j = 0;
		for ( i = rs.length - 1; i >= 0; i--) {
			indexButtons[j + k] = Titanium.UI.createButton({
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				width : Ti.UI.SIZE,
				height : 48,
				left:5
			});

			buttonContainer.add(indexButtons[j + k]);

			indexImages[j + k] = Ti.UI.createImageView({
				image : getGraphImage(),
				width : 64 / divisor,
				height : 48 / divisor
			});

			indexButtons[j + k].add(indexImages[j + k]);

			var fontSize = '12sp';

			indexLabels[j + k] = Ti.UI.createLabel({
				color : 'black',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : fontSize,
					fontWeight : 'bold'
				},
				text : rs[i].chartName,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false,
				bottom : 2
			});

			indexButtons[j + k].add(indexLabels[j + k]);
			j++;

		}

		var comparisonMietf = ComparisonMiETFExistByMietfId(self.mietfID);
		
		if (comparisonMietf.etfId) {
			var modifier = 80;
			indexButtons.push(Titanium.UI.createButton({
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				width : Ti.UI.SIZE,
				height : 48 / divisor,
				left : 5
			}));

			buttonContainer.add(indexButtons[indexButtons.length-1]);

			indexImages.push(Ti.UI.createImageView({
				image : getGraphImage(),
				width : 64,
				height : 48
			}));

			indexButtons[indexButtons.length-1].add(indexImages[indexImages.length-1]);

			indexLabels.push(Ti.UI.createLabel({
				color : 'black',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '12sp',
					fontWeight : 'bold'
				},
				text : comparisonMietf.etfName,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false,
				bottom : 2,
				width: Ti.UI.SIZE
			}));

			indexButtons[indexButtons.length-1].add(indexLabels[indexLabels.length-1]);

		}
		
		//mietfButton.right = (indexButtons.length + 1) * 80-10;
		mietfButtonImage.image = 'images/ifapps/graphThick' + (vault.vaultNum - 1) + '.png';
		//mietfSButton.right = (indexButtons.length + 1) * 80 + 110;

	};

	self.clear = function(e) {
		self.mietfID = e.mietfID;
		updateIndexButtons(1);

	};

	self.setFullSize = function(e) {
		self.mietfID = e.mietfID;
		self.ETFVersionId = e.ETFVersionId;
		addButton.mietfID = e.mietfID;
		addButton.ETFVersionId = e.ETFVersionId;
		self.height = 48;
		self.top = 32;
		self.right = 32;

		addButton.borderRadius = 10;
		addButton.width = 64;
		addButton.height = 48;
		addButton.top = 0;
		addButton.right = 0;
		addButton.backgroundGradient = {
			type : 'linear',
			colors : ['#a4a2a7', '#f7f9fd'],
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

		addButtonImage.width = 64;
		addButtonImage.height = 48;

		addButtonLabel.font = {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '12sp',
			fontWeight : 'bold'
		};
		addButtonLabel.bottom = 2;

		updateIndexButtons(1);

	};

	return self;
};

module.exports = chartLegend; 