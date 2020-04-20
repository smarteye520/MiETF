function vaultButtonWithText(_args) {
	var self = Ti.UI.createView({
		height : 224,
		width : 208,
		id : _args.id,
		vaultColor : _args.backgroundColor,
		vaultName : _args.text,
		vaultId : _args.vaultId,
		image : _args.vaultIconImg,
		vaultImg : _args.vaultImg,
		isLocked : _args.isLocked,
		lockPasscode : _args.lockPasscode,
		vaultNum : _args.vaultNum,
		vaultDisplayOrder : _args.vaultDisplayOrder,
		vaultScreen : _args.vaultScreen,
		top : 278,
		left : 619
	});

	var superLongpress = 0;

	//a.vaultId, a.vaultName, a.vaultColor, a.vaultIconImg, a.vaultImg

	var vaultIconV = Ti.UI.createView({
		id : _args.id,
		vaultColor : _args.backgroundColor,
		vaultName : _args.text,
		vaultId : _args.vaultId,
		image : _args.vaultIconImg,
		vaultImg : _args.vaultImg,
		top : 10,
		opacity : 1,
		isLocked : _args.isLocked,
		lockPasscode : _args.lockPasscode,
		vaultNum : _args.vaultNum,
		vaultDisplayOrder : _args.vaultDisplayOrder,
		vaultScreen : _args.vaultScreen,
		width : imgs.smallSize,
		height : imgs.smallSize
	});

	var vaultIcon = Ti.UI.createImageView({
		id : _args.id,
		vaultColor : _args.backgroundColor,
		vaultName : _args.text,
		vaultId : _args.vaultId,
		image : _args.vaultIconImg,
		vaultImg : _args.vaultImg,
		top : 0,
		opacity : 1,
		isLocked : _args.isLocked,
		lockPasscode : _args.lockPasscode,
		vaultNum : _args.vaultNum,
		vaultDisplayOrder : _args.vaultDisplayOrder,
		vaultScreen : _args.vaultScreen,
		width : imgs.smallSize,
		height : imgs.smallSize
	});

	vaultIconV.add(vaultIcon);
	self.add(vaultIconV);

	self.newDisplayOrder = function(e) {

		var displayOrder = e.displayOrder;

		self.vaultDisplayOrder = displayOrder;
		vaultIconV.vaultDisplayOrder = displayOrder;
		vaultIcon.vaultDisplayOrder = displayOrder;

		var attr = Ti.UI.createAttributedString({
			text : " ", // + displayOrder + " ",
			attributes : [{
				type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
				value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
				range : [0, text.length]
			}]
		});

		securedLbl.attributedString = attr;

	};

	self.zoom = function(e) {

		vaultIconV.width = 190;
		vaultIcon.width = 190;
		vaultDoor.width = 190;
		vaultHandle.width = 190;
	};

	self.zoomOut = function(e) {

		vaultIconV.width = imgs.smallSize;
		vaultIcon.width = imgs.smallSize;
		vaultDoor.width = imgs.smallSize;
		vaultHandle.width = imgs.smallSize;
	};

	var vaultDoor = Ti.UI.createImageView({
		top : 0,
		touchEnabled : false,
		image : imgs.vaultDoorSm

	});

	vaultIconV.add(vaultDoor);

	var vaultHandle = Ti.UI.createImageView({
		top : 0,
		touchEnabled : false,
		image : imgs.vaultHandleSm

	});

	vaultIconV.add(vaultHandle);

	var text = "";

	if (_args.isLocked == 'YES' && _args.lockPasscode != 'SET')
		text = "";
	//"SECURED"

	var attr = Ti.UI.createAttributedString({
		text : text,
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, text.length]
		}]
	});

	var securedLbl = Ti.UI.createLabel({
		bottom : 65,
		height : Ti.UI.SIZE,
		attributedString : attr,
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '10sp',
			fontWeight : 'bold'
		}
	});

	self.updateButton = function(e) {

		self.lockPasscode = e.lockPasscode;
		vaultIconV.lockPasscode = e.lockPasscode;
		vaultIcon.lockPasscode = e.lockPasscode;

		var text = "";

		if (_args.isLocked == 'YES' && e.lockPasscode != 'SET')
			text = "";
		//"SECURED"

		var attr = Ti.UI.createAttributedString({
			text : text,
			attributes : [{
				type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
				value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
				range : [0, text.length]
			}]
		});

		securedLbl.attributedString = attr;

	};

	self.add(securedLbl);

	var attr = Ti.UI.createAttributedString({
		text : " ", // +_args.vaultDisplayOrder+" ",
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, text.length]
		}]
	});

	securedLbl.attributedString = attr;

	var vaultBtnLbl = Ti.UI.createLabel({
		bottom : 0,
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '18sp',
			fontWeight : 'bold'
		},
		text : 'Create New',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	self.add(vaultBtnLbl);

	return self;
};

module.exports = vaultButtonWithText; 