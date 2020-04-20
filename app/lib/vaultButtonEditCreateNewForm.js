function vaultButtonForm(_args) {
	var self = Ti.UI.createView({ 
		height: 160,
		width: 160,
	 	backgroundColor: 'transparent',
	 	left: 5,
	 	top: 72,
	 	zIndex: 100
		});
		

	
	var vaultDoor = Ti.UI.createImageView({ 
	 	       top: 0,
	 	       touchEnabled: false,
	 	       image: 'images/latest/vaultDoor_sm160.pn8',
	 	       height: 160,
	 	       width: 160
	  
	 });
	 
	 self.add(vaultDoor);
	 
	 	var vaultHandle = Ti.UI.createImageView({ 
	 	       top: 0,
	 	       touchEnabled: false,
	 	       image:  'images/latest/vaultHandle_sm160.pn8',
	 	       height: 160,
	 	       width: 160
	  
	 });
	 
	 self.add(vaultHandle);
	
	

	return self;
};

module.exports = vaultButtonForm;