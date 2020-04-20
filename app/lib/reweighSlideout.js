function reweighSlideout(_args) {

	var self = Ti.UI.createView({
		left : '110%',
		width : '100%',
		touchEnabled : true,
		zIndex : 1060,
		top: 100
	});
	

	var dontIgnore = true;
	
		var parent=_args.parent;
	
    Ti.App.addEventListener('closeSlideouts', function(e) {
		if (e.dontIgnore) {
			self.animate(hideView);
		}
		dontIgnore = true;
	});
	

	var checkValueFlg;

	var txtMsgs = new Array();
	txtMsgs.push('MiETF Reweighing Strategy');
	txtMsgs.push('What should be done?');
	txtMsgs.push('');
	txtMsgs.push('');
	txtMsgs.push('');
	txtMsgs.push('');

	var txtLbls = new Array();
	txtLbls.push(Ti.UI.createLabel({//title of page
		top : 62,
		left : 82,
		width: 400,
		text : '',
		color : 'black', //'#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	}));

	txtLbls.push(Ti.UI.createLabel({//page instructions
		left : 82,
		top : 150,
		width : 680,
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black', // '#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	}));

	txtLbls.push(Ti.UI.createLabel({//master password 
		width : 208, //186
		left : 262,
		top : 213,
		height : 40,
		text : ' ',
		color : 'black',
		shadowColor : '#333',
		shadowOffset : {
			x : 1,
			y : 1
		},
		shadowRadius : 3,
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	}));

	txtLbls.push(Ti.UI.createLabel({//retype master password 
		left : 179,
		width : 274,
		top : 255,
		height : 40,
		text : ' ',
		color : 'black',
		shadowColor : '#333',
		shadowOffset : {
			x : 1,
			y : 1
		},
		shadowRadius : 3,
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	}));

	txtLbls.push(Ti.UI.createLabel({//password hint 
		width : 177,
		left : 293,
		top : 297,
		height : 40,
		text : ' ',
		color : 'black',
		shadowColor : '#333',
		shadowOffset : {
			x : 1,
			y : 1
		},
		shadowRadius : 3,
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	}));
	
	txtLbls.push(Ti.UI.createLabel({//status msg <--------------------STATUS MSG
		left: 82,
		top: 273, //was 12
		width: 396,
		height: Ti.UI.SIZE,
		text : ' ',
		color : 'red',
		font : {
			fontFamily : 'AmericanTypewriter-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	}));

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
		height : imgs.whiteViewHeight,
		width : imgs.whiteViewWidth,
		top : 0,
		borderRadius : imgs.whiteViewBorderRadius,
		backgroundImage : imgs.whiteViewBackgroundImage,
		left : 0,
		touchEnabled : true
	});

	sv.add(whiteView);

	var contentView = Ti.UI.createView({
		left : -150,
		right : 150,
		height : 'auto',
		top : 0,
		touchEnabled : true
	});

	sv.add(contentView);

	var insideView = Ti.UI.createView({
		left : 150,
		width : 920,
		height : 625,
		top: 30

	});

	contentView.add(insideView);

	insideView.add(txtLbls[0]);
	insideView.add(txtLbls[1]);
	insideView.add(txtLbls[2]);
	insideView.add(txtLbls[3]);
	insideView.add(txtLbls[4]);
	insideView.add(txtLbls[5]);

	var step3Pane = Ti.UI.createView({
		width: 320,
		top: 188,
		left: 84,
		layout: 'vertical',
		opacity: 0,
		zIndex: 500
	});
	
	//please
	
	var  step3Buttons = new Array();
	
	step3Buttons.push(Ti.UI.createButton({
        	title: 'Rebalance to original weighting',
        	textAlign: 'left',
	 		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius:10,
			font:{fontFamily: 'AvenirNextCondensed-Bold', fontSize: '14sp', fontWeight: 'bold'},
			backgroundGradient:{type:'linear',
			colors:['#000001','#666666'],
			startPoint:{x:0,y:0},
			endPoint:{x:2,y:50},
			backFillStart:false},
			borderWidth:1,
			borderColor:'#666',
			width: 240,
			left: 0,
			height: 32,
			bottom: 8,
			i: 0
       }));
       
       	step3Buttons.push(Ti.UI.createButton({
        	title: 'Nothing, never rebalance, just hold',
        	textAlign: 'left',
	 		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius:10,
			font:{fontFamily: 'AvenirNextCondensed-Bold', fontSize: '14sp', fontWeight: 'bold'},
			backgroundGradient:{type:'linear',
			colors:['#000001','#666666'],
			startPoint:{x:0,y:0},
			endPoint:{x:2,y:50},
			backFillStart:false},
			borderWidth:1,
			borderColor:'#666',
			width: 240,
			left: 0,
			height: 32,
			bottom: 8,
			i: 1
       }));
       
       step3Buttons[0].addEventListener('click', step3ButtonClick);
       step3Buttons[1].addEventListener('click', step3ButtonClick);
	
		step3Pane.add(step3Buttons[0]);
		step3Pane.add(step3Buttons[1]);

insideView.add(step3Pane);


	
	var line2Lbl = Ti.UI.createLabel({//page instructions
		left : 82,
		top : 132,
		width : 662,
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black', // '#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	});
	
	var line3Lbl = Ti.UI.createLabel({//page instructions
		left : 82,
		top : 157,
		width : 662,
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black', // '#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	});
	
	insideView.add(line2Lbl);
	insideView.add(line3Lbl);
	


	var closeArrow = Ti.UI.createView({});
	insideView.add(closeArrow);

	resetCloseArrow();

	function resetCloseArrow(e) {

		closeArrow = Ti.UI.createLabel({
			color : '#4D4D4D',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '80sp',
				fontWeight : 'bold'
			},
			text : '',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			width : 100,
			height : 50,
			touchEnabled : true,
			left : 0
		});

		var olt = Titanium.UI.create3DMatrix(), curX, totalDelta = 0;

		closeArrow.addEventListener('touchstart', function(e) {
			curX = e.x;
		});

		closeArrow.addEventListener('touchmove', function(e) {
			var deltaX = e.x - curX;

			if (deltaX > 0) {
				totalDelta = totalDelta + deltaX;
				olt = olt.translate(deltaX, 0, 0);
				sv.animate({
					transform : olt,
					duration : 100
				});
			}
		});

		closeArrow.addEventListener('touchend', function(e) {
			if (totalDelta < 100) {
				var resetTransform = Titanium.UI.create3DMatrix();
				sv.animate({
					transform : resetTransform.translate(0, 0, 0),
					duration : 500
				});
				resetCloseArrow();
			} else {
				self.animate(hideView);
			}

		});

		closeArrow.addEventListener('click', function(e) {
			///THIS IS THE  CLICK EVENT
		});

		insideView.add(closeArrow);

	};

	var closeButton = Titanium.UI.createButton({
		top : imgs.closeButtonTop,
		width : imgs.closeButtonWidth,
		height : imgs.closeButtonHeight,
		backgroundImage : imgs.closeButtonBackgroundImage,
		right : imgs.closeButtonRight
	});

	insideView.add(closeButton);

	closeButton.addEventListener('click', function(e) {
		self.animate(hideView);
	});


	var c = 0;
	var timer;
	
		function step1() {
			var step = 1;
			    step--; 
			    
		 var text = txtMsgs[step].substr(0, c) + '_';
		var attr = Ti.UI.createAttributedString({
		    text: text, 
		    attributes: [
		        {
		            type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
	               value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		           range: [0, text.length]
		        }
		    ]
		});
	
		txtLbls[step].attributedString = attr;

		if (c == txtMsgs[step].length) {
			clearInterval(timer);
			c = 0;
			timer = setInterval(step1blink, Ti.App.Properties.getInt('step1BlinkInterval', 200));
		}

		c++;
	}
	
     var even = 0;
	function step1blink() {
        var step = 1;
			step--; 
		
		if (even == 0)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
		if (even == 1)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';
		
		var attr = Ti.UI.createAttributedString({
		    text: text, 
		    attributes: [
		        {
		            type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
	               value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		           range: [0, text.length]
		        }
		    ]
		});
		
		txtLbls[step].attributedString = attr;
	
		if (c == Ti.App.Properties.getInt('step1BlinkCount',10)) {
			var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
			var attr = Ti.UI.createAttributedString({
		    text: text, 
		    attributes: [
		        {
		            type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
	               value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		           range: [0, text.length]
		        }
		    ]
		});
			
			txtLbls[step].attributedString = attr;
			clearInterval(timer);
			c = 0;
			timer = setInterval(step2, Ti.App.Properties.getInt('step2Interval', 50));
		}

		c++;
		even++;
		if (even == 2) even=0;
	}

function step2() {
			var step = 2;
			    step--; 
			    
		 var text = txtMsgs[step].substr(0, c) + '_';
		var attr = Ti.UI.createAttributedString({
		    text: text
		});
	
		txtLbls[step].attributedString = attr;

		if (c == txtMsgs[step].length) {
			clearInterval(timer);
			c = 0;
			timer = setInterval(step2blink, Ti.App.Properties.getInt('step2BlinkInterval', 200));
		}

		c++;
	}
	
     var even = 0;
	function step2blink() {
        var step = 2;
			step--; 
		
		if (even == 0)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
		if (even == 1)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';
		
		var attr = Ti.UI.createAttributedString({
		    text: text
		});
		
		txtLbls[step].attributedString = attr;
	
		if (c == Ti.App.Properties.getInt('step1BlinkCount',10)) {
			var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
			var attr = Ti.UI.createAttributedString({
		    text: text
		});
			
			txtLbls[step].attributedString = attr;
			clearInterval(timer);
			c = 0;
			step3();
			//timer = setInterval(step3, Ti.App.Properties.getInt('step2Interval', 50));
		}

		c++;
		even++;
		if (even == 2) even=0;
	}
	
	 function step3ButtonClick(e){
	 	
	 	Ti.App.fireEvent('updateStrategyButton', { buttonChoice: e.source.i});

		var goRight = Titanium.UI.createAnimation();
			goRight.left = 32;
			goRight.duration = 400;
			
		var goLeft = Titanium.UI.createAnimation();
			goLeft.left = 0;
			goLeft.duration = 400;
			
		e.source.animate(goRight);
		
		e.source.backgroundGradient = {type:'linear',
			colors:['#2d9bd9','#4da7de'], //here'#2d9bd9', color: '#4da7de'
			startPoint:{x:0,y:0},
			endPoint:{x:2,y:50},
			backFillStart:false};

		for (i=0; i < step3Buttons.length; i++) {
			if (i != e.source.i) {
				step3Buttons[i].animate(goLeft);
				step3Buttons[i].backgroundGradient = {type:'linear',
										colors:['#000001','#666666'],
										startPoint:{x:0,y:0},
										endPoint:{x:2,y:50},
										backFillStart:false};
			}
		}
	

	 }
	
	function step3() {

	animation.popIn(step3Pane);
	
		
	}


	function saveSettings() {



	}

	function setStatusMsg(msg) {
		//txtLbls[5].text = ' ';
		//txtMsgs[5] = msg;
		//c=0;
		//timer = setInterval(step6, Ti.App.Properties.getInt('step6Interval', 90));
	};

	self.slideIn = function(e) {
		dontIgnore = false;
		self.animate(showView);
	};

	self.slideOut = function(e) {
		self.animate(hideView);
	};
	//animation
	var showView = Titanium.UI.createAnimation();
	showView.left = 214;
	showView.duration = 500;
	showView.delay = 500;

	showView.addEventListener('complete', function(e) {
		//reset some values
		
		//start here
		timer = setInterval(step1, Ti.App.Properties.getInt('step1Interval', 90));
	});

	var hideView = Titanium.UI.createAnimation();
	hideView.left = '110%';
	hideView.duration = 500;

	function resetOnClose() {
		//reset some values
		mietf.reweighOut = false;
		
		if (mietf.strategyNum != mietf.strategySave) {
		mietf.strategySave = mietf.StrategyNum;
		Ti.App.fireEvent('updateCanvasFullWithData', {});	
		}
		
		
		
		
		for (var j = 0; j < txtLbls.length; j++) { 
		txtLbls[j].text = ' ';	
		}
		c = 0;

		resetCloseArrow();

		var resetTransform = Titanium.UI.create3DMatrix();
		sv.animate({
			transform : resetTransform.translate(0, 0, 0),
			duration : 100
		});
		parent.remove(self);
	};
	hideView.addEventListener('complete', resetOnClose);
	
self.addEventListener('swipe', function(e) {
	if (e.direction === 'right') self.animate(hideView);
});

	return self;
};

module.exports = reweighSlideout; 