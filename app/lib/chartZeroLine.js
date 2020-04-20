function chartZeroLine(_args) {

	
	var self = Ti.UI.createView({
		height: 32,
		width: 800,
		top : _args.bottom-16,
		left: 32,
		backgroundColor: 'transparent',
		zIndex: 0
	});
	
	var blackLine1 = Ti.UI.createView({
		left: 0,
		backgroundColor: '#808183',
		height: 2,
		width: 32,
		top: 16
	});
	
	self.add(blackLine1);
	
	var blackLine2 = Ti.UI.createView({
		left: 64,
		backgroundColor: '#808183',
		height: 2,
		width: 640,
		top: 16
	});
	
	self.add(blackLine2);
	
	Ti.App.addEventListener('updateValue', function(e) {
		PercentageLabel.text = e.investValue;
	});
	
	
	var investment = getInvestment(mietf.ETFVersionId);
	
	var investText = '$100';
	for (i=0; i< mietf.investChoices.length; i++) {
			if (investment == mietf.investValues[i]) investText=mietf.investChoices[i];
		}
	
	var PercentageLabel = Ti.UI.createLabel({
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '1`sp',
			fontWeight : 'bold'
		},
		text : investText,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false,
		top: 6,
		left: 26,
		width: 48,
		height: 24,
		backgroundColor: '#f2f1ee',
		borderRadius: 8,
		borderWidth:2,
		borderColor: '#808183'
	});
	
	self.add(PercentageLabel);
		
	self.moveFull = function(bottom) {
		self.top = bottom-16;
	};
	
	self.moveHalf = function(bottom) {
		self.top = bottom-8;
	};

	self.fullSize = function() {
		self.height = 32;
		self.width = 800;
		self.left = 32;
		
		blackLine1.width = 32;
		blackLine1.top = 16;
		blackLine1.height = 2;
		
		blackLine2.left = 64;
		blackLine2.height = 2;
		blackLine2.top =16;
		blackLine2.width = 640;
		
		PercentageLabel.font = {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '11sp',
			fontWeight : 'bold'
		};
		
		PercentageLabel.left = 14;
		PercentageLabel.height = 24;
		PercentageLabel.width = 48;
		PercentageLabel.top = 6;
		PercentageLabel.borderRadius = 8;
		

		
	};
	
	self.halfSize = function() {
		self.height = 16;
		self.width = 400;
		self.left = 16;
		
		blackLine1.width = 16;
		blackLine1.top = 8;
		blackLine1.height = 1;
		
		blackLine2.left = 32;
		blackLine2.height = 1;
		blackLine2.top =8;
		blackLine2.width = 320;
		
		PercentageLabel.font = {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '7sp',
			fontWeight : 'bold'
		};
		
		PercentageLabel.left = 16;
		PercentageLabel.height = 12;
		PercentageLabel.width = 15;
				PercentageLabel.top = 3;
		PercentageLabel.borderRadius = 4;
		
	};
	

	return self;
};

module.exports = chartZeroLine;