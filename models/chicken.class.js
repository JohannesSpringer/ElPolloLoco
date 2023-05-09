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

        this.y = 480 - this.height - 50;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    };

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 5);
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

    };

    kill(lvl) {
        this.energy = 0;
        this.img = this.IMAGE_DEAD;
        this.loadImage(this.IMAGE_DEAD);

        setTimeout(() => {
            lvl.enemies.forEach(enemy => {
                if (enemy.energy == 0) {
                    lvl.enemies.splice(lvl.enemies.indexOf(enemy), 1);
                }
            });
        }, 500);
    };
}