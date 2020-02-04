import { detec } from './Detection.js';

export default class Brick {

    constructor(game,position) {
        this.image = document.getElementById("brick");


        this.game = game;

        this.position = position;
        this.width = 80;
        this.height = 24;

        this.marked = false;
    }

    update() {
        if(detec(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;

            this.marked = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }

}