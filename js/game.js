let canvas;
let canvasHeight;
let world;
let menu;
let keyboard = new Keyboard();
let intro_sound = new Audio('./audio/intro.mp3');

function init() {
    canvas = document.getElementById('canvas');
    canvasHeight = canvas.height;
    // menu = new Menu(canvas);
    // world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    // setTimeout(playIntro(), 1000);
    playIntro();

    // console.log('My Character is', world.character);
}

function playIntro() {
    intro_sound.play();
}

function createWorld() {
    world = new World(canvas, keyboard);
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'unset';
    intro_sound.pause();
    intro_sound.currentTime = 0;
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