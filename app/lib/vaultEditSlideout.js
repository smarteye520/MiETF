function vaultEditSlideout(_args) {

	var self = Ti.UI.createView({
		left : '110%',
		width : '100%',
		touchEnabled : true,
		zIndex : 20,
		top: 96,
		vaultScreen: _args.j,
		selectedColor: 0,
		vault: [], 
		bubbleParent: false
	});
	
	var parent=_args.parent;
	var force = false;
	
	Ti.App.addEventListener('closeSlideouts', function(e) {
		if (force == false) self.animate(hideView);
	});

	var checkValueFlg;
		var titleLblHoldValue = '';
	
		var vaultColorDictionary = mietf.vaultColorDictionary;
		
	var currentStep= 3;	

	var txtMsgs = new Array();
	txtMsgs.push('Vault Options');
	txtMsgs.push('Vault Name');
	txtMsgs.push('Vault Color');
	txtMsgs.push('Passcode');
	txtMsgs.push('');
	txtMsgs.push('Passcode must be 4 digits.');

	var txtLbls = new Array();
	
	var text = 'Vault Options';
	var attrTitle = Ti.UI.createAttributedString({
		    text: text, 
		    attributes: [
		        		        		        {
		            type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
	               value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		           range: [0, Math.min(text.length, 5)]
		        },
		        		        {
		            type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
	               value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		            range: [5, Math.min(Math.max(text.length-5,0), 9)]
		        }
		    ]
		    	});
		    
	txtLbls.push(Ti.UI.createLabel({//Vault Options
		top : 32,
		left : imgs.txtLblsLeft,
		width: 300,
		attributedString : attrTitle,
		color : 'black', //'#57585d',
		font : {
			fontFamily : imgs.txtLblsFontFamily,
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	}));

	txtLbls.push(Ti.UI.createLabel({//Vault Name:
		left : 153,
		top : 72,
		width : 300,
		height : Ti.UI.SIZE,
		text : 'Vault Name',
		color : 'black',
		//shadowColor : '#333',
		//shadowOffset : {
		//	x : 1,
		//	y : 1
		//},
		//shadowRadius : 3,
		font : {
			fontFamily : imgs.txtLblsFontFamily,
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	}));

	txtLbls.push(Ti.UI.createLabel({//Vault Color 
		width : 208, //186
		left : 127,
		top : 161+28,
		height : 40,
		text : ' ',
		color : 'black',
	//	shadowColor : '#333',
	//	shadowOffset : {
	//		x : 1,
	//		y : 1
	//	},
	//	shadowRadius : 3,
		font : {
			fontFamily : imgs.txtLblsFontFamily,
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	}));

		txtLbls.push(Ti.UI.createLabel({//Passcode
		left : 178,
		width : 300,
		top : 148,
		height : 40,
		text : 'Passcode',
		color : 'black',
		//shadowColor : '#333',
		//shadowOffset : {
		//	x : 1,
		//	y : 1
		//},
		//shadowRadius : 3,
		font : {
			fontFamily : imgs.txtLblsFontFamily,
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	}));

	txtLbls.push(Ti.UI.createLabel({//password hint 
		width : 177,
		left : 293,
		top : 297,
		height : 40,
		text : txtMsgs[4],
		color : 'black',
		shadowColor : '#333',
		shadowOffset : {
			x : 1,
			y : 1
		},
		shadowRadius : 3,
		font : {
			fontFamily : imgs.txtLblsFontFamily,
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	}));
	
	txtLbls.push(Ti.UI.createLabel({//status msg <--------------------STATUS MSG
		left: imgs.txtLblsLeft,
		top: 565-11, //was 12
		width: 596,
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
		top: 32

	});

	contentView.add(insideView);

	//insideView.add(txtLbls[0]);
	insideView.add(txtLbls[1]);
	insideView.add(txtLbls[2]);
	insideView.add(txtLbls[3]);
	insideView.add(txtLbls[4]);
	insideView.add(txtLbls[5]);
	
	


	var closeArrow = Ti.UI.createView({});
	insideView.add(closeArrow);

	resetCloseArrow();

	function resetCloseArrow(e) {

		closeArrow = Ti.UI.createLabel({
			color : '#4D4D4D',
			font : {
				fontFamily : 'Menlo-Bold',
				fontSize : '80sp',
				fontWeight : 'bold'
			},
			text : ' ',
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


	
	var submitIcon1 = Ti.UI.createButton({
		backgroundImage: 'images/ifapps/next.pn8',
		width: 50,
		height: 50,
		left: 586,
		top: 88,
		opacity: 0
	});
	
	insideView.add(submitIcon1);
	
	submitIcon1.addEventListener('click', function(e) {
		vaultNameInp.blur();
	});
	
	
	
	var vaultNameInp = Titanium.UI.createTextField({
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '21sp',
			fontWeight : 'Bold'
		},
		height : 48,
		top : 64, //47
		width: 304,
		left : 288, //276
		hintText : 'Vault Name',
		backgroundImage : 'images/ifapps/textEntry.pn8',
		borderRadius : 0,
		borderWidth : 0,
		borderColor : 'transparent',
		paddingLeft : 15,
		paddingRight : 15,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		value : '',
		passwordMask : false,
		zIndex : 20,
		opacity: 1
	});

	vaultNameInp.addEventListener('return', function(e) { //FINDMEFINDME
		vaultNameInp.blur();	
		if (buttonHolderView.opacity == 0 && self.vault.vaultName != e.source.value) animation.popIn(buttonHolderView);
		
	});
	
	vaultNameInp.addEventListener('blur', function(e) {
		vaultNameInp.value = toTitleCase(vaultNameInp.value);
	});
	
	vaultNameInp.addEventListener('change', function(e){
    e.source.value = e.source.value.slice(0,16);
	});
	
	insideView.add(vaultNameInp);
	
				var VaultColorControl  = require('vaultColorControl'),
					vaultColorControl = new VaultColorControl({parent: self});
			insideView.add(vaultColorControl);
			vaultColorControl.opacity= 1;
			
		var submitIcon2 = Ti.UI.createButton({
		backgroundImage: 'images/ifapps/next.pn8',
		width: 50,
		height: 50,
		left: 586,
		top: 171,
		opacity: 0
	});
	
	insideView.add(submitIcon2);
	
	submitIcon2.addEventListener('click', function(e) {
		timer = setInterval(step4, Ti.App.Properties.getInt('step4Interval', 90));
	});
	//////////////////////////
	

	
	var requirePasswordSw = mod.createSwitch({
		top:144, 
		height:48, width:80, left:288, 
		value:true, 
		switchArea:{
			height:48, width:80
		}, 
		inactiveColor: 'white', 
		onColor:"#40943d", 
		opacity: 1
	});
	
	requirePasswordSw.addEventListener('change',function(e)
	{
		if (buttonHolderView.opacity == 0) animation.popIn(buttonHolderView);

	    if (requirePasswordSw.value) {
	    	
	    	/*
			    if (Ti.App.Properties.getString('masterPassword', '') == '' ) {
					Ti.App.fireEvent('slideInMasterPassword', {});
						requirePasswordSw.value = false;
			    	vaultPasscodeInp.opacity = 0;
				}	else {
					vaultPasscodeInp.opacity = 1;
										setTimeout(function(e){
						vaultPasscodeInp.focus();
					}, 1000);
				}
				
				*/
		
		vaultPasscodeInp.opacity = 1;
		setTimeout(function(e){
						vaultPasscodeInp.focus();
					}, 1000);
	    	
	    } else {
	    	vaultPasscodeInp.opacity = 0;
	    }
	});
	
	insideView.add(requirePasswordSw);
	
	
	var vaultPasscodeInp = Titanium.UI.createTextField({
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '20sp',
			fontWeight : 'Bold'
		},
		height : 48,
		top : 144,
		width: 200,
		left : 392,
		hintText : 'Passcode',
		backgroundImage : 'images/ifapps/passcodeEntry.pn8',
		borderRadius : 0,
		borderWidth : 0,
		borderColor : 'transparent',
		paddingLeft : 80,
		paddingRight : 15,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		value : '',
		passwordMask : false,
		zIndex : 20,
		opacity: 0,
		keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
	});
	
	vaultPasscodeInp.addEventListener('return', function(e) { //FINDMEFINDME

		
	});
	
	vaultPasscodeInp.addEventListener('change', function(e){
	if (buttonHolderView.opacity == 0) animation.popIn(buttonHolderView);
    e.source.value = e.source.value.slice(0,4);
    
    var valLen = e.source.value.length;
    
        if (valLen ==4) {
    		if ( Ti.App.Properties.getString('masterPassword', '') == '') {
    			vaultPasscodeInp.blur();
			Ti.App.fireEvent('slideInMasterPassword', {});
		}
    	
    }
    
     e.source.value = e.source.value.replace(/[^0-9]+/,""); 
     
     if (e.source.value.length < valLen) setStatusMsg('Passcode must be numbers only.');
	});
	
	insideView.add(vaultPasscodeInp);
	
	
	
	var buttonHolderView = Ti.UI.createView({
		left: 631+16-7,
		width: 128,
		height: 300,
		touchEnabled: true,
		vaultId: 0,
		zIndex: 100,
		top: 194+32,
		opacity: 0
	});
	
	var buttonMetal = Ti.UI.createButton({
  		backgroundImage: 'images/latest/btn_6.pn8',
  		 height: 128, width:128, opacity: 1
  	});
  	
	buttonHolderView.add(buttonMetal);
	
	
	Ti.App.addEventListener('hideEasyButtons', function(e) {
		buttonHolderView.opacity=0;
	});
	
	Ti.App.addEventListener('showEasyButtons', function(e) {
		buttonHolderView.opacity=1;
	});
	
	

	
	buttonMetal.addEventListener('click', function(e){
		if (currentStep == 1) {
		 vaultNameInp.blur();
		 if (vaultNameInp.value.length < 1) vaultNameInp.value = 'Vault';
		 clearInterval(timer);
		 timer = setInterval(step3, Ti.App.Properties.getInt('step3Interval', 90));
		 return;
		}
		
		if (currentStep == 2) {
		clearInterval(timer);
		timer = setInterval(step4, Ti.App.Properties.getInt('step4Interval', 90));
		return;
		}
		
		if (currentStep ==3) {
			vaultPasscodeInp.blur();
			saveSettings();
			return;
		}
		
		if (currentStep == 4) {
			self.animate(hideView);
			return;
		}
		

		
	});


	
	
	
	buttonMetal.addEventListener('click', function(e) {
	});
	
	
	insideView.add(buttonHolderView);
	
		 	 var SetLbl = require('setLblText');
	 var setLbl = new SetLbl();
	 setLbl.setText('SAVE');


	
	buttonHolderView.add(setLbl);
	
	////////////////////////


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
		           range: [0, Math.min(text.length, 5)]
		        },
		        		        {
		            type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
	               value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		            range: [5, Math.min(Math.max(text.length-5,0), 9)] //change to five to six, 9 to 8,  for space
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
		           range: [0, Math.min(text.length, 5)]
		        },
		        		        {
		            type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
	               value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		            range: [5, Math.min(Math.max(text.length-5,0), 9)]
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
		           range: [0, Math.min(text.length, 5)]
		        },
		        		        {
		            type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
	               value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		           range: [5, Math.min(Math.max(text.length-5,0), 9)]
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
			submitIcon1.opacity=0;
			currentStep = 1;
			timer = setInterval(step2blink, Ti.App.Properties.getInt('step2BlinkInterval', 200));
		}

		c++;
	}
	
			function step2blink() {
			var step = 2;
			step--; 
		
		if (even == 0)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
		if (even == 1)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';
		txtLbls[step].text = text;
	
		if (c == Ti.App.Properties.getInt('step2BlinkCount',10)) {
			var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
			txtLbls[step].text = text;
			clearInterval(timer);
			c = 0;
			vaultNameInp.opacity=1;
			
			
			buttonMetal.opacity=1;
			trashcan.opacity=1;
			setLbl.opacity=1;
			vaultNameInp.focus();
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
			txtLbls[step].text = txtMsgs[step].substr(0, c);
			clearInterval(timer);
			c = 0;
			even=0;
			vaultColorControl.opacity = 1;
			submitIcon2.opacity=0;
			currentStep = 2;
		
			timer = setInterval(step3blink, Ti.App.Properties.getInt('step3BlinkInterval', 200));
		}

		c++;
	}
	
			function step3blink() {
			var step = 3;
			step--; 
		
		if (even == 0)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
		if (even == 1)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';
		txtLbls[step].text = text;
	
		if (c == Ti.App.Properties.getInt('step3BlinkCount',10)) {
			var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
			txtLbls[step].text = text;
			clearInterval(timer);
			c = 0;
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
			txtLbls[step].text = txtMsgs[step].substr(0, c);
			clearInterval(timer);
			c = 0;
			even=0;
			currentStep = 3;
			setLbl.setText('SAVE');
			requirePasswordSw.opacity=1;
			timer = setInterval(step4blink, Ti.App.Properties.getInt('step4BlinkInterval', 200));
		}

		c++;
	}
	
			function step4blink() {
			var step = 4;
			step--; 
		
		if (even == 0)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
		if (even == 1)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';
		txtLbls[step].text = text;
	
		if (c == Ti.App.Properties.getInt('step4BlinkCount',10)) {
			var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
			txtLbls[step].text = text;
			clearInterval(timer);
			c = 0;
		}

		c++;
		even++;
		if (even == 2) even=0;
	}
	
	function step6(isLast) {
			var step = 6;
			    step--; 
			    
		txtLbls[step].text = txtMsgs[step].substr(0, c) + '_';

		if (c == txtMsgs[step].length) {
			txtLbls[step].text = txtMsgs[step].substr(0, c);
			clearInterval(timer);
			c = 0;
			even=0;
						timer = setInterval(function(e) {
				step6blink(isLast);
				}, Ti.App.Properties.getInt('step6BlinkInterval', 200));
		}

		c++;
	}
	
				function step6blink(isLast) {
			var step = 6;
			step--; 
		
		if (even == 0)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
		if (even == 1)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';
		txtLbls[step].text = text;
	
		if (c == Ti.App.Properties.getInt('step6BlinkCount',10)) {
			var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
			txtLbls[step].text = text;
			clearInterval(timer);
			c = 0;
			if (isLast) { setTimeout(function(e) {
					self.animate(hideView);
				}, 1000);
			}
		}

		c++;
		even++;
		if (even == 2) even=0;
	}
	

	function saveSettings() {
		
		         if (Ti.App.Properties.getString('masterPassword', '') == ''  && requirePasswordSw.value) {
						vaultPasscodeInp.value = '';
						setStatusMsg('Passcode cannot be saved without a system recovery password.');
						requirePasswordSw.value = false;
						currentStep=3;
			return;
		}

		//first check passcode length
		if (requirePasswordSw.value && vaultPasscodeInp.value.length < 4) {
			setStatusMsg('Passcode must be 4 digits.');
			currentStep=3;
			return;
		}
		
		//		rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 'Samples', '#3c89b6', 'images/latest/vault_1_sm.pn8', 'images/latest/vault_1_lg.pn8', 'NO', 'SET', '1', 0, 1406065700451, 'YES', 0);
			var vaultName = vaultNameInp.value;
			var vaultColor = requirePasswordSw.onColor;
			var vaultIconImg = 'images/latest/' + vaultColorDictionary[self.selectedColor].vaultIconImg;
			var vaultImg = 'images/latest/' + vaultColorDictionary[self.selectedColor].vaultImg;
			var isSampleVault = 'YES';
			if (requirePasswordSw.value) isSampleVault = 'NO';
			var lockPasscode = 'P' + vaultPasscodeInp.value;
			if (vaultPasscodeInp.value.length < 4) lockPasscode = 'SET';
			var vaultNum = vaultColorDictionary[self.selectedColor].vaultNum;


			var db = Ti.Database.open('cloud');

			var rs = db.execute('UPDATE vault set vaultName = ?, vaultColor = ?, vaultIconImg = ? where vaultId = ?', vaultName, vaultColor, vaultIconImg, self.vault.vaultId);
			var rs = db.execute('UPDATE vault set vaultImg = ?, isSampleVault = ?, lockPasscode = ?, vaultNum= ? where vaultId = ?', vaultImg, isSampleVault, lockPasscode, vaultNum, self.vault.vaultId);
	
			db.close();
			
			
			
			
			resetVaultOrder();
			Ti.App.fireEvent('updateVaults', {});
			
			
			currentStep =4;
			txtLbls[5].color='black';
			animation.popIn(buttonHolderView, hideButtonHolderView);
			 

	}
	
		function hideButtonHolderView(e){
		buttonHolderView.opacity=0;
		txtLbls[5].left = imgs.txtLblsLeft +  50; //38; // + 266;
		//setLbl.text = 'DONE';
		setStatusMsg('Vault Saved!');
	};


	function setStatusMsg(msg) {
				var isLast = false;
		if (msg == 'Vault Saved!') isLast = true;
		txtLbls[5].text = ' ';
		txtMsgs[5] = msg;
		c=0;
		clearInterval(timer);
				timer = setInterval(function(e) {
			step6(isLast);
			}, Ti.App.Properties.getInt('step6Interval', 90));
	};

	self.slideIn = function(vault) {
		force = true;
		self.vault = vault;
		self.vaultScreen = vault.vaultScreen;
		
		
		vaultNameInp.value = vault.vaultName;
		titleLblHoldValue = vaultNameInp.value;
		requirePasswordTrueFalse = vault.getRequirePassword();
		
		requirePasswordSw.value = requirePasswordTrueFalse;
		//requirePasswordSw.fireEvent('change', {});
		
		if (requirePasswordTrueFalse) vaultPasscodeInp.opacity=1;
		
		
		if (vault.isTitleEditable == 'NO') {
			vaultNameInp.editable = false;
			vaultNameInp.backgroundImage = null;
			vaultNameInp.backgroundColor= '#888888';
			vaultNameInp.borderRadius = 15;
		}
		
		if (vault.canSetPasscode == 'NO') {

		requirePasswordSw.opacity = 0;
		txtLbls[3].opacity = 0;
		}

		var vaultColorId = 0;
		
		for (i=0; i< 10; i++) {
			if (vaultColorDictionary[i].vaultNum == vault.vaultNum) vaultColorId = i;
		}
		
		self.selectedColor = vaultColorId;
		
		buttonMetal.backgroundImage = 'images/latest/' + vaultColorDictionary[vaultColorId].button;
		requirePasswordSw.onColor = vaultColorDictionary[vaultColorId].onColor;
		
		
		vaultColorControl.startupVaultEdit(vaultColorId);
		vaultPasscodeInp.value = vault.lockPasscode.substring(1);
		if (vaultPasscodeInp.value.length < 4) vaultPasscodeInp.value= '';
		
		buttonHolderView.opacity = 0;
		self.animate(showView);
		
	};

	self.slideOut = function(e) {
		self.animate(hideView);
	};
	//animation
	var showView = Titanium.UI.createAnimation();
	showView.left = 208;
	showView.duration = 500;
	showView.delay = 500;

	showView.addEventListener('complete', function(e) {
	_args.vaultForm.resetVaults();
	force = false;
	});

	var hideView = Titanium.UI.createAnimation();
	hideView.left = '110%';
	hideView.duration = 500;
	
	hideView.addEventListener('complete', resetOnClose);

	function resetOnClose() {
		var reqPassSave = requirePasswordSw.value;
		setLbl.setText('SAVE');
		txtLbls[5].color='red';
		txtLbls[5].text='';
		txtLbls[5].left = imgs.txtLblsLeft;
		currentStep =3;

		c = 0;

		resetCloseArrow();

		var resetTransform = Titanium.UI.create3DMatrix();
		sv.animate({
			transform : resetTransform.translate(0, 0, 0),
			duration : 100
		});
		
parent.remove(self);
	
	};
	
	self.addEventListener('newColor', function(e) {
		if (buttonHolderView.opacity == 0) animation.popIn(buttonHolderView);
		var selectedColor = e.selectedColor;
		self.selectedColor = selectedColor;
		buttonMetal.backgroundImage = 'images/latest/' + vaultColorDictionary[selectedColor].button;
		requirePasswordSw.onColor = vaultColorDictionary[selectedColor].color;
	});
	
function create(vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, vaultScreen, unlockTime, isSampleVault) {

	var db = Ti.Database.open('cloud');
	db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen);
	db.close();
	
};

self.addEventListener('swipe', function(e) {

	if (e.direction === 'right') {
		var swipe = true;
		if (e.x> 219 && e.x< 390 && e.y > 100 && e.y < 188) swipe = false;
		
		
		if (typeof(e.source.switchArea) != 'undefined') swipe=false;
		
		if (swipe) self.animate(hideView);
	}
});

	return self;
};

module.exports = vaultEditSlideout; 