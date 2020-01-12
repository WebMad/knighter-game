export default class Background {

    constructor() {
        this.backgroundImage = new Image();
        this.backgroundImage.src = 'assets/img/bg-game.png';
        this.backgroundImage.onload = () => {
            this.width = this.backgroundImage.width;
            this.height = this.backgroundImage.height;
        };

        this.offsetX = 0;
        this.offsetY = 0;
    }

    move(x = 0, y = 0) {
        this.offsetX += x;
        this.offsetY += y;
    }

    getFrame() {
        return {
            frame: this.backgroundImage,
            width: this.width,
            height: this.height,
            x: this.offsetX,
            y: this.offsetY,
        };
    }
}