function mietfPie(_args) {

	Ti.API.info('mietfPie _args ' + JSON.stringify(_args));
	try {
		var afterSlideRightPause = 200;
		var afterPieShrinkPause = 200;

		var slideLabelRightPause = 200;
		var slideLabelLeftPause = 200;
		var fadeInfoViewPause = 200;
		var fadeSearchViewPause = 200;
		var shrinkPiePause = 200;
		var goLeftPause = 200;
		var fadeInfoViewPause = 200;
		var resetButtonsFlag = false;
		var importExisting = false;

		Ti.App.addEventListener('resetButtons', function(e) {
			/*if(typeof mietfInfo!=='undefined' && mietfInfo!=null){
			self.remove(mietfInfo);
			}

			if(typeof mietfSearch!=='undefined' && mietfSearch!=null){
			self.remove(mietfSearch);
			}*/
			//self.resetButtons(1);
			deleteOverlay = Ti.UI.createView({
				width : 768,
				height : 544,
				opacity : 1,
				backgroundImage : self.toImage(),
				left : 0,
				top : 0
			});

			var ProgressIndicator = require('graphOverlay');
			progressIndicator = new ProgressIndicator();
			_args.parent.add(deleteOverlay);
			_args.parent.add(progressIndicator);
			animation.fadeIn(progressIndicator, 500);

			resetButtonsFlag = true;
			newPieImageViewClick();
		});

		var fireParent = false;
		var selectedButton = -1;
		var collapseButton = -1;
		var mietfInfo = [];
		//var mietfSearch = [];

		var colors = mietf.colors;

		function nextSearchToInfo(e) {

			var goRight = Titanium.UI.createAnimation();
			goRight.left = 32;
			goRight.duration = 400;

			goRight.addEventListener('complete', nextSearchToInfoStep2);
			if (selectedButton >= 0) {
				buttonV[selectedButton].animate(goRight);
			}

		}

		function nextSearchToInfoStep2(e) {

			var fadeOutAnim = Ti.UI.createAnimation({
				duration : 500,
				opacity : 0,
				delay : slideLabelRightPause
			});
			fadeOutAnim.addEventListener('complete', nextSearchToInfoStep3);

			mietfSearch.animate(fadeOutAnim);

		}

		function nextSearchToInfoStep3(e) {
			Ti.API.info('In nextSearchToInfoStep3');

			self.remove(mietfSearch);

			mietf.pieMode = 'infoMode';

			var MietfInfo = require('componentInfoPie');
			mietfInfo = new MietfInfo({
				parent : self,
				toAddNew : false
			});

			self.button = buttons[selectedButton];
			self.buttonLabel = buttonLabels[selectedButton];

			self.add(mietfInfo);
			setTimeout(function(e) {
				mietfInfo.popIn(colors[selectedButton], 0, buttonLabels[selectedButton].buttonText, buttonLabels[selectedButton].facetTickerSymbol, (buttonLabels[selectedButton].facetTickerSymbol == 'MiETF'), buttonLabels[selectedButton].ETFVersionId);

				pieImageView.removeEventListener('click', pieImageViewClick);
				//newPieImageViewClick);
				pieImageView.addEventListener('click', newPieImageViewClick);

			}, fadeSearchViewPause);

		}

		function searchToInfo(e) {

			var fadeOutAnim = Ti.UI.createAnimation({
				duration : 500,
				opacity : 0
			});
			fadeOutAnim.addEventListener('complete', searchToInfoStep2);

			mietfSearch.animate(fadeOutAnim);

		}

		function searchToInfoStep2(e) {
			self.remove(mietfSearch);

			var goRight = Titanium.UI.createAnimation();
			goRight.left = 32;
			goRight.duration = 400;

			goRight.addEventListener('complete', searchToInfoStep3);
			if (selectedButton >= 0) {
				buttonV[selectedButton].animate(goRight);
			}

		}

		function searchToInfoStep3(e) {

			Ti.API.info('In searchToInfoStep3');

			mietf.pieMode = 'infoMode';

			var MietfInfo = require('componentInfoPie');
			mietfInfo = new MietfInfo({
				parent : self,
				toAddNew : false
			});

			self.button = buttons[selectedButton];
			self.buttonLabel = buttonLabels[selectedButton];

			self.add(mietfInfo);
			mietfInfo.popIn(colors[selectedButton], 0, buttonLabels[selectedButton].buttonText, buttonLabels[selectedButton].facetTickerSymbol, (buttonLabels[selectedButton].facetTickerSymbol == 'MiETF'), buttonLabels[selectedButton].ETFVersionId);

			pieImageView.removeEventListener('click', pieImageViewClick);
			//newPieImageViewClick);
			pieImageView.addEventListener('click', newPieImageViewClick);

		}

		function nextHandleSwitchClick(e) {
			var goLeft = Titanium.UI.createAnimation();
			goLeft.left = 0;
			goLeft.duration = 400;
			//goLeft.delay = slideLabelRightPause;

			//goLeft.addEventListener('complete', nextHandleSwitchClick2);
			if (collapseButton >= 0) {
				buttonV[collapseButton].animate(goLeft);
			}
			nextHandleSwitchClick2(e);
			//simulatneousnow;

		};

		function nextHandleSwitchClick2(e) {

			var fadeOutAnim = Ti.UI.createAnimation({
				duration : 500,
				opacity : 0,
				delay : 0
			});
			//slideLabelLeftPause
			fadeOutAnim.addEventListener('complete', nextHandleSwitchClick3);

			mietfInfo.animate(fadeOutAnim);
			//fadeOut without removing, because this is a switch

		}

		function nextHandleSwitchClick3(e) {
			mietfInfo.popIn(colors[selectedButton], 0, buttonLabels[selectedButton].buttonText, buttonLabels[selectedButton].facetTickerSymbol, (buttonLabels[selectedButton].facetTickerSymbol == 'MiETF'), buttonLabels[selectedButton].ETFVersionId);
			//already exists, so don't have to add to form
		}

		function nextHandleButtonClick(e) {
			
			self.removeDownArrow(true);

			if (selectedButton == e.source.i) {
				self.clickPieImageView();
				return;
			}

			if (mietf.pieMode == 'searchMode') {
				selectedButton = e.source.i;
				nextSearchToInfo(e);
				return;
			}
	
			if (mietf.pieMode == 'infoMode') {//switch logic
				collapseButton = selectedButton;
				selectedButton = e.source.i;

				var goRight = Titanium.UI.createAnimation();
				goRight.left = 32;
				goRight.duration = 400;

				self.button = buttons[selectedButton];
				self.buttonLabel = buttonLabels[selectedButton];

				//goRight.addEventListener('complete', nextHandleSwitchClick);
				if (selectedButton >= 0) {
					buttonV[selectedButton].animate(goRight);
				}
				nextHandleSwitchClick(e);
				//simultaneous

				return;
			}

			mietf.pieMode = 'infoMode';
			selectedButton = e.source.i;

			var goRight = Titanium.UI.createAnimation();
			goRight.left = 32;
			goRight.duration = 400;

			var goLeft = Titanium.UI.createAnimation();
			goLeft.left = 0;
			goLeft.duration = 400;

			goRight.addEventListener('complete', nextHandleButtonClickStep2);
			if (selectedButton >= 0) {
				buttonV[selectedButton].animate(goRight);
			}
			//step1 here

			for ( i = 0; i < buttonV.length; i++) {
				if (i != selectedButton) {
					buttonV[i].animate(goLeft);
					animation.fadeOut(buttonX[i].button, 500);
				}
			}

		}

		function nextHandleButtonClickStep2(e) {

			var pieImage = pieChart.snapshot();

			pieImageView = Ti.UI.createImageView({
				width : 386,
				height : 386,
				top : 80,
				right : 64,
				image : pieImage
			});

			self.add(pieImageView);

			pieChart.opacity = 0;

			var pieImageToSmall = Ti.UI.createAnimation({
				top : 484,
				right : -1,
				width : 1,
				height : 1,
				duration : 500,
				delay : afterSlideRightPause
			});

			pieImageToSmall.addEventListener('complete', nextHandleButtonClickStep3);

			pieImageView.animate(pieImageToSmall);

			for ( i = 0; i < pieButtons.length; i++) {
				animation.fadeOut(pieButtons[i], 500);
			}
			animation.fadeOut(investButton, 500);

		}

		function nextHandleButtonClickStep3(e) {

			Ti.API.info('In nextHandleButtonClickStep3');

			pieImageView.addEventListener('click', newPieImageViewClick);

			//
			var MietfInfo = require('componentInfoPie');
			mietfInfo = new MietfInfo({
				parent : self,
				toAddNew : false
			});
			self.button = buttons[selectedButton];
			self.buttonLabel = buttonLabels[selectedButton];

			self.add(mietfInfo);
			mietfInfo.popIn(colors[selectedButton], afterPieShrinkPause, buttonLabels[selectedButton].buttonText, buttonLabels[selectedButton].facetTickerSymbol, (buttonLabels[selectedButton].facetTickerSymbol == 'MiETF'), buttonLabels[selectedButton].ETFVersionId);

			///
		}

		function newHandleButtonClick(e) {

			if (selectedButton == e.source.i) {
				self.clickPieImageView();
				return;
			}

			if (mietf.pieMode == 'searchMode') {
				selectedButton = e.source.i;
				searchToInfo(e);
				return;
			}

			if (mietf.pieMode == 'infoMode') {//switch logic
				collapseButton = selectedButton;
				selectedButton = e.source.i;
				var fadeOutAnim = Ti.UI.createAnimation({
					duration : 500,
					opacity : 0
				});
				fadeOutAnim.addEventListener('complete', newHandleSwitchButton);

				self.button = buttons[selectedButton];
				self.buttonLabel = buttonLabels[selectedButton];

				mietfInfo.animate(fadeOutAnim);
				//fadeOut without removing, because this is a switch

				//buttonV[e.source.i].animate(goRight);
				//if (buttonLabels[e.source.i].facetName != '$') animation.fadeIn(buttonX[e.source.i].button, 500);

				//update the view
				return;
			}

			mietf.pieMode = 'infoMode';

			var pieImage = pieChart.snapshot();

			pieImageView = Ti.UI.createImageView({
				width : 386,
				height : 386,
				top : 80,
				right : 64,
				image : pieImage
			});

			self.add(pieImageView);

			pieChart.opacity = 0;

			var pieImageToSmall = Ti.UI.createAnimation({
				top : 484,
				right : -1,
				width : 1,
				height : 1,
				duration : 500
			});

			pieImageToSmall.addEventListener('complete', newHandleButtonClickStep2);

			selectedButton = e.source.i;
			pieImageView.animate(pieImageToSmall);

			for ( i = 0; i < pieButtons.length; i++) {
				animation.fadeOut(pieButtons[i], 500);
			}
			animation.fadeOut(investButton, 500);

		}

		function newHandleSwitchButton(e) {
			var goLeft = Titanium.UI.createAnimation();
			goLeft.left = 0;
			goLeft.duration = 400;

			goLeft.addEventListener('complete', newHandleSwitchButton2);

			if (collapseButton > 0) {
				buttonV[collapseButton].animate(goLeft);
			}

		}

		function newHandleSwitchButton2(e) {
			var goRight = Titanium.UI.createAnimation();
			goRight.left = 32;
			goRight.duration = 400;

			goRight.addEventListener('complete', newHandleSwitchButton3);
			if (selectedButton >= 0) {
				buttonV[selectedButton].animate(goRight);
			}

		}

		function newHandleSwitchButton3(e) {
			mietfInfo.popIn(colors[selectedButton]);
			//already exists, so don't have to add to form
		}

		function newHandleButtonClickStep2(e) {
			var goRight = Titanium.UI.createAnimation();
			goRight.left = 32;
			goRight.duration = 400;

			var goLeft = Titanium.UI.createAnimation();
			goLeft.left = 0;
			goLeft.duration = 400;

			goRight.addEventListener('complete', newHandleButtonClickStep3);
			if (selectedButton >= 0) {
				buttonV[selectedButton].animate(goRight);
			}
			//step1 here

			for ( i = 0; i < buttonV.length; i++) {
				if (i != selectedButton) {
					buttonV[i].animate(goLeft);
					animation.fadeOut(buttonX[i].button, 500);
				}
			}

		}

		function newHandleButtonClickStep3(e) {

			Ti.API.info('In newHandleButtonClickStep3');

			pieImageView.addEventListener('click', newPieImageViewClick);

			//
			var MietfInfo = require('componentInfoPie');
			mietfInfo = new MietfInfo({
				parent : self,
				toAddNew : false
			});
			self.button = buttons[selectedButton];
			self.buttonLabel = buttonLabels[selectedButton];

			self.add(mietfInfo);
			mietfInfo.popIn(colors[selectedButton]);

			///
		}

		function handleButtonClick(e) {

			var goRight = Titanium.UI.createAnimation();
			goRight.left = 32;
			goRight.duration = 400;

			var goLeft = Titanium.UI.createAnimation();
			goLeft.left = 0;
			goLeft.duration = 400;

			if (selectedButton == e.source.i) {
				self.clickPieImageView();
				return;

			}
			if (mietf.pieMode == 'searchMode')
				return;

			if (mietf.pieMode == 'infoMode') {//switch logic
				if (selectedButton + 1) {

					buttonV[selectedButton].animate(goLeft);
					animation.fadeOut(buttonX[selectedButton].button, 500);
				}
				goRight.addEventListener('complete', handleSwitchButton);

				buttonV[e.source.i].animate(goRight);
				//if (buttonLabels[e.source.i].facetName != '$') animation.fadeIn(buttonX[e.source.i].button, 500);
				selectedButton = e.source.i;

				//update the view
				return;
			}

			mietf.pieMode = 'infoMode';

			goRight.addEventListener('complete', handleButtonClickStep2);

			buttonV[e.source.i].animate(goRight);
			//step1 here

			selectedButton = e.source.i;

			for ( i = 0; i < buttonV.length; i++) {
				if (i != e.source.i) {
					buttonV[i].animate(goLeft);
					animation.fadeOut(buttonX[i].button, 500);
				}
			}

		};

		var pieImageView = Ti.UI.createImageView({});

		function goPieMode(e) {

			if (mietf.pieMode == 'infoMode')
				mietfInfo.slideOut();
			if (mietf.pieMode == 'searchMode')
				mietfSearch.slideOut();

			if (mietf.pieMode == 'infoMode' || mietf.pieMode == 'searchMode')
				self.remove(pieImageView);
			mietf.pieMode = 'pieMode';

			/* not necessary, because resetting buttons
			 for (i=0; i < buttonV.length; i++) {
			 buttonV[i].animate(goLeft);
			 animation.fadeOut(buttonX[i].button, 500);
			 }
			 */

		}

		function handleButtonClickStep2(e) {

			//if (buttonLabels[selectedButton].facetName != '$') animation.fadeIn(buttonX[selectedButton].button, 500);
			//never fade in, delete is gone

			var pieImage = pieChart.snapshot();

			pieImageView = Ti.UI.createImageView({
				width : 386,
				height : 386,
				top : 80,
				right : 64,
				image : pieImage
			});

			self.add(pieImageView);

			pieChart.opacity = 0;

			var pieImageToSmall = Ti.UI.createAnimation({
				top : 484,
				right : -1,
				width : 1,
				height : 1,
				duration : 500
			});

			pieImageToSmall.addEventListener('complete', handleButtonClickStep3);

			pieImageView.animate(pieImageToSmall);

			for ( i = 0; i < pieButtons.length; i++) {
				animation.fadeOut(pieButtons[i], 500);
			}
			animation.fadeOut(investButton, 500);

		}

		function shrinkPie(e) {

			var pieImage = pieChart.snapshot();

			pieImageView = Ti.UI.createImageView({
				width : 386,
				height : 386,
				top : 80,
				right : 64,
				image : pieImage
			});

			self.add(pieImageView);

			pieChart.opacity = 0;

			var pieImageToSmall = Ti.UI.createAnimation({
				top : 484,
				right : -1,
				width : 1,
				height : 1,
				duration : 500
			});

			pieImageToSmall.addEventListener('complete', pieImageSmallDone);

			pieImageView.animate(pieImageToSmall);

			for ( i = 0; i < pieButtons.length; i++) {
				animation.fadeOut(pieButtons[i], 500);
			}
			animation.fadeOut(investButton, 500);

		}

		function pieImageSmallDone(e) {
			pieImageView.addEventListener('click', pieImageViewClick);

			var MietfSearch = require('componentSearchPie');
			mietfSearch = new MietfSearch({
				parent : self,
				filterBy : 2,
				autoPopulate :true
			});

			self.add(mietfSearch);
			mietfSearch.slideIn();
		}

		function handleButtonClickStep3(e) {

			Ti.API.info('In handleButtonClickStep3');

			pieImageView.addEventListener('click', pieImageViewClick);

			//
			var MietfInfo = require('componentInfoPie');
			mietfInfo = new MietfInfo({
				parent : self,
				toAddNew : false
			});
			self.button = buttons[selectedButton];
			self.buttonLabel = buttonLabels[selectedButton];

			self.add(mietfInfo);
			mietfInfo.slideIn(colors[selectedButton]);

			///
		}

		function newPieImageViewClick(e) {

			var fadeOutAnimation = Ti.UI.createAnimation({
				duration : 500,
				opacity : 0
			});

			if (mietf.pieMode == 'infoMode' && mietfInfo) {
				fadeOutAnimation.addEventListener('complete', newPieImageViewClick2);
				mietfInfo.animate(fadeOutAnimation);
			}
			if (mietf.pieMode == 'searchMode')
				animation.fadeOut(mietfSearch);
		}

		function newPieImageViewClick2(e) {
			if (mietfInfo) {
				mietfInfo.removeListener();
				self.remove(mietfInfo);
			}

			var goLeft = Titanium.UI.createAnimation();
			goLeft.left = 0;
			goLeft.duration = 400;

			goLeft.addEventListener('complete', newPieImageViewClick3);
			if (selectedButton >= 0) {
				buttonV[selectedButton].animate(goLeft);
			}

		}

		function newPieImageViewClick3(e) {

			var pieImageToLarge = Ti.UI.createAnimation({
				top : 80,
				right : 64,
				width : 386,
				height : 386,
				duration : 500
			});

			pieImageToLarge.addEventListener('complete', newPieImageViewClick4);

			pieImageView.animate(pieImageToLarge);

		}

		function newPieImageViewClick4(e) {
			pieChart.opacity = 1;
			self.remove(pieImageView);

			selectedButton = -1;
			mietf.pieMode = 'pieMode';

			for ( i = 0; i < pieButtons.length; i++) {
				animation.fadeIn(pieButtons[i], 500);
			}
			animation.fadeIn(investButton, 500);

			if (resetButtonsFlag) {
				self.resetButtons(1);
				resetButtonsFlag == false;
			}
		}

		function pieImageViewClick(e) {

			if (mietf.pieMode == 'pieMode')
				return;

			/*
			 *
			 * 		var fadeOutAnimation = Ti.UI.createAnimation({duration: 500, opacity: 0});

			 if (mietf.pieMode=='infoMode') {
			 fadeOutAnimation.addEventListener('complete', newPieImageViewClick2);
			 mietfInfo.animate(fadeOutAnimation);
			 }
			 if (mietf.pieMode=='searchMode')  animation.fadeOut(mietfSearch);
			 *
			 *
			 *
			 *
			 *
			 *
			 */

			var fadeOutAnimation = Ti.UI.createAnimation({
				duration : 500,
				opacity : 0
			});

			fadeOutAnimation.addEventListener('complete', nextStep2);

			if (mietf.pieMode == 'searchMode')
				mietfSearch.animate(fadeOutAnimation);
			//animation.fadeOut(mietfSearch);

		}

		function nextStep2(e) {
			self.remove(mietfSearch);
			waitforit(e);
		}

		function waitforit(e) {
			var pieImageToLarge = Ti.UI.createAnimation({
				top : 80,
				right : 64,
				width : 386,
				height : 386,
				duration : 500
			});

			pieImageToLarge.addEventListener('complete', pieImageLargeDone);

			pieImageView.animate(pieImageToLarge);
			for ( i = 0; i < pieButtons.length; i++) {
				animation.fadeIn(pieButtons[i], 500);
				animation.fadeIn(investButton, 500);
			}

			if (mietf.pieMode == 'infoMode') {
				alert('what called this');
				mietfInfo.slideOut();
			}
			mietf.pieMode = 'pieMode';
		}

		function pieImageLargeDone(e) {
			var goLeft = Titanium.UI.createAnimation();
			goLeft.left = 0;
			goLeft.duration = 400;

			goLeft.addEventListener('complete', function(e) {

				if (fireParent) {
					fireParent = false;
					parent.takeSnapshot();
				}
			});

			pieImageView.removeEventListener('click', pieImageViewClick);
			pieChart.opacity = 1;
			self.remove(pieImageView);

			if (selectedButton >= 0) {
				buttonV[selectedButton].animate(goLeft);
				animation.fadeOut(buttonX[selectedButton].button, 500);
				selectedButton = -1;
			}

		}

		var self = Ti.UI.createView({
			width : 768,
			height : 544,
			opacity : 1,
			backgroundImage : 'images/ifapps/paperTop.pn8',
			portfolioId : _args.portfolioId,
			left : 0,
			top : 0,
			button : [],
			buttonLabel : []
		});

		self.clickPieImageView = function(e) {
			Ti.API.info('self.clickPieImageView - importExisting : ' + importExisting);
			if (importExisting) {

				importExisting = false;
				mietf.pieMode = 'pieMode';

				animation.fadeOut(mietfSearch);

				btnCreateNew.animate({
					opacity : 1,
					duration : 500
				});
				btnImportExisting.animate({
					opacity : 1,
					duration : 500
				});

			} else {
				pieImageView.fireEvent('click', {});
			}
		};

		self.clickSmallPie = function(e) {
			pieImageView.fireEvent('click', {});
		};

		self.showTickerDetailToAdd = function(data) {
			Ti.API.info('showTickerDetailToAdd ' + JSON.stringify(data));

			mietf.pieMode = 'infoMode';
			pieImageView.addEventListener('click', newPieImageViewClick);
			var MietfInfo = require('componentInfoPie');
			mietfInfo = new MietfInfo({
				parent : self,
				toAddNew : true,
				mietfNameInp : mietfNameInp.value,
				customData : data
			});

			self.add(mietfInfo);

			var fadeOutAnim = Ti.UI.createAnimation({
				duration : 500,
				opacity : 0,
				delay : 0
			});

			fadeOutAnim.addEventListener('complete', function() {
				mietfInfo.popIn(['#666666', '#EEEEEE'], 500, data.buttonTitle, data.tickerSymbol, data.isMiETF, data.ETFVersionId);
			});

			mietfSearch.animate(fadeOutAnim);

		};

		self.showMietfSearch = function() {
			pieImageView.addEventListener('click', pieImageViewClick);
			if ( typeof mietfSearch !== 'undefined' && mietfSearch != null) {
				mietfSearch.slideIn();
			}
		};

		self.makeRentrant = function() {

			if (mietf.pieMode == 'infoMode') {
				mietfInfo.removeListener();
				self.remove(mietfInfo);
			}
			if (mietf.pieMode == 'searchMode')
				self.remove(mietfSearch);
			if (selectedButton + 1) {
				buttonV[selectedButton].left = 0;
				buttonX[selectedButton].button.opacity = 0;
			}

			self.remove(pieImageView);
			pieChart.opacity = 1;

			for ( i = 0; i < pieButtons.length; i++) {
				pieButtons[i].opacity = 1;

			}
			investButton.opacity = 1;
			mietf.pieMode = 'pieMode';
			selectedButton = -1;

		};

		var parent = _args.parent;

		var PieChart = require('pieChart'),
		    pieChart = new PieChart({
			parent : self,
			ETFVersionId : mietf.ETFVersionId
		});

		var pieButtonCoords = [{
			top : 168,
			right : 32
		}, {
			top : 470,
			right : 326
		}, {
			top : 224,
			right : 464
		}, {
			top : 76,
			right : 376
		}, {
			top : 34,
			right : 320
		}];

		var pieButtonLabels = [];
		var pieButtons = [Ti.UI.createImageView({
			image : 'images/ifapps/glossy-circle.pn8',
			width : 32,
			height : 32,
			top : pieButtonCoords[0].top,
			right : pieButtonCoords[0].right
		}), Ti.UI.createImageView({
			image : 'images/ifapps/glossy-circle.pn8',
			width : 32,
			height : 32,
			top : pieButtonCoords[1].top,
			right : pieButtonCoords[1].right
		}), Ti.UI.createImageView({
			image : 'images/ifapps/glossy-circle.pn8',
			width : 32,
			height : 32,
			top : pieButtonCoords[2].top,
			right : pieButtonCoords[2].right
		}), Ti.UI.createImageView({
			image : 'images/ifapps/glossy-circle.pn8',
			width : 32,
			height : 32,
			top : pieButtonCoords[3].top,
			right : pieButtonCoords[3].right
		}), Ti.UI.createImageView({
			image : 'images/ifapps/glossy-circle.pn8',
			width : 32,
			height : 32,
			top : pieButtonCoords[4].top,
			right : pieButtonCoords[4].right
		})];

		for ( i = 0; i < pieButtons.length; i++) {
			pieButtonLabels[i] = Ti.UI.createLabel({
				color : 'white',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '18sp',
					fontWeight : 'bold'
				},
				text : (i + 1).toString(),
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false
			});

			pieButtons[i].add(pieButtonLabels[i]);
			self.add(pieButtons[i]);
		}

		self.clearPieButtons = function(e) {
			for ( i = 0; i < pieButtons.length; i++) {
				self.remove(pieButtons[i]);
			}

			pieButtons = [];
			pieButtonCoords = [];
			pieButtonLabels = [];
		};

		self.addPieButton = function(divisor, coords) {
			pieButtonCoords.push(coords);

			pieButtons.push(Ti.UI.createImageView({
				image : 'images/ifapps/glossy-circle.pn8',
				width : 32 / divisor,
				height : 32 / divisor,
				top : pieButtonCoords[pieButtonCoords.length - 1].top / divisor,
				right : pieButtonCoords[pieButtonCoords.length - 1].right / divisor
			}));

			fontSize = 18 / divisor;
			pieButtonLabels.push(Ti.UI.createLabel({
				color : 'white',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : fontSize + 'sp',
					fontWeight : 'bold'
				},
				text : (pieButtonLabels.length + 1).toString(),
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled : false
			}));

			pieButtons[pieButtons.length - 1].add(pieButtonLabels[pieButtonLabels.length - 1]);
			self.add(pieButtons[pieButtons.length - 1]);

		};

		var pieTitleButton = Titanium.UI.createButton({
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			backgroundGradient : {
				type : 'linear',
				colors : ['#333234', '#a0a1a3'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 2,
					y : 100
				},
				backFillStart : false
			},
			borderWidth : 2,
			borderColor : '#222222',
			width : 288,
			height : 48,
			top : 32,
			left : 32,
			zIndex : 20
		});

		pieTitleButton.addEventListener('click', function(e) {//longpress
			pieTitleLabel.opacity = 0;
			pieTitleLabel.text = '';
			parent.updateTelemetryTitle('');
			mietfNameInp.value = getMietfName(getETFFromVersion(mietf.ETFVersionId));
			//getcurrentName
			mietfNameInp.opacity = 1;
			mietfNameInp.focus();
		});

		var pieTitleText = 'Test';

		var pieTitleLabel = Ti.UI.createLabel({
			color : 'white',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '22sp',
				fontWeight : 'bold'
			},
			text : pieTitleText,
			textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
			touchEnabled : false,
			height : 48,
			top : 32,
			left : 48,
			zIndex : 20
		});

		var closeButton = Titanium.UI.createButton({
			top : 32,
			width : imgs.closeButtonWidth,
			height : imgs.closeButtonHeight,
			backgroundImage : imgs.closeButtonBackgroundImage,
			right : 32
		});

		self.add(closeButton);

		closeButton.addEventListener('click', function(e) {
			dontSave = true;
			Ti.App.fireEvent('MietfButtonClick', {});
		});

		var mietfNameInp = Titanium.UI.createTextField({
			color : 'white',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '22sp',
				fontWeight : 'Bold'
			},
			height : 48,
			top : 32, //47
			width : 288,
			left : 32, //276
			hintText : 'MiETF Name',
			borderRadius : 0,
			borderWidth : 0,
			borderColor : 'transparent',
			paddingLeft : 15,
			paddingRight : 15,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			returnKeyType : Titanium.UI.RETURNKEY_DONE,
			value : '',
			passwordMask : false,
			zIndex : 20,
			opacity : 1,
			editable : !mietf.viewMode
		});

		var ignoreEvent = false;
		var dontSave = false;

		mietfNameInp.addEventListener('blur', function(e) {//findmefindme
			Ti.API.info("mietfNameInp.addEventListener('blur'");
			inCreateNew = false;
			if (!ignoreEvent) {
				ignoreEvent = true;
				if (mietf.ETFVersionId == 0) {
					btnCreateNew.animate({
						opacity : 1,
						duration : 500
					});
					btnImportExisting.animate({
						opacity : 1,
						duration : 500
					});
				} else {

					//if updating existing title
					mietfNameInp.font = {
						fontFamily : 'AvenirNextCondensed-Bold',
						fontSize : '22sp',
						fontWeight : 'Bold'
					};
					

					if (mietfNameInp.value.length < 1)
						mietfNameInp.value = 'Market';

					//save the title
					
					updateMiETFName(getETFFromVersion(mietf.ETFVersionId), mietfNameInp.value);
					pieTitleLabel.text = toTitleCase(mietfNameInp.value) +' MiETF';
					parent.updateTelemetryTitle(toTitleCase(mietfNameInp.value));
					_args.parent.updateTitle({
						portfolioId : self.portfolioId,
						ETFVersionId : mietf.ETFVersionId,
						title : toTitleCase(mietfNameInp.value) + ' MiETF'
					});

					pieTitleLabel.opacity = 1;
					mietfNameInp.value = '';
					mietfNameInp.opacity = 0;
					btnCreateNew.opacity = 0;
					btnImportExisting.opacity = 0;

				}
			} else {
				ignoreEvent = false;
			}

			setTimeout(resetIgnoreFlags, 500);

		});

		function resetIgnoreFlags() {
			ignoreEvent = false;
			dontSave = false;
		}


		mietfNameInp.addEventListener('change', function(e) {
			e.source.value = e.source.value.slice(0, 16);
		});

		var btnCreateNew = Titanium.UI.createLabel({
			color : '#565656',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '22sp',
				fontWeight : 'Bold'
			},
			borderColor : '#a4a2a7',
			borderRadius : 14,
			borderWidth : 2, //3
			backgroundGradient : {
				type : 'linear',
				colors : ['#f7f9fd', '#a4a2a7'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 40,
					y : 200
				},
				backFillStart : false
			},
			text : 'Create New MiETF',
			textAlign : 'center',
			height : 140,
			top : 90,
			width : 140,
			left : 32,
			zIndex : 20,
			opacity : 0
		});
		btnCreateNew.addEventListener('click', function() {
			Ti.API.info('btnCreateNew clicked ' + dontSave);
			closeButton.opacity = 1;
			if (dontSave != true) {
				btnCreateNew.animate({
					opacity : 0,
					duration : 500
				});
				btnImportExisting.animate({
					opacity : 0,
					duration : 500
				});
				mietfNameInp.font = {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '22sp',
					fontWeight : 'Bold'
				};

				if (mietfNameInp.value.length < 1)
					mietfNameInp.value = 'Market';

				//save the new thing
				mietf.ETFVersionId = insertMietf(self.portfolioId, mietfNameInp.value);
				Ti.API.info('saved mietf and got result: ' + mietf.ETFVersionId);
				pieChart.updateETFVersionId(mietf.ETFVersionId);
				self.setFullSizeSpecial({
					ETFVersionId : mietf.ETFVersionId,
					portfolioId : self.portfolioId,
					title : toTitleCase(mietfNameInp.value)
				});
				_args.parent.updateSelf({
					portfolioId : self.portfolioId,
					ETFVersionId : mietf.ETFVersionId,
					title : toTitleCase(mietfNameInp.value)
				});

			}
		});
		self.add(btnCreateNew);

		self.importFromExisting = function(ETFVersionId) {
			var importFromExistingTimeout = function() {
				mietf.ETFVersionId = cloneMiETF(ETFVersionId, self.portfolioId, mietfNameInp.value);
				//insertMietf(self.portfolioId, mietfNameInp.value);
				Ti.API.info('saved mietf and got result: ' + mietf.ETFVersionId);
				pieChart.updateETFVersionId(mietf.ETFVersionId);
				mietfInfo.removeListener();
				self.remove(mietfInfo);
				self.setFullSize({
					ETFVersionId : mietf.ETFVersionId,
					portfolioId : self.portfolioId,
					title : toTitleCase(mietfNameInp.value)
				});
	
				_args.parent.updateSelf({
					portfolioId : self.portfolioId,
					ETFVersionId : mietf.ETFVersionId,
					title : toTitleCase(mietfNameInp.value)
				});
				mietf.pieMode = 'pieMode';
				importExisting = false;
				
			};
			
			// I need to an timeout otherwise it return an error
			setTimeout(function(){
					importFromExistingTimeout();
				}, 100);
		};

		var btnImportExisting = Titanium.UI.createLabel({
			color : '#565656',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '22sp',
				fontWeight : 'Bold'
			},
			borderColor : '#a4a2a7',
			borderRadius : 14,
			borderWidth : 2, //3
			backgroundGradient : {
				type : 'linear',
				colors : ['#f7f9fd', '#a4a2a7'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 40,
					y : 200
				},
				backFillStart : false
			},
			text : 'Import\nExisting\nMiETF',
			textAlign : 'center',
			height : 140,
			top : 90,
			width : 140,
			left : 180,
			zIndex : 20,
			opacity : 0
		});

		btnImportExisting.addEventListener('click', function() {
			btnCreateNew.animate({
				opacity : 0,
				duration : 500
			});
			btnImportExisting.animate({
				opacity : 0,
				duration : 500
			});

			self.removeDownArrow(true);
			if (mietf.pieMode == 'searchMode')
				return;
			if (mietf.pieMode == 'infoMode') {
				var fadeOutAnim = Ti.UI.createAnimation({
					duration : 500,
					opacity : 0,
					delay : goLeftPause
				});
				mietfInfo.animate(fadeOutAnim);
				return;
			}
			mietf.pieMode = 'searchMode';

			selectedButton = -1;
			//because you are clicking add component, this could never be selected
			var MietfSearch = require('componentSearchPie');
			mietfSearch = new MietfSearch({
				parent : self,
				filterBy : 2,
				disableFilterSelect : true,
				autoPopulate :true
			});
			self.add(mietfSearch);
			setTimeout(function(e) {
				closeButton.opacity = 0;
				mietfSearch.slideIn();
			}, shrinkPiePause);
			importExisting = true;

		});
		self.add(btnImportExisting);

		var investButton = Titanium.UI.createButton({
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			backgroundGradient : {
				type : 'linear',
				colors : ['#333234', '#a0a1a3'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 2,
					y : 100
				},
				backFillStart : false
			},
			borderWidth : 2,
			borderColor : '#222222',
			width : 80,
			height : 48,
			top : 32,
			right : 32,
			title : '1',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '16sp',
				fontWeight : 'bold'
			}
		});

		var picker = Ti.UI.createPicker({
			backgroundColor : "#4C4C4E"
		});

		picker.setLocale('fr');
		//hacked to make grey, don't ask

		var column = Ti.UI.createPickerColumn({
			backgroundColor : "#4C4C4E"
		});

		for (var i = 0; i < 5; i++) {
			var row = Ti.UI.createPickerRow({
				id : i,
				backgroundColor : "#4C4C4E"
			});
			var label = Ti.UI.createLabel({
				text : mietf.investChoices[i],
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '12sp'
				},
				width : 200,
				height : 44,
				color : 'white',
				backgroundColor : "#4C4C4E"
			});
			//5, -94
			row.add(label);
			column.addRow(row);
		}

		var addCustomLabel = Ti.UI.createLabel({
			backgroundColor : '#4C4C4E',
			text : 'Add Custom',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '12sp'
			},
			width : 200,
			height : 44,
			touchEnabled : true,
			color : 'white'
		});
		var addCustomRow = Ti.UI.createPickerRow({
			backgroundColor : '#4C4C4E'
		});

		addCustomRow.add(addCustomLabel);

		column.addRow(addCustomRow);

		picker.add(column);
		picker.selectionIndicator = true;

		picker.addEventListener('change', function(e) {
			selectedInvestment = e.rowIndex;
			/*investButton.title = mietf.investChoices[e.rowIndex];
			 Ti.App.fireEvent('updateValue', {
			 investValue : investButton.title,
			 investNum : mietf.investValues[e.rowIndex]
			 });*/
		});

		var pickerV = Ti.UI.createView({
			width : 200,
			height : 220,
			backgroundColor : "#4C4C4E"
		});
		var pickerContainer = Ti.UI.createView({
			top : 45,
			bottom : 5,
			width : 200,
			height : 150,
			backgroundColor : "#4C4C4E"
		});
		pickerContainer.add(picker);
		pickerV.add(pickerContainer);

		var selectView = Ti.UI.createView({
			height : 20,
			width : '100%'
		});
		selectView.addEventListener('click', function() {
			popover.hide();
		});
		pickerContainer.add(selectView);

		/*var addCustom = Ti.UI.createLabel({
		 color : 'white',
		 backgroundGradient : {
		 type : 'linear',
		 colors : ['#666666', '#A2A0A5'],
		 startPoint : {
		 x : 0,
		 y : 0
		 },
		 endPoint : {
		 x : 2,
		 y : 40
		 },
		 backFillStart : false
		 },
		 borderRadius : 10,
		 borderWidth : 2,
		 borderColor : '#666666',
		 text : 'Add Custom',
		 textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		 font : {
		 fontFamily : 'AvenirNextCondensed-Bold',
		 fontSize : '11sp',
		 fontWeight : 'bold'
		 },
		 height : 32,
		 width : 100,
		 top : 230
		 });

		 addCustom.addEventListener('click', function() {
		 addCustomValue();
		 });
		 pickerV.add(addCustom);*/

		var popover = Ti.UI.iPad.createPopover({
			width : 200,
			height : 220,
			contentView : pickerV,
			backgroundColor : "#4C4C4E"
		});

		var titleLbl = Ti.UI.createLabel({
			color : 'white',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : 14 + 'sp',
				fontWeight : 'bold'
			},
			text : 'Starting Investment Value',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			touchEnabled : false,
			top : 8
		});

		pickerV.add(titleLbl);

		popover.addEventListener('hide', function(e) {
			var investValue = mietf.investValues[selectedInvestment];
			if (selectedInvestment > 4) {
				addCustomValue();
				return;
			}
			/*for ( i = 0; i < mietf.investChoices.length; i++) {
			 if (investButton.title == mietf.investChoices[i])
			 investValue = mietf.investValues[i];
			 }*/

			investButton.title = mietf.investChoices[selectedInvestment];
			Ti.App.fireEvent('updateValue', {
				investValue : investButton.title,
				investNum : investValue
			});

			saveInvestment(mietf.ETFVersionId, investValue);
			if (inCreateNew) {
				self.setFullSize({
					ETFVersionId : mietf.ETFVersionId,
					portfolioId : self.portfolioId,
					title : toTitleCase(mietfNameInp.value) 
				});
				inCreateNew = false;
			}
		});

		investButton.addEventListener('click', function(e) {
			if (mietf.viewMode) {
				return;
			}
			popover.show({
				view : investButton
			});

			var pickerIndex = 0;

			for ( i = 0; i < mietf.investChoices.length; i++) {
				if (mietf.investChoices[i] == investButton.title)
					pickerIndex = i;
			}

			picker.setSelectedRow(0, pickerIndex, true);
			if (e.createNew == true) {
				inCreateNew = true;
			}

		});

		var inCreateNew = false;

		var leftPaneSV = Titanium.UI.createScrollView({
			top : 88,
			left : 32,
			height : 424,
			width : 320,
			contentHeight : 'auto',
			contentWidth : '100%'
		});

		var leftPane = Ti.UI.createView({
			top : 0,
			left : 8,
			width : 320,
			layout : 'vertical',
			opacity : 1,
			height : Ti.UI.SIZE
		});

		var buttons = [];
		var buttonLabels = [];
		var buttonX = [];
		var buttonV = [];
		self.resetButtons = function(divisor) {
			Ti.API.info('_11_mietf_pie resetButtons ' + mietf.ETFVersionId);
			var addComponentButtonOpacity = 1;
			if (mietf.ETFVersionId == 0)
				addComponentButtonOpacity = 0;

			leftPaneSV.remove(leftPane);

			leftPane = Ti.UI.createView({
				top : 0,
				left : 0,
				width : 320,
				layout : 'vertical',
				opacity : 1
			});

			buttons = [];
			buttonX = [];
			buttonV = [];
			buttonLabels = [];

			var text = ['1. MRK (Merck)', '2. JNJ (Johnson & Johnson)', '3. AZN (AstraZenica)', '4. BMY (Bristol-Meyers Squib)', '5. Cash ($)', ''];

			var data = getMietfComponentsChart(mietf.ETFVersionId);

			pieChart.drawPie(divisor, data);
			//7700ms

			for ( i = 0; i < data.length; i++) {

				var buttonText = (i + 1) + '. ' + data[i].facetTickerSymbol + ' (' + data[i].facetName + ')';

				var buttonTitleAttr = Ti.UI.createAttributedString({
					text : buttonText,
					attributes : [{
						type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
						value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
						range : [0, buttonText.length]
					}]
				});

				buttonLabels[i] = Ti.UI.createLabel({
					color : 'white',
					font : {
						fontFamily : 'AvenirNextCondensed-Bold',
						fontSize : 14 / divisor + 'sp',
						fontWeight : 'bold'
					},
					//attributedString: buttonTitleAttr,
					text : buttonText.substring(0, 30),
					textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
					touchEnabled : false,
					top : 6 / divisor,
					left : 16 / divisor,
					facetName : data[i].facetName,
					facetTickerSymbol : data[i].facetTickerSymbol,
					buttonText : data[i].facetName.substring(0, 30),
					ETFVersionId : data[i].ETFVersionId
				});

				buttonV[i] = Titanium.UI.createView({
					height : 32,
					bottom : 8,
					left : 0,
					width : 258,
					i : i,
					jctFacetETFId : data[i].jctFacetETFId
				});

				buttons[i] = Titanium.UI.createButton({
					style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
					borderRadius : 10 / divisor,
					font : {
						fontSize : 16 / divisor,
						fontWeight : 'bold'
					},
					backgroundGradient : {
						type : 'linear',
						colors : colors[i],
						startPoint : {
							x : 0,
							y : 0
						},
						endPoint : {
							x : 2 / divisor,
							y : 50 / divisor
						},
						backFillStart : false
					},
					borderWidth : 2 / divisor, //
					borderColor : colors[i][0],
					width : 208 / divisor,
					left : 0,
					height : 32 / divisor,
					i : i,
					jctFacetETFId : data[i].jctFacetETFId
				});

				buttons[i].add(buttonLabels[i]);

				buttonX[i] = new Object();

				buttonX[i].button = Titanium.UI.createButton({
					style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
					borderRadius : 10,
					font : {
						fontSize : 16,
						fontWeight : 'bold'
					},
					backgroundGradient : {
						type : 'linear',
						colors : colors[i],
						startPoint : {
							x : 0,
							y : 0
						},
						endPoint : {
							x : 2,
							y : 50
						},
						backFillStart : false
					},
					borderWidth : 2,
					borderColor : colors[i][0],
					width : 48,
					right : 0,
					height : 32,
					i : i,
					opacity : 0,
					jctFacetETFId : data[i].jctFacetETFId
				});

				buttonX[i].label = Ti.UI.createLabel({
					color : '#ffffff',
					font : {
						fontFamily : 'AvenirNextCondensed-Bold',
						fontSize : '14sp'
					},
					width : Ti.UI.SIZE,
					text : 'Delete',
					opacity : 1,
					touchEnabled : false
				});

				buttonX[i].button.addEventListener('click', function(e) {
					deleteFacet(e.source.jctFacetETFId);

					self.resetButtons(1);

					goPieMode();

					//Alloy.Globals.selectedChannel = Alloy.Globals.channelList[e.source.orderNum];
					//var win=Alloy.createController('confirmationPopup').getView();
					//win.open({transition:Ti.UI.iPhone.AnimationStyle.NONE});
				});

				buttonX[i].button.add(buttonX[i].label);

				buttons[i].addEventListener('click', nextHandleButtonClick);

				buttonV[i].add(buttons[i]);
				buttonV[i].add(buttonX[i].button);
				leftPane.add(buttonV[i]);

				if (resetButtonsFlag) {
					mietfInfo.closeConfirmation();
					resetButtonsFlag = false;
					if ( typeof deleteOverlay !== 'undefined' && deleteOverlay != null) {
						animation.fadeOut(deleteOverlay, 500, function() {
							_args.parent.remove(deleteOverlay);
							if ( typeof progressIndicator !== 'undefined' && progressIndicator != null) {
								animation.fadeOut(progressIndicator, 500, function() {
									_args.parent.remove(progressIndicator);
								});
							}
						});
					}
				}
			}

			var buttonButtonsView = Titanium.UI.createView({
				width : 240 / divisor,
				left : 0,
				height : 32 / divisor,
				bottom : 8 / divisor
			});
			var addComponentButton = Titanium.UI.createButton({
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : 14 / divisor + 'sp',
					fontWeight : 'bold'
				},
				title : 'Add Component',
				color : 'white',
				width : 144 / divisor,
				left : 0,
				height : 32 / divisor,
				opacity : addComponentButtonOpacity,
				borderColor : '#666666',
				borderRadius : 10,
				borderWidth : 2,
				backgroundGradient : {
					type : 'linear',
					colors : ['#666666', '#A2A0A5'],
					startPoint : {
						x : 0,
						y : 0
					},
					endPoint : {
						x : 2,
						y : 40
					},
					backFillStart : false
				}
			});

			addComponentButton.addEventListener('click', function(e) {
				self.removeDownArrow(true);

				if (mietf.pieMode == 'searchMode')
					return;

				if (mietf.pieMode == 'infoMode') {
					nextCloseInfoThenAdd(e);
					return;
				}
				mietf.pieMode = 'searchMode';

				selectedButton = -1;
				//because you are clicking add component, this could never be selected
				nextAddComponentClick(e);

			});

			function nextAddComponentClick(e) {

				var pieImage = pieChart.snapshot();

				pieImageView = Ti.UI.createImageView({
					width : 386,
					height : 386,
					top : 80,
					right : 64,
					image : pieImage
				});

				self.add(pieImageView);

				pieChart.opacity = 0;

				var pieImageToSmall = Ti.UI.createAnimation({
					top : 484,
					right : -1,
					width : 1,
					height : 1,
					duration : 500
				});

				pieImageToSmall.addEventListener('complete', nextAddComponentClickStep2);

				pieImageView.animate(pieImageToSmall);

				for ( i = 0; i < pieButtons.length; i++) {
					animation.fadeOut(pieButtons[i], 500);
				}
				animation.fadeOut(investButton, 500);

			}

			function nextAddComponentClickStep2(e) {
				pieImageView.addEventListener('click', pieImageViewClick);

				var MietfSearch = require('componentSearchPie');
				mietfSearch = new MietfSearch({
					parent : self,
					filterBy : 0,
					autoPopulate :false
				});

				self.add(mietfSearch);
				setTimeout(function(e) {
					mietfSearch.slideIn();
				}, shrinkPiePause);
			}

			function nextCloseInfoThenAdd(e) {
				var goLeft = Titanium.UI.createAnimation();
				goLeft.left = 0;
				goLeft.duration = 400;

				goLeft.addEventListener('complete', nextCloseInfoThenAddStep2);
				if (selectedButton >= 0) {
					buttonV[selectedButton].animate(goLeft);
				}
			}

			function nextCloseInfoThenAddStep2(e) {
				var fadeOutAnim = Ti.UI.createAnimation({
					duration : 500,
					opacity : 0,
					delay : goLeftPause
				});
				fadeOutAnim.addEventListener('complete', closeInfoThenAddStep2);

				mietfInfo.animate(fadeOutAnim);
				//fadeOut then remove

			}

			function nextCloseInfoThenAddStep3(e) {
				mietfInfo.removeListener();
				self.remove(mietfInfo);

				mietf.pieMode = 'searchMode';
				selectedButton = -1;

				var MietfSearch = require('componentSearchPie');
				mietfSearch = new MietfSearch({
					parent : self,
					filterBy : 2,
					autoPopulate :true
				});

				self.add(mietfSearch);

				setTimeout(function(e) {
					mietfSearch.slideIn();
				}, fadeInfoViewPause);

				pieImageView.removeEventListener('click', newPieImageViewClick);
				pieImageView.addEventListener('click', pieImageViewClick);

			}

			function closeInfoThenAdd(e) {
				var fadeOutAnim = Ti.UI.createAnimation({
					duration : 500,
					opacity : 0
				});
				fadeOutAnim.addEventListener('complete', closeInfoThenAddStep2);

				mietfInfo.animate(fadeOutAnim);
				//fadeOut then remove
			}

			function closeInfoThenAddStep2(e) {
				mietfInfo.removeListener();
				self.remove(mietfInfo);
				//slide button to left
				var goLeft = Titanium.UI.createAnimation();
				goLeft.left = 0;
				goLeft.duration = 400;

				goLeft.addEventListener('complete', closeInfoThenAddStep3);
				if (selectedButton >= 0) {
					buttonV[selectedButton].animate(goLeft);
				}

			}

			function closeInfoThenAddStep3(e) {

				mietf.pieMode = 'searchMode';
				selectedButton = -1;

				var MietfSearch = require('componentSearchPie');
				mietfSearch = new MietfSearch({
					parent : self,
					filterBy : 2,
					autoPopulate :true
				});

				self.add(mietfSearch);
				mietfSearch.slideIn();

				pieImageView.removeEventListener('click', newPieImageViewClick);
				pieImageView.addEventListener('click', pieImageViewClick);

			}

			var moreButton = Titanium.UI.createButton({
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				borderRadius : 10 / divisor,
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : 14 / divisor + 'sp',
					fontWeight : 'bold'
				},
				title : 'More...',
				color : 'white',
				backgroundGradient : {
					type : 'linear',
					colors : ['#A2A0A5', '#666666'],
					startPoint : {
						x : 0,
						y : 0
					},
					endPoint : {
						x : 2 / divisor,
						y : 50 / divisor
					},
					backFillStart : false
				},
				borderWidth : 2 / divisor,
				borderColor : '#A2A0A5',
				width : 80 / divisor,
				right : 0,
				height : 32 / divisor
			});
			if (mietf.viewMode == false) {
				buttonButtonsView.add(addComponentButton);
			}
			leftPane.add(buttonButtonsView);
			leftPaneSV.add(leftPane);
		};

		leftPaneSV.add(leftPane);
		self.add(leftPaneSV);

		self.add(pieChart);
		self.add(pieTitleButton);
		self.add(pieTitleLabel);
		self.add(mietfNameInp);

		if (mietf.viewMode) {
			var backButton = Ti.UI.createButton({
				title : 'Back',
				top : 32,
				right : 32,
				width : 82,
				height : 48,
				borderRadius : 10,
				borderWidth : 2,
				borderColor : '#222222',
				color : 'black',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '22sp',
					fontWeight : 'bold'
				},
				backgroundGradient : {
					type : 'linear',
					colors : ['#CCCCCC', '#EEEEEE'],
					startPoint : {
						x : 0,
						y : 0
					},
					endPoint : {
						x : 2,
						y : 100
					},
					backFillStart : false
				}
			});
			backButton.addEventListener('click', function() {
				Ti.App.fireEvent('endStrategyChange', {});
				parent.animate({
					left : Ti.Platform.displayCaps.platformWidth,
					duration : 500
				}, function() {
					if (mietf.viewInterface) {
						mietf.viewInterface.removeMietfView({
							pieMode : 'infoMode'
						});
					}
				});
			});
			self.add(backButton);

		} else {
			self.add(investButton);
		}

		self.setFullSize = function(e) {
			Ti.API.info('_11_mietf_pie setFullSize ' + e.ETFVersionId);
			inCreateNew = false;
			dontSave = false;
			mietf.ETFVersionId = e.ETFVersionId;
			self.portfolioId = e.portfolioId;
			pieChart.ETFVersionId = e.ETFVersionId;
			pieTitleText = e.title;
			pieTitleLabel.text = pieTitleText;
			parent.updateTelemetryTitle(pieTitleText);
			//_args.parent.updateTitle({title: toTitleCase(pieTitleText)});

			if (e.ETFVersionId == 0) {
				mietf.ETFVersionId = 0;
				//need to match
				//addComponentButton.opacity = 0;
				closeButton.opacity = 1;
				investButton.opacity = 0;
				pieTitleLabel.opacity = 0;
				mietfNameInp.value = '';
				pieTitleLabel.text = '';
				parent.updateTelemetryTitle('');
				mietfNameInp.height = 48;
				mietfNameInp.top = 32;
				pieTitleButton.height = 48;
				pieTitleButton.backgroundGradient = {
					type : 'linear',
					colors : ['#787878', '#989898'],
					startPoint : {
						x : 0,
						y : 0
					},
					endPoint : {
						x : 2,
						y : 100
					},
					backFillStart : false
				};
				pieTitleButton.borderColor = '#787878';
				mietfNameInp.opacity = 1;

			} else {
				btnCreateNew.opacity = 0;
				btnImportExisting.opacity = 0;
				mietfNameInp.height = 48;
				mietfNameInp.top = 32;
				pieTitleButton.height = 48;
				pieTitleButton.backgroundGradient = {
					type : 'linear',
					colors : ['#333234', '#a0a1a3'],
					startPoint : {
						x : 0,
						y : 0
					},
					endPoint : {
						x : 2,
						y : 100
					},
					backFillStart : false
				};
				pieTitleButton.borderColor = '#222222';

				var investNum = getInvestment(e.ETFVersionId);

				var investText = '$'+investNum;
				for ( i = 0; i < mietf.investChoices.length; i++) {
					if (investNum == mietf.investValues[i])
						investText = mietf.investChoices[i];
				}

				investButton.title = investText;
				Ti.App.fireEvent('updateValue', {
					investValue : investButton.title,
					investNum : investNum
				});
				//addComponentButton.opacity = 1;
				animation.fadeIn(investButton, 500);
				animation.fadeIn(pieTitleLabel, 500);
				animation.fadeOut(mietfNameInp, 500);
				//doesn't appear otherwise, that's why...using label instead....okey
				animation.fadeOut(closeButton, 500);
			}

			self.resetButtons(1);

			if ( typeof mietfSearch !== 'undefined' && mietfSearch != null) {
				mietfSearch.removeProgressIndicator();
			}

		};

		self.setFullSizeSpecial = function(e) {

			mietfNameInp.height = 48;
			mietfNameInp.top = 32;
			pieTitleButton.height = 48;
			pieTitleButton.backgroundGradient = {
				type : 'linear',
				colors : ['#333234', '#a0a1a3'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 2,
					y : 100
				},
				backFillStart : false
			};
			pieTitleButton.borderColor = '#222222';

			dontSave = false;
			self.portfolioId = e.portfolioId;
			pieChart.ETFVersionId = e.ETFVersionId;
			pieTitleText = e.title;
			pieTitleLabel.text = pieTitleText;
			parent.updateTelemetryTitle(pieTitleText);
			_args.parent.updateTitle({
				portfolioId : self.portfolioId,
				ETFVersionId : mietf.ETFVersionId,
				title : toTitleCase(pieTitleText)
			});

			var investNum = getInvestment(mietf.ETFVersionId);
			investButton.title = '$' + numberWithCommas(investNum);
			Ti.API.info('setFullSizeSpecial mietf.ETFVersionId: ' + mietf.ETFVersionId);
			Ti.App.fireEvent('updateValue', {
				investValue : investButton.title,
				investNum : investNum
			});

			animation.fadeIn(investButton, 500, fireInvestButton);

			function fireInvestButton() {
				investButton.fireEvent('click', {
					createNew : true
				});
			}

		};

		self.showDownArrow = function() {
			//alert(mietf.currentScreen + "" +mietf.pieMode);
			if (Ti.App.Properties.hasProperty("downArrowShowCount") && Ti.App.Properties.getInt("downArrowShowCount") > 3) {
				return;
			}
			if (self.imgSwipeUp) {
				self.remove(self.imgSwipeUp);
				self.imgSwipeUp = null;
			}
			
			if (self.labelSwipeUp) {
				self.remove(self.labelSwipeUp);
				self.labelSwipeUp = null;
			}
			/*
			self.imgSwipeUp = Ti.UI.createImageView({
				image : 'images/down_arrow/' + (buttonPortfolio.vaultNum - 1) + '_color.png',
				bottom : 20,
				left : 354,
				width : 60,
				height : 50
			});
			self.add(self.imgSwipeUp);
			self.imgSwipeUp.animate({
				bottom : 3,
				duration : 500,
				repeat : 10,
				autoreverse : true
			}, function() {
				if (self.imgSwipeUp) {
					self.imgSwipeUp.animate({
						opacity : 0,
						duration : 1000
					}, function() {
						self.remove(self.imgSwipeUp);
						self.imgSwipeUp = null;
					});
				}
			});
			*/

			var labelSwipeUp = Ti.UI.createLabel({
				left : 260,
				bottom : 3,
				width : 300,
				height : Ti.UI.SIZE,
				text : ' ',
				//color : '#525252',
				color: 'black',
			 	font : {
			 		//fontFamily : imgs.txtLblsFontFamily,
			 		fontFamily : 'AmericanTypewriter',			
			 		fontSize : '22sp',
			 		
			 	}
			});

			var c = 0;
			var txtMsgs = "Please scroll up for more...";
			function typeTextForStep() {
				var text = txtMsgs.substr(0, c) + '_';
				labelSwipeUp.text = text;
				if (c == txtMsgs.length) {
					clearInterval(timer);
					c = 0;
					timer = setInterval(function(e) {
			 			blinkPeriodForStep();
			 		}, 200);
			 	}
			 	c++;
			};

			var even = 0;
			function blinkPeriodForStep() {
				if (even == 0)
				var text = txtMsgs;
				if (even == 1)
			 	var text = txtMsgs + '_';
			 	labelSwipeUp.text = text;
			 	if (c == 3) {
			 		var text = txtMsgs;
			 		labelSwipeUp.text = text;
			 		clearInterval(timer);
			 		c = 0;
			 	}
			 	c++;
			 	even++;
			 	if (even == 2)
			 		even = 0;
			};
			self.add(labelSwipeUp);
			self.labelSwipeUp = labelSwipeUp;
			var timer = setInterval(function(e) {
				typeTextForStep();
			}, 90);
		};

		self.removeDownArrow = function(removeOnly) {
			if (self.labelSwipeUp) {
				if (!removeOnly) {
					if (Ti.App.Properties.hasProperty("downArrowShowCount")) {
						Ti.App.Properties.setInt("downArrowShowCount", Ti.App.Properties.getInt("downArrowShowCount") + 1);
					} else {
						Ti.App.Properties.setInt("downArrowShowCount", 1);
					}
				}
				self.remove(self.imgSwipeUp);
				self.imgSwipeUp = null;
				
				self.remove(self.labelSwipeUp);
				self.labelSwipeUp = null;
			}
		};

		self.removeProgressIndicator = function(immediate) {
			if ( typeof mietfSearch !== 'undefined' && mietfSearch != null) {
				mietfSearch.removeProgressIndicator(true);
			}
		};
	} catch(e) {
		alert(e);
	}

	function addCustomValue() {
		popover.hide();
		var customWindow = Ti.UI.createWindow({
			width : '100%',
			height : '100%',
			backgroundColor : 'transparent'
		});
		var customScrollView = Ti.UI.createScrollView({
			width : '100%',
			height : '100%'
		});
		var customView = Ti.UI.createView({
			width : '25%',
			height : '20%',
			backgroundColor : "#4C4C4E",
			borderColor : '#a4a2a7',
			borderWidth : 2,
			borderRadius : 10,
			center : {
				x : '61%',
				y : '38%'
			}
		});
		customView.add(Ti.UI.createLabel({
			left : 5,
			right : 5,
			color : 'white',
			top : 15,
			textAlign : 'center',
			text : 'Total Investment',
			height : Ti.UI.SIZE,
			font : {
				fontFamily : imgs.txtLblsFontFamily,
				fontSize : '18sp',
				fontWeight : 'bold'
			}
		}));
		var customText = Titanium.UI.createTextField({
			color : 'white',
			hintTextColor :'#aaaaaa',
			font : {
				fontFamily : 'AvenirNextCondensed-Regular',
				fontSize : '18sp'
			},
			height : 40,
			top : 50,
			right : 15,
			left : 15,
			paddingLeft : 30,
			paddingRight : 15,
			borderRadius : 10,
			borderWidth : 2,
			borderColor : '#a4a2a7',
			hintText : 'Investment Amount',
			keyboardType : Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			returnKeyType : Titanium.UI.RETURNKEY_DONE
		});
		customText.addEventListener('blur', function customTextBlur(e) {
			customText.removeEventListener('blur', customTextBlur);
			if (!isNaN(parseFloat(customText.value)) && isFinite(customText.value)) {
				mietf.investChoices.push('$' + customText.value);
				mietf.investValues.push(parseInt(customText.value));
				investButton.title = mietf.investChoices[mietf.investChoices.length - 1];
				saveInvestment(mietf.ETFVersionId, customText.value);
				Ti.App.fireEvent('updateValue', {
					investValue : investButton.title,
					investNum : mietf.investValues[mietf.investChoices.length - 1]
				});
			
				self.setFullSize({
					ETFVersionId : mietf.ETFVersionId,
					portfolioId : self.portfolioId,
					title : toTitleCase(mietfNameInp.value) 
				});
				
			}
			customWindow.close();

			//popover.fireEvent('hide',{});
		});
		customView.add(customText);
		customText.add(Ti.UI.createLabel({
			text : '$',
			color:'white',
			left : 15,
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			font : {
				fontFamily : 'AvenirNextCondensed-Regular',
				fontSize : '18sp'
			}
		}));

		var okButton = Titanium.UI.createButton({
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : 14 + 'sp',
				fontWeight : 'bold'
			},
			title : 'Ok',
			color : 'white',
			width : 100,
			bottom : 10,
			height : 32,
			borderColor : '#999999',
			borderRadius : 10,
			borderWidth : 2,
			backgroundGradient : {
				type : 'linear',
				colors : ['#999999', '#A2A0A5'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 2,
					y : 40
				},
				backFillStart : false
			}
		});

		okButton.addEventListener('click', function(e) {
			customText.blur();
		});
		customView.add(okButton);
		customScrollView.add(customView);
		customWindow.add(customScrollView);
		customWindow.addEventListener('open', function() {
			customText.focus();
		});
		customWindow.open();
	}

	return self;
};

module.exports = mietfPie;
