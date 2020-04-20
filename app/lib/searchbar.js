function searchArea(_args) {

	
	var self = Ti.UI.createView({
		height: 540, //491
		top: 50,
		left: 82,
		width: 493,
		backgroundColor: 'transparent',
		zIndex: 50
	});
	
	
	var search = Ti.UI.createSearchBar({
		showCancel: false,
		height: 50,
		top: 0,
		width: 290
	});
	
	//self.add(search);
	
	/*
			var searchInp = Titanium.UI.createTextField({
		color : 'black',
		font : {
			fontFamily : 'AvenirNextCondensed-Bold',
			fontSize : '20sp',
			fontWeight : 'Bold'
		},
		height : 50,
		top : 0,
		width: 290,
		hintText : 'Search',
		backgroundImage : 'images/ifapps/searchEntry.pn8',
		borderColor : 'transparent',
		paddingLeft : 80,
		paddingRight : 15,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		value : '',
		passwordMask : false
	});
	
	self.add(searchInp);
	*/
	
		var tv = Ti.UI.createView({
		height: 540, //491
		top: 66,
		width: 493,
		backgroundColor: 'white',
		borderRadius: 0,
		bordercolor: 'black',
		borderWidth: 1,
		zIndex: 50
	});
	
	self.add(tv);
	
		var RegData = [
 
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Accuvest Global Opportunities", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Accuvest Mars Hill Global Relative Value", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Active Bear", hasChild:true , height: 90},
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Athena High Dividendg", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Athena Intl Bear", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Cambria Global Tactical", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares EquityPro", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Gartman Gold/Britsh Pd", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Gartman Gold/Euro", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Gartman Gold/Yen", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Global Echo", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares International Gold", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Madrona Forward Domestic", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Madrona Forward Global Bond", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Madrona Forward International", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Meidell Tactical Advantage", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Newfleet Multi-Sector Income", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Peritus High Yield", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Pring Turner Business Cycle", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares QAM Equity Hedge", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Sage Core Reserves", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares Snrse Glbl Multi-Strat", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares STAR Global Buy-Write", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares TrimTabs Float Shrink", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares WCM/BNY Mellon Focused Growth ADR", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AdvisorShares YieldPro ETF", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"AlphaClone Alternative Alpha ", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"ALPS Alerian Energy Infrastructure", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"ALPS Alerian MLP", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"ALPS Emerging Sector Dividend Dogs", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"ALPS Equal Sector Weight", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"ALPS International Sector Div Dogs", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"ALPS RiverFront Strategic Income ", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"ALPS Sector Dividend Dogs", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"ALPS US Equity High Volatility Put Write", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"ALPS Workplace Equality", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Arrow Dow Jones Global Yield ", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays ASIAN/GULF CURRENCY", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays ETN+ DYN VEQTORTM", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays ETN+ FI Enhanced Europe 50 ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays ETN+ FI Enhanced Glb Hi Yld ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays ETN+ Select MLP ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays ETN+ Shiller CAPE ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays ETN+LONG B S&P 500", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays ETN+LONG C S&P 500", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays GEMS ASIA-8 ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays GEMS INDEX ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays Inverse US Treasury Aggt ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays OFI SteelPath MLP ETNs", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Barclays Women in Leadership ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"C-Tracks Bsd on Perf of M/H MLP Fdmt ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"C-Tracks Linked to the CVOLT Index ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Calamos Focus Growth", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Cambria Foreign Shareholder Yield", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Cambria Global Value", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Cambria Shareholder Yield", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Claymore CEF GS Connect", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Cohen & Steers Global Realty Majors", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Columbia American Beacon Large Cap Value", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Columbia Intermediate Municipal Bond Strategy", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Columbia McDonnell Core Taxable Bond", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Columbia RP Focused Large Cap Growth", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Columbia RP Growth", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Compass EMP US 500 Enh Vol Wtd", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Compass EMP US 500 Vol Wtd", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Compass EMP US Discv 500 Enh Vol Wtd", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Compass EMP US EQ Inc 100 EnhVol Wtd", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse 2x Levered Merger Arbitrage ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse Commodity Benchmark ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse Commodity Rotation ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse FI Enhanced Big Cap Gr ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse FI Enhanced Europe 50 ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse FI Large Cap Gr Enh ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse Gold Shrs Cov Call Exc ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse Long Short Equity ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse Market Neut Global Eq ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse Master Limited Partnerships ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse Merger Arbitrage ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"Credit Suisse Silver Shares Cov Call ETN", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers Harvest China", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers Hrvst CSI 500China A Sm Cp", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers Hvst MSCI All China Eq", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers MSCI AP ex Jap Hdgd Eq", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers MSCI AW exUS Hdgd Eq", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers MSCI Brazil Currency-Hedged Equity Fund", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers MSCI EAFE Currency-Hedged Equity Fund", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers MSCI Emerging Markets Currency-Hedged Equity Fund", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers MSCI Europe Hdgd Eq", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers MSCI Germany Hedged Eq", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers MSCI Japan Currency-Hedged Equity Fund ETF", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers MSCI Mexico Hedged Eq", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers MSCI South Kor Hdgd Eq", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers MSCI UK Hdgd Eq", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers Muni Infras Revn Bd", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers Regulated Utilities", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers Slctv Inv Grd Sbdt Dbt", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers TDX Independence 2010", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers TDX Independence 2020", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers TDX Independence 2030", hasChild:true, height: 90 },
{ leftImage:'images/ifapps/testIco.pn8', title:"db X-trackers TDX Independence 2040", hasChild:true, height: 90 }
];
 
var TheTable = Titanium.UI.createTableView({
data:RegData,
filterAttribute: 'title',
search:search
});

tv.add(TheTable);

TheTable.addEventListener('click', function(e) {
	//abclert('No no no no.');
});
	

	return self;
};

module.exports = searchArea;