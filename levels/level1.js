let level1;

function initLvl() {
    return level1 = new Level(
        getEnemies(),
        getPickables(),
        getClouds(),
        getBackrounds(),
        level_end_x = 5100
    )
};

function getBackrounds() {
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

function getEnemies() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss()
    ];
}

function getPickables() {
    return [
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('coin'),
        new PickableObject('bottle'),
        new PickableObject('bottle'),
        new PickableObject('bottle'),
        new PickableObject('bottle'),
        new PickableObject('bottle'),
        new PickableObject('bottle'),
        new PickableObject('bottle'),
        new PickableObject('bottle')
    ];
}

function getClouds() {
    return [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ];
}