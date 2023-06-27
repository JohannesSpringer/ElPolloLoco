class Character extends MovableObject {
    height = 1200 / 4;
    width = 610 / 4;
    x = 60;
    y = 130;
    speed = 10;
    offset = {
        top: 150,
        left: 45,
        right: 45,
        bottom: 20
    };
    inventory = {
        'bottle': 0,
        'coin': 0
    }
    MAX_BOTTLES = 0;
    MAX_COINS = 0;
    intervals = [];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_STATUSBAR_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    world;
    audios = {
        running_sound: new Audio('audio/running.mp3'),
        coin_pick_sound: new Audio('audio/coin.mp3'),
        bottle_pick_sound: new Audio('audio/bottle.mp3'),
        chicken_kill_sound: new Audio('audio/chicken.mp3'),
        get_damage_sound: new Audio('audio/damage.mp3'),
        dying_sound: new Audio('audio/dying.mp3'),
        jumping_sound: new Audio('audio/jump.mp3')
    };

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravitiy();
        this.animate();
        this.intervals.push(this.intervalGravity);
    }

    addToInventory(item) {
        this.inventory[item]++;
        this.playItemSound(item);
        if (item == 'bottle') {
            this.world.statusBarBottles.setPercentage(this.inventory['bottle'] / this.MAX_BOTTLES * 100);
        } else if (item == 'coin') {
            this.world.statusBarCoins.setPercentage(this.inventory['coin'] / this.MAX_COINS * 100);
        }
    }

    playItemSound(item) {
        if (item == 'coin') this.audios.coin_pick_sound.play();
        else if (item == 'bottle') this.audios.bottle_pick_sound.play();
    }

    animate() {
        let intIdKeyListener = setInterval(() => {
            this.fastAnimations();
        }, 1000 / 60);
        this.intervals.push(intIdKeyListener);

        let intId = setInterval(() => {
            this.slowAnimations(intId);
        }, 100);
        this.intervals.push(intId);
    }

    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    jumping() {
        this.jump();
        this.audios.jumping_sound.play();
        this.setTimerLastAction();
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    movingRight() {
        this.moveRight();
        this.otherDirection = false;
        this.audios.running_sound.play();
        this.setTimerLastAction();
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    movingLeft() {
        this.moveLeft();
        this.otherDirection = true;
        this.audios.running_sound.play();
        this.setTimerLastAction();
    }

    killCharacter(intId) {
        this.speedY = -15;
        this.audios.dying_sound.play();
        this.playAnimation(this.IMAGES_DEAD);
        clearInterval(intId);
        if (this.currentImage == (this.IMAGES_DEAD.length - 1)) clearInterval(intId);
    }

    goingIdle() {
        let now = new Date().getTime();
        if (now > this.timeLastAction + 3000) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    slowAnimations(intId) {
        if (this.isDead()) {
            this.killCharacter(intId);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            // jump animation
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.checkMovement();
        }
    }

    fastAnimations() {
        this.audios.running_sound.pause();
            if (this.canJump()) {
                this.jumping();
            } else if (this.canMoveRight()) {
                this.movingRight();
            } else if (this.canMoveLeft()) {
                this.movingLeft();
            }
            this.world.camera_x = -this.x + 100;
    }

    checkMovement() {
        if (this.isWalking()) {
            // walk animation
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.goingIdle();
        }
    }
}