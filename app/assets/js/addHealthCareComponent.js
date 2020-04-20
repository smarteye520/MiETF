function addHealthCareComponent(_args) {

	
	var parent = _args.parent;
		
	var self = Titanium.UI.createView({
	   width: '100%',
	   top: 136,
	   left: '110%',
	   backgroundColor: 'transparent'
	});
		
		
	var buttonsSV = Titanium.UI.createScrollView({
	 top: 0,
	 bottom: 144,
	  width: '100%',
	  contentHeight:'auto',
	  contentWidth:'100%'
	});
	
	self.add(buttonsSV);
	
	
	var insideView = Ti.UI.createView({ 
		left: '0%',
		right: '0%',
		height: Ti.UI.SIZE,
		layout: 'horizontal'
		});
		
		
	 buttonsSV.add(insideView);
			
	  var HCCButton =  require ('/ui/control/hccButton');
	  var hccButton = [];
	
	

		
		
	for (var i = 0; i < component.length; i++) { 
		    hccButton[i] = new HCCButton({backgroundColor: component[i].colorCode, NYSETickerSymbol: component[i].NYSETickerSymbol, shortName: component[i].shortName});
			insideView.add(hccButton[i]);
	}
	
	
	//93,75	
	
		var navView = Ti.UI.createView({ 
		left: '0%',
		right: '0%',
		height: Ti.UI.SIZE,
		layout: 'horizontal',
		bottom: 0
		});
		
		
	 self.add(navView);
		
		var NavButton =  require ('/ui/control/navButton');
		
		var btn1 = new NavButton({buttonText: 'Alphabetical'});
		var btn2 = new NavButton({buttonText: 'Market Cap'});
		var btn3 = new NavButton({buttonText: 'Volume'});
		var btn4 = new NavButton({buttonText: 'PE'});
		var btn5 = new NavButton({buttonText: 'Dividend'});
		var btn6 = new NavButton({buttonText: 'Random'});
		var btn7 = new NavButton({buttonText: 'Search'});
		var btn8 = new NavButton({buttonText: 'Search'});
		
		navView.add(btn1);
		navView.add(btn2);
		navView.add(btn3);
		navView.add(btn4);
		navView.add(btn5);
		navView.add(btn6);
		navView.add(btn7);
		navView.add(btn8);

		
		
	//animation	
	var showView = Titanium.UI.createAnimation();
	showView.left = 0;
	showView.duration = 500;
	showView.delay = 500;
	
	var hideView = Titanium.UI.createAnimation();
	hideView.left = '-110%';
	hideView.duration = 500;
	
	hideView.addEventListener('complete', function () {
	self.left = '110%';
	});
	
	self.addEventListener('showView', function(e) {
		self.animate(showView);
	});
	
	self.addEventListener('hideView', function(e) {
		self.animate(hideView);
	});

	return self;
};

module.exports = addHealthCareComponent;