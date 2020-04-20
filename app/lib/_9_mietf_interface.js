function mietfInterface(_args) {
	try{
	var detailedLogging = true;

	if (detailedLogging)
		Ti.API.info('mi: '+mietf.ETFVersionId);
	//only large size version

	var self = Ti.UI.createView({
		left : 224,
		top : 112,
		width : 768,
		height : 544 + 80,
		opacity : 0,
		title : '',
		mietfSelectIndex : 0,
		portfolioId : 1,
		anchorPoint: {x:0.5, y:0.5}
	});
	self.updateSelf = function(_args) {
		self.title = _args.title;
		self.portfolioId = _args.portfolioId;
		self.showButtonBar();
		mietfGraph.setFullSize({
			ETFVersionId : mietf.ETFVersionId,
			title : self.title
		});
		mietfGraph.updateRestoreButton();
		mietfGraph.updateCanvasFullWithData();
	};

	//

	Ti.App.addEventListener('updateCanvasFullWithData', function(e) {
		mietfGraph.updateCanvasFullWithData(e);
	});
	
	self.updateTitle = function(_args) {
		self.title = _args.title;
	};

	var allowAnim = true;

	var flipView = Ti.UI.createView({
		left : 0,
		top : 0,
		width : 768,
		height : 544
	});

	self.add(flipView);

	self.updateTelemetryTitle = function(title) {
		telemetryView.updateTelemetryTitle(title);
	};

	var mietfScrollView = Ti.UI.createScrollView({
		left : 0,
		top : 0,
		width : 768,
		height : 544,
		contentWidth : '768',
		contentHeight : '1088',
		scrollingEnabled : true,
		disableBounce:true,
		zIndex : 2
	});
	
	mietfScrollView.addEventListener("scroll", function(e){
		if(e.dragging && e.y>50){
			mietfPie.removeDownArrow();
		}
	});

	var insideView = Ti.UI.createView({
		left : 0,
		top : 0,
		width : 768,
		height : 1088,
		opacity : 1
	});

	flipView.add(mietfScrollView);
	mietfScrollView.add(insideView);
	var holderImageView = Ti.UI.createImageView();
	mietfScrollView.add(holderImageView);
/*
	var TelemetryView = require('telemetryView'),
	    telemetryView = new TelemetryView({
		parent : self
	});
	flipView.add(telemetryView);
	*/
	var telemetryView = Alloy.createController('TelemetryView', {parent: self});
	flipView.add(telemetryView.getView());

	var MIETFGraph = require('_10_mietf_graph'),
	    mietfGraph = new MIETFGraph({
		index : _args.parent,
		parent : self,
		title : self.title,
		mietfID : _args.mietfID,
		ETFVersionId : mietf.ETFVersionId,
		portfolioId : _args.portfolioId
	});

	mietfGraph.setFullSize({
		title : self.title
	});

	var MIETFPie = require('_11_mietf_pie'),
	    mietfPie = new MIETFPie({
		parent : self,
		title : self.title,
		ETFVersionId : mietf.ETFVersionId,
		portfolioId : _args.portfolioId
	});

	mietfPie.setFullSize({
		title : self.title + ' MiETF',
		ETFVersionId : mietf.ETFVersionId
	});
	insideView.add(mietfPie);
	
	insideView.add(mietfGraph);

	self.title = _args.title;
	self.portfolioId = _args.portfolioId;
	mietfPie.setFullSize({
		portfolioId : self.portfolioId,
		ETFVersionId : mietf.ETFVersionId,
		title : self.title + ' MiETF'
	});
	mietfGraph.setFullSize({
		ETFVersionId : mietf.ETFVersionId,
		title : self.title
	});
	mietfScrollView.setContentOffset({
		x : 0,
		y : 544
	}, {
		animated : false
	});

	self.clear = function(_args) {
		if (detailedLogging)
			Ti.API.info('9mi: start clear');

		if (flipped) {
			if (detailedLogging)
				Ti.API.info('9mi: flipView animate');
			flipView.animate({
				view : mietfScrollView,
				transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});

			flipped = false;
		}

		self.title = _args.title;
		self.mietfSelectIndex = _args.mietfSelectIndex;
		self.portfolioId = _args.portfolioId;

		if (detailedLogging)
			Ti.API.info('9mi: hideButtonBar');
		self.hideButtonBar();

		if (detailedLogging)
			Ti.API.info('9mi: mietfPie setFullSize');

		mietfPie.setFullSize({
			portfolioId : self.portfolioId,
			ETFVersionId : mietf.ETFVersionId,
			title : self.title + ' MiETF'
		});
		//33

		var startDate = new Date();
		if (detailedLogging)
			Ti.API.info('9mi: mietfGraph.clear');
		mietfGraph.clear({
			ETFVersionId : mietf.ETFVersionId,
			title : self.title
		});
		//0

		if (animImgInPlace) {
			if (detailedLogging)
				Ti.API.info('9mi: about to remove animImg');
			self.remove(animImg);
		}

		if (detailedLogging)
			Ti.API.info('9mi: done clear');
	};

	var animImg = [];
	var animImgInPlace = false;
	var boundingView = [];

	self.snapshot = function() {

		if (mietf.pieMode != 'pieMode')
			mietfPie.makeRentrant();

		var returnObj = self.takeSnapshot();
		return returnObj;
	};

	self.takeSnapshot = function() {
		mietfPie.removeProgressIndicator(true);
		var Blob = insideView.toImage(null, false);
		//alert(time2-time1);
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, mietf.ETFVersionId + 'snap.pn8');
		file.write(Blob);

		updateIconImg(mietf.ETFVersionId, mietf.ETFVersionId + 'snap.pn8');

		return [{
			imagePath : mietf.ETFVersionId + 'snap.pn8',
			mietfSelectIndex : self.mietfSelectIndex,
			title : self.title
		}];
	};

	function asyncImage(e) {

	};

	self.snapshotAndCollapse = function(view, viewName) {
		var img = view.toImage(null, true);
		if (viewName == 'mietfPie') {

			animImg = Ti.UI.createImageView({
				left : 96,
				image : img,
				width : view.width,
				bottom : 80, //Math.abs(view.top - 277), //flip it
				height : view.height,
				zIndex : 70
			});

			self.add(animImg);
			animImgInPlace = true;

			mietf.titleControl.setTitleFaster({
				title : ' ',
				isVaults : false
			});
			var goLargeAnimation = Ti.UI.createAnimation({
				duration : 1000, //1000
				width : 1536,
				height : 1088,
				bottom : 80,
				left : 0
			});

		} else {

			boundingView = Ti.UI.createView({
				left : 0,
				top : 0,
				height : 544,
				width : 768
			});

			self.add(boundingView);

			animImg = Ti.UI.createImageView({
				left : 96,
				image : img,
				width : view.width,
				top : 0, //Math.abs(view.top - 277), //flip it
				height : view.height,
				zIndex : 70
			});

			boundingView.add(animImg);
			animImgInPlace = true;

			mietf.titleControl.setTitleFaster({
				title : ' ',
				isVaults : false
			});
			var goLargeAnimation = Ti.UI.createAnimation({
				duration : 1000, //1000
				width : 1536,
				height : 1088,
				top : 0,
				left : 0
			});
		}

		goLargeAnimation.addEventListener('complete', function(e) {
			if (detailedLogging)
				Ti.API.info('9mi: goLargeAnimation event listenr for complete');

			insideView.top = 0;
			insideView.height = 1088;
			mietfScrollView.left = 0;
			//mietfScrollView.contentHeight='2176';
			onSmallScreen = false;
			mietfScrollView.scrollingEnabled = true;

			if (viewName == 'mietfPie') {
				mietfPie.zIndex = 63;
				mietfGraph.zIndex = 62;

				mietfPie.setFullSize({
					portfolioId : self.portfolioId,
					ETFVersionId : mietf.ETFVersionId,
					title : self.title + ' MiETF'
				});
				mietfGraph.setFullSize({
					ETFVersionId : mietf.ETFVersionId,
					title : self.title
				});
				if (mietf.ETFVersionId != 0)
					self.showButtonBar();
				mietfScrollView.setContentOffset({
					x : 0,
					y : 544
				}, {
					animated : false
				});

				animImg.animate({
					opacity : 0,
					duration : 300
				}, function() {
					allowAnim = true;
					self.remove(animImg);
					animImgInPlace = false;
					mietfGraph.updateCanvasFull({
						ETFVersionId : mietf.ETFVersionId,
						title : self.title
					});
				});

			} else {
				mietfPie.zIndex = 62;
				mietfGraph.zIndex = 63;
				//here1

				mietfPie.setFullSize({
					portfolioId : self.portfolioId,
					ETFVersionId : mietf.ETFVersionId,
					title : self.title + ' MiETF'
				});
				mietfGraph.setFullSize({
					ETFVersionId : mietf.ETFVersionId,
					title : self.title
				});
				if (mietf.ETFVersionId != 0)
					self.showButtonBar();

				mietfScrollView.setContentOffset({
					x : 0,
					y : 0
				}, {
					animated : false
				});

				animImg.animate({
					opacity : 0,
					duration : 300
				}, function() {
					allowAnim = true;
					boundingView.remove(animImg);
					animImgInPlace = false;
					self.remove(boundingView);
					mietfGraph.updateCanvasFull({
						ETFVersionId : mietf.ETFVersionId,
						title : self.title
					});
					if(mietf.ETFVersionId!=0)
						mietfPie.showDownArrow();
				});
			}

			topViewOverlay.touchEnabled = false;
			bottomViewOverlay.touchEnabled = false;

		});

		animImg.animate(goLargeAnimation);

	};

	self.scrollToPie = function(_args) {

		mietfScrollView.setContentOffset({
			x : 0,
			y : 0
		}, {
			animated : false
		});
		if (mietf.ETFVersionId != 0){
			self.showButtonBar();
			mietfPie.showDownArrow();
		}
		mietfGraph.updateCanvasFullWithData({
			ETFVersionId : mietf.ETFVersionId,
			title : self.title
		});
       
	};

	var ButtonBarView = Ti.UI.createView({
		left : 8,
		bottom : -100,
		width : 752,
		height : 48,
		opacity : 1,

	});

	var button1 = Ti.UI.createView({
		//image: 'images/latest/bottomBtn.pn8',
		width : 80,
		height : 48,
		left : 0,
		opacity : 0
	});

	var glass1 = Ti.UI.createView({
		width : 80,
		height : 48,
		borderRadius : 10,
		backgroundColor : '#444548',
		opacity : .6,
		borderWidth : 2,
		borderColor : '#222222'
	});

	button1.add(glass1);

	var flipped = false;

	var button1ico = Ti.UI.createImageView({
		image : 'images/ifapps/telemetry_ico.pn8',
		height : 24,
		top : 4
	});

	button1.add(button1ico);

	var button1Lbl = Ti.UI.createLabel({
		bottom : 2,
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		text : 'Telemetry',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	button1.add(button1Lbl);

	var button2 = Ti.UI.createImageView({
		image : 'images/latest/bottomBtn.pn8',
		width : 80,
		height : 48,
		left : 96,
		opacity : 0
	});

	var button2ico = Ti.UI.createImageView({
		image : 'images/ifapps/replicate.pn8',
		height : 24,
		top : 4
	});

	button2.add(button2ico);

	var button2Lbl = Ti.UI.createLabel({
		bottom : 2,
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		text : 'Replicate',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	button2.add(button2Lbl);

	//compare_ico.pn8 - for graph
	//export_ico.pn8 - for export
	//mietfStore_ico.pn8 - for store, maybe
	//sellMietf_ico.pn8 - sell
	//snap_ico.pn8 for snapshot

	var button3 = Ti.UI.createImageView({
		image : 'images/latest/bottomBtn.pn8',
		width : 80,
		height : 48,
		left : 192,
		opacity : 0
	});

	var button3ico = Ti.UI.createImageView({
		image : 'images/latest/mietfNew_ico.pn8',
		height : 24,
		top : 4
	});

	button3.add(button3ico);

	var button3Lbl = Ti.UI.createLabel({
		bottom : 2,
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		text : 'New',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	button3.add(button3Lbl);

	var button4 = Ti.UI.createImageView({
		image : 'images/latest/bottomBtn.pn8',
		width : 80,
		height : 48,
		left : 288,
		opacity : 0
	});

	var button4ico = Ti.UI.createImageView({
		image : 'images/latest/mietfNew_ico.pn8',
		height : 24,
		top : 4
	});

	button4.add(button4ico);

	var button4Lbl = Ti.UI.createLabel({
		bottom : 2,
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		text : 'New',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	button4.add(button4Lbl);

	var button5 = Ti.UI.createImageView({
		image : 'images/latest/bottomBtn.pn8',
		width : 80,
		height : 48,
		left : 384,
		opacity : 0
	});

	var button5ico = Ti.UI.createImageView({
		image : 'images/ifapps/printer.pn8',
		height : 24,
		top : 4
	});

	button5.add(button5ico);

	var button5Lbl = Ti.UI.createLabel({
		bottom : 2,
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		text : '',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	button5.add(button5Lbl);

	var button6 = Ti.UI.createImageView({
		image : 'images/latest/bottomBtn.pn8',
		width : 80,
		height : 48,
		left : 480,
		opacity : 0
	});

	var button6ico = Ti.UI.createImageView({
		image : 'images/latest/snap_ico.pn8',
		height : 24,
		top : 4
	});

	button6.add(button6ico);

	var button6Lbl = Ti.UI.createLabel({
		bottom : 2,
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		text : '',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	button6.add(button6Lbl);

	var button7 = Ti.UI.createView({
		//image: 'images/latest/bottomBtn.pn8',
		width : 80,
		height : 48,
		left : 576
	});

	var glass7 = Ti.UI.createView({
		width : 80,
		height : 48,
		borderRadius : 10,
		backgroundColor : '#444548',
		opacity : .6,
		borderWidth : 2,
		borderColor : '#222222'
	});

	button7.add(glass7);

	var button7ico = Ti.UI.createImageView({
		image : 'images/ifapps/telemetry_ico.pn8',
		height : 24,
		top : 4
	});

	button7.add(button7ico);

	var button7Lbl = Ti.UI.createLabel({
		bottom : 2,
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		text : 'Telemetry',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	button7.add(button7Lbl);

	button7.addEventListener('click', function(e) {

		if (flipped) {
			/*
			 var animationFlipBack = Ti.UI.createAnimation({
			 view:mietfScrollView,
			 transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
			 });

			 animationFlipBack.addEventListener('complete', function(e) {
			 flipped = false;
			 telemetryView.opacity=0;
			 insideView.remove(mietfPie);
			 insideView.add(mietfPie);
			 });

			 flipView.animate(animationFlipBack);
			 */
			var animationFlipBack = Ti.UI.createAnimation({
				duration : 500,
				opacity : 0
			});

			telemetryView.getView().animate(animationFlipBack);

			animationFlipBack.addEventListener('complete', function(e) {
				flipped = false;
			});

		} else {
			/*
			 telemetryView.opacity = 1;

			 var animationFlip = Ti.UI.createAnimation({
			 view:telemetryView,
			 transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			 });
			 */

			var animationFlip = Ti.UI.createAnimation({
				duration : 500,
				opacity : 1
			});

			animationFlip.addEventListener('complete', function(e) {
				flipped = true;
			});

			telemetryView.getView().animate(animationFlip);

			/*  flipView.animate(animationFlip); */

		}

	});

	self.flipOver = function(e) {
		telemetryView.getView().animate({
			duration : 500,
			opacity : 0
		});
		flipped = false;
	};

	var button8 = Ti.UI.createView({
		//image: 'images/latest/bottomBtn.pn8',
		width : 80,
		height : 48,
		left : 672
	});

	var glass8 = Ti.UI.createView({
		width : 80,
		height : 48,
		borderRadius : 10,
		backgroundColor : '#444548',
		opacity : .6,
		borderWidth : 2,
		borderColor : '#222222'
	});

	button8.add(glass8);

	var button8ico = Ti.UI.createImageView({
		image : 'images/latest/export_ico.pn8',
		height : 24,
		top : 4
	});

	button8.add(button8ico);

	var button8Lbl = Ti.UI.createLabel({
		bottom : 2,
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '13sp',
			fontWeight : 'bold'
		},
		text : 'Export',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	button8.add(button8Lbl);

	button8.addEventListener('click', function(e) {
		// var blob = insideView.toImage();
		// holderImageView.image = blob;

		args = {
			portfolioId : self.portfolioId,
			ETFVersionId : mietf.ETFVersionId,
			title : self.title + ' MiETF',
			wrapper: insideView
		}
		var exportV = Alloy.createController('exportV', args);
		var win = exportV.getView();
		win.open({
			transition : Ti.UI.iOS.AnimationStyle.NONE
		});

		// var privateDocFolder = privateDocumentsDirectory();
		// var f = Ti.Filesystem.getFile(privateDocFolder, 'mietf.sql');
		// if (f.exists()) {
		// 	f.deleteFile();
		// }

		// Ti.Database.install('/database/mietf.db', 'mietf');

		// var something = cloneETFforExport(mietf.ETFVersionId);
		// var f = Ti.Filesystem.getFile(privateDocFolder, 'mietf.sql');
		// f.rename('import.mietf');

		// var renamedFile = Titanium.Filesystem.getFile(privateDocFolder, 'import.mietf');

		// exportV.setImage(blob);

		// var emailDialog = Ti.UI.createEmailDialog();
		// emailDialog.subject = "MiETF Export Attached";
		// emailDialog.toRecipients = ['arieljie0413@gmail.com'];
		// emailDialog.messageBody = 'Here is ' + self.title + '! Open with MiETF app.';
		// emailDialog.addAttachment(renamedFile);
		// emailDialog.open();

	});
	
	if(mietf.viewMode==false){
		ButtonBarView.add(button1);
		ButtonBarView.add(button2);
		ButtonBarView.add(button3);
		ButtonBarView.add(button4);
		ButtonBarView.add(button5);
		ButtonBarView.add(button6);
		ButtonBarView.add(button7);
		ButtonBarView.add(button8);
	}

	self.add(ButtonBarView);

	self.showButtonBar = function(e) {

		var showButtonBarAnim = Ti.UI.createAnimation({
			duration : 500,
			bottom : 0
		});
		ButtonBarView.animate(showButtonBarAnim);

	};

	self.hideButtonBar = function(e) {

		var hideButtonBarAnim = Ti.UI.createAnimation({
			duration : 500,
			bottom : -100
		});
		ButtonBarView.animate(hideButtonBarAnim);

	};

	self.hideButtonBar();

	Ti.App.addEventListener('mietfInterfaceOpacity0', function(e) {
		animation.fadeOut(self, 500);
		//self.opacity = 0;
	});

	self.mietfPieUpdate = function(e) {

		mietfPie.setFullSize({
			portfolioId : self.portfolioId,
			ETFVersionId : mietf.ETFVersionId,
			title : self.title + ' MiETF'
		});
		mietfScrollView.setContentOffset({
			x : 0,
			y : 544
		}, {
			animated : false
		});
	};

	self.mietfGraphUpdate = function(e) {
		mietfGraph.updateRestoreButton();
		mietfGraph.updateCanvasFullWithData();
	};

    self.removeMietfView = function(e){
	    Ti.API.info('removeMietfView ' + e.pieMode);
	    self.remove(insideView);
		currentWindow.remove(self);
	    mietf.viewMode = false;
	    mietf.pieMode =  e.pieMode;
	    mietf.ETFVersionId = mietf.prevETFVersionId;
	    mietf.canvas = mietf.prevCanvas;
		mietf.editInterface.mietfGraphUpdate();
	    mietf.viewInterface = null;
	    mietfGraph = null;
	    self = null;
	    Ti.API.info('removeMietfView end');
	};

}catch(e){alert(e);}
	return self;
};

module.exports = mietfInterface;
