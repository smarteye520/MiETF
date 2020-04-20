var args = $.args;
var rs = args.rs;
var e = args.e;
var pos = args.pos;

var startValue = 1;

init();

/*** Functions ***/
function init() {
	updateValues();	
}

function updateValues() {
	$.stockPercent.text =  rs.PercentNum.toFixed(0) + '%';
	if(pos > 0) {
		startValue = getStockPriceByDate(rs.facetTickerSymbol, e.firstRowDate);
		if ( typeof startValue == 'undefined') {
			startValue = 1;
		}
		$.stockValue.text = '$' + startValue.toFixed(2);
	} else {
		$.lblInfoPercent.visible = true;
		$.lblInfoValue.visible = true;
	}
		
}