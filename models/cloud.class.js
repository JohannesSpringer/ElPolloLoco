class Cloud extends MovableObject {
    y = 0;
    width = 1920 / 4;
    height = 1080 / 4;
    //x = canvas.width;
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}