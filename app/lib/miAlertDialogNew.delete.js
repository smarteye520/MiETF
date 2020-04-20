function miAlertDialog(_args) {
	
	var text = _args.text;
	var hintText = _args.hintText;
	var parent = _args.parent;
	var opaque = _args.opaque;
	var fontSize = _args.fontSize;
	var msgWidth = 320;
	
	var self = Ti.UI.createWindow({ 
		height: '100%',
		width: '100%',
	 	backgroundColor: 'transparent',
	 	zIndex: 100
		});
	
	if (opaque) {
			var greyBackground = Ti.UI.createView({ //transparent background - because this modal will often go on top of another modal
		height: '100%',
		width: '100%',
	 	backgroundColor: 'black',
	 	opacity: .8
		});
		
		self.add(greyBackground);
	} else {
	var greyBackground = Ti.UI.createView({ //transparent background - because this modal will often go on top of another modal
		height: '100%',
		width: '100%'
		});
		
		self.add(greyBackground);		
		
	}	

		
	var bi = 'images/latest/popup_bgNoOpacity.pn8';
	if (opaque) bi = 'images/latest/popup_bg.pn8';
	
	var modalView = Ti.UI.createView({ 
			top: 96,
		height: 296,
		width: 464,
	 	backgroundImage: bi,
	 	shake: 0
		});
		
	self.add(modalView);
	
	var msgLblView = Ti.UI.createView({
		top: 32,
		width: msgWidth,
		height: 112
	});
	
	var msgLbl = Ti.UI.createLabel({//VAULT OPTIONS:
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT, //Ti.UI.TEXT_ALIGNMENT_CENTER,
		text : text,
		color : 'white', //'#57585d',
		font : {
			fontFamily : imgs.txtLblsFontFamily,
			fontSize : fontSize,
			fontWeight : 'bold'
		}
	});
	
	
	msgLblView.add(msgLbl);
	modalView.add(msgLblView);
	
			var noBtn = Ti.UI.createButton({
		backgroundImage: 'images/latest/close_btn.pn8',
		width: 32,
		height:32,
		top: 32,
		right: 32
	});
	
	modalView.add(noBtn);

	noBtn.addEventListener('click', function(e) {
		self.fireEvent('finished', {text: ''});
		self.close();
	});
	
		var passwordInp = Titanium.UI.createTextField({
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '28sp',
			fontWeight : 'Bold'
		},
		top: 160,
		height : 50,
		width: msgWidth,
		hintText : hintText,
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
		zIndex : 20
	});
	passwordInp.addEventListener('return', function(e) { //FINDMEFINDME
		passwordInp.blur();	
				self.fireEvent('finished', {text: passwordInp.value});
		self.close();
	});
	
	modalView.add(passwordInp);
	
	var okBtn = Ti.UI.createButton({
		backgroundImage: 'images/latest/okBtn.pn8',
		width: 128,
		height:50,
		top: 198+30,
		opacity: 1
	});
	
	modalView.add(okBtn);
	
		 var text = 'OK';
  	
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
	
		var btnLbl = Ti.UI.createLabel({
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		attributedString: attr,
		color : 'black', 
		font : {
			fontFamily : imgs.txtLblsFontFamily,
			fontSize : '32sp',
			fontWeight : 'bold'
		},
		height: '100%'
	});
	
	okBtn.add(btnLbl);
	
	okBtn.addEventListener('click', function(e)  {
		self.fireEvent('finished', {text: passwordInp.value});
		self.close();
		
	});
	



	return self;
};

module.exports = miAlertDialog;