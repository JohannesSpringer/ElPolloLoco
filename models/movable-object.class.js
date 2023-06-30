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

    /**
     * set gravity to movable objects when they are above ground
     */
    applyGravitiy() {
        this.intervalGravity = setInterval(() => {
            if (this.isAboveGround() || this.speedY < 0) {
                this.y += this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * check movable object y value above ground y value
     * @returns movable object is above ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject || this.isDead()) { // Throwable object should always fall and dead character
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * check colission between movable ojects
     * @param {MovableObject} mo 
     * @returns collision between movable objects
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * hit for movable object - only used for character
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * check if character was hit in the last 100ms
     * @returns hit character again
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // time difference in ms
        return timepassed < 100; // Wenn innerhalb der letzten 100ms getroffen, dann true
    }

    /**
     * 
     * @returns movable object is dead
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * animate movable objects
     * @param {Object} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * start move right action of movable object
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * start move left action of movable object
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * start jump action of movable object
     */
    jump() {
        this.speedY = -30;
        this.currentImage = 0;
    }

    /**
     * get time and save for last action done
     */
    setTimerLastAction() {
        this.timeLastAction = new Date().getTime();
    }

    /**
     * 
     * @param {MovableObject} mo 
     * @returns is chicken hit by character
     */
    hitChicken(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    /**
     * check if character is over enemy and is able to kill the enemy
     * @param {MovableObject} enemy 
     * @returns 
     */
    isOverEnemy(enemy) {
        return this.y + this.height - this.offset.bottom < enemy.y + enemy.offset.top &&
            this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
            this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right;
    }

    /**
     * kill enemy and delete it from world.level
     * @param {Level} lvl 
     */
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