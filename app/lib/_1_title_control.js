var dispatcher = require('dispatcher');

function titleControl(_args) {
	var self = Ti.UI.createView({
		top: 0,
		left: 32,
		right: 32,
		height: 140,
		opacity: 1.0,
		touchEnabled: false,
    storedTitle: ''
	});
	
	var isVaults = true;
	
	var availMem = Ti.UI.createLabel({
		left: 560,
		bottom: 0,
		height: 32,
		text: '', //Titanium.Platform.availableMemory,
		color: 'white',
		font:{fontFamily: 'AvenirNextCondensed-Bold', fontSize: '26sp', fontWeight: 'bold'},
		width: 650
	});
	
	self.add(availMem);
	
	self.updateMem = function(e) {
		availMem.text = ''; //Titanium.Platform.availableMemory;
	};
	
	var MiETFView = Ti.UI.createView({
		top: 28,
		left: 3,
		width: 153,
		height: 52, //306 x 104 or 153 x 52
		backgroundImage: 'images/ifapps/logo_large.pn8'
	});
	
	var letterI = Ti.UI.createView({
		top: 0,
		left: 51, //
		height: 52,
		width: 12,
		backgroundColor: 'black'
	});
	
	var goColor = Ti.UI.createImageView({
		image: 'images/ifapps/rainbow.pn8',
		width: 2000,
		height: 52,
		right: -1984,
		zIndex: 1
	});
	
	var colorOverlay = Ti.UI.createImageView({
		width: 12,
		height: 52,
		zIndex: 2
	});
	
	var invertedI = Ti.UI.createImageView({
		image: 'images/ifapps/invertedI.pn8',
		width: 12,
		height: 52,
		zIndex: 3
	});
	
	
	letterI.add(goColor);
	letterI.add(colorOverlay);
	letterI.add(invertedI);

	MiETFView.add(letterI);
	
	self.add(MiETFView);
	
	var text = "";
	var attr = Ti.UI.createAttributedString({
    text: text,
    attributes: [ {
        type: Ti.UI.iOS.ATTRIBUTE_KERN,
        value: 	0.1,
        range: [0, text.length]
    }]
	});
	
	var TitleLbl = Ti.UI.createLabel({
		bottom: 3,
		attributedString: attr,
		color: 'white',
		font:{fontFamily: 'AvenirNextCondensed-Bold', fontSize: 32, fontWeight: 'bold'}
	});
	
	self.add(TitleLbl);
	
	var allowAnim = true;
	
	self.setTitleImmediate = function(e) {
		var text = e.title;
		var attr = Ti.UI.createAttributedString({
	    text: text,
	    attributes: [
	        {
	            type: Ti.UI.iOS.ATTRIBUTE_KERN,
	            value: 	0.1,
	            range: [0, text.length]
	        }
	    ]
		});
		TitleLbl.attributedString = attr;
	};
	
	self.restartAnim = function(e) {
	  letterI.remove(goColor);
	  goColor = Ti.UI.createImageView({
			image: 'images/ifapps/rainbow.pn8',
			width: 2000,
			height: 52,
			right: -1984,
			zIndex: 1
		});
	 	letterI.add(goColor);
  	goColor.animate(goColorAnim);
	};
	
	self.setColor = function(e) {
		
		var color = e.color.toString();
    if (color == 'rainbow' && mietf.currentScreen == 'vaultSelect') {
     	colorOverlay.backgroundColor = 'transparent';
     	goColor.image =	'images/ifapps/rainbow.pn8';
     	allowAnim = true;
     	goColor.animate(goColorAnim);
     } else {
     	if (color != 'rainbow') {
     		mietf.currentVaultColor = color;
				allowAnim = false;
     	  colorOverlay.backgroundColor = color;
     	}
		}
		dispatcher.trigger('changeColor', {color: color});
	};
    
  self.fadeAndSetTitle = function(e) {
    self.storedTitle = e.title;
    
    isVaults = e.isVaults;
    var text = e.title;
    attr = Ti.UI.createAttributedString({
      text: text,
      attributes: [{
      	type: Ti.UI.iOS.ATTRIBUTE_KERN,
				value: 	1.0,
       	range: [0, text.length]
      }]
    });
    TitleLbl.animate(fadeTitle);      
	};
    
	self.setTitle = function(e) {
		isVaults = e.isVaults;
		var text = e.title;
		attr = Ti.UI.createAttributedString({
		    text: text,
		    attributes: [
		        {
		            type: Ti.UI.iOS.ATTRIBUTE_KERN,
		            value: 	1.0,
		            range: [0, text.length]
		        }
		    ]
		});
		
		TitleLbl.animate(fadeOut);
		
	};
	
  self.setTitleFaster = function(e) {
		isVaults = e.isVaults;
		var text = e.title;
		attr = Ti.UI.createAttributedString({
		    text: text,
		    attributes: [
		        {
		            type: Ti.UI.iOS.ATTRIBUTE_KERN,
		            value: 	1.0,
		            range: [0, text.length]
		        }
		    ]
		});
		TitleLbl.animate(fadeOutFaster);
	};
	
	self.setTitleFastest = function(e) {
		isVaults = e.isVaults;
		var text = e.title;
		attr = Ti.UI.createAttributedString({
		    text: text,
		    attributes: [{
          type: Ti.UI.iOS.ATTRIBUTE_KERN,
          value: 	1.0,
          range: [0, text.length]
        }]
		});
		TitleLbl.animate(fadeOutFastest);
	};
	
	self.setTitleSlower = function(e) {
		isVaults = e.isVaults;
		var text = e.title;
		attr = Ti.UI.createAttributedString({
		    text: text,
		    attributes: [
		        {
		            type: Ti.UI.iOS.ATTRIBUTE_KERN,
		            value: 	1.0,
		            range: [0, text.length]
		        }
		    ]
		});
		
		TitleLbl.animate(fadeOutSlower);
		
	};
    
  self.fadeTitleIn = function(e) {
		TitleLbl.bottom = 3;
    if (isVaults == false)  TitleLbl.bottom = 48;
    TitleLbl.attributedString = attr;
    animation.fadeIn(TitleLbl,mietf.animTitleControlFadeTitleIn);
    Ti.App.fireEvent('hello1', {});      
	};
	
	function doFinishSetTitle (e) {
		TitleLbl.bottom = 3;
		if (isVaults == false)  TitleLbl.bottom = 48;
	  TitleLbl.attributedString = attr;
		setTimeout(function (e) {
			Ti.App.fireEvent('hello1', {});	
		}, setting.titleBlankBeforeFadeIn);
	};
	
	function doFinishSetTitleSlower (e) {
		TitleLbl.bottom = 3;
		if (isVaults == false)  TitleLbl.bottom = 48;
	  TitleLbl.attributedString = attr;
		setTimeout(function (e) {
			Ti.App.fireEvent('hello1', {});	
				animation.fadeIn(TitleLbl,mietf.animTitleControlFadeTitleInSlower);	
			}, mietf.animTitleBlankBeforeFadeInSlower);
		};
	
		var goColorAnim = Ti.UI.createAnimation({
	    duration : 12000,
	    right: 0,
	    repeat: 40000,
	    curve: Titanium.UI.ANIMATION_CURVE_LINEAR
	  });
    
    var fadeTitle = Ti.UI.createAnimation({
    	duration : 800,
    	opacity: 0,
    	curve: Titanium.UI.ANIMATION_CURVE_EASE_IN 
    });
	  
	  var fadeOut = Ti.UI.createAnimation({
	    duration : mietf.animTitleFadeOut,
			opacity: 0,
	    curve: Titanium.UI.ANIMATION_CURVE_EASE_IN 
	  });
	  
	  fadeOut.addEventListener('complete', function(e) {
	  	doFinishSetTitle();
	  });
	  
		var fadeOutSlower = Ti.UI.createAnimation({
	    duration : 800,
			opacity: 0,
	    curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
	    delay: 0 
	  });
	  
	  fadeOutSlower.addEventListener('complete', function(e) {
	  	doFinishSetTitleSlower();
	  });
	  
	 	var fadeOutFaster = Ti.UI.createAnimation({
	    duration : 800,
			opacity: 0,
	    curve: Titanium.UI.ANIMATION_CURVE_EASE_IN
	  });
	  
	  fadeOutFaster.addEventListener('complete', function(e) {
	  	doFinishSetTitle();
	  });
	  
	 var fadeOutFastest = Ti.UI.createAnimation({
	    duration : 400,
			opacity: 0,
	    curve: Titanium.UI.ANIMATION_CURVE_EASE_IN
	  });
	  
	  fadeOutFastest.addEventListener('complete', function(e) {
	  	doFinishSetTitle();
	  });

	
	return self;
};

module.exports = titleControl;