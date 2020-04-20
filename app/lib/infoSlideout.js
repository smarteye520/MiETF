function infoSlideout(_args) {

	var self = Ti.UI.createView({
		left : '110%',
		width : '100%',
		zIndex : 60,
		top : 100
	});


	var whiteView = Ti.UI.createView({
		height : imgs.whiteViewHeight-10,
		width : imgs.whiteViewWidth,
		top : 10,
		borderRadius : imgs.whiteViewBorderRadius,
		backgroundImage : imgs.whiteViewBackgroundImage,
		left : 0
	});

	self.add(whiteView);
	
	var html = '<html>'
				+'<head><style>' 
				+'body {'
					     +'font-family: AvenirNextCondensed-Regular;'
					     +'font-size: 16px;'
				+'}</style></head>'
				+'<body>'
				+'<div style="font-family: AvenirNextCondensed-Bold;font-size: 18px;text-decoration: underline;">MiETF - A new world of possibilities</div>'
				+'<br/>A MiETF (pronounced "my ETF") is akin to commonly offered Exchange-Traded Funds, except that its components have been personally selected and apportioned by YOU - hence MiETF.  In a simple way, a MiETF is therefore a collection of tradables, such as stocks, which you have carefully researched and then placed in your investment basket. The percentage allocations you give each such selected tradable, and the tailored strategy you may apply in rebalancing your allocation % over time, are all fun performance testing ideas you can quickly implement to see how your MiETF basket performs under different conditions.'
 
				+'<br/><br/>This app was designed to allow you to creatively build long-term investment portfolios  and for you to see how your portfolios would have performed if you had made an investment in the past. You can them compare YOUR performance to other more traditional funds and traditional performance history! While the future is definitely unknown, seeing how your formulations performed is very valuable for accessing the stability of your diversified portfolios.'  
				 
				+'<br/><br/>Regardless of your appetite for experimenting, in today\'s world of low-cost/free trading, all you need to diversify your investment  is MiETF to quickly see if your creations can be on par, or better, than those of the gurus. My guess, with a little persistence, and incorporating many guru\'s sage advice, that you can and you will out-perform.'
				 
				+'<br/><br/>All MiETF\'s you create on your device are saved ONLY on your personal device (or your device backup) and no information or data is EVER exported to us without your approval. This app sends out NO data or use information UNLESS you specially export it.'
				
				+'<br/><br/>For app usage help, emailing us, or just on our app or general interest articles, open the MiETF website on any browser - <a href="http://www.mietf.com" onclick="Ti.App.fireEvent(\'openURL\',{url:\'http://www.mietf.com\'});return false;">www.mietf.com</a>.'
				 
				+'<br/><br/>Happy experimenting—and remember —diversification and long-term investment is the ONLY reliable strategy to build long term wealth in the world of trading—unless you have a crystal ball.</body></html>';
	
	whiteView.add(Ti.UI.createWebView({left:30, right :30, top:30, bottom:30, html:html, backgroundColor:'transparent'}));
	//whiteView.addEventListener('click', function(e){alert(JSON.stringify(e));});

	/*var emailBtn = Titanium.UI.createButton({
	title: 'Download stocks again.',
	width: 300,
	height: 50,
	backgroundColor: 'blue',
	color: 'white',
	zIndex: 500
	});
	emailBtn.addEventListener('click',function(e)
	{
	mietf.notRunningDownloads = true;
	mietf.progressBar.downloadStocks();
	/*
	var privateDocFolder = privateDocumentsDirectory();
	var f = Ti.Filesystem.getFile(privateDocFolder, 'cloud.sql');

	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Copy of Database";
	emailDialog.toRecipients = ['michael@diversifyapps.com'];
	emailDialog.messageBody = '<b>Here is the database!</b>';
	emailDialog.addAttachment(f);
	emailDialog.open();
	*/

	//});

	var parent = _args.parent;

	/*Ti.App.addEventListener('closeSlideouts', function(e) {
		self.animate(hideView);
	});*/

	/*	var checkValueFlg;

	 var txtMsgs = new Array();
	 txtMsgs.push('Information');
	 txtMsgs.push('');
	 txtMsgs.push('');
	 txtMsgs.push('');
	 txtMsgs.push('');
	 txtMsgs.push('');

	 var txtLbls = new Array();
	 txtLbls.push(Ti.UI.createLabel({//title of page
	 top : 62,
	 left : 82,
	 width: 300,
	 text : '',
	 color : 'black', //'#57585d',
	 font : {
	 fontFamily : 'AmericanTypewriter',
	 fontSize : '22sp',
	 fontWeight : 'bold'
	 }
	 }));

	 txtLbls.push(Ti.UI.createLabel({//page instructions
	 left : 82,
	 top : 107,
	 width : 680,
	 height : Ti.UI.SIZE,
	 text : ' ',
	 color : 'black', // '#57585d',
	 font : {
	 fontFamily : 'AmericanTypewriter',
	 fontSize : '22sp',
	 fontWeight : 'bold'
	 }
	 }));

	 txtLbls.push(Ti.UI.createLabel({//master password
	 width : 208, //186
	 left : 262,
	 top : 213,
	 height : 40,
	 text : ' ',
	 color : 'black',
	 shadowColor : '#333',
	 shadowOffset : {
	 x : 1,
	 y : 1
	 },
	 shadowRadius : 3,
	 font : {
	 fontFamily : 'AmericanTypewriter',
	 fontSize : '22sp',
	 fontWeight : 'bold'
	 }
	 }));

	 txtLbls.push(Ti.UI.createLabel({//retype master password
	 left : 179,
	 width : 274,
	 top : 255,
	 height : 40,
	 text : ' ',
	 color : 'black',
	 shadowColor : '#333',
	 shadowOffset : {
	 x : 1,
	 y : 1
	 },
	 shadowRadius : 3,
	 font : {
	 fontFamily : 'AmericanTypewriter',
	 fontSize : '22sp',
	 fontWeight : 'bold'
	 }
	 }));

	 txtLbls.push(Ti.UI.createLabel({//password hint
	 width : 177,
	 left : 293,
	 top : 297,
	 height : 40,
	 text : ' ',
	 color : 'black',
	 shadowColor : '#333',
	 shadowOffset : {
	 x : 1,
	 y : 1
	 },
	 shadowRadius : 3,
	 font : {
	 fontFamily : 'AmericanTypewriter',
	 fontSize : '22sp',
	 fontWeight : 'bold'
	 }
	 }));

	 txtLbls.push(Ti.UI.createLabel({//status msg <--------------------STATUS MSG
	 left: 82,
	 top: 273, //was 12
	 width: 396,
	 height: Ti.UI.SIZE,
	 text : ' ',
	 color : 'red',
	 font : {
	 fontFamily : 'AmericanTypewriter-Bold',
	 fontSize : '22sp',
	 fontWeight : 'bold'
	 }
	 }));

	 var sv = Ti.UI.createScrollView({
	 touchEnabled : true,
	 contentWidth : 'auto',
	 contentHeight : 'auto',
	 top : 0,
	 left : 0,
	 showVerticalScrollIndicator : true,
	 showHorizontalScrollIndicator : true
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

	 sv.add(whiteView);

	 var contentView = Ti.UI.createView({
	 left : -150,
	 right : 150,
	 height : 'auto',
	 top : 0,
	 touchEnabled : true
	 });

	 sv.add(contentView);

	 var insideView = Ti.UI.createView({
	 left : 150,
	 width : 920,
	 height : 625,
	 top: 30

	 });

	 contentView.add(insideView);

	 insideView.add(txtLbls[0]);
	 insideView.add(txtLbls[1]);
	 insideView.add(txtLbls[2]);
	 insideView.add(txtLbls[3]);
	 insideView.add(txtLbls[4]);
	 insideView.add(txtLbls[5]);

	 insideView.add(emailBtn);

	 var line2Lbl = Ti.UI.createLabel({//page instructions
	 left : 82,
	 top : 132,
	 width : 662,
	 height : Ti.UI.SIZE,
	 text : ' ',
	 color : 'black', // '#57585d',
	 font : {
	 fontFamily : 'AmericanTypewriter',
	 fontSize : '22sp',
	 fontWeight : 'bold'
	 }
	 });

	 var line3Lbl = Ti.UI.createLabel({//page instructions
	 left : 82,
	 top : 157,
	 width : 662,
	 height : Ti.UI.SIZE,
	 text : ' ',
	 color : 'black', // '#57585d',
	 font : {
	 fontFamily : 'AmericanTypewriter',
	 fontSize : '22sp',
	 fontWeight : 'bold'
	 }
	 });

	 insideView.add(line2Lbl);
	 insideView.add(line3Lbl);

	 var closeArrow = Ti.UI.createView({});
	 insideView.add(closeArrow);

	 resetCloseArrow();

	 function resetCloseArrow(e) {

	 closeArrow = Ti.UI.createLabel({
	 color : '#4D4D4D',
	 font : {
	 fontFamily : 'AvenirNextCondensed-Bold',
	 fontSize : '80sp',
	 fontWeight : 'bold'
	 },
	 text : '',
	 textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	 width : 100,
	 height : 50,
	 touchEnabled : true,
	 left : 0
	 });

	 var olt = Titanium.UI.create3DMatrix(), curX, totalDelta = 0;

	 closeArrow.addEventListener('touchstart', function(e) {
	 curX = e.x;
	 });

	 closeArrow.addEventListener('touchmove', function(e) {
	 var deltaX = e.x - curX;

	 if (deltaX > 0) {
	 totalDelta = totalDelta + deltaX;
	 olt = olt.translate(deltaX, 0, 0);
	 sv.animate({
	 transform : olt,
	 duration : 100
	 });
	 }
	 });

	 closeArrow.addEventListener('touchend', function(e) {
	 if (totalDelta < 100) {
	 var resetTransform = Titanium.UI.create3DMatrix();
	 sv.animate({
	 transform : resetTransform.translate(0, 0, 0),
	 duration : 500
	 });
	 resetCloseArrow();
	 } else {
	 self.animate(hideView);
	 }

	 });

	 closeArrow.addEventListener('click', function(e) {
	 ///THIS IS THE  CLICK EVENT
	 });

	 insideView.add(closeArrow);

	 };
	 */
	var closeButton = Titanium.UI.createButton({
		top : 25,
		width : imgs.closeButtonWidth,
		height : imgs.closeButtonHeight,
		backgroundImage : imgs.closeButtonBackgroundImage,
		right : 30
	});

	whiteView.add(closeButton);

	closeButton.addEventListener('click', function(e) {
		self.animate(hideView);
	});

	/*	var c = 0;
	 var timer;

	 function step1() {
	 var step = 1;
	 step--;

	 var text = txtMsgs[step].substr(0, c) + '_';
	 var attr = Ti.UI.createAttributedString({
	 text: text,
	 attributes: [
	 {
	 type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
	 value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
	 range: [0, text.length]
	 }
	 ]
	 });

	 txtLbls[step].attributedString = attr;

	 if (c == txtMsgs[step].length) {
	 clearInterval(timer);
	 c = 0;
	 timer = setInterval(step1blink, Ti.App.Properties.getInt('step1BlinkInterval', 200));
	 }

	 c++;
	 }

	 var even = 0;
	 function step1blink() {
	 var step = 1;
	 step--;

	 if (even == 0)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
	 if (even == 1)	var text = txtMsgs[step].substr(0, txtMsgs[step].length) + '_';

	 var attr = Ti.UI.createAttributedString({
	 text: text,
	 attributes: [
	 {
	 type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
	 value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
	 range: [0, text.length]
	 }
	 ]
	 });

	 txtLbls[step].attributedString = attr;

	 if (c == Ti.App.Properties.getInt('step1BlinkCount',10)) {
	 var text = txtMsgs[step].substr(0, txtMsgs[step].length) ;
	 var attr = Ti.UI.createAttributedString({
	 text: text,
	 attributes: [
	 {
	 type: Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
	 value: Ti.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
	 range: [0, text.length]
	 }
	 ]
	 });

	 txtLbls[step].attributedString = attr;
	 clearInterval(timer);
	 c = 0;
	 //timer = setInterval(step2, Ti.App.Properties.getInt('step2Interval', 50));
	 }

	 c++;
	 even++;
	 if (even == 2) even=0;
	 }

	 function saveSettings() {

	 }

	 function setStatusMsg(msg) {
	 //txtLbls[5].text = ' ';
	 //txtMsgs[5] = msg;
	 //c=0;
	 //timer = setInterval(step6, Ti.App.Properties.getInt('step6Interval', 90));
	 };
	 */
	self.slideIn = function(e) {
		win.open();
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
		//reset some values

		//start here
		//timer = setInterval(step1, Ti.App.Properties.getInt('step1Interval', 90));
	});

	var hideView = Titanium.UI.createAnimation();
	hideView.left = '110%';
	hideView.duration = 500;

	function resetOnClose() {
		win.close();
		//reset some values
		/*for (var j = 0; j < txtLbls.length; j++) {
		 txtLbls[j].text = ' ';
		 }
		 c = 0;

		 resetCloseArrow();

		 var resetTransform = Titanium.UI.create3DMatrix();
		 sv.animate({
		 transform : resetTransform.translate(0, 0, 0),
		 duration : 100
		 });*/
		parent.remove(self);
	};
	hideView.addEventListener('complete', resetOnClose);

	/*self.addEventListener('swipe', function(e) {
		if (e.direction === 'right')
			self.animate(hideView);
	});*/
	var win = Ti.UI.createWindow({backgroundColor:'transparent', width:'100%', height:'100%'});
	win.addEventListener('open', function(){
		self.animate(showView);
	});	
	win.add(self);
	return self;
};

module.exports = infoSlideout;
