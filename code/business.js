class Business
{

    constructor(currencyManager, configData, saveData)
    {
        this.configData = configData;
        
        //Providing a currency manager reference here is useful, if we support different currencies
        this.currencyManager = currencyManager; 

        this.resetToConfig();
        
        //From save data, only a limited amount of info needed for the current range of functionality.
        this.hasManager = saveData == null? false : saveData.hasManager;
        this.level = saveData == null? 0 : saveData.level;
        this.endTime = saveData == null? 0 : saveData.endTime;
    }
    
    getSaveData()
    {
        var data = {};
        data.level = this.level;
        data.hasManager = this.hasManager;
        data.endTime = this.endTime;
        return data;
    }
    
    resetTimer()
    {
        this.endTime = Date.now() + this.generationTime;
    }
    
    resetToConfig()
    {
       //From from the config json, these values should never change
        this.displayName = this.configData.name;
        this.baseCost = this.configData.baseCost;
        this.costIncreasePerLevel = this.configData.costIncreasePerLevel;
        this.managerCost = this.configData.managerCost;
        this.baseGeneration = this.configData.baseGeneration;
        this.generationIncreasePerLevel = this.configData.generationIncreasePerLevel;
        this.generationTime = this.configData.generationTime;
    }
    
    resetToSimulationStart()
    {
        this.resetToConfig();
        
        this.hasManager = false;
        this.level = 0;

        this.endTime = 0;
        this.resetTimer();
    }
    
    getTimeLeftInCycle()
    {
        return this.endTime - Date.now();
    }
    
    getHumanTimeLeftInCycle() // Get a string representing the timespan in a usable human format.
    {
        if(this.endTime < Date.now()) 
        {
            return null;
        }
        
        var timespan = this.endTime - Date.now();
        
        let hours = Math.floor ((timespan / 1000) / 60) / 60;
        let mins = Math.floor(timespan / 1000 / 60);
        let secs = Math.floor (timespan / 1000);
       
        if(hours >= 1)
        {
            return hours + "h"        
        }
        
        if(mins >= 1)
        {
             return mins + "m"     
        }

        if(secs >=1)
        {
             return secs + "s"     
        }
        
        return "<1s"; //fallback as we don't want to display ms.
    }

    update(delta)
    {
        if(this.level <= 0)
        {
            return;        
        }
        
        if(this.hasManager && this.isReadyToCollect())
        {
            this.collect();
        }
    }
    
    
    //Performs offline generation of currency, only collecting if the player has a manager.
    offlineGeneration(simulatedDelta)
    {
        if(this.level <= 0 || this.generationTime <= 0 || simulatedDelta <= 0)
        {
            return;        
        }
        
        while(this.hasManager && simulatedDelta > 0 && simulatedDelta > this.generationTime)
        {
            simulatedDelta -= this.generationTime;
            this.resetTimer();
            this.currencyManager.onCollection(this.getGenerationPerCycle(), !this.hasManager);
        } 
    }
    
    isReadyToCollect()
    {
        return this.getTimeLeftInCycle() <= 0;
    }

    getCostToUpgrade()
    {
        return this.baseCost + (this.baseCost * ((this.level+1) * this.costIncreasePerLevel));
    }
    
    getGenerationPerCycle()
    {
        return this.baseGeneration + (this.baseGeneration * (this.level * this.generationIncreasePerLevel));
    }
    
    collect()
    {
        if(this.isReadyToCollect())
        {
            this.resetTimer();
            this.currencyManager.onCollection(this.getGenerationPerCycle(), !this.hasManager);
        }
    }
    
    buyUpgrade()
    {
        let purchaseCost = this.getCostToUpgrade();
        
        if(this.currencyManager.hasQuantity(purchaseCost))
        {  
            this.level++;
            
            if(this.level == 1) //Ensure we are restarting timer on first level, otherwise don't interupt progress.
            {
                this.resetTimer();
            }
            
            this.currencyManager.onSpend(purchaseCost);
        }
    }
    
    buyManager()
    {
        if(this.level > 0 && this.currencyManager.hasQuantity(this.managerCost))
        {
            this.hasManager = true;  
            this.currencyManager.onSpend(this.managerCost);   
        }
    }

}

