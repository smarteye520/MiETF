function portfolioButtonControl(_args) {

	var self = Ti.UI.createView({
		top: 304, 
		left: 32, 
		width: 160, 
		height: 160, 
		//backgroundImage: 'images/latest/leftBtn.pn8',
		opacity: 0,
		title: 'Portfolios'
	});
	
		var glass = Ti.UI.createView({
		width: 160,
		height: 160,
		borderRadius: 25,
		backgroundColor: '#444548',
		opacity: .6,
		borderWidth: 2,
		borderColor: '#222222'
	});
	
	self.add(glass);
	
	var portfolioLbl = Ti.UI.createLabel({
			  bottom: 9,
			  color: 'white',
			  font:{fontFamily: 'AvenirNextCondensed-Bold', fontSize: '21sp', fontWeight: 'bold'},
			  text: 'Portfolios',
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
			});
			
			
	self.add(portfolioLbl);
	
	self.addEventListener('click', function(e) {
		if (mietf.isAnimating == false) {
			Ti.App.fireEvent('PortfolioButtonClick', {});
		} else {
			//alert('portfolioBtn no no no - animating');
		}
	});
	
	return self;
};

module.exports = portfolioButtonControl;