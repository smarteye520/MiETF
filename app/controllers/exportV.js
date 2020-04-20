var args = $.args;

var allowClose = false;

function close(e) {
	if (allowClose) {
		$.exportV.close();
	} else { 
		$.exportV.close();//alert('Please wait.');
	}
};


$.friend_email.color = '#eeeeee';
$.friend_email.fontFamily = 'AvenirNextCondensed-Bold';
$.friend_email.fontSize = '21sp';
$.friend_email.fontWeight = 'Bold';
$.friend_email.height = 48;
$.friend_email.top = 20;
$.friend_email.width = "40%";
$.friend_email.left = "30%";
// $.friend_email.left = 16;
$.friend_email.hintTextColor = "#eeeeee";
$.friend_email.hintText = "Enter Friend's Email";
$.friend_email.backgroundImage = 'images/latest/search_field_black.pn8';
$.friend_email.borderRadius = 0;
$.friend_email.borderWidth = 0;
$.friend_email.borderColor = 'transparent';
$.friend_email.paddingLeft = 16;
$.friend_email.paddingRight = 16;
$.friend_email.borderStyle = Titanium.UI.INPUT_BORDERSTYLE_NONE;
$.friend_email.autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE;
$.friend_email.returnKeyType = Titanium.UI.RETURNKEY_DONE;
$.friend_email.value = '';
$.friend_email.passwordMask = false;
$.friend_email.zIndex = 20;
$.friend_email.opacity = 1;

$.send_email.font = {
	fontFamily : 'AvenirNextCondensed-Bold',
	fontSize : '22sp',
	fontWeight : 'bold'
};
$.send_email.height = 48;
// $.send_email.top = 32;
// $.send_email.left = 48;

$.send_email.borderRadius = 10;
$.send_email.width = 288;
$.send_email.height = 48;
$.send_email.backgroundGradient = {
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

var messageBody = "";
$.send_email.addEventListener("click", function(e) {
	if ($.friend_email.value.trim() == "") {
		alert("Email cannot be blank");
	} else {
		var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

	    if (!filter.test($.friend_email.value)) {
    	    alert('Please enter a valid e-mail address.');
    	} else {
    		// alert("Send Email");
			var emailDialog = Ti.UI.createEmailDialog();
			if (emailDialog.isSupported()) {
				emailDialog.subject = "MiETF Export Attached";
				emailDialog.toRecipients = [$.friend_email.value];
				emailDialog.messageBody = 'Open with MiETF app. \n' + messageBody;
				emailDialog.addAttachment($.export_image.image);
				emailDialog.open();				
			} else {
				alert("Email sending not supported");
			}
    	}
	}
});

var ImageFactory = require('ti.imagefactory');

var insideView = args.wrapper;


//$.export_image.image = ImageFactory.imageAsCropped(ImageFactory.imageAsResized(insideView.toImage(), { width:Ti.Platform.displayCaps.platformWidth * 0.35, height:Ti.Platform.displayCaps.platformHeight * 0.75 }), { width:Ti.Platform.displayCaps.platformWidth * 0.71, height:544, x:0, y:0 });
$.export_image.image = ImageFactory.imageAsCropped(ImageFactory.imageAsResized(insideView.toImage(), { width:Ti.Platform.displayCaps.platformWidth * 0.37, height:Ti.Platform.displayCaps.platformHeight * 0.7 }), { width:Ti.Platform.displayCaps.platformWidth, height:544, x:0, y:0 });
// insideView.height = 544;
// $.export_image.image = insideView.toImage();
// insideView.height = 1088;

exports.setUrl = function (url) {
//	$.statusLabel.text = 'File exported.';
	//$.export_image.image = url;
	allowClose = true;		
};


var lblTitle = Ti.UI.createLabel({
	color : '#333',
	font : {
		fontFamily : 'AvenirNextCondensed-Bold',
		fontSize : '18sp',
		fontWeight : 'bold'
	},
	//attributedString: buttonTitleAttr,
	text : args.title,
	textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	touchEnabled : false,
	top : 6 ,
	left : 16
});
messageBody += args.title + "\n";

$.etf_contents.add(lblTitle);

var data = getMietfComponentsChart(args.ETFVersionId);
for ( i = 0; i < data.length; i++) {
	var buttonText = (i + 1) + '. ' + data[i].facetTickerSymbol + ' (' + data[i].facetName + ') -> ' + data[i].PercentNum + "%";
	messageBody += buttonText + "\n";
	var lblItem = Ti.UI.createLabel({
		color : '#333',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '14sp',
			fontWeight : 'bold'
		},
		//attributedString: buttonTitleAttr,
		text : buttonText,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		touchEnabled : false,
		top : 6 ,
		left : 16 ,
		facetName : data[i].facetName,
		facetTickerSymbol : data[i].facetTickerSymbol,
		buttonText : data[i].facetName.substring(0, 30),
		ETFVersionId : data[i].ETFVersionId
	});
	$.etf_contents.add(lblItem)

	if (data[i].ETFVersionId != 0) {
		var child_data = getMietfComponentsChart(data[i].ETFVersionId);
		for (var j=0;j<child_data.length;j++) {
			var buttonText = (j + 1) + '. ' + child_data[j].facetTickerSymbol + ' (' + child_data[j].facetName + ') -> ' + child_data[j].PercentNum + "%";
			messageBody += "  " + buttonText + "\n";
			var lblItem = Ti.UI.createLabel({
				color : '#333',
				font : {
					fontFamily : 'AvenirNextCondensed-Bold',
					fontSize : '14sp',
					fontWeight : 'bold'
				},
				//attributedString: buttonTitleAttr,
				text : buttonText,
				textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
				touchEnabled : false,
				top : 6 ,
				left : 32 ,
				facetName : child_data[j].facetName,
				facetTickerSymbol : child_data[j].facetTickerSymbol,
				buttonText : child_data[j].facetName.substring(0, 30),
				ETFVersionId : child_data[j].ETFVersionId
			});
			$.etf_contents.add(lblItem)			
		}
		var strategy = new newStrategy(getStrategyByETFVersionId(data[i].ETFVersionId));
		var buttonText = "";
		if (strategy.col1 == "qstn1") {
			buttonText = "Rebalance to Original";
			if (strategy.col3 == "qstn7") {
				buttonText += " -> " + "Periodically"
			}
			if (strategy.col3 == "qstn8") {
				buttonText += " -> " + "Price Move"
			}
			buttonText += " -> " + strategy.col4Title
		} else if (strategy.col1 == "qstn2") { 
			buttonText = "Follow the Winners";
			if (strategy.col2 == "qstn5") {
				buttonText += " -> " + "5% reallocation"
			}
			if (strategy.col2 == "qstn6") {
				buttonText += " -> " + "10% reallocation"
			}
			if (strategy.col3 == "qstn7") {
				buttonText += " -> " + "Periodically"
			}
			if (strategy.col3 == "qstn8") {
				buttonText += " -> " + "Price Move"
			}
			buttonText += " -> " + strategy.col4Title
		} else if (strategy.col1 == "qstn3") { 
			buttonText = "Arbitrage";
			buttonText = "Follow the Winners";
			if (strategy.col2 == "qstn5") {
				buttonText += " -> " + "5% reallocation"
			}
			if (strategy.col2 == "qstn6") {
				buttonText += " -> " + "10% reallocation"
			}
			if (strategy.col3 == "qstn7") {
				buttonText += " -> " + "Periodically"
			}
			if (strategy.col3 == "qstn8") {
				buttonText += " -> " + "Price Move"
			}
			buttonText += " -> " + strategy.col4Title
		} else if (strategy.col1 == "qstn4") { 
			buttonText = "Invest and Hold";
		}
		var lblStrategy = Ti.UI.createLabel({
			color : '#333',
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '14sp',
				fontWeight : 'bold'
			},
			//attributedString: buttonTitleAttr,
			text : "Strategy: " + buttonText,
			textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
			touchEnabled : false,
			top : 6 ,
			left : 32
		});
		$.etf_contents.add(lblStrategy);
		messageBody += "  Strategy: " + buttonText + "\n";
	}
}
var strategy = new newStrategy(getStrategyByETFVersionId(args.ETFVersionId));
var buttonText = "";
if (strategy.col1 == "qstn1") {
	buttonText = "Rebalance to Original";
	if (strategy.col3 == "qstn7") {
		buttonText += " -> " + "Periodically"
	}
	if (strategy.col3 == "qstn8") {
		buttonText += " -> " + "Price Move"
	}
	buttonText += " -> " + strategy.col4Title
} else if (strategy.col1 == "qstn2") { 
	buttonText = "Follow the Winners";
	if (strategy.col2 == "qstn5") {
		buttonText += " -> " + "5% reallocation"
	}
	if (strategy.col2 == "qstn6") {
		buttonText += " -> " + "10% reallocation"
	}
	if (strategy.col3 == "qstn7") {
		buttonText += " -> " + "Periodically"
	}
	if (strategy.col3 == "qstn8") {
		buttonText += " -> " + "Price Move"
	}
	buttonText += " -> " + strategy.col4Title
} else if (strategy.col1 == "qstn3") { 
	buttonText = "Arbitrage";
	buttonText = "Follow the Winners";
	if (strategy.col2 == "qstn5") {
		buttonText += " -> " + "5% reallocation"
	}
	if (strategy.col2 == "qstn6") {
		buttonText += " -> " + "10% reallocation"
	}
	if (strategy.col3 == "qstn7") {
		buttonText += " -> " + "Periodically"
	}
	if (strategy.col3 == "qstn8") {
		buttonText += " -> " + "Price Move"
	}
	buttonText += " -> " + strategy.col4Title
} else if (strategy.col1 == "qstn4") { 
	buttonText = "Invest and Hold";
}
var lblStrategy = Ti.UI.createLabel({
	color : '#333',
	font : {
		fontFamily : 'AvenirNextCondensed-Bold',
		fontSize : '14sp',
		fontWeight : 'bold'
	},
	//attributedString: buttonTitleAttr,
	text : "Strategy: " + buttonText,
	textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	touchEnabled : false,
	top : 6 ,
	left : 16
});
$.etf_contents.add(lblStrategy);
messageBody += "Strategy: " + buttonText + "\n";
