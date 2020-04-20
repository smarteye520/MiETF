function vaultButtonControl(_args) {

	var self = Ti.UI.createView({
		top : 112, //105
		left : 32, //31
		width : 160, //152
		height : 160, //152
		//backgroundImage: 'images/latest/leftBtn.pn8',
		opacity : 0,
		title : 'Vaults'
	});

	var glass = Ti.UI.createView({
		width : 160,
		height : 160,
		borderRadius : 25,
		backgroundColor : '#444548',
		opacity : .6,
		borderWidth : 2,
		borderColor : '#222222'
	});

	self.add(glass);

	var vaultsLbl = Ti.UI.createLabel({
		bottom : 9,
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '21sp',
			fontWeight : 'bold'
		},
		text : 'Vaults',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	self.add(vaultsLbl);

	self.addEventListener('click', function(e) {

		if (mietf.isAnimating == false) {
			Ti.App.fireEvent('VaultButtonClick', {});
		}
	});

	self.fadeOut = function(e) {
		self.animate(fadeOutAnim);
	};

	self.fadeOutVaultWord = function(e) {
		vaultsLbl.animate(fadeOutVaultWordAnim);
	};

	self.fadeInVaultWord = function(e) {
		vaultsLbl.animate(fadeInVaultWordAnim);
	};

	var fadeOutVaultWordAnim = Ti.UI.createAnimation({
		duration : setting.fadeOutVaultWordDuration,
		delay : setting.fadeOutVaultWordDelay,
		opacity : 0
	});

	var fadeInVaultWordAnim = Ti.UI.createAnimation({
		duration : setting.fadeInVaultWordDuration,
		opacity : 1
	});

	var fadeOutAnim = Ti.UI.createAnimation({
		duration : 1000,
		opacity : 0
	});

	return self;
};

module.exports = vaultButtonControl; 