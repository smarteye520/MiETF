function miAlertYesNo(_args) {
	
	var text = _args.text;
	var opaque = _args.opaque;
	var parent = _args.parent;
		var smallText = _args.smallText;
	
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
	
	if (smallText) {
		var msgLblView = Ti.UI.createView({
			top: 32,
			width: 288,
			height: 150
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
	
	var yesBtn = Ti.UI.createButton({
		backgroundImage: 'images/latest/yes_btn.pn8',
		width: 64,
		height:64,
		top: 196,
		left: 150
	});
	
	modalView.add(yesBtn);
	
	yesBtn.addEventListener('click', function(e)  {
		
		self.fireEvent('finished', {text: 'Yes'});
		self.close();
		
	});
	
	
	var noBtn = Ti.UI.createButton({
		backgroundImage: 'images/latest/no_btn.pn8',
		width: 64,
		height:64,
		top: 196,
		right: 150
	});
	
	modalView.add(noBtn);
	
	noBtn.addEventListener('click', function(e)  {
		
		self.fireEvent('finished', {text: 'No'});
		self.close();
		
	});
	
	var closeBtn = Ti.UI.createButton({
		backgroundImage: 'images/latest/close_btn.pn8',
		width: 32,
		height:32,
		top: 32,
		right: 32
	});
	
	modalView.add(closeBtn);

	closeBtn.addEventListener('click', function(e) {
		self.fireEvent('finished', {text: 'No'});
		self.close();
	});
	
	return self;
};

module.exports = miAlertYesNo;