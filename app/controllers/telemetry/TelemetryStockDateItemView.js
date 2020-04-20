var args = $.args;
var datesParam = args.dates;

init();


/*** Functions ***/
function init() {
	addDates();
}

function addDates() {
	for(var i=0; i < datesParam.length; i++) {
		var date = Alloy.createController('telemetry/StockDateLabelCell', {date: datesParam[i]});
		$.contDates.add( date.getView() );
		date.getView().left = 10;	
	}
}