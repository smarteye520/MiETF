function chartRestoreButton(_args) {

		
var self = Ti.UI.createView({
		height: 48,
		top: 32,
		left: 105,
		width:  64,
		mietfId: _args.mietfID,
		ETFVersionId: _args.ETFVersionId,
		touchEnabled: true,
		zIndex: 5
	});
	
	
	
var button = Titanium.UI.createButton({
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius : 10,
		backgroundGradient : {
			type : 'linear',
			colors : ['#a4a2a7', '#f7f9fd'], //['#434244', '#808183'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 80
			},
			backFillStart : false
		},
		borderWidth : 1,
		borderColor : '#d6d3d7', //'#666',
		width : '100%',
		height : '100%',
		bottom: 0,
		backgroundImage: 'images/ifapps/undoGrey.png'
	});
	

	var label = Ti.UI.createLabel({
		color : '#5f5f5f', //'white', //'#49484a',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '12sp',
			fontWeight : 'bold'
		},
		text : 'Previous',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		touchEnabled : false,
		top: '60%'
	});
	
	button.add(label);
	self.add(button);
	
	self.setButtonText = function(text) {
		label.text = text;
		if (text=='Previous') button.backgroundImage = 'images/ifapps/undoGrey.png';
		if (text=='Redo') button.backgroundImage = 'images/ifapps/redoGrey.png';
	};
	
	Ti.App.addEventListener('endStrategyChange', function(_args) {
		label.text = 'Previous';
		button.backgroundImage = 'images/ifapps/undoGrey.png';
	});
	
	Ti.App.addEventListener('endPercentAllocChooser', function(_args) {
		label.text = 'Previous';
		button.backgroundImage = 'images/ifapps/undoGrey.png';
	});

	self.fullSize = function(ETFVersionId) {
	
		self.ETFVersionId = ETFVersionId;
		self.mietfId = getETFFromVersion(ETFVersionId);
		if (savedMietfExists(self.mietfId)) {
			self.opacity = 1; } else {
				self.opacity = 0;
			}
		self.height = 48;
		self.top=32;
		self.width =64;
		
		button.borderRadius = 10;
		
		label.font =  {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '12sp',
			fontWeight : 'bold'
		};
		
	};

	self.setButton = function(e) {
		var test = savedMietfExists(self.mietfId);
		if (test) {
			self.opacity = 1;
		} else {
			self.opacity = 0;
		}
	};
	
	self.addEventListener('click', function(e) {
		
		if (label.text == 'Previous') {
			self.setButtonText('Redo');
			mietf.ETFVersionId = undoMietfComponents(mietf.ETFVersionId);
			mietf.strategyNum = getStrategyByETFVersionId(mietf.ETFVersionId);
			//alert('previous click, strategyNum:' + mietf.strategyNum +', for: ETFVersionId' + mietf.ETFVersionId);
			mietf.strategySave = mietf.strategyNum;
			Ti.App.fireEvent('updateGraphPie', {});
		} else {
			self.setButtonText('Previous');
			mietf.ETFVersionId = undoMietfComponents(mietf.ETFVersionId);
		    mietf.strategyNum = getStrategyByETFVersionId(mietf.ETFVersionId);
		    //alert('redo click, strategyNum:' + mietf.strategyNum+', for: ETFVersionId' + mietf.ETFVersionId);
	        mietf.strategySave = mietf.strategyNum;
			Ti.App.fireEvent('updateGraphPie', {});
		}
	});
	
	/*
	self.addEventListener('click', function(e) {
		
		var buttonNames = getButtonNames();
		// ['Restore Version 7', 'Cancel', 'Clear Previous Versions']
		
		var dialog = Ti.UI.createAlertDialog({
		    buttonNames: buttonNames,
		    message: 'Choose a version to restore',
		    title: 'Restore'
		  });
		  
		  dialog.addEventListener('click', function(e){
		    if (e.index === e.source.cancel){
		      Ti.API.info('The cancel button was clicked');
		    }
		    Ti.API.info('e: ' + JSON.stringify(e));
		    
		    var buttonName = e.source.buttonNames[e.index];
		    if (buttonName.substring(0,16) == 'Restore Version ') {
		     	var restoreVersionNum = buttonName.substring(16, buttonName.length);
		    	var restoreETFVersionId = revertToETFVersion(restoreVersionNum);
		    	mietf.ETFVersionId = restoreETFVersionId;
		    	Ti.App.fireEvent('updateGraphPie', {});
		    }
		    
		    if (buttonName == 'Clear Versions') {
		    	clearPreviousVersions();
		    	self.opacity= 0;
				Ti.App.fireEvent('updateGraphPie', {});
		    }
		  });
		  dialog.show();
		  
		 // {"index":0,"cancel":1,"bubbles":true,"type":"click","source":{"message":"Choose a version to restore","buttonNames":["Restore Version 1","Cancel","Clear Versions"],"cancel":1,"title":"Restore"},"cancelBubble":false}
  		
  		
	});
	*/
	return self;
};

module.exports = chartRestoreButton;