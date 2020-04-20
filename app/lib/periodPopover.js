
var periodChoices = [];
var anythingwaschanged = false;
var index;
function Popover(_args) {
	
	if (_args.type =='percent') {
		periodChoices = ['5%', '10%', '15%', '20%', '25%', '50%'];
		index = 'percIndex';
		var eRowIndex = Ti.App.Properties.getInt(index, 0);
	} else {
		periodChoices = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually'];
		index = 'periodIndex';
		var eRowIndex = Ti.App.Properties.getInt(index, 2);
	}

	
	var popoverV = Ti.UI.createView({
	  	width: 250,
	  	height: 224,
	  	backgroundColor: '#4C4C4E'
	  });
	  
	  var pickerV = Ti.UI.createView({
	  	top: 24,
	  	width: 250,
	  	height: 200
	  });
	  
	var picker = Ti.UI.createPicker({
		height: 200,
		width: 250
	});
	
	picker.setLocale ('fr'); 
	
	var column = Ti.UI.createPickerColumn();
		 
	for(var i=0; i< periodChoices.length; i++){
		  var row = Ti.UI.createPickerRow({id: i});
		  var label = Ti.UI.createLabel({text: periodChoices[i], textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, font: { fontFamily:'AvenirNextCondensed-Bold',fontSize:'14sp',fontWeight:'bold'},width: 200, height: 44, color: 'white'}); //5, -94
		   row.add(label);
		  column.addRow(row);
		}
		
	picker.add(column);
	picker.selectionIndicator = true;

	pickerV.add(picker);
	
	var titleLbl = Ti.UI.createLabel({
			  color: 'white',
			   font:{fontFamily: 'AvenirNextCondensed-Bold', fontSize: 18 +'sp', fontWeight: 'bold'},
			  text: 'Period',
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			  touchEnabled: false,
			  top: 8,
			  zIndex: 10
			});
			
	popoverV.add(titleLbl);
			
	popoverV.add(pickerV);
	
		var closeX = Ti.UI.createImageView({
			image: 'images/ifapps/circleX.pn8',
			top: 8, right: 8
		});
		
		popoverV.add(closeX);
		
		closeX.addEventListener('click', function(e) {
			popover.hide();
		});
	  
	var popover = Ti.UI.iPad.createPopover({
		    width: 250,
		    height: 224,
		    contentView: popoverV
	});
	
	popover.addEventListener('hide', function(e) {
			if (Ti.App.Properties.getInt(index, 0) != eRowIndex) {
			eRowIndex = Ti.App.Properties.getInt(index, 0) ;
			anythingwaschanged = true;	
			}
			if (anythingwaschanged) {
				_args.parent.title= periodChoices[eRowIndex];
				//_args.parent.handleHidePopover({choice: periodChoices[eRowIndex]});
			}
			anythingwaschanged = false;
		});
		
		
		picker.addEventListener('change',function(e){
			_args.parent.title= periodChoices[e.rowIndex];
            Ti.App.Properties.setInt(index, e.rowIndex);

		});

popover.setSelectedRow = function (a, b, c) {	
	picker.setSelectedRow(a, b, c);
};
	
	return popover;
	
};

module.exports = Popover;
