class ThrowableObject extends MovableObject {
    interval;

    IMAGES_BOTTLE_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASHING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_THROWING);
        this.loadImages(this.IMAGES_BOTTLE_SPLASHING);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.imgId = 'throw';
        this.throw();
    }

    throw() {
        this.speedY = -20;
        this.applyGravitiy();
        this.interval = setInterval(() => {
            this.x += 10;
            if (this.imgId == 'throw') this.playAnimation(this.IMAGES_BOTTLE_THROWING);
            if (this.imgId == 'splash') {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASHING);
                if (this.currentImage == 5) clearInterval(this.interval);
            }
        }, 1000/50);
    }
}