class UI //Needs replace with Screen & Popup system in a full product
{
    constructor(app, currencyManager, simulation, prestigeLevel)
    {
        this.app = app;
        this.currencyManager = currencyManager;
        this.simulation = simulation;
        
       
        this.createCurrencyLabel();
        this.createBusinessViews();
        
        this.createPrestigeInfo();
        this.createResetButton();
        this.setPrestigeLevel(prestigeLevel);
    }
    
    createBusinessViews()
    {
        let numBusinesses = this.simulation.businesses.length;
      
        this.views = new Array(numBusinesses);
        
        let ySpacing = 15;
        let yOffset = window.innerHeight*0.2;
        
        let heightPerView = (window.innerHeight*0.75/numBusinesses) -ySpacing ;
        let width = window.innerHeight*0.8;
        let x = window.innerWidth*0.2;
     
        for(var i =0; i < numBusinesses; ++i)
        {
            this.views[i] = new BusinessView(this.simulation.businesses[i]);
            this.views[i].init(this.app, x, i*heightPerView+yOffset + ySpacing*i, width ,heightPerView);
        } 
    }
    
    createResetButton()
    {
         this.resetButton = createButton(window.innerWidth*0.1,window.innerWidth*0.1,window.innerWidth*0.2, window.innerHeight*0.08, this.app.stage, Main.buttonTexture, this, this.onResetGame, "Reset");
    }
    
    createPrestigeInfo()
    {
        this.prestigeButton = createButton(window.innerWidth*0.1,0,window.innerWidth*0.2, window.innerHeight*0.08, this.app.stage, Main.buttonTexture, this, this.onPrestigeButtonPressed, "Prestige");
        this.prestigeLabel = createLabel(window.innerWidth*0.4,0,window.innerWidth*0.4, window.innerHeight*0.08, this.app.stage, "");
    }
    
    onPrestigeButtonPressed()
    {
        Main.restartWithPrestige();
    }
    
    onResetGame()
    {
        Main.player.clear();
        location.reload();
    }
    
    createCurrencyLabel()
    {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 64,
            fontWeight: 'bold',
            fill: ['#ffffff', '#ffff00'], // gradient
        });

        this.currencyLabel = new PIXI.Text('Empty', style);
        this.currencyLabel.anchorNode = (1,1)
        this.currencyLabel.width = 150;
        this.currencyLabel.x = -40 + window.innerWidth - (this.currencyLabel.width);
        this.currencyLabel.y = 10;
        this.app.stage.addChild(this.currencyLabel);
    }
    
    update(delta)
    {
        this.updateBusinessUI(delta);
        this.updateCurrency();
    }
    
    updateCurrency()
    {
        var currency = "$"+ Math.floor(this.currencyManager.currency);
        
        if(currency != this.currencyLabel.text) //Avoid updates if there is no change
        {
            this.currencyLabel.text = currency;
        }
    }
    
    updateBusinessUI(delta)
    {
        for(var i =0; i < this.views.length; ++i)
        {
            this.views[i].update(delta)
        }
    }

    setPrestigeLevel(prestigeLevel)
    {
        let prestigeBonus = designConfig.additivePrestigeEarningBonusPreReset * prestigeLevel;
        
        if(prestigeBonus < 1)
        {
            prestigeBonus = 1;
        }
        
        for(var i =0; i < this.views.length; ++i)
        {
            this.views[i].fullRefresh();
            this.views[i].setPrestigeBonus(prestigeBonus);
        }
        
        this.prestigeLabel.text = "Prestige bonus x"+prestigeBonus;
        
        this.prestigeLabel.visible = prestigeBonus>1;

    }
}
