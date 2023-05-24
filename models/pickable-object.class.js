class PickableObject extends DrawableObject {
    currentImage = 0;
    NAME;

    IMAGES = [];

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    constructor(value) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');

        this.NAME = value;
        this.chooseItem();
    }

    chooseItem() {
        if (this.NAME == 'coin') {
            this.IMAGES = this.IMAGES_COIN;
            this.loadImage('img/8_coin/coin_1.png');
            this.height = 120;
            this.width = 120;
            this.y = 100;
            // this.animate();
        }
        else if (this.NAME == 'bottle') {
            this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
            this.height = 80;
            this.width = 80;
            this.y = 350;
        }
        else (console.log('Wrong property for pickable Object'));
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES.length;
            let path = this.IMAGES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 50);
    }

    // setImages(val) {
    //     console.log(val);
    //     if (val == 'coin') this.IMAGES = this.IMAGES_COIN;
    //     else if (val == 'bottle') this.IMAGES = this.IMAGES_BOTTLE;
    //     else (console.log('Wrong property for pickable Object'));
    // }
}