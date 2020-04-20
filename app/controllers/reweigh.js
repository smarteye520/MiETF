var runningFirstTime = false;
var runOnce = true;
var interval = 100;
var col1Selected = [];
col1Selected.id = -1;
var col2Selected = [];
col2Selected.id = -1;
var col3Selected = [];
col3Selected.id = -1;
var complete = 0;
var color1 = mietf.vaultColorDictionary[mietf.source.vaultNum - 1].color;
//was onColor
var color2 = mietf.vaultColorDictionary[mietf.source.vaultNum - 1].color;
var answerArrayI = 0;

$.infoButton.backgroundColor = color1;

var requirePasscodeSwitch = mod.createSwitch({
	height:38, width:65, left:0, 
	value:true, 
	switchArea:{
		height:38, width:65
	}, 
	inactiveColor: 'white', 
	onColor:"#2d9bd9"
});
	
$.cash_as_rellocation.add(requirePasscodeSwitch);


var reinvestDividendsSwitch = mod.createSwitch({
	height:38, width:65, left:0, 
	value: false, 
	switchArea:{
		height:38, width:65
	}, 
	inactiveColor: 'white',
	enabled: false,
	onColor:"#2d9bd9"
});
reinvestDividendsSwitch.addEventListener('click', handlerClickDividendsSwitch);
$.reinvest_dividends.add(reinvestDividendsSwitch);

function handlerClickDividendsSwitch(e) {
	Alloy.createController('alertPopup', {text:'Not available in this version, dividends are accumulated in cash'}).getView().open();
}

if (Ti.App.Properties.getInt('strategyFirstTime', 0) == 0) {
	$.titleLbl.opacity = 1;
	//0
	$.col1strategy.opacity = 0;
	$.col2realloc.opacity = 0;
	$.col3type.opacity = 0;
	$.col4multi.opacity = 0;
	$.col4btn1.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};

	$.doneButton.opacity = 0;
	complete = 0;
	requirePasscodeSwitch.value = true;
}

var sliderShowing = false;

var typeCode = 'period';

function multiClick(e) {

	typeCode = 'period';

	if (col3Selected.id == 'qstn8') {
		typeCode = 'price';
	}

	var Popover = require('periodSlider');
	popover = new Popover({
		type : 'period',
		parent : e.source,
		left : $.col4multi.left,
		top : $.col4multi.top,
		typeCode : typeCode,
		index : index,
		reweigh : $,
		col4btn1Title : $.col4btn1.title,
		color : 'black'
	});
	popover.anchorPoint = {
		x : 0.5,
		y : 0.5
	};
	popover.fromStrategy = true;

	//popover.show({ view: e.source});

	$.reweigh.add(popover);
	sliderShowing = true;

	//periodChoices = ['5%', '10%', '15%', '20%', '25%', '50%'];
	//periodChoices = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually'];
	//popover.setSelectedRow(0, index, false);

	if (typeCode == 'period') {
		if ($.col4btn1.title == 'Daily')
			popover.setSelectedRow(0, 0, false);
		if ($.col4btn1.title == 'Weekly')
			popover.setSelectedRow(0, 1, false);
		if ($.col4btn1.title == 'Monthly')
			popover.setSelectedRow(0, 2, false);
		if ($.col4btn1.title == 'Quarterly')
			popover.setSelectedRow(0, 3, false);
		if ($.col4btn1.title == 'Annually')
			popover.setSelectedRow(0, 4, false);
	}
	var found = false;
	if (typeCode == 'price') {
		var perc = Number($.col4btn1.title.slice(0, -1)) - 1;
		if (perc == 5) {
			popover.setSelectedRow(0, 0, false);
			found = true;
		}
		if (perc == 10) {
			popover.setSelectedRow(0, 1, false);
			found = true;
		}
		if (perc == 15) {
			popover.setSelectedRow(0, 2, false);
			found = true;
		}
		if (perc == 20) {
			popover.setSelectedRow(0, 3, false);
			found = true;
		}
		if (perc == 25) {
			popover.setSelectedRow(0, 4, false);
			found = true;
		}
		if (perc == 50) {
			popover.setSelectedRow(0, 5, false);
			found = true;
		}
	}

	if (typeCode == 'price' && (!found)) {
		var index = Number($.col4btn1.title.slice(0, -1)) - 1 + 6;
		popover.setSelectedRow(0, index, false);
	}

	popover.goLarge();
}

function buttonClick(e) {

	$.col2realloc.opacity = 0;
	$.col3type.opacity = 0;
	$.col4multi.opacity = 0;
	$.col4btn1.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};

	$.doneButton.opacity = 0;
	complete = 0;

	if (e.source.id == 'qstn1') {
		$.col3type.top = 190;
		$.col3type.left = 264;
		$.col4multi.left = 464;
	}

	if (e.source.id == 'qstn2') {
		$.col2realloc.top = 230;
		$.col3type.left = 464;
		$.col4multi.left = 648;
	}

	if (e.source.id == 'qstn3') {
		$.col2realloc.top = 270;
		$.col3type.left = 464;
		$.col4multi.left = 648;
	}

	if (col1Selected.id != e.source.id) {

		var goLeft = Titanium.UI.createAnimation({
			left : 0,
			duration : 400
		});

		if (col1Selected.id != -1) {
			$[col1Selected.child].backgroundGradient = {
				type : 'linear',
				colors : ['#666666', '#A2A0A5'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 2,
					y : 50
				},
				backFillStart : false
			};
			col1Selected.animate(goLeft);
		}

		var goRight = Titanium.UI.createAnimation({
			left : 32,
			duration : 400
		});
		goRight.addEventListener('complete', showCol2);

		$[e.source.child].backgroundGradient = {
			type : 'linear',
			colors : [color1, color2],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		e.source.animate(goRight);
	} else {
		var goLeft = Titanium.UI.createAnimation({
			left : 0,
			duration : 400
		});
		goLeft.addEventListener('complete', resetCol1);

		$[col1Selected.child].backgroundGradient = {
			type : 'linear',
			colors : ['#666666', '#A2A0A5'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		col1Selected.animate(goLeft);

	}

	col1Selected = e.source;

}

function resetCol1(e) {
	answerArrayI = 0;
	col1Selected = [];
	col1Selected.id = -1;

	col2Selected = [];
	col2Selected.id = -1;

	col3Selected = [];
	col3Selected.id = -1;

	$.col2realloc.opacity = 0;
	$.col2btn1.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};
	$.col2btn2.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};
	$.qstn5.left = 0;
	$.qstn6.left = 0;

	$.col3type.opacity = 0;
	$.col3btn1.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};
	$.col3btn2.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};
	$.qstn7.left = 0;
	$.qstn8.left = 0;

	$.col4multi.opacity = 0;
	$.col4btn1.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};
	$.doneButton.opacity = 0;
	complete = 0;

}

function showCol2(e) {

	if (col1Selected.id == "qstn1") {
		$.col3type.opacity = 0;
		$.col3btn1.backgroundGradient = {
			type : 'linear',
			colors : ['#666666', '#A2A0A5'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		$.col3btn2.backgroundGradient = {
			type : 'linear',
			colors : ['#666666', '#A2A0A5'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		$.qstn7.left = 0;
		$.qstn8.left = 0;

		col3Selected = [];
		col3Selected.id = -1;

		animation.popIn($.col3type);
		answerArrayI = 2;
	}

	if (col1Selected.id == "qstn2" || col1Selected.id == "qstn3") {
		$.col2btn1.backgroundGradient = {
			type : 'linear',
			colors : ['#666666', '#A2A0A5'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		$.col2btn2.backgroundGradient = {
			type : 'linear',
			colors : ['#666666', '#A2A0A5'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		$.qstn5.left = 0;
		$.qstn6.left = 0;
		col2Selected = [];
		col2Selected.id = -1;

		col3Selected = [];
		col3Selected.id = -1;

		animation.popIn($.col2realloc);
		answerArrayI = 1;
	}

	if (col1Selected.id == "qstn4") {
		answerArrayI = 0;
		complete = 1;
		animation.popIn($.doneButton);
		//set end to firstRun
	}
}

function buttonClick2(e) {

	if (e.source.id == 'qstn5') {
		$.col3type.opacity = 0;
		$.col3type.top = $.col2realloc.top + 32;
	}

	if (e.source.id == 'qstn6') {
		$.col3type.opacity = 0;
		$.col3type.top = $.col2realloc.top + 72;
	}

	answerArrayI = 1;

	if (col2Selected.id != e.source.id) {

		var goLeft = Titanium.UI.createAnimation({
			left : 0,
			duration : 400
		});

		if (col2Selected.id != -1) {
			$[col2Selected.child].backgroundGradient = {
				type : 'linear',
				colors : ['#666666', '#A2A0A5'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 2,
					y : 50
				},
				backFillStart : false
			};
			col2Selected.animate(goLeft);
		}

		var goRight = Titanium.UI.createAnimation({
			left : 32,
			duration : 400
		});
		goRight.addEventListener('complete', showCol3);

		$[e.source.child].backgroundGradient = {
			type : 'linear',
			colors : [color1, color2],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		e.source.animate(goRight);
	} else {
		var goLeft = Titanium.UI.createAnimation({
			left : 0,
			duration : 400
		});
		goLeft.addEventListener('complete', resetCol2);

		$[col2Selected.child].backgroundGradient = {
			type : 'linear',
			colors : ['#666666', '#A2A0A5'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		col2Selected.animate(goLeft);

	}

	col2Selected = e.source;

}

function showCol3(e) {
	$.col3type.opacity = 0;
	$.col3btn1.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};
	$.col3btn2.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};
	$.qstn7.left = 0;
	$.qstn8.left = 0;
	col3Selected = [];
	col3Selected.id = -1;
	$.col4multi.opacity = 0;
	$.col4btn1.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};

	$.doneButton.opacity = 0;
	complete = 0;

	animation.popIn($.col3type);
	answerArrayI = 2;
}

function resetCol2(e) {
	answerArrayI = 1;

	col2Selected = [];
	col2Selected.id = -1;
	col3Selected = [];
	col3Selected.id = -1;

	$.col3type.opacity = 0;
	$.col3btn1.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};
	$.col3btn2.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};
	$.qstn7.left = 0;
	$.qstn8.left = 0;

	$.col4multi.opacity = 0;
	$.col4btn1.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};

	$.doneButton.opacity = 0;
	complete = 0;

}

function buttonClick3(e) {
	$.col4multi.opacity = 0;

	if (e.source.id == 'qstn7') {
		$.col4multi.top = $.col3type.top + 32;
	}

	if (e.source.id == 'qstn8') {
		$.col4multi.top = $.col3type.top + 72;
	}

	$.col4btn1.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};

	$.doneButton.opacity = 0;
	complete = 0;
	answerArrayI = 2;

	if (col3Selected.id != e.source.id) {

		var goLeft = Titanium.UI.createAnimation({
			left : 0,
			duration : 400
		});

		if (col3Selected.id != -1) {
			$[col3Selected.child].backgroundGradient = {
				type : 'linear',
				colors : ['#666666', '#A2A0A5'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 2,
					y : 50
				},
				backFillStart : false
			};
			col3Selected.animate(goLeft);
		}

		var goRight = Titanium.UI.createAnimation({
			left : 32,
			duration : 400
		});
		goRight.addEventListener('complete', showCol4);

		$[e.source.child].backgroundGradient = {
			type : 'linear',
			colors : [color1, color2],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		e.source.animate(goRight);

	} else {
		var goLeft = Titanium.UI.createAnimation({
			left : 0,
			duration : 400
		});
		goLeft.addEventListener('complete', resetCol3);

		$[col3Selected.child].backgroundGradient = {
			type : 'linear',
			colors : ['#666666', '#A2A0A5'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		col3Selected.animate(goLeft);

	}

	col3Selected = e.source;

}

function showCol4(e) {

	if (col3Selected.id == 'qstn8') {
		answerArrayI = 4;
		$.col4btn1.title = '5%';
	} else {
		$.col4btn1.title = 'Monthly';
		answerArrayI = 3;
	}

	animation.popIn($.col4multi);
	complete = 1;
	animation.popIn($.doneButton);
}

function resetCol3(e) {
	answerI = 2;

	col3Selected = [];
	col3Selected.id = -1;

	$.col4multi.opacity = 0;
	$.col4btn1.backgroundGradient = {
		type : 'linear',
		colors : ['#666666', '#A2A0A5'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};

	$.doneButton.opacity = 0;
	complete = 0;

}

var answerArray = new Array();
var answer1 = new Object();
var answer2 = new Object();
var answer3 = new Object();
var answer4 = new Object();
var answer5 = new Object();

//answer: titleAttrText, tearoff, bodyAttrText
answer1.titleAttrText = Ti.UI.createAttributedString({
	text : 'Help Topic: Choose a Strategy',
	attributes : [{
		type : Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
		value : Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		range : [0, "Help Topic: Choose a Strategy".length]
	}]
});

answer1.tearoff = 'images/ifapps/pic1.png';

var help1 = 'An investment strategy is an essential aspect of your MiETF.  There are four strategies to choose from:';

var help2 = 'Rebalance to Original - This is the most basic strategy.   In this strategy, at a predetermined point (for example, on a monthly interval), the investment  holdings are adjusted their original allocation %s.';

var help3 = 'Follow the Winners - Unique to MiETF, this more daring strategy allows better performing holdings to receive a "bigger slice of the cake" - when a rebalancing is triggered these holdings receive an allocation greater than their previous allocation.';

var help4 = 'Arbitrage - In this strategy, the better performing holdings are sold to simultaneously purchase more of the holdings which did not perform as well, i.e. when a rebalancing is triggered the lesser performing holdings receive a larger allocation.';

var help5 = 'Invest and Hold (equivalent to "No Strategy") - If this strategy is chosen, no rebalancing occurs.  The holdings are purchased at the beginning of the charting period and held.';

var help = help1 + '\n\n' + help2 + '\n\n' + help3 + '\n\n' + help4 + '\n\n' + help5;

answer1.bodyAttrText = Ti.UI.createAttributedString({
	text : help,
	attributes : [{
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [0, help1.length]
	}, {
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [help.indexOf('Rebalance to Original'), ('Rebalance to Original').length]
	}, {
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [help.indexOf('Follow the Winners'), ('Follow the Winners').length]
	}, {
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [help.indexOf('Arbitrage'), ('Arbitrage').length]
	}, {
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [help.indexOf('Invest and Hold (equivalent to "No Strategy")'), ('Invest and Hold (equivalent to "No Strategy")').length]
	}]
});

answerArray.push(answer1);

answer2.titleAttrText = Ti.UI.createAttributedString({
	text : 'Help Topic: Choose a Reallocation Percentage',
	attributes : [{
		type : Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
		value : Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		range : [0, "Help Topic: Choose a Reallocation Percentage".length]
	}]
});
answer2.tearoff = 'images/ifapps/pic2.png';

var realloc1 = 'This strategy will modify the allocation given to a holding by the chosen percentage:';
var realloc2 = '5% reallocation -  At each trigger point and per the rules of the chosen strategy increment or decrement the holdings allocation by five percent.';
var realloc3 = '10% reallocation -  At each trigger point and per the rules of the chosen strategy increment or decrement the holdings allocation by ten percent. ';
var realloc4 = 'For example, if a MiETF is currently allocated at 50% IBM and 50% GE and has a Strategy of Follow the Winners with 5% reallocation and a Monthly rebalance period, then if for that month, IBM outperformed GE, the new allocation for IBM would be 55% and the new allocation for GE would be 45%.';
var realloc = realloc1 + '\n\n' + realloc2 + '\n\n' + realloc3 + '\n\n' + realloc4;

answer2.bodyAttrText = Ti.UI.createAttributedString({
	text : realloc,
	attributes : [{
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [0, realloc1.length]
	}, {
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [realloc.indexOf('5% reallocation'), ('5% reallocation').length]
	}, {
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [realloc.indexOf('10% reallocation'), ('10% reallocation').length]
	}]
});
answerArray.push(answer2);

answer3.titleAttrText = Ti.UI.createAttributedString({
	text : 'Help Topic: Choose a Trigger Point',
	attributes : [{
		type : Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
		value : Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		range : [0, "Help Topic: Choose a Trigger Point".length]
	}]
});
answer3.tearoff = 'images/ifapps/pic3.png';

var period1 = 'A trigger point is when a rebalance should occur:';
var period2 = 'Periodically -  Choose this option to do rebalancing at a predetermined calendar interval, such as daily, weekly, monthly, quarterly or annually.';
var period3 = 'Price Move - Choose this option to schedule a rebalancing when the value of a holding within the MiETF has increased or decreased by the given percentage point. ';
var period4 = '';
var period = period1 + '\n\n' + period2 + '\n\n' + period3 + '\n\n' + period4;

answer3.bodyAttrText = Ti.UI.createAttributedString({
	text : period,
	attributes : [{
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [0, period1.length]
	}, {
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [period.indexOf('Periodically'), ('Periodically').length]
	}, {
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [period.indexOf('Price Move'), ('Price Move').length]
	}]
});
answerArray.push(answer3);

answer4.titleAttrText = Ti.UI.createAttributedString({
	text : 'Help Topic: Period Trigger Point',
	attributes : [{
		type : Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
		value : Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		range : [0, "Help Topic: Period Trigger Point".length]
	}]
});
answer4.tearoff = 'images/ifapps/pic4.png';
var calendar1 = 'A period trigger point is the calendar interval, or period, in which to analyze the MiETF for rebalance:';
var calendar2 = 'Choices are daily, weekly, monthly, quarterly or annually.';
var calendar3 = '';
var calendar4 = '';
var calendar = calendar1 + '\n\n' + calendar2 + '\n\n' + calendar3 + '\n\n' + calendar4;

answer4.bodyAttrText = Ti.UI.createAttributedString({
	text : calendar,
	attributes : [{
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [0, calendar1.length]
	}]
});
answerArray.push(answer4);

answer5.titleAttrText = Ti.UI.createAttributedString({
	text : 'Help Topic: Price Move Trigger Point',
	attributes : [{
		type : Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
		value : Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		range : [0, "Help Topic: Price Move Trigger Point".length]
	}]
});
answer5.tearoff = 'images/ifapps/pic5.png';
var pmove1 = 'A price move trigger will cause a rebalance of the MiETF when a holding within the MiETF has changed in value by the specified percentage:';
var pmove2 = 'Any percentage between 1% and 100% may be chosen.';
var pmove = pmove1 + '\n\n' + pmove2;

answer5.bodyAttrText = Ti.UI.createAttributedString({
	text : pmove,
	attributes : [{
		type : Ti.UI.ATTRIBUTE_FONT,
		value : {
			fontSize : '18sp',
			fontFamily : 'AvenirNextCondensed-Bold'
		},
		range : [0, pmove1.length]
	}]
});
answerArray.push(answer5);

function info(e) {

	Ti.App.Properties.setInt('answerRanOnceAlready', 1);

	if (col1Selected.id == -1)
		answerArrayI = 0;

	var InfoSlideout = require('answerSlideout'),
	    infoSlideout = new InfoSlideout({
		parent : $.reweigh,
		answer : answerArray[answerArrayI]
	});
	$.reweigh.add(infoSlideout);
	infoSlideout.slideIn();
}

function close(e) {
	if (complete) {
		Ti.App.Properties.setInt('strategyFirstTime', 1);
	} else {
		//alert('complete:'  + complete);
	}
	if(e.source.id=='doneButton'){
		updateStrategyNum();
	}
	$.reweigh.animate(hideView);
}

var args = arguments[0] || {};

function updateStrategyNum() {

	var col1 = 0;
	if (col1Selected.id == 'qstn2')
		col1 = 1;
	if (col1Selected.id == 'qstn3')
		col1 = 2;
	if (col1Selected.id == 'qstn4')
		col1 = 3;

	var col2 = 0;
	if ((col1Selected.id == 'qstn2' || col1Selected.id == 'qstn3') && col2Selected.id == 'qstn6')
		col2 = 1;

	var col3 = 0;
	if (col3Selected.id == 'qstn8')
		col3 = 1;

	var col4 = 0;
	if (col3 == 0) {
		if ($.col4btn1.title == 'Weekly')
			col4 = 1;
		if ($.col4btn1.title == 'Monthly')
			col4 = 2;
		if ($.col4btn1.title == 'Quarterly')
			col4 = 3;
		if ($.col4btn1.title == 'Annually')
			col4 = 4;
	} else {
		col4 = Number($.col4btn1.title.slice(0, -1)) - 1;
	}

	if (col1 == 3) {//Invest and Hold
		col2 = 0;
		col3 = 0;
		col4 = 0;
	}

	mietf.strategyNum = mietf.getStrategyId(col1, col2, col3, col4);
	/////

	if (mietf.strategyNum != mietf.strategySave) {
		Ti.App.fireEvent('updateStrategyButton', {
			strategyNum : mietf.strategyNum
		});
	}

};

var titleMsg = 'MiETF Reweighing Strategy';

var attr = Ti.UI.createAttributedString({
	text : titleMsg,
	attributes : [{
		type : Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
		value : Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
		range : [0, titleMsg.length]
	}]
});

$.reweigh.left = '99.2%';
$.titleLbl.attributedString = attr;
//$.infoBtn.title = '?';

exports.slideIn = function() {

	mietf.strategyNum = getStrategyByETFVersionId(mietf.ETFVersionId);
	mietf.strategySave = mietf.strategyNum;
	if (!Ti.App.Properties.getInt('strategyFirstTime', 0) == 0)
		selectButtons(mietf.strategyNum);
	Ti.App.fireEvent('updateStrategyButton', {
		strategyNum : mietf.strategyNum
	});

	var slideInAnim = Ti.UI.createAnimation({
		left : 214,
		duration : 500
	});

	slideInAnim.addEventListener('complete', function(e) {
		if (Ti.App.Properties.getInt('answerRanOnceAlready', 0) == 0) {
			info();
		}

		if (Ti.App.Properties.getInt('strategyFirstTime', 0) == 0) {

			runningFirstTime = true;

			$.titleLbl.opacity = 1;

			//step = step1;
			//timer = setInterval(step, interval * .9);
			step2();
		}
	});

	$.reweigh.animate(slideInAnim);
};

function selectButtons(strategyNum) {
	var strategy = new newStrategy(strategyNum);

	$.col1strategy.opacity = 1;
	$.doneButton.opacity = 1;
	$.col2realloc.opacity = 0;
	$.col3type.opacity = 0;
	$.col4multi.opacity = 0;

	col1Selected = $[strategy.col1];
	col2Selected = [];
	col2Selected.id = -1;

	col3Selected = [];
	col3Selected.id = -1;

	$[strategy.col1].left = 32;
	$[$[strategy.col1].child].backgroundGradient = {
		type : 'linear',
		colors : [color1, color2],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 2,
			y : 50
		},
		backFillStart : false
	};
	answerArrayI = 0;

	if (strategy.col1 == 'qstn1') {
		$.col3type.opacity = 1;
		$.col4multi.opacity = 1;
		$.col3type.top = 190;
		$.col3type.left = 264;
		$.col4multi.left = 464;
		col3Selected = $[strategy.col3];
		$[strategy.col3].left = 32;
		$[$[strategy.col3].child].backgroundGradient = {
			type : 'linear',
			colors : [color1, color2],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		$.col4btn1.title = strategy.col4Title;
		$.col4btn1.backgroundGradient = {
			type : 'linear',
			colors : [color1, color2],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};

		if (strategy.col3 == 'qstn7')
			$.col4multi.top = $.col3type.top + 32;
		if (strategy.col3 == 'qstn8')
			$.col4multi.top = $.col3type.top + 72;
		if (strategy.col3 == 'qstn7')
			answerArrayI = 3;
		if (strategy.col3 == 'qstn8')
			answerArrayI = 4;

	}

	if (strategy.col1 == 'qstn2') {
		$.col2realloc.opacity = 1;
		$.col3type.opacity = 1;
		$.col4multi.opacity = 1;

		$.col2realloc.top = 230;
		$.col3type.left = 464;
		$.col4multi.left = 648;

		if (strategy.col2 == 'qstn5')
			$.col3type.top = $.col2realloc.top + 32;
		if (strategy.col2 == 'qstn6')
			$.col3type.top = $.col2realloc.top + 72;
		if (strategy.col3 == 'qstn7')
			$.col4multi.top = $.col3type.top + 32;
		if (strategy.col3 == 'qstn8')
			$.col4multi.top = $.col3type.top + 72;
		if (strategy.col3 == 'qstn7')
			answerArrayI = 3;
		if (strategy.col3 == 'qstn8')
			answerArrayI = 4;

		$[strategy.col2].left = 32;
		$[$[strategy.col2].child].backgroundGradient = {
			type : 'linear',
			colors : [color1, color2],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		$[strategy.col3].left = 32;
		$[$[strategy.col3].child].backgroundGradient = {
			type : 'linear',
			colors : [color1, color2],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		$.col4btn1.title = strategy.col4Title;
		$.col4btn1.backgroundGradient = {
			type : 'linear',
			colors : [color1, color2],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		col2Selected = $[strategy.col2];
		col3Selected = $[strategy.col3];

	}

	if (strategy.col1 == 'qstn3') {
		$.col2realloc.opacity = 1;
		$.col3type.opacity = 1;
		$.col4multi.opacity = 1;

		$.col2realloc.top = 270;
		$.col3type.left = 464;
		$.col4multi.left = 648;

		if (strategy.col2 == 'qstn5')
			$.col3type.top = $.col2realloc.top + 32;
		if (strategy.col2 == 'qstn6')
			$.col3type.top = $.col2realloc.top + 72;
		if (strategy.col3 == 'qstn7')
			$.col4multi.top = $.col3type.top + 32;
		if (strategy.col3 == 'qstn8')
			$.col4multi.top = $.col3type.top + 72;
		if (strategy.col3 == 'qstn7')
			answerArrayI = 3;
		if (strategy.col3 == 'qstn8')
			answerArrayI = 4;

		$[strategy.col2].left = 32;
		$[$[strategy.col2].child].backgroundGradient = {
			type : 'linear',
			colors : [color1, color2],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		$[strategy.col3].left = 32;
		$[$[strategy.col3].child].backgroundGradient = {
			type : 'linear',
			colors : [color1, color2],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		$.col4btn1.title = strategy.col4Title;
		$.col4btn1.backgroundGradient = {
			type : 'linear',
			colors : [color1, color2],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 2,
				y : 50
			},
			backFillStart : false
		};
		col2Selected = $[strategy.col2];
		col3Selected = $[strategy.col3];
	}

}

var hideView = Titanium.UI.createAnimation({
	left : "110%",
	duration : 500
});
hideView.addEventListener('complete', function(e) {
	Ti.App.removeEventListener('closeSlideouts', closeSlideoutResponder);
	args.parent.remove($.reweigh);
	if (mietf.strategyNum != mietf.strategySave) {
		mietf.ETFVersionId = saveMietfComponents(mietf.ETFVersionId);
		saveStrategyByETFVersionId(mietf.ETFVersionId, mietf.strategyNum);
		mietf.strategySave = mietf.strategyNum;
		Ti.App.fireEvent('updateStrategyButton', {
			strategyNum : mietf.strategyNum
		});
		Ti.App.fireEvent('endStrategyChange', {});
	}
});

Ti.App.addEventListener('closeSlideouts', closeSlideoutResponder);

$.reweigh.updateButton = function(_args) {
	$[_args.id].title = _args.title;
};

function closeSlideoutResponder(e) {
	if (complete)
		Ti.App.Properties.setInt('strategyFirstTime', 1);
	updateStrategyNum();
	$.reweigh.animate(hideView);

}

//animations for first time

var c = 0;
var timer;
var step;
var step1Text = " MiETF Reweighing Strategy";

function step1() {
	var step = 1;
	step--;

	var text = step1Text.substr(0, c) + '_';
	var attr = Ti.UI.createAttributedString({
		text : text,
		attributes : [{
			type : Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
			value : Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
			range : [0, text.length]
		}]
	});

	$.titleLbl.attributedString = attr;

	if (c == step1Text.length) {
		clearInterval(timer);
		c = 0;
		step = step1blink;
		timer = setInterval(step, interval * 2);
	}

	c++;
}

var even = 0;
function step1blink() {
	var step = 1;
	step--;

	if (even == 0)
		var text = step1Text.substr(0, step1Text.length);
	if (even == 1)
		var text = step1Text.substr(0, step1Text.length) + '_';

	var attr = Ti.UI.createAttributedString({
		text : text,
		attributes : [{
			type : Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
			value : Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
			range : [0, text.length]
		}]
	});

	$.titleLbl.attributedString = attr;

	if (c == Ti.App.Properties.getInt('step1BlinkCount', 10)) {
		var text = step1Text.substr(0, step1Text.length);
		var attr = Ti.UI.createAttributedString({
			text : text,
			attributes : [{
				type : Ti.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
				value : Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
				range : [0, text.length]
			}]
		});

		$.titleLbl.attributedString = attr;
		clearInterval(timer);
		c = 0;
		step2();
		//step = step2;
		//timer = setInterval(step, interval*.9);
	}

	c++;
	even++;
	if (even == 2)
		even = 0;
}

function step2() {
	animation.popIn($.col1strategy);
}

Ti.App.addEventListener('closeSlider', function(e) {
	Ti.API.info('closeSlider reweigh '+sliderShowing);
	if (sliderShowing) {
		try {

			var matrix = Ti.UI.create2DMatrix();
			matrix = matrix.scale(1, 0.1);
			var goSmall = Ti.UI.createAnimation({
				duration : 500,
				transform : matrix
			});

			var goSmall = Ti.UI.createAnimation({
				duration : 500,
				transform : matrix
			});
			goSmall.addEventListener('complete', function(e) {
				$.reweigh.remove(popover);
			});
			//popover.goSmall();
			popover.animate(goSmall);

		} catch (err) {

		}
		sliderShowing = false;
	}

});

$.reweigh.addEventListener('click', function(e) {
	Ti.API.info('Clicked reweigh');
	if (e.source.id != 'qstn9') {
		Ti.App.fireEvent('closeSlider', {});
	}
});
