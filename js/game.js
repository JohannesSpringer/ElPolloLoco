let canvas;
let canvasHeight;
let world;
let menu;
let keyboard = new Keyboard();
// let intro_sound = new Audio('./audio/intro.mp3');
let audios = {
    intro_sound : new Audio('./audio/intro.mp3')
};
let muted = false;

function init() {
    renderStartScreen();
    canvas = document.getElementById('canvas');
    canvasHeight = canvas.height;
    ctx = canvas.getContext('2d');
    audios.intro_sound.volume = 0.1;
    // todo: play intro at first click on page - deactivated by chrome 66
    setTimeout(playIntro(), 1500);
}

function renderStartScreen() {
    let screen = document.getElementById('startScreen');
    screen.innerHTML = `
        <img src="./img/9_intro_outro_screens/start/startscreen_1.png" alt="">

        <div class="controls-button" onclick="showControls()">CONTROLS</div>
        <div class="start-button" onclick="createWorld()">START</div>
        <div class="options-button" onclick="showSettings()">SETTINGS</div>`;
}

function playIntro() {
    audios.intro_sound.play();
}

function createWorld() {
    // await delete(world);
    deleteWorldProperties();
    console.log('World löschen', world);
    world = new World(canvas, keyboard, muted);
    console.log('World generiert', world);
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'unset';
    audios.intro_sound.pause();
    audios.intro_sound.currentTime = 0;
}

function deleteWorldProperties() {
    if (world == undefined) return;
    Object.keys(world).forEach(property => {
        delete world[property];
    });
}

function showControls() {
    let screen = document.getElementById('startScreen');
    screen.innerHTML = '<img src="./img/9_intro_outro_screens/start/startscreen_1.png" alt="">';
    screen.innerHTML += `
        <div class="controls">
            <div class="close-controls" onclick="renderStart()">
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

function renderStart() {
    renderStartScreen();
}

function showSettings() {
    let screen = document.getElementById('startScreen');
    screen.innerHTML = '<img src="./img/9_intro_outro_screens/start/startscreen_1.png" alt="">';
    screen.innerHTML += `
        <div class="controls">
            <div class="close-controls" onclick="renderStart()">
                <img src="./img/icons/x-mark-48.png" alt="">
            </div>
            <div class="controls-info">
                <div class="controls-item">
                    ${checkActiveSettings()}
                </div>
                <div class="controls-description">
                    Sounds
                </div>
            </div>
        </div>`;
}

function checkActiveSettings() {
    if (muted) {
        return `<img id="audioImg" src="./img/icons/mute-2-48.png" alt="" style="cursor: pointer" onclick="toggleAudio()"></img>`;
    } else {
        return `<img id="audioImg" src="./img/icons/speaker-48.png" alt="" style="cursor: pointer" onclick="toggleAudio()"></img>`;
    }
}

function toggleAudio() {
    if (muted) document.getElementById('audioImg').src = './img/icons/speaker-48.png';
    else document.getElementById('audioImg').src = './img/icons/mute-2-48.png';
    toggleMuteAudios();
}

function toggleMuteAudios() {
    Object.keys(audios).forEach(key => {
        audios[key].muted = !muted;
    });
    muted = !muted;
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