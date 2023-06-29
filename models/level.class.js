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
        this.placeCloudsInLevel();
    }

    /**
     * place enemies randomly on map between character and endboss
     * place endboss to end of level
     */
    placeEnemiesInLevel() {
        this.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.x = this.level_end_x - enemy.width;
            } else {
                enemy.x = 500 + Math.random() * (level_end_x - 900 - 270); // 270 is width of endboss
            }
        });
    }

    /**
     * place items randomly on map between character and endboss
     */
    placeItemsInLevel() {
        this.pickables.forEach(item => {
            item.x = 400 + Math.random() * (level_end_x - 800 - 270); // 270 is width of endboss
        });
    }

    /**
     * place clouds in horizontal row every 720px
     */
    placeCloudsInLevel() {
        for (let i = 0; i < this.clouds.length; i++) {
            const cloud = this.clouds[i];
            cloud.x = 100 + i * 720;
        }
    }
}