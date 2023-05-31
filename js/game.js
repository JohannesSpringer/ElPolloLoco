let canvas;
let canvasHeight;
let world;
let menu;
let keyboard = new Keyboard();
let intro_sound = new Audio('./audio/intro.mp3');

function init() {
    renderStartScreen();
    canvas = document.getElementById('canvas');
    canvasHeight = canvas.height;
    ctx = canvas.getContext('2d');
    // todo: play intro at first click on page - deactivated by chrome 66
    setTimeout(playIntro(), 2000);
}

function renderStartScreen() {
    let screen = document.getElementById('startScreen');
    screen.innerHTML = `
        <img src="./img/9_intro_outro_screens/start/startscreen_1.png" alt="">

        <div class="controls-button" onclick="showControls()">CONTROLS</div>
        <div class="start-button" onclick="createWorld()">START</div>
        <div class="options-button" onclick="showOptions()">OPTIONS</div>`;
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

function showControls() {
    let screen = document.getElementById('startScreen');
    screen.innerHTML = '<img src="./img/9_intro_outro_screens/start/startscreen_1.png" alt="">';
    screen.innerHTML += `
        <div class="controls">
            <div class="close-controls" onclick="closeControls()">
                <img src="./img/icons/x-mark-48.png" alt="">
            </div>
            <div class="controls-info">
                <div class="controls-item">
                    <img src="./img/icons/arrow-8-48.png" alt="">
                </div>
                <div class="controls-description">
                    Move right
                </div>
            </div>
            <div class="controls-info">
                <div class="controls-item">
                    <img src="./img/icons/arrow-66-48.png" alt="">
                </div>
                <div class="controls-description">
                    Move left
                </div>
            </div>
            <div class="controls-info">
                <div class="controls-item">
                    SPACE
                </div>
                <div class="controls-description">
                    Jump
                </div>
            </div>
            <div class="controls-info">
                <div class="controls-item">
                    STRG
                </div>
                <div class="controls-description">
                    Throw bottle
                </div>
            </div>
        </div>`;
}

function closeControls() {
    renderStartScreen();
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