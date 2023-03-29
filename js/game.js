let canvas;
let canvasHeight;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    canvasHeight = canvas.height;
    console.log(canvasHeight);
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');

    console.log('My Character is', world.character);
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 17) keyboard.CTRL = true;
    if (event.keyCode == 32) keyboard.SPACE = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 68) keyboard.D = true;
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 17) keyboard.CTRL = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 68) keyboard.D = false;
});