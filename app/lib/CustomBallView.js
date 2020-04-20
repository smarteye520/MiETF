function CustomImageView(args) {
	var self = Ti.UI.createImageView(args);
	var parent = args.parent;
	//override any customizations to image, images, repeatCount, or duration
	self.image = args.animatedImages[0];
	self.repeatCount = null;
	self.duration = null;

	//instance variables
	var animationIndex = 0,
	    animationCount = 0,
	    images = args.animatedImages;

	self.startAnimation = function() {
		if (animationCount < args.repeatCount * images.length) {
			animationIndex++;
			if (animationIndex === images.length) {
				parent.moveFromLinetoEnd();
				//Ti.App.fireEvent('introComplete', {});
				return;
				animationIndex = 0;
			}

		Ti.API.info('animationIndex ' +animationIndex);
			/*
			 if (animationIndex == 71) {
			 //start move animation
			 parent.moveFromHighToLine();
			 }
			 */

			if (animationIndex == 14) {
				parent.changeIColor(mietf.vaultColorDictionary[8].color);
			}
			/*
			 if (animationIndex == 82) {
			 parent.moveFromLineToRight();
			 }
			 */
			if (animationIndex == 26) {
				parent.changeIColor(mietf.vaultColorDictionary[7].color);
			}
			/*
			 if (animationIndex == 95) {
			 parent.moveFromRightToLine();
			 }
			 */
			if (animationIndex == 38) {
				parent.changeIColor(mietf.vaultColorDictionary[0].color);
			}

			if (animationIndex == 50) {
				parent.changeIColor(mietf.vaultColorDictionary[1].color);
			}

			if (animationIndex == 62) {
				parent.changeIColor(mietf.vaultColorDictionary[5].color);
			}

			if (animationIndex == 74) {
				parent.changeIColor(mietf.vaultColorDictionary[6].color);
			}

			if (animationIndex == 86) {
				parent.changeIColor('#171DA4');
			}

			if (animationIndex == 98) {
				parent.changeIColor(mietf.vaultColorDictionary[4].color);
			}

			if (animationIndex == 110) {
				parent.changeIColor(mietf.vaultColorDictionary[2].color);
			}
			/*
			 if (animationIndex == 131) {
			 parent.changeIColor(mietf.vaultColorDictionary[1].color);
			 }
			 if (animationIndex == 149) {
			 parent.changeIColor(mietf.vaultColorDictionary[2].color);
			 }
			 if (animationIndex == 167) {
			 parent.changeIColor(mietf.vaultColorDictionary[3].color);
			 }
			 if (animationIndex == 184) {
			 parent.changeIColor(mietf.vaultColorDictionary[4].color);//yellow
			 }
			 if (animationIndex == 202) {
			 parent.changeIColor(mietf.vaultColorDictionary[5].color);//white
			 }
			 if (animationIndex == 219) {
			 parent.changeIColor(mietf.vaultColorDictionary[6].color);
			 }
			 if (animationIndex == 238) {
			 parent.changeIColor(mietf.vaultColorDictionary[7].color);
			 }
			 if (animationIndex == 244) {
			 //start move animation
			 parent.moveFromLinetoEnd();
			 }

			 if (animationIndex == 246) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[8].color,98);
			 }

			 if (animationIndex == 248) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[8].color,96);
			 }

			 if (animationIndex == 250) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[8].color,94);
			 }

			 if (animationIndex == 252) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[8].color,92);
			 }

			 if (animationIndex == 254) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[8].color,88);
			 }

			 if (animationIndex == 256) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[8].color,85);
			 }

			 if (animationIndex == 258) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[8].color,82);
			 }

			 if (animationIndex == 260) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[8].color,79);
			 }

			 if (animationIndex == 262) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[8].color,76);
			 }

			 if (animationIndex == 264) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[9].color,73);
			 }

			 if (animationIndex == 266) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[9].color,70);
			 }

			 if (animationIndex == 268) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[9].color,68);
			 }

			 if (animationIndex == 270) {
			 parent.changeIColorWithSize(mietf.vaultColorDictionary[0].color,64);
			 }
			 */

			self.image = images[animationIndex];
			animationCount++;
			setTimeout(self.startAnimation, args.duration);
		}
	};

	return self;
}

module.exports = CustomImageView; 