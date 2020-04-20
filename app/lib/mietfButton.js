function mietfButton(_args) {

	var width = _args.width;
	var height = _args.height;
	var left = _args.left;
	var top = _args.top;
	var zIndex = _args.zIndex;
	var image = _args.image;
	var opacity = _args.opacity;
	var isAddNew = _args.isAddNew;
	var isCover = _args.isCover;
	var mietfID = _args.mietfID;
	var parent = _args.parent;
	var arrayIndex = _args.arrayIndex;

	if ( typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function(str) {
			return this.substring(0, str.length) === str;
		};
	};

	Ti.API.info('mietfButton image ' + image);

	if (!image) {
		image = 'images/ifapps/pharmaSample.pn8';
	} else if (!image.startsWith("images")) {
		image = Titanium.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + image;
	}

	Ti.API.info('mietfButton final image ' + image);

	if (isAddNew) {

		var self = Ti.UI.createView({
			backgroundImage : 'images/ifapps/iconShadow.pn8',
			width : 145,
			height : 190,
			left : left - 9,
			top : top - 5,
			zIndex : zIndex,
			opacity : opacity,
			touchEnabled : true
		});

		var imgSelf = Ti.UI.createView({
			backgroundImage : 'images/ifapps/paperBack.pn8',
			width : width,
			height : height,
			top : 5,
			left : 9
		});

		self.add(imgSelf);

		var buttonLbl = Ti.UI.createLabel({
			color : '#5A5A5C',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '11sp',
				fontWeight : 'bold'
			},
			text : "Add New MiETF",
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			width : 80,
			top : 40

		});

		imgSelf.add(buttonLbl);

	} else {

		if (isCover) {

			var self = Ti.UI.createView({
				backgroundImage : 'images/ifapps/iconShadow.pn8',
				width : 145,
				height : 190,
				left : left - 9,
				top : top - 5,
				zIndex : zIndex,
				opacity : opacity
			});

			var imgSelf = Ti.UI.createView({
				backgroundImage : 'images/ifapps/paperBack.pn8',
				width : width,
				height : height,
				top : 5,
				left : 9
			});

			self.add(imgSelf);

			var buttonLbl = Ti.UI.createLabel({
				color : '#5A5A5C',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '11sp',
					fontWeight : 'bold'
				},
				text : _args.coverText,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				width : 120,
				top : 4,
				height : 120
			});

			imgSelf.add(buttonLbl);

		} else {

			var self = Ti.UI.createView({
				backgroundColor : 'transparent',
				width : 145,
				height : 210,
				left : left - 9,
				top : top - 5,
				zIndex : zIndex,
				opacity : opacity,
				titleOn : 1
			});

			var shadowImg = Ti.UI.createImageView({
				image : 'images/ifapps/iconShadow.pn8',
				top : 0,
				left : 0
			});

			self.add(shadowImg);

			var imgSelf = Ti.UI.createView({
				width : width,
				height : height,
				top : 5,
				left : 9
			});

			self.add(imgSelf);

			///Quick test of image factory

			var ImageFactory = require('ti.imagefactory');

			var imageV = Ti.UI.createImageView({

				image : image,

				width : width,

				height : height,

				left : 0,

				top : 0

			});
			/*
			 if (file.exists()) {
			 var blob = file.read();
			 var type = 0;
			 var newBlob = ImageFactory.imageAsResized(blob, { width:width, height:height, quality:ImageFactory.QUALITY_HIGH, hires:true });
			 imageV.image=newBlob;
			 }
			 */

			self.setImage = function(imagePath, title) {
				var ip = imagePath;
				buttonLbl.text = title;

				try {
					var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, imagePath);
					imagePath = file.nativePath;
				} catch (e) {

				}

				if (file) {
					if (!file.exists()) {
						imagePath = ip;
						//imagePath = 'images/ifapps/pharmaSample.pn8';
					}
				} else {
					imagePath = ip;
					//imagePath = 'images/ifapps/pharmaSample.pn8';
				}

				//imageV.image = imagePath;

				if (file.exists()) {
					var blob = file.read();
					var type = 0;
					var newBlob = ImageFactory.imageAsResized(blob, {
						width : width,
						height : height,
						quality : ImageFactory.QUALITY_HIGH,
						hires : true
					});
					imageV.image = newBlob;
				}

			};

			imgSelf.add(imageV);

			var label = Ti.UI.createLabel({
				color : '#5A5A5C',
				backgroundColor : '#EAE9E5',
				borderRadius : 3,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '13sp',
					fontWeight : 'bold'
				},
				text : ' ' + _args.label + ' ',
				textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
				width : Ti.UI.SIZE,
				right : 10,
				bottom : 30,
				opacity : 0 //make 0
			});

			self.add(label);

			Ti.App.addEventListener('hello1', function(e) {
				animation.fadeIn(label, 500);
			});

			var buttonLbl = Ti.UI.createLabel({
				color : 'white',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '11sp',
					fontWeight : 'bold'
				},
				text : _args.mietfName,
				textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
				width : '92%',
				bottom : 5,
				opacity : 0 //make 0
			});

			self.add(buttonLbl);

		}

	}

	self.fadeInText = function(e) {
		animation.fadeIn(buttonLbl, 400);
	};

	self.fadeOutText = function(e) {
		animation.fadeOut(buttonLbl, 400);
	};

	self.fadeOut = function(e) {

		self.animate({
			duration : 300,
			opacity : 0,
			delay : 400
		});

	};

	self.fadeIn = function(e) {
		buttonLbl.opacity = 1;
		self.titleOn = 1;
		animation.fadeIn(self, 400);

	};

	self.snapshotImg = function(e) {
		return imgSelf.toImage(null, true);
	};

	self.showTitle = function(e) {
		buttonLbl.opacity = 1;
		self.titleOn = 1;
	};

	self.hideTitle = function(e) {
		if (isAddNew || isCover) {

		} else {
			buttonLbl.opacity = 0;
			self.titleOn = 0;
		}
	};

	self.isTitleOn = function(e) {
		if (isAddNew || isCover) {
			return 0;
		} else {
			return self.titleOn;
		}

	};

	self.getImage = function(e) {

		return self.toImage(null, true);

	};

	if (mietfID > 1 || mietfID < 10000000) {

		self.addEventListener('click', function(e) {
			if (self.clickTime && (new Date().getTime() - self.clickTime) < 3000) {
				return;
			}
			self.clickTime = new Date().getTime();
			Ti.API.info('mietfButton click ' + _args.mietfID);
			parent.gotoMietfSelection({
				arrayIndex : _args.arrayIndex,
				mietfID : _args.mietfID,
				mietfName : _args.mietfName,
				vaultNum : _args.vaultNum,
				vaultName : _args.vaultName
			});

		});

	}

	var x2 = Ti.UI.createImageView({
		image : 'images/ifapps/Andy_Trash_Can.pn8',
		top : -5,
		left : -5,
		opacity : 0,
		height : 40,
		width : 40,
		zIndex : 300
	});

	self.add(x2);

	self.startWobble = function(e) {
		x2.opacity = 1;
	};

	self.stopWobble = function(e) {
		x2.opacity = 0;
	};

	return self;

};

module.exports = mietfButton;
