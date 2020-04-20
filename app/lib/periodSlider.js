var periodChoices = [];
var anythingwaschanged = false;
var index;
function Popover(_args) {

	var titleLbltext = 'Period';

	if (_args.typeCode == 'price') {
		titleLbltext = 'Price Move';
		periodChoices = ['5%', '10%', '15%', '20%', '25%', '50%'];
		for ( i = 1; i <= 100; i++) {
			periodChoices.push(i + '%');
		}
		index = 'percIndex';
		var eRowIndex = _args.index;
	} else {
		periodChoices = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually'];
		index = 'periodIndex';
		var eRowIndex = _args.index;
		//Ti.App.Properties.getInt(index, 2);
	}

	var popoverV = Ti.UI.createView({
		top : -108,
		width : 128,
		height : 224,
		backgroundColor : '#4C4C4E'
	});

	var pickerV = Ti.UI.createView({
		top : 24,
		width : 128,
		height : 200,
		backgroundColor : '#4C4C4E'
	});

	var picker = Ti.UI.createPicker({
		height : 200,
		width : 128,
		backgroundColor : '#4C4C4E'
	});

	picker.addEventListener('closeSlider', function(e) {
		Ti.App.fireEvent('closeSlider', {});
	});

	picker.setLocale('fr');

	var column = Ti.UI.createPickerColumn({backgroundColor : '#4C4C4E'});

	for (var i = 0; i < periodChoices.length; i++) {
		var row = Ti.UI.createPickerRow({
			id : i,
			backgroundColor : '#4C4C4E'
		});
		var label = Ti.UI.createLabel({
			backgroundColor : '#4C4C4E',
			text : periodChoices[i],
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : '14sp',
				fontWeight : 'bold'
			},
			width : 200,
			height : 32,
			color : 'white'
		});
		//5, -94
		row.add(label);

		column.addRow(row);
	}

	picker.add(column);
	picker.selectionIndicator = true;

	pickerV.add(picker);
	
	var selectView = Ti.UI.createView({height:20, width:'100%'});
    selectView.addEventListener('click', function(){Ti.App.fireEvent('closeSlider', {});});
    pickerV.add(selectView);

	var titleLbl = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : 14 + 'sp',
			fontWeight : 'bold'
		},
		text : titleLbltext,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false,
		top : 5,
		zIndex : 10
	});

	popoverV.add(titleLbl);

	popoverV.add(pickerV);

	var closeX = Ti.UI.createImageView({
		image : 'images/ifapps/circleX.pn8',
		top : -8,
		right : -5
	});

	//popoverV.add(closeX);

	closeX.addEventListener('click', function(e) {
		Ti.App.fireEvent('closeSlider', {});
	});

	var popover = Ti.UI.createView({
		//  width: 128,
		//  height: 224 //,
		//contentView: popoverV
		borderRadius : 10,
		borderWidth : 1,
		borderColor : "#666",
		width : 128,
		left : _args.left,
		height : 32,
		top : _args.top
	});

	popover.goLarge = function(e) {
		popoverV.animate({
			duration : 500,
			top : 0
		});
		popover.animate({
			duration : 500,
			height : 224,
			top : (_args.top - 96)
		});

	};

	popover.goSmall = function(e) {
		popoverV.animate({
			duration : 500,
			top : -111
		});
	};

	/*".period": {
	"text": "Rebalance",
	"color": "white",
	"style": "Titanium.UI.iPhone.SystemButtonStyle.PLAIN",
	"borderRadius": "10",
	"font": {fontFamily:'AvenirNextCondensed-Bold',fontSize:'14sp',fontWeight:'bold'},
	"backgroundGradient": {type:'linear',colors:['#000001','#666666'],startPoint:{x:0,y:0},endPoint:{x:2,y:50},backFillStart:false},
	"borderWidth": "1",
	"borderColor": "#666",
	"width": "64",
	"left": "304",
	"height": "32",
	"bottom": "8"
	},
	*/

	//popoverV.height = 224;
	//popoverV.top = -108;

	popover.add(popoverV);

	var color1 = mietf.vaultColorDictionary[mietf.source.vaultNum - 1].color;
	//was onColor
	var color2 = mietf.vaultColorDictionary[mietf.source.vaultNum - 1].color;

	popover.addEventListener('hide', function(e) {
		if (Ti.App.Properties.getInt(index, 0) != eRowIndex) {
			eRowIndex = Ti.App.Properties.getInt(index, 0);
			anythingwaschanged = true;
		}
		if (anythingwaschanged) {
			$[_args.parent.child].title = periodChoices[eRowIndex];
			//_args.parent.handleHidePopover({choice: periodChoices[eRowIndex]});
		}
		anythingwaschanged = false;
	});

	picker.addEventListener('change', function(e) {
		_args.reweigh[_args.parent.child].title = periodChoices[e.rowIndex];
		_args.reweigh[_args.parent.child].backgroundGradient = {
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
		Ti.App.Properties.setInt(index, e.rowIndex);

	});

	popover.setSelectedRow = function(a, b, c) {
		picker.setSelectedRow(a, b, c);
	};

	return popover;

};

module.exports = Popover;
