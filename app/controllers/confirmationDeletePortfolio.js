function close(e) {
	$.confirmationDeletePortfolio.close();
};

function del(e) {
	mietf.portWobbleMode = false;
	deletePortfolioById(mietf.source.portfolioId);
	Ti.App.fireEvent('portfolioSelectResetPrepare', { } );
	$.confirmationDeletePortfolio.close();
};

//called by getView
$.text.text = "Are you sure you want to delete the portfolio";
$.text2.text = mietf.source.title + "?";