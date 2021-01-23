console.log('FLAPPY BIRD - Sheylong')

const sprites = new Image();
sprites.src='./sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const songsHit =  new Audio();
songsHit.src = './efeitos/hit.wav'

const global = {
    flappyBird: {},
    gravity: 0.25,
    dimensionX: canvas.width,
    dimensionY: canvas.height,
}

function collision(element) {
    const flappyBirdY = global.flappyBird.y + global.flappyBird.height;
    
    if(flappyBirdY >= element.y) return true
    
    return false
}

function createFlappyBird() {
    const flappyBird =  {
        spriteX: 0,
        spriteY: 0,
        width: 33,
        height: 24,
        x: 10,
        y: 50,
        speed: 0,
        jump: 4.6,
        update() {
            if(collision(floor)) {
                songsHit.play();
                setTimeout(1000);
                changeScreen(Screens.home)
            }
            flappyBird.speed = flappyBird.speed + global.gravity
            flappyBird.y = flappyBird.y + flappyBird.speed
        },
        draw() {
            context.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.width, flappyBird.height,
                flappyBird.x, flappyBird.y,
                flappyBird.width, flappyBird.height,
            );
        },
        jumping() {
            flappyBird.speed = -flappyBird.jump; 
        }
    }

    return flappyBird
}

const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: global.dimensionY - 112,
    draw() {
        context.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.height,
            floor.x, floor.y,
            global.dimensionX, floor.height,
        );
    },
}


const background = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: global.dimensionY - 204,
    draw() {
        context.fillStyle = '#5c96ff'
        context.fillRect(0, 0, global.dimensionX, global.dimensionY)
        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            background.x, background.y,
            global.dimensionX, background.height,
        );
        
    },
}

const getReady = {
    spriteX: 134,
    spriteY: 0,
    width: 174,
    height: 152,
    x: (global.dimensionX / 2) - 174 / 2,
    y: 50,
    draw() {
        context.drawImage(
            sprites,
            getReady.spriteX, getReady.spriteY,
            getReady.width, getReady.height,
            getReady.x, getReady.y,
            getReady.width, getReady.height,
        );        
    },
}

const Screens = {
    home: {
        init() {
            global.flappyBird = createFlappyBird()
        },
        draw() {
            background.draw();
            floor.draw();
            getReady.draw();
            global.flappyBird.draw();
        },
        click() {
            changeScreen(Screens.game)
        },
        update() {}
    },
    game: {
        
        draw() {
            background.draw();
            floor.draw();
            global.flappyBird.draw();
        },
        click() {
            global.flappyBird.jumping();
        },
        update() {
            global.flappyBird.update();
        }
    }
    
}

let activeScreen = {};

function changeScreen(newScreen) {
    activeScreen = newScreen;

    if(activeScreen.init) activeScreen.init()
}

function start() {
    activeScreen.draw();
    activeScreen.update();

    requestAnimationFrame(start);
}

window.addEventListener('click', function() {
    if(activeScreen.click) activeScreen.click()
})

changeScreen(Screens.home)
start();