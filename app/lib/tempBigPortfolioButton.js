function portfolioBigButton(_args) {
	
	var fullsize = { height: 391, width: 306};
	var opacity = _args.opacity;
	var height = _args.height;
	var width = _args.width;
	var zIndex = _args.zIndex;
	
	 
	var self = Ti.UI.createImageView({
		image: 'images/latest/first_' + _args.vaultNum + '.pn8',
		vaultNum: _args.vaultNum,
		height: height,
		width: width,
		id: _args.id,
	 	vaultColor: _args.backgroundColor,
	 	portfolioName: _args.portfolioName,
	  portfolioId: _args.vaultId,
	  zIndex: zIndex,
	  top: _args.top,
	  left: _args.left
	});
	
	if (_args.portfolioName == 'Add New Portfolio') self.image = 'images/latest/first_ghost.pn8';
	
	var vFontSize = '13sp';
	if (_args.portfolioName.length > 19) vFontSize='12sp';
	
	var words = _args.portfolioName.split(" ");
	
	for (i=0; i< words.length; i++) {
		if (words[i].length > 9) vFontSize='12sp';
		if (words[i].length > 13) vFontSize='11sp';
	}
	
	var buttonLblView= Ti.UI.createView({ width: '90%', left: '8%', height: '90%', top: '8%'}); //fudging it off center
	var buttonLbl = Ti.UI.createLabel({
	  color: 'white',
	  font: {  fontFamily: 'AvenirNextCondensed-Bold', fontSize: vFontSize, fontWeight: 'bold' },
	  text: _args.portfolioName,
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  width: 66,
	  top: 17
	});
			
	buttonLblView.add(buttonLbl);
	self.add(buttonLblView);
		
	buttonLbl.transform = Ti.UI.create2DMatrix().rotate(-4);
	
	self.fadeOutText = function(e) {
		animation.fadeOut(buttonLblView, 400);
	};

	self.goAddNew = function(e) {
		var goLargeAnim = Ti.UI.createAnimation({
	    duration : 750,
	    delay: 0,
	    height: fullsize.height,
	    width: fullsize.width,
	    left: 351,
	    top: 185
	  });
				  
	  goLargeAnim.addEventListener('complete', function(e) {
	  	openPortfolioAddNew(_args.vaultNum);
	  });
				  
		self.animate(goLargeAnim);
	};

	self.goSmall = function(e) {
		var goSmallAnim = Ti.UI.createAnimation({
	    duration : 750,
	    delay: 0,
	    height: _args.height,
	    width: _args.width,
	    left: _args.left,
	    top: _args.top,
	    zIndex: 500
	  });
	  
	  goSmallAnim.addEventListener('complete', function(e) {
	  	Ti.App.fireEvent('PortfolioButtonClick', {});
	  });
	  
	  self.animate(goSmallAnim);
	};
		
	self.goLarge = function(e) {
		var goLargeAnim = Ti.UI.createAnimation({
	    duration : mietf.animgoLargeAnim,
	    delay: 0,
	    height: fullsize.height,
	    width: fullsize.width,
	    left: 351,
	    top: 185
	  });
	  
	  goLargeAnim.addEventListener('complete', function(e) {
	  	playFolderOpen(_args.vaultNum);
	  });
	  
	  self.animate(goLargeAnim);
	};
	
	return self;
};

module.exports = portfolioBigButton;