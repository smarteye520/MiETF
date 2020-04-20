function chartDottedLine(_args) {

	
	var self = Ti.UI.createView({
		height: 416,
		width: 2,
		bottom : _args.bottom,
		left: _args.left,
		backgroundColor: 'transparent',
		zIndex: 0,
		opacity: .3
	});
	
  var Line = Ti.UI.createView({
		height: 416-24,
		width: 2,
		bottom : 24
	});
	
	
	var dottedLine = Ti.UI.createView({
		width:2, 
		top:0, 
		bottom:0, 
		backgroundImage:'/images/ifapps/dot.png', 
		backgroundRepeat:true});
	
	Line.add(dottedLine);
	
	self.add(Line);
	
	return self;
};

module.exports = chartDottedLine;