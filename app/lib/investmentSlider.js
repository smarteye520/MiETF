var periodChoices = [];
var anythingwaschanged = false;
var index;
function Popover(_args) {

	var titleLbltext = 'Invested';

	if (_args.typeCode == 'price') {
		titleLbltext = 'Price Move';
		periodChoices = ['5%', '10%', '15%', '20%', '25%', '50%'];
		for ( i = 1; i <= 100; i++) {
			periodChoices.push(i + '%');
		}
		index = 'percIndex';
		var eRowIndex = _args.index;
	} else {
		periodChoices = [];
		for (var i = 0; i < mietf.chartChoices.length; i++) {
			periodChoices.push('Invested ' + mietf.chartChoices[i]);
		}

		index = 'periodIndex';
		var eRowIndex = _args.index;
		//Ti.App.Properties.getInt(index, 2);
	}
	
	var popoverV = Ti.UI.createView({
		top : -108,
		width : 128,
		height : 254,
		backgroundColor : '#4C4C4E'
	});

	var pickerV = Ti.UI.createView({
		top : 24,
		width : 128,
		height : 200,
		touchEnabled:true,
		backgroundColor : '#4C4C4E'
	});
   
	var picker = Ti.UI.createPicker({
		backgroundColor : '#4C4C4E',
		height : 200,
		width : 160//normally 128
	});


	function fireCloseSlider(e) {
		Ti.API.info('fireCloseSlider');
		Ti.App.fireEvent('closeSlider', {});
	};

	picker.addEventListener('closeSlider', fireCloseSlider);
	
	picker.setLocale('fr');

	var column = Ti.UI.createPickerColumn({
		zIndex : 10,
		backgroundColor : 'black'
	});

	for (var i = 0; i < mietf.chartChoices.length; i++) {
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
				fontSize : '12sp'
			},
			width : 200,
			height : 44,
			touchEnabled : true,
			zIndex:12,
			color : 'white'
		});

		row.add(label);

		column.addRow(row);
	}

	var addCustomLabel = Ti.UI.createLabel({
	  backgroundColor : '#4C4C4E',
		text : 'Add Custom',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '12sp'
		},
		width : 200,
		height : 44,
		touchEnabled : true,
		color : 'white'
	});

	addCustomLabel.addEventListener('click', function() {
		//addCustomRow();
	});
	
	var addCustomRow = Ti.UI.createPickerRow({
		id : mietf.chartChoices.length,
		backgroundColor : '#4C4C4E'
	});
	
	addCustomRow.add(addCustomLabel);
	
	column.addRow(addCustomRow);
	
	picker.add(column);
	picker.selectionIndicator = true;

	pickerV.add(picker);

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
		top : 4,
		height:Ti.UI.SIZE,
		width : Ti.UI.SIZE,
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
		//Ti.App.fireEvent('closeSlider', {});
	});


	var popover = Ti.UI.createView({
		//  width: 128,
		//  height: 224 //,
		//contentView: popoverV
		"borderRadius" : "10",
		"borderWidth" : "1",
		"borderColor" : "#222",
		"width" : "128",
		"left" : 0,
		"height" : "24",
		bottom : 0,
		popover : true
		//"top": _args.top
	});

	popover.goLarge = function(e) {
	
		//mietf.chartChoices[mietf.chartDatePeriodIndex]
		//if ($.col4btn1.title == 'Monthly') popover.setSelectedRow(0, 2, false);

		picker.setSelectedRow(0, mietf.chartDatePeriodIndex, false);

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
		if(picker.getSelectedRow(0).id > mietf.chartChoices.length - 1){
			addCustomValue();
		}else{
			mietf.chartDatePeriodIndex = picker.getSelectedRow(0).id;
		}
		popoverV.animate({
			duration : 500,
			top : -108
		});

		picker.removeEventListener('closeSlider', fireCloseSlider);
	};

 
	popover.add(popoverV);
	
	
	var selectView = Ti.UI.createView({height:20, width:'100%'});
  selectView.addEventListener('click', fireCloseSlider);
  pickerV.add(selectView);

	var color1 = mietf.vaultColorDictionary[mietf.source.vaultNum - 1].color;
	//was onColor
	var color2 = mietf.vaultColorDictionary[mietf.source.vaultNum - 1].color;

	popover.addEventListener('hide', function(e) {
		if (Ti.App.Properties.getInt(index, 0) != eRowIndex) {
			eRowIndex = Ti.App.Properties.getInt(index, 0);
			anythingwaschanged = true;
		}
		if (anythingwaschanged) {
			//$[_args.parent.child].title= periodChoices[eRowIndex];

		}
		anythingwaschanged = false;
	});

	popover.setSelectedRow = function(a, b, c) {
		picker.setSelectedRow(a, b, c);
	};
    var cutomWindowAdded = false;
	var addCustomValue = function() {
		if(cutomWindowAdded){
			return;
		}
		cutomWindowAdded = true;
		Ti.API.info('addCustomValue');
		var customWindow = Ti.UI.createWindow({
			width : '100%',
			height : '100%',
			backgroundColor : 'transparent'
		});
		var customScrollView = Ti.UI.createScrollView({
			width : '100%',
			height : '100%'
		});
		var customView = Ti.UI.createView({
			width : '25%',
			height : '20%',
			backgroundColor : "#4C4C4E",
			borderColor : '#a4a2a7',
			borderRadius : 10,
			center:{x:'61%',y:'38%'}
		});
		
		
		customView.add(Ti.UI.createLabel({
			left : 5,
			right : 5,
			textAlign:'center',
			color:'white',
			top : 15,
			text : 'Custom Investment Period',
			height : Ti.UI.SIZE,
			font : {
			 fontFamily : imgs.txtLblsFontFamily,
			 fontSize : '18sp',
			 fontWeight : 'bold'
			}
		}));
		var customText =  Titanium.UI.createTextField({
			count :1,
			color : 'white',
			hintTextColor :'#aaaaaa',
			font : {
				fontFamily : 'AvenirNextCondensed-Regular',
				fontSize : '18sp',
				fontWeight : 'Bold'
			},
			height : 40,
			top : 50, 
			right : 15,
			left : 15, 
			paddingLeft : 15,
			paddingRight : 15,
			borderRadius : 10,
			borderWidth : 2,
			borderColor : '#a4a2a7',
			hintText : 'Years (e.g 3, 4, 6...)',
			keyboardType: Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			returnKeyType : Titanium.UI.RETURNKEY_DONE
		});
		
		function addValueInObject(object, value) {
			var tmp = Titanium.App.Properties.getList(object);
			if(tmp.indexOf(value) < 0) {
				//add an element at a specific position
				Ti.API.info("position:" + getPosition(tmp, value) );
				tmp.splice(getPosition(tmp, value), 0, value);
				Titanium.App.Properties.setList(object, tmp);
			}
		}
		
		function getPosition(list, value) {
			var i = 1;
			var pos = 1;
			//first to not take in consideration because it's month 
			Ti.API.info(  Number(getNumberFromString(value)) );
			while( i< list.length ) {
				if( Number(getNumberFromString(value)) > Number(getNumberFromString(list[i])) ) { 
					pos = i; 
				}
				i++;
			} 
			return pos + 1;
		}
		
		//e.g "21 years ago" or "21year"
		function getNumberFromString(value) {
			var index = 1;
			if(  value.indexOf(" ") < 0  ) {
				var firstChar = value.match('[a-zA-Z]');
				index = value.indexOf(firstChar) || 1;
			} else {
				index = value.indexOf(" ");
			}
			return value.substring(0, index);
		}
		
		customText.addEventListener('blur', function blurCustomText(e) {
			customText.removeEventListener('blur', blurCustomText);
			customWindow.close();
			
			if(Number(customText.value > 20)) {
				return;
			}
			
			if(!isNaN(parseFloat(customText.value)) && isFinite(customText.value)) {
				var newValue = customText.value + ' years ago';
				addValueInObject("chartChoices", customText.value + ' years ago' );
				addValueInObject("chartPeriods", (customText.value + ' year') );
				addValueInObject("chartKeys", (customText.value + 'year') );
				
				mietf.chartPeriods = Titanium.App.Properties.getList("chartPeriods");
				mietf.chartKeys = Titanium.App.Properties.getList("chartKeys");
				
				mietf.chartDatePeriod = customText.value + 'year';
			
				var index = Titanium.App.Properties.getList("chartChoices").length - 1;
				if (Titanium.App.Properties.getList("chartChoices").indexOf(newValue) > 0) {
					index = Titanium.App.Properties.getList("chartChoices").indexOf(newValue);
				}
				
				mietf.chartDatePeriodIndex = index;
				
				Ti.App.Properties.setInt('chartDatePeriodIndex', mietf.chartDatePeriodIndex);
				Ti.App.Properties.setString('chartDatePeriod', mietf.chartDatePeriod);
				
				_args.parent.updateParent();
			}
			cutomWindowAdded = false;
		});
		customView.add(customText);
		
		var okButton = Titanium.UI.createButton({
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			font : {
				fontFamily : 'AvenirNextCondensed-Bold',
				fontSize : 14 + 'sp',
				fontWeight : 'bold'
			},
			title : 'Ok',
			color : 'white',
			width : 100,
			bottom : 10,
			height : 32,
			borderColor : '#999999',
			borderRadius : 10,
			borderWidth : 2,
			backgroundGradient : {
				type : 'linear',
				colors : ['#999999', '#A2A0A5'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 2,
					y : 40
				},
				backFillStart : false
			}
		});

		okButton.addEventListener('click', function okButtonClick (e) {
			customText.blur();
			okButton.removeEventListener('click', okButtonClick);
		});
		customView.add(okButton);
		
		customScrollView.add(customView);
		customWindow.add(customScrollView);
		customWindow.addEventListener('open', function() {
			_.delay(function(){customText.focus();}, 100);
		});
		customWindow.open();
	};

	return popover;

};

module.exports = Popover;
