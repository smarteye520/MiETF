function SearchTableViewRow(_args){
	var title = _args.title, date = _args.date, img = _args.img, tags= _args.tags;
	
	var self = Ti.UI.createTableViewRow({ selectedColor:'black', selectedBackgroundColor : 'yellow', img: img, tags: tags});

var tableRowView = Ti.UI.createView({
	height: 50,
	width: '100%'
});

self.add(tableRowView);

var leftRowImage = Ti.UI.createImageView({
	image: img,
	height: 32,
	width: 32,
	left: 5
});

tableRowView.add(leftRowImage);


var titleHolderView = Ti.UI.createView({
	left: 47, 
	width: 138
});

tableRowView.add(titleHolderView);

	var titleLbl = Ti.UI.createLabel({
		color: 'black',
		font:{fontSize:'14sp',  fontWeight: 'bold'},
		text: title,
		left: 0
	});
	
	titleHolderView.add(titleLbl);

var dateHolderView = Ti.UI.createView({
	left: 190, 
	width: 80
});

tableRowView.add(dateHolderView);

	var dateLbl = Ti.UI.createLabel({
		color: 'black',
		font:{fontSize:'14sp',  fontWeight: 'bold'},
		text: date,
		right: 0,
		textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT
	});
	
	dateHolderView.add(dateLbl);

	return self;
}

module.exports = SearchTableViewRow;



