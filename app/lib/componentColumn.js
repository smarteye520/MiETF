function componentColumn(_args) {
//width: colWidth, facetTickerSymbol: getColumns[i].facetTickerSymbol, PercentNum: getColumns[i].PercentNum}
	var self = Ti.UI.createView({
		bottom : 0,
		width : _args.width,
		left: _args.left,
		height : '100%'
	});
	
	var height = (_args.PercentNum*4.9);
		if (height < 4) height = 4;
	
	var percentBar = Ti.UI.createView({
		bottom : 54,
		width : '90%',
		height : height,
		backgroundColor: _args.color[0],
		borderColor: _args.color[1],
		borderWidth: 2,
		opacity: .9
	});
	
	self.add(percentBar);
	
	self.addPercentBar = function(percent) {
		percentBar.opacity= .9; //why does it disappear?  this line is necessary though
		PercentNumLbl.currentPercentNum = PercentNumLbl.currentPercentNum + percent;
		PercentNumLbl.text = PercentNumLbl.currentPercentNum + '%';
		var height = (PercentNumLbl.currentPercentNum*4.9);
		if (height < 1) height=1;
		percentBar.animate(Ti.UI.createAnimation({height: height, duration: 500}));
	};
	
	self.setPercentBar = function(percent) {
		percentBar.opacity= .9; //why does it disappear?  this line is necessary though
		PercentNumLbl.currentPercentNum = percent;
		PercentNumLbl.text = PercentNumLbl.currentPercentNum + '%';
		var height = (PercentNumLbl.currentPercentNum*4.9);
		if (height < 4) height=4;
		percentBar.animate(Ti.UI.createAnimation({height: height, duration: 500}));
	};
	
	self.minusPercentBar = function(percent) {
		percentBar.opacity= .9;
		PercentNumLbl.currentPercentNum = PercentNumLbl.currentPercentNum - percent;
		PercentNumLbl.text = PercentNumLbl.currentPercentNum + '%';
		var height = (PercentNumLbl.currentPercentNum*4.9);
		if (height < 4) height = 4;
		percentBar.animate(Ti.UI.createAnimation({height: height, duration: 500}));
	};
	
	
		var facetTickerSymbolLbl = Ti.UI.createLabel({
			  bottom: 24,
			  color: 'white',
			  font:{fontFamily: 'AvenirNextCondensed-Regular', fontSize: '21sp', fontWeight: 'Regular'},
			  text: _args.facetTickerSymbol,
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
			});
			
	
		var PercentNumLbl = Ti.UI.createLabel({
			  bottom: 0,
			  color: 'white',
			  font:{fontFamily: 'AvenirNextCondensed-Bold', fontSize: '21sp', fontWeight: 'bold'},
			  text: _args.PercentNum + '%',
			  currentPercentNum: _args.PercentNum,
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
			});



	
	
	self.add(facetTickerSymbolLbl);
	self.add(PercentNumLbl);
	

	return self;
};

module.exports = componentColumn;
