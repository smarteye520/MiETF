function portfolioButton(_args) {

	var iconsize = {
		height : 185,
		width : 234
	};
	var fullsize = {
		height : 722,
		width : 858
	};
	var opacity = _args.opacity;
	var height = _args.height;
	var width = _args.width;
	var zIndex = _args.zIndex;

	var wobbleAnim = Ti.UI.createAnimation({
		duration : 100,
		repeat : 40000,
		transform : Ti.UI.create2DMatrix().rotate(-2),
		curve : Titanium.UI.ANIMATION_CURVE_LINEAR,
		autoreverse : true
	});

	var wobbleAnim2 = Ti.UI.createAnimation({
		duration : 1,
		transform : Ti.UI.create2DMatrix().rotate(0),
		curve : Titanium.UI.ANIMATION_CURVE_LINEAR
	});

	var wobbleStop = Ti.UI.createAnimation({
		duration : 100,
		repeat : 1,
		transform : Ti.UI.create2DMatrix().rotate(-3),
		curve : Titanium.UI.ANIMATION_CURVE_LINEAR,
		autoreverse : true
	});

	var self = Ti.UI.createView({
		height : height,
		width : width,
		id : _args.id,
		vaultColor : _args.backgroundColor,
		vaultNum : _args.vaultNum,
		portfolioName : _args.portfolioName,
		portfolioId : _args.portfolioId,
		portfolioId : _args.vaultId,
		zIndex : zIndex
	});

	var shakeSelf = Ti.UI.createImageView({
		image : 'images/latest/first_' + _args.vaultNum + '_sm.pn8',
		height : height,
		width : width,
		id : _args.id,
		vaultColor : _args.backgroundColor,
		vaultNum : _args.vaultNum,
		portfolioName : _args.portfolioName,
		portfolioId : _args.portfolioId,
		portfolioId : _args.vaultId,
		zIndex : zIndex
	});

	self.add(shakeSelf);

	var x2 = Ti.UI.createImageView({
		image : 'images/ifapps/Andy_Trash_Can.pn8',
		top : -5,
		left : -5,
		opacity : 0,
		height : 40,
		width : 40,
		zIndex : 300
	});

	self.add(x2);

	self.wobble = function(e) {
		if (_args.portfolioName != 'Add New Portfolio') {
			shakeSelf.transform = Ti.UI.create2DMatrix().rotate(2);
			shakeSelf.animate(wobbleAnim);
			self.x2On();
			self.x3On();
			self.isWobbling =true;
		}
	};

	self.stopWobble = function(e) {
		shakeSelf.animate(wobbleAnim2);
		shakeSelf.transform = Ti.UI.create2DMatrix().rotate(0);
		self.x2Off();
		self.x3Off();
		self.isWobbling =false;
	};

	self.x2Off = function(e) {
		x2.opacity = 0;

	};

	self.x2On = function(e) {

		x2.opacity = 1;

	};
	
	
	var x3 = Ti.UI.createImageView({
		image : 'images/ifapps/gear.pn8',
		bottom : -5,
		left : -5,
		opacity : 0,
		height : 40,
		width : 40,
		zIndex : 300
	});

	self.add(x3);
	
	self.x3On = function(e) {
		x3.opacity = 1;

	};

	self.x3Off = function(e) {
		x3.opacity = 0;

	};
	
	

	if (_args.portfolioName == 'Add New Portfolio') {
		shakeSelf.image = 'images/latest/first_ghost_sm.pn8';
	} else {

		if (_args.total > 3) {
			var countView = Ti.UI.createView({
				width : '90%',
				left : '8%',
				height : Ti.UI.SIZE,
				bottom : '8%'
			});
			//
			var countLbl = Ti.UI.createLabel({
				color : '#FFF8F0',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '13sp',
					fontWeight : 'bold'
				},
				text : _args.i + '/' + _args.total,
				textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
				width : 66,
				opacity : 0
			});

			Ti.App.addEventListener('hello1', function(e) {
				animation.fadeIn(countLbl, 500);
			});

			countLbl.transform = Ti.UI.create2DMatrix().rotate(-4);

			countView.add(countLbl);
			shakeSelf.add(countView);
		}
	}

	var vFontSize = '13sp';
	if (_args.portfolioName.length > 19)
		vFontSize = '12sp';

	var words = _args.portfolioName.split(" ");

	for ( i = 0; i < words.length; i++) {
		if (words[i].length > 9)
			vFontSize = '12sp';
		if (words[i].length > 13)
			vFontSize = '11sp';
	}

	var buttonLblView = Ti.UI.createView({
		width : '90%',
		left : '8%',
		height : '90%',
		top : '8%'
	});
	//fudging it off center
	var buttonLbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : vFontSize,
			fontWeight : 'bold'
		},
		text : _args.portfolioName,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : 66,
		top : 17
	});

	buttonLblView.add(buttonLbl);
	shakeSelf.add(buttonLblView);

	buttonLbl.transform = Ti.UI.create2DMatrix().rotate(-4);

	self.fadeOutText = function(e) {
		animation.fadeOut(buttonLblView, mietf.animPortfolioButtonFadeOutText);
	};

	self.fadeOut = function(e) {
		self.animate({
			duration : mietf.animPortfolioButtonFadeOut,
			opacity : 0,
			delay : mietf.animPortfolioButtonFadeOutDelay
		});

	};

	self.fadeIn = function(e) {
		buttonLblView.opacity = 1;
		animation.fadeIn(self, 400, fireEventFunction);
	};

	function fireEventFunction(e) {
		Ti.App.fireEvent('fadeOutPortfolioAddNew', {});
	};

	return self;
};

module.exports = portfolioButton; 