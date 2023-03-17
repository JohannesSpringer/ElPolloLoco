class Cloud extends MovableObject {
    y = 0;
    width = 1920 / 4;
    height = 1080 / 4;
    x = canvas.width;
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.1;
            if (this.x < -this.width) this.x = canvas.width;
        }, 1000 / 60);
        
    }
}