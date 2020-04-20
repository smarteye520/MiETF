// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function close(e) {
	$.win.close();
};

$.text.text = args.text;
if(args.widthText) {
	$.text.width = args.widthText;
}

if(args.topText) {
	$.text.top = args.topText;	
}