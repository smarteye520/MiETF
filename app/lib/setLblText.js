function setLblText(_args) {
	
	var text = '';

	var attr = Ti.UI.createAttributedString({
    text:  text,
    attributes: [
        {
         	type: Ti.UI.ATTRIBUTE_TEXT_EFFECT,
          value: Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
          range: [0, text.length]
        }
    ]
	});
	 
	var self = Ti.UI.createLabel({
	  color: 'white',
	  font: {  fontFamily: 'AvenirNextCondensed-Bold', fontSize:'21sp', fontWeight: 'bold' },
	   attributedString: attr,
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  width: 96, height: 70,
	  touchEnabled: false
	});
	
	
	self.setText = function(text) {
	self.attributedString =  Ti.UI.createAttributedString({
	    text:  text,
	    attributes: [
	      {
          type: Ti.UI.ATTRIBUTE_TEXT_EFFECT,
          value: Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
         	range: [0, text.length]
	      }
	    ]
	});
	};
	
	self.setSmallText = function(text) {		
		self.font = {  fontFamily: 'AvenirNextCondensed-Bold', fontSize:'10sp', fontWeight: 'bold' };
			
		self.attributedString =  Ti.UI.createAttributedString({
	    text:  text,
	    attributes: [
	        {
	            type: Ti.UI.ATTRIBUTE_TEXT_EFFECT,
               value: Ti.UI.ATTRIBUTE_LETTERPRESS_STYLE,
	           range: [0, text.length]
	        }
	    ]});
	};
		

	return self;
};

module.exports = setLblText;