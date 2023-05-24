class Level {
    enemies;
    pickables;
    clouds;
    backgroundObjects;
    level_end_x;

    constructor(enemies, pickables, clouds, backgroundObjects, level_end_x) {
        this.enemies = enemies;
        this.pickables = pickables;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
        this.placeEnemiesInLevel();
        this.placeItemsInLevel();
    }

    placeEnemiesInLevel() {
        this.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.x = this.level_end_x - enemy.width;
            } else {
                enemy.x = 400 + Math.random() * (level_end_x - 400 - 270); // 270 is width of endboss
            }
        });
    }

    placeItemsInLevel() {
        this.pickables.forEach(item => {
            item.x = 400 + Math.random() * (level_end_x - 400 - 270); // 270 is width of endboss
        });
    }
}