function snapshotSlideout(_args) {

	var self = Ti.UI.createView({
		top : 767, //Note, 768 or larger does not work.
		width : '100%',
		touchEnabled : true,
		zIndex : 121,
		left : 214, 
		bubbleParent: false
	});
	
	var parent=_args.parent;

	var checkValueFlg;

	var txtMsgs = new Array();
	txtMsgs.push('System Recovery Password');
	txtMsgs.push('Before locking this vault for the first time,');
  //txtMsgs.push('Please set a master rescue password (8 or more characters).');
  
  //txtMsgs.push('Password saved.  This master password can be changed at any');
  //txtMsgs.push('time by pressing the {} at the top right corner.  Clicking');
  //txtMsgs.push('the {} is also a gateway to many other resources.'); 
  
  
  //sentence one
  //sentence two - a
  //picture one
  //sentence two - b
  //sentence three - a
  //picture two
  //picture three b
  
	txtMsgs.push('Master Password');
	txtMsgs.push('Re-type Master Password');
	txtMsgs.push('Password Hint');
	txtMsgs.push('Password saved.');

	var txtLbls = new Array();
	txtLbls.push(Ti.UI.createLabel({//System Recovery Password
		top : 38,
		left : 82,
		width: 400,
		text : '',
		color : 'black', //'#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	}));

	txtLbls.push(Ti.UI.createLabel({//page instructions
		left : 82,
		top : 107-35,
		width : 680,
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black', // '#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	}));

	txtLbls.push(Ti.UI.createLabel({//master password 
		width : 208, //186
		left : 262-100,
		top : 213-9,
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
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	}));

	txtLbls.push(Ti.UI.createLabel({//retype master password 
		left : 176-100,
		width : 287,
		top : 255-9,
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
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	}));

	txtLbls.push(Ti.UI.createLabel({//password hint 
		width : 177,
		left : 290-100,
		top : 297-9,
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
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	}));
	
	txtLbls.push(Ti.UI.createLabel({//status msg <--------------------STATUS MSG
		left: 82,
		top: 362, //was 12
		width: 396,
		height: Ti.UI.SIZE,
		text : ' ',
		color : 'red',
		font : {
			fontFamily : 'AmericanTypewriter-Bold',
			fontSize : '21sp',
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
		backgroundImage : 'images/ifapps/whitebackWithShadow.pn8', //'images/ifapps/whitesheetWithShadow.pn8', 1632 x 1344
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
	
	var currentStep = 1;	
	var buttonHolderView = Ti.UI.createView({
		left: 631,
		width: 128,
		height: 198,
		touchEnabled: true,
		vaultId: 0,
		zIndex: 100,
		top: 205,
		opacity: 0
	});
	
	insideView.add(buttonHolderView);
		
	var buttonMetal = Ti.UI.createButton({
  		backgroundImage: 'images/latest/btn_ghost.pn8',
  		top: 0, height: 128, width:128, opacity: 1
  	});
  	
	buttonHolderView.add(buttonMetal);
	
		var SetLbl = require('setLblText');
	 var setLbl = new SetLbl();
	 setLbl.setText('NEXT');


	
	buttonMetal.add(setLbl);
	
	buttonMetal.addEventListener('click', function(e){
		if (currentStep == 1) {
		 masterPasswordInp.blur();
		 masterPasswordInp.fireEvent('return', {});
		 return;
		}
		
		if (currentStep == 2) {
		reTypeMasterPasswordInp.blur();
		reTypeMasterPasswordInp.fireEvent('return', {});
                                 
		return;
		}
		
		if (currentStep ==3) {
			passwordHintInp.blur();
			passwordHintInp.fireEvent('return', {});
			saveSettings();
			return;
		}
		
		if (currentStep == 4) {
			self.animate(hideView);
			return;
		}
		

		
	});
	
	var line2Lbl = Ti.UI.createLabel({//page instructions
		left : 82,
		top : 132-35,
		width : 662,
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black', // '#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	});
	
	var line3Lbl = Ti.UI.createLabel({//page instructions
		left : 82,
		top : 157-35,
		width : 662,
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black', // '#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	});
	
		var line4Lbl = Ti.UI.createLabel({//page instructions
		left : 82,
		top : 182-35,
		width : 662,
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black', // '#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	});
	
	////////
	
	
		var line5Lbl = Ti.UI.createLabel({//page instructions
		left : 82,
		top : 410,
		width : 662,
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black', // '#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	});
	
	var line6aLbl = Ti.UI.createLabel({//page instructions
		left : 82,
		top : 435,
		width : 662,
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black', // '#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	});
	
	var line6Btn = Ti.UI.createButton({
		left: 208,
		top: 432, //may be off now
		backgroundImage: 'images/latest/info_ico.pn8',
		width: 32,
		height: 32,
		opacity: 0
	});
	
		var line6bLbl = Ti.UI.createLabel({//page instructions
		left : 248,
		top : 435,
		width : 662,
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black', // '#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	});
	
	
	var line7Lbl = Ti.UI.createLabel({//page instructions
		left : 82,
		top : 460,
		width : 662,
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black', // '#57585d',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '21sp',
			fontWeight : 'bold'
		}
	});
	
	
	insideView.add(line2Lbl);
	insideView.add(line3Lbl);
	insideView.add(line4Lbl);
	insideView.add(line5Lbl);
	insideView.add(line6aLbl);
	insideView.add(line6Btn);
	insideView.add(line6bLbl);
	insideView.add(line7Lbl);
	
	
	
	var masterPasswordInp = Titanium.UI.createTextField({
		color : 'black',
		font : {
			fontFamily : 'HelveticaNeue',
			fontSize : '19sp',
			fontWeight : 'Bold'
		},
		height : 40,
		top : 210-9,
		right : 180+220,
		left : 460-100,
		hintText : 'Password',
		backgroundColor : 'transparent',
		borderRadius : 5,
		borderWidth : 1,
		borderColor : 'black',
		paddingLeft : 15,
		paddingRight : 15,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		value : '',
		passwordMask : true,
		zIndex : 20
	});
			masterPasswordInp.addEventListener('change', function(e){
    	e.source.value = e.source.value.slice(0,16);
	});


	masterPasswordInp.addEventListener('return', function(e) { //FINDMEFINDME
		
		clearInterval(timer);
		if (checkMasterPasswordLength()) {
					passwordHintInp.backgroundColor = 'transparent';
		masterPasswordInp.backgroundColor = 'transparent';
		reTypeMasterPasswordInp.backgroundColor = 'transparent';
		txtLbls[5].text = ' ';
		currentStep = 2;
			timer = setInterval(step4, Ti.App.Properties.getInt('step4Interval', 90));
		}
		
	});
	
	var submitView = Ti.UI.createView({
		right: 110,
		top: 189,
		width: 80,
		height: 80,
		borderRadius: 10,
		zIndex:1
		
	});
	
	insideView.add(submitView);
	
	/*
		var submitIcon1 = Ti.UI.createButton({
		backgroundImage: 'images/ifapps/next.pn8',
		width: 40,
		height: 40
	});
	
	submitView.add(submitIcon1);
	
	submitIcon1.addEventListener('click', function(e) {
		masterPasswordInp.blur();
		masterPasswordInp.fireEvent('return');
	});

*/

	insideView.add(masterPasswordInp);
	masterPasswordInp.opacity=0;

	var reTypeMasterPasswordInp = Titanium.UI.createTextField({
		color : '#151515',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '19sp',
			fontWeight : 'bold'
		},
		height : 40,
		top : 255-9, //255
		right : 180+220,
		left : 460-100,
		hintText : 'Repeat Password',
		backgroundColor : 'transparent',
		borderRadius : 5,
		borderWidth : 1,
		borderColor : 'black',
		paddingLeft : 15,
		paddingRight : 15,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		value : '',
		passwordMask : true,
		zIndex : 20
	});
	
			reTypeMasterPasswordInp.addEventListener('change', function(e){
    	e.source.value = e.source.value.slice(0,16);
	});
	
	reTypeMasterPasswordInp.addEventListener('return', function(e) {
		clearInterval(timer);
		if (checkPasswordMatch()) {
					passwordHintInp.backgroundColor = 'transparent';
		masterPasswordInp.backgroundColor = 'transparent';
		reTypeMasterPasswordInp.backgroundColor = 'transparent';
		txtLbls[5].text = ' ';
		currentStep = 3;
			timer = setInterval(step5, Ti.App.Properties.getInt('step5Interval', 90));
		}
	});
	
		var submitView2 = Ti.UI.createView({
		right: 110,
		top: 234,
		width: 80,
		height: 80,
		borderRadius: 10,
		zIndex:1
		
	});
	
	insideView.add(submitView2);
	
	
	insideView.add(reTypeMasterPasswordInp);
	submitView2.opacity=0;
	reTypeMasterPasswordInp.opacity=0;

	var passwordHintInp = Titanium.UI.createTextField({
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '21sp',
			fontWeight : 'bold'
		},
		height : 40,
		top : 300-9,
		right : 180+220,
		left : 460-100,
		hintText : 'Hint',
		backgroundColor : 'transparent',
		borderRadius : 5,
		borderWidth : 1,
		borderColor : 'black',
		paddingLeft : 15,
		paddingRight : 15,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		value : passwordHintInp,
		zIndex : 20
	});
	
		passwordHintInp.addEventListener('change', function(e){
    	e.source.value = e.source.value.slice(0,16);
	});

	
	var submitView3 = Ti.UI.createView({
		right: 110,
		top: 279,
		width: 80,
		height: 80,
		borderRadius: 10,
		zIndex:1
		
	});
	
	insideView.add(submitView3);
	
	

	passwordHintInp.opacity=0;

	insideView.add(passwordHintInp);

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
			text : ' ',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			width : 60,
			height : 130,
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
			    
		txtLbls[step].text = txtMsgs[step].substr(0, c) + '_';

		if (c == txtMsgs[step].length) {
			txtLbls[step].text = txtMsgs[step].substr(0, c);
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step2line2, Ti.App.Properties.getInt('step2Interval', 50));
		}

		c++;
	}

	
			function step2line2() {
			var step = 2;
			    step--; 
			    
		 var line2 = "please set a system recovery password.";
		line2Lbl.text = line2.substr(0, c) + '_';

		if (c == line2.length) {
			line2Lbl.text = line2.substr(0, c);
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step2line3, Ti.App.Properties.getInt('step2Interval', 50));
		}

		c++;
	}
	
				function step2line3() {
			var step = 2;
			    step--; 
			    
		 var line3 = "This system password is required to";
		line3Lbl.text = line3.substr(0, c) + '_';

		if (c == line3.length) {
			line3Lbl.text = line3.substr(0, c);
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step2line4, Ti.App.Properties.getInt('step2Interval', 50));
		}

		c++;
	}
	
			function step2line4() {
			var step = 2;
			    step--; 
			    
		var line4 = "recover any forgotten vault passcodes.";
		line4Lbl.text = line4.substr(0, c) + '_';

		if (c == line4.length) {
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step2blink, Ti.App.Properties.getInt('step2BlinkInterval', 200));
		}

		c++;
	}
	
		function step2blink() {
        var step = 2;
			step--; 
		var line4 = "recover any forgotten vault passcodes.";
		if (even == 0)	line4Lbl.text = line4.substr(0, line4.length) ;
		if (even == 1)	line4Lbl.text = line4.substr(0, line4.length) + '_';
	
		if (c == Ti.App.Properties.getInt('step2BlinkCount',10)) {
			line4Lbl.text = line4.substr(0, line4.length) ;
			clearInterval(timer);
			c = 0;
			timer = setInterval(step3, Ti.App.Properties.getInt('step3Interval', 90));
		}

		c++;
		even++;
		if (even == 2) even=0;
	}

		function step3() {
			var step = 3;
			    step--; 
			    
		txtLbls[step].text = txtMsgs[step].substr(0, c) + '_';

		if (c == txtMsgs[step].length) {
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step3blink, Ti.App.Properties.getInt('step3BlinkInterval', 200));
		}

		c++;
	}
	
		function step3blink() {
        var step = 3;
			step--; 
		
		if (even == 0)	txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
		if (even == 1)	txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';
	
		if (c == Ti.App.Properties.getInt('step3BlinkCount',10)) {
			txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
			clearInterval(timer);
			c = 0;
						//masterPasswordInp.opacity=1;
						animation.popIn(masterPasswordInp);
						//animation.popIn(buttonHolderView);
			//buttonHolderView.opacity=1;
			masterPasswordInp.focus();
		}

		c++;
		even++;
		if (even == 2) even=0;
	}
	
	function step4() {
			var step = 4;
			    step--; 
			    
		txtLbls[step].text = txtMsgs[step].substr(0, c) + '_';

		if (c == txtMsgs[step].length) {
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step4blink, Ti.App.Properties.getInt('step4BlinkInterval', 200));
		}

		c++;
	}
	
		function step4blink() {
        var step = 4;
			step--; 
		
		if (even == 0)	txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
		if (even == 1)	txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';
	
		if (c == Ti.App.Properties.getInt('step4BlinkCount',10)) {
			txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
			clearInterval(timer);
			c = 0;
						submitView2.opacity=1;
						animation.popIn(reTypeMasterPasswordInp);
			//reTypeMasterPasswordInp.opacity=1;
			reTypeMasterPasswordInp.focus();
			//timer = setInterval(step2, 90);
		}

		c++;
		even++;
		if (even == 2) even=0;
	}
	
				function step5() {
			var step = 5;
			    step--; 
			    
		txtLbls[step].text = txtMsgs[step].substr(0, c) + '_';

		if (c == txtMsgs[step].length) {
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step5blink, Ti.App.Properties.getInt('step5BlinkInterval', 200));
		}

		c++;
	}
	
		function step5blink() {
        var step = 5;
			step--; 
		
		if (even == 0)	txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
		if (even == 1)	txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';
	
		if (c == Ti.App.Properties.getInt('step5BlinkCount',10)) {
			txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
			clearInterval(timer);
			c = 0;
						//passwordHintInp.opacity=1;
						animation.popIn(passwordHintInp);
					passwordHintInp.focus();
					setLbl.setText('SAVE');
            animation.popIn(buttonHolderView);
			//timer = setInterval(step2, 90);
		}

		c++;
		even++;
		if (even == 2) even=0;
	}
	
	function step6() {
			var step = 6;
			    step--; 
			    
		txtLbls[step].text = txtMsgs[step].substr(0, c) + '_';

		if (c == txtMsgs[step].length) {
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step6blink, Ti.App.Properties.getInt('step6BlinkInterval', 200));
		}

		c++;
	}
	
	function step6blink() {
        var step = 6;
			step--; 
		
		if (even == 0)	txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
		if (even == 1)	txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';
	
		if (c == 3) {
			txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
			clearInterval(timer);
			c = 0;

		}

		c++;
		even++;
		if (even == 2) even=0;
	}


function step7() {
			var step = 6;
			    step--; 
			    
		txtLbls[step].text = txtMsgs[step].substr(0, c) + '_';

		if (c == txtMsgs[step].length) {
			txtLbls[step].text = txtMsgs[step].substr(0, c);
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step7blink, Ti.App.Properties.getInt('step3BlinkInterval', 200));
		}

		c++;
	}
	
	
		function step7blink() {
        var step = 6;
			step--; 
		
		if (even == 0)	txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
		if (even == 1)	txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';
	
		if (c == 3) {
			txtLbls[step].text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
			clearInterval(timer);
			c = 0;
		timer = setInterval(step7line2, Ti.App.Properties.getInt('step2Interval', 50));
		}

		c++;
		even++;
		if (even == 2) even=0;
	}


//here

	//insideView.add(line6aLbl);
	//insideView.add(line6Btn);
	//insideView.add(line6bLbl);
	//insideView.add(line7Lbl);
	
	
	
	function step7line2() {
			var step = 2;
			    step--; 
			    
		 var line5 = "The Master Password CANNOT be changed,";
		line5Lbl.text = line5.substr(0, c) + '_';

		if (c == line5.length) {
			line5Lbl.text = line5.substr(0, c);
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step7line3, Ti.App.Properties.getInt('step2Interval', 50));
		}

		c++;
	}
	
	function step7line3() {
			var step = 2;
			    step--; 
			    
		 var line3 = "so please remember it and keep it safe.";
		line6aLbl.text = line3.substr(0, c) + '_';

		if (c == line3.length) {
			line6aLbl.text = line3.substr(0, c);
			clearInterval(timer);
			c = 0;
			even=0;
			//timer = setInterval(step7line4, Ti.App.Properties.getInt('step2Interval', 50));
			setTimeout(function(e) {
				self.animate(hideView);
			}, 1700);
		}

		c++;
	}
	
	function step7line4() {
			line6Btn.opacity = 1;
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step7line5, Ti.App.Properties.getInt('step2Interval', 50));

	}
	
	function step7line5() {
			var step = 2;
			    step--; 
			    
		 var line3 = " where system settings";
		line6bLbl.text = line3.substr(0, c) + '_';

		if (c == line3.length) {
			line6bLbl.text = line3.substr(0, c);
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step7line6, Ti.App.Properties.getInt('step2Interval', 50));
		}

		c++;
	}
	
		
			function step7line6() {
			var step = 2;
			    step--; 
			    
		var line4 = "and help information can be found.";
		line7Lbl.text = line4.substr(0, c) + '_';

		if (c == line4.length) {
			clearInterval(timer);
			c = 0;
			even=0;
			timer = setInterval(step7FinalBlink, Ti.App.Properties.getInt('step2BlinkInterval', 200));
		}

		c++;
	}
	
		function step7FinalBlink() {
        var step = 6;
			step--; 
		var line4 = "and help information can be found.";
		if (even == 0)	line7Lbl.text = line4.substr(0, line4.length) ;
		if (even == 1)	line7Lbl.text = line4.substr(0, line4.length) + '_';
	
		if (c == Ti.App.Properties.getInt('step2BlinkCount',10)) {
			line7Lbl.text = line4.substr(0, line4.length) ;
			clearInterval(timer);
			c = 0;
			//timer = setInterval(step3, Ti.App.Properties.getInt('step3Interval', 90));
			//1 second later close
			setTimeout(function(e) {
				self.animate(hideView);
			}, 1700);
		}

		c++;
		even++;
		if (even == 2) even=0;
	}



     function checkMasterPasswordLength() {
     	if (masterPasswordInp.value.length < 3) {
			setStatusMsg('Your master password is too short, please use at least 3 characters.');
			masterPasswordInp.backgroundColor = '#fdfd96';
			return false;
		}
		return true;
     }
     
     function checkPasswordMatch() {
     	if (masterPasswordInp.value != reTypeMasterPasswordInp.value) {
     		txtLbls[5].top = 329;
			setStatusMsg('The passwords do not match.');
			masterPasswordInp.backgroundColor = '#fdfd96';
			reTypeMasterPasswordInp.backgroundColor = '#fdfd96';
			return false;
		}
		return true;
     }

	function saveSettings() {

		txtLbls[5].top = 358; //369
		txtLbls[5].opacity=1;
		txtLbls[5].zIndex=200;
		//Step 1: No blank values
		var blankValueFlg = 0;
		passwordHintInp.backgroundColor = 'transparent';
		masterPasswordInp.backgroundColor = 'transparent';
		reTypeMasterPasswordInp.backgroundColor = 'transparent';


		if (passwordHintInp.value.length == 0) {
			blankValueFlg = 1;
			passwordHintInp.backgroundColor = '#fdfd96';
		}
		if (masterPasswordInp.value.length == 0) {
			blankValueFlg = 1;
			masterPasswordInp.backgroundColor = '#fdfd96';
		}
		if (reTypeMasterPasswordInp.value.length == 0) {
			blankValueFlg = 1;
			reTypeMasterPasswordInp.backgroundColor = '#fdfd96';
		}

		if (blankValueFlg) {
			setStatusMsg('The password hint was left blank.');
			return;
		}
		//Step 2: Validate email address, n/a

		//Step 3: Ensure that passwords match
		if (masterPasswordInp.value != reTypeMasterPasswordInp.value) {
			setStatusMsg('The passwords do not match.');
			masterPasswordInp.backgroundColor = '#fdfd96';
			reTypeMasterPasswordInp.backgroundColor = '#fdfd96';
			checkValueFlg = 1;
			return;
		}


		//Step 5: password length check
		if (masterPasswordInp.value.length < 3) {
			setStatusMsg('Your master password is too short, please use at least 3 characters.');
			return;
		}

		Ti.App.Properties.setString('masterPassword', masterPasswordInp.value);
		//masterPassword = masterPasswordInp.value;
		Ti.App.Properties.setString('passwordHint', passwordHintInp.value);
		txtLbls[5].color = 'black';
				currentStep = 4;
		buttonHolderView.opacity=0;
		setFinalMessage('Master Password saved.');

		//setTimeout(function(e) {
			//self.animate(hideView);
		//}, 2800);
			
		passwordHintInp.blur();

	}
	
	
		function setFinalMessage(msg) {
		txtLbls[5].text = ' ';
		txtMsgs[5] = msg;
		clearInterval(timer);
		c=0;
		timer = setInterval(step7, Ti.App.Properties.getInt('step6Interval', 90));
	};

	function setStatusMsg(msg) {
		txtLbls[5].text = ' ';
		txtMsgs[5] = msg;
		clearInterval(timer);
		c=0;
		timer = setInterval(step6, Ti.App.Properties.getInt('step6Interval', 90));
	};

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
	showView.top = 100;
	showView.duration = 500;
	showView.delay = 500;

	showView.addEventListener('complete', function(e) {
		txtLbls[0].text = ' ';
		txtLbls[1].text = ' ';
		txtLbls[2].text = ' ';
		txtLbls[3].text = ' ';
		txtLbls[4].text = ' ';
		txtLbls[5].text = ' ';
		txtLbls[5].color = 'red';
		txtLbls[5].top = 273;
		line2Lbl.text = ' ';
		line3Lbl.text = ' ';
		masterPasswordInp.opacity=0;
		submitView2.opacity=0;
		reTypeMasterPasswordInp.opacity=0;
		passwordHintInp.opacity=0;
		timer = setInterval(step1, Ti.App.Properties.getInt('step1Interval', 90));
	});

	var hideView = Titanium.UI.createAnimation();
	hideView.top = '110%';
	hideView.duration = 500;

	function resetOnClose() {
		masterPasswordInp.value='';
		reTypeMasterPasswordInp.value='';
		passwordHintInp.value='';
			masterPasswordInp.blur();
		reTypeMasterPasswordInp.blur();
		passwordHintInp.blur();
		for (var j = 0; j < txtLbls.length; j++) { 
		txtLbls[j].text = ' ';	
		}

		txtLbls[5].color = 'red';
		txtLbls[5].top = 273;
		line2Lbl.text = ' ';
		line3Lbl.text = ' ';
		clearInterval(timer);
		masterPasswordInp.opacity=0;
		submitView2.opacity=0;
		reTypeMasterPasswordInp.opacity=0;
		passwordHintInp.opacity=0;

		c = 0;

		resetCloseArrow();

		var resetTransform = Titanium.UI.create3DMatrix();
		sv.animate({
			transform : resetTransform.translate(0, 0, 0),
			duration : 100
		});
		Ti.App.fireEvent('bypass', {});
		parent.remove(self);
	};
	hideView.addEventListener('complete', resetOnClose);
	
	Ti.App.addEventListener('hideEasyButtons', function(e) {
		buttonHolderView.opacity=0;
	});
	
	Ti.App.addEventListener('showEasyButtons', function(e) {
		//buttonHolderView.opacity=1;
		animation.popIn(buttonHolderView);
	});
	
	self.addEventListener('swipe', function(e) {
	if (e.direction === 'right') self.animate(hideView);
});

	return self;
};

module.exports = snapshotSlideout; 