function chartPopover(_args) {

	var anythingwasclicked = false;
	var popoverContent = Ti.UI.createView({});

	var tableData = getAddButtonTableDataById(_args.ETFVersionId);

	var tableView = Ti.UI.createTableView({
		backgroundColor : 'white',
		data : tableData
	});

	tableView.addEventListener('click', function(e) {
		anythingwasclicked = true;
		if (e.rowData.action) {
			if (e.rowData.onSwitch) {
				e.rowData.onSwitch = false;
				e.rowData.rightImage = '';
			} else {
				if (e.rowData.other) {
					//turn off all others except this one
					for ( i = 0; i < tableView.data[2].rows.length; i++) {
						tableView.data[2].rows[i].onSwitch = false;
						tableView.data[2].rows[i].rightImage = '';
					}

				}
				e.rowData.onSwitch = true;
				var rightImage = 'images/ifapps/checkmark.pn8';
				if (e.rowData.other)
					rightImage = 'images/ifapps/circleStar.pn8';
				e.rowData.rightImage = rightImage;

			}
		}
	});

	popoverContent.add(tableView);

	var self = Ti.UI.iPad.createPopover({
		width : 250,
		height : 300,
		contentView : popoverContent,
		arrowDirection : Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP
	});

	self.addEventListener('hide', function(e) {

		//update
		//Section 1 - Market Indexes
		//tableView.data[1].rows
		if (anythingwasclicked) {

			updateJctMarketIndexETF(_args.ETFVersionId, tableView.data[1].rows);

			//update
			//Section 2 - MiETFs
			//tableView.data[2].rows

			updateJctMiETFETF(_args.ETFVersionId, tableView.data[2].rows);

			var mietfId = getETFFromVersion(_args.ETFVersionId);
			_args.chartLegend.setFullSize({
				mietfID : mietfId,
				ETFVersionId : _args.ETFVersionId
			});
			_args.parent.updateCanvasFullWithData();
		}
		anythingwasclicked = false;
		//tableData = getAddButtonTableDataById(_args.mietfID);
		//tableView.setData(tableData); //something seems to get corrupt

	});

	return self;
};

module.exports = chartPopover;

var i = [{
	"TICKER" : "MRK",
	"PERCENTNUM" : 20,
	"CLOSE" : 6302,
	"ISMIETF" : 0,
	"FACETQTY" : 0.317359568390987,
	"ETFVERSIONID" : 0
}, {
	"graphData" : [["2016-09-23", 3397], ["2016-09-26", 3355], ["2016-09-27", 3361], ["2016-09-28", 3382], ["2016-09-29", 3305], ["2016-09-30", 3286], ["2016-10-03", 3300], ["2016-10-04", 3257], ["2016-10-05", 3260], ["2016-10-06", 3226], ["2016-10-07", 3229], ["2016-10-10", 3206], ["2016-10-11", 3112], ["2016-10-12", 3080], ["2016-10-13", 3084], ["2016-10-14", 3059], ["2016-10-17", 3073], ["2016-10-18", 3127], ["2016-10-19", 3078], ["2016-10-20", 3100], ["2016-10-21", 3072], ["2016-10-24", 3008], ["2016-10-25", 2979], ["2016-10-26", 2959], ["2016-10-27", 2854], ["2016-10-28", 2860], ["2016-10-31", 2832], ["2016-11-01", 2799], ["2016-11-02", 2821], ["2016-11-03", 2774], ["2016-11-04", 2766], ["2016-11-07", 2789], ["2016-11-08", 2799], ["2016-11-09", 2895], ["2016-11-10", 2768], ["2016-11-11", 2798], ["2016-11-14", 2765], ["2016-11-15", 2763], ["2016-11-16", 2740], ["2016-11-17", 2735], ["2016-11-18", 2712], ["2016-11-21", 2734], ["2016-11-22", 2643], ["2016-11-23", 2637], ["2016-11-25", 2710], ["2016-11-28", 2673], ["2016-11-29", 2671], ["2016-11-30", 2614], ["2016-12-01", 2581], ["2016-12-02", 2589], ["2016-12-05", 2582], ["2016-12-06", 2601], ["2016-12-07", 2585], ["2016-12-08", 2627], ["2016-12-09", 2716], ["2016-12-12", 2694], ["2016-12-13", 2770], ["2016-12-14", 2729], ["2016-12-15", 2770], ["2016-12-16", 2786], ["2016-12-19", 2695], ["2016-12-20", 2702], ["2016-12-21", 2706], ["2016-12-22", 2718], ["2016-12-23", 2731], ["2016-12-27", 2726], ["2016-12-28", 2721], ["2016-12-29", 2736], ["2016-12-30", 2732], ["2017-01-03", 2771], ["2017-01-04", 2793], ["2017-01-05", 2869], ["2017-01-06", 2843], ["2017-01-09", 2853], ["2017-01-10", 2875], ["2017-01-11", 2818], ["2017-01-12", 2824], ["2017-01-13", 2858], ["2017-01-17", 2847], ["2017-01-18", 2850], ["2017-01-19", 2791], ["2017-01-20", 2707], ["2017-01-23", 2710], ["2017-01-24", 2699], ["2017-01-25", 2729], ["2017-01-26", 2672], ["2017-01-27", 2705], ["2017-01-30", 2709], ["2017-01-31", 2723], ["2017-02-01", 2776], ["2017-02-02", 2756], ["2017-02-03", 2792], ["2017-02-06", 2809], ["2017-02-07", 2826], ["2017-02-08", 2862], ["2017-02-09", 2930], ["2017-02-10", 2953], ["2017-02-13", 2964], ["2017-02-14", 2959], ["2017-02-15", 2884], ["2017-02-16", 2876], ["2017-02-17", 2916], ["2017-02-21", 2901], ["2017-02-22", 2892], ["2017-02-23", 2951], ["2017-02-24", 2935], ["2017-02-27", 2937], ["2017-02-28", 2926], ["2017-03-01", 2932], ["2017-03-02", 2960], ["2017-03-03", 2992], ["2017-03-06", 2962], ["2017-03-07", 2950], ["2017-03-08", 2941], ["2017-03-09", 2956], ["2017-03-10", 2955], ["2017-03-13", 3007], ["2017-03-14", 3030], ["2017-03-15", 3021], ["2017-03-16", 3052], ["2017-03-17", 3069], ["2017-03-20", 3070], ["2017-03-21", 3037]],
	"TICKER" : "AZN",
	"PERCENTNUM" : 30,
	"CLOSE" : 3428,
	"ISMIETF" : 0,
	"FACETQTY" : 0.8751458576429405,
	"ETFVERSIONID" : 0
}, {
	"graphData" : [["2016-09-23", 11881], ["2016-09-26", 11778], ["2016-09-27", 11922], ["2016-09-28", 11939], ["2016-09-29", 11727], ["2016-09-30", 11813], ["2016-10-03", 11881], ["2016-10-04", 11882], ["2016-10-05", 11918], ["2016-10-06", 11875], ["2016-10-07", 11924], ["2016-10-10", 11980], ["2016-10-11", 11764], ["2016-10-12", 11797], ["2016-10-13", 11826], ["2016-10-14", 11756], ["2016-10-17", 11849], ["2016-10-18", 11541], ["2016-10-19", 11459], ["2016-10-20", 11487], ["2016-10-21", 11344], ["2016-10-24", 11361], ["2016-10-25", 11396], ["2016-10-26", 11456], ["2016-10-27", 11570], ["2016-10-28", 11533], ["2016-10-31", 11599], ["2016-11-01", 11534], ["2016-11-02", 11486], ["2016-11-03", 11503], ["2016-11-04", 11511], ["2016-11-07", 11666], ["2016-11-08", 11705], ["2016-11-09", 12031], ["2016-11-10", 11954], ["2016-11-11", 11847], ["2016-11-14", 11660], ["2016-11-15", 11632], ["2016-11-16", 11636], ["2016-11-17", 11657], ["2016-11-18", 11536], ["2016-11-21", 11500], ["2016-11-22", 11274], ["2016-11-23", 11307], ["2016-11-25", 11413], ["2016-11-28", 11313], ["2016-11-29", 11248], ["2016-11-30", 11130], ["2016-12-01", 11138], ["2016-12-02", 11196], ["2016-12-05", 11194], ["2016-12-06", 11206], ["2016-12-07", 11110], ["2016-12-08", 11099], ["2016-12-09", 11226], ["2016-12-12", 11536], ["2016-12-13", 11589], ["2016-12-14", 11499], ["2016-12-15", 11589], ["2016-12-16", 11588], ["2016-12-19", 11602], ["2016-12-20", 11566], ["2016-12-21", 11531], ["2016-12-22", 11544], ["2016-12-23", 11596], ["2016-12-27", 11591], ["2016-12-28", 11510], ["2016-12-29", 11549], ["2016-12-30", 11521], ["2017-01-03", 11584], ["2017-01-04", 11565], ["2017-01-05", 11686], ["2017-01-06", 11630], ["2017-01-09", 11628], ["2017-01-10", 11616], ["2017-01-11", 11473], ["2017-01-12", 11462], ["2017-01-13", 11460], ["2017-01-17", 11487], ["2017-01-18", 11470], ["2017-01-19", 11420], ["2017-01-20", 11415], ["2017-01-23", 11391], ["2017-01-24", 11176], ["2017-01-25", 11280], ["2017-01-26", 11184], ["2017-01-27", 11338], ["2017-01-30", 11313], ["2017-01-31", 11325], ["2017-02-01", 11323], ["2017-02-02", 11357], ["2017-02-03", 11364], ["2017-02-06", 11340], ["2017-02-07", 11348], ["2017-02-08", 11340], ["2017-02-09", 11408], ["2017-02-10", 11524], ["2017-02-13", 11588], ["2017-02-14", 11636], ["2017-02-15", 11720], ["2017-02-16", 11808], ["2017-02-17", 11886], ["2017-02-21", 11966], ["2017-02-22", 11952], ["2017-02-23", 12170], ["2017-02-24", 12273], ["2017-02-27", 12240], ["2017-02-28", 12221], ["2017-03-01", 12386], ["2017-03-02", 12363], ["2017-03-03", 12379], ["2017-03-06", 12371], ["2017-03-07", 12383], ["2017-03-08", 12410], ["2017-03-09", 12595], ["2017-03-10", 12621], ["2017-03-13", 12668], ["2017-03-14", 12705], ["2017-03-15", 12896], ["2017-03-16", 12846], ["2017-03-17", 12806], ["2017-03-20", 12807], ["2017-03-21", 12725]],
	"TICKER" : "JNJ",
	"PERCENTNUM" : 15,
	"CLOSE" : 11946,
	"ISMIETF" : 0,
	"FACETQTY" : 0.12556504269211452,
	"ETFVERSIONID" : 0
}, {
	"TICKER" : "GE",
	"PERCENTNUM" : 10,
	"CLOSE" : 3004,
	"ISMIETF" : 0,
	"FACETQTY" : 0.33288948069241014,
	"ETFVERSIONID" : 0
}, {
	"graphData" : [["2016-09-23", 100], ["2016-09-26", 100], ["2016-09-27", 100], ["2016-09-28", 100], ["2016-09-29", 100], ["2016-09-30", 100], ["2016-10-03", 100], ["2016-10-04", 100], ["2016-10-05", 100], ["2016-10-06", 100], ["2016-10-07", 100], ["2016-10-10", 100], ["2016-10-11", 100], ["2016-10-12", 100], ["2016-10-13", 100], ["2016-10-14", 100], ["2016-10-17", 100], ["2016-10-18", 100], ["2016-10-19", 100], ["2016-10-20", 100], ["2016-10-21", 100], ["2016-10-24", 100], ["2016-10-25", 100], ["2016-10-26", 100], ["2016-10-27", 100], ["2016-10-28", 100], ["2016-10-31", 100], ["2016-11-01", 100], ["2016-11-02", 100], ["2016-11-03", 100], ["2016-11-04", 100], ["2016-11-07", 100], ["2016-11-08", 100], ["2016-11-09", 100], ["2016-11-10", 100], ["2016-11-11", 100], ["2016-11-14", 100], ["2016-11-15", 100], ["2016-11-16", 100], ["2016-11-17", 100], ["2016-11-18", 100], ["2016-11-21", 100], ["2016-11-22", 100], ["2016-11-23", 100], ["2016-11-25", 100], ["2016-11-28", 100], ["2016-11-29", 100], ["2016-11-30", 100], ["2016-12-01", 100], ["2016-12-02", 100], ["2016-12-05", 100], ["2016-12-06", 100], ["2016-12-07", 100], ["2016-12-08", 100], ["2016-12-09", 100], ["2016-12-12", 100], ["2016-12-13", 100], ["2016-12-14", 100], ["2016-12-15", 100], ["2016-12-16", 100], ["2016-12-19", 100], ["2016-12-20", 100], ["2016-12-21", 100], ["2016-12-22", 100], ["2016-12-23", 100], ["2016-12-27", 100], ["2016-12-28", 100], ["2016-12-29", 100], ["2016-12-30", 100], ["2017-01-03", 100], ["2017-01-04", 100], ["2017-01-05", 100], ["2017-01-06", 100], ["2017-01-09", 100], ["2017-01-10", 100], ["2017-01-11", 100], ["2017-01-12", 100], ["2017-01-13", 100], ["2017-01-17", 100], ["2017-01-18", 100], ["2017-01-19", 100], ["2017-01-20", 100], ["2017-01-23", 100], ["2017-01-24", 100], ["2017-01-25", 100], ["2017-01-26", 100], ["2017-01-27", 100], ["2017-01-30", 100], ["2017-01-31", 100], ["2017-02-01", 100], ["2017-02-02", 100], ["2017-02-03", 100], ["2017-02-06", 100], ["2017-02-07", 100], ["2017-02-08", 100], ["2017-02-09", 100], ["2017-02-10", 100], ["2017-02-13", 100], ["2017-02-14", 100], ["2017-02-15", 100], ["2017-02-16", 100], ["2017-02-17", 100], ["2017-02-21", 100], ["2017-02-22", 100], ["2017-02-23", 100], ["2017-02-24", 100], ["2017-02-27", 100], ["2017-02-28", 100], ["2017-03-01", 100], ["2017-03-02", 100], ["2017-03-03", 100], ["2017-03-06", 100], ["2017-03-07", 100], ["2017-03-08", 100], ["2017-03-09", 100], ["2017-03-10", 100], ["2017-03-13", 100], ["2017-03-14", 100], ["2017-03-15", 100], ["2017-03-16", 100], ["2017-03-17", 100], ["2017-03-20", 100], ["2017-03-21", 100]],
	"TICKER" : "Cash",
	"PERCENTNUM" : 25,
	"CLOSE" : 100,
	"ISMIETF" : 0,
	"FACETQTY" : 25,
	"ETFVERSIONID" : 0
}]; 