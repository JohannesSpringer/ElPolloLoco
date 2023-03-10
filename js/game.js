let canvas;
let canvasHeight;
let world;

function init() {
    canvas = document.getElementById('canvas');
    canvasHeight = canvas.height;
    console.log(canvasHeight);
    world = new World(canvas);
    ctx = canvas.getContext('2d');

    console.log('My Character is', world.character);
}