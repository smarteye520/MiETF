function PagingControl(sv){

 	scrollableView = sv;
	// Configuration
	var pageColor = "#c99ed5";
	var container = Titanium.UI.createView({
		height: 64,
		width: Ti.UI.SIZE,
		bottom: 40,
		opacity: 0
	});
	
	var subContainer = Titanium.UI.createView({
		height: 64,
		width: Ti.UI.SIZE
	});
	
	// Keep a global reference of the available pages
	numberOfPages = scrollableView.getViews().length;
	
	if (numberOfPages ==1) { subContainer.opacity=0;} else { subContainer.opacity=1;}
	
	pages = []; // without this, the current page won't work on future references of the module
	
	// Go through each of the current pages available in the scrollableView
	for (var i = 0; i < numberOfPages; i++) {
		page = Titanium.UI.createView({
			borderRadius: 4,
			width: 24,
			height: 24,
			left: 40 * i,
			backgroundImage:"images/latest/dot_center_grey.pn8", //"images/dot_center_blue.pn8"
			opacity: 1.0,
			index: i
		});
		
		page.addEventListener('click', function(e) {			
			sv.scrollToView(e.source.index);
		});
	
		// Store a reference to this view
		pages.push(page);
		// Add it to the container
		subContainer.add(page);
	}
	

	// Mark the initial selected page
	pages[scrollableView.getCurrentPage()].backgroundImage = "images/latest/dot_center_blue.pn8";
	// Attach the scroll event to this scrollableView, so we know when to update things
	scrollableView.addEventListener("scrollEnd", onScroll);
        // Reset page control to default page when scollableView refresh
	scrollableView.addEventListener("postlayout", onPostLayout);
	
	container.reset = function(sv) {
		for (var i = 0; i < pages.length; i++) {
			subContainer.remove(pages[i]);
		}
			
		numberOfPages = scrollableView.getViews().length;
		if (numberOfPages ==1) { subContainer.opacity=0;} else { subContainer.opacity=1;}
	
	pages = []; // without this, the current page won't work on future references of the module
	
	// Go through each of the current pages available in the scrollableView
	for (var i = 0; i < numberOfPages; i++) {
		page = Titanium.UI.createView({
			borderRadius: 4,
			width: 24,
			height: 24,
			left: 40 * i,
			backgroundImage:"images/latest/dot_center_grey.pn8", //"images/dot_center_blue.pn8"
			opacity: 1.0,
			index: i
		});
		
		page.addEventListener('click', function(e) {
			scrollableView.scrollToView(e.source.index);
		});
	
		// Store a reference to this view
		pages.push(page);
		// Add it to the container
		subContainer.add(page);
	}
	pages[scrollableView.getCurrentPage()].backgroundImage = "images/latest/dot_center_blue.pn8";
	
	};
 
 	container.add(subContainer);
 	
 	container.setCurrentPage = function(pageNumber) {
 		scrollableView.currentPage = pageNumber;
 		scrollableView.scrollToView(pageNumber);
 		
 		updateScrollIndicator();
	};
 
	return container;
};


function updateScrollIndicator() {
	// Go through each and reset it's opacity
	for (var i = 0; i < numberOfPages; i++) {
		pages[i].backgroundImage = "images/latest/dot_center_grey.pn8";
	}
	// Bump the opacity of the new current page
	pages[scrollableView.currentPage].backgroundImage = "images/latest/dot_center_blue.pn8";
}

 
onScroll = function(event){
	// Go through each and reset it's opacity
	for (var i = 0; i < numberOfPages; i++) {
		pages[i].backgroundImage = "images/latest/dot_center_grey.pn8";
	}
	// Bump the opacity of the new current page
	pages[event.currentPage].backgroundImage = "images/latest/dot_center_blue.pn8";
	mietf.currentVaultScreen = event.currentPage;
	
};
 
onPostLayout = function(event) {
	// Go through each and reset it's opacity
	for(var i = 0; i < numberOfPages; i++) {
		pages[i].backgroundImage = "images/latest/dot_center_grey.pn8";
	}
	// Bump the opacity of the new current page
	pages[scrollableView.currentPage].backgroundImage = "images/latest/dot_center_blue.pn8";
 
};
 
 
module.exports = PagingControl;