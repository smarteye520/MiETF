	$.index.open();
  currentWindow = $.index;
	var isSearch = false;
	var isSearchVaultId = 1;
	var currentPortfolio = [];
	
	Ti.App.Properties.setBool('firstTime', false); //turning off
	
	var maskMode = Ti.App.Properties.getBool('firstTime', true);
	
	var VideoIntro  = require('_0_video_intro'),
		videoIntro = new VideoIntro({parent: $.index});
	
	var TitleControl  = require('_1_title_control');
		mietf.titleControl = new TitleControl({parent: $.index});
	var VaultSelect  = require('_2_vault_select'),
		vaultSelect = new VaultSelect({parent: $.index});
	mietf.index = $.index;
		
	$.index.add(videoIntro);
	$.index.add(mietf.titleControl);
	
	$.index.add(vaultSelect);
	
	if (!Ti.App.Properties.getBool('firstTime', true)) videoIntro.introPlay(); 	
	
	var CombinationLock  = require('_3_combination_lock'),
		combinationLock = new CombinationLock({parent: $.index});
	var PortfolioSelect  = require('_4_portfolio_select'),
		portfolioSelect = new PortfolioSelect({parent: $.index});
	var MiETFSelect  = require('_5_mietf_select'),
		miETFSelect = new MiETFSelect({parent: $.index, mietfID: 1, title: 'Test'});	
	var VaultButtonControl  = require('_6_vault_button_control'),
		vaultButtonControl = new VaultButtonControl({parent: $.index});	
	var PortfolioButtonControl  = require('_7_portfolio_button_control'),
		portfolioButtonControl = new PortfolioButtonControl({parent: $.index});	

	var MIETFButtonControl  = require('_8_mietf_button_control'),
		mietfButtonControl = new MIETFButtonControl({parent: $.index});	
		
	var ProgressBar  = require('_12_progress_bar'),
		progressBar = new ProgressBar({parent: $.index});
		
		mietf.progressBar = progressBar;	
		
	var PortfolioAddNew  = require('_13_portfolio_add_new'),
		portfolioAddNew = new PortfolioAddNew({parent: $.index});
		
	var MIETFInterface  = require('_9_mietf_interface');
	
	var mietfInterface = new MIETFInterface({parent: $.index, title: '', mietfID: 1, ETFVersionId: 1, portfolioId: 1});	
		//mietfInterface.prepare({ title: 'Blue Chip Stocks', mietfID: 1});
	mietf.editInterface = mietfInterface;	
		
	var DebugDialog = require('DebugDialog');
		
	var PagingControl= require('PagingControl'),
  pagingControl = new PagingControl(vaultSelect.getSView());
			
	$.index.add(combinationLock);
	$.index.add(portfolioSelect);
	$.index.add(miETFSelect);
	$.index.add(vaultButtonControl);
	$.index.add(portfolioButtonControl);
	$.index.add(mietfButtonControl);
	$.index.add(pagingControl);
	$.index.add(mietfInterface);
	$.index.add(progressBar);
	$.index.add(portfolioAddNew);
	

	vault = vaults[0];		


	vaultsView = Ti.UI.createView({
		backgroundColor: "#00ff00"
	});				
	//vaultsView = vaultSelect.snapImage({id: vault.id});
	buttonWheel = Ti.UI.createView({});
	//buttonWheel = vault.getAnimWheel(); 

	vaultsView.opacity=0;
	buttonWheel.opacity=0;
  $.index.add(buttonWheel);
  portfoliosView = Ti.UI.createView({});
	$.index.add(vaultsView);



//////first time run things
////////
var firstTimeStep = 1;
if (Ti.App.Properties.getBool('firstTime', true)) 
	mietf.testFast();

if (Ti.App.Properties.getBool('firstTime', true)) {
	Ti.App.addEventListener('hello1', function(e) {	
		if (Ti.App.Properties.getBool('firstTime', true)) {
			if (firstTimeStep==3) {
				mietf.testNormal();
				//an example MiETF has been selected for you
				//to return to the main interface click on Vaults
				//to return to this MiETF
				//select Samples Vault, Examples Portfolio, Blue Chip Stocks 
				firstTimeStep = 4;
				
				//mask
				
				vaultButtonControl.opacity=0;
				portfolioButtonControl.opacity=0;
				//
				mietfButtonControl.opacity=0; 
				i.opacity=0;
				titleV.opacity=0;
				//
				vaultsView.opacity=0;
				portfoliosView.opacity=0;
				settingsIcon.opacity=0;
				searchIcon.opacity=0;
				
				videoIntro.introPlay();
			}
		}
	
	if (Ti.App.Properties.getBool('firstTime', true)) {
		if (firstTimeStep==2) {
			Ti.App.fireEvent('gotoExampleMietf', { vaultId: 1, portfolioId: 1, mietfId: 1});
			firstTimeStep = 3;
			}
		}
		
	if (Ti.App.Properties.getBool('firstTime', true)) {
		if (firstTimeStep==1) {
			Ti.App.fireEvent('gotoExamplePortfolio', { vaultId: 1, portfolioId: 1});
			firstTimeStep=2;
			}
		}	
		
	
});
};

Ti.App.addEventListener('fadeInMietfControl', function(e) {
	animation.fadeIn(mietfButtonControl, 500);
	animation.fadeIn(i, 500);
	animation.fadeIn(titleV, 500);
});

	mietf.setScreen = function(_args) {
		var oldScreen = mietf.currentScreen;
		mietf.currentScreen = _args.scrn;
		
		if (_args.scrn == 'vaultSelect'||_args.scrn == 'portfolioSelect') {
			var animFadeOut = Ti.UI.createAnimation({opacity: 0, duration: 500});
			animFadeOut.addEventListener('complete', function(e) {
				settingsIcon.applyProperties({width:40,height:40, top :10});
				settingsIcon.backgroundImage = 'images/ifapps/gear.pn8';
			});
			if (mietf.currentScreen != oldScreen) settingsClickableView.animate(animFadeOut);
		} else {
			animation.fadeOut(settingsClickableView, 1000);
		}
	};

	Ti.App.addEventListener('hello1', function(e) {
		if (mietf.currentScreen == 'vaultSelect' || mietf.currentScreen == 'portfolioSelect') {
			animation.fadeIn(settingsClickableView, setting.titleFadeIn);	
		}
	});


	
	Ti.App.addEventListener('resetPaging', function(e) {
		pagingControl.reset();
	});
	
	Ti.App.addEventListener('setCurrentPage', function(e) {
		pagingControl.setCurrentPage(e.pageNumber);
	});
	
	$.index.resetPagingControl = function(e) {
		pagingControl.reset();
	};
		
	var buttonBar = Ti.UI.createView({
		height: 64,
		width: Ti.UI.SIZE,
		top: 16,
		right: 16,
		layout: 'horizontal'
	});
	
	
	
	var searchClickableView = Ti.UI.createView({ width: 48, height: 64, zIndex: 2});
	
	var searchIcon = Ti.UI.createButton({
		left: 0,
		top: 16,
		backgroundImage: 'images/latest/search_ico.pn8',
		width: 32,
		height: 32,
		opacity: 0
	});
	
	searchClickableView.add(searchIcon);
	buttonBar.add(searchClickableView);
	
	searchClickableView.addEventListener('click', function(e) {
		Ti.API.info('mietf.isPercentAllocation ' +mietf.isPercentAllocation);
		if (mietf.isPercentAllocation) {
			Ti.App.fireEvent('endPercentAllocChooser', {scrollToPie: true});
			return;
		}
		closeOtherSlideouts();
		var SnapshotSlideout  = require('searchSlideout'),
			snapshotSlideout = new SnapshotSlideout({parent: $.index});	
		$.index.add(snapshotSlideout);
		snapshotSlideout.slideIn();
	});
	

	var settingsClickableView = Ti.UI.createView({ width: 48, height: 64});
	
	var settingsIcon = Ti.UI.createButton({
		left: 0,
		top: 12,
		backgroundImage: 'images/ifapps/gear.pn8',
		width: 40,
		height: 40,
		touchEnabled: false,
		opacity: 0,
		borderRadius:5
	});
	
	settingsClickableView.add(settingsIcon);
	settingsClickableView.addEventListener('click', function(e) {
		
		Ti.API.info('mietf.currentScreen '+mietf.currentScreen);
		
		if (mietf.currentScreen == 'portfolioSelect') {
			if (mietf.portWobbleMode == false) {
				mietf.startPortWobble();
			} else {
				mietf.stopPortWobble();
			}
			
			return;
		}
		
		if (mietf.currentScreen == 'vaultSelect') {
			if (mietf.allWobbleMode == false) {
				mietf.startVaultWobble();
			} else {
				mietf.stopVaultWobble();
			}
			return;
		}
		
		if (mietf.currentScreen == 'mietfSelect') {
			Ti.API.info('mietf.isPercentAllocation '+mietf.isPercentAllocation);
			if (mietf.isPercentAllocation) {
				Ti.App.fireEvent('endPercentAllocChooser', {});
			}else{
				if(miETFSelect.isWobble){
					miETFSelect.stopWobble();
				}else{
					miETFSelect.startWobble();
				}
				
			}
			return;
		}
		    							
	});

    $.index.showSettingsIcon = function(){
    	animation.fadeIn(settingsClickableView, 500);	
    };
    
    $.index.hideSettingsIcon = function(){
    	animation.fadeOut(settingsClickableView, 500);	
    };
    
	buttonBar.add(settingsClickableView);
	
	Ti.App.addEventListener('closeCorner', function(e) {
		Ti.App.fireEvent('cornerClose', {});
	});
	
	var reweighSlideout = [];

	Ti.App.addEventListener('reweighSlideout', function(e) {
	/*
	var ReweighSlideout  = require('reweighSlideout');
		  reweighSlideout = new ReweighSlideout({parent: $.index});	
	 $.index.add(reweighSlideout);
	 
		reweighSlideout.slideIn();
	*/
		
	var Strategy=Alloy.createController('reweigh', { parent: $.index});
        var strategy = Strategy.getView();
    $.index.add(strategy);
    
    Strategy.slideIn(); //capital
	});
	
	var chatClickableView = Ti.UI.createView({ width: 48, height: 64, right: 48});
	
	var chatIcon = Ti.UI.createButton({
		backgroundImage: 'images/latest/chat_ico.pn8',
		width: 32,
		height: 32,
		left: 0,
		top: 16
	});

    chatClickableView.add(chatIcon);
	//buttonBar.add(chatClickableView);
	
	chatClickableView.addEventListener('click', function(e) {
		closeOtherSlideouts();
		var ChatSlideout  = require('chatSlideout'),
			chatSlideout = new ChatSlideout({parent: $.index});	
		$.index.add(chatSlideout);
	
		chatSlideout.slideIn();
	});


	var infoClickableView = Ti.UI.createView({ width: 48, height: 64});
	
	var infoIcon = Ti.UI.createButton({
		left: 0,
		top: 16,
		backgroundImage: 'images/latest/info_ico.pn8',
		width: 32,
		height: 32
	});
	infoClickableView.add(infoIcon);

	buttonBar.add(infoClickableView);
	
	infoClickableView.addEventListener('click', function(e) {
		closeOtherSlideouts();
		
	var InfoSlideout  = require('infoSlideout'),
		infoSlideout = new InfoSlideout({parent: $.index});	
		//$.index.add(infoSlideout);
		infoSlideout.slideIn();
	});
	
	////////////////////////////
	
	var shoppingClickableView = Ti.UI.createView({ width: 48, height: 64});
	
	var shoppingIcon = Ti.UI.createButton({
		left: 0,
		top: 16,
		backgroundImage: 'images/ifapps/shopping_ico.pn8',
		width: 32,
		height: 32
	});
	shoppingClickableView.add(shoppingIcon);
	shoppingClickableView.addEventListener('click', function(e) {
		/*var Store  = require('store');
		store = new Store({parent: $.index});
		$.index.add(store);*/	
		
	});
	
	//buttonBar.add(shoppingClickableView);


	$.index.add(buttonBar);
	
	
	showVaultSelect = function(e){
		
		//regular
		searchIcon.opacity=0;
		settingsIcon.opacity=1;
		pagingControl.opacity=1;

		mietf.titleControl.setColor({color: 'rainbow'});
		animation.fadeOut( videoIntro, 100, downloadStocks); 
	};
	
	
	
	function downloadStocks(e) {
		progressBar.downloadStocks();
	};

	showVaultSelectFirstTime = function(e){
		mietf.titleControl.setColor({color: 'rainbow'});
		//michaelsFolly.opacity=0;
		mietf.titleControl.setTitleImmediate({title: 'Vaults', isVaults: true});
		searchIcon.opacity=0; //this may change later
		settingsIcon.opacity=1;
		pagingControl.opacity=1;
		Ti.App.fireEvent('gotoVault', { vaultId: 1});

	};

 	if (Ti.App.Properties.getBool('firstTime', true)) {
 		showVaultSelectFirstTime();
 	}
 	
	showComboLock = function(vault){
			mietf.isAnimating = true;
		    Ti.API.info('showComboLock');
			vault = vaults[vault.id]; 
			setTitle(vault);
			vaultButtonControl.fadeInVaultWord();
			//Step 1:  set current Visible view for later steps that hide that view when a button is clicked
			currentVisibleView = combinationLock;
			currentViewName = 'combinationLock';
			//Step 2:  Prep combination lock view
			combinationLock.prepareLock(vault);

			//portfolioSelect.prepare({vaultImg: vault.vaultImg, color: vault.vaultColor, vaultId: vault.vaultId, vaultNum: vault.vaultNum, vaultName: vault.vaultName, showLockButton: 'YES'});
			//Step 3: Get vaultsView (picture of vault icons, minues the one that was clicked)
			
			$.index.remove(vaultsView);
	    	vaultsView = vaultSelect.snapImage({id: vault.id});
	    	$.index.add(vaultsView);
	    	//Step 4: Get buttonWheel
	    	$.index.remove(buttonWheel);
	    	buttonWheel = vault.getAnimWheel(); 
	    	$.index.add(buttonWheel);
			//Step 5: Add buttonWheel, buttonLock to the window
		    //Step 6: Add vaultsView to the window
	    	//Step 7: Hide vaultSelect view
	    	vaultSelect.opacity = 0;
	    	//Step 8: fade in vaultButtonControl (the Vaults button on the left side of the screen that can be clicked to returned to the vaultsSelect view)
			animation.fadeIn(vaultButtonControl, 1000);
			//Step 9: series of animation, at the end ComboLock screen is active.
			var vaultViewToVaultGlass = Ti.UI.createAnimation({
			    duration : 1000,
			   width: 188,
			    height: 109, 
			    top: 138,
			    left: 18
			  });
	  
	 		vaultViewToVaultGlass.addEventListener('complete',animateToLargeComboLock);

	 		//animateToLargeComboLock();
	 		
			Ti.API.info('vaultViewToVaultGlass');
			//alert('vaultViewToVaultGlass');
			vaultsView.animate(vaultViewToVaultGlass);	
			portfolioSelect.prepare({vaultImg: vault.vaultImg, color: vault.vaultColor, vaultId: vault.vaultId, vaultNum: vault.vaultNum, vaultName: vault.vaultName, showLockButton: 'YES'});
			
			
			function animateToLargeComboLock(e) {
				Ti.API.info('animateToLargeComboLock');
				pagingControl.hide();
				buttonWheel.goComboLock(); 
			};	
	};
	

	
	showAddNewPortoflio = function(portfolio) {
	
			//0. Administration
		    mietf.setScreen({scrn:'portfolioAddNew'});
		    mietf.isAnimating = true;
		    currentPortfolio=portfolio;
		    
			//1.  Set Title "portfolioId":rs.fieldByName('portfolioId'), "portfolioName":rs.fieldByName('portfolioName')});
				mietf.titleControl.fadeAndSetTitle({title: 'Add New' + ' Portfolio', isVaults: false});
				mietfButtonControl.title = 'Add New Portfolio';
			//2.  Set currentVisibleView, Name
				currentVisibleView = portfolioAddNew;
				currentViewName = 'portfolioAddNew';
			//3.  call portfolioAddNew.prepare
				portfolioAddNew.prepare(portfolio);
				
			//4.  get buttonPortfolio
			  	buttonPortfolio = portfolioSelect.getBigPortfolioViewForAnim(portfolio);

			  	//5.  get portfolioViewForAnim
		
			//a. fade out button
				portfolioSelect.fadeOutCloseButton();
				
			//b. hide yourself, object oriented yes.
				portfolio.fadeOut();
				
			$.index.remove(portfoliosView);
	    	portfoliosView = mietf.snapPortfolioImage(portfolioSelect);
	    	$.index.add(portfoliosView);
		  	$.index.add(buttonPortfolio); //this is the button, now without text.
			buttonPortfolio.fadeOutText();
		  	
		 //6. hide portfolioSelect, but it shoudl look the same with your animation ready objects
		 	animation.fadeOut(portfolioSelect, 300);
		 	
		 //7. fade in portfolioButtonControl
		 	animation.fadeIn(portfolioButtonControl, 1000);
		 	
		 //8. animate portfoliosView over glass
		 

		var portfoliosViewToVaultGlass = Ti.UI.createAnimation({
			duration : 750,
			width: 172,
			height: 129, 
			top: 320,
			left: 26
		});
		
		portfoliosViewToVaultGlass.addEventListener('complete', animateToLargeFolder);
			Ti.API.info('vaultViewToVaultGlass');

		portfoliosView.animate(portfoliosViewToVaultGlass); 
		//buttonPortfolio.goLarge(); //now runs simultaneously
		
		//9.  animate folder Large 	
			
			function animateToLargeFolder(e) {
				Ti.API.info('animateToLargeFolder');
				buttonPortfolio.goAddNew();  //when complete playFolder open
				pagingControl.hide();
			
			};	
	};
	
	openPortfolioAddNew = function(vaultNum) {
		animation.fadeIn(portfolioAddNew, 200, fadeOutButtonPortfolio);
	};
	
	closePortfolioAddNew = function(vaultNum) {
		animation.fadeIn(buttonPortfolio, 200, fadeOutportfolioAddNew);
	};
	
	function fadeOutportfolioAddNew(e) {
	animation.fadeOut(portfolioAddNew, 200, fadeOutportfolioAddNewDone);
};

function fadeOutportfolioAddNewDone(e) {
	buttonPortfolio.goSmall();
}
	
function fadeOutButtonPortfolio(e) {
	animation.fadeOut(buttonPortfolio, 200, fadeOutButtonPortfolioDone);
};

function fadeOutButtonPortfolioDone(e) {
	mietf.isAnimating = false;
};
	

	
	

	showETF = function(portfolio){
		mietf.setScreen({scrn:'mietfSelect'});
		mietf.currentPortfolioId = portfolio.portfolioId;
		mietf.isAnimating = true;
		currentPortfolio=portfolio;

		//1.  
			//mietf.titleControl.fadeAndSetTitle({title: portfolio.vaultName + ' Portfolio', isVaults: false});
			//mietfButtonControl.title = portfolio.vaultName + ' Portfolio';
			
			mietf.titleControl.fadeAndSetTitle({title: ' ', isVaults: false});
			mietfButtonControl.title = ' ';
			
			
		//2.  Set currentVisibleView, Name
			currentVisibleView = miETFSelect;
			currentViewName = 'miETFSelect';
		//3.  call miETFSelect.prepare
			miETFSelect.prepare(portfolio);
			
		//4.  get buttonPortfolio
		  	buttonPortfolio = portfolioSelect.getBigPortfolioViewForAnim(portfolio);
		  	$.index.add(buttonPortfolio); //this is the button, now without text.
		  	
		//5.  get portfolioViewForAnim
		
			//a. fade out button
				portfolioSelect.fadeOutCloseButton();
				
			//b. hide yourself
				portfolio.fadeOut();
				
			$.index.remove(portfoliosView);
	    	portfoliosView = mietf.snapPortfolioImage(portfolioSelect);
	    	$.index.add(portfoliosView);
		  
			buttonPortfolio.fadeOutText();
		  	
		 //6. hide portfolioSelect, but it shoudl look the same with your animation ready objects
		 	animation.fadeOut(portfolioSelect, mietf.animPortfolioSelectFadeOut);
		 	
		 //7. fade in portfolioButtonControl
		 	animation.fadeIn(portfolioButtonControl, mietf.animPortfolioButtonControlFadeIn);
		 	
		 //8. animate portfoliosView over glass
		 

		var portfoliosViewToVaultGlass = Ti.UI.createAnimation({
			    duration : mietf.animportfoliosViewToVaultGlass ,
			    width: 172,
			    height: 129, 
			    top: 320,
			    left: 26
			  });
		
		portfoliosViewToVaultGlass.addEventListener('complete', animateToLargeFolder);
			Ti.API.info('vaultViewToVaultGlass');

		portfoliosView.animate(portfoliosViewToVaultGlass); 
		//buttonPortfolio.goLarge(); //now runs simultaneously
		
		//9.  animate folder Large 	
			
			function animateToLargeFolder(e) {
				Ti.API.info('showETF complete');
				buttonPortfolio.goLarge();  //when complete playFolder open
				pagingControl.hide();		
			};	

	};

	showPortfolio = function(vault){

			mietf.isAnimating = true;
			vault = vaults[vault.id]; 
			setTitle(vault);
			vaultButtonControl.fadeInVaultWord();

			
			//Step 1:  set current Visible view for later steps that hide that view when a button is clicked
			currentVisibleView = portfolioSelect;
			currentViewName = 'portfolioSelect';
			//Step 2:  Prep portfolio view
		
			//portfolioSelect.prepare({vaultImg: vault.vaultImg, color: vault.vaultColor, vaultId: vault.vaultId, vaultNum: vault.vaultNum, vaultName: vault.vaultName, showLockButton: 'YES', isSampleVault: vault.isSampleVault, canAddNew: vault.canAddNew});
			//Step 3: Get vaultsView (picture of vault icons, minues the one that was clicked)
			//Step 4: Get buttonWheel - this will represent the clicked button that will grow in size (animation functions are in this code, see _2_vault_select for how it is built)
			
			
			$.index.remove(buttonWheel);
	    	buttonWheel = vault.getAnimWheel(); 
	    	$.index.add(buttonWheel);
			//Step 5: Add buttonWheel to the window
			//Step 6: Add vaultsView to the window
			$.index.remove(vaultsView);
	    	vaultsView = vaultSelect.snapImage({id: vault.id});

     		
	    	$.index.add(vaultsView);
			//Step 7: Hide vaultSelect view
			vaultSelect.opacity = 0;
			//Step 8: fade in vaultButtonControl (the Vaults button on the left side of the screen that can be clicked to returned to the vaultsSelect view)
			animation.fadeIn(vaultButtonControl, mietf.animFadeInVaultButtonCont);
			//Step 9: Step 9: series of animation, at the end portfolioSelect screen is active.
			var vaultsToIcon = Ti.UI.createAnimation({
			    duration : mietf.animFadeVaultsToIcon,
			    width: 186,  //5.5:1?? was 188
			    height: 108, //was 109
			    top: 138,
			    left: 19
			  });

     		vaultsToIcon.addEventListener('complete',vaultsToIconAnimHandler);
     		
     	
     		//vaultsToIconAnimHandler();

			
			vaultsView.animate(vaultsToIcon);
			portfolioSelect.prepare({vaultImg: vault.vaultImg, color: vault.vaultColor, vaultId: vault.vaultId, vaultNum: vault.vaultNum, vaultName: vault.vaultName, showLockButton: 'YES', isSampleVault: vault.isSampleVault, canAddNew: vault.canAddNew});
			
			
			function vaultsToIconAnimHandler(e) {
				Ti.API.info('vaultsToIconAnimHandler');
				pagingControl.hide();
				buttonWheel.goPortfolio();
			};
	
	};
	
	var i = [];

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}
	
playFolderOpen = function(vaultNum) {
	
	var CustomImageView = require('CustomImageView');
	
	if (mietf.skipPlayFolderOpen) {
		var animImages = ['images/folders/' + mietf.vaultColorDictionary[vaultNum-1].name + '-01.pn8',
			        	  'images/folders/' + mietf.vaultColorDictionary[vaultNum-1].name + '-50.pn8',];
	} else {
		var animImages = [];
		for (j=1; j < 51; j++) {
			animImages.push('images/folders/' + mietf.vaultColorDictionary[vaultNum-1].name + '-'+ pad(j) +'.pn8');
		}
	}
	
	    i = new CustomImageView({
	    	touchEnabled: false,
	    	vaultNum: vaultNum,
				zIndex: 50,
				animatedImages:animImages,
			  left: 126,
			  top: 185,
			  width: 536 ,
			  height: 520,
				duration:10, //33ms per frame would be 30fps, 42 would be 24fps
				repeatCount:1
			});
	
	$.index.add(i);
	buttonPortfolio.opacity=0;
	i.startAnimation($.index);

};
	

	
	Ti.App.addEventListener('removeI', function(e) {
		try {
			$.index.remove(i);
			$.index.remove(titleV);
		} catch (e) {
		}
	});
	
	var titleV = [];
	
	addTitleV = function(_args)	{
		titleV = Titanium.UI.createImageView({
	    height: 176,
	    width: 129,
	    left: _args.left,
			top: _args.top,
			returnLeft:  _args.left,
			returnTop: _args.top,
			returnHeight: 176,
			returnWidth: 129,
			image: _args.img,
			touchEnabled: false,
			zIndex: 1050
		});
		$.index.add(titleV);
	};
	
	addNewMietf = function(_args) {
		alert('addNewMietf of index');
	};
	
gotoSelectedMietf = function(_args) {
  Ti.API.info('gotoSelectedMietf '+_args.mietfID);
	var ETFVersionId = getETFVersionId( _args.mietfID);
	deleteOlderVersions(ETFVersionId);
	mietf.ETFVersionId = ETFVersionId;
	if (_args.mietfID == 0) {
		mietf.ETFVersionId = 0;
		ETFVersionId = 0;
	}
	var goMietfButton =Ti.UI.createAnimation({
		top: 452, 
		left: 56, //-2 
		width: 160, 
		height: 160,
		duration: mietf.animIndexGoMietfButton
	});
		
	var goMietfButton2 = Ti.UI.createAnimation({
		top: 530, 
		left: 130, 
		width: 39, 
		height:  54,
		duration: mietf.animIndexGoMietfButton2
	});
	
	titleV.animate(goMietfButton2);
	i.animate(goMietfButton);
	//miETFSelect.opacity=0;
	animation.fadeIn(mietfButtonControl, mietf.animIndexGoMietfButtonControlFadeIn, gotoMietfSelectionPart2);

	mietfInterface.clear({mietfSelectIndex: _args.mietfSelectIndex, title: _args.mietfName, ETFVersionId: ETFVersionId, portfolioId: _args.portfolioId});


	//mietf.titleControl.fadeAndSetTitle({title: _args.mietfName + ' MiETF', isVaults: false}); //_args.mietfName
	mietf.titleControl.fadeAndSetTitle({title: ' ', isVaults: false});
	mietfButtonControl.vaultNum = _args.vaultNum;	
};

	
	function gotoMietfSelectionPart2(e) {
		miETFSelect.gotoMietfSelectionPart2();
	};
	
	Ti.App.addEventListener('finalGotoMietfSelection', function(e) {
		var mietfInterfaceShow = Titanium.UI.createAnimation({opacity: 1, duration: mietf.animmietfAnimShow});
		mietfInterfaceShow.addEventListener('complete', function(e) {
			mietfInterface.scrollToPie();
		});
	
		mietfInterfaceShow.addEventListener('complete', function(e) {
			miETFSelect.gotoMietfSelectionPart3();	
		});
		
		mietfInterface.animate(mietfInterfaceShow);
	});
	
	
	// called in vault.js, search for goComboLock.   Ending animations for showComboLock
	Ti.App.addEventListener('finalToComboLockAnimHandler', function(e) {
		animation.fadeIn(combinationLock, 200, fadeOutButtonLock);
	});
	
	function fadeOutButtonLock(e) {
		animation.fadeOut(buttonWheel, 200, onComboLock);
	};
	
	function onComboLock(e) {
	mietf.isAnimating = false;

	if (Ti.App.Properties.getBool('comboLockAllowKeyboardInput'))	combinationLock.showKeyboard();
	}
	
	Ti.App.addEventListener('slideInMasterPassword', function(e) {
		var NewMasterPassword  = require('passwordSlideout'),
		    newMasterPassword = new NewMasterPassword({parent: $.index});	
		$.index.add(newMasterPassword);
		newMasterPassword.slideIn();
	});
	/////////////////////////////////////////////////////////////////////////////////////
	
	// called in vault.js, search for goPortfolio.   Ending animations for showPortfolio
	Ti.App.addEventListener('finalToPortfolioAnimHandler', function(e) {
		animation.fadeIn(portfolioSelect, mietf.animfinalToPortfolioAnimHandlerFadeIn, fadeOutButtonWheel);
	});
	
	function fadeOutButtonWheel(e) {
		animation.fadeOut(buttonWheel, mietf.animfadeOutButtonWheel, fadeOutButtonWheelDone);
	};	
	
	function fadeOutButtonWheelDone(e) {
		mietf.isAnimating = false;
	}
	/////////////////////////////////////////////////////////////////////////////////////
	
	// called in _3_combnation_lock.js, animates to portfolio screen after user has entered password to unlock vault.
		Ti.App.addEventListener('comboToPortfolio', function(e) {
			buttonWheel.returnsize='large';
			currentVisibleView = portfolioSelect;
			currentViewName = 'portfolioSelect';			  
			combinationLock.comboToPortfolioSize();
			//animation.crossFade(combinationLock, portfolioSelect,  setting.comboToPortfolioDelay, comboToPortfolioDone);
		});
	
		Ti.App.addEventListener('comboToPortfolioEnd', function(e) {
			portfolioSelect.opacity=1;
			combinationLock.opacity=0;
			comboToPortfolioDone();
			//animation.crossFade(combinationLock, portfolioSelect,  1000, comboToPortfolioDone);
		});
		
	function comboToPortfolioDone(e) {

		Ti.App.fireEvent('finalToPortfolioAnimHandler', {});
//		setTimeout(function(e) {
		//portfolioSelect.popIn();	
		//}, 200);
	};
	/////////////////////////////////////////////////////////////////////////////////////
	
	Ti.App.addEventListener('PortfolioButtonClick', function(e) {
		if(mietf.viewInterface){ mietf.viewInterface.removeMietfView({pieMode:'infoMode'});}
		if (mietf.currentScreen == 'mietfSelect') var returnObj = mietfInterface.snapshot();
		Ti.App.fireEvent('removeAnimationImage', {});
		mietf.portfolioButtonEverClicked = true;
		mietf.setScreen({scrn:'portfolioSelect', vaultNum: buttonPortfolio.vaultNum});
		mietf.isAnimating = true;
		Ti.App.fireEvent('removeFolder', {});
		Ti.App.fireEvent('removeI', {});
		miETFSelect.opacity=0;
		closeOtherSlideouts();
		var goSmallAnim =Ti.UI.createAnimation({
			left: buttonPortfolio.returnLeft,
			top: buttonPortfolio.returnTop,
			height: buttonPortfolio.returnHeight,
			width: buttonPortfolio.returnWidth,
			duration: 1000
		});
		mietfButtonControl.opacity=0;
		mietfInterface.opacity=0;
		
		buttonPortfolio.animate(goSmallAnim);
		mietf.titleControl.fadeAndSetTitle({title: portfolioButtonControl.title, isVaults: false});
		
		goSmallAnim.addEventListener('complete', function(e) {
			var goRightAnim =Ti.UI.createAnimation({
				left: portfoliosView.returnLeft,//test this
				top: portfoliosView.returnTop,
				height: portfoliosView.returnHeight,
				width: portfoliosView.returnWidth,
				duration: 1000
			});
			
			portfoliosView.animate(goRightAnim);
			animation.fadeOut(portfolioButtonControl, 1000);
			
			
			goRightAnim.addEventListener('complete', function(e) {
				mietf.isAnimating = false;
				portfolioSelect.opacity=1;
				portfoliosView.opacity=0;
				//animation.fadeOut(buttonPortfolio, 400);
				currentPortfolio.fadeIn();
				portfolioSelect.fadeInCloseButton();
                mietf.titleControl.fadeTitleIn();
			});
		});
		
		
		//
	});
	
	Ti.App.addEventListener('fadeOutPortfolioAddNew', function(e) {
		animation.fadeOut(buttonPortfolio, 400);
	});
	
		Ti.App.addEventListener('hello1', function(e) {
			
			//mietf.mietfButtonEverClicked = false;
			//mietf.portfolioButtonEverClicked = false;
			//mietf.vaultButtonEverClicked = false;
			if ( mietf.maskModeStep == 2 && mietf.vaultButtonEverClicked == true) {
				if (maskMode) {
					animation.fadeIn(settingsClickableView);
					animation.fadeIn(searchClickableView);
					animation.fadeIn(settingsIcon);
					//animation.fadeIn(searchIcon);
					mietf.maskModeStep = 3;
					maskMode = false;
				}
			};
			
			if ( mietf.maskModeStep == 1 && mietf.portfolioButtonEverClicked == true) {
				if (maskMode) {
					animation.fadeIn(vaultButtonControl);
					animation.fadeIn(vaultsView);
					mietf.maskModeStep = 2;
				}
			};

	});
	
	Ti.App.addEventListener('maskMode', function(e) {
			if ( mietf.maskModeStep == 0) {
				if (maskMode) {
					vaultButtonControl.opacity=0;
					vaultsView.opacity=0;
					animation.fadeIn(portfolioButtonControl);
					animation.fadeIn(portfoliosView);
					settingsClickableView.opacity=0;
					searchClickableView.opacity=0;
					mietf.maskModeStep =1;
					mietf.mietfButtonEverClicked = true;
				};
			};
	});
	
	Ti.App.addEventListener('MietfButtonClick', function(e) {
		if(mietf.viewInterface){ mietf.viewInterface.removeMietfView({pieMode:'infoMode'});}
		if (mietf.mietfAddButtonClick) {
			//alert('coming from addNew');
			//need smart shrink
		}
		closeOtherSlideouts();
		var returnObj = mietfInterface.snapshot();
		mietf.titleControl.fadeAndSetTitle({title: mietfButtonControl.title, isVaults: false});
		miETFSelect.collapseMietfSelection(returnObj);

	});
	
    Ti.App.addEventListener('portfolioSelectResetPrepare', function(e) {
    	portfolioSelect.resetPrepare();
    	Ti.App.fireEvent('finalToPortfolioAnimHandler', {});
    });
	
	Ti.App.addEventListener('MietfButtonClickStep2', function(e) {
		var goBackMietfButton = Ti.UI.createAnimation({
			top: 185, 
			left: 126, 
			width: 536, 
			height: 520,
			duration: 1000
	});
		
		var goBackMietfButton2 =Ti.UI.createAnimation({
			top: titleV.returnTop, 
			left: titleV.returnLeft, 
			width: titleV.returnWidth, 
			height: titleV.returnHeight,
			duration: 1000
		});
		
		
		goBackMietfButton.addEventListener('complete', function (e) {
			        Ti.API.info('goBackMietfButton complete');
					animation.fadeIn(miETFSelect, 200);
	    			miETFSelect.fanOut(currentPortfolio);
	    			mietfButtonControl.opacity=0;
	    			$.index.remove(titleV);
		});
		
		i.animate(goBackMietfButton);
		titleV.animate(goBackMietfButton2);
	});
	
	// series of animations for clicking the glass Vault Button icon - will result in vaultSelect as the active screen
	Ti.App.addEventListener('VaultButtonClick', function(e) {
		if(mietf.viewInterface){ mietf.viewInterface.removeMietfView({pieMode:'infoMode'});}
		if (mietf.currentScreen == 'mietfSelect') var returnObj = mietfInterface.snapshot();
		Ti.App.fireEvent('removeAnimationImage', {});
		mietf.vaultButtonEverClicked = true;
		if (typeof e.isSearch !== 'undefined') {
			if (e.isSearch) {
				isSearch = true;
				isSearchVaultId = e.vaultId;
				if (mietf.currentScreen == 'vaultSelect') {	 
				e.isSearch = false;
				isSearch = false;
				Ti.App.fireEvent('gotoVault', { vaultId: isSearchVaultId});
				isSearchVaultId = -1;
					return;
				}
			} else {
				isSearch = false;
			}
		}
		mietf.setScreen({scrn:'vaultSelect'});
		mietf.isAnimating = true;
		Ti.App.fireEvent('removeFolder', {});
		Ti.App.fireEvent('removeI', {});
		miETFSelect.opacity=0;
		portfolioAddNew.opacity=0;
		// steps to deal with Portfolios, work in Progress
		
		if (currentViewName == 'miETFSelect') {
			
			buttonPortfolio.opacity = 0;
			portfolioButtonControl.opacity = 0;
			mietfButtonControl.opacity=0;
			mietfInterface.opacity=0;
			portfoliosView.opacity = 0;
			
		}
		
		portfolioSelect.opacity = 0;
		portfolioSelect.fadeInCloseButton();

		
		closeOtherSlideouts();
		portfolioSelect.hideLockButton();

	    buttonWheel.setLarge();
	    
	    currentViewName = 'vault';
		animation.crossFade(currentVisibleView, buttonWheel, 250, VaultButtonClickStep2); 
		
		//you are not supposed to be able to necessarily stop an animation?
		//but

	});
	
	var IconToVaults = Ti.UI.createAnimation({
	    duration : setting.IconToVaultsDuration,
	    delay: setting.IconToVaultsDelay,
	    width: 1024,
	    height: 595,
	    top: 147,
	    left: 0
	  });
	  
	  IconToVaults.addEventListener('complete',IconToVaultsAnimHandler);
	  
	function IconToVaultsAnimHandler(e) {

		pagingControl.show();
		
		animation.fadeIn(vaultSelect);
		animation.fadeAndRemove(vaultsView, 500, $.index);
		animation.fadeAndRemove(buttonWheel, 500, $.index, IconToVaultsAnimDone);
		mietf.setScreen({scrn:'vaultSelect'});
		vaultSelect.buttonClickOn();
		if (isSearch) {
			isSearch = false;
			Ti.App.fireEvent('gotoVault', { vaultId: isSearchVaultId});
		}
	};
	
	function IconToVaultsAnimDone(e) {
		mietf.isAnimating = false;
    mietf.titleControl.fadeTitleIn();
	};
	
	function VaultButtonClickStep2(e) {
		mietf.titleControl.fadeAndSetTitle({title: 'Vaults', isVaults: true});
		mietf.titleControl.setColor({color: 'rainbow'});
		
		buttonWheel.goSmall();
		
		if (mietf.showingAVAnim) {
			mietf.showingAVAnim = false;
			$.index.remove(folderBox);
		}
		
		//vaultButtonControl.fadeOutVaultWord();  
		setTimeout(function(e) {
			animation.fadeOut(vaultButtonControl, setting.VaultGlassButtonFade); 
		}, 700);
		vaultsView.animate(IconToVaults);
	};
	/////////////////////////////////////////////////////////////////////////////////////
	
	///This probably needs to be re-written, was old style, before vaults handler was updated
	Ti.App.addEventListener('updateButton', function(e) {
		vaultSelect.updateButton({vaultId: e.vaultId, lockPasscode: e.lockPasscode});
	});
	
	/// handles wakeup after sleep
	Ti.App.addEventListener('resume', function(e) {	
	    mietf.titleControl.restartAnim();
	    Ti.App.fireEvent('updateVaults', {});
	    Ti.App.fireEvent('updateCanvasFullWithData', {});
	});

	// utility functions
	function setTitle(vault) {
			//mietf.titleControl.setTitleSlower({title: vault.vaultName + ' Portfolios', isVaults: false});
            mietf.titleControl.fadeAndSetTitle({title: vault.vaultName + ' Vault', isVaults: false});
			portfolioButtonControl.title = vault.vaultName + ' Vault';
		 	mietf.titleControl.setColor({color: vault.vaultColor});
	};
	
	function closeOtherSlideouts() {
		mietf.stopVaultWobble();
		Ti.App.fireEvent('cornerClose',{});
		Ti.App.fireEvent('closeSlideouts', {dontIgnore: true}); //this is an experiment slideouts will head this event, and self destory
	}
		
		
	$.index.addEventListener('click', function(e) {
		if (typeof(e.source.backgroundImage) == 'undefined') {
		if (mietf.currentScreen != 'portfolioSelect' && mietf.reweighOut != true) Ti.App.fireEvent('closeSlideouts', { indexClick: true}); 
		}
	});
	
	var downloadCount = 1;
	Ti.App.addEventListener('downloadsComplete', function(e) {
		if (downloadCount ==1) {
			
			//this is turned off because of what it does if you race ahead
			Ti.App.Properties.setBool('firstTime', false);	
		}
		downloadCount++;
		
		
	});
	
	Ti.App.addEventListener('startDownloads', function(e) {
		progressBar.downloadStocks();
	});

	Ti.App.addEventListener('updateStocks', function(e) {
		progressBar.updateStocks();
	});



	var percentAllocation = [];
	Ti.App.addEventListener('startPercentAllocChooser', function(_args) {
		    mietf.isPercentAllocation = true;
		    mietf.pieMode = 'pieMode';
		    settingsIcon.applyProperties({width:32,height:32, top:16});
		    settingsIcon.backgroundImage ='images/latest/chart_icon.png';
		    settingsIcon.image = 'images/ifapps/graphThick'+(buttonPortfolio.vaultNum-1)+'.png';
			animation.fadeOut(vaultButtonControl);
			animation.fadeOut(portfolioButtonControl);
			animation.fadeOut(mietfButtonControl);
			animation.fadeOut(vaultsView);
			animation.fadeOut(portfoliosView);
			animation.fadeOut(i);
			animation.fadeOut(titleV);
			animation.fadeOut(mietfInterface);
			animation.fadeIn(settingsClickableView);
			
			searchIcon.opacity = 1;
			animation.fadeIn(searchClickableView);
			searchIcon.backgroundImage = 'images/ifapps/pie_ico.pn8'; //'images/latest/search_ico.pn8''
		
		var PercentAllocation  = require('_14_percent_allocation');
	    percentAllocation = new PercentAllocation({parent: $.index, mietfInterface: mietfInterface, ETFVersionId: _args.ETFVersionId});
			   
		$.index.add(percentAllocation);	
		
		var showPercentAllocAnim = Ti.UI.createAnimation({
			delay: 500,
			duration: 500,
			opacity: 1
		});
		
		showPercentAllocAnim.addEventListener('complete', function(e) {
			if (_args.addComponent) percentAllocation.showAddComponent();
		});
		
		percentAllocation.animate(showPercentAllocAnim);
	});
	
	Ti.App.addEventListener('endStrategyChange', function(_args) {
		mietfInterface.mietfGraphUpdate();	
	});
	
	Ti.App.addEventListener('endPercentAllocChooser', function(_args) {
		   if (mietf.DontBlockRepeat) {
		   	
		   		mietf.DontBlockRepeat = false;

				deleteZeroMietfComponents(mietf.ETFVersionId);

				mietfInterface.mietfPieUpdate();

		
				mietf.isPercentAllocation = false;
				
				var fadeOutPercentAllocation = Ti.UI.createAnimation({
					duration: 500,
					opacity: 0
				});
				
				fadeOutPercentAllocation.addEventListener('complete', function(e) {
					    try{
					    	searchIcon.backgroundImage = 'images/latest/search_ico.pn8';
					        if(percentAllocation){
					           percentAllocation.removeAllChildren();
					           $.index.remove(percentAllocation);
					           percentAllocation = null;
					        }
					
							animation.fadeIn(vaultButtonControl);
							animation.fadeIn(portfolioButtonControl);
							animation.fadeIn(mietfButtonControl);
							animation.fadeIn(vaultsView);
							animation.fadeIn(portfoliosView);
							animation.fadeIn(i);
							animation.fadeIn(titleV);
							animation.fadeOut(settingsClickableView);
							animation.fadeOut(searchClickableView);
							
							var fadeInInterface = Ti.UI.createAnimation({
																			duration: 500,
																			opacity: 1
																		});
						
						fadeInInterface.addEventListener('complete', function(e) {
							try {
								$.index.remove(percentAllocation);
							} catch (e) {
								
							}
							
						});
						if(_args && _args.scrollToPie){
						    mietfInterface.scrollToPie();
						}
						mietfInterface.animate(fadeInInterface);
					
						mietfInterface.mietfGraphUpdate();	
					}finally{
						settingsIcon.applyProperties({width:40,height:40, top:10});
						settingsIcon.image ='none';
						settingsIcon.backgroundImage = 'images/ifapps/gear.pn8';
						mietf.DontBlockRepeat = true;
					}			
			});
			
			percentAllocation.animate(fadeOutPercentAllocation);
		} 
  });
	
Ti.App.addEventListener('updateGraphPie', function(_args) {
	mietfInterface.mietfPieUpdate();
	mietfInterface.mietfGraphUpdate();	
});

Ti.App.addEventListener('resumed', function(){ // notice *resumed*
	processArgs();
});

Ti.App.addEventListener('openURL', function(e) {
	//Ti.Platform.openURL(e.url);
	openHtmlPageInApp(e.url, "MiETF");
});

function openHtmlPageInApp(url, title) {
	var yahoo = Alloy.createController('yahooFull');
	var win = yahoo.getView();
	win.open({
		transition : Ti.UI.iPhone.AnimationStyle.NONE
	});
	yahoo.setUrl(url, title);
}
    
processArgs();
 
// URI SCHEMES - Get the file URL
function processArgs() {
  var fileURL = Ti.App.getArguments();
  if (fileURL.hasOwnProperty('url')) {
		var importV = Alloy.createController('importV');
		var win = importV.getView();
    win.open({transition:Ti.UI.iPhone.AnimationStyle.NONE});
    importV.setUrl(fileURL.url);  
  }
}

//deleteStockDataByTickerSymbol("ADBE")
var dividend = require('services/dividend');

Ti.API.info("----------------------------");
//these are helpers methods when updating predefined database
/*
Ti.API.info(dividend.getTotalSum(dividend.getPlainDividedStockData("AAPL")));

//Ti.API.info(dividend.getPlainDataDividensForMietf(1));
//Ti.API.info(dividend.getTotalSum(dividend.getPlainDataDividensForMietf(1)));
//dividend.displayData("AAPL");
//
//dividend.deleteFromStockData("MRK");


//dividend.deleteMarketIndexData("SPY");
//dividend.getTmpData("DIA");
*/