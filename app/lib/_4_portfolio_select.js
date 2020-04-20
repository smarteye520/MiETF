function PortfolioSelect(_args) {

	var parent = _args.parent;
	var imageMask2;
	var allowClick = true;

	var self = Titanium.UI.createView({
		left : mietf.screenOffset,
		width : 1024, // 781,
		height : '100%', // imgs.largeSize,
		top : 112,
		//left: 224,
		backgroundColor : 'transparent',
		vaultWheelRadius : 84,
		portfolioButtonRadius : 108,
		opacity : 0,
		vaultId : 1,
		clickIndex : 0,
		vaultName : 'Test'
	});

	/*var debugLbl = Ti.UI.createLabel({
		text : '',
		top : 10,
		zIndex : 20,
		left : 150
	});

	self.add(debugLbl);*/

	var lockButton1 = Ti.UI.createView({
		top : 224,
		width : 128,
		height : 128,
		left : 624 + 224,
		touchEnabled : true,
		vaultId : 0,
		zIndex : 100,
		opacity : 0
	});

	self.add(lockButton1);

	var buttonMetal = Ti.UI.createImageView({
		image : 'images/latest/btn_1.pn8',
		width : 128,
		height : 128
	});

	var text = 'LOCK';

	var attr = Ti.UI.createAttributedString({
		text : text,
		attributes : [{
			type : Ti.UI.ATTRIBUTE_TEXT_EFFECT,
			value : Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
			range : [0, text.length]
		}]
	});

	self.fadeOutCloseButton = function(e) {
		animation.fadeOut(lockButton1, mietf.animFadeOutCloseButton);
	};

	self.fadeInCloseButton = function(e) {
		allowClick = true;
		//animation.fadeIn(lockButton1, 500);
	};

	Ti.App.addEventListener('hello1', function(e) {
		animation.fadeIn(lockButton1, setting.titleFadeIn);
	});

	var SetLbl = require('setLblText');
	var setLbl = new SetLbl();

	setLbl.setText(text);

	lockButton1.add(buttonMetal);
	lockButton1.add(setLbl);

	lockButton1.addEventListener('click', function(e) {
		var vault = new Vault();
		vault.getVaultById(self.vaultId);
		//until you pass it around, just getting it again
		vault.lock();

		for (var i = 0; i < vaults.length; i++) {
			if (vaults[i].vaultId == self.vaultId) {
				vaults[i].isLocked = 'YES';
				//oh boy is this all confused
			}
		}

		mietf.isAnimating = true;
		Ti.App.fireEvent('VaultButtonClick', {});

	});

	//lockButton.hide();

	self.hideLockButton = function(e) {
		//lockButton.hide();
	};

	// width: '100%', // 781,
	// height: '100%', // imgs.largeSize,
	// top: 112,
	//left: 224,

	var portfoliosVault = Ti.UI.createView({
		top : 0,
		height : imgs.largeSize,
		width : imgs.largeSize,
		left : 224,
		backgroundColor : 'transparent'
	});

	self.add(portfoliosVault);

	var portfolioTest = Ti.UI.createView({});
	var addNewTest = Ti.UI.createView({});
	var examplesTest = Ti.UI.createView({});
	var port2 = Ti.UI.createView({});
	var port3 = Ti.UI.createView({});

	var pos0 = Ti.UI.createView({});
	var pos1 = Ti.UI.createView({});
	var pos2 = Ti.UI.createView({});
	var pos3 = Ti.UI.createView({});

	var portfolioCanvas = Ti.UI.createView({
		width : '100%',
		height : '100%',
		backgroundColor : 'yellow',
		opacity : .2
	});
	self.add(portfolioCanvas);

	Ti.App.addEventListener('finalToPortfolioAnimHandler', function(e) {
		//slide in the folders as before

		var posAnim = [];
		var pos0Anim = [];

		posAnim[0] = Titanium.UI.createAnimation();
		posAnim[0].top = mietf.folderPosition[3].top;
		posAnim[0].left = mietf.folderPosition[3].left;
		posAnim[0].height = 146;
		posAnim[0].width = 114;

		posAnim[1] = Titanium.UI.createAnimation();
		posAnim[1].top = mietf.folderPosition[2].top;
		posAnim[1].left = mietf.folderPosition[2].left;
		posAnim[1].height = 138;
		posAnim[1].width = 108;

		posAnim[2] = Titanium.UI.createAnimation();
		posAnim[2].top = mietf.folderPosition[1].top;
		posAnim[2].left = mietf.folderPosition[1].left;
		posAnim[2].height = 132;
		posAnim[2].width = 103;

		posAnim[3] = Titanium.UI.createAnimation();
		posAnim[3].top = mietf.folderPosition[0].top;
		posAnim[3].left = mietf.folderPosition[0].left;
		posAnim[3].height = 124;
		posAnim[3].width = 97;

		pos0Anim[0] = Titanium.UI.createAnimation();
		//behind the folder fanout
		pos0Anim[0].top = mietf.folderPos0Points[3].top;
		pos0Anim[0].left = mietf.folderPos0Points[3].left;
		pos0Anim[0].height = 124;
		pos0Anim[0].width = 97;

		pos0Anim[1] = Titanium.UI.createAnimation();
		pos0Anim[1].top = mietf.folderPos0Points[2].top;
		pos0Anim[1].left = mietf.folderPos0Points[2].left;
		pos0Anim[1].height = 124;
		pos0Anim[1].width = 97;
		

		pos0Anim[2] = Titanium.UI.createAnimation();
		//behind the folder fanout
		pos0Anim[2].top = mietf.folderPos0Points[1].top;
		pos0Anim[2].left = mietf.folderPos0Points[1].left;
		pos0Anim[2].height = 124;
		pos0Anim[2].width = 97;

		pos0Anim[3] = Titanium.UI.createAnimation();
		pos0Anim[3].top = mietf.folderPos0Points[0].top;
		pos0Anim[3].left = mietf.folderPos0Points[0].left;
		pos0Anim[3].height = 124;
		pos0Anim[3].width = 97;

		/*
		if (folderArray.length > 0)  setTimeout(function(e) {folderArray[0].animate(posAnim[0]);}, 300);
		if (folderArray.length > 1)  setTimeout(function(e) {folderArray[1].animate(posAnim[1]);}, 600);
		if (folderArray.length > 2)  setTimeout(function(e) {folderArray[2].animate(posAnim[2]);}, 900);
		if (folderArray.length > 3)  setTimeout(function(e) {folderArray[3].animate(posAnim[3]);}, 900);
		if (folderArray.length > 4)  setTimeout(function(e) {folderArray[4].animate(posAnim[4]);}, 900);
		if (folderArray.length > 5)  setTimeout(function(e) {folderArray[5].animate(posAnim[5]);}, 900);
		*/

		//OK this animation is really not right becuse?

		//everything launches all at once.

		//now that works out ok for things with a duration of 300/600/900
		// but all the sub animations actuallys start at 300 - all of them.

		//the delay has to be calculated

		for (var i = 0; i < Math.min(folderArray.length, 3); i++) {
			posAnim[i].duration = mietf.animFinalToPortFolioAnimSpeed;
			posAnim[i].delay = (i * mietf.animFinalToPortFolioAnimDelay) + mietf.animFinalToPortFolioAnimDelay;
			posAnim[i].i = i;

			if (i == Math.min(folderArray.length, 3) - 1) {
				posAnim[i].addEventListener('complete', function(e) {
					folderArray[e.source.i].top = posAnim[e.source.i].top;
					folderArray[e.source.i].left = posAnim[e.source.i].left;
					folderArray[e.source.i].height = posAnim[e.source.i].height;
					folderArray[e.source.i].width = posAnim[e.source.i].width;

					touchCanvasArray[e.source.i].top = folderArray[e.source.i].top;
					touchCanvasArray[e.source.i].left = folderArray[e.source.i].left;
					touchCanvasArray[e.source.i].height = folderArray[e.source.i].height;
					touchCanvasArray[e.source.i].width = folderArray[e.source.i].width;

					mietf.titleControl.fadeTitleIn();
				});
			} else {
				posAnim[i].addEventListener('complete', function(e) {
					folderArray[e.source.i].top = posAnim[e.source.i].top;
					folderArray[e.source.i].left = posAnim[e.source.i].left;
					folderArray[e.source.i].height = posAnim[e.source.i].height;
					folderArray[e.source.i].width = posAnim[e.source.i].width;

					touchCanvasArray[e.source.i].top = folderArray[e.source.i].top;
					touchCanvasArray[e.source.i].left = folderArray[e.source.i].left;
					touchCanvasArray[e.source.i].height = folderArray[e.source.i].height;
					touchCanvasArray[e.source.i].width = folderArray[e.source.i].width;
				});

			}

			folderArray[i].animate(posAnim[i]);

			if (i <= folderArray.length - 2) {
				//alert('i:'+ i);
				for (var j = i + 1; j < Math.min(i + 4, folderArray.length - i); j++) {
					//alert('j:' + j + ', i:' + i + ', j-i: ' + (j-i));
					pos0Anim[j - i - 1].duration = 500;
					pos0Anim[j - i - 1].delay = (i * 300) + 300;

					folderArray[j].animate(pos0Anim[j - i - 1]);

					//	debugLbl.text = 'j:' + j + ', i:' + i + ', j-i: ' + (j-i);
				}

			}

		}

		//after animation the starting width and height is wrong - problem
		//do this later as an event on animation end for those foldrs
		setTimeout(function(e) {
			try {

				/*
				 for (var i = 0; i < Math.min(folderArray.length,4); i++) {
				 touchCanvasArray[i].top = posAnim[i].top;
				 touchCanvasArray[i].left = posAnim[i].left;
				 touchCanvasArray[i].height = posAnim[i].height;
				 touchCanvasArray[i].width = posAnim[i].width;
				 }
				 */

				folderArray[1].width = 108;
				folderArray[1].height = 138;

				folderArray[2].width = 103;
				folderArray[2].height = 132;
			} catch (e) {

			}
		}, 1200);

	});

	var offset = {};
	var startTime = new Date();
	var inMotionIndex = 1;
	var currentPortfolio = 0;

	function handleTouchStart(e) {
		Ti.API.info('handleTouchStart '+e.source.i);
		//save starting coordinates
		currentPortfolio = e.source.i;

		for (var i = 0; i < touchCanvasArray.length; i++) {
			if (e.source.i != i)
				touchCanvasArray[i].touchEnabled = false;
		}

		setTimeout(function(e) {
			allowTouch();
		}, 500);

		offset.x = e.x;
		offset.y = e.y;

	};

	var change = 0;

	function handlePosition0(e) {

	}

	function handleActiveSet(e) {

	}

	function allowTouch(e) {
		for (var i = 0; i < touchCanvasArray.length; i++) {
			touchCanvasArray[i].touchEnabled = true;
		}
	};

	var distance = 0;
	var foldersInMoveArea = [1, 2, 3];
	var newFoldersInMoveArea = [1, 2, 3];

	function handleTouchMove(e) {
		Ti.API.info('handleTouchMove '+ e.source.i);
		if (e.source.i != currentPortfolio)
			return;

		startTime = new Date();

		var changeX = e.x - offset.x;
		var changeY = e.y - offset.y;

		change = ((changeX / 2) + (changeY / 2));

		newFoldersInMoveArea = [];

		for (var i = 1; i < folderArray.length; i++) {//STEP 1, looping through ALL folders, except add New

			//if a folder falls within the move area - move it - also record those folders that are in the view area

			if ((folderArray[i].pretendX + change > mietf.folderPosition[0].adjustedLeft && folderArray[i].pretendX + change < mietf.folderPosition[3].adjustedLeft) && (folderArray[i].pretendY + change > mietf.folderPosition[0].adjustedTop && folderArray[i].pretendY + change < mietf.folderPosition[3].adjustedTop )) {
				folderArray[i].left = folderArray[i].pretendX + change;
				folderArray[i].top = folderArray[i].pretendY + change;

				distance = lineDistance({
					x : mietf.folderPosition[0].left,
					y : mietf.folderPosition[0].top
				}, {
					x : folderArray[i].left,
					y : folderArray[i].top
				});

				folderArray[i].width = 97 + (Math.min((distance / 250), 1) * 17);
				folderArray[i].height = 124 + (Math.min((distance / 250), 1) * 22);

				newFoldersInMoveArea.push(i);

			}

		}

		var proceed = true;
		if (newFoldersInMoveArea[0] == foldersInMoveArea[0])
			proceed = false;

		foldersInMoveArea = newFoldersInMoveArea.slice(0);

		if (proceed) {

			var startNum = foldersInMoveArea[foldersInMoveArea.length - 1] + 1;

			//time to change top left?  Seems to me this always runs - even if nothing has changed.

			for ( i = startNum; i < Math.min(folderArray.length, startNum + 4); i++) {//now I only want to do 4 folders

				///Example [1, 2, 3]  4 and largers are now in the Position 0 "stack"
				var subPos = 3;
				var noAnimFlag = false;

				//if the difference between foldersInMoveArea[foldersInMoveArea.length-1]+1 and i is 0
				//	subpos=3  //defaults to this
				var diff = i - startNum;
				if (diff == 1)
					subPos = 2;

				if (diff == 2)
					subPos = 1;

				if (diff == 3)
					subPos = 0;

				if (diff > 3) {
					subPos = 0;
					noAnimFlag = true;
				}

				//alert('i: ' + i + ', ' + 'diff:' + Number(Number(i)-(Number(foldersInMoveArea[Number(foldersInMoveArea.length-1)])+1)));
				if (noAnimFlag) {

					folderArray[i].left = mietf.folderPos0Points[subPos].left;
					folderArray[i].top = mietf.folderPos0Points[subPos].top;

				} else {

					folderArray[i].animate(mietf.folderPos0Animations[subPos]);

				}

			}

			//foldersInMoveArea[foldersInMoveArea.length-1] //last

			//foldersInMoveArea[0] //first

			if (foldersInMoveArea[0] == 1) {
				folderArray[0].animate(mietf.folderPos3Animations[0]);
			}

			if (foldersInMoveArea[0] == 2) {
				folderArray[0].animate(mietf.folderPos3Animations[1]);
				folderArray[1].animate(mietf.folderPos3Animations[0]);
			}

			if (foldersInMoveArea[0] == 3) {
				folderArray[0].animate(mietf.folderPos3Animations[2]);
				folderArray[1].animate(mietf.folderPos3Animations[1]);
				folderArray[2].animate(mietf.folderPos3Animations[0]);
			}

			if (foldersInMoveArea[0] == 4) {
				folderArray[0].animate(mietf.folderPos3Animations[3]);
				folderArray[1].animate(mietf.folderPos3Animations[2]);
				folderArray[2].animate(mietf.folderPos3Animations[1]);
				folderArray[3].animate(mietf.folderPos3Animations[0]);
			}

			if (foldersInMoveArea[0] > 4) {

				for ( i = 0; i < foldersInMoveArea[0]; i++) {

					var subPos = 4;

					if (i == (foldersInMoveArea[0] - 1))
						subPos = 0;
					if (i == (foldersInMoveArea[0] - 2))
						subPos = 1;
					if (i == (foldersInMoveArea[0] - 3))
						subPos = 2;
					if (i == (foldersInMoveArea[0] - 4))
						subPos = 3;

					folderArray[i].animate(mietf.folderPos3Animations[subPos]);

				}

			}

		}//end proceed

	};

	function finalMotion(e) {

		var lastX = 0;
		var lastY = 0;

		for (var i = 1; i < folderArray.length; i++) {
			folderArray[i].pretendX = folderArray[i].pretendX + change;
			//Right now just saving new positions.
			folderArray[i].pretendY = folderArray[i].pretendY + change;

			/*if ((folderArray[i].pretendX > 129 && folderArray[i].pretendX < 356) && (folderArray[i].pretendY > 112 && folderArray[i].pretendY < 339 )) {
				lastX = folderArray[i].pretendX;
				lastY = folderArray[i].pretendY;
			}*/
		}

		//var adjustment = 113 - lastX;

	};

	function updateFolderArrayStartPositions(e) {//may be for later.
		for (var i = 1; i < folderArray.length; i++) {
			folderArray[i].offset = 0;

		}

	};

	function lineDistance(point1, point2) {
		var xs = 0;
		var ys = 0;

		xs = point2.x - point1.x;
		xs = xs * xs;

		ys = point2.y - point1.y;
		ys = ys * ys;

		return Math.sqrt(xs + ys);
	}

	function handleTouchEnd(e) {
		Ti.API.info('handleTouchEnd '+e.source.i);
		if (e.source.i != currentPortfolio)
			return;

		finalMotion();

		//var endTime = new Date();

		//var timeDiff = Math.abs(endTime.getTime() - startTime.getTime());

		//var accell = change / timeDiff;

		//alert('distance:' + distance);

		for (var i = 1; i < folderArray.length; i++) {
			if(i==1){//Keep last book touchable always
				touchCanvasArray[i].top = mietf.folderPos0Points[3].top;
				touchCanvasArray[i].left = mietf.folderPos0Points[3].left;
				continue;
			}
			touchCanvasArray[i].top = 0;
			//folderArray[i].top;
			touchCanvasArray[i].left = 0;
			//folderArray[i].left;
			touchCanvasArray[i].height = 1;
			//folderArray[i].height;
			touchCanvasArray[i].width = 1;
			//folderArray[i].width;
		}

		try {

			for ( i = foldersInMoveArea[0]; i <= foldersInMoveArea[foldersInMoveArea.length - 1] + 1; i++) {
				touchCanvasArray[i].top = folderArray[i].top;
				touchCanvasArray[i].left = folderArray[i].left;
				touchCanvasArray[i].height = folderArray[i].height;
				touchCanvasArray[i].width = folderArray[i].width;
			}
		} catch (e) {
			//alert(e);
		}

		touchCanvasArray[0].top = folderArray[0].top;
		touchCanvasArray[0].left = folderArray[0].left;
		touchCanvasArray[0].height = folderArray[0].height;
		touchCanvasArray[0].width = folderArray[0].width;
     
		allowTouch();
		//Ti.API.info('touchCanvasArray[1].top ' +touchCanvasArray[1].top);
		//Ti.API.info('folderArray[1].top ' +folderArray[1].top);
		if(folderArray.length>1 && folderArray[1].top<120){
		   stackProperly();
		}

	};

	Ti.App.addEventListener('gotoExamplePortfolio', function(e) {
		//alert('gotoExamplePortfolio');
		touchCanvasArray[1].fireEvent('click', {});

	});
	
	self.getBigPortfolioViewForAnim = function(portfolio) {

		var BigPortfolioButton = require('tempBigPortfolioButton');

		var point = {
			x : portfolio.rect.x,
			y : portfolio.rect.y
		};

		var parentPosition = portfolio.convertPointToView(point, self);

		var returnView = new BigPortfolioButton({
			left : parentPosition.x / 2,
			top : (parentPosition.y / 2) + 112,
			id : 0,
			backgroundColor : 'blue',
			portfolioName : folderArray[portfolio.i].portfolioName,
			portfolioId : portfolio.portfolioId,
			opacity : 1.0,
			vaultNum : portfolio.vaultNum,
			height : portfolio.height,
			width : portfolio.width,
			zIndex : 128
		});

		returnView.returnTop = returnView.top;
		returnView.returnLeft = returnView.left;
		returnView.returnHeight = returnView.height;
		returnView.returnWidth = returnView.width;

		return returnView;

	};

	function handleLongPress(e) {

		var i = e.source.i;

		mietf.source.portfolioId = folderArray[i].portfolioId;
		mietf.source.title = portfoliosArray[i - 1].portfolioName;

		var portfolioCnt = getMietfCNTbyPorfolioId(mietf.source.portfolioId);

		//if (portfolioCnt) {
		//	alert('You may not delete a portfolio with MiETFs');

		//} else {
			folderArray[i].wobble();
			/*win = Alloy.createController('confirmationDeletePortfolio').getView();
			win.open({
				transition : Ti.UI.iPhone.AnimationStyle.NONE
			});*/
		//}

	}

	/*self.wobble = function(element) {
		element.transform = Ti.UI.create2DMatrix().rotate(2);
		element.animate(wobbleAnim);
		element.isWobbling = true;
	};

	self.stopWobble= function(element) {
		element.animate(wobbleAnim2);
		element.transform = Ti.UI.create2DMatrix().rotate(0);
		element.isWobbling = false;
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
	});*/
	
	self.trashcanClick = function(i) {

		mietf.source.portfolioId = folderArray[i].portfolioId;
		mietf.source.title = portfoliosArray[i - 1].portfolioName;

		var portfolioCnt = getMietfCNTbyPorfolioId(mietf.source.portfolioId);

		if (portfolioCnt) {
		   Alloy.createController('alertPopup', {text:'You may not delete a portfolio with MiETFs'}).getView().open();
		} else {
			win = Alloy.createController('confirmationDeletePortfolio').getView();
			win.open({
				transition : Ti.UI.iPhone.AnimationStyle.NONE
			});
		}

	};

	function handleClick(e) {
        Ti.API.info(e.x + ' , '+e.y);
		if (e.x < 30 && e.y < 30 && folderArray[e.source.i].isWobbling) {
			self.trashcanClick(e.source.i);
			return;
		}
		
		if (e.x < 30 && e.y > 115 && folderArray[e.source.i].isWobbling) {
			var PortfolioEditSlideout = require('portfolioEditSlideout');
			portfolioEditSlideout = new PortfolioEditSlideout({
				parent : parent,
				portfolioSelect : self,
				vaultId : self.vaultId,
				i : e.source.i,
				folder : folderArray[e.source.i],
				folderName : portfoliosArray[e.source.i - 1].portfolioName,
				portfolioId : folderArray[e.source.i].portfolioId
			});
			parent.add(portfolioEditSlideout);

			portfolioEditSlideout.slideIn({
			});
			return;
		}
		
		for(var j =0 ; j< folderArray.length;j++){
			folderArray[j].stopWobble();
		}
		
		if (allowClick) {
			self.clickIndex = e.source.i;
			if (e.source.i > 0) {
				allowClick = false;

				showETF(folderArray[e.source.i]);
			} else {
				if (folderArray[e.source.i].addNewAllowed) {
					//showAddNewPortoflio(folderArray[e.source.i]);
					//mietf.stopVaultWobble();
					var PortfolioNewSlideout = require('portfolioNewSlideout');
					portfolioNewSlideout = new PortfolioNewSlideout({
						parent : parent,
						portfolioSelect : self,
						vaultId : self.vaultId
					});
					parent.add(portfolioNewSlideout);

					portfolioNewSlideout.slideIn({
					});
				}
			}
		} else {
			//alert('double click detected');
		}

		/*

		 if ((e.x > 307 && e.y > 76) && (e.x <=414 && e.y <=194)) {
		 self.clickIndex = 0;  //you need to pass the portfolio, not the portfoliio select screen, so which did you click?
		 //foldersInMoveArea
		 //folderArray[0]
		 showETF(folderArray[foldersInMoveArea[foldersInMoveArea.length -1]]);

		 }
		 if ((e.x > 414 && e.y > 194) && (e.x <=500 && e.y <=272)) {
		 self.clickIndex = 1;
		 showETF(folderArray[foldersInMoveArea[1]]);
		 }

		 if ((e.x > 500 && e.y > 272) && (e.x <=574 && e.y <=352)) {
		 self.clickIndex = 2;
		 showETF(folderArray[foldersInMoveArea[0]]);
		 }

		 if (e.x > 574 && e.y > 352) alert('Thank you for clicking Add New');
		 */
	}

	var savedPrepare = new Object();

	self.resetPrepare = function(e) {
		self.prepare(savedPrepare);
	};
	var portfoliosArray = [];

	self.prepare = function(e) {
		mietf.portWobbleMode = false;
		savedPrepare = e;
		allowClick = true;
		inMotionIndex = 1;
		atEndFlag = false;
		oldChange = 0;
		self.remove(portfolioCanvas);
		//self.remove(touchCanvas);
		portfolioCanvas = [];
		touchCanvas = [];
		folderArray = [];
		lockButton1.opacity = 0;

		portfolioCanvas = Ti.UI.createView({
			width : '100%',
			height : '100%'
		});
		self.add(portfolioCanvas);
		//touchCanvas = Ti.UI.createView({width: '100%', height: '100%'});
		//self.add(touchCanvas);

		//EVENT handlers section
		//touchCanvas.addEventListener('click', hatouchEnabledndleClick);
		//touchCanvas.addEventListener('touchstart', handleTouchStart);
		//touchCanvas.addEventListener('touchmove', handleTouchMove);
		//touchCanvas.addEventListener('touchend', handleTouchEnd);

		mietf.setScreen({
			scrn : 'portfolioSelect',
			vaultNum : e.vaultNum
		});

		if (e.isSampleVault == 'YES') {
			var text = 'CLOSE';
			setLbl.setText(text);
		} else {

			var text = 'LOCK';
			setLbl.setText(text);
		}

		var vaultId = e.vaultId;
		var vaultNum = e.vaultNum;
		self.vaultId = vaultId;
		self.vaultName = e.vaultName;
		buttonMetal.image = 'images/latest/btn_' + vaultNum + '.pn8';

		portfoliosVault.backgroundImage = e.vaultImg;

		portfoliosArray = getPortfolios({
			vaultId : e.vaultId
		});
		var PortfolioButton = require('portfolioButton');

		var NewStartX = mietf.folderPosition[3].left;
		var NewStartY = mietf.folderPosition[3].top;
		var shift = -77;

		var addNewOpacity = 1;
		if (e.canAddNew == 'NO')
			addNewOpacity = 0;

		folderArray[0] = new PortfolioButton({
			parent : self,
			i : 0,
			id : 0,
			backgroundColor : e.color,
			portfolioName : 'Add New Portfolio',
			portfolioId : 1,
			opacity : addNewOpacity,
			vaultNum : vaultNum,
			height : 124,
			width : 97,
			zIndex : 128
		});
		folderArray[0].addNewAllowed = addNewOpacity;
		folderArray[0].top = mietf.folderPos0Points[3].top;
		folderArray[0].left = mietf.folderPos0Points[3].left;
		folderArray[0].opacity = 0;
		folderArray[0].pretendX = NewStartX;
		folderArray[0].pretendY = NewStartY;
		folderArray[0].vaultId = self.vaultId;
		folderArray[0].vaultName = self.vaultName;
		folderArray[0].portfolioId = 1;
		folderArray[0].i = 0;
		NewStartX = NewStartX + shift;
		NewStartY = NewStartY + shift;

		touchCanvasArray[0] = Ti.UI.createView({
			//backgroundColor:'red',
			left : folderArray[0].left,
			top : folderArray[0].top,
			height : folderArray[0].height,
			width : folderArray[0].width,
			zIndex : folderArray[0].zIndex + 1,
			i : folderArray[0].i
		});
		touchCanvasArray[0].addEventListener('click', handleClick);
		touchCanvasArray[0].addEventListener('touchstart', handleTouchStart);
		touchCanvasArray[0].addEventListener('touchmove', handleTouchMove);
		touchCanvasArray[0].addEventListener('touchend', handleTouchEnd);

		portfolioCanvas.add(folderArray[0]);
		portfolioCanvas.add(touchCanvasArray[0]);

		self.stopWobble = function(e) {
			//self.animate(wobbleStop);
			vaultIconV.animate(wobbleAnim2);
			vaultIconV.transform = Ti.UI.create2DMatrix().rotate(0);
			mietf.isWobbling = false;
			self.x2Off();
		};

		for (var i = 1; i < (portfoliosArray.length + 1); i++) {
			//Math.min(portfoliosArray.length+1, 8); i++) {
			folderArray.push(new PortfolioButton({
				parent : self,
				id : 0,
				backgroundColor : e.color,
				portfolioName : portfoliosArray[i - 1].portfolioName,
				portfolioId : portfoliosArray[i - 1].portfolioId,
				opacity : 1.0,
				vaultNum : vaultNum,
				height : 124,
				width : 97,
				zIndex : 128 - i,
				i : i,
				total : portfoliosArray.length
			}));

			if (i < 4) {//rewrite this, but for now just a quick way to get all folders done

				folderArray[i].top = mietf.folderPos0Points[3 - i].top;
				folderArray[i].left = mietf.folderPos0Points[3 - i].left;
				folderArray[i].opacity = 0;
				folderArray[i].offset = 0;
				folderArray[i].windowPosition = i - 1;
				folderArray[i].vaultId = self.vaultId;
				folderArray[i].vaultName = self.vaultName;
				folderArray[i].portfolioId = portfoliosArray[i - 1].portfolioId;
				folderArray[i].i = i;

				folderArray[i].pretendX = NewStartX;
				folderArray[i].pretendY = NewStartY;
				NewStartX = NewStartX + shift;
				NewStartY = NewStartY + shift;

			} else {
				folderArray[i].top = mietf.folderPos0Points[0].top;
				folderArray[i].left = mietf.folderPos0Points[0].left;
				folderArray[i].opacity = 0;
				folderArray[i].offset = 0;
				folderArray[i].windowPosition = 3;
				folderArray[i].vaultId = self.vaultId;
				folderArray[i].vaultName = self.vaultName;
				folderArray[i].portfolioId = portfoliosArray[i - 1].portfolioId;
				folderArray[i].i = i;

				folderArray[i].pretendX = NewStartX;
				folderArray[i].pretendY = NewStartY;
				NewStartX = NewStartX + shift;
				NewStartY = NewStartY + shift;

			}

			touchCanvasArray[i] = Ti.UI.createView({
				//backgroundColor:i==1? 'red' : 'transparent',
				left : folderArray[i].left,
				top : folderArray[i].top,
				height : folderArray[i].height,
				width : folderArray[i].width,
				zIndex : folderArray[i].zIndex + 1,
				i : folderArray[i].i,
				opacity : .2
			});
			touchCanvasArray[i].addEventListener('click', handleClick);
			touchCanvasArray[i].addEventListener('longpress', handleLongPress);
			touchCanvasArray[i].addEventListener('touchstart', handleTouchStart);
			touchCanvasArray[i].addEventListener('touchmove', handleTouchMove);
			touchCanvasArray[i].addEventListener('touchend', handleTouchEnd);
			touchCanvasArray[i].k = 1;

			portfolioCanvas.add(folderArray[i]);
			portfolioCanvas.add(touchCanvasArray[i]);

		}

		//popIn initial set of folders

		for (var i = 0; i < folderArray.length; i++) {
			//that changes the opacity on all folders...but you want addNew to be clear
			if (i == 0 && addNewOpacity == 0) {
				//do nothing
			} else {
				animation.popIn(folderArray[i]);
			}

		}

	};

	self.addEventListener('click', function(e) {
		Ti.API.info('self.addEventListener ' +  JSON.stringify(e.source));
		if ( typeof (e.source.k) == 'undefined') {
			mietf.stopPortWobble();
		}
	});

	self.snapImage = function(e) {
		var Blob = self.toImage();
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'portfolio.pn8');
		file.write(Blob);
	};

    function stackProperly(){
    	for (var i = 2; i < (portfoliosArray.length + 1); i++) {
			if (folderArray.length>1 && i < 7) {//rewrite this, but for now just a quick way to get all folders done
			   folderArray[i].top = mietf.folderPos0Points[3].top + 7 - (i-1)*3;
			   folderArray[i].left = mietf.folderPos0Points[3].left + 10 - (i-1)*6;
			} 
		}
    };
    
	return self;
};

module.exports = PortfolioSelect; 