function Settings() {
this.comboLock = new ComboLock();

//animation timtings
this.openVaultsTime = 1000; //used in vaults.js for goComboLock animations. //was 1700
this.titleFadeIn = 1500; //was removed, adding back in


this.IconToVaultsDuration = 1000; //used in index.js
this.VaultGlassButtonFade = 1000;
this.IconToVaultsDelay = 700;

this.comboToPortfolioDelay = 1000;

this.fadeOutVaultWordDelay = 1000;
this.fadeOutVaultWordDuration = 1200;
this.fadeInVaultWordDuration = 1000;

}

function ComboLock() {
this.top    =  112;    //101;
this.left   =  224;   //215;
this.width  = 576; //592
this.height = 576; //592
}

//button