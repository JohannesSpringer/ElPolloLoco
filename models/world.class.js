class World {
    character = new Character();
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwedBottle;
    bottleInAir = false;
    audios = {};
    muted;

    constructor(canvas, keyboard, muted) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.muted = muted;
        this.draw();
        this.setWorld();
        this.setLevelMaxItems();
        this.addAudios();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    setLevelMaxItems() {
        this.level.pickables.forEach((item) => {
            if (item.NAME == 'bottle') this.character.MAX_BOTTLES++;
            else if (item.NAME == 'coin') this.character.MAX_COINS++;
        });
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndboss();
            this.checkAudios();
        }, 200);
    }

    addAudios() {
        Object.keys(this.character.audios).forEach(key => {
            this.audios[key] = this.character.audios[key];
        });
    }

    checkAudios() {
        if (this.muted) {
            Object.keys(this.audios).forEach(key => {
                this.audios[key].muted = true;
            });
        } else {
            Object.keys(this.audios).forEach(key => {
                this.audios[key].muted = false;
            });
        }
    }

    checkEndboss() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                if (this.character.x < enemy.x - 500) {
                    enemy.imgId = 'walk';
                }
                if (this.character.x > enemy.x - 500) {
                    enemy.imgId = 'alert';
                }
                if (this.character.x > enemy.x - 400) {
                    enemy.attack();
                }
                if (enemy.isDead()) {
                    enemy.imgId = 'dead';
                    setTimeout(() => {
                        // todo: funktion für Endbildschirm
                        console.log("Gewonnen");
                    }, 160);
                } else if (this.throwedBottle != undefined) {
                    if (enemy.endbossIsHitByBottle(this.throwedBottle)) {
                        enemy.hitEndboss();
                        this.throwedBottle.imgId = 'splash';
                        this.throwedBottle.speed = 0;
                        setTimeout(() => {
                            clearInterval(this.throwedBottle.interval);
                            clearInterval(this.throwedBottle.intervalGravity);
                            this.throwableObjects.splice(0, 1);
                            this.throwedBottle = undefined;
                            enemy.imgId = 'alert';
                        }, 160);
                    }
                }
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.CTRL && this.character.inventory['bottle'] > 0 && !this.bottleInAir) {
            this.throwedBottle = new ThrowableObject(this.character.x + 90, this.character.y + 130);
            this.throwableObjects.push(this.throwedBottle);
            this.character.inventory['bottle']--;
            this.statusBarBottles.setPercentage(this.character.inventory['bottle'] / this.character.MAX_BOTTLES * 100);
            this.bottleInAir = true;
            setTimeout(() => {
                this.bottleInAir = false;
            }, 1000); // only throw every 1000ms 1 bottle
        }
    }

    checkCollisions() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (this.character.isOverEnemy(enemy) && !enemy.isDead()) {
                enemy.isInDanger = true;
            } else if (this.character.isColliding(enemy) && enemy.isInDanger) {
                enemy.kill(this.level);
                this.character.audios.chicken_kill_sound.play();
                this.character.jump();
                break;
            } else if (this.character.isColliding(enemy) && !this.character.isDead() && !enemy.isDead()) {
                this.character.hit();
                this.character.audios.get_damage_sound.play();
                this.statusBarHealth.setPercentage(this.character.energy);
            } else {
                enemy.isInDanger = false;
            }
        };
        this.level.pickables.forEach((item) => {
            if (this.character.isColliding(item)) {
                this.character.addToInventory(item.NAME);
                this.level.pickables.splice(this.level.pickables.indexOf(item), 1);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.pickables);
        this.addToMap(this.character);

        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);

        // draw() wird dauerhaft aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(obj) {
        obj.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        mo.x = mo.x * -1;
        this.ctx.scale(-1, 1);
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    getBackrounds() {
        let backgrounds = [];
        for (let i = 0; i < 10; i++) {
            backgrounds.push(new BackgroundObject('img/5_background/layers/air.png', 719 * (i - 2)));
            backgrounds.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * (i - 2)));
            backgrounds.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * (i - 2)));
            backgrounds.push(new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * (i - 2)));
            backgrounds.push(new BackgroundObject('img/5_background/layers/air.png', 719 * (i - 1)));
            backgrounds.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * (i - 1)));
            backgrounds.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * (i - 1)));
            backgrounds.push(new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * (i - 1)));
            i++;
        }
        return backgrounds;
    }
}