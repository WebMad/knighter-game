import Unit from "./Unit.js";

export default class Player extends Unit {
    constructor(name) {
        super();
        this.name = name;
        this.hp = 100;
        this.mp = 100;
        this.kills = 0;
        this.x = 0;
        this.y = 0;
        this.isAttack = false;

        this.animation = {
            state: 'idle',
            position: 1,
            zoom: 0.3,
            way: 'right', //left
            idle: {
                url: 'assets/img/game/player/idle',
                ext: '.png',
                countFrame: 18,
                width: 1068,
                height: 1265,
            },
            run: {
                url: 'assets/img/game/player/run',
                ext: '.png',
                countFrame: 17,
                width: 1372,
                height: 1347,
            },
            attack: {
                url: 'assets/img/game/player/attack1',
                ext: '.png',
                countFrame: 21,
                width: 1965,
                height: 1265,
            }
        };

        this.frames = {
            idle: {},
            run: {},
            attack: {},
        };
        this.setIntervals();
        this.loadFrames();
    }

    setIntervals() {
        setInterval(() => {
            if (this.animation.position + 1 <= this.animation[this.animation.state].countFrame) {
                this.animation.position++;
            } else {
                if (this.animation.state === 'attack') {
                    this.isAttack = false;
                }
                this.animation.position = 1;
            }
        }, 80);
    }

    getFrame() {
        let animation = this.animation[this.animation.state];
        return {
            frame: this.frames[this.animation.state][this.animation.position],
            width: animation.width * this.animation.zoom,
            height: animation.height * this.animation.zoom,
        };
    }

    loadFrames() {
        let states = ['idle', 'run', 'attack'];
        $.each(states, (key, value) => {
            let frame;
            let animationState = this.animation[value];
            for (let i = this.animation.position; this.animation[value].countFrame >= i; i++) {
                frame = new Image();
                frame.src = animationState.url + i + animationState.ext;
                frame.onload = function () {
                };
                this.frames[value][i] = frame;
                console.log(frame.src);
            }
            this.animation.position = 1;
        });
    }

    setState(state) {
        switch (state) {
            case 'idle':
                if (this.animation.state !== 'idle') {
                    this.animation.state = 'idle';
                    this.animation.position = 1;
                }
                break;
            case 'run':
                if (this.animation.state !== 'run') {
                    this.animation.state = 'run';
                    this.animation.position = 1;
                }
                break;
            case 'attack':
                if (this.animation.state !== 'attack') {
                    this.animation.state = 'attack';
                    this.animation.position = 1;
                }
                break;
        }
    }

    move(x = 0, y = 0) {
        this.x += x;
        this.y += y;
    }

}