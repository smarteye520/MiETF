function percentAllocation(_args) {

	var self = Ti.UI.createView({
		top : 80,
		left : 0,
		width : 1024,
		height : 688,
		opacity : 0
	});

	var plusLabel = Ti.UI.createLabel({
		right : 32,
		bottom : 32,
		height : 64,
		text : '+',
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '48sp',
			fontWeight : 'bold'
		}
	});

	//self.add(plusLabel);

	var stockLabel = Ti.UI.createLabel({
		bottom : 32,
		height : 64,
		text : ' ', //don't blank it'
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '24sp',
			fontWeight : 'bold'
		}
	});

	self.add(stockLabel);

	var stockLabelText = '';
	function setStockLabel(text) {
		stockLabelText = text;
		var fadeOutStockLabel = Ti.UI.createAnimation({
			opacity : 0,
			duration : 175
		});

		stockLabel.animate(fadeOutStockLabel);

		fadeOutStockLabel.addEventListener('complete', function(e) {
			stockLabel.text = stockLabelText;
			stockLabel.animate(Ti.UI.createAnimation({
				opacity : 1,
				duration : 175
			}));
		});

	};

	//var ComponentSlideout =  require ('componentSlideout');

	self.showAddComponent = function(e) {
		plusLabel.fireEvent('click', {});
	};

	plusLabel.addEventListener('click', function(e) {
		//var componentSlideout = new ComponentSlideout({parent: self, mietfID: _args.mietfID, ETFVersionId: mietf.ETFVersionId});
		//self.add(componentSlideout);
		//componentSlideout.slideIn();
	});

	var getColumns = [];
	var numCols = 1;
	var colWidth = 120;
	var componentColumns = [];
	var coins = [];
	var coinOverlays = [];
	var noChangesYet = true;
	var didAnyMove = false;

	var ComponentColumn = require('componentColumn');
	var Coin = require('coin');
	var CoinOverlay = require('coinOverlay');

	var val25 = 96;
	var val10 = 72;
	var val5 = 48;

	var coinSizes = {
		25 : val25,
		10 : val10,
		5 : val5
	};

	var centerViewWidth = numCols * colWidth;
	var centerViewLeft = (1024 - centerViewWidth) / 2;
	var centerView = Ti.UI.createView({
		height : 600,
		width : centerViewWidth,
		left : centerViewLeft,
		bottom : 128
	});

	self.add(centerView);

	var coinCounter = 0;

	addCompColumns();
	showCoins();

	var movingCoin = 0;

	function fadeOutCoins(movingCoin) {
		for ( i = 0; i < coins.length; i++) {
			if (i != movingCoin)
				animation.fadeOut(coins[i], 500);
		}
	}

	function fadeInCoins(movingCoin) {
		for ( i = 0; i < coins.length; i++) {
			if (i != movingCoin)
				animation.fadeIn(coins[i], 500);
		}
	}

	function showCoins0(e) {
		var coinFadeout = Ti.UI.createAnimation({
			duration : 200,
			opacity : 0
		});

		coinFadeout.addEventListener('complete', function(e) {
			showCoins();
		});

		coins[coinMoving].animate(coinFadeout);
	}

	function addCompColumns(e) {
		var colors = mietf.colors;

		for ( i = 0; i < componentColumns.length; i++) {
			centerView.remove(componentColumns[i]);
		}

		getColumns = getMietfComponents(mietf.ETFVersionId);
		numCols = getColumns.length;
		if (numCols > 19) {
			plusLabel.opacity = 0;
		} else {
			plusLabel.opacity = 1;
		}
		colWidth = 1000 / numCols;
		if (numCols < 9)
			colWidth = 120;

		//isCash really part of MiETF?
		var isCashReal = true;
		if (getColumns[0].PercentNum == 0)
			isCashReal = false;

		for ( i = 0; i < getColumns.length; i++) {
			var colleft = i * colWidth;

			if (i > 0 && !isCashReal) {
				componentColumns[i] = new ComponentColumn({
					color : [colors[i-1][1], colors[i-1][0]],
					width : colWidth,
					left : colleft,
					facetTickerSymbol : getColumns[i].facetTickerSymbol,
					PercentNum : getColumns[i].PercentNum
				});
			} else {
				componentColumns[i] = new ComponentColumn({
					color : [colors[i][1], colors[i][0]],
					width : colWidth,
					left : colleft,
					facetTickerSymbol : getColumns[i].facetTickerSymbol,
					PercentNum : getColumns[i].PercentNum
				});
			}
			centerView.add(componentColumns[i]);
		}

	}

	function showCoins(e) {
		//first remove, this will be nothing on first run;
		allowTouch = true;

		for ( i = 0; i < coins.length; i++) {
			//animation.fadeOut(coins[i]);
			self.remove(coins[i]);
		}

		for ( i = 0; i < coins.length; i++) {
			self.remove(coins[i]);
		}

		for ( i = 0; i < coinOverlays.length; i++) {
			self.remove(coinOverlays[i]);
		}

		getColumns = getMietfComponents(mietf.ETFVersionId);

		numCols = getColumns.length;
		colWidth = 1000 / numCols;
		if (numCols < 9)
			colWidth = 120;
		//componentColumns = [];
		coins = [];
		coinOverlays = [];
		val25 = 96;
		val10 = 72;
		val5 = 48;

		if (numCols > 10) {
			val5 = 40;
			val25 = 1000 / numCols;
			val10 = (val25 + val5) / 2;
		}

		centerViewWidth = numCols * colWidth;
		centerViewLeft = (1024 - centerViewWidth) / 2;
		centerView.width = centerViewWidth;
		centerView.left = centerViewLeft;
		coinCounter = 0;

		for ( i = 0; i < getColumns.length; i++) {

			var colleft = i * colWidth;

			//componentColumns[i] = new ComponentColumn({width: colWidth, left: colleft, facetTickerSymbol: getColumns[i].facetTickerSymbol, PercentNum: getColumns[i].PercentNum});
			//centerView.add(componentColumns[i]);

			var coinList = getCoinsByPercentNum(getColumns[i].PercentNum);
			componentColumns[i].setPercentBar(getColumns[i].PercentNum);
			var nextCoinBottom = 0;
			for ( j = 0; j < coinList.length; j++) {
				var thisCoinSize = coinSizes[coinList[j]];
				var coinOverlaySize = thisCoinSize;
				if (j == coinList.length - 1)
					coinOverlaySize = coinOverlaySize + 16;
				coinLeft = centerViewLeft + colleft + ((colWidth - thisCoinSize) / 2);
				coinOverlayLeft = centerViewLeft + colleft + ((colWidth - 96) / 2);
				coins[coinCounter] = new Coin({
					colIndex : i,
					index : coinCounter,
					size : thisCoinSize,
					bottom : nextCoinBottom + 184,
					left : coinLeft,
					PercentNum : coinList[j]
				});
				coinOverlays[coinCounter] = new CoinOverlay({
					colIndex : i,
					index : coinCounter,
					size : coinOverlaySize,
					bottom : nextCoinBottom + 184,
					left : coinOverlayLeft,
					PercentNum : coinList[j]
				});

				coinOverlays[coinCounter].addEventListener('touchstart', handleTouchStart);
				coinOverlays[coinCounter].addEventListener('touchmove', handleTouchMove);
				coinOverlays[coinCounter].addEventListener('touchend', handleTouchEnd);

				self.add(coins[coinCounter]);
				self.add(coinOverlays[coinCounter]);
				nextCoinBottom = nextCoinBottom + thisCoinSize;
				coinCounter++;
			}
		}

		for ( i = 0; i < coins.length; i++) {
			animation.fadeIn(coins[i], 500);
		}

	};

	var allowTouch = true;
	var coinMoving = 0;
	var saveX = 0;
	var saveY = 0;
	var selfSaveX = 0;
	var selfSaveY = 0;
	var offset = {};
	var lastColumn = 0;

	function handleTouchStart(e) {
		if (allowTouch) {
			lastColumn = e.source.colIndex;
			didAnyMove = false;
			allowTouch = false;
			coinMoving = e.source.index;
			saveX = e.x;
			saveY = e.y;

			offset.x = coins[e.source.index].left;
			offset.y = coins[e.source.index].bottom;
			coins[e.source.index].zIndex = 500;
			movingCoin = e.source.index;
			fadeOutCoins(movingCoin);
			setStockLabel(getColumns[e.source.colIndex].facetName);

		}
	};

	function handleTouchMove(e) {
		var moveX = saveX - e.x;
		var moveY = saveY - e.y;

		didAnyMove = true;

		coins[e.source.index].bottom = offset.y + moveY;
		coins[e.source.index].left = offset.x - moveX;

		//this code might be slow
		var div = Math.floor((moveX + (colWidth / 2)) / colWidth);

		var newColumn = e.source.colIndex - div;
		if (newColumn > (componentColumns.length - 1))
			newColumn = componentColumns.length - 1;
		if (newColumn < 0)
			newColumn = 0;

		if (newColumn != lastColumn) {
			componentColumns[lastColumn].minusPercentBar(coins[e.source.index].PercentNum);
			componentColumns[newColumn].addPercentBar(coins[e.source.index].PercentNum);
			lastColumn = newColumn;
			setStockLabel(getColumns[newColumn].facetName);
		}
	};

	function handleTouchEnd(e) {
		setStockLabel(' ');

		var movedDistance = (0 - (saveX - e.x)) + (colWidth / 2);
		var div = Math.floor(movedDistance / colWidth);

		var newColumn = e.source.colIndex + div;
		if (newColumn > (componentColumns.length - 1))
			newColumn = componentColumns.length - 1;
		if (newColumn < 0)
			newColumn = 0;

		if (newColumn != e.source.colIndex) {
			if (noChangesYet) {
				//saveOldVersion
				mietf.ETFVersionId = saveMietfComponents(mietf.ETFVersionId);
				noChangesYet = false;
			}
			var amountToChange = coins[e.source.index].PercentNum;
			getColumns = getMietfComponents(mietf.ETFVersionId);
			//is this safe to do?
			var removeJctFacetETFId = getColumns[e.source.colIndex].jctFacetETFId;
			var addJctFacetETFId = getColumns[newColumn].jctFacetETFId;
			changeMietfComponents(mietf.ETFVersionId, removeJctFacetETFId, -amountToChange);
			changeMietfComponents(mietf.ETFVersionId, addJctFacetETFId, amountToChange);

			showCoins0();

		} else {
			if (didAnyMove) {
				showCoins();
			} else {
				fadeInCoins();
			}
		}
	};

	self.addEventListener('pinch', function(e) {
		if (allowTouch)
			Ti.App.fireEvent('endPercentAllocChooser', {});
	});

	function selfHandleTouchStart(e) {
		selfSaveX = e.x;
		selfSaveY = e.y;
	}

	function selfHandleTouchEnd(e) {
		var moveX = selfSaveX - e.x;
		var moveY = selfSaveY - e.y;
		if (allowTouch) {
			if ((Math.abs(moveX) + Math.abs(moveY)) > 65)
				Ti.App.fireEvent('endPercentAllocChooser', {});
		}
	}


	self.addEventListener('touchstart', selfHandleTouchStart);
	self.addEventListener('touchend', selfHandleTouchEnd);

	self.update = function(e) {
		addCompColumns();
		showCoins();
	};

	return self;
};

module.exports = percentAllocation; 