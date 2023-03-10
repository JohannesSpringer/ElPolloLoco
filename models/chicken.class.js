class Chicken extends MovableObject{
    height = 243 / 2.5;
    width = 248 / 2.5;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500;
        this.y = canvasHeight - this.height - 50;
    }
}