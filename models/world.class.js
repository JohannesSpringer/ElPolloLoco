class World {
    character = new Character();
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
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

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
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            mo.x = mo.x * -1;
            this.ctx.scale(-1, 1);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        this.ctx.beginPath();
        this.ctx.lineWidth = '5';
        this.ctx.strokeStyle = 'blue';
        this.ctx.rect(mo.x, mo.y, mo.x + mo.width + this.camera_x, mo.y + mo.height);
        this.ctx.stroke();

        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
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