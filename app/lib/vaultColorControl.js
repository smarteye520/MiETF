function vaultColorControl(_args) {
	var self = Ti.UI.createView({ 
		height: 304,
		width: 501,
		top:  224, //171+28,
		left: 91,
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
	
	var VaultButton  = require('vaultButtonEditCreateNewForm'),
		vaultButton	 = new VaultButton({vaultColorNum: selectedColor});
	
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
			self.add(buttons[colorButtonDict[i]]);
		}

		buttons[selectedColor].top= 62;
		buttons[selectedColor].left = 5;
		buttons[selectedColor].height= imgs.smallSize;
		buttons[selectedColor].width = imgs.smallSize;
		buttons[selectedColor].zIndex = 0;	
		self.add(buttons[selectedColor]);


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