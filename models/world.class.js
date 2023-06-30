class World {
    intervals = [];
    character = new Character();
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    throwableObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwedBottle;
    bottleInAir = false;
    audios = {};
    end_screen = new DrawableObject();
    level;
    animationFrame;
    runInt;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.level = initLvl();
        this.draw();
        this.setWorld();
        this.setLevelMaxItems();
        this.addAudios();
        this.run();
        this.addIntervalsToArray();
    }

    /**
     * set world variable to access it in character class
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * check how many items are created in level
     */
    setLevelMaxItems() {
        this.level.pickables.forEach((item) => {
            if (item.NAME == 'bottle') this.character.MAX_BOTTLES++;
            else if (item.NAME == 'coin') this.character.MAX_COINS++;
        });
    }

    /**
     * add intervals to array
     */
    addIntervalsToArray() {
        this.character.intervals.forEach((int) => {
            this.intervals.push(int);
        });
    }

    /**
     * run playing code
     */
    run() {
        this.runInt = setInterval(() => {
            this.checkEndboss();
            this.toggleAudios();
            this.checkCharacater();
            this.checkCollisions();
            this.checkItemsToPick();
            this.checkThrowObjects();
        }, 100);
        this.intervals.push(this.runInt);
    }

    /**
     * add audios to global array
     */
    addAudios() {
        Object.keys(this.character.audios).forEach(key => {
            this.audios[key] = this.character.audios[key];
        });
    }

    /**
     * toggle sound mute / unmuted in gameplay
     */
    toggleAudios() {
        if (muted) {
            Object.keys(this.audios).forEach(key => {
                this.audios[key].muted = true;
            });
        } else {
            Object.keys(this.audios).forEach(key => {
                this.audios[key].muted = false;
            });
        }
    }

    /**
     * check energy of character
     */
    checkCharacater() {
        if (this.character.isDead()) {
            setTimeout(() => {
                this.clearLevel();
                this.showGameOver();
            }, 1000);
        }
    }

    /**
     * check endboss status and set imgId for special situations to animate other movements
     */
    checkEndboss() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                if (this.character.x < enemy.x - 500) enemy.imgId = 'walk';
                if (this.character.x > enemy.x - 500) enemy.imgId = 'alert';
                if (this.character.x > enemy.x - 400) enemy.attack();
                if (enemy.isDead()) {
                    enemy.imgId = 'dead';
                    this.gameVictory();
                } else if (this.throwedBottle != undefined) {
                    this.endbossShot(enemy);
                }
            }
        });
    }

    /**
     * animate endboss hit and bottle splash
     * @param {Endboss} e 
     */
    endbossShot(e) {
        if (e.endbossIsHitByBottle(this.throwedBottle)) {
            e.hitEndboss();
            this.throwedBottle.imgId = 'splash';
            this.showEndbossHitAnimation();
        }
    }

    /**
     * show game victory
     */
    gameVictory() {
        setTimeout(() => {
            this.clearLevel();
            this.showWin();
        }, 500);
    }

    /**
     * animate endboss hit
     */
    showEndbossHitAnimation() {
        setTimeout(() => {
            clearInterval(this.throwedBottle.interval);
            clearInterval(this.throwedBottle.intervalGravity);
            this.throwableObjects.splice(0, 1);
            this.throwedBottle = undefined;
        }, 90);
    }

    /**
     * check if item can be picked from character
     */
    checkItemsToPick() {
        this.level.pickables.forEach((item) => {
            if (this.character.isColliding(item)) {
                this.character.addToInventory(item.NAME);
                this.level.pickables.splice(this.level.pickables.indexOf(item), 1);
            }
        });
    }

    /**
     * throw bottles - minimum 500ms waiting time to throw next
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.inventory['bottle'] > 0 && !this.bottleInAir) {
            this.throwedBottle = new ThrowableObject(this.character.x + 90, this.character.y + 130, this.character.otherDirection);
            this.throwableObjects.push(this.throwedBottle);
            this.character.inventory['bottle']--;
            this.statusBarBottles.setPercentage(this.character.inventory['bottle'] / this.character.MAX_BOTTLES * 100);
            this.bottleInAir = true;
            setTimeout(() => {
                this.bottleInAir = false;
            }, 500); // only throw every 500ms 1 bottle
        }
    }

    /**
     * 
     * @returns collision between character and enemy
     */
    checkCollisions() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (this.character.isOverEnemy(enemy) && !enemy.isDead()) {
                enemy.isInDanger = true;
            } else if (this.character.isColliding(enemy) && enemy.isInDanger) {
                this.killEnemy(enemy);
                return;
            } else if (this.character.isColliding(enemy) && !this.character.isDead() && !enemy.isDead()) {
                this.hitCharacter();
            } else {
                enemy.isInDanger = false;
            }
        };
    }

    /**
     * character get damage and play sound and set health status bar img
     */
    hitCharacter() {
        this.character.hit();
        this.character.audios.get_damage_sound.play();
        this.statusBarHealth.setPercentage(this.character.energy);
    }

    /**
     * delete specific enemy and play kill sound and let character jump again
     * @param {Object} e 
     */
    killEnemy(e) {
        e.kill(this.level);
        this.character.audios.chicken_kill_sound.play();
        this.character.jump();
    }

    /**
     * draw all objects to canvas and call it in loop
     */
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
        this.animationFrame = requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * add object array to canvas
     * @param {Object} obj 
     */
    addObjectsToMap(obj) {
        obj.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * add single object to map and check direction
     * @param {MovableObject} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * flip image to other x direction
     * @param {} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        mo.x = mo.x * -1;
        this.ctx.scale(-1, 1);
    }

    /**
     * flip image back in x direction
     * @param {Object} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * load backgrounds images
     * @returns background object images
     */
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

    /**
     * delete items and enemies after victory / loss
     */
    clearLevel() {
        this.level.enemies.splice(0, this.level.enemies.length);
        this.level.pickables.splice(0, this.level.pickables.length);
    }

    /**
     * clear all intervals from world
     */
    clearAllIntervals() {
        this.intervals.forEach((i) => {
            clearInterval(i);
        });
    }

    /**
     * show game over screen in canvas
     */
    showGameOver() {
        this.prepareForEndScreen('./img/9_intro_outro_screens/game_over/oh no you lost!.png');
        document.getElementById('muteButton').innerHTML = '';
    }

    /**
     * show win screen in canvas
     */
    showWin() {
        this.prepareForEndScreen('./img/icons/medal.png');
        document.getElementById('muteButton').innerHTML = '';
    }

    /**
     * finish world animations and intervals - go back to start screen
     * @param {} img 
     */
    prepareForEndScreen(img) {
        cancelAnimationFrame(this.animationFrame);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.confEndScreen(img);
        this.clearAllIntervals();
        this.changeScreen();
    }

    /**
     * reset canvas and place end screen img in canvas
     * @param {img} img 
     */
    confEndScreen(img) {
        this.end_screen.loadImage(img);
        this.end_screen.width = this.canvas.width;
        this.end_screen.height = this.canvas.height;
        this.end_screen.x = 0;
        this.end_screen.y = 0;
        this.end_screen.draw(this.ctx);
        document.getElementById('ingame-controls').style.display = 'none';
    }

    /**
     * change screen from canvas to start screen
     */
    changeScreen() {
        setTimeout(() => {
            document.getElementById('startScreen').style.display = 'block';
            document.getElementById('canvas').style.display = 'none';
        }, 3000);
    }
}