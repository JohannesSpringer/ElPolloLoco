class Character extends MovableObject{
    height = 1200 / 4;
    width = 610 / 4;
    x = 60;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');

        this.y = canvasHeight - this.height - 48;
    }

    jump() {

    }
}