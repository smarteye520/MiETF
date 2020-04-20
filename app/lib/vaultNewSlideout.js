function vaultNewSlideout(_args) {

	var self = Ti.UI.createView({
		left : '110%',
		width : '100%',
		touchEnabled : true,
		zIndex : 20,
		top : 96,
		vaultScreen : _args.j,
		selectedColor : 8,
		bubbleParent : false
	});

	Ti.App.Properties.setString('masterPasswordBypass', '');

	/*Ti.App.addEventListener('closeSlideouts', function(e) {
	 self.animate(hideView);
	 });*/

	var parent = _args.parent;

	var checkValueFlg;

	var vaultColorDictionary = mietf.vaultColorDictionary;
	var currentStep = 0;

	var txtMsgs = new Array();
	txtMsgs.push('Vault Name');
	txtMsgs.push('Passcode');
	txtMsgs.push(' ');

	var txtLbls = new Array();

	txtLbls.push(Ti.UI.createLabel({//Vault Name:
		left : 153,
		top : 72,
		width : 300,
		height : Ti.UI.SIZE,
		text : ' ',
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

	txtLbls.push(Ti.UI.createLabel({//Passcode
		left : 178,
		width : 300,
		top : 148,
		height : 40,
		text : ' ',
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
		top : 161 + 28,
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

	var statusMsgLbl = Ti.UI.createLabel({//status msg <--------------------STATUS MSG
		left : imgs.txtLblsLeft,
		top : 565 - 11, //was 12
		width : 476, //396
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'red',
		font : {
			fontFamily : 'AmericanTypewriter-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	});

	var statusMsgLblLine2 = Ti.UI.createLabel({//status msg <--------------------STATUS MSG
		left : imgs.txtLblsLeft + 445,
		top : 554,
		width : 500, //396
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'red',
		font : {
			fontFamily : 'AmericanTypewriter-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	});

	var statusMsgLblLine3 = Ti.UI.createLabel({//status msg <--------------------STATUS MSG
		left : imgs.txtLblsLeft + 566,
		top : 554, //was 12
		width : 500, //396
		height : Ti.UI.SIZE,
		text : ' ',
		color : 'black',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '22sp',
			fontWeight : 'normal'
		}
	});

	var line6Btn = Ti.UI.createButton({
		left : imgs.txtLblsLeft + 528,
		top : 555,
		backgroundImage : 'images/ifapps/gear.pn8',
		width : 32,
		height : 32,
		opacity : 0
	});

	var statusMsg = '';
	var statusMsgLine2 = '';
	var statusMsgLine3 = '';

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
		top : 32
	});

	contentView.add(insideView);

	insideView.add(txtLbls[0]);
	insideView.add(txtLbls[1]);
	insideView.add(txtLbls[2]);
	insideView.add(statusMsgLbl);
	insideView.add(statusMsgLblLine2);
	insideView.add(statusMsgLblLine3);
	insideView.add(line6Btn);

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
			width : 100,
			height : 50,
			touchEnabled : true,
			left : 0
		});

		var olt = Titanium.UI.create3DMatrix(),
		    curX,
		    totalDelta = 0;

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

	var vaultNameInp = Titanium.UI.createTextField({
		color : 'black',
		font : {
			fontFamily : 'AmericanTypewriter', //'AvenirNextCondensed-Bold',
			fontSize : '21sp',
			fontWeight : 'Bold'
		},
		height : 48,
		top : 64, //47
		width : 304,
		left : 288, //276
		hintText : 'Vault Name',
		backgroundImage : 'images/ifapps/textEntry.pn8',
		borderRadius : 0,
		borderWidth : 0,
		borderColor : 'transparent',
		paddingLeft : 15,
		paddingRight : 15,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		value : '',
		passwordMask : false,
		zIndex : 20,
		opacity : 0
	});

	vaultNameInp.addEventListener('blur', function(e) {//findmefindme

		vaultNameInp.font = {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '20sp',
			fontWeight : 'Bold'
		};

		if (vaultNameInp.value.length < 1) {
			vaultNameInp.value = 'Vault';
		} else {
			vaultNameInp.value = toTitleCase(vaultNameInp.value);
		}

		if (requirePasscodeSwitch.opacity == 0) {
			c = 0;
			clearInterval(timer);
			timer = setInterval(function(e) {
				typeTextForStep(1);
			}, 90);
		}

	});

	vaultNameInp.addEventListener('change', function(e) {
		e.source.value = e.source.value.slice(0, 16);
	});

	insideView.add(vaultNameInp);

	var VaultColorControl = require('vaultColorControlAnimated'),
	    vaultColorControl = new VaultColorControl({
		parent : self
	});
	insideView.add(vaultColorControl);

	var requirePasscodeSwitch = mod.createSwitch({
		top : 144,
		height : 48,
		width : 80,
		left : 288,
		value : true,
		switchArea : {
			height : 48,
			width : 80
		},
		inactiveColor : 'white',
		onColor : "#40943d",
		opacity : 0
	});

	requirePasscodeSwitch.addEventListener('change', function(e) {
		if (requirePasscodeSwitch.value) {
			vaultPasscodeInp.opacity = 1;
			vaultPasscodeInp.focus();

		} else {
			statusMsgLbl.text = '';
			vaultPasscodeInp.blur();
			vaultPasscodeInp.opacity = 0;
			if (vaultColorControl.opacity == 0) {
				clearInterval(timer);
				//timer = setInterval(function(e) {
				//typeTextForStep(2);
				//}, 90);
				vaultColorControl.opacity = 1;
				vaultColorControl.showSelected();
			}
		}
	});

	insideView.add(requirePasscodeSwitch);

	var vaultPasscodeInp = Titanium.UI.createTextField({
		color : 'black',
		font : {
			fontFamily : 'AmericanTypewriter',
			fontSize : '20sp',
			fontWeight : 'Bold'
		},
		height : 48,
		top : 144,
		width : 200,
		left : 392,
		hintText : 'Passcode',
		backgroundImage : 'images/ifapps/passcodeEntry.pn8',
		borderRadius : 0,
		borderWidth : 0,
		borderColor : 'transparent',
		paddingLeft : 80,
		paddingRight : 15,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		value : '',
		passwordMask : false,
		zIndex : 20,
		opacity : 0,
		keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD
	});

	vaultPasscodeInp.addEventListener('blur', function(e) {
		vaultPasscodeInp.font = {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '20sp',
			fontWeight : 'Bold'
		};
	});

	vaultPasscodeInp.addEventListener('return', function(e) {

		vaultPasscodeInp.font = {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '20sp',
			fontWeight : 'Bold'
		};

		if (e.source.value.length < 4) {
			setStatusMsg('Passcode must be 4 digits.');
		}

		if (vaultColorControl.opacity == 0 && e.source.value.length > 3) {
			clearInterval(timer);
			//timer = setInterval(function(e) {
			//	typeTextForStep(2);
			//}, 90);
			vaultColorControl.opacity = 1;
			vaultColorControl.showSelected();
		}

	});

	vaultPasscodeInp.addEventListener('change', function(e) {

		e.source.value = e.source.value.slice(0, 4);

		var valLen = e.source.value.length;

		if (valLen == 4) {
			if (Ti.App.Properties.getString('masterPassword', '') == '') {
				vaultPasscodeInp.blur();
				vaultPasscodeInp.font = {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '20sp',
					fontWeight : 'Bold'
				};
				Ti.App.fireEvent('slideInMasterPassword', {});
			}

		}

		e.source.value = e.source.value.replace(/[^0-9]+/, "");

		if (e.source.value.length < valLen) {
			setStatusMsg('Passcode must be numbers only.');
		} else {
			statusMsgLbl.text = ' ';
		}
		//
	});

	insideView.add(vaultPasscodeInp);

	var buttonHolderView = Ti.UI.createView({
		left : 631 + 16 - 7,
		width : 128,
		height : 300,
		touchEnabled : true,
		vaultId : 0,
		zIndex : 100,
		top : 194 + 32,
		opacity : 0
	});

	var buttonMetal = Ti.UI.createButton({
		backgroundImage : 'images/latest/btn_9.pn8',
		height : 128,
		width : 128,
		opacity : 1
	});

	buttonHolderView.add(buttonMetal);

	Ti.App.addEventListener('bypass', bypassFunc);

	function bypassFunc(e) {
		if (Ti.App.Properties.getString('masterPassword', '') == '') {

			var MiAlert = require('miAlert'),
			    dialog = new MiAlert({
				parent : self,
				text : 'Passcode cannot be saved without a system recovery password.',
				opaque : true,
				smallText : true
			});

			dialog.addEventListener('finished', function(e) {
				vaultPasscodeInp.blur();
				vaultPasscodeInp.value = '';
				vaultPasscodeInp.opacity = 0;
				requirePasscodeSwitch.value = false;

				if (vaultColorControl.opacity == 0) {
					vaultColorControl.opacity = 1;
					vaultColorControl.showSelected();
				}

			});
			dialog.open({
				animated : true
			});
		} else {

			if (vaultColorControl.opacity == 0) {
				vaultColorControl.opacity = 1;
				vaultColorControl.showSelected();
			}

		}

	};

	buttonMetal.addEventListener('click', function(e) {
		saveSettings();
	});

	insideView.add(buttonHolderView);

	var SetLbl = require('setLblText');
	var setLbl = new SetLbl();
	setLbl.setText('SAVE');

	buttonHolderView.add(setLbl);

	////////////////////////

	var c = 0;
	var timer;

	function typeTextForStep(step) {
		statusMsgLbl.text = '';

		var text = txtMsgs[step].substr(0, c) + '_';

		txtLbls[step].text = text;

		if (c == txtMsgs[step].length) {
			clearInterval(timer);
			c = 0;
			timer = setInterval(function(e) {
				blinkPeriodForStep(step);
			}, 200);
		}

		c++;
	}

	var even = 0;
	function blinkPeriodForStep(step) {

		if (even == 0)
			var text = txtMsgs[step];
		if (even == 1)
			var text = txtMsgs[step] + '_';

		txtLbls[step].text = text;

		if (c == 3) {
			var text = txtMsgs[step];

			txtLbls[step].text = text;
			clearInterval(timer);
			c = 0;

			//HANDLE the 3 STEPS
			if (step == 0) {
				animation.popIn(vaultNameInp);
				vaultNameInp.focus();
			}

			if (step == 1) {
				requirePasscodeSwitch.opacity = 1;
				animation.popIn(vaultPasscodeInp);
				setTimeout(function(e) {
					vaultPasscodeInp.focus();
				}, 1000);
			}

			if (step == 2) {
				vaultColorControl.opacity = 1;
				vaultColorControl.showSelected();
				//setTimeout( function(e) {
				//animation.popIn(buttonHolderView);
				//}, 2000);

			}
		}

		c++;
		even++;
		if (even == 2)
			even = 0;
	}


	self.fadeInNext = function(e) {

		animation.fadeIn(buttonHolderView, 1500);

	};

	function typeTextForStatusMsg(isLast) {

		statusMsgLbl.text = statusMsg.substr(0, c) + '_';

		if (c == statusMsg.length) {
			statusMsgLbl.text = statusMsg.substr(0, c);
			clearInterval(timer);
			c = 0;
			even = 0;
			timer = setInterval(function(e) {
				blinkPeriodForStatusMsg(isLast);
			}, 200);
		}

		c++;
	}

	function typeTextForStatusMsg2LineStep1(isLast) {

		statusMsgLbl.text = statusMsg.substr(0, c) + '_';

		if (c == statusMsg.length) {
			statusMsgLbl.text = statusMsg.substr(0, c);
			clearInterval(timer);
			c = 0;
			even = 0;
			timer = setInterval(function(e) {
				typeTextForStatusMsg2LineStep2(isLast);
			}, 60);
		}

		c++;
	}

	function typeTextForStatusMsg2LineStep2(isLast) {

		statusMsgLblLine2.text = statusMsgLine2.substr(0, c) + '_';

		if (c == statusMsgLine2.length) {
			statusMsgLblLine2.text = statusMsgLine2.substr(0, c);
			clearInterval(timer);
			c = 0;
			even = 0;
			timer = setInterval(function(e) {
				typeTextForStatusMsg2LineStep3(isLast);
			}, 60);
		}

		c++;
	}

	function typeTextForStatusMsg2LineStep3(isLast) {
		line6Btn.opacity = 1;
		clearInterval(timer);
		c = 0;
		even = 0;
		timer = setInterval(function(e) {
			typeTextForStatusMsg2LineStep4(isLast);
		}, 60);
	}

	function typeTextForStatusMsg2LineStep4(isLast) {

		statusMsgLblLine3.text = statusMsgLine3.substr(0, c) + '_';

		if (c == statusMsgLine3.length) {
			statusMsgLblLine3.text = statusMsgLine3.substr(0, c);
			clearInterval(timer);
			c = 0;
			even = 0;
			timer = setInterval(function(e) {
				blinkPeriodForStatusMsgLine2(isLast);
			}, 200);
		}

		c++;
	}

	function blinkPeriodForStatusMsgLine2(isLast) {

		if (even == 0)
			var text = statusMsgLine3;
		if (even == 1)
			var text = statusMsgLine3 + '_';
		statusMsgLblLine3.text = text;

		if (c == 3) {
			var text = statusMsgLine3;
			statusMsgLblLine3.text = text;
			clearInterval(timer);
			c = 0;
			//if (isLast) animation.popIn(buttonHolderView);

			if (isLast) {
				setTimeout(function(e) {
					self.animate(hideView);
				}, 1000);
			}

		}

		c++;
		even++;
		if (even == 2)
			even = 0;
	}

	function blinkPeriodForStatusMsg(isLast) {

		if (even == 0)
			var text = statusMsg;
		if (even == 1)
			var text = statusMsg + '_';
		statusMsgLbl.text = text;

		if (c == 3) {
			var text = statusMsg;
			statusMsgLbl.text = text;
			clearInterval(timer);
			c = 0;
			//if (isLast) animation.popIn(buttonHolderView);

			if (isLast) {
				setTimeout(function(e) {
					self.animate(hideView);
				}, 1000);
			}

		}

		c++;
		even++;
		if (even == 2)
			even = 0;
	}

	function saveSettings() {

		//first check passcode length
		if (requirePasscodeSwitch.value && vaultPasscodeInp.value.length < 4) {
			setStatusMsg('Passcode must be 4 digits.');
			return;
		}

		if (Ti.App.Properties.getString('masterPassword', '') == '' && requirePasscodeSwitch.value) {
			vaultPasscodeInp.value = '';
			setStatusMsg('Passcode cannot be saved without a system recovery password.');
			requirePasscodeSwitch.value = false;
			return;
		}

		//		rs = db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 'Samples', '#3c89b6', 'images/latest/vault_1_sm.pn8', 'images/latest/vault_1_lg.pn8', 'NO', 'SET', '1', 0, 1406065700451, 'YES', 0);
		var vaultName = vaultNameInp.value;
		var vaultColor = requirePasscodeSwitch.onColor;
		var vaultIconImg = 'images/latest/' + vaultColorDictionary[self.selectedColor].vaultIconImg;
		var vaultImg = 'images/latest/' + vaultColorDictionary[self.selectedColor].vaultImg;
		var isLocked = 'YES';
		var isSampleVault = 'YES';
		if (requirePasscodeSwitch.value)
			isSampleVault = 'NO';
		var lockPasscode = 'P' + vaultPasscodeInp.value;
		if (vaultPasscodeInp.value.length < 4)
			lockPasscode = 'SET';
		var vaultNum = vaultColorDictionary[self.selectedColor].vaultNum;
		var vaultDisplayOrder = 4;
		var vaultScreen = self.vaultScreen;
		var unlockTime = 1406065700451;
		var nextScreen = vaultScreen;

		////END
		/*if(numberOfScreens()==0){
		vaultScreen = vaultScreen + 1;
		vaultDisplayOrder = 0;
		} else {

		///does this have 5 vaults already?  If it does, you have to make room for it
		var vaultsOnScreen = numberOfButtons(nextScreen);
		var carryOn = false;
		if (vaultsOnScreen == 5) {
		carryOn = true;
		}

		while (carryOn) {
		nextScreen++;
		var vaultsOnScreen = numberOfButtons(nextScreen);
		if (vaultsOnScreen < 5) carryOn = false;

		addOneToAllVaults(nextScreen);
		moveLastVaultRight(nextScreen-1);

		}
		} */

		var vaultsOnScreen = numberOfButtons(nextScreen);
		var carryOn = false;
		if (vaultsOnScreen == 5) {
			carryOn = true;
			vaultScreen = vaultScreen + 1;
			var numOfVault = numberOfButtons(vaultScreen);
			vaultDisplayOrder = numOfVault;
		}

		create(vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, vaultScreen, unlockTime, isSampleVault);
		resetVaultOrder();
		Ti.App.fireEvent('updateVaults', {});

		currentStep = 4;
		statusMsgLbl.color = 'black';
		// pop buttonHolderview
		animation.popIn(buttonHolderView, hideButtonHolderView);

		Ti.App.fireEvent('resetPaging', {});
		Ti.App.fireEvent('setCurrentPage', {pageNumber : vaultScreen});

	}

	function hideButtonHolderView(e) {
		buttonHolderView.opacity = 0;
		statusMsgLbl.left = imgs.txtLblsLeft + 50;
		setStatusMsg('Vault Saved!');
	};

	function setStatusMsg(msg) {
		statusMsgLbl.text = '';
		statusMsgLbl.top = 565 - 11;
		//reset if in special location

		var isLast = false;
		var interval = 90;
		Ti.App.Properties.setInt('stupidityCount', 1);
		if (msg == 'Vault Saved!') {
			isLast = true;
			//New logic to, on the fist two tries, not display "Vault Saved!"
			//but something else

			var cnt = Ti.App.Properties.getInt('stupidityCount', 0);

			if (cnt < 2) {
				cnt++;
				Ti.App.Properties.setInt('stupidityCount', cnt);
				statusMsgLbl.left = imgs.txtLblsLeft;
				interval = 60;
				statusMsgLblLine2.color = 'black';
				statusMsgLblLine2.font = {
					fontFamily : 'AmericanTypewriter',
					fontSize : '22sp',
					fontWeight : 'normal'
				};
				statusMsgLbl.color = 'black';
				statusMsgLbl.font = {
					fontFamily : 'AmericanTypewriter',
					fontSize : '22sp',
					fontWeight : 'normal'
				};

				statusMsgLbl.text = ' ';
				statusMsgLblLine2.text = ' ';
				statusMsg = 'Any vault options can be changed later by';
				statusMsgLine2 = 'clicking';
				statusMsgLine3 = '';

				c = 0;
				clearInterval(timer);
				timer = setInterval(function(e) {
					typeTextForStatusMsg2LineStep1(isLast);
				}, interval);

			} else {

				//

				statusMsgLbl.text = ' ';
				statusMsg = msg;

				c = 0;
				clearInterval(timer);
				timer = setInterval(function(e) {
					typeTextForStatusMsg(isLast);
				}, interval);

			}

		} else {

			//checks for special messages
			if (msg == 'Passcode must be numbers only.' && vaultColorControl.opacity == 0) {
				statusMsgLbl.top = 185 + 16;
			}

			if (msg == 'Passcode must be 4 digits.' && vaultColorControl.opacity == 0) {
				statusMsgLbl.top = 185 + 16;
			}

			statusMsgLbl.text = ' ';
			statusMsg = msg;

			c = 0;
			clearInterval(timer);
			timer = setInterval(function(e) {
				typeTextForStatusMsg(isLast);
			}, interval);
		}

	};

	self.slideIn = function(e) {
		self.vaultScreen = e.j;
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
		//reset some values
		vaultNameInp.value = '';
		vaultNameInp.opacity = 0;

		//start here
		timer = setInterval(function(e) {
			typeTextForStep(0);
		}, 90);
	});

	var hideView = Titanium.UI.createAnimation();
	hideView.left = '110%';
	hideView.duration = 500;

	hideView.addEventListener('complete', resetOnClose);

	function resetOnClose() {
		//reset some values
		var reqPassSave = requirePasscodeSwitch.value;
		vaultNameInp.value = '';
		vaultNameInp.opacity = 0;
		vaultColorControl.opacity = 0;
		vaultColorControl.hideAll();
		requirePasscodeSwitch.opacity = 0;

		requirePasscodeSwitch.value = false;
		buttonMetal.opacity = 0;
		setLbl.opacity = 0;
		setLbl.setText('NEXT');
		statusMsgLbl.color = 'red';
		statusMsgLbl.text = '';
		statusMsgLbl.left = imgs.txtLblsLeft;
		vaultPasscodeInp.value = '';

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

		Ti.App.removeEventListener('bypass', bypassFunc);
		parent.remove(self);

	};

	self.addEventListener('newColor', function(e) {
		var selectedColor = e.selectedColor;
		self.selectedColor = selectedColor;
		buttonMetal.backgroundImage = 'images/latest/' + vaultColorDictionary[selectedColor].button;
		requirePasscodeSwitch.onColor = vaultColorDictionary[selectedColor].onColor;
	});

	function create(vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, vaultScreen, unlockTime, isSampleVault) {

		var db = Ti.Database.open('cloud');
		db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, 'YES', 'YES', 'NO', 'YES', 'YES');
		db.close();

	};

	self.addEventListener('swipe', function(e) {
		if (e.direction === 'right') {
			var swipe = true;
			if (e.x > 219 && e.x < 390 && e.y > 100 && e.y < 188)
				swipe = false;

			if ( typeof (e.source.switchArea) != 'undefined')
				swipe = false;

			if (swipe)
				self.animate(hideView);
		}
	});
	return self;
};

module.exports = vaultNewSlideout;
