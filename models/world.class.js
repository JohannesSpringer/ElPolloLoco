class World {
    character = new Character();
    statusBarHealth = new StatusBarHealth();
    StatusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.CTRL) {
            let bottle = new ThrowableObject(this.character.x + 90, this.character.y + 130);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isOverEnemy(enemy) && !enemy.isDead()) {
                enemy.isInDanger = true;
            } else if (this.character.isColliding(enemy) && enemy.isInDanger) {
                enemy.kill(this.level);
                this.character.jump();
            } else if (this.character.isColliding(enemy) && !this.character.isDead() && !enemy.isDead()) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
             } else {
                enemy.isInDanger = false;
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.StatusBarCoins);
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
        mo.drawFrame(this.ctx);

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