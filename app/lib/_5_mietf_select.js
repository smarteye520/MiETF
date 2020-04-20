function MiETFSelect(_args) {
    
    var  parent =  _args.parent;
    
	var self = Ti.UI.createView({
		top : 102,
		left : 213 + mietf.screenOffset, //which is 0
		width : 811,
		height : 666,
		zIndex : 51,
		opacity : 0,
		vaultNum : 1,
		vaultName : 'Test',
		portfolioName : 'Test',
		portfolioId : 1
	});

	self.prepare = function(e) {
		self.vaultNum = e.vaultNum;
		self.vaultName = e.vaultName;
		self.portfolioName = e.portfolioName;
		self.portfolioId = e.portfolioId;
		folderOverlay.opacity = 1;
		for ( i = 0; i < mietfArray.length; i++) {
			animation.fadeIn(mietfArray[i]);
		}

	};

	self.fanOut = function(e) {
		Ti.App.fireEvent('removeAnimationImage', {});
		//is mietfArray the correct length?
		//if no, that suggests that Add New has been clicked.
		//if so, don't do this fanout.
		var NewMietfRS = getMietfs();
		if ((NewMietfRS.length + 2) > mietfArray.length) {
			//don't do this fanout, instead:
			Ti.App.fireEvent('upAndOver', {
				vaultNum : self.vaultNum
			});
			return;
		}

		self.vaultNum = e.vaultNum;
		self.portfolioName = e.portfolioName;
		folderOverlay.opacity = 1;
		if (mietfArray.length > 5) {
			for ( i = 0; i < mietfArray.length; i++) {//not all
				mietfArray[i].opacity = 1;
			}

			for ( i = 1; i <= savedArrayIndex - savedIndex; i++) {//dragArrays aren't moved somehow - but doesn't seem to harm
				mietfArray[i].opacity = 0;
				mietfArray[i].top = mietf.miPoints[0].top - self.top;
				mietfArray[i].left = mietf.miPoints[0].left - self.left;
			}
		} else {
			for ( i = 0; i < mietfArray.length; i++) {//not all
				mietfArray[i].showTitle();
				mietfArray[i].opacity = 1;
			}
		}

		var coverLeft = mietf.mietfPoints[Math.min(mietfArray.length - 1, 5)].left;
		var coverTop = mietf.mietfPoints[Math.min(mietfArray.length - 1, 5)].top;

		var goRightUp2 = Ti.UI.createAnimation({//can't always be 5, must respect the array length
			left : coverLeft - self.left,
			top : coverTop - self.top,
			duration : mietf.animFanOutSpeed
		});

		//fadeTitleIn

		goRightUp2.addEventListener('complete', function(e) {//
            Ti.API.info(' goRightUp2 complete 1');
            parent.showSettingsIcon();
			if (mietfArray.length > 5) {
				for ( i = 1; i <= savedArrayIndex - savedIndex; i++) {//dragArrays aren't moved somehow - but doesn't seem to harm
					mietfArray[i].opacity = 1;
				}

				mietfArray[savedArrayIndex - savedIndex + 4].showTitle();
				mietfArray[savedArrayIndex - savedIndex + 3].showTitle();
				mietfArray[savedArrayIndex - savedIndex + 2].showTitle();
				mietfArray[savedArrayIndex - savedIndex + 1].showTitle();
			}
			mietf.titleControl.fadeTitleIn();
			//Ti.App.fireEvent('removeAnimationImage', {});
			Ti.App.fireEvent('maskMode', {});
		});

		if (mietfArray.length == 4) {
			mietfArray[1].animate({
				left : (mietf.mietfPoints[2].left - self.left),
				top : (mietf.mietfPoints[2].top - self.top),
				duration : mietf.animFanOutSpeed,
				delay : mietf.animFanOutSpeed
			});
		}

		if (mietfArray.length == 5) {
			mietfArray[2].animate({
				left : (mietf.mietfPoints[2].left - self.left),
				top : (mietf.mietfPoints[2].top - self.top),
				duration : mietf.animFanOutSpeed,
				delay : mietf.animFanOutSpeed / 3
			});
			mietfArray[1].animate({
				left : (mietf.mietfPoints[3].left - self.left),
				top : (mietf.mietfPoints[3].top - self.top),
				duration : mietf.animFanOutSpeed,
				delay : mietf.animFanOutSpeed / 2
			});

		}

		if (mietfArray.length > 5) {
			mietfArray[(savedArrayIndex - savedIndex + 3)].animate({
				left : (mietf.mietfPoints[2].left - self.left),
				top : (mietf.mietfPoints[2].top - self.top),
				duration : mietf.animFanOutSpeed,
				delay : mietf.animFanOutSpeed / 4
			});
			mietfArray[(savedArrayIndex - savedIndex + 2)].animate({
				left : (mietf.mietfPoints[3].left - self.left),
				top : (mietf.mietfPoints[3].top - self.top),
				duration : mietf.animFanOutSpeed,
				delay : mietf.animFanOutSpeed / 3
			});
			mietfArray[(savedArrayIndex - savedIndex + 1)].animate({
				left : (mietf.mietfPoints[4].left - self.left),
				top : (mietf.mietfPoints[4].top - self.top),
				duration : mietf.animFanOutSpeed,
				delay : mietf.animFanOutSpeed / 2
			});

		}

		mietfArray[0].animate(goRightUp2);

	};

	var i = [];
	var mietfArray = [];
	var dragArray = [];

	var folderOverlay = [];
	var DragView = require('mietfDragView');

	Ti.App.addEventListener('upAndOver', function(e) {
		Ti.API.info('upAndOver called');
		mietf.isAnimating = false;
		//because the view isn't animating any more.
		self.opacity = 1;
		self.vaultNum = e.vaultNum;
		vaultNum = e.vaultNum;
		mietf.source.vaultNum = e.vaultNum;

		//remove dragArray

		for ( i = 0; i < dragArray.length; i++) {
			self.remove(dragArray[i]);
		}

		//remove mietfArray
		for ( i = 0; i < mietfArray.length; i++) {
			self.remove(mietfArray[i]);
		}

		mietfArray = [];
		dragArray = [];
		var MietfRS = getMietfs();

		var MietfButton = require('mietfButton');

		//Add New
		mietfArray[0] = new MietfButton({
			arrayIndex : 0,
			parent : self,
			width : 129,
			height : 176,
			left : mietf.mietfPoints[0].left,
			top : mietf.mietfPoints[0].top,
			zIndex : 2000,
			image : 'images/ifapps/paperBack.pn8',
			opacity : 0,
			isAddNew : true,
			isCover : false
		});
		dragArray[0] = new DragView({
			arrayIndex : 0,
			parent : self,
			width : 129,
			height : 176,
			left : mietf.mietfPoints[0].left,
			top : mietf.mietfPoints[0].top,
			zIndex : 3000,
			image : 'images/ifapps/paperBack.pn8',
			opacity : 0,
			isAddNew : true,
			isCover : false
		});
		dragArray[0].pos = 0;

		for ( j = 0; j < MietfRS.length; j++)//for (j=0; j< Math.min(MietfRS.length, 4); j++)
		{
			var label = '';
			if (MietfRS.length > 4)
				label = (j + 1) + '/' + MietfRS.length;
			mietfArray[j + 1] = new MietfButton({
				arrayIndex : j + 1,
				parent : self,
				width : 129,
				height : 176,
				left : mietf.mietfPoints[0].left,
				top : mietf.mietfPoints[0].top,
				zIndex : 500 - (j * 2),
				image : MietfRS[j].iconImg,
				opacity : 0,
				isAddNew : false,
				isCover : false,
				mietfName : MietfRS[j].MiETFName,
				label : label,
				mietfID : MietfRS[j].ETFId,
				vaultNum : self.vaultNum,
				vaultName : self.vaultName
			});
			dragArray[j + 1] = new DragView({
				arrayIndex : j + 1,
				parent : self,
				width : 129,
				height : 176,
				left : mietf.mietfPoints[0].left,
				top : mietf.mietfPoints[0].top,
				zIndex : 1500 - (j * 2),
				image : MietfRS[j].iconImg,
				opacity : 0,
				isAddNew : false,
				isCover : false,
				mietfName : MietfRS[j].MiETFName,
				label : label,
				mietfID : MietfRS[j].ETFId,
				vaultNum : self.vaultNum,
				vaultName : self.vaultName
			});
			dragArray[j + 1].pos = j + 1;
		}

		//Cover Page
		mietfArray[MietfRS.length + 1] = new MietfButton({
			arrayIndex : MietfRS.length + 1,
			parent : self,
			width : 129,
			height : 176,
			left : mietf.mietfPoints[0].left,
			top : mietf.mietfPoints[0].top,
			zIndex : 100 - (MietfRS.length),
			image : 'images/ifapps/exampleSample.pn8',
			opacity : 0,
			isAddNew : false,
			isCover : true,
			coverText : self.portfolioName + ' Portfolio'
		});
		//self.portfolioName+ ' Portfolio'});
		dragArray[MietfRS.length + 1] = new DragView({
			arrayIndex : MietfRS.length + 1,
			parent : self,
			width : 129,
			height : 176,
			left : mietf.mietfPoints[0].left,
			top : mietf.mietfPoints[0].top,
			zIndex : 1100 - (MietfRS.length),
			image : 'images/ifapps/exampleSample.pn8',
			opacity : 0,
			isAddNew : false,
			isCover : true,
			coverText : self.portfolioName + ' Portfolio ' + 'Notes'
		});
		//self.portfolioName+ ' Portfolio'});
		dragArray[MietfRS.length + 1].pos = 5;

		folderOverlay = Ti.UI.createImageView({
			image : 'images/folders/' + mietf.vaultColorDictionary[vaultNum - 1].name + '-cover.pn8',
			width : 133,
			height : 53,
			left : 39, //here
			top : 520, //here
			zIndex : 5260
		});

		//first add
		self.add(folderOverlay);

		for ( j = 0; j < mietfArray.length; j++) {
			self.add(mietfArray[j]);
			dragArray[j].addEventListener('touchstart', handleTouchStart);
			dragArray[j].addEventListener('touchmove', handleTouchMove);
			dragArray[j].addEventListener('touchend', handleTouchEnd);
			self.add(dragArray[j]);
		}

		var coverPageAnimation = Ti.UI.createAnimation({
			duration : mietf.animUpAndOverCoverPage,
			opacity : 1
		});
		coverPageAnimation.addEventListener('complete', function(e) {
			Ti.API.info(' coverPageAnimation complete');
			for ( j = 0; j < Math.min(mietfArray.length - 1, 5); j++) {//only turn on the one's going for the ride'
				mietfArray[j].opacity = 1;
			}
			mietfArray[mietfArray.length - 1].opacity = 1;
			//also turn on Notes

		});

		mietfArray[0].animate(coverPageAnimation);

		var goUp = Ti.UI.createAnimation({
			top : 328,
			duration : 396
		});

		var goUp2 = Ti.UI.createAnimation({
			top : 328,
			duration : 396
		});

		goUp2.addEventListener('complete', goUpStepDone);
        Ti.API.info(' goUp2 complete');
		if (mietfArray.length == 3) {
			mietfArray[1].animate(goUp);
		}

		if (mietfArray.length == 4) {
			mietfArray[1].animate(goUp);
			mietfArray[2].animate(goUp);
		}

		if (mietfArray.length == 5) {
			mietfArray[1].animate(goUp);
			mietfArray[2].animate(goUp);
			mietfArray[3].animate(goUp);
		}

		if (mietfArray.length > 5) {
			mietfArray[1].animate(goUp);
			mietfArray[2].animate(goUp);
			mietfArray[3].animate(goUp);
			mietfArray[4].animate(goUp);
		}

		mietfArray[0].animate(goUp2);
		//add new

		var goLeft = Ti.UI.createAnimation({
			left : 22,
			duration : mietf.animUpAndOverGoLeft
		});

		var goLeft2 = Ti.UI.createAnimation({
			left : 22,
			duration : mietf.animUpAndOverGoLeft
		});

		goLeft2.addEventListener('complete', goLeftStepDone);

		function goUpStepDone(e) {
			Ti.API.info('goUpStepDone complete');
			if (mietfArray.length == 3) {
				mietfArray[1].animate(goLeft);
			}

			if (mietfArray.length == 4) {
				mietfArray[1].animate(goLeft);
				mietfArray[2].animate(goLeft);
			}

			if (mietfArray.length == 5) {
				mietfArray[1].animate(goLeft);
				mietfArray[2].animate(goLeft);
				mietfArray[3].animate(goLeft);
			}

			if (mietfArray.length > 5) {
				mietfArray[1].animate(goLeft);
				mietfArray[2].animate(goLeft);
				mietfArray[3].animate(goLeft);
				mietfArray[4].animate(goLeft);
			}
			mietfArray[0].animate(goLeft2);
		};

		var goRight = Ti.UI.createAnimation({
			left : 153,
			duration : mietf.animUpAndOverGoRight
		});

		var goRight2 = Ti.UI.createAnimation({
			left : 153,
			duration : mietf.animUpAndOverGoRight
		});

		goRight2.addEventListener('complete', goRightStepDone);

		function goLeftStepDone(e) {
			if (mietfArray.length == 3) {
				mietfArray[1].animate(goRight);
			}

			if (mietfArray.length == 4) {
				mietfArray[1].animate(goRight);
				mietfArray[2].animate(goRight);
			}

			if (mietfArray.length == 5) {
				mietfArray[1].animate(goRight);
				mietfArray[2].animate(goRight);
				mietfArray[3].animate(goRight);
			}

			if (mietfArray.length > 5) {
				mietfArray[1].animate(goRight);
				mietfArray[2].animate(goRight);
				mietfArray[3].animate(goRight);
				mietfArray[4].animate(goRight);
			}
			mietfArray[0].animate(goRight2);
		};

		var point = 6 - mietfArray.length;
		if (mietfArray.length > 5)
			point = 0;

		var goRightUp2 = Ti.UI.createAnimation({
			left : mietf.miPoints[point].left - self.left, //353 don't change, length still determines where
			top : mietf.miPoints[point].top - self.top, //196,
			duration : mietf.animFanOutSpeed
		});

		function goRightStepDone(e) {
			Ti.API.info('goRightStepDone complete');
			if (mietfArray.length == 3) {
				//nothing
			}

			if (mietfArray.length == 4) {//2 is
				mietfArray[1].animate({
					left : (mietf.mietfPoints[2].left - self.left),
					top : (mietf.mietfPoints[2].top - self.top),
					duration : mietf.animFanOutSpeed,
					delay : mietf.animFanOutSpeed
				});
			}

			if (mietfArray.length == 5) {// 3 is
				mietfArray[2].animate({
					left : (mietf.mietfPoints[2].left - self.left),
					top : (mietf.mietfPoints[2].top - self.top),
					duration : mietf.animFanOutSpeed,
					delay : mietf.animFanOutSpeed / 2
				});
				mietfArray[1].animate({
					left : (mietf.mietfPoints[3].left - self.left),
					top : (mietf.mietfPoints[3].top - self.top),
					duration : mietf.animFanOutSpeed,
					delay : mietf.animFanOutSpeed / 3
				});

			}

			if (mietfArray.length > 5) {//4 is
				mietfArray[3].animate({
					left : (mietf.mietfPoints[2].left - self.left),
					top : (mietf.mietfPoints[2].top - self.top),
					duration : mietf.animFanOutSpeed,
					delay : mietf.animFanOutSpeed / 2
				});
				mietfArray[2].animate({
					left : (mietf.mietfPoints[3].left - self.left),
					top : (mietf.mietfPoints[3].top - self.top),
					duration : mietf.animFanOutSpeed,
					delay : mietf.animFanOutSpeed / 3
				});
				mietfArray[1].animate({
					left : (mietf.mietfPoints[4].left - self.left),
					top : (mietf.mietfPoints[4].top - self.top),
					duration : mietf.animFanOutSpeed,
					delay : mietf.animFanOutSpeed / 4
				});

			}

			/*
			 for (j=2; j < mietfArray.length-1; j++) { //
			 mietfArray[j].animate({delay: mietf.animFanOutSpeed/j, duration: mietf.animFanOutSpeed, top: mietf.mietfPoints[j].top - self.top , left: mietf.mietfPoints[j].left - self.left});
			 }
			 */
			mietfArray[0].animate(goRightUp2);

			//for (x=0; x < 10000000; x=x+.0001) {};

		};

		goRightUp2.addEventListener('complete', function(e) {
			Ti.API.info('goRightUp2 complete 2');
			mietf.titleControl.fadeTitleIn();
			parent.showSettingsIcon();

			for ( i = 5; i < mietfArray.length - 1; i++) {//this is everything above 5, or nothing in most cases

				mietfArray[i].left = 368 - self.left;
				mietfArray[i].top = 432 - self.top;
				dragArray[i].left = 368 - self.left;
				dragArray[i].top = 432 - self.top;

				animation.fadeIn(mietfArray[i]);

			}

			if (mietfArray.length == 3) {
				mietfArray[1].fadeInText();
			}

			if (mietfArray.length == 4) {
				mietfArray[1].fadeInText();
				mietfArray[2].fadeInText();
			}

			if (mietfArray.length == 5) {
				mietfArray[1].fadeInText();
				mietfArray[2].fadeInText();
				mietfArray[3].fadeInText();
			}

			if (mietfArray.length > 5) {
				mietfArray[1].fadeInText();
				mietfArray[2].fadeInText();
				mietfArray[3].fadeInText();
				mietfArray[4].fadeInText();
			}
		});

		for ( i = 0; i < Math.min(dragArray.length, 6); i++) {//limited to 5 because of miPoints length

			var adj = 6 - Math.min(dragArray.length, 6);

			dragArray[i].top = mietf.miPoints[Math.abs(i + adj)].top - self.top;
			dragArray[i].left = mietf.miPoints[Math.abs(i + adj)].left - self.left;

		}

		for ( i = 0; i < mietfArray.length; i++) {

			mietfArray[i].virtX = i * 112;
			mietfArray[i].virtY = i * 64;
		}
		//right 100
		//up 66
	});

	/////////////touch handlers
	var allowTouch = true;
	var didAnyMove = false;
	var offset = {};
	var currentMietf = 0;
	var leftIncrement = 112;
	var topIncrement = 64;
	var change = 0;

	function handleTouchStart(e) {
		Ti.API.info('page button touchstart ' + _args.mietfID);
		if (allowTouch) {
			didAnyMove = false;
			allowTouch = false;
			currentMietf = e.source.i;

			offset.x = e.x;
			offset.y = e.y;

		}

	};

	var lastChange = 0;
	var momentum = 0;
	var tmDt1 = new Date();
	var tmDt2 = new Date();
	var dates = new Array();
	var dtSw = 0;

	function handleTouchMove(e) {
		Ti.API.info('page button touchmove ' + _args.mietfID);
		didAnyMove = true;

		var changeX = e.x - offset.x;
		var changeY = e.y - offset.y;
		change = ((changeX / 2) - (changeY / 2));
		momentum = change - lastChange;
		if (dtSw) {
			dtSw = 0;
			tmDt2 = new Date();
		} else {
			dtSw = 1;
			tmDt1 = new Date();
		}

		lastChange = change;

		var percentTravel = (change / 516) * 1.4;

		for (var i = 0; i < mietfArray.length - 1; i++) {//-1 because last on stack is "Notes", it doesn't move

			var adj = Math.min(mietfArray.length - 1, 5);
			//the numbers must come from adjust
			//must also respect if you are not on the start...

			var newLeft = Math.min(Math.max((mietf.mietfPoints[adj].left - mietfArray[i].virtX + (percentTravel * 448) - self.left), 368 - self.left), mietf.mietfPoints[adj].left - self.left);
			var newTop = Math.min(Math.max((mietf.mietfPoints[adj].top + mietfArray[i].virtY - (percentTravel * 256) - self.top), mietf.mietfPoints[adj].top - self.top), 432 - self.top);
			//alert(newLeft);

			//don't hide the very last one'

			if (newLeft == (mietf.mietfPoints[adj].left - self.left) && i == mietfArray.length - 2) {
				newLeft = newLeft - 1;
				newTop = newTop + 1;
			}
			mietfArray[i].left = newLeft;
			mietfArray[i].top = newTop;

			//213
			if (newLeft == (mietf.mietfPoints[adj].left - self.left) || newLeft == 155) {
				mietfArray[i + 1].hideTitle();
			} else {
				mietfArray[i].showTitle();
			} //this may be inefficient, if so, change only if different

		}

	};

	function handleTouchEnd(e) {
		Ti.API.info('page button touchend ' + _args.mietfID);
		if (didAnyMove == false) {
			return;
		}
		if (dtSw) {
			dtSw = 0;
			tmDt2 = new Date();
		} else {
			dtSw = 1;
			tmDt1 = new Date();
		}

		var correctedMomentum = momentum;

		if ((Math.abs(tmDt1.getTime() - tmDt2.getTime())) > 100)
			correctedMomentum = 0;
		//person stopped

		//positiv is moving to the right
		//negative is moving to the left .5 and 1.0 is normal

		leftCheck = mietf.miPoints[0].left - self.left;

		if (mietfArray.length < 6)
			leftCheck = 1024;
		//always snap back into place if smaller

		if (mietfArray[0].left < leftCheck) {

			if (mietfArray.length > 2)
				mietfArray[1].showTitle();
			if (mietfArray.length > 3)
				mietfArray[2].showTitle();
			if (mietfArray.length > 4)
				mietfArray[3].showTitle();
			if (mietfArray.length > 5)
				mietfArray[4].showTitle();

			if (mietfArray.length > 5) {

				var zeroAnim = Ti.UI.createAnimation({
					left : mietf.miPoints[0].left - self.left,
					top : mietf.miPoints[0].top - self.top,
					duration : 200
				});
				zeroAnim.addEventListener('complete', function(e) {
					Ti.API.info('zeroAnim complete');
					dragArray[0].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[0].left - self.left,
						top : mietf.miPoints[0].top - self.top,
						duration : 20
					}));
					dragArray[1].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[1].left - self.left,
						top : mietf.miPoints[1].top - self.top,
						duration : 20
					}));
					dragArray[2].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[2].left - self.left,
						top : mietf.miPoints[2].top - self.top,
						duration : 20
					}));
					dragArray[3].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[3].left - self.left,
						top : mietf.miPoints[3].top - self.top,
						duration : 20
					}));
					dragArray[4].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[4].left - self.left,
						top : mietf.miPoints[4].top - self.top,
						duration : 20
					}));
					dragArray[0].pos = 0;
					dragArray[1].pos = 1;
					dragArray[2].pos = 2;
					dragArray[3].pos = 3;
					dragArray[4].pos = 4;

					for ( j = 5; j < mietfArray.length - 1; j++) {
						dragArray[j].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[4].left - self.left,
							top : mietf.miPoints[4].top - self.top,
							duration : 20
						}));
						dragArray[j].pos = 4;
					}
					resetVirtPos();
				});

				mietfArray[0].animate(zeroAnim);
				mietfArray[1].animate(Ti.UI.createAnimation({
					left : mietf.miPoints[1].left - self.left,
					top : mietf.miPoints[1].top - self.top,
					duration : 220
				}));
				mietfArray[2].animate(Ti.UI.createAnimation({
					left : mietf.miPoints[2].left - self.left,
					top : mietf.miPoints[2].top - self.top,
					duration : 220
				}));
				mietfArray[3].animate(Ti.UI.createAnimation({
					left : mietf.miPoints[3].left - self.left,
					top : mietf.miPoints[3].top - self.top,
					duration : 220
				}));
				mietfArray[4].animate(Ti.UI.createAnimation({
					left : mietf.miPoints[4].left - self.left,
					top : mietf.miPoints[4].top - self.top,
					duration : 220
				}));
			}

			if (mietfArray.length == 5) {

				var zeroAnim = Ti.UI.createAnimation({
					left : mietf.miPoints[1].left - self.left,
					top : mietf.miPoints[1].top - self.top,
					duration : 200
				});
				zeroAnim.addEventListener('complete', function(e) {
					Ti.API.info('zeroAnim1 complete');
					dragArray[0].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[1].left - self.left,
						top : mietf.miPoints[1].top - self.top,
						duration : 20
					}));
					dragArray[1].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[2].left - self.left,
						top : mietf.miPoints[2].top - self.top,
						duration : 20
					}));
					dragArray[2].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[3].left - self.left,
						top : mietf.miPoints[3].top - self.top,
						duration : 20
					}));
					dragArray[3].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[4].left - self.left,
						top : mietf.miPoints[4].top - self.top,
						duration : 20
					}));
					dragArray[0].pos = 0;
					dragArray[1].pos = 1;
					dragArray[2].pos = 2;
					dragArray[3].pos = 3;
					resetVirtPos();

				});

				mietfArray[0].animate(zeroAnim);
				mietfArray[1].animate(Ti.UI.createAnimation({
					left : mietf.miPoints[2].left - self.left,
					top : mietf.miPoints[2].top - self.top,
					duration : 220
				}));
				mietfArray[2].animate(Ti.UI.createAnimation({
					left : mietf.miPoints[3].left - self.left,
					top : mietf.miPoints[3].top - self.top,
					duration : 220
				}));
				mietfArray[3].animate(Ti.UI.createAnimation({
					left : mietf.miPoints[4].left - self.left,
					top : mietf.miPoints[4].top - self.top,
					duration : 220
				}));
			}

			if (mietfArray.length == 4) {

				var zeroAnim = Ti.UI.createAnimation({
					left : mietf.miPoints[2].left - self.left,
					top : mietf.miPoints[2].top - self.top,
					duration : 200
				});
				zeroAnim.addEventListener('complete', function(e) {
					Ti.API.info('zeroAnim2 complete');
					dragArray[0].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[2].left - self.left,
						top : mietf.miPoints[2].top - self.top,
						duration : 20
					}));
					dragArray[1].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[3].left - self.left,
						top : mietf.miPoints[3].top - self.top,
						duration : 20
					}));
					dragArray[2].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[4].left - self.left,
						top : mietf.miPoints[4].top - self.top,
						duration : 20
					}));
					dragArray[0].pos = 0;
					dragArray[1].pos = 1;
					dragArray[2].pos = 2;

				});

				mietfArray[0].animate(zeroAnim);
				mietfArray[1].animate(Ti.UI.createAnimation({
					left : mietf.miPoints[3].left - self.left,
					top : mietf.miPoints[3].top - self.top,
					duration : 220
				}));
				mietfArray[2].animate(Ti.UI.createAnimation({
					left : mietf.miPoints[4].left - self.left,
					top : mietf.miPoints[4].top - self.top,
					duration : 220
				}));
			}

			if (mietfArray.length == 3) {

				var zeroAnim = Ti.UI.createAnimation({
					left : mietf.miPoints[3].left - self.left,
					top : mietf.miPoints[3].top - self.top,
					duration : 200
				});
				zeroAnim.addEventListener('complete', function(e) {
					Ti.API.info('zeroAnim3 complete');
					dragArray[0].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[3].left - self.left,
						top : mietf.miPoints[3].top - self.top,
						duration : 20
					}));
					dragArray[1].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[4].left - self.left,
						top : mietf.miPoints[4].top - self.top,
						duration : 20
					}));
					dragArray[0].pos = 0;
					dragArray[1].pos = 1;

				});

				mietfArray[0].animate(zeroAnim);
				mietfArray[1].animate(Ti.UI.createAnimation({
					left : mietf.miPoints[4].left - self.left,
					top : mietf.miPoints[4].top - self.top,
					duration : 220
				}));
			}

		} else {//every situation is handled above (leftCheck or any small mietfArray)

			if (mietfArray.length > 5) {

				var last;
				//first are you dealing with 4 or 5?
				var cnt = 0;
				for ( i = 0; i < mietfArray.length; i++) {
					if (mietfArray[i].isTitleOn()) {
						cnt++;
						last = i;
					}
				}

				Ti.API.info('cnt: ' + cnt + ', mietfArray.length: ' + mietfArray.length + ', momentum: ' + momentum);

				//if 5 depends on direction of change//change is overall///need really "last change"
				if (cnt == 5 && momentum < 0) {

					//do something
					var fourAnim = Ti.UI.createAnimation({
						left : mietf.miPoints[4].left - self.left,
						top : mietf.miPoints[4].top - self.top,
						duration : 200
					});
					fourAnim.addEventListener('complete', function(e) {
						Ti.API.info('fourAnim complete');
						dragArray[last - 4].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[1].left - self.left,
							top : mietf.miPoints[1].top - self.top,
							duration : 20
						}));
						dragArray[last - 3].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[2].left - self.left,
							top : mietf.miPoints[2].top - self.top,
							duration : 20
						}));
						dragArray[last - 2].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[3].left - self.left,
							top : mietf.miPoints[3].top - self.top,
							duration : 20
						}));
						dragArray[last - 1].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[4].left - self.left,
							top : mietf.miPoints[4].top - self.top,
							duration : 20
						}));
						//dragArray[last].animate(Ti.UI.createAnimation({left: mietf.miPoints[4].left-self.left, top: mietf.miPoints[4].top-self.top, duration: 20 }));
						dragArray[last - 4].pos = 1;
						dragArray[last - 3].pos = 2;
						dragArray[last - 2].pos = 3;
						dragArray[last - 1].pos = 4;
						//dragArray[last].pos=4;
						mietfArray[last - 4].showTitle();
						mietfArray[last].hideTitle();
						resetVirtPos();

						for ( j = last - 5; j >= 0; j--) {
							dragArray[j].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[0].left - self.left,
								top : mietf.miPoints[0].top - self.top,
								duration : 20
							}));
							dragArray[j].pos = 0;
						}

						for ( j = last; j < mietfArray.length - 1; j++) {
							dragArray[j].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[4].left - self.left,
								top : mietf.miPoints[4].top - self.top,
								duration : 20
							}));
							dragArray[j].pos = 4;
						}
					});

					mietfArray[last - 4].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[1].left - self.left,
						top : mietf.miPoints[1].top - self.top,
						duration : 220
					}));
					mietfArray[last - 3].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[2].left - self.left,
						top : mietf.miPoints[2].top - self.top,
						duration : 220
					}));
					mietfArray[last - 2].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[3].left - self.left,
						top : mietf.miPoints[3].top - self.top,
						duration : 220
					}));
					mietfArray[last - 1].animate(fourAnim);
					//mietfArray[last].animate(fourAnim);

				}

				if (cnt == 5 && momentum > 0) {
					var zeroAnim = Ti.UI.createAnimation({
						left : mietf.miPoints[0].left - self.left,
						top : mietf.miPoints[0].top - self.top,
						duration : 200
					});
					zeroAnim.addEventListener('complete', function(e) {
						Ti.API.info('zeroAnim 5 complete');
						dragArray[last - 4].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[0].left - self.left,
							top : mietf.miPoints[0].top - self.top,
							duration : 20
						}));
						dragArray[last - 3].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[1].left - self.left,
							top : mietf.miPoints[1].top - self.top,
							duration : 20
						}));
						dragArray[last - 2].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[2].left - self.left,
							top : mietf.miPoints[2].top - self.top,
							duration : 20
						}));
						dragArray[last - 1].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[3].left - self.left,
							top : mietf.miPoints[3].top - self.top,
							duration : 20
						}));
						dragArray[last].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[4].left - self.left,
							top : mietf.miPoints[4].top - self.top,
							duration : 20
						}));
						dragArray[last - 4].pos = 0;
						dragArray[last - 3].pos = 1;
						dragArray[last - 2].pos = 2;
						dragArray[last - 1].pos = 3;
						dragArray[last].pos = 4;
						mietfArray[last - 4].hideTitle();
						resetVirtPos();

						for ( j = last - 5; j >= 0; j--) {
							dragArray[j].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[0].left - self.left,
								top : mietf.miPoints[0].top - self.top,
								duration : 20
							}));
							dragArray[j].pos = 0;
						}

						for ( j = last; j < mietfArray.length - 1; j++) {
							dragArray[j].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[4].left - self.left,
								top : mietf.miPoints[4].top - self.top,
								duration : 20
							}));
							dragArray[j].pos = 4;
						}
					});

					mietfArray[last - 4].animate(zeroAnim);
					mietfArray[last - 3].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[1].left - self.left,
						top : mietf.miPoints[1].top - self.top,
						duration : 220
					}));
					mietfArray[last - 2].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[2].left - self.left,
						top : mietf.miPoints[2].top - self.top,
						duration : 220
					}));
					mietfArray[last - 1].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[3].left - self.left,
						top : mietf.miPoints[3].top - self.top,
						duration : 220
					}));
					mietfArray[last].animate(Ti.UI.createAnimation({
						left : mietf.miPoints[4].left - self.left,
						top : mietf.miPoints[4].top - self.top,
						duration : 220
					}));
				}

				if (cnt < 5) {

					//cnt: 4, mietfArray.length: 9, momentum: 4.75
					var adj = 0;
					if (momentum > 0) {
						if ((last + 2) == mietfArray.length) {
							adj = 1;
						}

						var oneAnim = Ti.UI.createAnimation({
							left : mietf.miPoints[0 + adj].left - self.left,
							top : mietf.miPoints[0 + adj].top - self.top,
							duration : 220
						});
						oneAnim.addEventListener('complete', function(e) {
							Ti.API.info('oneAnim complete');
							dragArray[last - 3].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[0 + adj].left - self.left,
								top : mietf.miPoints[0 + adj].top - self.top,
								duration : 20
							}));
							dragArray[last - 2].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[1 + adj].left - self.left,
								top : mietf.miPoints[1 + adj].top - self.top,
								duration : 20
							}));
							dragArray[last - 1].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[2 + adj].left - self.left,
								top : mietf.miPoints[2 + adj].top - self.top,
								duration : 20
							}));
							dragArray[last].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[3 + adj].left - self.left,
								top : mietf.miPoints[3 + adj].top - self.top,
								duration : 20
							}));
							//dragArray[last].animate(Ti.UI.createAnimation({left: mietf.miPoints[4].left-self.left, top: mietf.miPoints[4].top-self.top, duration: 20 }));
							dragArray[last - 3].pos = 0 + adj;
							dragArray[last - 2].pos = 1 + adj;
							dragArray[last - 1].pos = 2 + adj;
							dragArray[last].pos = 3 + adj;
							//dragArray[last].pos=4;

							if (adj == 0) {
								mietfArray[last - 3].hideTitle();
								mietfArray[last - 2].showTitle();
								mietfArray[last - 1].showTitle();
								mietfArray[last].showTitle();
								mietfArray[last + 1].showTitle();
							} else {
								mietfArray[last - 3].showTitle();
								mietfArray[last - 2].showTitle();
								mietfArray[last - 1].showTitle();
								mietfArray[last].showTitle();

							}

							resetVirtPos();
						});

						mietfArray[last - 3].animate(oneAnim);
						mietfArray[last - 2].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[1 + adj].left - self.left,
							top : mietf.miPoints[1 + adj].top - self.top,
							duration : 220
						}));
						mietfArray[last - 1].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[2 + adj].left - self.left,
							top : mietf.miPoints[2 + adj].top - self.top,
							duration : 220
						}));
						mietfArray[last].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[3 + adj].left - self.left,
							top : mietf.miPoints[3 + adj].top - self.top,
							duration : 220
						}));
						for ( j = last - 4; j >= 0; j--) {
							dragArray[j].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[0].left - self.left,
								top : mietf.miPoints[0].top - self.top,
								duration : 20
							}));
							dragArray[j].pos = 0;
						}

						for ( j = last + 1; j < mietfArray.length - 1; j++) {
							dragArray[j].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[4].left - self.left,
								top : mietf.miPoints[4].top - self.top,
								duration : 20
							}));
							dragArray[j].pos = 4;
						}

					} else {
						//rarely will be here
						//do something
						if ((last + 2) == mietfArray.length) {
							adj = 1;
						}

						var fourAnim = Ti.UI.createAnimation({
							left : mietf.miPoints[4].left - self.left,
							top : mietf.miPoints[4].top - self.top,
							duration : 200
						});
						fourAnim.addEventListener('complete', function(e) {
							Ti.API.info('fourAnim complete');
							dragArray[last - 4 + adj].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[1].left - self.left,
								top : mietf.miPoints[1].top - self.top,
								duration : 20
							}));
							dragArray[last - 3 + adj].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[2].left - self.left,
								top : mietf.miPoints[2].top - self.top,
								duration : 20
							}));
							dragArray[last - 2 + adj].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[3].left - self.left,
								top : mietf.miPoints[3].top - self.top,
								duration : 20
							}));
							dragArray[last - 1 + adj].animate(Ti.UI.createAnimation({
								left : mietf.miPoints[4].left - self.left,
								top : mietf.miPoints[4].top - self.top,
								duration : 20
							}));
							//dragArray[last].animate(Ti.UI.createAnimation({left: mietf.miPoints[4].left-self.left, top: mietf.miPoints[4].top-self.top, duration: 20 }));
							dragArray[last - 4 + adj].pos = 1;
							dragArray[last - 3 + adj].pos = 2;
							dragArray[last - 2 + adj].pos = 3;
							dragArray[last - 1 + adj].pos = 4;
							//dragArray[last].pos=4;
							mietfArray[last - 4 + adj].showTitle();
							if (!adj)
								mietfArray[last].hideTitle();
							resetVirtPos();

							for ( j = last - 5 + adj; j >= 0; j--) {
								dragArray[j].animate(Ti.UI.createAnimation({
									left : mietf.miPoints[0].left - self.left,
									top : mietf.miPoints[0].top - self.top,
									duration : 20
								}));
								dragArray[j].pos = 0;
							}

							for ( j = last; j < mietfArray.length - 1; j++) {
								dragArray[j].animate(Ti.UI.createAnimation({
									left : mietf.miPoints[4].left - self.left,
									top : mietf.miPoints[4].top - self.top,
									duration : 20
								}));
								dragArray[j].pos = 4;
							}
						});

						mietfArray[last - 4 + adj].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[1].left - self.left,
							top : mietf.miPoints[1].top - self.top,
							duration : 220
						}));
						mietfArray[last - 3 + adj].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[2].left - self.left,
							top : mietf.miPoints[2].top - self.top,
							duration : 220
						}));
						mietfArray[last - 2 + adj].animate(Ti.UI.createAnimation({
							left : mietf.miPoints[3].left - self.left,
							top : mietf.miPoints[3].top - self.top,
							duration : 220
						}));
						mietfArray[last - 1 + adj].animate(fourAnim);
						//mietfArray[last].animate(fourAnim);
						/*
						 var oneAnim = Ti.UI.createAnimation({left: mietf.miPoints[1].left-self.left, top: mietf.miPoints[1].top-self.top, duration: 220 });
						 oneAnim.addEventListener('complete', function(e) {
						 dragArray[last-4].animate(Ti.UI.createAnimation({left: mietf.miPoints[1].left-self.left, top: mietf.miPoints[1].top-self.top, duration: 20 }));
						 dragArray[last-3].animate(Ti.UI.createAnimation({left: mietf.miPoints[2].left-self.left, top: mietf.miPoints[2].top-self.top, duration: 20 }));
						 dragArray[last-2].animate(Ti.UI.createAnimation({left: mietf.miPoints[3].left-self.left, top: mietf.miPoints[3].top-self.top, duration: 20 }));
						 dragArray[last-1].animate(Ti.UI.createAnimation({left: mietf.miPoints[4].left-self.left, top: mietf.miPoints[4].top-self.top, duration: 20 }));
						 dragArray[last-3].pos=1;
						 dragArray[last-3].pos=2;
						 dragArray[last-2].pos=3;
						 dragArray[last-1].pos=4;
						 mietfArray[last-3].showTitle();
						 mietfArray[last-2].showTitle();
						 mietfArray[last-1].showTitle();
						 mietfArray[last].showTitle();
						 resetVirtPos();
						 });
						 mietfArray[last-4].animate(oneAnim);
						 mietfArray[last-3].animate(Ti.UI.createAnimation({left: mietf.miPoints[2].left-self.left, top: mietf.miPoints[2].top-self.top, duration: 220 }));
						 mietfArray[last-2].animate(Ti.UI.createAnimation({left: mietf.miPoints[3].left-self.left, top: mietf.miPoints[3].top-self.top, duration: 220 }));
						 mietfArray[last-1].animate(Ti.UI.createAnimation({left: mietf.miPoints[4].left-self.left, top: mietf.miPoints[4].top-self.top, duration: 220 }));
						 for (j=last-5; j>=0; j--) {
						 dragArray[j].animate(Ti.UI.createAnimation({left: mietf.miPoints[0].left-self.left, top: mietf.miPoints[0].top-self.top, duration: 20 }));
						 dragArray[j].pos=0;
						 }

						 for (j=last+1; j<mietfArray.length-1; j++) {
						 dragArray[j].animate(Ti.UI.createAnimation({left: mietf.miPoints[4].left-self.left, top: mietf.miPoints[4].top-self.top, duration: 20 }));
						 dragArray[j].pos=4;
						 }
						 */
					}

				}

			}
		}

		allowTouch = true;
		//check check - really don't want to turn on until after anims are complete
		offset = {};
	};

	function resetVirtPos(e) {
		var cnt = 0;
		for ( i = 0; i < dragArray.length; i++) {
			//alert('i:' + i +  ', pos:' + dragArray[i].pos);
			if (dragArray[i].pos == 1)
				cnt = i - 1;

		}

		for ( i = 0; i < mietfArray.length; i++) {
			mietfArray[i].virtX = (i - cnt) * 112;
			mietfArray[i].virtY = (i - cnt) * 64;
		}

	}

	function resetDragViews(e) {
		for (var i = 0; i < mietfArray.length; i++) {//this only works if not animating while it runs
			dragArray[i].left = mietfArray[i].left;
			dragArray[i].top = mietfArray[i].top;
		}
	};
	////////////
	Ti.App.addEventListener('removeFolder', function(e) {

		try {
			self.opacity = 0;

			for ( j = 0; j < mietfArray.length; j++) {
				self.remove(mietfArray[j]);
			}

			self.remove(folderOverlay);

		} catch (e) {

		}
	});

	var animationImage = [];
	var animationImageBoundingView = [];
	var savedIndex = 0;
	var savedArrayIndex = 0;

	self.collapseMietfSelection = function(_args) {
		Ti.API.info('self.collapseMietfSelection '+JSON.stringify(_args));
		self.opacity = 1;
		var imagePath = _args[0].imagePath;
		try {
			var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, _args[0].imagePath);
			imagePath = file.nativePath;
		} catch (e) {

		}

		animationImage.image = imagePath;

		try {
			mietfArray[_args[0].mietfSelectIndex].setImage(_args[0].imagePath, _args[0].title);
			dragArray[_args[0].mietfSelectIndex].iconImg = _args[0].imagePath;
			dragArray[_args[0].mietfSelectIndex].setName(_args[0].title);
		} catch(e) {
			//alert('find5555, error: ' + JSON.stringify(e));
		}

		animationImage.opacity = 1;
		Ti.App.fireEvent('mietfInterfaceOpacity0', {});

		var mietfButtonSmall = Titanium.UI.createAnimation();
		mietfButtonSmall.left = (mietf.miPoints[savedIndex].left - self.left - 2);
		mietfButtonSmall.top = (mietf.miPoints[savedIndex].top - self.top - 5);
		mietfButtonSmall.width = 129;
		mietfButtonSmall.height = 176;
		mietfButtonSmall.duration = 500;

		mietfButtonSmall.addEventListener('complete', function(e) {
			Ti.API.info('mietfButtonSmall complete');
			//self.remove(animationImage);
			Ti.App.fireEvent('MietfButtonClickStep2', {});
		});

		animationImage.animate(mietfButtonSmall);

		//self.remove(animationImage);
	};

	Ti.App.addEventListener('removeAnimationImage', function(e) {
		try {
			animationImageBoundingView.remove(animationImage);
			self.remove(animationImageBoundingView);
		} catch (e) {

		}

	});

	self.createNewMietf = function(_args) {
		var arrayIndex = _args.arrayIndex;
		var zIndex = _args.zIndex;
		savedIndex = dragArray[arrayIndex].pos;
		savedArrayIndex = _args.arrayIndex;
		var correctedPos = Math.max((6 - mietfArray.length), 0);

		animationImageBoundingView = Ti.UI.createView({
			top : 10,
			left : 11,
			width : 768,
			height : 544,
			zIndex : zIndex - 1
		});

		var topAdj = 5;
		var leftAdj = 2;

		if (correctedPos == 4) {
			topAdj = 7;
			leftAdj = 4;
		};

		animationImage = Ti.UI.createImageView({
			image : _args.imagePath, //'images/ifapps/paperBackFullSize.pn8',
			width : 129,
			height : 176,
			top : ((mietf.miPoints[correctedPos].top - self.top) - topAdj), //-5, verified
			left : ((mietf.miPoints[correctedPos].left - self.left) - leftAdj), //-2
			zIndex : zIndex - 1
		});

		animationImageBoundingView.add(animationImage);
		self.add(animationImageBoundingView);

		animation.fadeOut(mietfArray[arrayIndex], 300);
		//this removes title for that button, remove on others before animating

		for ( i = 0; i < mietfArray.length; i++) {
			if (i != _args.arrayIndex) {
				//animation.fadeOut(mietfArray[i], mietf.animMietfSelectFadeOut);
				mietfArray[i].hideTitle();
			}
		}

		var coverAnim = Ti.UI.createAnimation({
			delay : mietf.animFanOutSpeed / (mietfArray.length - 1),
			duration : mietf.animFanOutSpeed,
			top : mietf.mietfPoints[1].top - self.top - 2,
			left : mietf.mietfPoints[1].left - self.left - 2
		});

		coverAnim.addEventListener('complete', function(e) {
			Ti.API.info(' coverAnim complete');
			//get picture

			//var img = mietfArray[mietfArray.length-1].toImage(null, true); //(null, true);
			var snapshotNum = 1;
			if (mietfArray.length == 2)
				snapshotNum = 0;
			var img = mietfArray[snapshotNum].snapshotImg();

			addTitleV({
				img : img,
				top : mietf.mietfPoints[1].top + 3,
				left : mietf.mietfPoints[1].left + 7
			});

			//this image needs to go on top now, and then don't fade but opacity 0 the others'
			folderOverlay.opacity = 0;

			for ( i = 1; i < mietfArray.length; i++) {
				mietfArray[i].opacity = 0;
			}
			gotoSelectedMietf({
				mietfSelectIndex : arrayIndex,
				portfolioId : self.portfolioId,
				mietfID : 0,
				mietfName : '',
				vaultNum : _args.vaultNum,
				vaultName : _args.vaultName,
				top : mietf.mietfPoints[1].top,
				left : mietf.mietfPoints[1].left
			});

		});

		var snapshotNum = 1;
		if (mietfArray.length == 2)
			snapshotNum = 0;
		mietfArray[snapshotNum].animate(coverAnim);

		//check check check
		//this is wrong because you need to calculate what is actually in position 1, not assume its mietfArray-1
		for ( j = 1; j < mietfArray.length - 1; j++) {
			var delay = 500;
			if (j == 1)
				delay = 125;
			if (j == 2)
				delay = 500 / 3;
			if (j == 3)
				delay = 250;

			if (j != _args.arrayIndex)
				mietfArray[j].animate({
					delay : delay,
					duration : mietf.animFanOutSpeed,
					top : mietf.mietfPoints[1].top - self.top - 2,
					left : mietf.mietfPoints[1].left - self.left - 2
				});
		}

	};

	////////////////////////////////////////////////////////////////////////

	self.gotoMietfSelection = function(_args) {
		
		parent.hideSettingsIcon();

		var arrayIndex = _args.arrayIndex;
		var zIndex = _args.zIndex;
		savedIndex = dragArray[arrayIndex].pos;
		savedArrayIndex = _args.arrayIndex;

		animationImageBoundingView = Ti.UI.createView({
			top : 10,
			left : 11,
			width : 768,
			height : 544,
			zIndex : zIndex - 1
		});
		var topAdj = 5;
		var leftAdj = 2;

		if (arrayIndex == 4) {
			topAdj = 7;
			leftAdj = 4;
		};

		//check check check

		//
		var correctedPos = dragArray[arrayIndex].pos;
		if (mietfArray.length == 3) {
			correctedPos = 4;
			savedIndex = correctedPos;
		}

		if (mietfArray.length == 4) {
			if (arrayIndex == 1)
				correctedPos = 3;
			if (arrayIndex == 2)
				correctedPos = 4;
			savedIndex = correctedPos;
		}

		if (mietfArray.length == 5) {
			if (arrayIndex == 1)
				correctedPos = 2;
			if (arrayIndex == 2)
				correctedPos = 3;
			if (arrayIndex == 3)
				correctedPos = 4;
			savedIndex = correctedPos;
		}

		Ti.API.info(arrayIndex);
		Ti.API.info(dragArray.length);
		Ti.API.info(dragArray[arrayIndex].iconImg);
		if (dragArray[arrayIndex].iconImg) {
			var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, dragArray[arrayIndex].iconImg);
		}

		if (file && file.exists()) {
			var image = file.nativePath;
		} else {
			var image = dragArray[arrayIndex].iconImg;
		}

		animationImage = Ti.UI.createImageView({
			image : image,
			width : 129,
			height : 176,
			top : ((mietf.miPoints[correctedPos].top - self.top) - topAdj), //-5, verified
			left : ((mietf.miPoints[correctedPos].left - self.left) - leftAdj), //-2
			zIndex : zIndex - 1
		});

		animationImageBoundingView.add(animationImage);
		self.add(animationImageBoundingView);
		/*
		 for (i=0; i<10000000000; i=i+.000001) {
		 var x = 2/3;
		 };
		 */

		mietfArray[arrayIndex].opacity = 0;
		//this removes title for that button, remove on others before animating

		for ( i = 0; i < mietfArray.length; i++) {
			if (i != _args.arrayIndex) {
				//animation.fadeOut(mietfArray[i], mietf.animMietfSelectFadeOut);
				mietfArray[i].hideTitle();
			}
		}

		var coverAnim = Ti.UI.createAnimation({
			delay : mietf.animFanOutSpeed / (mietfArray.length - 1),
			duration : mietf.animFanOutSpeed,
			top : mietf.mietfPoints[1].top - self.top - 2,
			left : mietf.mietfPoints[1].left - self.left - 2
		});

		coverAnim.addEventListener('complete', function(e) {
			//get picture
			Ti.API.info(' coverAnim1 complete');
			//var img = mietfArray[mietfArray.length-1].toImage(null, true); //(null, true);
			var img = mietfArray[0].snapshotImg();

			addTitleV({
				img : img,
				top : mietf.mietfPoints[1].top + 3,
				left : mietf.mietfPoints[1].left + 7
			});

			//this image needs to go on top now, and then don't fade but opacity 0 the others'
			folderOverlay.opacity = 0;
			for ( i = 0; i < mietfArray.length; i++) {
				if (i != _args.arrayIndex) {
					//animation.fadeOut(mietfArray[i], mietf.animMietfSelectFadeOut);
					mietfArray[i].opacity = 0;
				}

			}

			gotoSelectedMietf({
				mietfSelectIndex : arrayIndex,
				portfolioId : self.portfolioId,
				mietfID : _args.mietfID,
				mietfName : _args.mietfName,
				vaultNum : _args.vaultNum,
				vaultName : _args.vaultName,
				top : mietf.mietfPoints[1].top,
				left : mietf.mietfPoints[1].left
			});
		});

		mietfArray[0].animate(coverAnim);

		//check check check
		//this is wrong because you need to calculate what is actually in position 1, not assume its mietfArray-1
		for ( j = 1; j < mietfArray.length - 1; j++) {
			var delay = 500;
			if (j == 1)
				delay = 125;
			if (j == 2)
				delay = 500 / 3;
			if (j == 3)
				delay = 250;

			if (j != _args.arrayIndex)
				mietfArray[j].animate({
					delay : delay,
					duration : mietf.animFanOutSpeed,
					top : mietf.mietfPoints[1].top - self.top - 2,
					left : mietf.mietfPoints[1].left - self.left - 2
				});
		}

	};

	self.gotoMietfSelectionPart2 = function(_args) {

		var mietfButtonLarge = Titanium.UI.createAnimation();
		mietfButtonLarge.left = 0;
		mietfButtonLarge.top = 0;
		//-277-277+9;//
		mietfButtonLarge.width = 768;
		mietfButtonLarge.height = 1088;
		mietfButtonLarge.duration = mietf.animMietfButtonLarge;

		/*
		 var mietfButtonLarge = Titanium.UI.createAnimation();
		 mietfButtonLarge.left = 96;
		 mietfButtonLarge.top = 0;
		 mietfButtonLarge.width = 384;
		 mietfButtonLarge.height = 544;
		 mietfButtonLarge.duration = mietf.animMietfButtonLarge;
		 */

		mietfButtonLarge.addEventListener('complete', function(e) {
			Ti.API.info(' mietfButtonLarge complete');
			Ti.App.fireEvent('finalGotoMietfSelection', {});
		});

		//mietfArray[arrayIndex] //fadeOut the text of this button & change image
		animationImage.animate(mietfButtonLarge);
	};

	self.gotoMietfSelectionPart3 = function(_args) {
		animationImage.opacity = 0;
		self.opacity = 0;
		mietf.titleControl.fadeTitleIn();
	};

	Ti.App.addEventListener('gotoExampleMietf', function(e) {

		self.gotoMietfSelection({
			arrayIndex : 1,
			mietfID : 1,
			mietfName : 'Blue Chip Stocks',
			vaultNum : 1,
			vaultName : 'Samples'
		});

	});

    self.startWobble = function(){
    	
    	var wobbleAnim = Ti.UI.createAnimation({
			duration : 100,
			repeat : 40000,
			transform : Ti.UI.create2DMatrix().rotate(-2),
			curve : Titanium.UI.ANIMATION_CURVE_LINEAR,
			autoreverse : true
		});
	
    	for (var i = 1; i < mietfArray.length-1; i++) {
    		
    		if(!mietfArray[i].isAddNew){
    			mietfArray[i].animate(wobbleAnim);
    			mietfArray[i].startWobble();
    		}
    	}
    	
    	self.isWobble  = true;
    	
    };
    
     self.stopWobble = function(){
    	
		var wobbleAnim = Ti.UI.createAnimation({
			duration : 1,
			transform : Ti.UI.create2DMatrix().rotate(0),
			curve : Titanium.UI.ANIMATION_CURVE_LINEAR
		});
	
    	for (var i = 1; i < mietfArray.length-1; i++) {
    		if(!mietfArray[i].isAddNew){
    			mietfArray[i].animate(wobbleAnim);
    			mietfArray[i].transform = Ti.UI.create2DMatrix().rotate(0);
    			mietfArray[i].stopWobble();
    		}
    	}
    	self.isWobble  = false;
    };
    
	return self;
};

module.exports = MiETFSelect; 