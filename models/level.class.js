class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x;

    constructor(enemies, clouds, backgroundObjects, level_end_x) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
        this.setEndbossToEndOfLevel();
    }

    setEndbossToEndOfLevel() {
        this.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.x = this.level_end_x - enemy.width;
            } else {
                enemy.x = 400 + Math.random() * (level_end_x - 400);
            }
        });
    }
}