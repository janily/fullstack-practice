import Game from "./game.js";

let canvas = document.getElementById("stage");
let ctx = canvas.getContext('2d');

//ctx.clearRect(0,0,800,600);  //清除画布

// ctx.fillStyle = '#f00';

// ctx.fillRect(20,20,100,100);
// ctx.fillRect(200,200,50,50);

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH,GAME_HEIGHT);



let lastTime = 0;

function gameLoop(timestamp) {

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;


    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    
    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
