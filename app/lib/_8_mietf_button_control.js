function mietfButtonControl(_args) {
	var self = Ti.UI.createView({
		top: 304+304-112, 
		left: 32, 
		width: 160, 
		height: 160, 
		//backgroundImage: 'images/latest/leftBtn.pn8',
		opacity: 0,
		title: 'MiETFs'
	});
	
	var glass = Ti.UI.createView({
		width: 160,
		height: 160,
		borderRadius: 25,
		backgroundColor: '#444548',
		opacity: .6,
		borderWidth: 2,
		borderColor: '#222222'
	});
	
	self.add(glass);
	
	var mietfLbl = Ti.UI.createLabel({
	  bottom: 9,
	  color: 'white',
	  font:{fontFamily: 'AvenirNextCondensed-Bold', fontSize: '21sp', fontWeight: 'bold'},
	  text: 'MiETFs',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
			
			
	self.add(mietfLbl);
	
	self.addEventListener('click', function(e) {
		Ti.App.fireEvent('MietfButtonClick', {});
	});
	
	return self;
};

module.exports = mietfButtonControl;