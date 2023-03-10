class Cloud extends MovableObject {
    y = 0;
    width = 1920 / 4;
    height = 1080 / 4;
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
    }
}