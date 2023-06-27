class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = -2.5;
    energy = 100;
    lastHit = 0;
    timeLastAction = new Date().getTime();
    imgId;
    intervalGravity;
    animateInterval;

    applyGravitiy() {
        this.intervalGravity = setInterval(() => {
            if (this.isAboveGround() || this.speedY < 0) {
                this.y += this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject || this.isDead()) { // Throwable object should always fall and dead character
            return true;
        } else {
            return this.y < 130;
        }
    }

    // character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + 120 + this.height - 120 > mo.y && // +120 correct empty space in character image on top
            this.x < mo.x + mo.width &&
            this.y + 120 < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // time difference in ms
        return timepassed < 200; // Wenn innerhalb der letzten 1500ms getroffen, dann true
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = -30;
        this.currentImage = 0;
    }

    setTimerLastAction() {
        this.timeLastAction = new Date().getTime();
    }

    hitChicken(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    isOverEnemy(enemy) {
        return this.y + this.height < enemy.y &&
            this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width;
    }

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