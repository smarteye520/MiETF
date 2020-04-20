function graphOverlay(_args) {
	
	var self = Ti.UI.createView({
		width: 768,
		height: 544,
		opacity: 0,
		zIndex: 500
	});
	
	var container  = Ti.UI.createView({
		width: 768/2,
		height: 544/2,
		zIndex: 1,
		borderColor: 'black',
		borderWidth: 3,
		borderRadius: 10
	});
	
	self.add(container);
	
	var room = Ti.UI.createView({
		width: 768/2,
		height: 544/2,
		backgroundImage: 'images/ifapps/room_background_sm.png',
		zIndex: 1
	});
	
	var slidingBackground = Ti.UI.createImageView({
		image: 'images/ifapps/nature_sm.png',
		zIndex: 0,
		top: 0,
		left: 0,
		width: 2520/2,
		height: 420/2	
	});
	
	var runningMan = Ti.UI.createImageView({
		image: 'images/ifapps/runningman_sm.png',
		zIndex: 2,
		left: 12/2,
		bottom: 12/2	,
		width: 424/2,
		height: 500/2
	});
	
	container.add(slidingBackground);
	container.add(room);
	container.add(runningMan);
	
	var runningManAnim = Ti.UI.createAnimation({
	    duration : 100,
	    repeat: 40000,
	    transform : Ti.UI.create2DMatrix().rotate(-2),
	    curve: Titanium.UI.ANIMATION_CURVE_LINEAR,
	    autoreverse: true
	  });
	
	runningMan.transform = Ti.UI.create2DMatrix().rotate(2);
	runningMan.animate(runningManAnim);
	
	var goBackAnim = Ti.UI.createAnimation({
	    duration : 12000,
	    left: -1260/2,
	    repeat: 40000,
	    curve: Titanium.UI.ANIMATION_CURVE_LINEAR
	  });
	  
	 slidingBackground.animate(goBackAnim);
	
	/*
	var self = Ti.UI.createView({
		top: 544,
		left: 0,
		width: 768,
		height: 544,
		opacity: 1,
		backgroundImage: 'images/ifapps/paperBottom.pn8'
	});
	*/

	return self;
};

module.exports = graphOverlay; 