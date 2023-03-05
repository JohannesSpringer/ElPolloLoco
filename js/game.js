let canvas;
let ctx;
let character = new Image();

function init() {
    canvas = document.getElementById('');
    ctx = canvas.getContext('2d');
    character.src = '../img/2_character_pepe/2_walk/W-21.png';

    ctx.drawImage(character, 50, 50, 50, 100);
}