function miAlertDialog(_args) {

	var text = _args.text;
	var withPasswordHint = _args.withPasswordHint;
	var passwordHint = _args.passwordHint;

	var hintText = _args.hintText;
	var parent = _args.parent;
	var opaque = _args.opaque;

	var self = Ti.UI.createWindow({
		height : '100%',
		width : '100%',
		backgroundColor : 'transparent',
		zIndex : 100
	});

	if (opaque) {
		var greyBackground = Ti.UI.createView({//transparent background - because this modal will often go on top of another modal
			height : '100%',
			width : '100%',
			backgroundColor : 'black',
			opacity : .8
		});

		self.add(greyBackground);
	} else {
		var greyBackground = Ti.UI.createView({//transparent background - because this modal will often go on top of another modal
			height : '100%',
			width : '100%'
		});

		self.add(greyBackground);

	}

	var bi = 'images/latest/popup_bgNoOpacity.pn8';
	if (opaque)
		bi = 'images/latest/popup_bg.pn8';

	var modalView = Ti.UI.createView({
		top : 80,
		height : 288,
		width : 448,
		backgroundImage : bi,
		shake : 0
	});

	self.add(modalView);

	if (text == 'Please enter your master password: ') {

		if (withPasswordHint) {

			var pleaseEnterLbl = Ti.UI.createLabel({//VAULT OPTIONS:
				top : 56,
				width : 250,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				text : 'Oops!',
				color : 'white', //'#57585d',
				font : {
					fontFamily : imgs.txtLblsFontFamily,
					fontSize : '32sp',
					fontWeight : 'bold'
				}
			});

			modalView.add(pleaseEnterLbl);

			var pleaseEnterLbl2 = Ti.UI.createLabel({//VAULT OPTIONS:
				top : 104,
				width : 250,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				text : 'Wrong Master Password.',
				color : 'white', //'#57585d',
				font : {
					fontFamily : 'AvenirNextCondensed-Regular',
					fontSize : '21sp',
					fontWeight : 'normal'
				}
			});

			modalView.add(pleaseEnterLbl2);

			var pleaseEnterLbl3 = Ti.UI.createLabel({//VAULT OPTIONS:
				top : 136,
				width : 250,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				text : 'Hint "' + passwordHint + '"',
				color : 'white', //'#57585d',
				font : {
					fontFamily : 'AvenirNextCondensed-Regular',
					fontSize : '21sp',
					fontWeight : 'normal'
				}
			});

			modalView.add(pleaseEnterLbl3);

		} else {

			var pleaseEnterLbl = Ti.UI.createLabel({//VAULT OPTIONS:
				top : 56,
				width : 250,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				text : 'Please Enter the',
				color : 'white', //'#57585d',
				font : {
					fontFamily : imgs.txtLblsFontFamily,
					fontSize : '32sp',
					fontWeight : 'bold'
				}
			});

			modalView.add(pleaseEnterLbl);

			var pleaseEnterLbl2 = Ti.UI.createLabel({//VAULT OPTIONS:
				top : 104,
				width : 250,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				text : 'Master Password',
				color : 'white', //'#57585d',
				font : {
					fontFamily : imgs.txtLblsFontFamily,
					fontSize : '32sp',
					fontWeight : 'bold'
				}
			});

			modalView.add(pleaseEnterLbl2);
		}
	} else {

		var msgLblView = Ti.UI.createView({
			top : 32,
			width : 288,
			height : 112
		});

		var msgLbl = Ti.UI.createLabel({//VAULT OPTIONS:
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			text : text,
			color : 'white', //'#57585d',
			font : {
				fontFamily : imgs.txtLblsFontFamily,
				fontSize : '24sp',
				fontWeight : 'bold'
			}
		});

		msgLblView.add(msgLbl);
		modalView.add(msgLblView);

	}

	///////////////////////

	var noBtn = Ti.UI.createButton({
		backgroundImage : 'images/latest/close_btn.pn8',
		width : 32,
		height : 32,
		top : 32,
		right : 32
	});

	modalView.add(noBtn);

	noBtn.addEventListener('click', function(e) {
		self.fireEvent('finished', {
			text : ''
		});
		self.close();
	});

	var passwordInp = Titanium.UI.createTextField({
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '21sp',
			fontWeight : 'Bold'
		},
		textAlign : 'center',
		top : 192,
		height : 48,
		width : 224,
		hintText : hintText,
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
		zIndex : 20
	});

	passwordInp.addEventListener('return', function(e) {//FINDMEFINDME
		passwordInp.blur();
		self.fireEvent('finished', {
			text : passwordInp.value
		});
		//self.close();
	});

	modalView.add(passwordInp);

	self.popKeyboard = function(e) {
		passwordInp.focus();
	};

	self.shakeModal = function(e) {
		passwordInp.focus();
		animation.shake(modalView, 500);
	};

	return self;
};

module.exports = miAlertDialog;
