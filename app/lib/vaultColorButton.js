function colorButton(_args) {	
	var vaultColorDictionary =  mietf.vaultColorDictionary;

	var self = Ti.UI.createView({ 
		height: 96,
		width: 96,
		top: _args.top,
		left: _args.left,
		backgroundImage: 'images/latest/' + vaultColorDictionary[_args.vaultColorNum-1].vaultIconImg,
		zIndex: 1
	});
		
	return self;
};

module.exports = colorButton;