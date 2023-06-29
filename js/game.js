let canvas;
let canvasHeight;
let keyboard = new Keyboard();
let menu;
let audios = {
    intro_sound: new Audio('./audio/intro.mp3')
};
let muted = false;
let world;
let muteIds = [
    'audioImg',
    'audioImgIngame'
];

function init() {
    renderStartScreen();
    canvas = document.getElementById('canvas');
    canvasHeight = canvas.height;
    ctx = canvas.getContext('2d');
    audios.intro_sound.volume = 0.1;
    // Add eventListener for smartphone buttons
    keyboard.bindBtsPressEvents();
    setTimeout(playIntro(), 1500);
}

function renderStartScreen() {
    let screen = document.getElementById('startScreen');
    screen.innerHTML = `
        <img src="./img/9_intro_outro_screens/start/startscreen_1.png" alt="">
        <div class="wrapper">
            <div class="controls-button" onclick="showControls()">CONTROLS</div>
            <div class="start-button" onclick="createWorld()">START</div>
            <div class="options-button" onclick="showSettings()">SETTINGS</div>
        </div>`;
}

function playIntro() {
    audios.intro_sound.play();
}

function createWorld() {
    world = new World(canvas, keyboard);
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'unset';
    document.getElementById('ingame-controls').style.display = 'flex';
    renderMuteButton();
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
                    D
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
                    ${checkActiveMuteSettings()}
                </div>
                <div class="controls-description">
                    Sounds
                </div>
            </div>
        </div>`;
}

function renderMuteButton() {
    document.getElementById('muteButton').innerHTML = checkActiveMuteSettings();
}

function checkActiveMuteSettings() {
    if (muted) {
        return `<img id="audioImg" src="./img/icons/mute-2-48.png" alt="" style="cursor: pointer" onclick="toggleAudio()"></img>`;
    } else {
        return `<img id="audioImg" src="./img/icons/speaker-48.png" alt="" style="cursor: pointer" onclick="toggleAudio()"></img>`;
    }
}

function toggleAudio() {
    if (muted) {
        muteIds.forEach(id => {
            try {document.getElementById(id).src = './img/icons/speaker-48.png'}
            catch(err) {return}
        });
    }
    else {
        muteIds.forEach(id => {
            try {document.getElementById(id).src = './img/icons/mute-2-48.png'}
            catch(err) {return}
        });
    }
    toggleMuteAudios();
}



function toggleMuteAudios() {
    Object.keys(audios).forEach(key => {
        audios[key].muted = !muted;
    });
    muted = !muted;
}