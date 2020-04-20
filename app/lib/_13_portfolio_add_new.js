function portfolioAddNew(_args) {
	var self = Ti.UI.createView({
		top: 102,
		left: 213,
		width: 811,
		height: 666,
		zIndex: 51,
		opacity: 0,
		vaultNum: 1,
		vaultName: 'Test',
		portfolioName: 'Test'
	});
	
  self.prepare = function(e) {
  	self.vaultNum = e.vaultNum;
  	self.vaultName = e.vaultName;
  	self.portfolioName = e.portfolioName;  	
  };
	    
	var largeFolder = Ti.UI.createImageView({
		left: 138,
		top: 83,
		image: 'images/latest/first_ghost.pn8',
		width: 306,
		height:391,
	});
	
	self.add(largeFolder);
	    
	var label = Ti.UI.createLabel({
    text   : "Coming Soon: Add New",
    height : 'auto',
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    width  : 200,
    top: 90,
    left: 75,
    color  : "white",
    font   : { fontFamily: 'AvenirNextCondensed-Bold', fontStyle: 'bold', fontSize : '32sp'}
  });
        
	label.transform = Ti.UI.create2DMatrix().rotate(-4);
        
	largeFolder.add(label);
       
 	var cancelLabel = Ti.UI.createLabel({
    text   : "Go Back",
    height : 'auto',
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    width  : 200,
    top: 290,
    left: 75,
    color  : "black",
    font   : { fontFamily: 'AvenirNextCondensed-Bold', fontStyle: 'bold', fontSize : '21sp'}
  });
        
	cancelLabel.transform = Ti.UI.create2DMatrix().rotate(-4);
        
	largeFolder.add(cancelLabel);
       
	cancelLabel.addEventListener('click', function(e) {
		closePortfolioAddNew();
	});
	return self;
};

module.exports = portfolioAddNew;