function coinOverlay(_args) {

	var self = Ti.UI.createView({
		width : 96,
		height :_args.size,
		left: _args.left,
		bottom: _args.bottom,
		index: _args.index,
		colIndex: _args.colIndex,
		PercentNum: _args.PercentNum
	});
	
	
	return self;
};

module.exports = coinOverlay;
