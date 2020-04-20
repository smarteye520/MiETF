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
		isSampleVault : _args.isSampleVault,
		lockPasscode : _args.lockPasscode,
		vaultNum : _args.vaultNum,
		vaultDisplayOrder : _args.vaultDisplayOrder,
		vaultScreen : _args.vaultScreen,
		touchEnabled : false
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
		opacity : _args.opacity,
		isLocked : _args.isLocked,
		isSampleVault : _args.isSampleVault,
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
		opacity : _args.opacity,
		isLocked : _args.isLocked,
		isSampleVault : _args.isSampleVault,
		lockPasscode : _args.lockPasscode,
		vaultNum : _args.vaultNum,
		vaultDisplayOrder : _args.vaultDisplayOrder,
		vaultScreen : _args.vaultScreen,
		width : imgs.smallSize,
		height : imgs.smallSize
	});

	vaultIconV.add(vaultIcon);
	self.add(vaultIconV);

	var x2 = Ti.UI.createImageView({
		image : 'images/ifapps/Andy_Trash_Can.pn8',
		top : 0,
		left : 0,
		opacity : 0,
		height : 40,
		width : 40,
		zIndex : 300
	});

	self.add(x2);

	x2.addEventListener('click', function(e) {
		_args.parent.trashcanClick(_args.i);

	});

	self.x2On = function(e) {

		//_args.vaultId
		var vault = new Vault();
		vault.getVaultById(_args.vaultId);
		if (vault.isDeletable == 'YES')
			x2.opacity = 1;

	};

	self.x2Off = function(e) {
		x2.opacity = 0;

	};


	var x3 = Ti.UI.createImageView({
		id:'settings_'+_args.vaultName,
		image : 'images/ifapps/gear.pn8',
		bottom : 30,
		left : 0,
		opacity : 0,
		height : 40,
		width : 40,
		zIndex : 300
	});

	self.add(x3);

	/*x3.addEventListener('click', function(e) {
		_args.parent.trashcanClick(_args.i);

	});*/

	self.x3On = function(e) {
		x3.opacity = 1;

	};

	self.x3Off = function(e) {
		x3.opacity = 0;

	};
	
	self.updateVaultColor = function(colorItem) {
		self.vaultColor = colorItem.vaultColor;
		vaultIconV.vaultColor = colorItem.vaultColor;
		vaultIcon.vaultColor = colorItem.vaultColor;
		self.vaultImg = colorItem.vaultImg;
		vaultIconV.vaultImg = colorItem.vaultImg;
		vaultIcon.vaultImg = colorItem.vaultImg;
		self.vaultNum = colorItem.colorId;
		vaultIconV.vaultNum = colorItem.colorId;
		vaultIcon.vaultNum = colorItem.colorId;
		vaultIcon.image = colorItem.vaultIconImg;

	};

	self.returnI = function(e) {
		return self.id;
	};

	self.newDisplayOrder = function(e) {

		var displayOrder = e.displayOrder;

		self.vaultDisplayOrder = displayOrder;
		vaultIconV.vaultDisplayOrder = displayOrder;
		vaultIcon.vaultDisplayOrder = displayOrder;

		var attr = Ti.UI.createAttributedString({
			text : " ", // + displayOrder + ", id: " + self.id,
			attributes : [{
				type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
				value : Ti.UI.iOS.ATTRIBUTE_LETTERPRESS_STYLE,
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
		vaultIconV.height = 190;
		vaultIcon.height = 190;
		vaultDoor.height = 190;
		vaultHandle.height = 190;
	};

	self.zoomOut = function(e) {

		vaultIconV.width = imgs.smallSize;
		vaultIcon.width = imgs.smallSize;
		vaultDoor.width = imgs.smallSize;
		vaultHandle.width = imgs.smallSize;
		vaultIconV.height = imgs.smallSize;
		vaultIcon.height = imgs.smallSize;
		vaultDoor.height = imgs.smallSize;
		vaultHandle.height = imgs.smallSize;
	};

	var vaultDoor = Ti.UI.createImageView({
		top : 0,
		touchEnabled : false,
		image : imgs.vaultDoorSm,
		width : imgs.smallSize,
		height : imgs.smallSize

	});

	vaultIconV.add(vaultDoor);

	var vaultHandle = Ti.UI.createImageView({
		top : 0,
		touchEnabled : false,
		image : imgs.vaultHandleSm,
		width : imgs.smallSize,
		height : imgs.smallSize

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
			value : Ti.UI.iOS.ATTRIBUTE_LETTERPRESS_STYLE,
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
				value : Ti.UI.iOS.ATTRIBUTE_LETTERPRESS_STYLE,
				range : [0, text.length]
			}]
		});

		securedLbl.attributedString = attr;

	};

	self.add(securedLbl);

	var attr = Ti.UI.createAttributedString({
		text : " ", // +_args.vaultDisplayOrder+" " + ", id: " + _args.id,
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.iOS.ATTRIBUTE_LETTERPRESS_STYLE,
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
		text : _args.vaultName,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	self.add(vaultBtnLbl);

	self.updateVaultName = function(vaultName) {
		vaultBtnLbl.text = vaultName;
	};

	self.updateSampleVault = function(isSampleVault) {
		self.isSampleVault = isSampleVault;
		vaultIconV.isSampleVault = isSampleVault;
		vaultIcon.isSampleVault = isSampleVault;
	};

	self.wobble = function(e) {
		vaultIconV.transform = Ti.UI.create2DMatrix().rotate(2);
		vaultIconV.animate(wobbleAnim);
		mietf.currentWobbleVault = self.id;
		mietf.isWobbling = true;
		self.x2On();
		self.x3On();
	};

	self.stopWobble = function(e) {
		//self.animate(wobbleStop);
		vaultIconV.animate(wobbleAnim2);
		vaultIconV.transform = Ti.UI.create2DMatrix().rotate(0);
		mietf.isWobbling = false;
		self.x2Off();
		self.x3Off();
	};

	var wobbleAnim = Ti.UI.createAnimation({
		duration : 100,
		repeat : 40000,
		transform : Ti.UI.create2DMatrix().rotate(-2),
		curve : Titanium.UI.ANIMATION_CURVE_LINEAR,
		autoreverse : true
	});

	var wobbleAnim2 = Ti.UI.createAnimation({
		duration : 1,
		transform : Ti.UI.create2DMatrix().rotate(0),
		curve : Titanium.UI.ANIMATION_CURVE_LINEAR
	});

	var wobbleStop = Ti.UI.createAnimation({
		duration : 100,
		repeat : 1,
		transform : Ti.UI.create2DMatrix().rotate(-3),
		curve : Titanium.UI.ANIMATION_CURVE_LINEAR,
		autoreverse : true
	});

	wobbleStop.addEventListener('complete', setSelfStraight);

	function setSelfStraight(e) {
		vaultIconV.transform = Ti.UI.create2DMatrix().rotate(0);
	};

	return self;
};

module.exports = vaultButtonWithText; 