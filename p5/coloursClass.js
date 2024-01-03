// let ccbg = [];
// let ccsun = [];
// let ccstars = [];
// let ccHighlight = [];
// let ccR;
// let ccG;
// let ccB;

class Colours {
    constructor(initial) {

        // this.normalSphere = initial.normalSphere;
        // this.gradient = initial.gradient;

        this.counter = 0;

        this.bg = color(5);
        this.sun = color(255, 255, 255);
        this.stars = color(255, 255, 255);
        this.highlight = 255;
        this.alpha = 20;
        this.alphaReset = 20;
        this.R = 255;
        this.G = 255;
        this.B = 255;

        this.mono = {
            bg: color(5),
            sun: color(255, 255, 255),
            stars: color(255, 255, 255),
            highlight: 255,
            alpha: 15,
            alphaReset: 15,
            R: 255,
            G: 255,
            B: 255,
        }

        this.red = {
            bg: color(0, 0, 0),
            sun: color(0, 0, 0),
            stars: color(175, 100, 0),
            highlight: 255,
            alpha: 25,
            alphaReset: 25,
            R: 240,
            G: 85,
            B: 50
        }

        this.purple = {
            bg: color(65, 23, 85),
            sun: color(0, 0, 0),
            stars: color(200),
            highlight: 255,
            alpha: 15,
            alphaReset: 15,
            R: 130,
            G: 81,
            B: 255
        }

        this.blue = {
            bg: color(1, 22, 64),
            sun: color(0, 0, 0),
            stars: color(255),
            highlight: 255,
            alpha: 15,
            alphaReset: 15,
            R: 255,
            G: 50,
            B: 255
        }

        this.orange = {
            bg: color(217, 70, 37),
            sun: color(0, 0, 0),
            stars: color(255),
            highlight: 255,
            alpha: 20,
            alphaReset: 20,
            R: 255,
            G: 255,
            B: 255
        }

        this.palettes = [this.mono, this.red, this.blue, this.purple, this.orange];
        shuffle(this.palettes);
        // this.active(this.palettes[0]);
;

    }

    // active(target) {
    //     this.bg = target.bg;
    //     this.sun = target.sun;
    //     this.stars = target.stars;
    //     this.highlight = target.highlight;
    //     this.alpha = target.alpha;
    //     this.alphaReset = target.alphaReset;
    //     this.R = target.R;
    //     this.G = target.G;
    //     this.B = target.B;
    // }

    transition(next) {
        this.bg = lerpColor(this.bg, next.bg, 0.03);
        this.sun = lerpColor(this.sun, next.sun, 0.03);
        this.stars = lerpColor(this.stars, next.stars, 0.03);
        this.highlight = lerp(this.highlight, next.highlight, 0.03);
        // this.alpha = lerp(this.alpha, next.alpha, 0.05);
        // this.alphaReset = lerp(this.alphaReset, next.alphaReset, 0.05);
        // this.alpha = next.alpha;
        // this.alphaReset = next.alphaReset;
        this.R = lerp(this.R, next.R, 0.03);
        this.G = lerp(this.G, next.G, 0.03);
        this.B = lerp(this.B, next.B, 0.03);
    }

    fadeout(timer) {
        if (timer >= 5) {
            this.alpha += -0.02;
        }
        else { this.alpha = 20 }
        // if (cc.alpha <= 0) {
        //     return true;
        // } return false;
    }

    colourChange() {
        // if (planets.length == 3) {
        //     // this.transition(this.mono, this.red);
        //     this.active(this.palettes[1])
        // } if (planets.length >= 6) {
        //     // this.transition(this.red, this.mono);
        //     this.active(this.palettes[2])
        // } if (planets.length >= 9) {
        //     // this.transition(this.red, this.mono);
        //     this.active(this.palettes[3])
        // }

        // if (cam.counter = 5000) {
        // if (planets.length <= 2) {
        //     this.transition(this.mono);
        // }
        if (colVal) {
            if (this.counter < 20) {
                this.transition(this.palettes[0]);
            }

            if (this.counter >= 20 && this.counter < 40) {
                this.transition(this.palettes[1]);
            }

            if (this.counter >= 40 && this.counter < 60) {
                this.transition(this.palettes[2]);
            }

            if (this.counter >= 60 && this.counter < 80) {
                this.transition(this.palettes[3]);
            }

            if (this.counter >= 80 && this.counter < 100) {
                this.transition(this.palettes[4]);
            }

            // if (mouseReleased()) {
            //     this.alpha += -1;
            // }
            // // shuffle(this.palettes);
            // this.transition(this.palettes[1]);
        }

        if (this.counter >= 100) {
            this.counter = 0
        }
        // console.log(this.counter);
    }
}
