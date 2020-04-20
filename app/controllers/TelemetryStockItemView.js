var args = $.args;

var colorCount = args.colorCount;
var topButton = args.top;
var rs = args.rs;
var pos = args.pos;
var e = args.e;


var PercentNum = $.PercentNum;
var startUnitPrice = $.startUnitPrice;
var ticker = $.ticker;

var cells = [];

var startValue = 1;

init();


/*** FUNCTIONS ***/
function init() {
	updateView();
	updateValues();
	addNewCell();
}

function updateView() {
	$.btnRight.backgroundGradient.colors = $.btn.backgroundGradient.colors = mietf.colors[colorCount];
	$.btnRight.borderColor = $.btn.borderColor = mietf.colors[colorCount][0];
}

function updateValues() {
	$.ticker.text = '' + (pos + 1) + '. ' + rs.facetTickerSymbol + ' (' + rs.facetName + ')';
}

function addNewCell() {
	Ti.API.info("rsss");
	Ti.API.info(rs);
	var stockCell = Alloy.createController('telemetry/TelemetryStockCellView', {rs: rs, e: e, pos: pos});
	cells.push(stockCell);
	$.contValues.add( stockCell.getView() );
	
	var stockCell1 = Alloy.createController('telemetry/TelemetryStockCellView', {rs: rs, e: e, pos: pos});
	cells.push(stockCell1);
	$.contValues.add( stockCell1.getView() );
	stockCell1.getView().left = 10;

}
