function coin(_args) {

	var self = Ti.UI.createView({
		width : _args.size,
		height :_args.size,
		backgroundImage: 'images/ifapps/goldBall.pn8',
		left: _args.left,
		bottom: _args.bottom,
		index: _args.index,
		touchEnabled: false,
		colIndex: _args.colIndex,
		PercentNum: _args.PercentNum,
		opacity: 0
	});
	
	//coins[coinCounter] = new Coin({size: thisCoinSize, bottom: nextCoinBottom, left: coinLeft, PercentNum: coinList[j]});
				
	var percentageLbl = Ti.UI.createLabel({
	  color: 'black',
	  font:{fontFamily: 'AvenirNextCondensed-Regular', fontSize: '21sp', fontWeight: 'Regular'},
	  text: _args.PercentNum+'%',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	self.add(percentageLbl);

	return self;
};

module.exports = coin;
