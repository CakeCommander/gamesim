class Main
{
   
    static init() 
    {
        Main.InitPixiJS();
        Main.createGame();
    }
    
    static InitPixiJS()
    {
        let type = "WebGL"
        if(!PIXI.utils.isWebGLSupported()){
          type = "canvas"
        }


        //Create a Pixi Application
        let app = new PIXI.Application({width: 1024, height: 1024});
        app.renderer.backgroundColor = 0x000000;
        app.renderer.autoDensity = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        
        //Add the canvas that Pixi automatically created for you to the HTML document
        document.body.appendChild(app.view);
            
        Main.pixyref = app;
        
        Main.buttonTexture = PIXI.Texture.from('art/button.png');
    }

    static createGame()
    {
        Main.player = new Player();
        var saveData = Main.player.load();
        
        Main.currencyManager = new CurrencyManager(saveData);
        Main.simulation = new Simulation(saveData,Main.currencyManager);

        Main.pixyref.ticker.add(delta => Main.simulation.update(delta));
        
        Main.ui = new UI(Main.pixyref, Main.currencyManager, Main.simulation, saveData.prestigeLevel);
        Main.pixyref.ticker.add(delta => Main.ui.update(delta));
        
        Main.player.enableSaving(); //Only start allowing saves after offline generation has been run.
    }
    
    static Save()
    {
        if(Main.player.allowSaving)
        {
            Main.player.save(Main.currencyManager, Main.simulation);   
        }
    }
    
    static restartWithPrestige()
    {
        Main.player.restartWithPrestige();
        
        var saveData = Main.player.load();
        Main.simulation.resetSimulation();
        Main.ui.setPrestigeLevel(saveData.prestigeLevel)
        Main.currencyManager.initFromSaveData(saveData);
    }
}

