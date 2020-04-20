function chatSlideout(_args) {

	var self = Ti.UI.createView({
		left : '110%',
		width : '100%',
		touchEnabled : true,
		zIndex : 60,
		top: 100, 
		bubbleParent: false
	});
	
	var parent=_args.parent;
	
	Ti.App.addEventListener('closeSlideouts', function(e) {
		self.animate(hideView);
	});
	
	var titleLbl = Ti.UI.createLabel({//title of page
		top : 62,
		left : 60,
		width: 300,
		text : 'Collaborate',
		color : 'black', //'#57585d',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '21sp',
			fontWeight : 'bold'
		},
		zIndex: 62
	});
	


var sv = Ti.UI.createScrollView({
		touchEnabled : true,
		contentWidth : 'auto',
		contentHeight : 'auto',
		top : 0,
		left : 0,
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true,
		scrollingEnabled : false
	});

	self.add(sv);

	var whiteView = Ti.UI.createView({
		height : imgs.whiteViewHeight,
		width : imgs.whiteViewWidth,
		top : 0,
		borderRadius : imgs.whiteViewBorderRadius,
		backgroundImage : imgs.whiteViewBackgroundImage,
		left : 0,
		touchEnabled : true
	});
	
		whiteView.add(titleLbl);

	sv.add(whiteView);



	
	
	/////////////////////////////////////START
	Ti.include('includes/pubnub-chat.js');
	
	var pubnub_chat_window = Ti.App.Chat({
    "chat-room" : "my-random-conversation",
    "window"    : {
        title           : 'My Chat Room',
        zIndex: 5000,
        top: 112-4, 
        left: 384-5,
        width: 368,
        height: 448,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 12,
        backgroundColor: '#dddee0'
    } });
    
    whiteView.add(pubnub_chat_window.chat_window);
    
    
    //letter index
    
    var letterIndexView = Ti.UI.createView({
    	
        zIndex: 5000,
        top: 112-4, 
        left: 64-5,
        width: 24,
        height: 448,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 12,
        backgroundColor: '#dddee0',
        layout: 'vertical'
    	
    });
    
    whiteView.add(letterIndexView);
    
    
    var userTableView = Ti.UI.createScrollView({
    	
        zIndex: 5000,
        top: 112-4, 
        left: 96-5,
        width: 272,
        height: 448,
        layout: 'vertical'
    	
    });
    
   
    
    
    var userData = ['Akers, Jonathan', 'Cochran, Alice', 'Dallas, Lila', 'Dulany, John', 'Dupuy, Robert', 'Ershev, Konstantin', 'Khudlaev, Alex', 'Kotik, Alexander', 'Fomichev, Leo', 'Jones, Susan', 'Popova, Yulia', 'Samosha, Max', 'Smith, Kelly'];
    var buttons = [];
    var buttonLbls = [];
        var headerLabels = [];
        var letterIndexLabels = [];
        var liViews = [];
        var scrollToY =0;
    var headerLabelsIndex = 0;
    var currentLetter = userData[0].charAt(0);
    	headerLabels[headerLabelsIndex] = Ti.UI.createLabel({
			  height: 48,
			  left: 0,
			  width:  272-32,
			  color: '#black',
			  font: {  fontSize: '13sp', fontWeight: 'bold'  },
			  text: currentLetter,
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			  touchEnabled: false
			});
    
    	userTableView.add(headerLabels[headerLabelsIndex]);
    	scrollToY = scrollToY + 48;
    	
    	letterIndexLabels[headerLabelsIndex] = Ti.UI.createLabel({
			  height: 32,
			  color: '#black',
			  font: {  fontSize: '11sp', fontWeight: 'bold'  },
			  text: currentLetter,
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			  touchEnabled: false
			});
			
			liViews[headerLabelsIndex] = Ti.UI.createView({height: 32, scrollToY: 0});
			liViews[headerLabelsIndex].addEventListener('click', function(e) {
	    		userTableView.scrollTo(0,this.scrollToY);
	    	});
			
			liViews[headerLabelsIndex].add(letterIndexLabels[headerLabelsIndex]);
	    	letterIndexView.add(liViews[headerLabelsIndex]);
    
    
    	for (i=0; i < userData.length; i++) {
		    	    var firstLetter = userData[i].charAt(0);
	    
	    if (firstLetter != currentLetter) {
		    currentLetter = firstLetter;
		    headerLabelsIndex = headerLabelsIndex + 1;
		    
		    headerLabels[headerLabelsIndex] = Ti.UI.createLabel({
				  height: 48,
				  left: 0,
				  width:  272-32,
				  color: '#black',
				  font: {  fontSize: '13sp', fontWeight: 'bold'  },
				  text: currentLetter,
				  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				  touchEnabled: false
				});
	    
	    	userTableView.add(headerLabels[headerLabelsIndex]);
	    	
	    	
    	letterIndexLabels[headerLabelsIndex] = Ti.UI.createLabel({
			  height: 32,
			  color: '#black',
			  font: {  fontSize: '11sp', fontWeight: 'bold'  },
			  text: currentLetter,
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			  touchEnabled: false
			});
			
			liViews[headerLabelsIndex] = Ti.UI.createView({height: 32, scrollToY: scrollToY});
			liViews[headerLabelsIndex].addEventListener('click', function(e) {
	    		userTableView.scrollTo(0,this.scrollToY);
	    	});
			scrollToY = scrollToY + 48;
			liViews[headerLabelsIndex].add(letterIndexLabels[headerLabelsIndex]);
	    	letterIndexView.add(liViews[headerLabelsIndex]);
	    	

	    	
    }
		buttons[i] = Titanium.UI.createButton({
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius:10,
			font:{fontSize:16,fontWeight:'bold'},
			backgroundGradient:{type:'linear',
			colors:['#53585e','#53585e'],
			//colors:['#000001','#666666'], //53585e
			startPoint:{x:0,y:0},
			endPoint:{x:2,y:50},
			backFillStart:false},
			borderWidth:1,
			borderColor:'#666',
			width: 240,
			left: 0,
			height: 32,
			bottom: 8,
			i: i
		});
		
			buttonLbls[i] = Ti.UI.createLabel({
			  left: 10,
			  top: 8,
			  color: '#white',
			  font: {  fontSize: '13sp', fontWeight: 'bold'  },
			  text: userData[i],
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			  touchEnabled: false
			});
			
			buttons[i].addEventListener('click', function(e) {
		
				var goRight = Titanium.UI.createAnimation();
					goRight.left = 32;
					goRight.duration = 400;
				
				var goLeft = Titanium.UI.createAnimation();
					goLeft.left = 0;
					goLeft.duration = 400;
				
				e.source.animate(goRight);
		
				e.source.backgroundGradient = {type:'linear',
					colors:['#2d7d28','#2d7d28'],
					startPoint:{x:0,y:0},
					endPoint:{x:2,y:50},
					backFillStart:false};

		 		
		for (i=0; i < buttons.length; i++) {
			if (i != e.source.i) {
				buttons[i].animate(goLeft);
				buttons[i].backgroundGradient = {type:'linear',
					colors:['#53585e','#53585e'],
					startPoint:{x:0,y:0},
					endPoint:{x:2,y:50},
					backFillStart:false};
			}
		}

	});
			
	buttons[i].add(buttonLbls[i]);
	scrollToY = scrollToY + 40;

		
		userTableView.add(buttons[i]);
	
}


	
	
 whiteView.add(userTableView);	
	
	
	
	//////////////////////////////////////END
	

	





	var closeButton = Titanium.UI.createButton({
		top : 32-4,
		width : imgs.closeButtonWidth,
		height : imgs.closeButtonHeight,
		backgroundImage : imgs.closeButtonBackgroundImage,
		right : 32+5
	});

	whiteView.add(closeButton);

	closeButton.addEventListener('click', function(e) {
		self.animate(hideView);
	});

	self.slideIn = function(e) {
		self.animate(showView);
	};

	self.slideOut = function(e) {
		self.animate(hideView);
	};
	//animation
	var showView = Titanium.UI.createAnimation();
	showView.left = 214;
	showView.duration = 500;
	showView.delay = 500;

	showView.addEventListener('complete', function(e) {
		pubnub_chat_window.chat_window.fireEvent('open', {});
	});

	var hideView = Titanium.UI.createAnimation();
	hideView.left = '110%';
	hideView.duration = 500;

	function resetOnClose() {
		parent.remove(self);
	};
hideView.addEventListener('complete', resetOnClose);
	
self.addEventListener('swipe', function(e) {
	if (e.direction === 'right') self.animate(hideView);
});

	return self;
};

module.exports = chatSlideout; 