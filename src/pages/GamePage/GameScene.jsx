export const scene = {
    preload : function()
    {
        this.load.image('wheel', "/assets/wheel.png");
    },
    
    create : function()
    {
        this.matter.world.setBounds().disableGravity();
    
        var rect = this.matter.add.image(400, 300, 'wheel');
    
        rect.setBody({
            type: 'rectangle',
            width: 64,
            height: 100
        });

        rect.displayWidth = 24;
        rect.displayHeight = 50;
    
        rect.setVelocity(6, 3);
        rect.setAngularVelocity(0.01);
        rect.setBounce(1);
        rect.setFriction(0, 0, 0);
    }
};
