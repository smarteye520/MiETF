
var pause = function(e) {
	for (i=0; i< 10000000;i=i+.0001) {}
};

// Better - define a single namespace to hold all your variables
var myapp = {}; // namespace and only global variable
myapp.key = 'value';

Ti.App.Properties.setString('unlockControlPreference', Ti.App.Properties.getString('unlockControlPreference', 'comboLock'));

// add a function to your namespace
myapp.dosomething = function(foo) {
	// do something
};

var ticker_last_updated = "";
if (!Ti.App.Properties.hasProperty('ticker_last_updated')) {
	ticker_last_updated = '2017-08-15';
	Ti.App.Properties.setString('ticker_last_updated','2017-08-15');
} else {
	ticker_last_updated = Ti.App.Properties.getString('ticker_last_updated');
}

// extend and encapsulate by using self-calling functions
(function() {
    function helper() {
        // this is a private function not directly accessible from the global scope
    }

    myapp.info = function(msg) {
		// added to the app's namespace, so a public function
        helper(msg);
        Ti.API.info(msg);
    };
})();
// you could then call your function with
myapp.info('Hello World');

var mietf = {};
mietf.ETFVersionId = 0;
mietf.buildTarget = 'MiETF';
mietf.screenOffset = 0;
mietf.maskModeStep = 0;
mietf.mietfButtonEverClicked = false;
mietf.portfolioButtonEverClicked = false;
mietf.vaultButtonEverClicked = false;
mietf.mietfAddButtonClick = false;
mietf.pieMode = 'pieMode';
mietf.copyResults = [];
mietf.copyIndex = [];
mietf.copynewETFVersionId = [];
mietf.stockStack = [];
mietf.indexStack = [];
mietf.firstRowDate = 0;
mietf.lastRowDate = 0;
mietf.firstRowValue = 0;
mietf.lastRowValue = 0;
mietf.plainCount = 0;
mietf.plainElapsed = 0;
mietf.strategyClose = [];
mietf.viewMode = false;
mietf.viewInterface = null;
mietf.editInterface = null;
mietf.currentVault = 0;


mietf.index = [];
mietf.strategyArr = new Array();
mietf.strategyArray = new Array();
var currentWindow = null;
var lockScreen = function(sec){
	var overLay = Ti.UI.createView({width:'100%', height:'100%', top:0, left:0, backgroundColor:'transparent', opacity :0.2, zIndex:10000});
	currentWindow.add(overLay);
	setTimeout(function(){
		currentWindow.remove(overLay);
		overLay = null;
	}, sec*1000);
};

function myStrategy(id, displayLine1, displayLine2, q1id, q2id, q2index) {
  this.id = id;
  this.displayLine1 = displayLine1;
  this.displayLine2 = displayLine2;
  this.q1id = q1id;
  this.q2id = q2id;
  this.q2index = q2index;
};

function newStrategy(id) {
  this.id = id;
  
 	var stg1 = 1 << 8; // 256
	var stg2 = 1 << 9; // 512
	var reallocFlag = 1 << 10; //1024
	var typeFlag = 1 << 11; //2048
	
	var strategy = 0;
	
	//determine the strategy
	var col4 = id;

	if ((col4 & stg1) && (col4 & stg2)) {
		strategy = 3;
		col4 = col4 ^ stg1 ^ stg2;
	}

	if (col4 & stg2)  {
		strategy = 2;
		col4 = col4 ^ stg2;
	}

	if (col4 & stg1) {
		strategy = 1;
		col4 = col4 ^ stg1;
	}

	var realloc = 0;

	if (col4 & reallocFlag) {
		realloc = 1;
		col4 = col4 ^ reallocFlag;
	}

	var type = 0;
	
	if (col4 & typeFlag) {
		type = 1;
		col4 = col4 ^ typeFlag;
	}

	var periodChoices = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually'];
	var period = col4;
  
  if (strategy ==0) {
  	this.col1 = 'qstn1';
  	if (type == 0) this.displayLine1 = periodChoices[period];
  	if (type == 1) this.displayLine1 = Number(col4+1) + '%';
  	this.displayLine2 = 'Rebalance';
  }
  
  if (strategy ==1) {
  	this.col1 = 'qstn2';
  	if (realloc ==0) {
  	if (type == 0) this.displayLine1 = '5%; ' + periodChoices[period];
  	if (type == 1) this.displayLine1 = '5%; ' + Number(col4+1) + '%';
  	this.col2 = 'qstn5';
  }
  	
  if (realloc ==1) {
  	if (type == 0) this.displayLine1 = '10%; ' + periodChoices[period];
  	if (type == 1) this.displayLine1 = '10%; ' + Number(col4+1) + '%';	
  	this.col2 = 'qstn6';
  	}
  	this.displayLine2 = 'Winners';
  }
  
  this.col3 = 'qstn7';
  if (type ==1) this.col3 = 'qstn8';
  
  if (strategy ==2) {
  	this.col1 = 'qstn3';
  	if (realloc ==0) {
  		if (type == 0) this.displayLine1 = '5%; ' + periodChoices[period];
  		if (type == 1) this.displayLine1 = '5%; ' + Number(col4+1) + '%';
  		this.col2 = 'qstn5';	
  	}
  	
  	if (realloc ==1) {
  		if (type == 0) this.displayLine1 = '10%; ' + periodChoices[period];
  		if (type == 1) this.displayLine1 = '10%; ' + Number(col4+1) + '%';	
  		this.col2 = 'qstn6';
  	}
  	this.displayLine2 = 'Arbitrage';
  }  
  
  if (strategy ==3) {
  	this.col1 = 'qstn4';
  	this.displayLine1 = '';
  	this.displayLine2 = 'Hold';
  }
  
  this.strategy = strategy;
  this.realloc =  realloc;
  this.type = type;
  this.period = period;
  this.priceMove = Number(col4+1) + '%';
  this.priceTrigger = Number(col4+1);
  if (type == 0) this.col4Title = periodChoices[period];
  if (type == 1) this.col4Title = Number(col4+1) + '%';
  
  
  function whoKnowsWhat(id) {
  	
  };
  
  newStrategy.prototype.whoKnowsWhat = whoKnowsWhat;
}
/*
 * strategy is values 0 to 3, rebalance, winners, arbitrage, hold
 * realloc is values 0 to 1, 5% or 10%
 * type is values 0 to 1, Periodically or Price Move
 * col4 is values 0 to 124, but if Periods 0 to 4, mean Daily Weekly Monthly Quarterly Annual
 * otherwise represents the priceMove percentage
 */
mietf.getStrategyId = function(strategy, realloc, type, col4) {
	var stg1 = 1 << 8; // 256
	var stg2 = 1 << 9; // 512
	var reallocFlag = 1 << 10; //1024
	var typeFlag = 1 << 11; //2048
	

	var id = col4;  //0 to 127
	
	if (strategy == 1) id = id | stg1;
	if (strategy == 2) id = id | stg2;
	if (strategy == 3) id = id | stg1 | stg2;
	
	if (realloc) id = id | reallocFlag;
	if (type) id = id | typeFlag;
	
	return id;
};

var stupid = mietf.getStrategyId(3,1,1, 111); //1 - Winners, //0 Arbitrage, //0 Periodically //4 Weekly

mietf.strategyArray[stupid] = new newStrategy(stupid);

//alert(mietf.strategyArray[260].displayLine1 + ' ' + mietf.strategyArray[260].displayLine2);

mietf.strategyArr[0] =  new myStrategy(0, '', 'Hold', 'qstn4', 'cho1', 2); //Nothing
mietf.strategyArr[1] =  new myStrategy(1, 'Daily', 'Rebalance', 'qstn1', 'cho1', 0);
mietf.strategyArr[2] =  new myStrategy(2, 'Weekly', 'Rebalance', 'qstn1', 'cho1', 1);
mietf.strategyArr[3] =  new myStrategy(3, 'Monthly', 'Rebalance', 'qstn1', 'cho1', 2);
mietf.strategyArr[4] =  new myStrategy(4, 'Quarterly', 'Rebalance', 'qstn1', 'cho1', 3);
mietf.strategyArr[5] =  new myStrategy(5, 'Annual', 'Rebalance', 'qstn1', 'cho1', 4);
mietf.strategyArr[6] =  new myStrategy(6, '5%', 'Rebalance', 'qstn1', 'cho2', 0);
mietf.strategyArr[7] =  new myStrategy(7, '10%', 'Rebalance', 'qstn1', 'cho2', 1);
mietf.strategyArr[8] =  new myStrategy(8, '15%', 'Rebalance', 'qstn1', 'cho2', 2);
mietf.strategyArr[9] =  new myStrategy(9, '20%', 'Rebalance', 'qstn1', 'cho2', 3);
mietf.strategyArr[10] =  new myStrategy(10, '25%', 'Rebalance', 'qstn1', 'cho2', 4);
mietf.strategyArr[11] =  new myStrategy(11, '50%', 'Rebalance', 'qstn1', 'cho2', 5);
mietf.strategyArr[12] =  new myStrategy(12, 'Daily', 'Winners', 'qstn2', 'cho1', 0);
mietf.strategyArr[13] =  new myStrategy(13, 'Weekly', 'Winners', 'qstn2', 'cho1', 1);
mietf.strategyArr[14] =  new myStrategy(14, 'Monthly', 'Winners', 'qstn2', 'cho1', 2);
mietf.strategyArr[15] =  new myStrategy(15, 'Quarterly', 'Winners', 'qstn2', 'cho1', 3);
mietf.strategyArr[16] =  new myStrategy(16, 'Annual', 'Winners', 'qstn2', 'cho1', 4);
mietf.strategyArr[17] =  new myStrategy(17, '5%', 'Winners', 'qstn2', 'cho2', 0);
mietf.strategyArr[18] =  new myStrategy(18, '10%', 'Winners', 'qstn2', 'cho2', 1);
mietf.strategyArr[19] =  new myStrategy(19, '15%', 'Winners', 'qstn2', 'cho2', 2);
mietf.strategyArr[20] =  new myStrategy(20, '20%', 'Winners', 'qstn2', 'cho2', 3);
mietf.strategyArr[21] =  new myStrategy(21, '25%', 'Winners', 'qstn2', 'cho2', 4);
mietf.strategyArr[22] =  new myStrategy(22, '50%', 'Winners', 'qstn2', 'cho2', 5);
mietf.strategyArr[23] =  new myStrategy(23, 'Daily', 'Arbitrage', 'qstn3', 'cho1', 0);
mietf.strategyArr[24] =  new myStrategy(24, 'Weekly', 'Arbitrage', 'qstn3', 'cho1', 1);
mietf.strategyArr[25] =  new myStrategy(25, 'Monthly', 'Arbitrage', 'qstn3', 'cho1', 2);
mietf.strategyArr[26] =  new myStrategy(26, 'Quarterly', 'Arbitrage', 'qstn3', 'cho1', 3);
mietf.strategyArr[27] =  new myStrategy(27, 'Annual', 'Arbitrage', 'qstn3', 'cho1', 4);
mietf.strategyArr[28] =  new myStrategy(28, '5%', 'Arbitrage', 'qstn3', 'cho2', 0);
mietf.strategyArr[29] =  new myStrategy(29, '10%', 'Arbitrage', 'qstn3', 'cho2', 1);
mietf.strategyArr[30] =  new myStrategy(30, '15%', 'Arbitrage', 'qstn3', 'cho2', 2);
mietf.strategyArr[31] =  new myStrategy(31, '20%', 'Arbitrage', 'qstn3', 'cho2', 3);
mietf.strategyArr[32] =  new myStrategy(32, '25%', 'Arbitrage', 'qstn3', 'cho2', 4);
mietf.strategyArr[33] =  new myStrategy(33, '50%', 'Arbitrage', 'qstn3', 'cho2', 5);

mietf.Canvas = require('ti.canvas');
mietf.canvas = mietf.Canvas.createView({
			width: 768,
			height: 544,
			zIndex: 1,
			left: 0
		});



mietf.colors = [['#1e3ab0', '#3d75ff'], //these need to be set //dark, light
			['#097700', '#17e900'],
			['#512b6e', '#8565a8'],
			['#920b0f', '#ed1c24'],
			['#ac8216', '#ffc830'],
			['#8d4d1b', '#c97636'], //6
			['#823134', '#e35959'],
			['#005b60', '#009694'],
			['#2a295b', '#3c5389'],
			['#701b3b', '#a1324a'], //10
			['#a048a7', '#dda5f2'],
			['#5020af', '#765aff'],
			['#1970b5', '#3bb1d4'],
			['#39a6a7', '#85f5ff'],
			['#349b68', '#74ff93'],//15
			['#dcb250', '#ffe499'],
			['#e37814', '#ffd02a'],
			['#c34545', '#ff9696'],
			['#dc4e97', '#ff95d9'],
			['#54ba40', '#7aff85']];

mietf.DontBlockRepeat = true;
mietf.reweighOut = false;
mietf.notRunningDownloads = true;
mietf.progressBar = [];
mietf.strategyNum = 0;
mietf.strategySave = 0;

mietf.buttonTitle = 'bogon';
mietf.source = [];
mietf.source.jctFacetETFId = 0;

mietf.source.portfolioId = 0;
mietf.source.mietfId =0;
mietf.source.title = '';

mietf.source.vaultNum = 0;

mietf.source.disableClick = false;


mietf.isPercentAllocation = false;

var folderArray = [];
var touchCanvasArray = [];
var posAnim = [];

mietf.fanoutSpeed = 500;
mietf.currentScreen = 'vaultSelect';

mietf.setScreen = function(screen) {
	mietf.currentScreen = screen;
};

mietf.getScreen = function(screen) {
	return mietf.currentScreen;
};

//showPortfolio
mietf.animFadeInVaultButtonCont = 1000;
mietf.animFadeVaultsToIcon = 1000;

//goPortfolio, vault.js
mietf.animOpenVaultsTime = 1000;
mietf.animvaultWheelAnimSmall = 700;

//index.js, final Portfolio
mietf.animfinalToPortfolioAnimHandlerFadeIn = 200;
mietf.animfadeOutButtonWheel = 200;


//index showETF->_4_portfolio_select

mietf.animFadeOutCloseButton = 500;

//portfolioButton
mietf.animPortfolioButtonFadeOut = 300;
mietf.animPortfolioButtonFadeOutDelay = 400;
mietf.animPortfolioButtonFadeOutText = 400;

//finalToPortfolioAnimHandler
mietf.animFinalToPortFolioAnimSpeed = 1000;
mietf.animFinalToPortFolioAnimDelay = 300;

//index showETF
mietf.animPortfolioSelectFadeOut = 300;
mietf.animPortfolioButtonControlFadeIn = 1000;
mietf.animportfoliosViewToVaultGlass = 750;

//tempBigPortfolioButton
mietf.animgoLargeAnim = 750;
mietf.skipPlayFolderOpen = false;

//_5_mietf_select, upAndOver
mietf.animUpAndOverCoverPage = 300;
mietf.animUpAndOverGoLeft = 165;
mietf.animUpAndOverGoRight = 462;
mietf.animFanOutSpeed = 500;

//buttonclick mietf - _5_mietf_select

mietf.animMietfButtonLarge = 750;
mietf.animMietfSelectFadeOut = 300;

//in index
mietf.animIndexGoMietfButton = 590;
mietf.animIndexGoMietfButton2 = 600;
mietf.animIndexGoMietfButtonControlFadeIn = 1000;
mietf.animmietfAnimShow = 100;


mietf.animTitleControlFadeTitleIn = 1500;
mietf.animTitleControlFadeTitleInSlower = 1500;
mietf.animTitleBlankBeforeFadeIn = 300;
mietf.animTitleFadeOut = 1900;
mietf.animTitleBlankBeforeFadeInSlower = 2100;

mietf.animGraphShow = 3000;

mietf.testNormal = function(e) {
	//showPortfolio
mietf.animFadeInVaultButtonCont = 1000;
mietf.animFadeVaultsToIcon = 1000;

//goPortfolio, vault.js
mietf.animOpenVaultsTime = 1000;
mietf.animvaultWheelAnimSmall = 700;

//index.js, final Portfolio
mietf.animfinalToPortfolioAnimHandlerFadeIn = 200;
mietf.animfadeOutButtonWheel = 200;


//index showETF->_4_portfolio_select

mietf.animFadeOutCloseButton = 500;

//portfolioButton
mietf.animPortfolioButtonFadeOut = 300;
mietf.animPortfolioButtonFadeOutDelay = 400;
mietf.animPortfolioButtonFadeOutText = 400;

//finalToPortfolioAnimHandler
mietf.animFinalToPortFolioAnimSpeed = 1000;
mietf.animFinalToPortFolioAnimDelay = 300;

//index showETF
mietf.animPortfolioSelectFadeOut = 300;
mietf.animPortfolioButtonControlFadeIn = 1000;
mietf.animportfoliosViewToVaultGlass = 750;

//tempBigPortfolioButton
mietf.animgoLargeAnim = 750;
mietf.skipPlayFolderOpen = false;

//_5_mietf_select, upAndOver
mietf.animUpAndOverCoverPage = 300;
mietf.animUpAndOverGoLeft = 165;
mietf.animUpAndOverGoRight = 462;
mietf.animFanOutSpeed = 500;

//buttonclick mietf - _5_mietf_select

mietf.animMietfButtonLarge = 750;
mietf.animMietfSelectFadeOut = 300;

//in index
mietf.animIndexGoMietfButton = 590;
mietf.animIndexGoMietfButton2 = 600;
mietf.animIndexGoMietfButtonControlFadeIn = 1000;

mietf.animmietfAnimShow = 100;

mietf.animTitleControlFadeTitleIn = 1500;
mietf.animTitleControlFadeTitleInSlower = 1500;
mietf.animTitleBlankBeforeFadeIn = 300;
mietf.animTitleFadeOut = 1900;
mietf.animTitleBlankBeforeFadeInSlower = 2100;

mietf.animGraphShow = 3000;
};

////////////////FAST
mietf.testFast = function(e) {
	//showPortfolio
	mietf.animFadeInVaultButtonCont = 1;
	mietf.animFadeVaultsToIcon = 1;
	
	//goPortfolio, vault.js
	mietf.animOpenVaultsTime = 1;
	mietf.animvaultWheelAnimSmall = 1;
	
	//index.js, final Portfolio
	mietf.animfinalToPortfolioAnimHandlerFadeIn = 1;
	mietf.animfadeOutButtonWheel = 1;
	
	//index showETF->_4_portfolio_select
	
	mietf.animFadeOutCloseButton = 1;
	
	//portfolioButton
	mietf.animPortfolioButtonFadeOut = 1;
	mietf.animPortfolioButtonFadeOutDelay = 1;
	mietf.animPortfolioButtonFadeOutText = 1;
	
	//finalToPortfolioAnimHandler
	mietf.animFinalToPortFolioAnimSpeed = 1;
	mietf.animFinalToPortFolioAnimDelay = 1;
	
	//index showETF
	mietf.animPortfolioSelectFadeOut = 1;
	mietf.animPortfolioButtonControlFadeIn = 1;
	mietf.animportfoliosViewToVaultGlass = 1;
	
	//tempBigPortfolioButton
	mietf.animgoLargeAnim = 1;
	mietf.skipPlayFolderOpen = true;
	
	//_5_mietf_select, upAndOver
	mietf.animUpAndOverCoverPage = 1;
	mietf.animUpAndOverGoLeft = 1;
	mietf.animUpAndOverGoRight = 1;
	mietf.animFanOutSpeed = 1;
	
	//buttonclick mietf - _5_mietf_select
	
	mietf.animMietfButtonLarge = 1;
	mietf.animMietfSelectFadeOut = 1;
	
	//in index
	mietf.animIndexGoMietfButton = 1;
	mietf.animIndexGoMietfButton2 = 1;
	mietf.animIndexGoMietfButtonControlFadeIn = 1;
	mietf.animmietfAnimShow = 1;
	
	mietf.animTitleControlFadeTitleIn = 1;
	mietf.animTitleControlFadeTitleInSlower = 1;
	mietf.animTitleBlankBeforeFadeIn = 1;
	mietf.animTitleFadeOut = 1;
	mietf.animTitleBlankBeforeFadeInSlower = 1;	
	
	mietf.animGraphShow = 1;
	
};



mietf.currentVaultColor = 'white';
mietf.isAnimating = false;
mietf.showingAVAnim = false;
mietf.currentVaultScreen = 0;
mietf.isWobbling = false;
mietf.isClickToEdit = false;
mietf.titleControl = [];
mietf.typedNumber = new Array();
mietf.newVaults = new Array();
mietf.currentWobbleVault = [];

mietf.investChoices = ['$100','$1K', '$10K', '$100K', '$1M'];
mietf.investValues = [100, 1000, 10000, 100000, 1000000];

function getListObjectByName(name) {
	return Titanium.App.Properties.getList(name);
}
var tmpChartChoices = Titanium.App.Properties.getList("chartChoices") || ['6 months ago', '1 year ago', '3 years ago','5 years ago', '7 years ago', '10 years ago', '15 years ago', '20 years ago'] ;
Titanium.App.Properties.setList("chartChoices", tmpChartChoices);

var tmpChartPeriods = Titanium.App.Properties.getList("chartPeriods") || ['6 Month', '1 Year', '3 Year', '5 Year', '7 Year', '10 Year', '15 Year', '20 Year'];
Titanium.App.Properties.setList("chartPeriods", tmpChartPeriods);

var tmpChartKeys = Titanium.App.Properties.getList("chartKeys") || ['6month','1year','3year','5year','7year','10year','15year','20year'];
Titanium.App.Properties.setList("chartKeys", tmpChartKeys);

mietf.chartChoices = Titanium.App.Properties.getList("chartChoices"); 
mietf.chartPeriods = Titanium.App.Properties.getList("chartPeriods");
mietf.chartKeys = Titanium.App.Properties.getList("chartKeys");
mietf.filterValues = ['All','Stocks', 'MiETF\'s', 'Bonds', 'Commodities','Currencies'];
Ti.App.Properties.setString('chartDatePeriod', Ti.App.Properties.getString('chartDatePeriod', '6month'));
mietf.chartDatePeriod = Ti.App.Properties.getString('chartDatePeriod', '6month');
Ti.App.Properties.setInt('chartDatePeriodIndex', Ti.App.Properties.getInt('chartDatePeriodIndex', 0));
mietf.chartDatePeriodIndex = Ti.App.Properties.getInt('chartDatePeriodIndex');
if(mietf.chartDatePeriodIndex >= mietf.chartChoices.length){
	mietf.chartDatePeriodIndex = 0;
	mietf.chartDatePeriod = '6month';
	Ti.App.Properties.setInt('chartDatePeriodIndex', 0);
	Ti.App.Properties.setString('chartDatePeriod','6month');
}


mietf.currentPortfolioId = 1;

mietf.folderPos0Points = [{
			left : 310,
			top : 86,
			subPos : 0
		}];
		
mietf.folderPos0Points.push({
			left : 316,
			top : 89,
			subPos : 1
		});
		
mietf.folderPos0Points.push({
			left : 322,
			top : 92,
			subPos : 2
		});
		
mietf.folderPos0Points.push({
			left : 328,
			top: 95,
			subPos : 3
		});
		
	

mietf.rainbowColorNum = 0;
mietf.rainbowColorNumCounter = 0;
mietf.rainbowTransColorNum = 0;
mietf.rainbowLengthConst = 16;

mietf.resetRainbowColors = function(e) {
	mietf.rainbowColorNum = 0;
	mietf.rainbowColorNumCounter = 0;
	mietf.rainbowTransColorNum = 0;
	mietf.rainbowLengthConst = 16;
};
		
mietf.getNextRainbowColorForGraph = function() {
	var returnColor;
	//should you transition?
	if (mietf.rainbowColorNumCounter == mietf.rainbowLengthConst) { //you are transitioning
		returnColor = mietf.colorTransitions[mietf.rainbowColorNum][mietf.rainbowTransColorNum];
		
		mietf.rainbowTransColorNum = mietf.rainbowTransColorNum + 1;
		if (mietf.rainbowTransColorNum == mietf.colorTransitions[mietf.rainbowColorNum].length) {
			mietf.rainbowTransColorNum = 0;
			mietf.rainbowColorNum = mietf.rainbowColorNum + 1;	
			mietf.rainbowColorNumCounter = 0;
		}
	} else {
		returnColor = mietf.rainbowColors[mietf.rainbowColorNum];
		mietf.rainbowColorNumCounter = mietf.rainbowColorNumCounter + 1;
	}
	
	if  (mietf.rainbowColorNum == mietf.rainbowColors.length) mietf.rainbowColorNum = 0;
	return returnColor;
};

mietf.getNextGreyColorForGraph = function() {
	var returnColor;
	//should you transition?
	if (mietf.rainbowColorNumCounter == mietf.rainbowLengthConst) { //you are transitioning
		returnColor = mietf.greyTransitions[mietf.rainbowColorNum][mietf.rainbowTransColorNum];
		
		mietf.rainbowTransColorNum = mietf.rainbowTransColorNum + 1;
		if (mietf.rainbowTransColorNum == mietf.greyTransitions[mietf.rainbowColorNum].length) {
			mietf.rainbowTransColorNum = 0;
			mietf.rainbowColorNum = mietf.rainbowColorNum + 1;	
			mietf.rainbowColorNumCounter = 0;
		}
	} else {
		returnColor = mietf.greyColors[mietf.rainbowColorNum];
		mietf.rainbowColorNumCounter = mietf.rainbowColorNumCounter + 1;
	}
	
	if  (mietf.rainbowColorNum == mietf.rainbowColors.length) mietf.rainbowColorNum = 0;
	return returnColor;
};

mietf.greyColors = ["#575757", "#939393", "#c6c6c6", "#a4a4a4", "#acacac", "#989898", "#555555", "#808080", "#858585"];
mietf.greyTransitions = [  ["#5f5f5f","#5f5f5f",
						   "#6b6b6b","#6b6b6b",
						   "#737373","#737373",
						   "#777777","#777777",
						   "#878787","#878787"],
						[  "#9e9e9e","#9e9e9e",
						   "#a4a4a4","#a4a4a4",
						   "#b1b1b1","#b1b1b1",
						   "#c0c0c0","#c0c0c0",
						   "#c4c4c4","#c4c4c4"],
						[  "#c6c6c6","#c6c6c6",
						   "#c3c3c3","#c3c3c3",
						   "#b9b9b9", "#b9b9b9",
						   "#b2b2b2","#b2b2b2",
						   "#a9a9a9","#a9a9a9"],
						[  "#a4a4a4","#a4a4a4",
						   "#a4a4a4","#a4a4a4",
						   "#a7a7a7","#a7a7a7",
						   "#a9a9a9", "#a9a9a9",
						   "#acacac","#acacac"],
					   [   "#acacac","#acacac",
						   "#ababab","#ababab",
						   "#a3a3a3","#a3a3a3",
						   "#9c9c9c","#9c9c9c",
						   "#989898","#989898"],
					   [   "#989898", "#989898",
						   "#989898","#989898",
						   "#868686", "#868686",
						   "#6f6f6f", "#6f6f6f",
						   "#636363","#636363"],
					   [   "#555555","#555555",
						   "#5e5e5e","#5e5e5e",
						   "#6b6b6b","#6b6b6b",
						   "#737373","#737373",
						   "#787878","#787878"],
					  [    "#808080", "#808080",
						   "#818181", "#818181",
						   "#828282", "#828282",
						   "#848484","#848484",
						   "#858585","#858585"],
					 [     "#858585", "#858585",
						   "#7e7e7e", "#7e7e7e",
						   "#727272", "#727272",
						   "#686868","#686868",
						   "#626262","#626262"]
				   ];


		
mietf.rainbowColors = ["#ff2833", "#f4831a", "#ffc906", "#6fbd44", "#4fc5c8", "#4da7de", "#69489c", "#b267e2", "#f160b6"];
mietf.colorTransitions = [  ["#ff2b33","#ff2b33",
						   "#fe3a2f","#fe3a2f",
						   "#fd3e2e","#fd3e2e",
						   "#f96323","#f96323",
						   "#f6781e","#f6781e"],
						[  "#f58819","#f58819",
						   "#f79716","#f79716",
						   "#faa710","#faa710",
						   "#fcb70c","#fcb70c",
						   "#ffc607","#ffc607"],
						[  "#fdc907","#fdc907",
						   "#e6c811","#e6c811",
						   "#c3c421", "#c3c421",
						   "#a1c22f","#a1c22f",
						   "#7fbf3d","#7fbf3d"],
						[  "#6fbd43","#6fbd43",
						   "#6bbe53","#6bbe53",
						   "#65c072","#65c072",
						   "#5dc28f", "#5dc28f",
						   "#57c4ad","#57c4ad"],
					   [   "#4fc4c9","#4fc4c9",
						   "#4fbece","#4fbece",
						   "#4eb6d4","#4eb6d4",
						   "#4eafda","#4eafda",
						   "#4da8dd","#4da8dd"],
					   [   "#4da6dd", "#4da6dd",
						   "#5395d1","#5395d1",
						   "#5a7cc1", "#5a7cc1",
						   "#6164b1", "#6164b1",
						   "#684ea0","#684ea0"],
					   [   "#6a489d","#6a489d",
						   "#764ea8","#764ea8",
						   "#8755b9","#8755b9",
						   "#975cc9","#975cc9",
						   "#975cc9","#975cc9"],
					  [    "#b867df", "#b867df",
						   "#c765d5", "#c765d5",
						   "#d763c9", "#d763c9",
						   "#e762be","#e762be",
						   "#f161b6","#f161b6"],
					 [     "#f35dad", "#f35dad",
						   "#f55190","#f55190",
						   "#f94473", "#f94473",
						   "#fc3756","#fc3756",
						   "#ff2b39","#ff2b39"]
				   ];
				   
	
mietf.folderPos0Animations = [Ti.UI.createAnimation({
						left : mietf.folderPos0Points[0].left,
						top : mietf.folderPos0Points[0].top,
						width: 97,
						height: 124,
						duration: 300,
						curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
					})];
					
mietf.folderPos0Animations.push(Ti.UI.createAnimation({
						left : mietf.folderPos0Points[1].left,
						top : mietf.folderPos0Points[1].top,
						width: 97,
						height: 124,
						duration: 300,
						curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
					}));
					
mietf.folderPos0Animations.push(Ti.UI.createAnimation({
						left : mietf.folderPos0Points[2].left,
						top : mietf.folderPos0Points[2].top,
						width: 97,
						height: 124,
						duration: 300,
						curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
					}));
					
mietf.folderPos0Animations.push(Ti.UI.createAnimation({
						left : mietf.folderPos0Points[3].left,
						top : mietf.folderPos0Points[3].top,
						width: 97,
						height: 124,
						duration: 300,
						curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
					}));
		
		

		
mietf.folderPosition = [{
			left : 328,
			top : 95,
			pos : 0,
			adjustedLeft: 332,
			adjustedTop: 99
		}];
		
mietf.folderPosition.push({
			left : 405 , 
			top : 172,
			pos : 1,
			adjustedLeft: 0,
			adjustedTop: 0
		});
		
mietf.folderPosition.push({
			left : 482 , 
			top : 249,
			pos : 2,
			adjustedLeft: 0,
			adjustedTop: 0
		});
		
mietf.folderPosition.push({ 
			left : 559 , 
			top: 326, 
			adjustedLeft: 554,
			adjustedTop: 324,
			pos : 3
		});
		
		
		
		
mietf.folderPos3Points = [{
			left : 559,
			top : 326,
			subPos : 0
		}];
		
mietf.folderPos3Points.push({
			left : 565,
			top : 329,
			subPos : 1
		});
		
mietf.folderPos3Points.push({
			left : 571,
			top : 332,
			subPos : 2
		});
		
mietf.folderPos3Points.push({
			left : 577,
			top: 335,
			subPos : 3
		});
		
mietf.folderPos3Points.push({
			left : 583,
			top: 338,
			subPos : 4
		});
		
		
mietf.folderPos3Animations = [Ti.UI.createAnimation({
						left : mietf.folderPos3Points[0].left,
						top : mietf.folderPos3Points[0].top,
						width: 114,
						height: 146,
						duration: 300,
						curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
					})];
					
mietf.folderPos3Animations.push(Ti.UI.createAnimation({
						left : mietf.folderPos3Points[1].left,
						top : mietf.folderPos3Points[1].top,
						width: 114,
						height: 146,
						duration: 300,
						curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
					}));
					
mietf.folderPos3Animations.push(Ti.UI.createAnimation({
						left : mietf.folderPos3Points[2].left,
						top : mietf.folderPos3Points[2].top,
						width: 114,
						height: 146,
						duration: 300,
						curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
					}));
					
mietf.folderPos3Animations.push(Ti.UI.createAnimation({
						left : mietf.folderPos3Points[3].left,
						top : mietf.folderPos3Points[3].top,
						width: 114,
						height: 146,
						duration: 300,
						curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
					}));
					
mietf.folderPos3Animations.push(Ti.UI.createAnimation({
						left : mietf.folderPos3Points[4].left,
						top : mietf.folderPos3Points[4].top,
						width: 114,
						height: 146,
						duration: 300,
						curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
					}));
					
mietf.mietfPoints = [{ //starting point
			left : 40,
			top : 396,
			pos : 0
		}];
		
mietf.mietfPoints.push({
			left : 368,
			top : 432,
			pos : 1
		});
		
mietf.mietfPoints.push({
			left : 480,
			top : 368,
			pos : 2
		});
		
mietf.mietfPoints.push({
			left : 592,
			top : 304,
			pos : 3
		});
		
mietf.mietfPoints.push({
			left : 704,
			top : 240,
			pos : 4
		});
		
mietf.mietfPoints.push({
			left : 816,
			top : 176,
			pos : 5
		});	
		
		
		
mietf.miPoints = [{
			left : 816,
			top : 176,
			pos : 0
		}];	
		
mietf.miPoints.push({
			left : 704,
			top : 240,
			pos : 1
		});	
		
mietf.miPoints.push({
			left : 592,
			top : 304,
			pos : 2
		});	
		
mietf.miPoints.push({
			left : 480,
			top : 368,
			pos : 3
		});	
		
mietf.miPoints.push({
			left : 368,
			top : 432,
			pos : 4
		});	
		
mietf.miPoints.push({
			left : 256,
			top : 496,
			pos : 5
		});	
				
		
mietf.vaultPoints = [{
			x : 200,
			y : 19,
			pos : 0
		}];
mietf.vaultPoints.push({
			x : 408,
			y : 19,
			pos : 1
		});
mietf.vaultPoints.push({
			x : 616,
			y : 19,
			pos : 2
		});
mietf.vaultPoints.push({
			x : 200,
			y : 259,
			pos : 3
		});
mietf.vaultPoints.push({
			x : 408,
			y : 259,
			pos : 4
		});
		
mietf.vaultPoints.push({
			x : 616,
			y : 259,
			pos : 5
		});



mietf.snapPortfolioImage = function(portfolio) {

		//later remove the vault that you shouldn't snap in some way
	var Blob = portfolio.toImage();

	var returnView = Ti.UI.createImageView({
		touchEnabled : false,
		returnTop : portfolio.top,
		returnLeft : portfolio.left,
		returnWidth : portfolio.width,
		returnHeight : portfolio.height,
		top : portfolio.top,
		left : portfolio.left,
		width : portfolio.width,
		height : portfolio.height,
		image : Blob
	});

	return returnView;
};


mietf.animationPosition = [];
mietf.animationPosition.portfolioOverGlassLeft = 0;
mietf.animationPosition.portfolioOverGlassTop = 355;
mietf.animationPosition.portfolioOverGlassHeight = 150;
mietf.animationPosition.portfolioOverGlassWidth = 200;





mietf.getUnlockControlPreference = function() {
	return Ti.App.Properties.getString('unlockControlPreference', 'comboLock');
};

mietf.getUnlockControlImage = function(vaultNum) {
	var image= 'images/ifapps/combo' + vaultNum + '.pn8';
	if (Ti.App.Properties.getString('unlockControlPreference', 'comboLock') != 'comboLock') var image = 'images/ifapps/keypad' + vaultNum + '.pn8';
	return image;
};

mietf.setUnlockControlPreference = function(preference) {
	Ti.App.Properties.setString('unlockControlPreference', preference);
};

mietf.addTypedNumber = function(number) {
	mietf.typedNumber.push(number);
	return mietf.typedNumber.length;
};

mietf.removeTypedNumber = function(number) {
	if (mietf.typedNumber.length == 0) return -1;
	mietf.typedNumber.pop();
	return mietf.typedNumber.length;
};

mietf.resetTypedNumber = function(number) {
	mietf.typedNumber = new Array();
};



mietf.stopVaultWobbleNew = function() {
	for (i=0; i < mietf.newVaults[mietf.currentVaultScreen].length; i++) {
		mietf.newVaults[mietf.currentVaultScreen][i].button.stopWobble();
	}  	
};

mietf.allWobbleMode = false;
mietf.allPortfolioWobbleMode = false;

mietf.stopPortfolioWobble = function() {
	mietf.allPortfolioWobbleMode = false;

/*
    	for (i=0; i < vaults.length; i++) {
    		vaults[i].isWobbling=false;
    		vaults[i].button.stopWobble();
    	}
    	*/
};


mietf.stopVaultWobble = function() {
	mietf.allWobbleMode = false;
		//vaults[mietf.currentWobbleVault].button.stopWobble();
  isDraggable = false;
    	
	for (i=0; i < vaults.length; i++) {
		vaults[i].isWobbling = false;
		vaults[i].button.stopWobble();
	}
};

mietf.startVaultWobble = function() {
	mietf.allWobbleMode = true;
	isDraggable = true;

	for (i=0; i < vaults.length; i++) {
		vaults[i].isWobbling=true;
		vaults[i].button.wobble();
	}
};

mietf.portWobbleMode = false;

mietf.stopPortWobble = function() {
  mietf.portWobbleMode = false;
	for (i=0; i < folderArray.length; i++) {
		folderArray[i].isWobbling=false;
		folderArray[i].stopWobble();
	}
};


mietf.startPortWobble = function() {
	mietf.portWobbleMode = true;	
	for (i=0; i < folderArray.length; i++) {
		folderArray[i].isWobbling=true;
		folderArray[i].wobble();
	}
};

mietf.getAttrStringForColor = function(color) {
	 	var text = "MiETF";
		var attr = Ti.UI.createAttributedString({
		    	text: text,
		    	attributes: [
		    	{
		           type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
		           value: 'white',
		           range: [text.indexOf('M'), ('M').length]
		       },
		       {
		           type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
		           value: 'white',
		           range: [text.indexOf('ETF'), ('ETF').length]
		       },
		      {
		           type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
		           value: color,
		           range: [text.indexOf('i'), ('i').length]
		       }/*,
		       {
		           type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
		           value: color,
		           range: [text.indexOf('!'), ('!').length]
		       }*/,
		        {
		            type: Ti.UI.ATTRIBUTE_FONT,
		            value: { fontSize: 70, fontFamily: 'AvenirNextCondensed-Bold', fontWeight: 'bold' }, //was 64
		            range: [0, text.length]
		        }
		    ]
		});
	 	
	 	return attr;
	 };

mietf.currentTitle = "Vaults!";
 
mietf.getTitleAttrStringForColor = 	  function(color) {
	  	var title = mietf.currentTitle;
	  	
	  	var attr = Ti.UI.createAttributedString({
		    text: title,
		    attributes: [
	        {
            type: Ti.UI.iOS.ATTRIBUTE_KERN,
            value: 	0.1,
            range: [0, title.length]
	        },
	        {
          	type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: color,
            range: [title.length-1, 1]
	        },
	        {
	         	type: Ti.UI.ATTRIBUTE_FONT,
            value: { fontSize: '36sp', fontFamily: 'AvenirNextCondensed-Bold', fontWeight: 'bold' }, //was 64
            range: [title.length-1, 1]
	        } 
		    ]
		});
		
		return attr;
		
		};

mietf.currentRainbowColor = 0;

mietf.vaultColorDictionary = {} ;             
mietf.vaultColorDictionary[0] = {name: 'yellow', onColor: '#ffb706', color: '#ffc906', attr: mietf.getAttrStringForColor('#ffc906'), titleAttr: mietf.getTitleAttrStringForColor('#ffc906'),  button: 'btn_1.pn8', vaultIconImg: 'vaultbg_yellow_lg@2x.pn8', vaultImg: 'vault_1_lg.pn8', vaultNum: '1'};
mietf.vaultColorDictionary[1] = {name: 'cyan', onColor: '#38b2b7', color: '#4fc5c8', attr: mietf.getAttrStringForColor('#4fc5c8'), titleAttr: mietf.getTitleAttrStringForColor('#4fc5c8'), button: 'btn_2.pn8', vaultIconImg: 'vaultbg_cyan_lg@2x.pn8', vaultImg: 'vault_2_lg.pn8', vaultNum: '2'};
mietf.vaultColorDictionary[2] = {name: 'blue', onColor: '#2d9bd9', color: '#4da7de', attr: mietf.getAttrStringForColor('#4da7de'), titleAttr: mietf.getTitleAttrStringForColor('#4da7de'), button: 'btn_3.pn8', vaultIconImg: 'vaultbg_blue_lg@2x.pn8', vaultImg: 'vault_3_lg.pn8', vaultNum: '3'};
mietf.vaultColorDictionary[3] = {name: 'orange', onColor: '#ed6c1a', color: '#f4831a', attr: mietf.getAttrStringForColor('#f4831a'), titleAttr: mietf.getTitleAttrStringForColor('#f4831a'), button: 'btn_4.pn8', vaultIconImg: 'vaultbg_orange_lg@2x.pn8', vaultImg: 'vault_4_lg.pn8', vaultNum: '4'};
mietf.vaultColorDictionary[4] = {name: 'pink', onColor: '#ff69b4', color: '#f160b6', attr: mietf.getAttrStringForColor('#f160b6'), titleAttr: mietf.getTitleAttrStringForColor('#f160b6'), button: 'btn_5.pn8', vaultIconImg: 'vaultbg_pink_lg@2x.pn8', vaultImg: 'vault_5_lg.pn8', vaultNum: '5'};
mietf.vaultColorDictionary[5] = {name: 'lavender', onColor: '#a753de', color: '#a753de', attr: mietf.getAttrStringForColor('#a753de'), titleAttr: mietf.getTitleAttrStringForColor('#a753de'), button: 'btn_6.pn8', vaultIconImg: 'vaultbg_lavender_lg@2x.pn8', vaultImg: 'vault_6_lg.pn8', vaultNum: '6'};
mietf.vaultColorDictionary[6] = {name: 'red', onColor: '#eb3527', color: '#ff2833', attr: mietf.getAttrStringForColor('#ff2833'), titleAttr: mietf.getTitleAttrStringForColor('#ff2833'), button: 'btn_7.pn8', vaultIconImg: 'vaultbg_red_lg@2x.pn8', vaultImg: 'vault_7_lg.pn8', vaultNum: '7'};
mietf.vaultColorDictionary[7] = {name: 'black', onColor: '#494848', color: '#606060', attr: mietf.getAttrStringForColor('#606060'), titleAttr: mietf.getTitleAttrStringForColor('#606060'), button: 'btn_8.pn8', vaultIconImg: 'vaultbg_black_lg@2x.pn8', vaultImg: 'vault_8_lg.pn8', vaultNum: '8'};
mietf.vaultColorDictionary[8] = {name: 'green', onColor: '#40943d', color: '#6fbd44', attr: mietf.getAttrStringForColor('#6fbd44'), titleAttr: mietf.getTitleAttrStringForColor('#6fbd44'), button: 'btn_9.pn8', vaultIconImg: 'vaultbg_green_lg@2x.pn8', vaultImg: 'vault_9_lg.pn8', vaultNum: '9'};
mietf.vaultColorDictionary[9] = {name: 'purple', onColor: '#53489c', color: '#69489c', attr: mietf.getAttrStringForColor('#69489c'), titleAttr: mietf.getTitleAttrStringForColor('#69489c'), button: 'btn_10.pn8', vaultIconImg: 'vaultbg_purple_lg@2x.pn8', vaultImg: 'vault_10_lg.pn8', vaultNum: '10'};

mietf.graphIndexColor = [2,8,3,9] ;

		

mietf.getCurrentRainbowColor = function() {
	return mietf.vaultColorDictionary[mietf.currentRainbowColor].color;
};


/*
 * mietf.getCurrentRainbowColor = function() {
	return {logo: mietf.vaultColorDictionary[mietf.currentRainbowColor].attr, title: mietf.vaultColorDictionary[mietf.currentRainbowColor].titleAttr};
};
 */

mietf.getNextRainbowColor = function() {
	mietf.currentRainbowColor++;
	if (mietf.currentRainbowColor == 10) mietf.currentRainbowColor = 0;
	return mietf.vaultColorDictionary[mietf.currentRainbowColor].color;
};

/*
 * mietf.getNextRainbowColor = function() {
	mietf.currentRainbowColor++;
	if (mietf.currentRainbowColor == 10) mietf.currentRainbowColor = 0;
	return {logo: mietf.vaultColorDictionary[mietf.currentRainbowColor].attr, title: mietf.vaultColorDictionary[mietf.currentRainbowColor].titleAttr};
};
 */	

var animation = require('alloy/animation');
var mod = require('ti.sevenswitch');
var resDir = Titanium.Filesystem.resourcesDirectory;
var Vault  = require('vault');

Ti.include('includes/settings.js');
Ti.include('includes/images.js');
Ti.include('includes/standard.js');
Ti.include('includes/database.js');

var imgs = new Imgs();
var setting = new Settings();

//transition animation functions on index.js, called from anywhere
var showVaultSelect = function(e) {
	Alloy.createController('alertPopup', {text:'showVault Select did not load from index.js, this is in alloy.js'}).getView().open();
	//alert('showVault Select did not load from index.js, this is in alloy.js');
};

var showVaultSelectFirstTime = function(e) {
	
};

var showNewIntro = function(e){
	
};

var showLockScreen = [];  //to be replaced by the showComboLock, showPortfolio
var showComboLock = [];
var showPortfolio = [];
var showETF = [];
var showAddNewPortoflio = [];
var playFolderOpen = [];
var openPortfolioAddNew = [];
var closePortfolioAddNew = [];
var playIntro = [];

Ti.App.addEventListener('keyboardFrameChanged', function(e){
   Ti.API.info("Keyboard Frame Size Changed\n");
   Ti.API.info("X :"+ e.keyboardFrame.x + "\ny:"+e.keyboardFrame.y+"\nHeight:"+e.keyboardFrame.height+"\nWidth:"+e.keyboardFrame.width);
   
 //if (e.keyboardFrame.y < 500) Ti.App.fireEvent('hideEasyButtons', {});
// if (e.keyboardFrame.y > 500) Ti.App.fireEvent('showEasyButtons', {});
}); 


var buttonWheel = [];
var buttonPortfolio = [];
var buttonLock = [];
var vaultsView = [];
var portfoliosView = [];
var vaultViews = [];
var VaultsBtnEnabled = false;
var PortfolioBtnEnabled = false;
var MietfBtnEnabled = false;
var currentVisibleView = [];
currentVisibleView.fireEvent = function(e) {};
var currentViewName = 'vault';

var pages = [];
var page;
var numberOfPages = 0;
var scrollableView = [];

       
//var masterPassword = (!Ti.App.Properties.hasProperty('masterPassword')) ? '' : Ti.App.Properties.getString('masterPassword');

	Ti.App.Properties.setInt('step1Interval', Ti.App.Properties.getInt('step1Interval', 90));
 	Ti.App.Properties.setInt('step1BlinkInterval', Ti.App.Properties.getInt('step1BlinkInterval', 200));
	Ti.App.Properties.setInt('step1BlinkCount',Ti.App.Properties.getInt('step1BlinkCount',3));

	Ti.App.Properties.setInt('step2Interval',Ti.App.Properties.getInt('step2Interval', 50));
 	Ti.App.Properties.setInt('step2BlinkInterval', Ti.App.Properties.getInt('step2BlinkInterval', 200));
	Ti.App.Properties.setInt('step2BlinkCount',Ti.App.Properties.getInt('step2BlinkCount',3));

	Ti.App.Properties.setInt('step3Interval',Ti.App.Properties.getInt('step3Interval', 90));
 	Ti.App.Properties.setInt('step3BlinkInterval',Ti.App.Properties.getInt('step3BlinkInterval', 200));
	Ti.App.Properties.setInt('step3BlinkCount',Ti.App.Properties.getInt('step3BlinkCount',3));

	Ti.App.Properties.setInt('step4Interval', Ti.App.Properties.getInt('step4Interval', 90));
 	Ti.App.Properties.setInt('step4BlinkInterval',Ti.App.Properties.getInt('step4BlinkInterval', 200));
	Ti.App.Properties.setInt('step4BlinkCount',Ti.App.Properties.getInt('step4BlinkCount',3));

	Ti.App.Properties.setInt('step5Interval', Ti.App.Properties.getInt('step5Interval', 90));
 	Ti.App.Properties.setInt('step5BlinkInterval',Ti.App.Properties.getInt('step5BlinkInterval', 200));
	Ti.App.Properties.setInt('step5BlinkCount',Ti.App.Properties.getInt('step5BlinkCount',3));

	Ti.App.Properties.setInt('step6Interval',Ti.App.Properties.getInt('step6Interval', 90));
 	Ti.App.Properties.setInt('step6BlinkInterval', Ti.App.Properties.getInt('step6BlinkInterval', 200));
	Ti.App.Properties.setInt('step6BlinkCount',Ti.App.Properties.getInt('step6BlinkCount',3));
	

	Ti.App.Properties.setInt('relockTime',Ti.App.Properties.getInt('relockTime',300000));  //in ms, current value 5 minutes
	Ti.App.Properties.setBool('comboLockAllowKeyboardInput',Ti.App.Properties.getBool('comboLockAllowKeyboardInput',false));  //in ms, current value 5 minutes


//initialize vaults
	var vaults = getVaults();
	var vaultIdDictionary = {};  
	
	var colorVaults = new Array();
	var isDraggable = false;
		

 	var colorSelect = new Array();
 	//vaultColor TEXT, vaultIconImg TEXT, vaultImg
	colorSelect.push({colorId: 1, vaultColor: '#3c89b6',  vaultIconImg: 'images/latest/vault_1_sm.pn8', vaultImg: 'images/latest/vault_1_lg.pn8'});
	colorSelect.push({colorId: 2, vaultColor: '#4a3882',  vaultIconImg: 'images/latest/vault_2_sm.pn8', vaultImg: 'images/latest/vault_2_lg.pn8'});
	colorSelect.push({colorId: 3, vaultColor: '#d02519',  vaultIconImg: 'images/latest/vault_3_sm.pn8', vaultImg: 'images/latest/vault_3_lg.pn8'});
	colorSelect.push({colorId: 4, vaultColor: '#ce7400',  vaultIconImg: 'images/latest/vault_4_sm.pn8', vaultImg: 'images/latest/vault_4_lg.pn8'});
	colorSelect.push({colorId: 5, vaultColor: '#d7b700',  vaultIconImg: 'images/latest/vault_5_sm.pn8', vaultImg: 'images/latest/vault_5_lg.pn8'});
	colorSelect.push({colorId: 6, vaultColor: '#639547',  vaultIconImg: 'images/latest/vault_6_sm.pn8', vaultImg: 'images/latest/vault_6_lg.pn8'});
		
		
	var folderImg = [];
	var gotoSelectedMietf = [];
	var addNewMietf = [];
	var addTitleV = [];



Alloy.Globals.animation = require('alloy/animation');
moment = require('alloy/moment');