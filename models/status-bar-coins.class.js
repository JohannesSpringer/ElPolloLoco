class StatusBarCoins extends StatusBarHealth {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 200;
        this.y = 10;
        this.height = 50;
        this.width = 180;
        this.setPercentage(0);
    }
}