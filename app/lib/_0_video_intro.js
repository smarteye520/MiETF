function videoIntro(_args) {

	var self = Ti.UI.createView({
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		opacity: 1.0,
		zIndex: 100000
	});
	
	var movieView = Ti.UI.createView({
		width: 1024,
		height: 768,
		backgroundImage: 'images/latest/background@2x.jpg'
	});
	 
	var skipArrow = Ti.UI.createImageView({
	 	bottom:20,
	 	right: 20,
		width: 72,
		height: 72,
		image: 'images/ifapps/skipArrow.pn8'
	});
	
	if (Ti.App.Properties.getBool('firstTime', true)) skipArrow.opacity = .1;
	
	skipArrow.addEventListener('click', function() {
		Ti.App.fireEvent('introComplete', {});
	});  
	
	var ballsV = [];
	 
	 
	 Ti.App.addEventListener('introComplete', function() {
			setTimeout(function(e) {
			if (Ti.App.Properties.getBool('firstTime', true)) {
	 		 	animation.fadeOut(self);
	 		 	Ti.App.fireEvent('startDownloads', {});
	 		 	//null
	 		 	} else {
	 		 	 showVaultSelect();
	 		 	};
	 		 	Ti.App.fireEvent("updateStocks", {});
			}, 300);
			
	});
	 
	self.add(movieView);
	movieView.add(skipArrow);
	
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

var text = "MiETF";
var attr = Ti.UI.createAttributedString({
    text: text,
    attributes: [
       {
       type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
       value: '#ffffff',
       range: [0, 1]
       },
        {
           type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
           value: '#ffffff',
            range: [text.indexOf('i'), ('i').length]
       },
                   {
           type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
           value:'#ffffff',
            range: [text.indexOf('i')+1, 3]
       },
        {
            type: Ti.UI.ATTRIBUTE_FONT,
            value: { fontSize: 100, fontFamily: 'AvenirNextCondensed-Bold', fontWeight: 'bold' },
            range: [0, text.length]
        }
    ]
});

var label = Ti.UI.createLabel({
    attributedString: attr,
    left: 26+70,
    top: 379,
    opacity: 1.0
});

var blueMiETF = Ti.UI.createImageView({
	image: 'images/ifapps/logo_large_blue.pn8',
	width: 226,
	height: 76,
	opacity: 0,
	left: 102,
	top: 404
});

	
self.introPlay = function(vaultNum) {
	var CustomImageView = require('CustomBallView');
	var animatedImages = new Array();
	animatedImages.push('images/intro/intro-001.pn8');
													
	for (x=1; x<=119; x++) {
		animatedImages.push('images/intro/intro-' + zeroPad(x, 3) +'.pn8');
	}
	
  ballsV = new CustomImageView({
    parent: self,
		zIndex: 50,
		animatedImages: animatedImages,
    left: 0,
    top: 144,
    width: 1022 ,
    height: 400,
		duration:26, //33ms per frame would be 30fps, 42 would be 24fps
		repeatCount:1,
		opacity:1
	});

	movieView.add(ballsV);
	ballsV.startAnimation(movieView);

	movieView.add(label);	
	movieView.add(blueMiETF);		
};
	
self.moveFromHighToLine = function(e){
	label.animate(Ti.UI.createAnimation({ left: 185, top: 322, opacity: 1.0, color: 'white', duration: 300}));	//228
};

	var MiETFView = Ti.UI.createView({
		top: 0,
		left: 12,
		width: 153,
		height: 48,
		backgroundImage: 'images/ifapps/logo_large.pn8'
	});
	
self.moveFromLineToRight = function(e){
label.animate(Ti.UI.createAnimation({ left: 230, top: 322, opacity: 1.0, color: 'white', duration: 300}));	//was 300
};

self.moveFromRightToLine = function(e){
label.animate(Ti.UI.createAnimation({ left: 225, top: 322, opacity: 1.0, color: 'white', duration: 300}));	//was 300
};

self.moveFromLinetoEnd = function(e){
	var fadeBallsAnim = Ti.UI.createAnimation({
		opacity: 0,
		duration: 500
	});

	fadeBallsAnim.addEventListener('complete', function(e) {
		blueMiETF.opacity= 1;
		label.opacity=0;
		
		var blueMiETFAnim = Ti.UI.createAnimation({width: 153, height: 52, top: 28, left: 35, duration: 500});
		
		blueMiETFAnim.addEventListener('complete', function(e) {
			Ti.App.fireEvent('introComplete', {});
		});
		
		blueMiETF.animate(blueMiETFAnim);
		//label.animate(Ti.UI.createAnimation({ left: 28, top: 11, opacity: 1.0, color: 'white', duration: 500}));	
	});
	
	ballsV.animate(fadeBallsAnim);
};	
	
self.changeIColor = function(color) {
	var text = "MiETF";
	var attr = Ti.UI.createAttributedString({
    text: text,
    attributes: [
     {
           type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
           value: '#ffffff',
            range: [0, 1]
       },
        {
           type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: color,
            range: [text.indexOf('i'), ('i').length]
        },
                   {
           type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
           value:'#ffffff',
            range: [text.indexOf('i')+1, 3]
       },
        {
            type: Ti.UI.ATTRIBUTE_FONT,
            value: { fontSize: 100, fontFamily: 'AvenirNextCondensed-Bold', fontWeight: 'bold' },
            range: [0, text.length]
        }
    ]
});

label.attributedString = attr;
	
};

self.changeIColorWithSize = function(color, size) {
	var text = "MiETF";
	var attr = Ti.UI.createAttributedString({
    text: text,
    attributes: [
    {
       type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: color,
        range: [text.indexOf('i'), ('i').length]
    },
    {
        type: Ti.UI.ATTRIBUTE_FONT,
        value: { fontSize: size, fontFamily: 'AvenirNextCondensed-Bold', fontWeight: 'bold' },
        range: [0, text.length]
    }
    ]
	});
	label.attributedString = attr;
};
	
	return self;
};

module.exports = videoIntro;