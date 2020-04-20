// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
/*
http://snipplr.com/view/73543/
**/

init(args);


function init(options) {
	var opts = options;
	if (opts.percent == null || opts.percent > 1 || opts.percent < 0) opts.percent = 1;
	if (opts.size == null) opts.size = 46;
	if (opts.margin == null) opts.margin = 0;
	if (opts.backgroundColor == null) opts.backgroundColor = '#fff';
	if (opts.progressColor == null) opts.progressColor = '#4ba818';
	if (opts.topper == null) opts.topper = {};
	if (opts.topper.color == null) opts.topper.color = '#fff';
	if (opts.topper.size == null) opts.topper.size = 36;
	if (opts.font == null) opts.font = {};
	if (opts.font.visible == null) opts.font.visible = true;
	if (opts.font.size == null) opts.font.size = 12;
	if (opts.font.color == null) opts.font.color = '#900';
	if (opts.font.shadowColor == null) opts.font.shadowColor = '#aaa';
	if (opts.font.shadowRadius == null) opts.font.shadowRadius = 1;
	if (opts.font.shadowOffset == null) opts.font.shadowOffset = {};
	if (opts.font.shadowOffset.x == null) opts.font.shadowOffset.x = 0;
	if (opts.font.shadowOffset.y == null) opts.font.shadowOffset.y = 1;
	
	var mainHolder = Ti.UI.createView({
		left: options.left,
		right: options.right,
		top: options.top,
		bottom: options.bottom,
		width: opts.size + opts.margin,
		height: opts.size + opts.margin,
		borderRadius: (opts.size + opts.margin) / 2,
		backgroundColor: "transparent"
		//backgroundColor: opts.backgroundColor
	});
	
	var holder = Ti.UI.createView({
		width: opts.size,
		height: opts.size,
		borderRadius: opts.size / 2
	});
	
	var layer1 = Ti.UI.createView({
	    width: opts.size,
	    height: opts.size,
	    borderRadius: opts.size / 2,
	    //borderColor: opts.progressColor,
	    
	    borderColor: "#00ffff",
	    borderWidth: '4'
	});
	
	var layer2 = Ti.UI.createView({
		left: 0,
		width: opts.size / 2,
		height: opts.size,
		anchorPoint: {
			x: 1,
			y: 0.5
		},
		borderColor: opts.progressColor,
		borderColor: "#ff0000",
		borderWidth: 4
	});
 
	var layer3 = Ti.UI.createView({
		right: 0,
		width: opts.size / 2,
		height: opts.size,
		anchorPoint: {
			x: 0,
			y: 0.5
		},
		
		borderColor: opts.progressColor,
		borderWidth: 4
	});
 
	var layer4 = Ti.UI.createView({
		right: 0,
		width: opts.size / 2,
		height: opts.size,
		anchorPoint: {
			x: 0,
			y: 0.5
		},
		//backgroundColor: opts.progressColor
		borderColor: opts.progressColor,
		borderColor: "#0000ff",
		borderWidth: 4
	});
	
	var topper = Ti.UI.createView({
		width: opts.topper.size,
		height: opts.topper.size,
		borderRadius: opts.topper.size / 2,
		//backgroundColor: opts.topper.color
	});
 
	var percentText = Ti.UI.createLabel({
		visible: opts.font.visible,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		color: opts.font.color,
		font: {
			fontSize:opts.font.size
		},
		shadowColor: opts.font.shadowColor,
		shadowRadius: opts.font.shadowRadius,
		shadowOffset: {
			x: opts.font.shadowOffset.x,
			y: opts.font.shadowOffset.y
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text: (opts.percent * 100) 
	});
 
	mainHolder.add(holder);
	topper.add(percentText);	
	holder.add(layer1);
	holder.add(layer2);
	holder.add(layer3);
	holder.add(layer4);
	holder.add(topper);
 
 	$.mainView.add(mainHolder);
 	
 	//var percent = opts.percent || 0.35;
 	var percent = 0.75
	var angle = 360 * percent;
	layer2.visible = (angle > 180) ? false : true;
	layer4.visible = (angle > 180) ? true : false;
	layer3.transform = Ti.UI.create2DMatrix().rotate(angle);
	
	
	var mask = Ti.UI.createView({
	
	})
	
}







/*
function init(options) {
	var opts = options;
	if (opts.percent == null || opts.percent > 1 || opts.percent < 0) opts.percent = 1;
	if (opts.size == null) opts.size = 46;
	if (opts.margin == null) opts.margin = 4;
	if (opts.backgroundColor == null) opts.backgroundColor = '#fff';
	if (opts.progressColor == null) opts.progressColor = '#4ba818';
	if (opts.topper == null) opts.topper = {};
	if (opts.topper.color == null) opts.topper.color = '#fff';
	if (opts.topper.size == null) opts.topper.size = 36;
	if (opts.font == null) opts.font = {};
	if (opts.font.visible == null) opts.font.visible = true;
	if (opts.font.size == null) opts.font.size = 12;
	if (opts.font.color == null) opts.font.color = '#900';
	if (opts.font.shadowColor == null) opts.font.shadowColor = '#aaa';
	if (opts.font.shadowRadius == null) opts.font.shadowRadius = 1;
	if (opts.font.shadowOffset == null) opts.font.shadowOffset = {};
	if (opts.font.shadowOffset.x == null) opts.font.shadowOffset.x = 0;
	if (opts.font.shadowOffset.y == null) opts.font.shadowOffset.y = 1;
	
	
	$.layer2.backgroundColor = opts.backgroundColor;
	$.layer3.backgroundColor = opts.backgroundColor;
	$.layer4.backgroundColor = opts.backgroundColor;
	
	
	
	var percent = opts.percent;
	var angle = 360 * percent;
	$.layer2.visible = (angle > 180) ? false : true;
	$.layer4.visible = (angle > 180) ? true : false;
	$.layer3.transform = Ti.UI.create2DMatrix().rotate(angle);
}
*/
