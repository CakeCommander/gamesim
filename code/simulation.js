class Simulation
{

    constructor(saveData, currencyManager)
    {
        let numBusinesses = designConfig.businesses.length;
        
        this.businesses = new Array(numBusinesses);
        
        let hasValidSaveData = (saveData != null && saveData.businesses != null && saveData.businesses.length == numBusinesses);
    
        for (var i = 0; i < numBusinesses; i++)
        {
            this.businesses[i] = new Business(currencyManager, designConfig.businesses[i], hasValidSaveData? saveData.businesses[i] : null);
        }
        
        if(hasValidSaveData)
        {
            this.simulateOfflineGeneration(saveData.lastSaveTime);
        }
    }
    
    //Force all businesses to config values in the event of a prestige reset.
    resetSimulation()
    {
        for (var i = 0; i < this.businesses.length; i++)
        {
            this.businesses[i].resetToSimulationStart();
        }
    }
    
    update(delta) 
    {
        this.businesses.forEach(elem => elem.update(delta));
    }
    
    //Will simulate currency generation given the time delta from the last save event.
    simulateOfflineGeneration(lastSaveTime)
    {
        var now = Date.now();
        var diff = now - lastSaveTime;
        
        console.log("Simulating generation for " + diff + "ms");
        
        this.businesses.forEach(elem => elem.offlineGeneration(diff)); 
    }
    
    getSaveData()
    {
        var saveData = new Array(this.businesses.length);
        
        for (var i = 0; i < this.businesses.length; i++)
        {
            saveData[i] = this.businesses[i].getSaveData();
        }
        
        return saveData;
    }
    
}