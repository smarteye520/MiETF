function popupPasscode(_args) {
	var self = Ti.UI.createView({ 
		height: '100%',
		width: '100%',
	 	backgroundColor: 'transparent',
	 	zIndex: 100
		});
	var parent = _args.parent;
	var lockPasscode = _args.vault.lockPasscode;
	var vault = _args.vault;
		
	var greyBackground = Ti.UI.createView({ 
		height: '100%',
		width: '100%',
	 	backgroundColor: 'black',
	 	opacity: .8
		});
		
		self.add(greyBackground);
	
	var modalView = Ti.UI.createView({ 
			top: 80,
		height: 288, //576
		width: 448, //896
	 	backgroundImage: 'images/latest/popup_bg.pn8',
	 	shake: 0
		});
		
	self.add(modalView);
	
	var pleaseEnterLbl = Ti.UI.createLabel({//VAULT OPTIONS:
		top : 56,
		width: 250,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
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
		width: 250,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text : 'Vault Passcode',
		color : 'white', //'#57585d',
		font : {
			fontFamily : imgs.txtLblsFontFamily,
			fontSize : '32sp',
			fontWeight : 'bold'
		}
	});
	
	modalView.add(pleaseEnterLbl2);
	
	
	var passcodeInp = Titanium.UI.createTextField({
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '21sp',
			fontWeight : 'Bold'
		},
		top: 192,
		height : 48,
		width: 224,
		hintText : 'Passcode',
		backgroundImage : 'images/ifapps/textEntry.pn8',
		borderRadius : 0,
		borderWidth : 0,
		borderColor : 'transparent',
		paddingLeft : 80, //105
		paddingRight : 15,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		value : '',
		passwordMask : false,
		zIndex : 20,
		keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
	});
	passcodeInp.addEventListener('return', function(e) { //FINDMEFINDME
		passcodeInp.blur();	
		     var valLen = e.source.value.length;
      if (valLen ==4) {
      	yesBtn.fireEvent('click', {});
      }
	});
	
	passcodeInp.addEventListener('change', function(e){
    e.source.value = e.source.value.slice(0,4);
         var valLen = e.source.value.length;
      if (valLen ==4) {
      	yesBtn.fireEvent('click', {});
      }
	});
	
	modalView.add(passcodeInp);
	
	self.popKeyboard = function(e) {
		passcodeInp.focus();
	};
	
	
		var keyImg = Ti.UI.createImageView({
		image: resDir + 'images/latest/key.pn8',
		width: 37,
		height:32,
		left: 12
	});
	
	passcodeInp.add(keyImg);
	
		var yesBtn = Ti.UI.createButton({
		backgroundImage: 'images/latest/yes_btn.pn8',
		width: 67,
		height:66,
		top: 198,
		left: 150, opacity: 0
	});
	
	modalView.add(yesBtn);
	
		yesBtn.addEventListener('click', function(e)  {
		
			//VaultsBtnEnabled = false;
		var lockPasscode =  'P' +passcodeInp.value;
		var checkPass = checkPasscode({vaultId:vault.vaultId, lockPasscode:lockPasscode});
		
		if (checkPass != lockPasscode)  {
			
			modalView.shake++;
			passcodeInp.value = '';
			
			if (modalView.shake < 3) animation.shake(modalView, 500);
			
						if (modalView.shake > 2) {
				self.opacity = 0;
				var title =  'Please enter your master password: ';
				var hint = Ti.App.Properties.getString('passwordHint');
				var withHint = true;
				
				if (modalView.shake ==3 ) {
					hint = '';
					withHint = false;
				}
				
				modalView.shake =0;
				
				var MiAlertDialog  = require('miAlertDialog'),
									miAlertDialog = new MiAlertDialog({parent: self, text: title, opaque: true, hintText: 'Password', type: 'popupPasscode', passwordHint: hint, withPasswordHint: withHint});
				    	
				miAlertDialog.addEventListener('finished', function(e){
				    Ti.API.info('e.text: ' + e.text);
				     miAlertDialog.newClose();
				    if (checkMasterPassword(e.text)) {
				    	passcodeInp.value = checkPass.substr(1, 4);
				    	passcodeInp.focus();
				    } else {
				    	incorrectMasterPassword({checkPass:checkPass});
				    }
				});
				
				
				miAlertDialog.open({
				    			animate: true
				    		});
				    		miAlertDialog.popKeyboard();
				
			}
			
		} else {
		parent.removePasscode();
		parent.deleteVault(_args.vault);
		//good do something with parent
		}
		
	});
	
		function incorrectMasterPassword(_args) {
			self.opacity = 0;
		var checkPass = _args.checkPass;
		var title = 'Please enter your master password: '; //this is now a weird flag
		var hint = Ti.App.Properties.getString('passwordHint');
		
						var MiAlertDialog  = require('miAlertDialog'),
									miAlertDialog2 = new MiAlertDialog({parent: self, fontSize: '18sp', text: title, opaque: true, hintText: 'Password', type: 'popupPasscode', passwordHint: hint, withPasswordHint: true});
				    	
				miAlertDialog2.addEventListener('finished', function(e){
				    				    Ti.API.info('e.text: ' + e.text);
				  
				    if (checkMasterPassword(e.text)) {
						passcodeInp.value = checkPass.substr(1, 4);
				    	miAlertDialog2.newClose();
				    	passcodeInp.focus();
				    } else {
				    	
				    		//shake shake
				    		miAlertDialog2.shakeModal();
				    	
				    }
				});
				
				
				miAlertDialog2.open({
				    			animate: true
				    		});
				    		
			miAlertDialog2.popKeyboard();
		
	};
	
	
		var noBtn = Ti.UI.createButton({
		backgroundImage: 'images/latest/close_btn.pn8',
		width: 32,
		height:32,
		top: 32,
		right: 32
	});
	
	modalView.add(noBtn);

	noBtn.addEventListener('click', function(e) {
		parent.removePasscode();
	});
	
	self.turnOnOpacity = function(e) {
	self.opacity = 1;
};

	return self;
};

module.exports = popupPasscode;