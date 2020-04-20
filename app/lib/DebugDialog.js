function DebugDialog(_args){


	var self = Ti.UI.createWindow({
	});
	
	var cancel = Titanium.UI.createButton({
	    color: '#DEDDDC',
	    borderWidth: '0',
	    height: 35,
	    font:{fontSize: '18sp'},
	    width: 60,
	    backgroundImage: 'none',
	    title:''
	});
	
	var done = Titanium.UI.createButton({
	    color: '#DEDDDC',
	    borderWidth: '0',
	    height: 35,
	    font:{fontSize: '18sp'},
	    width: 60,
	    backgroundImage: 'none',
	    title:'Done'
	});
	
	var title = Ti.UI.createLabel({
		text: 'Debug - Options',
		color: 'black',
		font:{fontSize: '22sp', fontWeight: 'bold'}
	});
	
	var flexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var navBar =  Titanium.UI.iOS.createToolbar({ barColor: '#4A6D80', 
	items:[cancel, flexSpace, title, flexSpace, done],
	top:0,
	zIndex: 1
	 });
	 
	 self.add(navBar);
	 
	 	var sv = Ti.UI.createScrollView({
		touchEnabled : true,
		contentWidth : 'auto',
		contentHeight : 'auto',
		top : 0,
		left : 0,
		height: 560,
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true
	});

	self.add(sv);


	var contentView = Ti.UI.createView({
		left: 0,
		width: 540,
		top : 0,
		backgroundColor: 'white',
		height : Ti.UI.SIZE,
		layout: 'vertical'
	});
	
	sv.add(contentView);
	 
	var section1Lbl = Ti.UI.createLabel({
		left: 5,
		top: 70,
		width: 400,
		 font:{fontSize: '18sp'},
		text: 'comboLockAllowKeyboardInput - only set to true if you have a physical keyboard attached to your iPad.',
		color: 'black',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
	});
	
	contentView.add(section1Lbl);
	

	 
	var allowKeyboardSwitch = Titanium.UI.createSwitch({
	    value:Ti.App.Properties.getBool('comboLockAllowKeyboardInput'),
	    left: 5,
	    top: 10,
	    zIndex: 4
	});
	
	allowKeyboardSwitch.addEventListener('change',function(e)
	{  
		if (allowKeyboardSwitch.value) {
			Ti.App.Properties.setBool('comboLockAllowKeyboardInput', true);
		} else {
			Ti.App.Properties.setBool('comboLockAllowKeyboardInput', false);
		}
	    
	});
		
	contentView.add(allowKeyboardSwitch);	
	
		var section1Lb2 = Ti.UI.createLabel({//spacer
		left: 5,
		top: 50,
		width: 400,
		 font:{fontSize: '18sp'},
		text: '',
		color: 'black',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
	});
	
	contentView.add(section1Lb2);
		///END
		

	

	

	

	
	done.addEventListener('click', function(e){
		self.close();
		
		
	    setTimeout(function () {
		       if (Ti.App.Properties.getBool('comboLockAllowKeyboardInput'))
					{ 
						if (currentViewName == 'combinationLock')	currentVisibleView.fireEvent('debugShowKeyboard', {});
					} else {
						if (currentViewName == 'combinationLock')	currentVisibleView.fireEvent('debugHideKeyboard', {});
					}
		 }, 750);
		

		

	});
	cancel.addEventListener('click', function(e){
		textField.blur();
		self.close();
	});
	
	
	
	return self;
}

module.exports = DebugDialog;