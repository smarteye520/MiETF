function CustomImageView(args) {
	var self = Ti.UI.createImageView(args);
	//override any customizations to image, images, repeatCount, or duration
	self.image = args.animatedImages[0];
	self.repeatCount = null;
	self.duration = null;
	
	//instance variables
	var animationIndex = 0,
		animationCount = 0,
		images = args.animatedImages;
	
	self.startAnimation = function() {
		if (animationCount < args.repeatCount*images.length) {
			animationIndex++;
			if (animationIndex === images.length) {
				return;
				animationIndex = 0;
			}
			self.image = images[animationIndex];
			animationCount++;
			setTimeout(self.startAnimation, args.duration);
		}
	};
	
	self.addCoverPage = function(imgView) {
		self.add(imgView);
	};
	
	return self;
}

module.exports = CustomImageView;