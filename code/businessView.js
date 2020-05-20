class BusinessView
{
    constructor(business)
    {
        this.business = business;  
        this.prestigeBonus = 1;
    }
    
    init(app, x, y, width, height)
    { 
        var collect = function()
        {
            this.target.business.collect();
        };
        
        var buyManager = function()
        {
            this.target.business.buyManager();
            
            if(this.target.business.hasManager)
            {
                this.target.buyManagerButton.label.text = "Managed";
                this.target.updateLabels();
            }
        };
        
        var buyUpgrade = function()
        {
            this.target.business.buyUpgrade();
            this.target.updateLabels();
        };
        
        
        //Hard coded UI creation & hook in the absense of tool support.
        let sectionWidth = width*0.33;
        let titleHeight = height*0.3;
        let contentHeight = height-titleHeight;
        let contentY = y + titleHeight;
        
        
        this.titleLabel = createLabel(x+width*0.33,y,width/2, titleHeight, app.stage, this.business.displayName);
       
        this.collectButton = createButton(x ,contentY,sectionWidth, contentHeight, app.stage, Main.buttonTexture, this, collect, "");
        this.upgradeButton = createButton(x+sectionWidth,contentY,sectionWidth, contentHeight, app.stage, Main.buttonTexture, this, buyUpgrade, "");
        this.buyManagerButton  = createButton(x+sectionWidth*2,contentY,sectionWidth, contentHeight, app.stage, Main.buttonTexture, this, buyManager, "");
     
        this.updateCollectionState();
        this.updateLabels();
    }
    
    setPrestigeBonus(prestigeBonus)
    {
        this.prestigeBonus = prestigeBonus;
        this.updateLabels();
    }
    
    update(delta)
    {  
        this.updateCollectionState();
    }
    
    updateCollectionState()
    {
        if(this.business.level <= 0)
        {
            this.collectButton.button.visible = false;
            return;
        }
        
        this.collectButton.button.visible = true;
          
        if(this.business.isReadyToCollect())
        {
            let generationAmt = Math.floor(this.prestigeBonus * this.business.getGenerationPerCycle());
        
            this.collectButton.label.text = "Collect \n$" +generationAmt;
            this.collectButton.button.tint = 0x00FF0F;
        }
        else
        {
            this.collectButton.label.text = "Ready in\n" + this.business.getHumanTimeLeftInCycle();
            this.collectButton.button.tint = 0xFFFFFF;
        }
    }
    
    updateLabels()
    {
        if(this.business.level <= 0)
        {
            this.titleLabel.text = this.business.displayName;
            this.buyManagerButton.button.visible = false;
            this.upgradeButton.label.text = "Purchase \n$" + Math.ceil(this.business.getCostToUpgrade());
        }
        else
        {
            let generationAmt = Math.floor(this.prestigeBonus * this.business.getGenerationPerCycle());
        
            this.titleLabel.text = this.business.displayName +" [Lvl " + this.business.level+"] [generates $" + generationAmt +" ]";
            this.upgradeButton.label.text = "Upgrade \n$" + Math.ceil(this.business.getCostToUpgrade());
            this.buyManagerButton.button.visible = true;
            
            if(this.business.hasManager)
            {
                this.buyManagerButton.label.text = "Managed";
                this.buyManagerButton.button.tint = 0x00FF0F;
            }
            else
            {
                this.buyManagerButton.label.text = "Hire Manager\n$" + this.business.managerCost;
                this.buyManagerButton.button.tint = 0xFFFFFF;
            }
        }                                                                
    }
  
    fullRefresh()
    {
        this.collectButton.button.tint = 0xFFFFFF;
        this.collectButton.label.text = "";
        this.updateCollectionState();
        this.updateLabels();
    }
    
}
