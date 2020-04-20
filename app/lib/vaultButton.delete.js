function vaultButton(_args) {
	var self = Ti.UI.createView({ 
		height: imgs.smallSize,
		width: imgs.smallSize,
	 	backgroundColor: 'transparent',
	 	left: 5,
	 	top: 62,
	 	zIndex: 100
		});
		
	
	var vaultDoor = Ti.UI.createImageView({ 
	 	       top: 0,
	 	       touchEnabled: false,
	 	       image: imgs.vaultDoorSm
	  
	 });
	 
	 self.add(vaultDoor);
	 
	 	var vaultHandle = Ti.UI.createImageView({ 
	 	       top: 0,
	 	       touchEnabled: false,
	 	       image: imgs.vaultHandleSm
	  
	 });
	 
	 self.add(vaultHandle);
	
	

	return self;
};

module.exports = vaultButton;