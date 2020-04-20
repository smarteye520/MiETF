function chartReweighButton(_args) {

		
var self = Ti.UI.createView({
		height: 48,
		top: 32,
		left: 32,
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
			colors : ['#a4a2a7', '#f7f9fd'], //like doneButton['#666666', '#A2A0A5'], // orig ['#434244', '#808183'],
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
		//backgroundImage: 'images/ifapps/undo.png'
	});
	
	var labelView = Ti.UI.createView({
		//layout: 'vertical',
		height: '100%' //, //36,
		//top: 6
	});
	
	var strategyLbl = Ti.UI.createLabel({
		color : '#5f5f5f', //'white', //'#49484a',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '12sp',
			fontWeight : 'bold'
		},
		text : 'Strategy',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		touchEnabled : false
	});
	
	labelView.add(strategyLbl);
	
	

	var label = Ti.UI.createLabel({
		color : '#5f5f5f', //'white', //'#49484a',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '12sp',
			fontWeight : 'bold'
		},
		text : 'Strategy',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		touchEnabled : false
	});
	
	//labelView.add(label);
	button.add(labelView);
	self.add(button);
	
	self.setButton = function(e) {
		mietf.strategyNum = getStrategyByETFVersionId(mietf.ETFVersionId);
		if (!mietf.strategyNum) {
			mietf.strategyNum = 768;
		}
	    mietf.strategySave = mietf.strategyNum;
		
		var strategy = new newStrategy(mietf.strategyNum);
		
		//strategyLbl.text = strategy.displayLine1;
		//label.text = strategy.displayLine2;
		
	};
	
	Ti.App.addEventListener('updateStrategyButton', function(e) {	
		
		var strategyNum = e.strategyNum;
		if (!e.strategyNum) strategyNum = 768;
		
		var strategy = new newStrategy(strategyNum);

		//strategyLbl.text = strategy.displayLine1;
		//label.text = strategy.displayLine2;
	});
	
	self.addEventListener('click', function(e) {
		mietf.reweighOut = true;
	   Ti.App.fireEvent('reweighSlideout', {});
		
	});
	

	return self;
};

module.exports = chartReweighButton;