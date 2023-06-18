class Endboss extends MovableObject {

    height = 400;
    width = 270;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERTING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERTING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.y = 480 - this.height - 30;
        this.speed = 0;
        this.imgId = 'walk';

        this.animate();
    }

    animate() {
        this.animateInterval = setInterval(() => {
            if (this.imgId == 'walk') this.playAnimation(this.IMAGES_WALKING);
            if (this.imgId == 'alert') this.playAnimation(this.IMAGES_ALERTING);
            if (this.imgId == 'attack') this.playAnimation(this.IMAGES_ATTACKING);
            if (this.imgId == 'hurt') this.playAnimation(this.IMAGES_HURT);
            if (this.imgId == 'dead') {
                this.playAnimation(this.IMAGES_DEAD);
                if (this.currentImage == 3) clearInterval(this.animateInterval);
            };
        }, 1000 / 5);
        this.moveLeft();
    }

    attack() {
        this.speed = 15;
        this.imgId = 'attack';
        this.moveLeft();
    }

    hitEndboss() {
        this.energy -= 20;
        this.imgId = 'hurt';
    }

    endbossIsHitByBottle(bottle) {
        return bottle.x + bottle.width > this.x &&
            bottle.y < this.y + this.height &&
            bottle.y + bottle.height > this.y;
    }
}