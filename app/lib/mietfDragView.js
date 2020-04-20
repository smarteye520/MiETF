function mietfDragView(_args) {

	var width = _args.width;
	var height = _args.height;
	var left = _args.left;
	var top = _args.top;
	var zIndex = _args.zIndex;
	var image = _args.image;
	var opacity = _args.opacity;
	var isAddNew = _args.isAddNew;
	var isCover = _args.isCover;
	var mietfID = _args.mietfID;
	var parent = _args.parent;
	var arrayIndex = _args.arrayIndex;
	
	var self = Ti.UI.createView({
		backgroundColor : 'transparent',
		width : 145,
		height : 210,
		left : left - 9,
		top : top - 5,
		zIndex : zIndex,
		i: arrayIndex,
		touchEnabled: true,
		arrayIndex : _args.arrayIndex,
		mietfID : _args.mietfID,
		mietfName : _args.mietfName,
		vaultNum : _args.vaultNum,
		vaultName : _args.vaultName,
		iconImg : _args.image
	});
			
	self.setName = function(mietfName) {
		self.mietfName = mietfName;
	};

	if (isAddNew) {
			self.addEventListener('click', function(e) {
				lockScreen(3);
				mietf.mietfAddButtonClick = true;
				parent.createNewMietf({
					arrayIndex : self.arrayIndex,
					vaultNum : _args.vaultNum,
					vaultName : _args.vaultName,
					zIndex: _args.zIndex,
					imagePath: _args.image
				});
		});
	}

	if (mietfID > 1 || mietfID < 10000000) {
				self.addEventListener('longpress', function(e) {
					parent.stopWobble();     
					 mietf.source.disableClick = true;
					    
					    //mietf.source.portfolioId = 0;
						mietf.source.mietfId =mietfID;
						mietf.source.title = _args.mietfName;
		
					 	win=Alloy.createController('confirmationDeleteMietf').getView();
						win.open({transition:Ti.UI.iPhone.AnimationStyle.NONE});
		});
		

		self.addEventListener('click', function(e) {
			Ti.API.info('page draggable click ' + e.x + ' ' + e.y);
			
			if(e.x<40 && e.y<40){
				    parent.stopWobble();
			
					mietf.source.disableClick = true;
				    //mietf.source.portfolioId = 0;
					mietf.source.mietfId =mietfID;
					mietf.source.title = _args.mietfName;
	
				 	win=Alloy.createController('confirmationDeleteMietf').getView();
					win.open({transition:Ti.UI.iPhone.AnimationStyle.NONE});
					return;
			}
			
			if (mietf.source.disableClick == true) return;
			mietf.mietfAddButtonClick = false;
			
			lockScreen(3);
			
			if(self.clickTime && (new Date().getTime()-self.clickTime)<4000){
				Ti.API.info('page draggable click again' + self.mietfID);
				return;
			}
			self.clickTime = new Date().getTime();
			
			parent.stopWobble();
			
			parent.gotoMietfSelection({
				arrayIndex : self.arrayIndex,
				mietfID : self.mietfID,
				mietfName : self.mietfName,
				vaultNum : _args.vaultNum,
				vaultName : _args.vaultName,
				zIndex: _args.zIndex
			});

		});

	}

	return self;

};

module.exports = mietfDragView; 