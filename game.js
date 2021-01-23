console.log('FLAPPY BIRD - Sheylong')

const sprites = new Image();
sprites.src='./sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const dimensionX = canvas.width
const dimensionY = canvas.height

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    draw() {
        context.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.width, flappyBird.height,
            flappyBird.x, flappyBird.y,
            flappyBird.width, flappyBird.height,
        );
    },
}

const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 112,
    draw() {
        context.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.height,
            floor.x, floor.y,
            dimensionX, floor.height,
        );
    },
}


const background = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: canvas.height - 204,
    draw() {
        context.fillStyle = '#5c96ff'
        context.fillRect(0, 0, dimensionX, dimensionY)
        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            background.x, background.y,
            dimensionX, background.height,
        );
        
    },
}


function loop() {
    
    background.draw();
    floor.draw();
    flappyBird.draw();

    requestAnimationFrame(loop);
}

loop();