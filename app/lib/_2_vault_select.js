function vaultSelect(_args) {
	
	var self = Ti.UI.createView({
		top : 147,
		left : mietf.screenOffset,
		width : 1024,
		height : 595,
		opacity : 1.0,
		backgroundColor : 'transparent',
		buttonMsg : 1,
		opacity: 1
	});

	var parent = _args.parent;

	var moveImgV = [];
	var newVaults = [];
	var wasLongpress = false;
	var allowBtnClick = true;
	var didMove = false;
	var changeViewLeftFlag = false;
	var changeViewRightFlag = false;
	var onNewScreen = false;
	var vaultToExit = [];

	var remainder = vaults.length % 5;
	var numberOfViews = 1 + (vaults.length - remainder) / 5;

	var slotPositions = 5;

	vaultViews = [];
	vaultViews.push(Titanium.UI.createView({
		top : 0,
		height : 507,
		left : 0,
		right : 0,
		contentHeight : 'auto',
		contentWidth : '100%'
	}));
	var insideViews = [];
	var draggableViews = [];
	var vaultButtonImgV;
	var newVault;
	var vaultPoints = [{
		x : mietf.vaultPoints[0].x,
		y : mietf.vaultPoints[0].y,
		pos : 0
	}];
	var moveToSlot = [];

	var sView = Ti.UI.createScrollableView({
		left : 0,
		right : 0,
		views : vaultViews,
		showPagingControl : false,
		pagingControlColor : 'transparent'
	});

	self.getSView = function(e) {
		return sView;
	};

	self.add(sView);

	makeVaults();

	Ti.App.addEventListener('updateVaults', function(e) {
		makeVaults();
		sView.scrollingEnabled = true;
	});

	function makeVaults() {

		//var start = new Date().getTime();

		mietf.titleControl.updateMem();
		vaults = [];
		vaults = getVaults();
		remainder = vaults.length % 5;
		numberOfViews = numberOfScreens();
		///CHANGE THIS UP  --get max screen #from db
		vaultViews = [];
		insideViews = [];
		draggableViews = [];
		vaultPoints = [{
			x : mietf.vaultPoints[0].x,
			y : mietf.vaultPoints[0].y,
			pos : 0
		}];
		vaultPoints.push({
			x : mietf.vaultPoints[1].x,
			y : mietf.vaultPoints[1].y,
			pos : 1
		});
		vaultPoints.push({
			x : mietf.vaultPoints[2].x,
			y : mietf.vaultPoints[2].y,
			pos : 2
		});
		vaultPoints.push({
			x : mietf.vaultPoints[3].x,
			y : mietf.vaultPoints[3].y,
			pos : 3
		});
		vaultPoints.push({
			x : mietf.vaultPoints[4].x,
			y : mietf.vaultPoints[4].y,
			pos : 4
		});

		vaultPoints.push({
			x : mietf.vaultPoints[5].x,
			y : mietf.vaultPoints[5].y,
			pos : 5
		});

		moveToSlot = [];

		for (var pos = 0; pos < slotPositions; pos++) {
			moveToSlot[pos] = Titanium.UI.createAnimation();
			moveToSlot[pos].top =  mietf.vaultPoints[1].y;
			moveToSlot[pos].left = mietf.vaultPoints[1].x;
			moveToSlot[pos].duration = 200;
		}

		for (var j = 0; j <= numberOfViews; j++) {

			vaultViews.push(Titanium.UI.createView({
				top : 0, //50
				height : 507, //457 446
				left : 0,
				right : 0,
				contentHeight : 'auto',
				contentWidth : '100%'
			}));

			insideViews.push(Ti.UI.createView({
				top : 0,
				height : 507,
				left : 0,
				right : 0
			}));

			vaultViews[j].add(insideViews[j]);

			var newVaultLocIndex = 1;

			var k = 0;
			numVaultButtons = numberOfButtons(j);
			numVaultButtonsBefore = numberOfButtonsBefore(j);

			//for (var i = (j * 5); i < (j * 5) + 5; i++) {

			for (var i = numVaultButtonsBefore; i < numVaultButtonsBefore + 5; i++) {///THIS STILL REQUIRES FIVE

				if (k < numVaultButtons) {
					vaults[i].vaultScreen = j;
					vaults[i].k = k;
					vaults[i].createButton(self, i);

					vaults[i].button.vaultView = j;
					vaults[i].button.left = vaultPoints[k].x;
					vaults[i].button.top = vaultPoints[k].y;
					insideViews[j].add(vaults[i].button);

					//this will do nothing needs to be on overal
					vaults[i].button.addEventListener('click', function(e) {
						var id = e.i;
						vaultButtonClickHandler2(id);
					});

					draggableViews[i] = Titanium.UI.createView({
						width : 208,
						height : 224,
						top : vaultPoints[k].y,
						left : vaultPoints[k].x,
						zIndex : 22,
						i : i,
						j : j,
						k : k
					});
					//draggableViews[i].add(Ti.UI.createLabel({
					//text: 'i:' +i +', j:' +j+', k:' + k,
					//top: 5
					//makeVaults();}));

					insideViews[j].add(draggableViews[i]);
					draggableViews[i].addEventListener('touchstart', handleTouchStart);
					draggableViews[i].addEventListener('touchmove', handleTouchMove);
					draggableViews[i].addEventListener('touchend', handleTouchEnd);
					draggableViews[i].addEventListener('longpress', handleLongPress);
					draggableViews[i].addEventListener('singletap', function(e) {
						var i = e.source.i;
						if (e.x < 61 && e.y < 61 && vaults[e.source.i].isDeletable == 'YES' && vaults[e.source.i].isWobbling) {
							var hitDeleteArea = true;
						} else {
							var hitDeleteArea = false;
						}

						if (mietf.isClickToEdit) { //findmefindme
							Ti.App.fireEvent('closeClickToEdit', {});
								if (vaults[e.source.i].isSampleVault == 'NO' && vaults[e.source.i].shouldOpenComboLock() != 'NO') {
					enterPasscode(vaults[e.source.i]);
								} else {

							var VaultEditSlideout = require('vaultEditSlideout'), vaultEditSlideout = new VaultEditSlideout({
								parent : parent,
								vaultForm : self
							});
							parent.add(vaultEditSlideout);
							vaultEditSlideout.slideIn(vaults[e.source.i]);
							}
							
						} else {
							if (hitDeleteArea) {
								if (vaults[i].isSampleVault == 'NO') {
									enterPasscodeForDelete(vaults[i]);
								} else {
									self.deleteVault(vaults[i]);
								}

							} else {
								vaultButtonClickHandler2(i, e);
								//setTimeout(function(e) {vaultButtonClickHandler2(i); }, 100);
							}
						}

					});

/*
					draggableViews[i].addEventListener('doubletap', function(e) {
						allowBtnClick = true;
						handlingVaultMove = false;
						isDraggable = true;
						onNewScreen = false;
						isAnimating = false;
						mietf.stopVaultWobble();
						makeVaults();
						sView.scrollingEnabled = false;
						vaults[e.source.i].isWobbling = true;
						vaults[e.source.i].button.wobble();
					});
					*/
					

					//vaults[i].button.wobble();
					newVaultLocIndex = k;
				} else {
					//blank placeholder
				}
				k++;

			}//end inside loop
			newVaults[j] = new Vault();
			var newVaultLoc = NewVaultLoc(newVaultLocIndex + 1);

			newVaults[j].vaultScreen = j;
			newVaults[j].createNewButton();
			newVaults[j].button.left = newVaultLoc.left;
			newVaults[j].button.top = newVaultLoc.top;

			newVaults[j].button.addEventListener('click', function(e) {
				Ti.API.info('newVaults[j].button.addEventListener');
				mietf.stopVaultWobble();
				var VaultNewSlideout = require('vaultNewSlideout');
				vaultNewSlideout = new VaultNewSlideout({
					parent : parent
				});
				parent.add(vaultNewSlideout);

				vaultNewSlideout.slideIn({
					j : e.source.vaultScreen
				});
				//makeVaults();
			});

			insideViews[j].add(newVaults[j].button);

		}

		sView.views = vaultViews;
		//var end = new Date().getTime();
		//var time = end - start;
	};

	self.addEventListener('click', function(e) {
		if ( typeof (e.source.k) == 'undefined') {
			mietf.stopVaultWobble();
			sView.scrollingEnabled = true;
		}
	});

	function NewVaultLoc(newVaultLocIndex) {

		switch(newVaultLocIndex) {
		case 1:
			return {
				left : mietf.vaultPoints[1].x,
				top : mietf.vaultPoints[1].y
			};
			break;
		case 2:
			return {
				left : mietf.vaultPoints[2].x,
				top : mietf.vaultPoints[2].y
			};
			break;
		case 3:
			return {
				left : mietf.vaultPoints[3].x,
				top : mietf.vaultPoints[3].y
			};
			break;
		case 4:
			return {
				left : mietf.vaultPoints[4].x,
				top : mietf.vaultPoints[4].y
			};
			break;
		default:
			return {
				left : mietf.vaultPoints[5].x,
				top : mietf.vaultPoints[5].y
			};
		}

	};  //OK button

	var popupPasscode = [];

	function enterPasscode(vault) {
		var PopupPasscode = require('popupPasscode');
		popupPasscode = new PopupPasscode({
			parent : self,
			vault : vault
		});
		parent.add(popupPasscode);
		popupPasscode.popKeyboard();
	}


	self.removePasscode = function(e) {
		parent.remove(popupPasscode);
	};

	function enterPasscodeForDelete(vault) {
		var PopupPasscodeForDelete = require('popupPasscodeForDelete');
		popupPasscode = new PopupPasscodeForDelete({
			parent : self,
			vault : vault
		});
		parent.add(popupPasscode);
		popupPasscode.popKeyboard();
	}


	self.removePasscode = function(e) {
		parent.remove(popupPasscode);
	};

	self.vaultSlideout = function(vault) {
		parent.remove(popupPasscode);
		var VaultEditSlideout = require('vaultEditSlideout'), vaultEditSlideout = new VaultEditSlideout({
			parent : parent,
			vaultForm : self
		});
		parent.add(vaultEditSlideout);
		vaultEditSlideout.slideIn(vault);
	};
	
	function vaultButtonClickHandler(e) {
		Ti.API.info('vaultButtonClickHandler');
		if (mietf.isWobbling) {
			//if the button clicked was not wobbling, then you just stop wobble mode, do nothing else
			if (!vaults[e.source.id].isWobbling) {
				mietf.stopVaultWobble();
				sView.scrollingEnabled = true;
				makeVaults();
				return;
			} else {//if the button clicked is wobbling, then you are going to the edit screen.
				mietf.stopVaultWobble();
				sView.scrollingEnabled = true;
				makeVaults();

				if (vaults[e.source.id].isSampleVault == 'NO' && vaults[e.source.id].shouldOpenComboLock() != 'NO') {
					enterPasscode(vaults[e.source.id]);
				} else {
					var VaultEditSlideout = require('vaultEditSlideout'), vaultEditSlideout = new VaultEditSlideout({
						parent : parent,
						vaultForm : self
					});
					parent.add(vaultEditSlideout);

					vaultEditSlideout.slideIn(vaults[e.source.id]);
				}

				return;
			}
		}

		//if wobble mode is off then handle normal navigation of button click
		if (allowBtnClick == false)
			return;

		allowBtnClick = false;
		if (vaults[e.source.id].shouldOpenComboLock() == 'NO') {
			showPortfolio(vaults[e.source.id]);
		} else {
			Ti.API.info('2vs_showComboLock1');
			showComboLock(vaults[e.source.id]);
		}
	};

	self.resetVaults = function(e) {
		makeVaults();
	};
	function vaultButtonClickHandler2(id, e) {
		Ti.API.info('vaultButtonClickHandler2');
		var settingsClick =false;
		if(e && e.x < 61 && e.y > 150 && e.y < 200){
			settingsClick = true;
		}
		if ( mietf.isWobbling) {
			//if the button clicked was not wobbling, then you just stop wobble mode, do nothing else
			if (!vaults[id].isWobbling) {
				mietf.stopVaultWobble();
				sView.scrollingEnabled = true;
				makeVaults();
				return;
			} else {//if the button clicked is wobbling, then you are going to the edit screen.
				mietf.stopVaultWobble();
				sView.scrollingEnabled = true;
				vaults[id].isWobbling = false;
					if (vaults[id].isSampleVault == 'NO' && vaults[id].shouldOpenComboLock() != 'NO') {
						enterPasscode(vaults[id]);
					} else if(settingsClick){
						var VaultEditSlideout = require('vaultEditSlideout'), vaultEditSlideout = new VaultEditSlideout({
							parent : parent,
							vaultForm : self
						});
						parent.add(vaultEditSlideout);
	
						vaultEditSlideout.slideIn(vaults[id]);
				  }
				return;
			}
		}

		//if wobble mode is off then handle normal navigation of button click
		if (allowBtnClick == false)
			return;
		allowBtnClick = false;
		if (vaults[id].shouldOpenComboLock() == 'NO') {
			showPortfolio(vaults[id]);
		} else {
			Ti.API.info('2vs_showComboLock2');
			showComboLock(vaults[id]);
		}
	};

	//drag & drop testing
	var offset = {};
	var offset2 = {};

	function resetVaultPoints(e) {

		/*	for ( i = 0; i < vaults.length; i++) {
		 vaultPoints[i] = {
		 x : vaults[i].button.left,
		 y : vaults[i].button.top,
		 pos : i
		 };
		 }
		 */

		vaultPoints = [{
			x : mietf.vaultPoints[0].x,
			y : mietf.vaultPoints[0].y,
			pos : 0
		}];
		vaultPoints.push({
			x : mietf.vaultPoints[1].x,
			y : mietf.vaultPoints[1].y,
			pos : 1
		});
		vaultPoints.push({
			x : mietf.vaultPoints[2].x,
			y : mietf.vaultPoints[2].y,
			pos : 2
		});
		vaultPoints.push({
			x : mietf.vaultPoints[3].x,
			y : mietf.vaultPoints[3].y,
			pos : 3
		});
		vaultPoints.push({
			x : mietf.vaultPoints[4].x,
			y : mietf.vaultPoints[4].y,
			pos : 4
		});

		vaultPoints.push({
			x :  mietf.vaultPoints[5].x,
			y : mietf.vaultPoints[5].y,
			pos : 5
		});
	}

	var didAnyMove = false;
	var numVaultButtons = 5;
	var numVaultButtonsBefore = 0;
	var didAnyTouch = false;
	var currentVault = 0;

	function handleTouchStart(e) {
		Ti.API.info('currentVault: ' + e.source.i);
		currentVault = e.source.i;

		for (var i = 0; i < draggableViews.length; i++) {
			if (e.source.i != i)
				draggableViews[i].touchEnabled = false;
		}

		setTimeout(function(e) {
			allowTouch();
		}, 500);

		stopWobbleFlag = false;
		changeViewLeftFlag = false;
		changeViewRightFlag = false;
		wasLongpress = false;
		resetVaultPoints();
		//WHY?
		//p
		var i = e.source.i;
		var j = e.source.j;
		var k = e.source.k;
		self.buttonMsg = k;

		didMove = false;
		didAnyMove = false;

		numVaultButtons = numberOfButtons(j);
		numVaultButtonsBefore = numberOfButtonsBefore(j);

		offset.x = e.x - vaults[i].button.left;
		offset.y = e.y - vaults[i].button.top;
		returnToSlot2.left = vaultPoints[k].x;
		//at i level didn't make sense'
		returnToSlot2.top = vaultPoints[k].y;
		returnToSlot2.i = i;
		returnToSlot2.j = j;
		returnToSlot2.k = k;
	};

	var topX = 0;
	var topY = 0;
	var handlingVaultMove = false;
	var vaultButtonMv = [];
	var vaultsForScreen = [];
	var animLastVaultFlag = 'NO';
	var isAnimating = false;

	self.addEventListener('touchstart', function(e) {
		topX = e.x;
		topY = e.y;
	});

	self.addEventListener('touchmove', function(e) {
		topX = e.x;
		topY = e.y;
		if (handlingVaultMove) {

			var adjustment = -1024;
			if (topX < (1024 + offset2.x ))
				adjustment = 0;
			//why not just set direction of move
			if (topX < (-50))
				adjustment = 1024;
			vaultButtonMv.left = topX - offset2.x + adjustment;
			vaultButtonMv.top = topY - offset2.y;

			handleMove({
				i : vaultButtonMv.i,
				j : vaultButtonMv.j,
				k : vaultButtonMv.k,
				adjustment : adjustment
			});

		}
	});

	self.addEventListener('touchend', function(e) {

		if (!onNewScreen) {
			return;
		}

		vaultButtonMv.animate(returnToSlot);

	});

	function allowTouch(e) {
		for (var i = 0; i < draggableViews.length; i++) {
			draggableViews[i].touchEnabled = true;
		}
		didAnyTouch = false;
	};

	function handleTouchMove(e) {
		if (e.source.i != currentVault)
			return;
		//isDraggable   now you can drag in wobble mode
		if (vaults[e.source.i].isWobbling)
			isDraggable = true;

		if (isDraggable) {
			var i = e.source.i;
			var j = e.source.j;
			var k = vaults[e.source.i].k;

			didAnyMove = true;

			var buttonMsg = i;

			vaults[i].button.left = e.x - offset.x;
			vaults[i].button.top = e.y - offset.y;

			if (vaults[i].button.left < 20)
				changeViewLeftFlag = true;
			if (vaults[i].button.left > 824)
				changeViewRightFlag = true;

			if (changeViewLeftFlag) {
				if ((j - 1) < 0)
					changeViewLeftFlag = false;
			}

			if (changeViewRightFlag || changeViewLeftFlag) {

				if (!handlingVaultMove) {
					var saveLeft = vaults[i].button.left;
					var saveTop = vaults[i].button.top;

					vaultButtonMv = Ti.UI.createImageView({
						image : vaults[i].button.toImage(),
						left : saveLeft,
						top : saveTop + 147,
						height : 224,
						width : 208,
						zIndex : 30,
						opacity : 1,
						i : i,
						j : j,
						k : k
					});

					self.buttonMsg = -1;

					_args.parent.add(vaultButtonMv);

					offset2.x = topX - vaultButtonMv.left;
					offset2.y = topY - vaultButtonMv.top;

					handlingVaultMove = true;

					onNewScreen = true;
					if (changeViewRightFlag) {
						var nextScreen = j + 1;
					} else {
						var nextScreen = j - 1;
					}
					vaultsForScreen = getVaultsByScreen(nextScreen);
					prepareForNextScreen(nextScreen, changeViewRightFlag, changeViewLeftFlag);

					sView.scrollToView(nextScreen);
					numVaultButtons = numberOfButtons(nextScreen) + 1;

					var newVaultLoc = NewVaultLoc(numVaultButtons);

					newVaults[nextScreen].button.left = newVaultLoc.left;
					newVaults[nextScreen].button.top = newVaultLoc.top;

					numVaultButtonsBefore = numberOfButtonsBefore(nextScreen);
					vaultsForScreen = getVaultsByScreen(nextScreen);
					vaultButtonMv.j = nextScreen;
					vaultButtonMv.k = numVaultButtons;

				}
			}

			if (vaults[i].button.top < 200) {//top
				buttonMsg = 1;
				if (vaults[i].button.left < 254)
					buttonMsg = 0;
				if (vaults[i].button.left > 568)
					buttonMsg = 2;
			} else {//bottom
				buttonMsg = 4;
				if (vaults[i].button.left < 254)
					buttonMsg = 3;
			}

			if (handlingVaultMove)
				return;

			if (buttonMsg > numVaultButtons - 1)
				buttonMsg = numVaultButtons - 1;

			if (self.buttonMsg != buttonMsg) {

				vaults[i].vaultDisplayOrder = buttonMsg;
				vaults[i].button.newDisplayOrder({
					displayOrder : buttonMsg
				});

				Ti.API.info('self.buttonMsg:' + self.buttonMsg + ', buttonMsg: ' + buttonMsg);
				self.buttonMsg = buttonMsg;

				didMove = true;
				var buttonsLeft = new Array();
				var currentButton = k;
				for (var button = (numVaultButtons - 1); button >= (0); button--) {
					if (button != currentButton)
						buttonsLeft.push(button);
				}

				for (var pos = 0; pos < numVaultButtons; pos++) {
					if (pos != buttonMsg) {
						var buttonsLeftPop = buttonsLeft.pop();
						var x = buttonsLeftPop + (numVaultButtonsBefore);
						moveToSlot[pos].top = vaultPoints[pos].y;
						moveToSlot[pos].left = vaultPoints[pos].x;

						try {
							vaults[x].button.animate(moveToSlot[pos]);
							vaults[x].vaultDisplayOrder = vaultPoints[pos].pos;
							vaults[x].button.newDisplayOrder({
								displayOrder : vaultPoints[pos].pos
							});
						} catch (err) {
							alert(buttonsLeftPop + ':' + numVaultButtonsBefore + ':' + numVaultButtons);
						}

					} else {
						try {
							vaults[currentButton + (numVaultButtonsBefore)].vaultDisplayOrder = vaultPoints[pos].pos;
						} catch (err) {
							alert('Error at _2_vault_select.js line 372, value for currentButton=: ' + currentButton);
							return;
						}

						vaults[currentButton + (numVaultButtonsBefore)].button.newDisplayOrder({
							displayOrder : vaultPoints[pos].pos
						});
						returnToSlot2.left = vaultPoints[pos].x;
						returnToSlot2.top = vaultPoints[pos].y;
						returnToSlot2.i = i;
						returnToSlot2.j = j;
						returnToSlot2.k = k;
					}

				}

			}

		}
	};

	function prepareForNextScreen(nextScreen, changeViewRightFlag, changeViewLeftFlag) {
		//1.  is there a next screen?
		var numberOfViews = numberOfScreens();
		if (nextScreen > numberOfViews) {
			vaultViews.push(Titanium.UI.createView({
				top : 0, //50
				height : 507, //457 446
				left : 0,
				right : 0,
				contentHeight : 'auto',
				contentWidth : '100%'
			}));

			insideViews.push(Ti.UI.createView({
				top : 0,
				height : 507,
				left : 0,
				right : 0
			}));

			vaultViews[nextScreen].add(insideViews[nextScreen]);

			newVaults[nextScreen] = new Vault();
			var newVaultLoc = NewVaultLoc(1);

			newVaults[nextScreen].vaultScreen = nextScreen;
			newVaults[nextScreen].createNewButton();
			newVaults[nextScreen].button.left = newVaultLoc.left;
			newVaults[nextScreen].button.top = newVaultLoc.top;

			newVaults[nextScreen].button.addEventListener('click', function(e) {
				mietf.stopVaultWobble();

				var VaultNewSlideout = require('vaultNewSlideout');
				vaultNewSlideout = new VaultNewSlideout({
					parent : parent
				});
				parent.add(vaultNewSlideout);

				vaultNewSlideout.slideIn({
					j : e.source.vaultScreen
				});
				makeVaults();
				Ti.API.info('New vault click');
			});

			insideViews[nextScreen].add(newVaults[nextScreen].button);
			sView.views = vaultViews;
			parent.resetPagingControl();
			self.fireEvent('touchend', {});
		} else {

			if (changeViewRightFlag) {
				var vaultsOnScreen = numberOfButtons(nextScreen);
				var carryOn = false;
				if (vaultsOnScreen == 5) {
					carryOn = true;
					animLastVaultFlag = 'RIGHT';
					vaultToExit = vaults[vaultIdDictionary[vaultsForScreen[4].vaultId]];

				}

				while (carryOn) {
					nextScreen++;
					var vaultsOnScreen = numberOfButtons(nextScreen);
					if (vaultsOnScreen < 5)
						carryOn = false;

					addOneToAllVaults(nextScreen);
					//nextScreen now has 2- 6
					moveLastVaultRight(nextScreen - 1);
					//toss vault 5 to next screen (if that is the max, or vault 6 to next screen if that is the max)
					//also animate the vault off the screen

					//

				}

			}

			if (changeViewLeftFlag) {

				var vaultsOnScreen = numberOfButtons(nextScreen);
				if (vaultsOnScreen == 5) {
					animLastVaultFlag = 'LEFT';
					vaultToExit = vaults[vaultIdDictionary[vaultsForScreen[4].vaultId]];
					addOneToAllVaults(nextScreen);
					//nextScreen now has 2- 6
					moveLastVaultRight(nextScreen);

				}

			}

		}

	};

	function handleMove(_args) {

		if (animLastVaultFlag == 'RIGHT') {
			Ti.API.info('right');
			vaultToExit.button.animate(exitStageRight);
			animLastVaultFlag = 'NO';
		}

		if (animLastVaultFlag == 'LEFT') {
			Ti.API.info('left');
			vaultToExit.button.animate(exitStageLeft);
			animLastVaultFlag = 'NO';
		}

		var buttonSpaceToOccupy = 4;

		vaultButtonMv.left = topX - offset2.x + _args.adjustment;
		vaultButtonMv.top = topY - offset2.y;

		if (vaultButtonMv.top < 347) {//top ///anohter adjustment
			buttonSpaceToOccupy = 1;
			if (vaultButtonMv.left < 254)
				buttonSpaceToOccupy = 0;
			if (vaultButtonMv.left > 568)
				buttonSpaceToOccupy = 2;
		} else {//bottom
			if (vaultButtonMv.left < 254)
				buttonSpaceToOccupy = 3;
		}

		if (buttonSpaceToOccupy > numVaultButtons - 1)
			buttonSpaceToOccupy = numVaultButtons - 1;

		if (self.buttonMsg != buttonSpaceToOccupy) {
			var j = _args.j;
			var k = _args.k;
			self.buttonMsg = buttonSpaceToOccupy;
			didMove = true;
			var currentEmptySpace = k;

			if (currentEmptySpace > buttonSpaceToOccupy) {
				for (var x = 0; x < vaultsForScreen.length; x++) {

					var curVault = vaults[vaultIdDictionary[vaultsForScreen[x].vaultId]];
					var currentDisplayPos = curVault.vaultDisplayOrder;
					if (currentDisplayPos >= buttonSpaceToOccupy && currentDisplayPos < currentEmptySpace) {
						moveToSlot[currentDisplayPos + 1].top = vaultPoints[currentDisplayPos + 1].y;
						moveToSlot[currentDisplayPos + 1].left = vaultPoints[currentDisplayPos + 1].x;

						curVault.button.animate(moveToSlot[currentDisplayPos + 1]);
						curVault.vaultDisplayOrder = vaultPoints[currentDisplayPos + 1].pos;
						curVault.button.newDisplayOrder({
							displayOrder : vaultPoints[currentDisplayPos + 1].pos
						});

					}

				}

				vaultButtonMv.k = buttonSpaceToOccupy;
				//after moves, this is the new space
				returnToSlot.left = vaultPoints[buttonSpaceToOccupy].x;
				returnToSlot.top = vaultPoints[buttonSpaceToOccupy].y + 147;
				returnToSlot.i = vaultButtonMv.i;
				returnToSlot.j = j;
				returnToSlot.k = buttonSpaceToOccupy;

			}

			if (currentEmptySpace < buttonSpaceToOccupy) {

				for (var x = 0; x < vaultsForScreen.length; x++) {//looping through all vaults on screen

					var curVault = vaults[vaultIdDictionary[vaultsForScreen[x].vaultId]];
					var currentDisplayPos = curVault.vaultDisplayOrder;
					if (currentDisplayPos <= buttonSpaceToOccupy && currentDisplayPos > currentEmptySpace) {
						moveToSlot[currentDisplayPos - 1].top = vaultPoints[currentDisplayPos - 1].y;
						//this should always have six positions
						moveToSlot[currentDisplayPos - 1].left = vaultPoints[currentDisplayPos - 1].x;

						curVault.button.animate(moveToSlot[currentDisplayPos - 1]);
						curVault.vaultDisplayOrder = vaultPoints[currentDisplayPos - 1].pos;
						curVault.button.newDisplayOrder({
							displayOrder : vaultPoints[currentDisplayPos - 1].pos
						});

					}

				}

				vaultButtonMv.k = buttonSpaceToOccupy;
				returnToSlot.left = vaultPoints[buttonSpaceToOccupy].x;
				returnToSlot.top = vaultPoints[buttonSpaceToOccupy].y + 147;
				returnToSlot.i = vaultButtonMv.i;
				returnToSlot.j = j;
				returnToSlot.k = buttonSpaceToOccupy;

			}

		}

	};

	function handleSaveVaults(e) {
		Ti.API.info('handleSaveVaults');
		var i = returnToSlot.i;
		var j = returnToSlot.j;
		var k = returnToSlot.k;

		//save to database
		var curVault = vaults[i];
		curVault.vaultDisplayOrder = k;
		curVault.button.newDisplayOrder({
			displayOrder : k
		});

		curVault.vaultScreen = j;
		//
		resetVaultOrder();
		//121
		makeVaults();
		_args.parent.remove(vaultButtonMv);
		sView.scrollingEnabled = true;
		allowBtnClick = true;
		handlingVaultMove = false;
		isDraggable = false;
		onNewScreen = false;
		isAnimating = false;

		parent.resetPagingControl();

	};

	function handleTouchEnd(e) {
		if (e.source.i != currentVault)
			return;

		if (isAnimating)
			return;
		isAnimating = true;

		Ti.API.info('handleTouchEnd');

		if (onNewScreen) {
			return;
		}

		var i = e.source.i;
		var j = e.source.j;

		if (isDraggable) {
			draggableViews[i].left = e.x - offset.x;
			draggableViews[i].top = e.y - offset.y;
		}
		isDraggable = false;
		vaults[i].button.zIndex = 1;

		if (didAnyMove == true && didMove == false) {
			returnToSlot2.duration = 50;
		}
		vaults[i].button.animate(returnToSlot2);
		//handleTouchEnd
		//draggableViews[i].removeEventListener('touchstart', handleTouchStart);
		//draggableViews[i].removeEventListener('touchmove', handleTouchMove);
		//draggableViews[i].removeEventListener('touchend', handleTouchEnd);
		//draggableViews[i].removeEventListener('longpress', handleLongPress);
		//insideViews[j].remove(draggableViews[i]);

	};

	function handleLongPress(e) {
		Ti.API.info('handleLongPress');
		wasLongpress = true;
		var i = e.source.i;

		sView.scrollingEnabled = false;
		vaults[i].button.zIndex = 21;
		vaults[i].button.zoom();
		isDraggable = true;
	};

	var returnToSlot = Titanium.UI.createAnimation();
	returnToSlot.top = mietf.vaultPoints[1].y;
	returnToSlot.left = mietf.vaultPoints[1].x;
	returnToSlot.duration = 700;
	returnToSlot.i = 1;
	returnToSlot.j = 0;

	returnToSlot.addEventListener('complete', handleSaveVaults);

	var returnToSlot2 = Titanium.UI.createAnimation();
	returnToSlot2.top = mietf.vaultPoints[1].y;
	returnToSlot2.left = mietf.vaultPoints[1].x;
	returnToSlot2.duration = 700;
	//was 700
	returnToSlot2.i = 1;
	returnToSlot2.j = 0;

	var exitStageRight = Titanium.UI.createAnimation();
	exitStageRight.left = 1200;
	exitStageRight.duration = 700;
	exitStageRight.delay = 1000;

	var exitStageLeft = Titanium.UI.createAnimation();
	exitStageLeft.left = 1200;
	exitStageLeft.duration = 700;
	exitStageLeft.delay = 1000;

	returnToSlot2.addEventListener('complete', handleComplete);

	function handleComplete(e) {
		Ti.API.info('handleComplete');
		returnToSlot2.duration = 700;
		var i = returnToSlot2.i;
		var j = returnToSlot2.j;
		var k = returnToSlot2.k;

		var tempDisplayOrder = vaults[i].vaultDisplayOrder;

		///  This is a workaround to get the drag and drop to work.
		/*
		var tmpBtn = new Vault({
		vaultId : vaults[i].vaultId,
		parent : self,
		id : i
		});

		tmpBtn.button.left = returnToSlot2.left;
		tmpBtn.button.top = returnToSlot2.top;
		tmpBtn.button.zIndex = 30;
		insideViews[j].add(tmpBtn.button);

		//vaults[i].button.removeEventListener('click', vaultButtonClickHandler);
		insideViews[j].remove(vaults[i].button);

		vaults[i].vaultDisplayOrder =tempDisplayOrder;//is any of this necessary?
		vaults[i].vaultScreen = j;
		vaults[i].k=k;
		vaults[i].createButton(self, i);

		vaults[i].button.newDisplayOrder({
		displayOrder :tempDisplayOrder //unnecessary
		});

		vaults[i].button.left = returnToSlot2.left;
		vaults[i].button.top = returnToSlot2.top;
		//vaults[i].button.addEventListener('click', vaultButtonClickHandler);

		insideViews[j].add(vaults[i].button);
		insideViews[j].remove(tmpBtn.button);

		///  End of workaround
		*/
		vaults[i].button.zoomOut();
		offset = {};

		/*draggableViews[i] = Titanium.UI.createView({
		width : 208,
		height : 224,
		top : returnToSlot2.top,
		left : returnToSlot2.left,
		zIndex : 22,
		i : i,
		j : j,
		k : k
		});
		*/
		//		draggableViews[i].add(Ti.UI.createLabel({
		//			text: 'k:' + k,
		//			top: 5
		//		}));

		//insideViews[j].add(draggableViews[i]);
		//draggableViews[i].addEventListener('touchstart', handleTouchStart);
		//draggableViews[i].addEventListener('touchmove', handleTouchMove);
		//draggableViews[i].addEventListener('touchend', handleTouchEnd);
		//draggableViews[i].addEventListener('longpress', handleLongPress);

		Ti.API.info('didMove:' + didMove + ', wasLongpress:' + wasLongpress + ',didAnyMove:' + didAnyMove + ', isDraggable: ' + isDraggable);

		if (didMove == false) {

			if (wasLongpress == true) {
				mietf.stopVaultWobble();
				vaults[i].isWobbling = true;
				vaults[i].button.wobble();
				//stops and restarts wobble if long press is strue
			}
			//
			if (wasLongpress == false) {
				didMove = false;
				allowBtnClick = true;

				if (!didAnyMove) {
					isDraggable = false;

					//Ti.API.info('vaultButtonClickHandler2');
					//vaultButtonClickHandler2(i);
					//vaults[i].button.fireEvent('click', {});

					//here or in click handlers?
				}
				if (vaults[i].isWobbling)
					vaults[i].button.wobble();
			}
		} else {//didMove = true
			
			
					//sort
/*
		vaults.sort(function (a,b) {
			return ((a.vaultScreen*10)+a.vaultDisplayOrder) - ((b.vaultScreen*10)+b.vaultDisplayOrder);
		});
			
			for (i=0; i< vaults.length; i++) {
				Ti.API.info('i: ' + i + ', vaultScreen: ' + vaults[i].vaultScreen + ', vaultDisplayOrder: '+ vaults[i].vaultDisplayOrder + ', vaultName: ' + vaults[i].vaultName);
 				vaults[i].k =  vaults[i].vaultDisplayOrder;
			}
	*/
			
			makeVaults();
			//Is this still necessary? Yes, at the moment, because all draggable views must be reset.
			//resetDraggableViews(j);
			sView.scrollingEnabled = true;
			allowBtnClick = true;
		}
		isAnimating = false;
	};

	function resetDraggableViews(j) {

		vaultPoints = [{
			x : mietf.vaultPoints[0].x,
			y : mietf.vaultPoints[0].y,
			pos : 0
		}];
		vaultPoints.push({
			x : mietf.vaultPoints[1].x,
			y : mietf.vaultPoints[1].y,
			pos : 1
		});
		vaultPoints.push({
			x : mietf.vaultPoints[2].x,
			y : mietf.vaultPoints[2].y,
			pos : 2
		});
		vaultPoints.push({
			x : mietf.vaultPoints[3].x,
			y : mietf.vaultPoints[3].y,
			pos : 3
		});
		vaultPoints.push({
			x : mietf.vaultPoints[4].x,
			y : mietf.vaultPoints[4].y,
			pos : 4
		});

		vaultPoints.push({
			x : mietf.vaultPoints[5].x,
			y : mietf.vaultPoints[5].y,
			pos : 5
		});

		var newVaultLocIndex = 1;

		var k = 0;
		numVaultButtons = numberOfButtons(j);
		numVaultButtonsBefore = numberOfButtonsBefore(j);

		for (var i = numVaultButtonsBefore; i < numVaultButtonsBefore + 5; i++) {///NO LONG NECESSARY

			if (k < numVaultButtons) {

				draggableViews[i].removeEventListener('longpress', handleLongPress);
				draggableViews[i].top = vaultPoints[k].y;
				draggableViews[i].left = vaultPoints[k].x;
				draggableViews[i].i = numVaultButtonsBefore + vaults[i].button.vaultDisplayOrder;
				draggableViews[i].k = k;
				draggableViews[i].addEventListener('longpress', handleLongPress);

			}

			k++;

		}//end inside loop

		allowTouch();
		//this is likely unncessary

	}


	self.deleteVault = function(vault) {
		
		var MiAlertYesNo  = require('miAlertYesNo'),
			dialog = new MiAlertYesNo({parent: self, text: 'Would you like to permanently delete this vault?  This task cannot be undone.', opaque: true, smallText: true});
		
		
		dialog.addEventListener('finished', function(e) {


			if (e.text == 'No') {//NO
							var MiAlert  = require('miAlert'),
									miAlert = new MiAlert({parent: self, text: 'Cancelled.', opaque: true});
				    	
				    		miAlert.open({
				    			animate: true
				    		});
			} else {//Yes
				deleteVaultById({
					vaultId : vault.vaultId
				});
				Ti.App.fireEvent('resetPaging', {});
				makeVaults();
				sView.scrollingEnabled = true;
			}

		});
						dialog.open({
				    			animate: true
				    		});
	};

	self.updateButton = function(e) {
		for (var i = 0; i < vaults.length; i++) {
			if (vaults[i].button.vaultId == e.vaultId) {
				vaults[i].button.updateButton({
					lockPasscode : e.lockPasscode
				});
				vaults[i].lockPasscode = e.lockPasscode;
				//oh boy is this all confused
			}
		}

	};

	self.buttonClickOn = function(e) {
		allowBtnClick = true;
	};

	self.snapImage = function(e) {
		var id = e.id;

		//let's try to hide the blink

		var saveLeft = vaults[id].button.left;
		var saveTop = vaults[id].button.top;

		var VaultButton = require('vaultButtonWithText');
		var vaultButtonTemp = new VaultButton(vaults[id]);

		vaultButtonTemp.left = saveLeft;
		vaultButtonTemp.top = saveTop;
		

		self.add(vaultButtonTemp);

		try {
			vaults[id].button.opacity = 0;
		} catch (err) {
			alert('Error at _2_vault_select.js line 76: ' + err.message);
			return;
		}
		//sViewPagingControl.opacity=0;
		var Blob = sView.toImage(null, false);
		//was self
		//sViewPagingControl.opacity=1;

		try {
			vaults[id].button.opacity = 1;
			self.remove(vaultButtonTemp);
		} catch (err) {

		}

		var returnView = Ti.UI.createImageView({
			touchEnabled : false,
			returnTop : 147,
			returnLeft : 0,
			returnWidth : 1024,
			returnHeight : 595,
			top : 147,
			left : 0,
			width : 1024,
			height : 595,
			image : Blob
		});

		return returnView;
	};

	self.fadeIn = function(e) {
		var fadeInAnim = Ti.UI.createAnimation({
			duration : 1200,
			curve : Titanium.UI.ANIMATION_CURVE_LINEAR
		});

		self.animate(fadeInAnim);
		
		mietf.setScreen({scrn:'vaultSelect'});

	};
	
	Ti.App.addEventListener('gotoVault', function(e) {
		var vault = new Vault();
		vault.getVaultById(e.vaultId);
		sView.currentPage = vault.vaultScreen;
		//sView.scrollToView(vault.vaultScreen);
		
		for (i=0; i< vaults.length; i++) {
		  if (vaults[i].vaultId == e.vaultId) var id = i;	
		}
		
		vaultButtonClickHandler2(id);
		
	});

	return self;
};

module.exports = vaultSelect;
