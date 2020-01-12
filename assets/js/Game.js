import Player from "./Player.js";
import Background from "./Background.js";

export default class Game {
    constructor() {
        let body = $('body');
        this.canvas = $('<canvas>', {id: 'canvas'}).appendTo('#screen_game');
        this.ctx = this.canvas[0].getContext('2d');

        document.onkeydown = (e) => {
            if (e.code === 'ArrowRight') {
                this.controls.rightBtn();
            } else if (e.code === 'ArrowLeft') {
                this.controls.leftBtn();
            }
        };
        document.onkeyup = (e) => {
            if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
                this.controls.stop();
            }
        };

        document.onclick = (e) => {
            this.controls.leftMouse();
        };

        this.background = new Background();

        this.canvas[0].width = body.width();
        this.canvas[0].height = body.height();
    }

    start(playerName) {
        this.player = new Player(playerName);
        this.controls = new Controls(this.player);
        console.log(1);
        console.log(this.ctx);
        this.drawer = new Drawer(this.ctx, this.canvas, this.player, this.background);
        setInterval(() => {
            this.drawer.draw();
            this.move();
        }, 1000 / 60);
    }

    move() {
        if (!this.player.isAttack) {
            let center_canvas = (this.canvas.width() - this.player.getFrame().width) / 2;
            if (this.controls.right && (this.player.x - this.background.offsetX + this.player.animation.idle.width * this.player.animation.zoom) < this.background.width) {
                this.player.setState('run');
                console.log((this.canvas.width() - this.background.offsetX) < this.background.width);
                if (this.player.x < center_canvas ||
                    (this.canvas.width() - this.background.offsetX) >= this.background.width
                ) {
                    this.player.move(5);
                } else {
                    this.background.move(-5);
                }
            } else if (this.controls.left && this.player.x >= 0) {
                this.player.setState('run');
                if (this.player.x >= center_canvas ||
                    (this.background.offsetX + center_canvas) > this.background.width ||
                    this.background.offsetX >= 0) {
                    this.player.move(-5);
                } else {
                    this.background.move(5);
                }
            } else {
                this.player.setState('idle');
            }
        } else {
            this.player.setState('attack');
        }
    }
}

class Drawer {
    constructor(ctx, canvas, player, background) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.player = player;
        this.background = background;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width(), this.canvas.height());
        this.drawBackground();
        this.drawPlayer();
    }

    drawBackground() {
        let frame_info = this.background.getFrame();
        this.ctx.drawImage(frame_info.frame, frame_info.x, frame_info.y, frame_info.width, frame_info.height);
    }

    drawPlayer() {
        let frame_info = this.player.getFrame();
        let x = this.player.x;
        let y = this.player.y;

        if (this.player.animation.state === 'attack') {
            if (this.player.animation.way === 'right') {
                x -= 62;
            } else {
                x -= 206;
            }
        }

        if (this.player.animation.way === 'right') {
            this.ctx.drawImage(frame_info.frame, x, y, frame_info.width, frame_info.height);
        } else {
            this.ctx.save();
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(frame_info.frame, -x, y, -frame_info.width, frame_info.height);
            this.ctx.restore();
        }
    }
}

class Controls {

    constructor(player) {
        this.left = false;
        this.right = false;
        this.player = player;
    }

    stop() {
        this.left = false;
        this.right = false;
    }

    leftMouse() {
        if (!this.player.isAttack) {
            this.player.isAttack = true;
        }
    }

    leftBtn() {
        if (!this.player.isAttack) {
            this.left = true;
            this.right = false;
            this.player.animation.way = 'left';
        }
    }

    rightBtn() {
        if (!this.player.isAttack) {
            this.right = true;
            this.left = false;
            this.player.animation.way = 'right';
        }
    }
}