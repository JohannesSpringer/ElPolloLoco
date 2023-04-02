class Chicken extends MovableObject {
    height = 243 / 3;
    width = 248 / 3;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    isInDanger = false;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);

        this.x = 200 + Math.random() * 500;
        this.y = 480 - this.height - 50;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
                //this.img = this.IMAGE_DEAD;
            }
        }, 1000 / 5);
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
            //if (this.x < -this.width) this.x = canvas.width;
        }, 1000 / 60);

    }

    kill() {
        this.energy = 0;
        this.img = this.IMAGE_DEAD;
        this.loadImage(this.IMAGE_DEAD);
    }
}