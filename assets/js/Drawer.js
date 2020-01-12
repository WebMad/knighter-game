export default class Drawer {
    constructor(ctx) {
        this.ctx = ctx;
        this.backroundImg = new Image();
        this.backroundImg.src = 'img/bg-game.png';
    }

    draw() {
        let canvas = $('canvas')
        this.ctx.clearRect(0, 0, canvas.width(), canvas.height());
        this.drawBackground();
    }

    drawBackground() {
        this.ctx.drawImage();
    }
}