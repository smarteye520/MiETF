function smallChartZeroLine(_args) {

	
	var self = Ti.UI.createView({
		height: 48,
		width: 352,
		top : _args.bottom-16,
		left: 0,
		backgroundColor: 'transparent',
		zIndex: 0
	});
	

	
	var whiteLine = Ti.UI.createView({
		left: 0,
		backgroundColor: 'white',
		height: 2,
		width: 352,
		top: 16
	});
	
	self.add(whiteLine);
	
	
	var periodText = mietf.chartPeriods[mietf.chartDatePeriodIndex];
	//Ti.App.Properties.getInt('chartDatePeriodIndex')
	

	
	var periodLabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '14sp',
			fontWeight : 'bold'
		},
		text : periodText,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled : false,
		top: 18,
		right: 0,
		width: Ti.UI.SIZE,
		height: 24,
		backgroundColor: 'transparent',
		borderRadius: 8
	});
	
	self.add(periodLabel);
	
	self.move = function(bottom) {
		self.top = bottom-18;
		periodLabel.text = mietf.chartPeriods[mietf.chartDatePeriodIndex];
	//Ti.App.Properties.getInt('chartDatePeriodIndex')
	};

	

	

	return self;
};

module.exports = smallChartZeroLine;