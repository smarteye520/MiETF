function pieChart(_args) {
	
	var self = Ti.UI.createView({
		width: 386, //384
		height: 386, //384
		top: 80, //80
		right: 64, //64
		ETFVersionId : _args.ETFVersionId
	});
	
	var pieHolderView = Ti.UI.createView({
		right: '.26%',
		top: '.26%',
		width: '99.48%',
		height:'99.48%'
	});
	
	self.add(pieHolderView);
	
	var MODULO = 20;
	
	 var wedges = ['wedge1.pn8',
			'wedge2.pn8',
			'wedge3.pn8',
			'wedge4.pn8',
			'wedge5.pn8',
			'wedge6.pn8',
			'wedge7.pn8',
			'wedge8.pn8',
			'wedge9.pn8',
			'wedge10.pn8',
			'wedge11.pn8',
			'wedge12.pn8',
			'wedge13.pn8',
			'wedge14.pn8',
			'wedge15.pn8',
			'wedge16.pn8',
			'wedge17.pn8',
			'wedge18.pn8',
			'wedge19.pn8',
			'wedge20.pn8'];
			
			
		var colors = mietf.colors;
			
			
	//var imageColors = [ 'yellow', 'blue', 'green', 'purple', 'orange'];
	var imageColors = [ '1', '2', '3', '4', '5','6', '7', '8', '9', '10', '11', '12', '13', '14', '15','16', '17', '18', '19', '20'];
	
		
var slices = [];
var lines = [];
var newLines = [];
var textLabels = [];
var outlines = [];

self.drawPie = function(divisor, data) {
	self.opacity=0;

	var outlineOpacity =1;
	if (self.ETFVersionId == 0) outlineOpacity=0;
	
	for (i=0; i< outlines.length; i++) {
		self.remove(outlines[i]);
	}
	for (i=0; i< slices.length; i++) {
		pieHolderView.remove(slices[i]);
	}
	
	for (i=0; i< lines.length; i++) {
		pieHolderView.remove(lines[i]);
		pieHolderView.remove(newLines[i]);
		pieHolderView.remove(textLabels[i]);
	}
	
	_args.parent.clearPieButtons();
	//_args.parent.addPieButton( divisor, {top: 168, right: 32}); //quick test
	
	slices = [];
	lines = [];
	newLines = [];
	lineR = [];
	lineL = [];
	lineC = [];
	textLabels = [];
	outlines = [];
	sliceNum = 0;
	var oldSliceNum = 0;
	
	
	for (i=0; i< data.length; i++) {

		for (j=0; j< data[i].PercentNum; j=j+5) {
			slices[sliceNum] = Titanium.UI.createImageView({
				image: 'images/ifapps/slice' + (sliceNum+1) + '-color' + imageColors[i % MODULO] + '.pn8'
			});
			
//find . -name '*.png' -exec sh -c 'mv "$0" "${0%.png}.pn8"' {} \;
			
			pieHolderView.add(slices[sliceNum]);
			
		sliceNum++;	
		}

		
		lines[i] = Ti.UI.createView({
				anchorPoint: {x:0.5, y:1},
				zIndex: 50+1,
				left: 190/divisor,
				width: 5/divisor,
				bottom: 192/divisor
			});
			
		newLines[i] = Ti.UI.createView({
				anchorPoint: {x:0.5, y:1},
				zIndex: 100,
				left: 190/divisor,
				width: 5/divisor,
				bottom: 192/divisor
			});
		
		var bottom = 6/divisor;
		
		if (j>9 && j< 20) bottom = 4/divisor;
		if (j>19) bottom = 0;
		
		lineL[i] = Ti.UI.createView({
			backgroundColor: colors[i % MODULO][1],
			left: 0,
			bottom: bottom,
			width: 2/divisor
		});
		
		lineC[i] = Ti.UI.createView({
			backgroundColor: 'black',
			left: 2/divisor,
			width: 1/divisor
		});
		
		lines[i].add(lineL[i]);
		newLines[i].add(lineC[i]);
		
		var rightColor = colors[(i+1) % MODULO][1];
		if (i==(data.length-1)) rightColor = colors[0][1];
		
		/*
		lineR[i] = Titanium.UI.createMaskedImage({
		    mask : 'images/ifapps/orangeLine.pn8', 
		    tint: rightColor,
		    mode : Titanium.UI.iOS.BLEND_MODE_HUE,
		    right: 0,
		    width: 2/divisor
		});
		*/
		
		lineR[i] = Ti.UI.createView({
			backgroundColor: rightColor,
			right: 0,
			width: 2/divisor,
			bottom: 0
		});
		
		lines[i].add(lineR[i]);
			
		lines[i].transform = Ti.UI.create2DMatrix().rotate(sliceNum*18);
		newLines[i].transform = Ti.UI.create2DMatrix().rotate(sliceNum*18);
		
		pieHolderView.add(lines[i]);
		pieHolderView.add(newLines[i]);
		
		//textLabel
		
		var fontSize = 16/divisor;
		
		//calc left and top 
		
		var x0= 192;
		var y0= 192;
		var distance = 120;
		var newAngle = 90-(sliceNum*18);
		if (newAngle < 0) newAngle = newAngle + 360;
		var addAngle = (sliceNum-oldSliceNum) * 9 ;
		var angle = newAngle + addAngle;
		if (angle > 360) angle = angle - 360;
	
		var radians = (angle * (Math.PI/180));
		var step2 = Math.cos(radians)*distance;
		var step3 = Math.sin(radians)*distance;
		
		var x1 = x0+ step2;
		var y1 = y0 - step3;
		
		//_args.parent.addPieButton( divisor, {top: 168, right: 32}); //quick test
		
		var x0= 512;
		var y0= 272;
		
		var distance = 220;
		var newAngle = 90-(sliceNum*18);
		if (newAngle < 0) newAngle = newAngle + 360;
		var addAngle = (sliceNum-oldSliceNum) * 9 ;
		var angle = newAngle + addAngle;
		if (angle > 360) angle = angle - 360;
	
		var radians = (angle * (Math.PI/180));
		var step2 = Math.cos(radians)*distance;
		var step3 = Math.sin(radians)*distance;
		
		var pieX = x0+ step2;
		var pieY = y0 - step3;
		
		_args.parent.addPieButton( divisor, {top: pieY-16, right: (768-pieX) -16});
		
		
		oldSliceNum =  sliceNum;
		
	textLabels[i] = Ti.UI.createLabel({
		left : (x1/divisor)-(8/divisor), //18
		top : (y1/divisor)-(12/divisor),
		width: Ti.UI.SIZE, //36/divisor,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		height: 28/divisor,
		text : data[i].PercentNum + '%',
		color : 'white',
		/*shadowColor : 'black',
		shadowOffset : {
			x : 1,
			y : 1
		},
		shadowRadius : 3,
		*/
		font : {
			fontFamily : 'AvenirNextCondensed-Regular',
			fontSize : fontSize + 'sp'
		}
	});
	
	pieHolderView.add(textLabels[i]);
		
		
	}
	
	outlines[0] = Ti.UI.createImageView({
		image: 'images/ifapps/outline.pn8',
		width: 386/divisor,
		height: 386/divisor,
		zIndex: 3,
		left: 0,
		top: 0,
		opacity: outlineOpacity
	});
	
	self.add(outlines[0]);
	
	if (data.length ==1) {
		lines[0].opacity = 0;
		newLines[0].opacity=0;
	}
animation.popIn(self);	
};

self.updateETFVersionId = function(ETFVersionId) {
	self.ETFVersionId = ETFVersionId;
};

self.snapshot = function() {
		var Blob = self.toImage(null, false);
		
		/*
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, mietf.ETFVersionId + 'snap.pn8');
		file.write(Blob);
		updateIconImg(mietf.ETFVersionId, mietf.ETFVersionId + 'snap.pn8');
		*/		
		return Blob;
	};
	
		
	self.addEventListener('click', function(e) {
  	if(mietf.viewMode==false) {
			Ti.App.fireEvent('startPercentAllocChooser', {ETFVersionId: self.ETFVersionId, addComponent: false});
		}
	});

	return self;
};

module.exports = pieChart;