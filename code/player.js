class Player
{
    constructor()
    {
        this.prestigeLevel = 0;
        this.allowSaving = false;
    }
    
    load() 
    {
        let loadedData = JSON.parse(localStorage.getItem("saveData"));
        
        if(loadedData == null)
        {
            loadedData = {};
            loadedData.currency = designConfig.initialCurrency;
            loadedData.lastSaveTime = Date.now();
            loadedData.prestigeLevel = 1;
            this.businesses = null;
        }

        this.prestigeLevel = loadedData.prestigeLevel;
        
        return loadedData;
    }

    
    //Performed when collecting via a manual action or when a purchase is made.
    save(currencyManager, simulation)
    {
        if(!this.allowSaving) //Prevents save attempts during offline simulation & once app is ready for interaction.
        {
            return    
        }
    
        let saveData = {};
        
        saveData.lastSaveTime = Date.now();
        saveData.currency = currencyManager.currency;
        saveData.businesses = simulation.getSaveData();
        saveData.prestigeLevel = this.prestigeLevel;
 
        localStorage.setItem("saveData", JSON.stringify(saveData));  
    }
    
    enableSaving()
    {
        this.allowSaving = true;
    }
    
    //Reset currency & businesses to config values. Only maintain our prestige level.
    restartWithPrestige()
    {
        this.clear();
        this.prestigeLevel++;
    
        let saveData = {};
        
        saveData.lastSaveTime = Date.now();
        saveData.currency = designConfig.initialCurrency;
        saveData.prestigeLevel = this.prestigeLevel;
        
        localStorage.setItem("saveData", JSON.stringify(saveData));  
    }
    
    clear()
    {
        localStorage.clear();
    }

}