function answerSlideout(_args) {

	var self = Ti.UI.createView({
		top : '99%', //Note, 768 or larger does not work.
		width : '100%',
		touchEnabled : true,
		zIndex : 121,
		left : 0, 
		bubbleParent: false
	});
	
	var parent=_args.parent;
	var answer=_args.answer;

	
	var sv = Ti.UI.createScrollView({
		touchEnabled : true,
		contentWidth : 'auto',
		contentHeight : 'auto',
		top : 0,
		left : 0,
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true
	});

	self.add(sv);
	

	var whiteView = Ti.UI.createView({
		height : 672,
		width : 810,
		top : 0,
		borderRadius : imgs.whiteViewBorderRadius,
		backgroundImage : 'images/ifapps/whitebackWithShadow.pn8', //'images/ifapps/whitesheetWithShadow.pn8', 1632 x 1344
		left : 0,
		touchEnabled : true
	});
	sv.add(whiteView);



	var insideView = Ti.UI.createView({
		left : 0,
		width : '100%',
		height : '100%',
		top: 0
	});


	sv.add(insideView);
	
	var titleLbl = Ti.UI.createLabel({
	"left": "44",
	"width": "550",
	"top": "34",
	"attributedString": answer.titleAttrText,
	"font": {fontSize:'22sp',fontFamily:'AmericanTypewriter',fontStyle:'normal',fontWeight:'normal'}
	});

	insideView.add(titleLbl);
	
	var tearoffImg = Ti.UI.createImageView({
		image: answer.tearoff,
		width: 225,
		height: 215,
		left: 36,
		top: 82
	});
	
	insideView.add(tearoffImg);
			
var helpLbl = Ti.UI.createLabel({
	"left": "270",
	"width": "510",
	"top": "82",
	"attributedString": answer.bodyAttrText,
	"font": {fontSize:'18sp',fontFamily:'AvenirNextCondensed-Regular',fontStyle:'normal',fontWeight:'normal'}
	});
	
	insideView.add(helpLbl);
	
var closeButton = Titanium.UI.createButton({
		top : 32,
		width : 32,
		height : 32,
		backgroundImage : imgs.closeButtonBackgroundImage,
		right : 32
	});

	insideView.add(closeButton);

	closeButton.addEventListener('click', function(e) {
		self.animate(hideView);
	});


	self.slideIn = function(e) {
		self.animate(showView);
	};

	Ti.App.addEventListener('closeSlideouts', function(e) {
		self.animate(hideView);
	});
	
	self.slideOut = function(e) {
		self.animate(hideView);
	};
	//animation
	var showView = Titanium.UI.createAnimation();
	showView.top = 0;
	showView.duration = 500;
	showView.delay = 500;

	var hideView = Titanium.UI.createAnimation();
	hideView.top = '110%';
	hideView.duration = 500;
	

	self.addEventListener('swipe', function(e) {
	if (e.direction === 'right') self.animate(hideView);
});

	return self;
};

module.exports = answerSlideout; 