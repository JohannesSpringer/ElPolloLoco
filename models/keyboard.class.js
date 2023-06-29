class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    CTRL = false;
    D = false;

    constructor() {
        this.bindKeyPressEvents();
    }

    bindBtsPressEvents() {
        this.keyLeft();
        this.keyRight();
        this.keySpace();
        this.keyD();
    }

    keyLeft() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
    }

    keyRight() {
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
    }

    keySpace() {
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
    }

    keyD() {
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });

        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }

    bindKeyPressEvents() {
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
    }
}