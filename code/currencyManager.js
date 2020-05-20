class CurrencyManager
{
    constructor(saveData)
    {
       this.initFromSaveData(saveData)
    }
    
    initFromSaveData(saveData)
    {
        this.currency = 0;
        this.additiveBonus = (designConfig.additivePrestigeEarningBonusPreReset * saveData.prestigeLevel);
        
        if(saveData != null)
        {
            this.currency = saveData.currency;
        }
    }
    
    onCollection(quantity, wasManual)
    {
        this.currency += (quantity * this.additiveBonus);
        
        if(wasManual) //Only need to save when the player takes an action, manager generation can be simulated.
        {
            Main.Save();
        }
    }
    
    onSpend(quantity)
    {
        this.currency -= quantity;
        Main.Save(); //Spending is always a player action.
 
    }
    
    hasQuantity(quantity)
    {
        return this.currency >= quantity;
    }
}