function hccButton(_args) {
	var self = Ti.UI.createView({ 
		left: 32,
		height: 132,
		width: 132,
		borderRadius:25,
		backgroundColor: _args.backgroundColor,
		bottom: 32
		});
		
		var NYSETickerSymbol = _args.NYSETickerSymbol;
		var shortName = _args.shortName;

   
	var greySquare = Ti.UI.createImageView({
		image: resDir + 'images/greySquare.pn8',
		width: 132,
		height:130,
	});
	
	self.add(greySquare);
	
	
	
	var title = Ti.UI.createLabel({
			  top: 50,
			  color: 'white',
			  font: {  fontSize: '18sp'  },
			  text: NYSETickerSymbol,
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
			});
			
			
	self.add(title);
	
		var subtitle = Ti.UI.createLabel({
			  top: 70,
			  width: 90,
			  height: Ti.UI.SIZE,
			  color: 'white',
			  font: {  fontSize: '12sp'  },
			  text: '(' + shortName + ')',
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
			});
			
			
	self.add(subtitle);
	
		

	return self;
};

module.exports = hccButton;