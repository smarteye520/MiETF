function miAlert(_args) {
	
	var text = _args.text;
	
	var opaque = _args.opaque;
	var smallText = _args.smallText;
	var parent = _args.parent;
	
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
	if (opaque) 
		bi = 'images/latest/popup_bg.pn8';
	
	var modalView = Ti.UI.createView({ 
		top: 80,
		height: 288,
		width: 448,
	 	backgroundImage: bi,
	 	shake: 0
	});
		
	self.add(modalView);
	
	if (smallText) {
		var msgLblView = Ti.UI.createView({
			top: 32,
			width: 290,
			height: 112
		});
	
		var msgLbl = Ti.UI.createLabel({//VAULT OPTIONS:
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
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
	} else {
		var msgLbl = Ti.UI.createLabel({//VAULT OPTIONS:
			top : 70,
			width: 250,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			text : text,
			color : 'white', //'#57585d',
			font : {
				fontFamily : imgs.txtLblsFontFamily,
				fontSize : '32sp',
				fontWeight : 'bold'
			}
		});
	
		modalView.add(msgLbl);
	}
	
	var okBtn = Ti.UI.createButton({
		backgroundImage: 'images/latest/okBtn.pn8',
		width: 128,
		height:50,
		top: 198,
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
		//textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		attributedString: attr,
		color : 'black', 
		font : {
			fontFamily : imgs.txtLblsFontFamily,
			fontSize : '32sp',
			fontWeight : 'bold'
		},
		height: Ti.UI.SIZE
	});
	
	okBtn.add(btnLbl);
	
	okBtn.addEventListener('click', function(e)  {
		self.close();
	});

	return self;
};

module.exports = miAlert;