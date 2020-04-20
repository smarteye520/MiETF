var args = $.args;
var stocks = require("services/stocks");
var dispatcher = require('dispatcher');

var typeMessages = {
	WORKING: {value: 0, name: "working"},
	STOPPED: {value: 1, name:"stopped"},
	COMPLETE: {value: 2, name: ""}
};

var typeMessage = typeMessages.WORKING.name;
var backgroundColor = "#2d9bd9";

var colorWorking = "#2d9bd9";
var colorDataCompleted = "#6fbd44";

// constructor
init();

/*** Events ***/
dispatcher.on('downloadNextSymbol', handlerDownloadNextSymbol);
//dispatcher.on('changeColor', handlerChangeColor);
$.contCircle.addEventListener('click', handlerClickCircle);
Titanium.Network.addEventListener('change', handlerChangeNetwork);
Ti.App.addEventListener('resumed', handlerResumedApp);

/*
 * Functions
 */
function init() {
	$.lblInfo.width = 0;
	downloadFacetData();
	displayData();
	
	if(isDownloadDataCompleted()) {
		changeDataToCompleted();
	} else {
		(Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) ? displayNoInternet() : displayData();	
	}
	
}

function isDownloadDataCompleted() {
	return stocks.isDownloadCompleted();
}

function handlerDownloadNextSymbol() {
	//check if it's downloaded all data
	if(stocks.isDownloadCompleted()) {
		Ti.App.Properties.setString("downloadCompletedDate", Date());
		changeDataToCompleted();
	}
	
	displayData();
}

function handlerResumedApp() {
	if(!isDownloadDataCompleted) {
		downloadFacetData();
	}
};

function handlerChangeColor(e) {
	Ti.API.info(e);
	if(e.color != "rainbow") {
		backgroundColor = e.color;
	}
	updatesViewForColor();
}

function updatesViewForColor() {	
	$.progress.setProgressColor(backgroundColor);
	$.backCircleNoInternet.backgroundColor = $.backBorderNoInternet.backgroundColor = backgroundColor;
}

function handlerClickCircle(e) {
	if($.lblInfo.visible) {
		$.lblInfo.width = 0;
	} else {
		$.lblInfo.width = Ti.UI.SIZE;
	}
	$.lblInfo.visible = !($.lblInfo.visible);
}

function handlerChangeNetwork(e) {
	if(isDownloadDataCompleted()) {
		return;
	}
	if(e.networkType == Ti.Network.NETWORK_NONE) {
		displayNoInternet();
	} else {
		displayWithInternet();
		downloadFacetData();
	}
}

function changeDataToCompleted() {
	var dateDownloaded = Ti.App.Properties.getString("downloadCompletedDate");
	typeMessage = formatData(dateDownloaded);
	backgroundColor = colorDataCompleted;
	changeValueInfoText();
	$.progress.setCenterColor(backgroundColor);
}

function formatData(date) {
	var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var d = new Date(date);
	var month = (d.getMonth());
	var day = d.getDate();
	
	return  monthShortNames[month] + ' ' + day;
}

function displayNoInternet() {
	typeMessage = typeMessages.STOPPED.name;
	changeTextInfo();
	changeDisplayViewNoInternet();
}

function displayWithInternet() {
	typeMessage = typeMessages.WORKING.name;
	changeTextInfo();
	changeDisplayViewForInternet();
}

function changeDisplayViewNoInternet() {
	$.contNoInternet.visible = true;
	$.contInternet.visible = false;
	$.backCircleNoInternet.backgroundColor = $.backBorderNoInternet.backgroundColor = "#ff0000";
	$.lblX.text = stocks.getPercentDownloaded();
}

function changeDisplayViewForInternet() {
	$.contNoInternet.visible = false;
	$.contInternet.visible = true;
}

function displayData() {
	changeTextForPercent();
	changeTextInfo();
}

function changeTextForPercent() {
	var percent = stocks.getPercentDownloaded();
	if(isDownloadDataCompleted()) {
		$.progress.setShowText(true);
		$.progress.setValue(percent);	
	} else {
		$.progress.setShowText(true);
		$.progress.setValue(percent);
	}
}

function changeTextInfo() {
	changeValueInfoText();
}

function changeValueInfoText() {
	var percent = stocks.getPercentDownloaded();
	if(isDownloadDataCompleted()) {
		$.lblInfo.text = String.format("Historical data download \nCompleted...%s", String(typeMessage));
	} else {
		$.lblInfo.text = String.format("Historical data download \n%d%s complete...%s", percent, "%", String(typeMessage));	
	}
}

function downloadFacetData() {
	setTimeout(function() {
		stocks.downloadFacetData();
	}, 20000);
}
exports.downloadFacetData = downloadFacetData;