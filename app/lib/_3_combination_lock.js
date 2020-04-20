function CombinationLock(_args) {

	var self = Ti.UI.createView({
		top : setting.comboLock.top,
		left : setting.comboLock.left,
		width : 781,
		height : imgs.largeSize, //must be higher for animation
		opacity : 0,
		shake : 0
	});

	//testing keyboard
	var textField = Titanium.UI.createTextField({
		height : 40,
		top : 100,
		left : 200,
		backgroundColor : 'transparent',
		value : '',
		width : 100,
		color : 'transparent',
		zIndex : 0,
		keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
		autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
	});

	self.add(textField);

	textField.addEventListener('change', function(e) {

		for ( i = 0; i < Math.min(4, e.source.value.length); i++) {
			var digit = e.source.value.charAt(i);
			picker.setSelectedRow(i, parseInt(digit) + 40, true);
		}
		setIndicator(mietf.addTypedNumber(e.source.value.slice(-1)));
		if (e.source.value.length > 3) {
			textField.value = '';
		}

	});

	var combosVault = Ti.UI.createView({
		top : 0,
		height : setting.comboLock.height,
		width : setting.comboLock.width,
		left : 0,
		backgroundColor : 'transparent',
		zIndex : 1
	});

	var combosInsideForAnim = Ti.UI.createView({
		top : 0,
		height : setting.comboLock.height,
		width : setting.comboLock.width,
		left : 0,
		backgroundColor : 'transparent',
		zIndex : 2
	});

	self.add(combosVault);
	self.add(combosInsideForAnim);

	var vaultDoor = Ti.UI.createImageView({
		image : imgs.vaultDoor
	});

	combosInsideForAnim.add(vaultDoor);

	var vaultId = 0;

	var centerView = Ti.UI.createView({
		width : '100%',
		height : '100%'
	});

	combosInsideForAnim.add(centerView);

	var idiotButton = Ti.UI.createButton({
		backgroundImage : 'images/ifapps/keypad_lg.pn8',
		//backgroundImage: imgs.vaultDoor,
		width : 78,
		height : 78,
		bottom : 81
	});

	combosInsideForAnim.add(idiotButton);

	idiotButton.addEventListener('click', function(e) {
		//combosVault.add(keypadOverlay);
		mietf.setUnlockControlPreference('keypad');
		idiotButton.animate(showKeyboardAnim);
		animation.fadeOut(buttonHolderView);
	});

	var showKeyboardAnim = Titanium.UI.createAnimation();
	showKeyboardAnim.width = '100%';
	showKeyboardAnim.height = '100%';
	showKeyboardAnim.bottom = 0;
	showKeyboardAnim.duration = 500;

	showKeyboardAnim.addEventListener('complete', addKeyboardOverlay);

	function addKeyboardOverlay(e) {
		combosInsideForAnim.add(keypadOverlay);
	};

	var hideKeyboardAnim = Titanium.UI.createAnimation();
	hideKeyboardAnim.width = 78;
	hideKeyboardAnim.height = 78;
	hideKeyboardAnim.bottom = 81;
	hideKeyboardAnim.duration = 500;

	var keypadOverlay = Ti.UI.createView({
		//image: imgs.vaultDoor,
		height : 576,
		width : 576
	});

	var indicatorView = Ti.UI.createView({
		width : 176,
		height : 32, //
		top : 104 //72
	});

	keypadOverlay.add(indicatorView);

	var indicator1 = Ti.UI.createImageView({
		image : 'images/latest/pad_dot.pn8',
		width : 32,
		height : 32,
		left : 0
	});

	indicatorView.add(indicator1);

	var indicator1on = Ti.UI.createImageView({
		image : 'images/latest/pad_dot_active.pn8',
		width : 32,
		height : 32,
		left : 0,
		opacity : 0
	});

	indicatorView.add(indicator1on);

	var indicator2 = Ti.UI.createImageView({
		image : 'images/latest/pad_dot.pn8',
		width : 32,
		height : 32,
		left : 48
	});

	indicatorView.add(indicator2);

	var indicator2on = Ti.UI.createImageView({
		image : 'images/latest/pad_dot_active.pn8',
		width : 32,
		height : 32,
		left : 48,
		opacity : 0
	});

	indicatorView.add(indicator2on);

	var indicator3 = Ti.UI.createImageView({
		image : 'images/latest/pad_dot.pn8',
		width : 32,
		height : 32,
		left : 96
	});

	indicatorView.add(indicator3);

	var indicator3on = Ti.UI.createImageView({
		image : 'images/latest/pad_dot_active.pn8',
		width : 32,
		height : 32,
		left : 96,
		opacity : 0
	});

	indicatorView.add(indicator3on);

	var indicator4 = Ti.UI.createImageView({
		image : 'images/latest/pad_dot.pn8',
		width : 32,
		height : 32,
		left : 144
	});

	indicatorView.add(indicator4);

	var indicator4on = Ti.UI.createImageView({
		image : 'images/latest/pad_dot_active.pn8',
		width : 32,
		height : 32,
		left : 144,
		opacity : 0
	});

	indicatorView.add(indicator4on);

	function setIndicator(numTyped) {

		if (numTyped == 0) {
			indicator1on.opacity = 0;
			indicator2on.opacity = 0;
			indicator3on.opacity = 0;
			indicator4on.opacity = 0;
		}

		if (numTyped == 1) {
			indicator1on.opacity = 1;
			indicator2on.opacity = 0;
			indicator3on.opacity = 0;
			indicator4on.opacity = 0;
		}

		if (numTyped == 2) {
			indicator1on.opacity = 1;
			indicator2on.opacity = 1;
			indicator3on.opacity = 0;
			indicator4on.opacity = 0;
		}

		if (numTyped == 3) {
			indicator1on.opacity = 1;
			indicator2on.opacity = 1;
			indicator3on.opacity = 1;
			indicator4on.opacity = 0;
		}

		if (numTyped == 4) {
			indicator1on.opacity = 1;
			indicator2on.opacity = 1;
			indicator3on.opacity = 1;
			indicator4on.opacity = 1;

			var digit4 = mietf.typedNumber.pop();
			var digit3 = mietf.typedNumber.pop();
			var digit2 = mietf.typedNumber.pop();
			var digit1 = mietf.typedNumber.pop();

			var lockPasscode = 'P' + digit1 + digit2 + digit3 + digit4;

			picker.setSelectedRow(0, parseInt(digit1) + 40, false);
			picker.setSelectedRow(1, parseInt(digit2) + 40, false);
			picker.setSelectedRow(2, parseInt(digit3) + 40, false);
			picker.setSelectedRow(3, parseInt(digit4) + 40, false);
			checkPassCodeHere(lockPasscode);

		}
	};

	function checkPassCodeHere(lockPasscode) {

		var checkPass = checkPasscode({
			vaultId : vaultId,
			lockPasscode : lockPasscode
		});

		if (checkPass != lockPasscode) {
			setIndicator(0);
			mietf.resetTypedNumber();

			self.shake++;

			if (self.shake < 3)
				animation.shake(self, 500);

			if (self.shake > 2) {
				var title = 'Please enter your master password (hint: "' + Ti.App.Properties.getString('passwordHint') + '"): ';
				if (self.shake == 3)
					title = 'Please enter your master password: ';
				self.shake = 0;
				var MiAlertDialog = require('mi2AlertDialog'),
				    dialog = new MiAlertDialog({
					parent : self,
					text : title,
					opaque : true,
					hintText : 'Password'
				});

				dialog.addEventListener('finished', function(e) {
					Ti.API.info('e.text: ' + e.text);
					dialog.close();
					if (checkMasterPassword(e.text)) {
						var digit1 = checkPass.charAt(1);
						var digit2 = checkPass.charAt(2);
						var digit3 = checkPass.charAt(3);
						var digit4 = checkPass.charAt(4);

						picker.setSelectedRow(0, parseInt(digit1) + 40, true);
						picker.setSelectedRow(1, parseInt(digit2) + 40, true);
						picker.setSelectedRow(2, parseInt(digit3) + 40, true);
						picker.setSelectedRow(3, parseInt(digit4) + 40, true);
						VaultsBtnEnabled = true;
						indicator1on.opacity = 1;
						indicator2on.opacity = 1;
						indicator3on.opacity = 1;
						indicator4on.opacity = 1;
						animation.fadeIn(buttonHolderView);

						var MiAlert = require('miAlert'),
						    miAlert = new MiAlert({
							parent : self,
							text : 'Your passcode is ' + checkPass.substring(1, 5) + '.  Click "Open" to unlock.',
							opaque : true,
							smallText : true
						});

						miAlert.open({
							animate : true
						});

					} else {
						if (e.text.length > 0)
							incorrectMasterPassword({
								checkPass : checkPass
							});
					}
				});

				dialog.open({
					animate : true
				});
				dialog.popKeyboard();
			}

		} else {
			var vault = new Vault();
			vault.getVaultById(vaultId);
			//until you pass it around, just getting it again

			vault.unlock();
			for (var i = 0; i < vaults.length; i++) {
				if (vaults[i].vaultId == vaultId) {
					vaults[i].isLocked = 'NO';
					//oh boy is this all confused
				}
			}

			Ti.App.fireEvent('comboToPortfolio', {
				vaultId : vaultId
			});
		}
	};

	var btn1 = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_round.pn8',
		key : 1,
		width : 64,
		height : 64,
		left : 176,
		top : 160
	});

	/*
	 * 	 var text = 'LOCK';

	 var attr = Ti.UI.createAttributedString({
	 text: text,
	 attributes: [
	 {
	 type: Ti.UI.ATTRIBUTE_TEXT_EFFECT,
	 value: Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
	 range: [0, text.length]
	 }
	 ]
	 });

	 var setLbl = Ti.UI.createLabel({
	 color: 'white',
	 font: {  fontSize:'16sp', fontWeight: 'bold' },
	 // shadowColor: '#333',
	 //  shadowOffset: {x:1, y:2},
	 //  shadowRadius: 3,
	 attributedString: attr,
	 textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	 width: 96, height: 70,
	 touchEnabled: false
	 });
	 */

	var attr1 = Ti.UI.createAttributedString({
		text : '1',
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, 1]
		}]
	});

	var btn1Lbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		attributedString : attr1,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});
	btn1.add(btn1Lbl);

	keypadOverlay.add(btn1);

	btn1.addEventListener('touchend', function(e) {
		setIndicator(mietf.addTypedNumber(btn1.key));
	});

	var btn2 = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_round.pn8',
		key : 2,
		width : 64,
		height : 64,
		left : 256,
		top : 160
	});

	var attr2 = Ti.UI.createAttributedString({
		text : '2',
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, 1]
		}]
	});

	var btn2Lbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		attributedString : attr2,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});
	btn2.add(btn2Lbl);

	keypadOverlay.add(btn2);

	btn2.addEventListener('touchend', function(e) {
		setIndicator(mietf.addTypedNumber(btn2.key));
	});

	var btn3 = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_round.pn8',
		key : 3,
		width : 64,
		height : 64,
		left : 336,
		top : 160
	});

	var attr3 = Ti.UI.createAttributedString({
		text : '3',
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, 1]
		}]
	});
	var btn3Lbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		attributedString : attr3,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});
	btn3.add(btn3Lbl);

	keypadOverlay.add(btn3);
	btn3.addEventListener('touchend', function(e) {
		setIndicator(mietf.addTypedNumber(btn3.key));
	});

	var btn4 = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_round.pn8',
		key : 4,
		width : 64,
		height : 64,
		left : 176,
		top : 240
	});

	var attr4 = Ti.UI.createAttributedString({
		text : '4',
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, 1]
		}]
	});
	var btn4Lbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		attributedString : attr4,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});
	btn4.add(btn4Lbl);

	keypadOverlay.add(btn4);
	btn4.addEventListener('touchend', function(e) {
		setIndicator(mietf.addTypedNumber(btn4.key));
	});

	var btn5 = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_round.pn8',
		key : 5,
		width : 64,
		height : 64,
		left : 256,
		top : 240
	});

	var attr5 = Ti.UI.createAttributedString({
		text : '5',
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, 1]
		}]
	});

	var btn5Lbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		attributedString : attr5,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});
	btn5.add(btn5Lbl);

	keypadOverlay.add(btn5);
	btn5.addEventListener('touchend', function(e) {
		setIndicator(mietf.addTypedNumber(btn5.key));
	});

	var btn6 = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_round.pn8',
		key : 6,
		width : 64,
		height : 64,
		left : 336,
		top : 240
	});

	var attr6 = Ti.UI.createAttributedString({
		text : '6',
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, 1]
		}]
	});

	var btn6Lbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		attributedString : attr6,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});
	btn6.add(btn6Lbl);

	keypadOverlay.add(btn6);
	btn6.addEventListener('touchend', function(e) {
		setIndicator(mietf.addTypedNumber(btn6.key));
	});

	var btn7 = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_round.pn8',
		key : 7,
		width : 64,
		height : 64,
		left : 176,
		top : 320
	});

	var attr7 = Ti.UI.createAttributedString({
		text : '7',
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, 1]
		}]
	});

	var btn7Lbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		attributedString : attr7,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});
	btn7.add(btn7Lbl);

	keypadOverlay.add(btn7);
	btn7.addEventListener('touchend', function(e) {
		setIndicator(mietf.addTypedNumber(btn7.key));
	});

	var btn8 = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_round.pn8',
		key : 8,
		width : 64,
		height : 64,
		left : 256,
		top : 320
	});

	var attr8 = Ti.UI.createAttributedString({
		text : '8',
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, 1]
		}]
	});
	var btn8Lbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		attributedString : attr8,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});
	btn8.add(btn8Lbl);

	keypadOverlay.add(btn8);
	btn8.addEventListener('touchend', function(e) {
		setIndicator(mietf.addTypedNumber(btn8.key));
	});

	var btn9 = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_round.pn8',
		key : 9,
		width : 64,
		height : 64,
		left : 336,
		top : 320
	});

	var attr9 = Ti.UI.createAttributedString({
		text : '9',
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, 1]
		}]
	});

	var btn9Lbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		attributedString : attr9,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});
	btn9.add(btn9Lbl);

	keypadOverlay.add(btn9);
	btn9.addEventListener('touchend', function(e) {
		setIndicator(mietf.addTypedNumber(btn9.key));
	});

	var backArrow = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_back_round.pn8',
		key : 7,
		width : 64,
		height : 64,
		left : 176,
		top : 400
	});
	/*
	 *   	var text = 'CLEAR';

	 var attr = Ti.UI.createAttributedString({
	 text: text,
	 attributes: [
	 {
	 type: Ti.UI.ATTRIBUTE_TEXT_EFFECT,
	 value: Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
	 range: [0, text.length]
	 }
	 ]
	 });

	 var securedLbl = Ti.UI.createLabel({
	 height: Ti.UI.SIZE,
	 attributedString: attr,
	 color: 'black',
	 font:{fontFamily: 'AvenirNextCondensed-Bold', fontSize: '10sp', fontWeight: 'bold'},
	 touchEnabled: false
	 });

	 backArrow.add(securedLbl);

	 */

	keypadOverlay.add(backArrow);

	backArrow.addEventListener('click', function(e) {

		var numTyped = mietf.removeTypedNumber();
		if (numTyped > -1)
			setIndicator(numTyped);

		if (numTyped == -1) {
			mietf.setUnlockControlPreference('comboLock');

			setIndicator(0);
			combosInsideForAnim.remove(keypadOverlay);
			idiotButton.animate(hideKeyboardAnim);
			animation.fadeIn(buttonHolderView);
			return;
		}
	});

	var btn0 = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_round.pn8',
		key : 0,
		width : 64,
		height : 64,
		left : 256,
		top : 400
	});

	var attr0 = Ti.UI.createAttributedString({
		text : '0',
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, 1]
		}]
	});

	var btn0Lbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		attributedString : attr0,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false
	});
	btn0.add(btn0Lbl);

	keypadOverlay.add(btn0);
	btn0.addEventListener('touchend', function(e) {
		setIndicator(mietf.addTypedNumber(btn0.key));
	});

	var btnComboLock = Ti.UI.createButton({
		backgroundImage : 'images/latest/pad_dial_round.pn8',
		key : 9,
		width : 64,
		height : 64,
		left : 336,
		top : 400
	});

	/*
	 * 	var idiotButton = Ti.UI.createButton({
	 backgroundImage: 'images/ifapps/keypad_lg.pn8',
	 //backgroundImage: imgs.vaultDoor,
	 width: 78,
	 height: 78,
	 bottom: 81
	 });

	 combosVault.add(idiotButton);

	 idiotButton.addEventListener('click', function(e) {
	 //combosVault.add(keypadOverlay);
	 idiotButton.animate(showKeyboardAnim);
	 });
	 */

	keypadOverlay.add(btnComboLock);
	btnComboLock.addEventListener('click', function(e) {
		mietf.setUnlockControlPreference('comboLock');
		animation.fadeIn(buttonHolderView);
		setIndicator(0);
		mietf.resetTypedNumber();

		var idiotView = Ti.UI.createView({
			backgroundImage : 'images/ifapps/keypad_lg.pn8',
			//backgroundImage: imgs.vaultDoor,
			width : '100%',
			height : '100%',
			bottom : 0
		});
		combosInsideForAnim.add(idiotView);
		idiotButton.width = 78;
		idiotButton.height = 78;
		idiotButton.bottom = 81;
		combosInsideForAnim.remove(keypadOverlay);
		hideKeyboardAnim.duration = 500;
		idiotView.animate(hideKeyboardAnim);
		setTimeout(function(e) {
			combosInsideForAnim.remove(idiotView);
		}, 500);
	});

	self.comboToPortfolioSize = function(e) {

		/*
		 animation.fadeOut(buttonHolderView, 500);
		 //added
		 animation.fadeOut(vaultDoor, 500);
		 animation.fadeOut(centerView), 500;
		 animation.fadeOut(idiotButton, 500, endCallBack);
		 */
		animation.fadeOut(combosInsideForAnim, 500, endCallBack);
		animation.fadeOut(buttonHolderView, 500);

		function endCallBack(e) {
			try {
				combosInsideForAnim.remove(keypadOverlay);
			} catch (err) {

			}

			Ti.App.fireEvent('comboToPortfolioEnd', {});
		};

		/*

		var comboToPortfolioSize = Ti.UI.createAnimation({
		duration : 500,
		delay: 300,
		width: imgs.largeSize,
		height: imgs.largeSize
		});

		var selfToPortfolioPosition = Ti.UI.createAnimation({
		duration :  500,
		delay: 300,
		top: 112,
		left: 224
		});

		selfToPortfolioPosition.addEventListener('complete', function(e) {
		Ti.App.fireEvent('comboToPortfolioEnd', {});
		});
		*/

		//self.animate(selfToPortfolioPosition);
		//vaultDoor.animate(comboToPortfolioSize);
		//combosVault.animate(comboToPortfolioSize);
	};

	//picker test
	var pickerV = Ti.UI.createView({
		//bottom: '52%',
		width : 300,
		height : 170,
		borderRadius : 36,
		backgroundColor : 'red' //will be transparent
	});

	var picker = Ti.UI.createPicker({
		borderRadius : 50,
		height : 300,
		width : 300,
		backgroundColor: 'black'
	});

	var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	var column = Ti.UI.createPickerColumn({backgroundColor: 'black'});

	for (var j = 0,
	    k = 9; j < k; j++) {
		for (var i = 0,
		    ilen = numbers.length; i < ilen; i++) {
			var row = Ti.UI.createPickerRow({
				backgroundColor: 'black',
				id : i
			});
			var label = Ti.UI.createLabel({
				text : i,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				font : {
					fontSize : '22sp'
				},
				width : 44,
				height : 44,
				backgroundColor: 'black',
				color : 'white'
			});
			//5, -94
			//var img = Ti.UI.createImageView({image:'images/numbers/'+i+'.pn8',width:44,height:44});
			row.add(label);
			column.addRow(row);
		}
	}

	picker.add([column, column, column, column]);

	var pickerMetal = Ti.UI.createImageView({
		image : imgs.unlockOverlay,
		//bottom: '52%',
		touchEnabled : false,
		zIndex : 2
	});

	pickerV.add(picker);

	var buttonHolderView = Ti.UI.createView({
		left : 624, //587,
		width : 128,
		height : 128,
		touchEnabled : true,
		vaultId : 0,
		zIndex : 100,
		top : 224
	});

	var buttonMetal = Ti.UI.createImageView({
		image : 'images/latest/btn_1.pn8',
		height : 128,
		width : 128
	});

	buttonMetal.addEventListener('click', function(e) {

		if (setLbl.text1 == 'SET') {
			var lockPasscode = 'P' + picker.getSelectedRow(0).id + picker.getSelectedRow(1).id + picker.getSelectedRow(2).id + picker.getSelectedRow(3).id;

			var vault = new Vault();
			vault.getVaultById(vaultId);
			//until you pass it around, just getting it again

			vault.lockPasscode = lockPasscode;

			if (lockPasscode == 'P0000') {

				var MiAlertYesNo = require('miAlertYesNo'),
				    dialog = new MiAlertYesNo({
					parent : self,
					text : 'Detected default 0000 passcode, would you like to turn off passcode protection for this vault?',
					opaque : true,
					smallText : true
				});

				dialog.addEventListener('finished', function(e) {
					Ti.API.info('e.index: ' + e.index);

					if (e.text == 'Yes') {
						vault.setRequirePassword(false);
						Ti.App.fireEvent('comboToPortfolio', {
							vaultId : vaultId
						});

					} else {
						if (Ti.App.Properties.getString('masterPassword', '') == '') {
							Ti.App.fireEvent('slideInMasterPassword', {});
						}
					}
				});
				dialog.open({
					animated : true
				});
			}

			//setPasscode({vaultId:vaultId, lockPasscode:lockPasscode});

			if (Ti.App.Properties.getString('masterPassword', '') == '' && lockPasscode != 'P0000') {
				Ti.App.fireEvent('slideInMasterPassword', {});
			}

			Ti.App.fireEvent('updateButton', {
				vaultId : vaultId,
				lockPasscode : lockPasscode
			});
			setLbl.text1 = 'OPEN';
			setLbl.setText('OPEN');

		} else {

			//VaultsBtnEnabled = false;
			var lockPasscode = 'P' + picker.getSelectedRow(0).id + picker.getSelectedRow(1).id + picker.getSelectedRow(2).id + picker.getSelectedRow(3).id;
			var checkPass = checkPasscode({
				vaultId : vaultId,
				lockPasscode : lockPasscode
			});

			if (checkPass != lockPasscode) {

				self.shake++;

				if (self.shake < 3)
					animation.shake(self, 500);

				if (self.shake > 2) {
					var title = 'Please enter your master password (hint: "' + Ti.App.Properties.getString('passwordHint') + '"): ';
					if (self.shake == 3)
						title = 'Please enter your master password: ';
					self.shake = 0;
					var MiAlertDialog = require('mi2AlertDialog'),
					    dialog = new MiAlertDialog({
						parent : self,
						text : title,
						opaque : true,
						hintText : 'Password'
					});

					dialog.addEventListener('finished', function(e) {
						Ti.API.info('e.text: ' + e.text);
						dialog.close();
						if (checkMasterPassword(e.text)) {
							var digit1 = checkPass.charAt(1);
							var digit2 = checkPass.charAt(2);
							var digit3 = checkPass.charAt(3);
							var digit4 = checkPass.charAt(4);

							picker.setSelectedRow(0, parseInt(digit1) + 40, true);
							picker.setSelectedRow(1, parseInt(digit2) + 40, true);
							picker.setSelectedRow(2, parseInt(digit3) + 40, true);
							picker.setSelectedRow(3, parseInt(digit4) + 40, true);
							VaultsBtnEnabled = true;

						} else {
							if (e.text.length > 0)
								incorrectMasterPassword({
									checkPass : checkPass
								});
						}
					});
					dialog.open({
						animated : true
					});
					dialog.popKeyboard();

				}

			} else {
				var vault = new Vault();
				vault.getVaultById(vaultId);
				//until you pass it around, just getting it again

				vault.unlock();
				for (var i = 0; i < vaults.length; i++) {
					if (vaults[i].vaultId == vaultId) {
						vaults[i].isLocked = 'NO';
						//oh boy is this all confused
					}
				}

				Ti.App.fireEvent('comboToPortfolio', {
					vaultId : vaultId
				});
			}

		}

		picker.setSelectedRow(0, picker.getSelectedRow(0).id + 40, false);
		picker.setSelectedRow(1, picker.getSelectedRow(1).id + 40, false);
		picker.setSelectedRow(2, picker.getSelectedRow(2).id + 40, false);
		picker.setSelectedRow(3, picker.getSelectedRow(3).id + 40, false);

	});

	var SetLbl = require('setLblText');
	var setLbl = new SetLbl();

	buttonHolderView.add(buttonMetal);
	buttonHolderView.add(setLbl);

	self.add(buttonHolderView);
	centerView.add(pickerMetal);
	centerView.add(pickerV);

	function incorrectMasterPassword(_args) {
		var checkPass = _args.checkPass;
		var title = 'Please enter your master password: ';
		//this is now a weird flag
		var hint = Ti.App.Properties.getString('passwordHint');

		var MiAlertDialog = require('mi2AlertDialog'),
		    dialog = new MiAlertDialog({
			parent : self,
			fontSize : '21sp',
			text : title,
			opaque : true,
			hintText : 'Password',
			type : 'popupPasscode',
			passwordHint : hint,
			withPasswordHint : true
		});

		dialog.addEventListener('finished', function(e) {
			Ti.API.info('e.text: ' + e.text);

			if (checkMasterPassword(e.text)) {
				var digit1 = checkPass.charAt(1);
				var digit2 = checkPass.charAt(2);
				var digit3 = checkPass.charAt(3);
				var digit4 = checkPass.charAt(4);

				picker.setSelectedRow(0, parseInt(digit1) + 40, true);
				picker.setSelectedRow(1, parseInt(digit2) + 40, true);
				picker.setSelectedRow(2, parseInt(digit3) + 40, true);
				picker.setSelectedRow(3, parseInt(digit4) + 40, true);
				animation.fadeIn(buttonHolderView);

				dialog.close();
				var MiAlert = require('miAlert'),
				    miAlert = new MiAlert({
					parent : self,
					text : 'Your passcode is ' + checkPass.substring(1, 5) + '.',
					opaque : true
				});

				miAlert.open({
					animate : true
				});

			} else {

				dialog.shakeModal();

			}
		});
		dialog.open({
			animated : true
		});
		dialog.popKeyboard();

	};

	self.snapImage = function(e) {
		var Blob = self.toImage();
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'combo.pn8');
		file.write(Blob);
	};

	self.addEventListener('debugShowKeyboard', function(e) {
		self.showKeyboard();
	});

	self.addEventListener('debugHideKeyboard', function(e) {
		textField.value = '';
		textField.blur();
	});

	self.showKeyboard = function(e) {
		textField.value = '';
		textField.focus();
	};

	//end picker test

	self.prepareLock = function(vault) {

		mietf.setScreen({
			scrn : 'comboLock'
		});

		buttonHolderView.opacity = 1;
		vaultDoor.opacity = 1;
		centerView.opacity = 1;
		idiotButton.opacity = 1;

		self.top = setting.comboLock.top;
		self.left = setting.comboLock.left;
		combosVault.height = setting.comboLock.height;
		combosVault.width = setting.comboLock.width;
		combosInsideForAnim.height = setting.comboLock.height;
		combosInsideForAnim.width = setting.comboLock.width;
		vaultDoor.height = setting.comboLock.height;
		vaultDoor.width = setting.comboLock.width;

		vaultId = vault.vaultId;
		self.shake = 0;
		//buttonMetal.image = 'images/latest/btn_' + vault.vaultNum + '.pn8';
		buttonMetal.image = 'images/latest/btn_' + vault.vaultNum + '.pn8';

		if (vault.lockPasscode == 'SET') {
			setLbl.text1 = 'SET';
			setLbl.setText('SET');
		} else {
			setLbl.text1 = 'OPEN';
			setLbl.setText('OPEN');
		}

		combosVault.backgroundImage = vault.vaultImg;
		combosInsideForAnim.opacity = 1;

		indicator1on.image = 'images/latest/pad_dot_active_' + vault.vaultNum + '.pn8';
		indicator2on.image = 'images/latest/pad_dot_active_' + vault.vaultNum + '.pn8';
		indicator3on.image = 'images/latest/pad_dot_active_' + vault.vaultNum + '.pn8';
		indicator4on.image = 'images/latest/pad_dot_active_' + vault.vaultNum + '.pn8';

		//circle1.backgroundColor = mietf.vaultColorDictionary[ vault.vaultNum-1].color;
		//circle2.backgroundColor = mietf.vaultColorDictionary[ vault.vaultNum-1].color;
		//circle3.backgroundColor = mietf.vaultColorDictionary[ vault.vaultNum-1].color;
		//circle4.backgroundColor = mietf.vaultColorDictionary[ vault.vaultNum-1].color;

		picker.setSelectedRow(0, 30, false);
		picker.setSelectedRow(1, 30, false);
		picker.setSelectedRow(2, 30, false);
		picker.setSelectedRow(3, 30, false);

		idiotButton.width = 78;
		idiotButton.height = 78;
		idiotButton.bottom = 81;

		mietf.resetTypedNumber();
		try {
			setIndicator(0);
			combosVault.remove(keypadOverlay);
		} catch (err) {

		}

		if (mietf.getUnlockControlPreference() == 'keypad') {
			var showKeypadAnim = Titanium.UI.createAnimation();
			showKeypadAnim.width = '100%';
			showKeypadAnim.height = '100%';
			showKeypadAnim.bottom = 0;
			showKeypadAnim.duration = 100;

			animation.fadeOut(buttonHolderView);

			showKeypadAnim.addEventListener('complete', addKeyboardOverlay);

			idiotButton.animate(showKeypadAnim);
		}

	};

	return self;
};

module.exports = CombinationLock; 