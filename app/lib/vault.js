function Vault() {
	this.init = true;
	this.vaultId = 0;
	this.vaultName = 'Samples';
	this.vaultColor = '#3c89b6';
	this.vaultIconImg = 'images/latest/vault_ghost_sm.pn8';
	this.vaultImg = 'images/latest/vault_ghost_lg.pn8';
	this.isLocked = 'NO';
	this.lockPasscode = 'SET';
	this.vaultNum = '1';
	this.vaultDisplayOrder = 0;
	this.opacity = 1.0;
	this.vaultScreen = 0;
	this.unlockTime = 1406065700451;
	this.isSampleVault = 'NO';
	this.vaultScreen = 0;
	this.button = [];
	this.parent = [];
	this.id = 0;
	this.isWobbling = false;
	this.k = 0;
	//k is position within screen
	this.spaceToOccupy = 0;
	this.isTitleEditable = 'YES';
	this.canSetPasscode = 'YES';
	this.requiresPasscode = 'NO';
	this.isMoveable = 'YES';
	this.isDeletable = 'YES';
	this.canAddNew = 'YES';
	this.isDraggable = false;
	this.wasLongpressed = false;
	this.wasDoubletapped = false;
	this.didMove = false;
	this.didAnyMove = false;
	this.saveTop = 0;
	this.saveLeft = 0;
	this.createDate = '2007-01-01 10:00:00';

	for (var n in arguments[0]) {
		this[n] = arguments[0][n];
	}

	if (this.vaultId != 0) {
		var x = this.getVaultById(this.vaultId);
		this.createButton(this.parent, this.id);
	}
};

Object.defineProperty(Vault.prototype, 'isSampleVault', {
	get : function() {
		return this._isSampleVault;
	},
	set : function(inIsSampleVault) {
		this._isSampleVault = inIsSampleVault;
	}
});

Object.defineProperty(Vault.prototype, 'lockPasscode', {
	get : function() {
		return this._lockPasscode;
	},
	set : function(inPasscode) {
		if (this.init != true && this._lockPasscode != inPasscode) {
			var db = Ti.Database.open('cloud');
			db.execute('BEGIN TRANSACTION');
			db.execute('UPDATE vault set lockPasscode = ? where vaultId = ?', inPasscode, this.vaultId);
			db.execute('COMMIT TRANSACTION');
			db.close();
		}
		this._lockPasscode = inPasscode;
	}
});

Object.defineProperty(Vault.prototype, 'vaultScreen', {
	get : function() {
		return this._vaultScreen;
	},
	set : function(inScreen) {
		if (this.init != true && this._vaultScreen != inScreen) {
			var db = Ti.Database.open('cloud');
			db.execute('BEGIN TRANSACTION');
			db.execute('UPDATE vault set vaultScreen = ? where vaultId = ?', inScreen, this.vaultId);
			db.execute('COMMIT TRANSACTION');
			db.close();
		}
		this._vaultScreen = inScreen;
	}
});

Object.defineProperty(Vault.prototype, 'vaultDisplayOrder', {
	get : function() {
		return this._vaultDisplayOrder;
	},
	set : function(inDisplayOrder) {
		if (this.init != true && this._vaultDisplayOrder != inDisplayOrder) {
			var db = Ti.Database.open('cloud');
			db.execute('BEGIN TRANSACTION');
			db.execute('UPDATE vault set vaultDisplayOrder = ? where vaultId = ?', inDisplayOrder, this.vaultId);
			db.execute('COMMIT TRANSACTION');
			db.close();
		}
		this._vaultDisplayOrder = inDisplayOrder;
	}
});

function getVaultColor() {
	var db = Ti.Database.open('cloud');
	var vaultRS = db.execute('SELECT vaultColor from vault where vaultId = ?', this.vaultId);
	while (vaultRS.isValidRow()) {
		var vaultColor = vaultRS.fieldByName('vaultColor');
		vaultRS.next();
	}
	vaultRS.close();
	db.close();

	return vaultColor;
};

Vault.prototype.getVaultColor = getVaultColor;

function saveVaultColor(colorItem) {
	var db = Ti.Database.open('cloud');
	var vaultRS = db.execute('UPDATE vault SET vaultColor=?, vaultIconImg=?, vaultImg=?, vaultNum=? where vaultId = ?', colorItem.vaultColor, colorItem.vaultIconImg, colorItem.vaultImg, colorItem.colorId.toString(), this.vaultId);
	db.close();

	this.vaultColor = colorItem.vaultColor;
	this.vaultIconImg = colorItem.vaultIconImg;
	this.vaultImg = colorItem.vaultImg;
	this.vaultNum = colorItem.colorId.toString();

	this.button.updateVaultColor(colorItem);
	return;
};
Vault.prototype.saveVaultColor = saveVaultColor;

function getRequirePassword() {
	var passwordRequired = false;
	var db = Ti.Database.open('cloud');
	var vaultRS = db.execute('SELECT isSampleVault from vault where vaultId = ?', this.vaultId);
	while (vaultRS.isValidRow()) {
		var isSampleVault = vaultRS.fieldByName('isSampleVault');
		vaultRS.next();
	}
	vaultRS.close();
	db.close();

	if (isSampleVault == 'NO')
		passwordRequired = true;

	return passwordRequired;
};
Vault.prototype.getRequirePassword = getRequirePassword;

function setRequirePassword(inTrueFalse) {
	var inIsSampleVault = 'NO';
	if (!inTrueFalse)
		inIsSampleVault = 'YES';

	var db = Ti.Database.open('cloud');
	db.execute('UPDATE vault set isSampleVault = ? WHERE vaultId = ?', inIsSampleVault, this.vaultId);
	db.close();

	this.isSampleVault = inIsSampleVault;
	try {
		this.button.updateSampleVault(inIsSampleVault);
	} catch (e) {//doesn't have button
	}
	return;
};

Vault.prototype.setRequirePassword = setRequirePassword;

function setVaultScreen(inVaultScreen) {
	var db = Ti.Database.open('cloud');
	db.execute('BEGIN TRANSACTION');
	db.execute('UPDATE vault set vaultScreen = ? WHERE vaultId = ?', inVaultScreen, this.vaultId);
	db.execute('COMMIT TRANSACTION');
	db.close();

	this.vaultScreen = inVaultScreen;
	return;
};

Vault.prototype.setVaultScreen = setVaultScreen;

function setVaultName(inVaultName) {
	var db = Ti.Database.open('cloud');
	db.execute('BEGIN TRANSACTION');
	db.execute('UPDATE vault set vaultName = ? WHERE vaultId = ?', inVaultName, this.vaultId);
	db.execute('COMMIT TRANSACTION');
	db.close();

	this.vaultName = toTitleCase(inVaultName);
	this.button.updateVaultName(toTitleCase(inVaultName));

	return;
};
Vault.prototype.setVaultName = setVaultName;

function shouldOpenComboLock() {

	//bug, will not use (this.isSampleVault, so go to database first)

	var db = Ti.Database.open('cloud');
	var vaultRS = db.execute('SELECT isSampleVault,lockPasscode, isLocked, unlockTime from vault where vaultId = ?', this.vaultId);
	while (vaultRS.isValidRow()) {
		var isSampleVault = vaultRS.fieldByName('isSampleVault');
		var lockPasscode = vaultRS.fieldByName('lockPasscode');
		var isLocked = vaultRS.fieldByName('isLocked');
		var unlockTime = vaultRS.fieldByName('unlockTime');
		vaultRS.next();
	}
	vaultRS.close();
	db.close();

	var now = new Date().getTime();

	if (isSampleVault == 'YES')
		return 'NO';

	var relockTime = Ti.App.Properties.getInt('relockTime');

	if ((now - unlockTime) > relockTime) {
		db.execute('BEGIN TRANSACTION');
		db.execute('UPDATE vault set isLocked = ?, unlockTime = ? WHERE vaultId = ?', 'YES', now, this.vaultId);
		db.execute('COMMIT TRANSACTION');
		db.close();
		this.isLocked = 'YES';

		return 'YES';
	}

	if (isLocked == 'YES')
		return 'YES';
	if (isLocked == 'NO') {
		if (lockPasscode == 'SET')
			return 'YES';
		if (lockPasscode != 'SET')
			return 'NO';
	}

	return 'YES';
};

Vault.prototype.shouldOpenComboLock = shouldOpenComboLock;

function unlock() {
	var d = new Date();
	var unlockTime = d.getTime();

	var db = Ti.Database.open('cloud');
	db.execute('BEGIN TRANSACTION');
	db.execute('UPDATE vault set isLocked = ?, unlockTime = ? WHERE vaultId = ?', 'NO', unlockTime, this.vaultId);
	db.execute('COMMIT TRANSACTION');
	db.close();

	this.isLocked = 'NO';

	return;
};

Vault.prototype.unlock = unlock;

function lock() {

	var d = new Date();
	var unlockTime = d.getTime();

	var db = Ti.Database.open('cloud');
	db.execute('BEGIN TRANSACTION');
	db.execute('UPDATE vault set isLocked = ?, unlockTime = ? WHERE vaultId = ?', 'YES', unlockTime, this.vaultId);
	db.execute('COMMIT TRANSACTION');
	db.close();

	this.isLocked = 'YES';

	return;
};

Vault.prototype.lock = lock;

function create(vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, vaultScreen) {
	this.vaultName = vaultName;
	this.vaultColor = vaultColor;
	this.vaultIconImg = vaultIconImg;
	this.vaultImg = vaultImg;
	this.isLocked = isLocked;
	this.lockPasscode = lockPasscode;
	this.vaultNum = vaultNum;
	this.vaultDisplayOrder = vaultDisplayOrder;
	this.unlockTime = 1406065700451;
	this.isSampleVault = 'NO';
	this.vaultScreen = vaultScreen;

	var db = Ti.Database.open('cloud');
	db.execute('INSERT INTO vault (vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date(\'now\'))', vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, this.unlockTime, this.isSampleVault, vaultScreen, this.isTitleEditable, this.canSetPasscode, this.requiresPasscode, this.isMoveable, this.isDeletable, this.canAddNew);
	db.close();

	this.vaultId = db.lastInsertRowId;
	this.init = false;
	return this;
};

Vault.prototype.create = create;

function getVaultById(vaultId) {

	var db = Ti.Database.open('cloud');
	var vaultRS = db.execute('SELECT vaultId, vaultName, vaultColor, vaultIconImg, vaultImg, isLocked, lockPasscode, vaultNum, vaultDisplayOrder, unlockTime, isSampleVault, vaultScreen, isTitleEditable, canSetPasscode, requiresPasscode, isMoveable, isDeletable, canAddNew, createDate from vault where vaultId = ?', vaultId);
	while (vaultRS.isValidRow()) {
		this.vaultId = vaultRS.fieldByName('vaultId');
		this.vaultName = toTitleCase(vaultRS.fieldByName('vaultName'));
		this.vaultColor = vaultRS.fieldByName('vaultColor');
		this.vaultIconImg = vaultRS.fieldByName('vaultIconImg');
		this.vaultImg = vaultRS.fieldByName('vaultImg');
		this.isLocked = vaultRS.fieldByName('isLocked');
		this.lockPasscode = vaultRS.fieldByName('lockPasscode');
		this.vaultNum = vaultRS.fieldByName('vaultNum').toString();
		this.vaultDisplayOrder = vaultRS.fieldByName('vaultDisplayOrder');
		this.unlockTime = vaultRS.fieldByName('unlockTime');
		this.isSampleVault = vaultRS.fieldByName('isSampleVault');
		this.vaultScreen = vaultRS.fieldByName('vaultScreen');
		this.init = false;
		this.isTitleEditable = vaultRS.fieldByName('isTitleEditable');
		this.canSetPasscode = vaultRS.fieldByName('canSetPasscode');
		this.requiresPasscode = vaultRS.fieldByName('requiresPasscode');
		this.isMoveable = vaultRS.fieldByName('isMoveable');
		this.isDeletable = vaultRS.fieldByName('isDeletable');
		this.canAddNew = vaultRS.fieldByName('canAddNew');
		this.createDate = vaultRS.fieldByName('createDate');
		vaultRS.next();
	}
	vaultRS.close();
	db.close();

	return this;
};

Vault.prototype.getVaultById = getVaultById;

function createButton(self, i) {
	this.parent = self;
	this.id = i;

	var VaultButton = require('vaultButtonWithText'),
	    vaultButton = new VaultButton(this);

	this.button = vaultButton;
	return;
};

Vault.prototype.createButton = createButton;

function createNewButton() {///THIS IS CREATE NEW

	var VaultButtonCreateNew = require('vaultButtonCreateNew'),
	    vaultButtonCreateNew = new VaultButtonCreateNew(this);

	this.button = vaultButtonCreateNew;
	return;
};

Vault.prototype.createNewButton = createNewButton;

function getButtonI() {
	return this.button.returnI();
};

Vault.prototype.getButtonI = getButtonI;

function getAnimWheel(e) {

	var vaultNum = this.vaultNum.toString();
	var isLocked = this.isLocked;
	var vaultScreen = this.vaultScreen;
	var point = {
		x : this.button.rect.x,
		y : this.button.rect.y
	};

	var parentPosition = this.button.convertPointToView(point, vaultViews[vaultScreen]);

	var returnView = Ti.UI.createView({
		top : 230.5 + ((parentPosition.y - 147) / 2),
		left : (parentPosition.x / 2) + 16, //had + 16 adjustment
		//top: 157 + parentPosition.y,
		//left: parentPosition.x/2,
		returnTop : 230.5 + ((parentPosition.y - 147) / 2),
		returnLeft : (parentPosition.x / 2) + 16, //had +16 adjustment
		height : imgs.smallSize,
		width : imgs.smallSize,
		backgroundImage : 'images/latest/vault_' + vaultNum + '_lg.pn8',
		zIndex : 2,
		returnsize : 'small'
	});

	var foregroundImage = Ti.UI.createView({
		backgroundImage : this.vaultIconImg
	});

	returnView.add(foregroundImage);

	var vaultDoor = Ti.UI.createView({
		backgroundImage : imgs.vaultDoor
	});

	returnView.add(vaultDoor);

	var vaultWheelImage = Ti.UI.createImageView({
		image : imgs.vaultHandleLg,
		repeatCount : 0,
		duration : 100,
		height : imgs.smallSize,
		width : imgs.smallSize,
		anchorPoint : {
			x : .5,
			y : .5
		},
		zIndex : 2
	});

	var vaultWheelImageLarge = Ti.UI.createImageView({
		image : imgs.vaultHandleLg,
		height : imgs.largeSize,
		width : imgs.largeSize,
		left : '0%',
		right : '0%',
		top : '0%',
		bottom : '0%',
		anchorPoint : {
			x : .5,
			y : .5
		},
		zIndex : 2
	});

	returnView.add(vaultWheelImage);

	vaultWheelImage.start();

	returnView.setLarge = function(e) {

		if (returnView.returnsize == 'large') {
			vaultWheelImage.opacity = 1;
			foregroundImage.opacity = 1;
			vaultDoor.opacity = 1;
			returnView.opacity = 0;
			//returnView.width = imgs.largeSize;
			//returnView.height = imgs.largeSize;
			//returnView.top = 112;
			//returnView.left = 224;
			//returnView.remove(vaultWheelImage);
			var matrix2d = Ti.UI.create2DMatrix();
			vaultWheelImage.transform = matrix2d.rotate(-180);
			//returnView.add(vaultWheelImageLarge);
		} else {
			vaultWheelImage.opacity = 1;
			foregroundImage.opacity = 1;
			vaultDoor.opacity = 1;
			returnView.opacity = 0;
			//returnView.width = setting.comboLock.width;
			//returnView.height = setting.comboLock.height;
			//returnView.top = setting.comboLock.top;
			//returnView.left = setting.comboLock.left;
			//returnView.remove(vaultWheelImage);
			var matrix2d = Ti.UI.create2DMatrix();
			vaultWheelImage.transform = matrix2d.rotate(-180);
			//vaultWheelImageLarge.width=setting.comboLock.width;
			//vaultWheelImageLarge.height=setting.comboLock.height;;
			//returnView.add(vaultWheelImageLarge);

		}

	};

	returnView.goSmall = function(e) {
		var matrix2d = Ti.UI.create2DMatrix();
		matrix2d = matrix2d.rotate(0);

		var vaultWheelAnimSmall = Titanium.UI.createAnimation();
		vaultWheelAnimSmall.duration = mietf.animvaultWheelAnimSmall;
		vaultWheelAnimSmall.transform = matrix2d;
		vaultWheelAnimSmall.delay = 0;

		/*
		 var buttonAnimSmall = Titanium.UI.createAnimation();
		 buttonAnimSmall.width = imgs.smallSize;
		 buttonAnimSmall.height = imgs.smallSize;
		 buttonAnimSmall.top = returnView.returnTop;
		 buttonAnimSmall.left = returnView.returnLeft;
		 buttonAnimSmall.duration = mietf.animvaultWheelAnimSmall;
		 buttonAnimSmall.delay = 0;
		 */

		var buttonAnimSmall = Titanium.UI.createAnimation();
		var tr_end = Titanium.UI.create2DMatrix();
		tr_end = tr_end.translate(0, 0);
		tr_end = tr_end.scale(1);
		//(.3055);

		buttonAnimSmall.transform = tr_end;
		buttonAnimSmall.duration = mietf.animvaultWheelAnimSmall;
		buttonAnimSmall.delay = 0;

		returnView.animate(buttonAnimSmall);

		vaultWheelImage.animate(vaultWheelAnimSmall);
	};

	returnView.goPortfolio = function(e) {//THIS MIGHT BE THE LOCATION
		returnView.returnsize = 'large';
		var matrix2d = Ti.UI.create2DMatrix();
		matrix2d = matrix2d.rotate(-180);

		var vaultWheelAnimLarge = Titanium.UI.createAnimation();
		vaultWheelAnimLarge.duration = mietf.animOpenVaultsTime;
		vaultWheelAnimLarge.transform = matrix2d;
		vaultWheelAnimLarge.opacity = .0;

		var y = 136 - (returnView.top - 176);
		var x = 208 - (returnView.left - 216);

		var buttonAnimLarge = Titanium.UI.createAnimation();
		var tr_end = Titanium.UI.create2DMatrix();
		tr_end = tr_end.translate(x, y);
		tr_end = tr_end.scale(3.2727);

		buttonAnimLarge.transform = tr_end;
		buttonAnimLarge.duration = mietf.animOpenVaultsTime;

		var fadeOut = Titanium.UI.createAnimation();
		fadeOut.opacity = .0;
		fadeOut.duration = mietf.animOpenVaultsTime;

		buttonAnimLarge.addEventListener('complete', finalAnimHandlerToPortfolio);

		function finalAnimHandlerToPortfolio(e) {
			Ti.App.fireEvent('finalToPortfolioAnimHandler', {});
		};

		returnView.animate(buttonAnimLarge);
		foregroundImage.animate(fadeOut);
		vaultDoor.animate(fadeOut);
		//vaultWheelImage.start();
		vaultWheelImage.animate(vaultWheelAnimLarge);

	};

	returnView.goComboLock = function(e) {
		returnView.returnsize = 'medium';
		returnView.backgroundImage = mietf.getUnlockControlImage(vaultNum);
		//'images/ifapps/combo' + vaultNum + '.pn8';

		var matrix2d = Ti.UI.create2DMatrix();
		matrix2d = matrix2d.rotate(-180);

		var vaultWheelAnimLarge = Titanium.UI.createAnimation();
		vaultWheelAnimLarge.duration = mietf.animOpenVaultsTime;
		vaultWheelAnimLarge.transform = matrix2d;
		vaultWheelAnimLarge.opacity = .0;

		var y = 136 - (returnView.top - 176);
		var x = 208 - (returnView.left - 216);

		var buttonAnimLarge = Titanium.UI.createAnimation();
		var tr_end = Titanium.UI.create2DMatrix();
		tr_end = tr_end.translate(x, y);
		tr_end = tr_end.scale(3.2727);

		buttonAnimLarge.transform = tr_end;
		buttonAnimLarge.duration = mietf.animOpenVaultsTime;

		var fadeOut = Titanium.UI.createAnimation();
		fadeOut.opacity = .0;
		fadeOut.duration = mietf.animOpenVaultsTime;

		buttonAnimLarge.addEventListener('complete', finalAnimHandler);

		function finalAnimHandler(e) {
			Ti.App.fireEvent('finalToComboLockAnimHandler', {});
		};

		returnView.animate(buttonAnimLarge);
		foregroundImage.animate(fadeOut);
		vaultDoor.animate(fadeOut);
		vaultWheelImage.animate(vaultWheelAnimLarge);

	};

	return returnView;

};

Vault.prototype.getAnimWheel = getAnimWheel;

module.exports = Vault; 