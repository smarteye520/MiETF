exports.apiPath = function() {
	return Alloy.CFG.api.host;
};

exports.authToken = function() {
	return Alloy.CFG.api.auth_token;
};

exports.dataset = function() {
	return "eod/";
};
