class SmallChicken extends Chicken {
    height = 243 / 4;
    width = 248 / 4;
    offset = {
        top: 8,
        left: 8,
        right: 10,
        bottom: 10
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);

        this.y = 480 - this.height - 50;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    };
}