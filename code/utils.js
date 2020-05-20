    function createTexture(x,y,width,height, parent, texture)
    {
        var tex = new PIXI.Sprite(texture);
        tex.anchor.set(0.0,0.0);
        tex.x = x;
        tex.y = y;

        tex.width = width;
        tex.height = height;
        parent.addChild(tex);
        return tex;
    }
    
    function createButton(x, y, width, height, parent, texture, target, callback, text)
    {
        var button = new PIXI.Sprite(texture);
        parent.addChild(button);
        button.buttonMode = true;
        button.interactive = true;
        button.anchor.set(0.5,0);
        button.x = x;
        button.y = y;

        button.width = width;
        button.height = height;
    
        button.target = target;
        
        button.click = callback;
       
    
        var uiElement = {};
        uiElement.button = button;
        uiElement.label = this.createLabel(0, button.height/2, button.width*0.85, button.height*0.9, button, text);
        
        return uiElement;
    }
    
    function createLabel(x, y, width, height, parent, text)
    {
        const label = new PIXI.Text(text,{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'});
        label.x = x;
        label.y = y;
        label.width = width;
        label.height = height;
        label.anchor.set(0.5,0);
        label.text = text;
        parent.addChild(label);  
    
        return label;
    }