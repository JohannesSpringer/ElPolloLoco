class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 150;
    width = 100;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * draw image to canvas - log error if img not available
     * @param {canvas} ctx 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.warn('Could not load image', e);
            console.log('Error image: ', this.img);
        }
    }

    // draw frame to check img size - only for debugging
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // draw frame to check hitbox - only for debugging
    drawSmallFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof PickableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    /**
     * 
     * @param {JSON} arr - ['img/image1.png', 'img/image2.png', ...] 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }
}