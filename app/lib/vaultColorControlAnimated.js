function vaultColorControl(_args) {
	var self = Ti.UI.createView({ 
		height: 304,
		width: 501, //496+5
		top:  224, //171+28,
		left: 91, //96-5
		opacity: 0,
		backgroundColor: 'transparent'
		});
		
	var parent = _args.parent;
		
	var vaultLocationDictionary = {} ;             
		vaultLocationDictionary[0] = {left: 192+5, top: 0};
		vaultLocationDictionary[1] = {left: 296+5, top: 0};
		vaultLocationDictionary[2] = {left: 400+5, top: 0};
		vaultLocationDictionary[3] = {left: 192+5, top: 104};
		vaultLocationDictionary[4] = {left: 296+5, top: 104};
		vaultLocationDictionary[5] = {left: 400+5, top: 104};
		vaultLocationDictionary[6] = {left: 192+5, top: 208};
		vaultLocationDictionary[7] = {left: 296+5, top: 208};
		vaultLocationDictionary[8] = {left: 400+5, top: 208};
			
	var VaultColorButton  = require('vaultColorButton');
	var selectedColor = 8;
	
	var VaultButtonEditCreateNewForm  = require('vaultButtonEditCreateNewForm'),
		vaultButton	 = new VaultButtonEditCreateNewForm({vaultColorNum: selectedColor});
		vaultButton.opacity= 0;
	
	self.add(vaultButton);
	
	
	
	var buttons = [];
	

	//add all 10 buttons to buttons array
		for (i=0; i < 10; i++) {
		buttons[i] = new VaultColorButton({left: 0, top: 0, vaultColorNum: i +1});
		buttons[i].i = i;
		buttons[i].addEventListener('click', handleColorClick);
		}
		
	 var colorButtonDict = getColorGrid(selectedColor);
	 
		for (i=0; i < 9; i++) {
			buttons[colorButtonDict[i]].top= vaultLocationDictionary[i].top;
			buttons[colorButtonDict[i]].left = vaultLocationDictionary[i].left;
			buttons[colorButtonDict[i]].opacity = 0;
			self.add(buttons[colorButtonDict[i]]);
		}

		buttons[selectedColor].top= 72;
		buttons[selectedColor].left = 5;
		buttons[selectedColor].height= 160;
		buttons[selectedColor].width = 160;
		buttons[selectedColor].zIndex = 0;	
		buttons[selectedColor].opacity = 0;
		self.add(buttons[selectedColor]);
		
		
	self.hideAll = function(e) {
				for (i=0; i < 9; i++) {
			buttons[colorButtonDict[i]].opacity = 0;
		}
	};
		
	self.showSelected = function(e) {
		animation.popIn(vaultButton);
		animation.popIn(buttons[selectedColor], afterShowSelectedPause);
	};
	
	function afterShowSelectedPause(e) {
		setTimeout(function(e) {
			self.popALotta();
		}, 300);
	}

	self.popALotta = function(e) {
		animation.popIn(buttons[colorButtonDict[0]]);
		
		var delay = 150;
		
		setTimeout(function(e) {
			animation.popIn(buttons[colorButtonDict[1]]);
		}, delay);
		setTimeout(function(e) {
			animation.popIn(buttons[colorButtonDict[1]]);
		}, delay*2);
		setTimeout(function(e) {
			animation.popIn(buttons[colorButtonDict[2]]);
		}, delay*3);
		setTimeout(function(e) {
			animation.popIn(buttons[colorButtonDict[3]]);
		}, delay*4);
		setTimeout(function(e) {
			animation.popIn(buttons[colorButtonDict[4]]);
		}, delay*5);
		setTimeout(function(e) {
			animation.popIn(buttons[colorButtonDict[5]]);
		}, delay*6);
		setTimeout(function(e) {
			animation.popIn(buttons[colorButtonDict[6]]);
		}, delay*7);
		setTimeout(function(e) {
			animation.popIn(buttons[colorButtonDict[7]]);
		}, delay*8);
		setTimeout(function(e) {
			animation.popIn(buttons[colorButtonDict[8]], afterPopALotta);
		}, delay*9);
		
		
	};
	
	function afterPopALotta(e) {
				setTimeout(function(e) {
			parent.fadeInNext();
		}, 500);
		

	};

	self.startupVaultEdit = function(selectedColor) {
		colorButtonDict = getColorGrid(selectedColor);
		
		for (i=0; i < 9; i++) {
			buttons[colorButtonDict[i]].top= vaultLocationDictionary[i].top;
			buttons[colorButtonDict[i]].left = vaultLocationDictionary[i].left;
			buttons[colorButtonDict[i]].height = 96;
			buttons[colorButtonDict[i]].width = 96;
		}

		buttons[selectedColor].top= 72;
		buttons[selectedColor].left = 5;
		buttons[selectedColor].height= 160;
		buttons[selectedColor].width = 160;
		buttons[selectedColor].zIndex = 0;			
	};



		           
		vaultIdDictionary[0] = 1;

	function getColorGrid(selectedColor) {
		
		var colorButtonDict = {};
		var x = 0;
		for (i=0; i <= 9; i++) {
			if (i != selectedColor) {
				colorButtonDict[x] = i;
				x++;
			}
		}	
		return colorButtonDict;
	};
	
	function handleColorClick(e) {
		goToLeft.i = e.source.i;
		e.source.animate(goToLeft);
	};
	
	var goToLeft = Titanium.UI.createAnimation();
		goToLeft.top = 72;
		goToLeft.left = 5;
		goToLeft.height = 160;
		goToLeft.width = 160;
		goToLeft.duration = 500;
		goToLeft.delay = 100;
		goToLeft.i = 0;
		
	goToLeft.addEventListener('complete', goToLeftComplete);
	
	function goToLeftComplete(e) {
		buttons[goToLeft.i].zIndex = 2;
		var newColorButtonDict = getColorGrid(goToLeft.i);
		
		for (i=0; i < 9; i++) {
			goToPositions[i].top = vaultLocationDictionary[i].top;
			goToPositions[i].left = vaultLocationDictionary[i].left;
			buttons[newColorButtonDict[i]].zIndex = 1;
			buttons[newColorButtonDict[i]].animate(goToPositions[i]);
		}

		setTimeout( function(e) {
			 setZIndex(goToLeft.i);
		}, 500);
		
		selectedColor=goToLeft.i;
		parent.fireEvent('newColor', {selectedColor: selectedColor});
	};
	
	function setZIndex(onThisVault) {
		buttons[onThisVault].zIndex = 0;
	}

	var goToPositions = [];
	for (i=0; i < 9; i++) {
		    goToPositions[i] = Titanium.UI.createAnimation();
			goToPositions[i].top = 0;
			goToPositions[i].left = 206;
			goToPositions[i].height = 96;
			goToPositions[i].width = 96;
			goToPositions[i].duration = 500;
	}



	return self;
};

module.exports = vaultColorControl;