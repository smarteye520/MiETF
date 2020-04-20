var args = $.args;
var date = args.date;

init();

/*** INIT ***/
function init() {
	updateValues();
}

function updateValues() {
	$.dateLbl.text = date;
}
