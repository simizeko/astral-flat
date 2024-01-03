// const lfo = new Tone.LFO("4n", 400, 4000);

/////////// mix settings //////////
const master = new Tone.Gain();
const lowEnd = new Tone.Filter(150, 'lowpass');
const limiter = new Tone.Limiter(-10);

const compressor = new Tone.Compressor({
    threshhold: -30,
    ratio: 15,
})

///////////////// effects /////////////////////////
const bowgartFilter = new Tone.Filter({
    frequency: 300,
    type: 'highpass',
    rolloff: -24
});

const autoFilter = new Tone.AutoFilter({
    baseFrequency: 50,
    depth: 0.9,
    frequency: '32n',
    octaves: 5
});
const reverb = new Tone.Reverb({
    decay: 8,
    preDelay: 0.1,
    wet: 0.5,
});
const feedbackDelay = new Tone.FeedbackDelay("8n", 0.75);
const pingPong = new Tone.PingPongDelay({
    delayTime: "4n",
    feedback: 0.35,
    wet: 0.75
});
const widener = new Tone.StereoWidener(0.8);
const monoWide = new Tone.StereoWidener(0);
const autoWah = new Tone.AutoWah(50, 6, -30);
const tremolo = new Tone.Tremolo('16n', 0.75);
const chorus = new Tone.Chorus(4, 1, 0.5);
const cheby = new Tone.Chebyshev({
    order: 4,
    wet: 0.5
});

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

const blurryskies = new Tone.Sampler({
    urls: {
        "C4": "./audio/blurryskiesC3.wav",
        "E4": "./audio/blurryskiesE3.wav",
        "G4": "./audio/blurryskiesG3.wav"
    },
    attack: 0,
    release: 3,
    volume: -5
}).chain(master);

const offworld = new Tone.Sampler({
    urls: {
        "C4": "./audio/offworldswellC3.wav",
        "E4": "./audio/offworldswellE3.wav",
        "G4": "./audio/offworldswellG3.wav"
    },
    attack: 0,
    release: 3,
    volume: -4
}).chain(chorus, master);

const spazio = new Tone.Sampler({
    urls: {
        "C3": "./audio/spaziocreamC3.wav",
        "E3": "./audio/spaziocreamE3.wav",
        "G3": "./audio/spaziocreamG3.wav"
    },
    attack: 0,
    release: 3,
    volume: 0
}).chain(master);

const bowgart = new Tone.Sampler({
    urls: {
        "C3": "./audio/bowgartC1.mp3",
        "E3": "./audio/bowgartE1.mp3",
        "G3": "./audio/bowgartG1.mp3"
    },
    attack: 0,
    release: 3,
    volume: 12
}).chain(bowgartFilter, widener, master);

const basfin = new Tone.Sampler({
    urls: {
        "C3": "./audio/basfin2C3.mp3",
        "E3": "./audio/basfin2E3.mp3",
        "G3": "./audio/basfin2G3.mp3"
    },
    attack: 1,
    release: 0.1,
    volume: -3
    // baseUrl: "./audio",
}).chain(feedbackDelay, master)

const twinkle = new Tone.Sampler({
    urls: {
        "C3": "./audio/twinkleC3.mp3",
        "E3": "./audio/twinkleE3.mp3",
        "G3": "./audio/twinkleG3.mp3"
    },
    attack: 0,
    release: 5,
    volume: 5
    // baseUrl: "./audio",
}).chain(autoWah, reverb, Tone.Destination)

const outspace = new Tone.Sampler({
    urls: {
        "C3": "./audio/outspaceC1.mp3",
        "E3": "./audio/outspaceE1.mp3",
        "G3": "./audio/outspaceG1.mp3"
    },
    attack: 2,
    release: 1,
    volume: 0
    // baseUrl: "./audio",
}).chain(widener, tremolo, master);
// .chain(chorus, cheby, reverb, tremolo, Tone.Destination);

const centralPros = new Tone.Sampler({
    urls: {
        "C3": "./audio/centralprosC0.mp3",
        "E3": "./audio/centralprosE0.mp3",
        "G3": "./audio/centralprosG0.mp3"
    },
    attack: 2,
    release: 12,
    volume: 5
    // velocity: 1
}).chain(pingPong, cheby, Tone.Destination);
// .chain(cheby, reverb, Tone.Destination);

const clockwork = new Tone.Sampler({
    urls: {
        "C3": "./audio/clockworkC3.mp3",
        "E3": "./audio/clockworkE3.mp3",
        "G3": "./audio/clockworkG3.mp3"
    },
    attack: 0,
    release: 2,
    volume: 0
    // velocity: 1
}).chain(Tone.Destination);

const easydoesit = new Tone.Sampler({
    urls: {
        "C4": "./audio/easydoesC3.mp3",
        "E4": "./audio/easydoesE3.mp3",
        "G4": "./audio/easydoesG3.mp3"
    },
    attack: 0,
    release: 3,
    volume: 0
    // velocity: 1
}).chain(Tone.Destination);

const element = new Tone.Sampler({
    urls: {
        "C3": "./audio/elementC2.mp3",
        "E3": "./audio/elementE2.mp3",
        "G3": "./audio/elementG2.mp3"
    },
    attack: 12,
    release: 8,
    volume: 4
    // velocity: 1
}).chain(Tone.Destination);
//.chain(feedbackDelay, autoWah, Tone.Destination);

const absynth = new Tone.Sampler({
    urls: {
        "C3": "./audio/absynthC2.mp3",
        "E3": "./audio/absynthE2.mp3",
        "G3": "./audio/absynthG2.mp3"
    },
    attack: 3,
    release: 3,
    volume: 1
}).chain(chorus, Tone.Destination);

const earthdrone = new Tone.Sampler({
    urls: {
        "C3": "./audio/blackearthdroneC2.mp3",
        "E3": "./audio/blackearthdroneE2.mp3",
        "G3": "./audio/blackearthdroneG2.mp3"
    },
    attack: 0,
    release: 3,
    volume: 5
}).chain(Tone.Destination);

const myhouse = new Tone.Sampler({
    urls: {
        "C3": "./audio/myhouseC2.mp3",
        "E3": "./audio/myhouseE2.mp3",
        "G3": "./audio/myhouseG2.mp3"
    },
    attack: 0,
    release: 3,
    volume: 4
}).chain(feedbackDelay, reverb, Tone.Destination);
// .chain(feedbackDelay, reverb, pingPong, Tone.Destination);

const skotos = new Tone.Sampler({
    urls: {
        "C3": "./audio/skotosC2.mp3",
        "E3": "./audio/skotosE2.mp3",
        "G3": "./audio/skotosG2.mp3"
    },
    attack: 0,
    release: 3,
    volume: -5
}).chain(chorus, monoWide, Tone.Destination);



const pkit = new Tone.Sampler({
    urls: {
        "C3": "./audio/papua7.mp3",
        "D3": "./audio/papua2.mp3",
        "E3": "./audio/papua3.mp3",
        "F#3": "./audio/papua4.mp3",
        "G3": "./audio/papua5.mp3",
        "A3": "./audio/papua6.mp3",
        "B3": "./audio/papua1.mp3",
        "C4": "./audio/papua8.mp3"
    },
    attack: 0,
    release: 3,
    volume: -10,
    // velocity: 0.1
}).chain(tremolo, master);


//////////// MASTER OUT /////////////

master.chain(compressor, Tone.Destination);
// Tone.Destination.chain(); // Master output chain

//////////////////////////////////////


class Sounds {
    constructor(target, targetV) {
        this.target = target
        this.sectorTop = (-height / 2) / 10;
        this.sectorBottom = (height / 2) / 10;

        // if button clicked gridOn = false, else = true
        // this.gridOn = true;
        // this.gridFade = true;
        this.halo;
        this.fadeout = 200;
        // this.size = 1;
        this.startCounter = false;
        this.trigCounter = 0;
        this.trigSize = 0;

        this.notes = [
            ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'],
            ['C3', 'D3', 'D#3', 'F3', 'G3', 'A3', 'A#3', 'C4'],
            ['C3', 'C#3', 'D#3', 'F3', 'G3', 'G#3', 'A#3', 'C4'],
            ['C3', 'D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C4'],
            ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'A#3', 'C4'],
            ['C3', 'D3', 'D#3', 'F3', 'G3', 'G#3', 'A#3', 'C4'],
            ['C3', 'C#3', 'D#3', 'F3', 'F#3', 'G#3', 'A#3', 'C4']
        ];

        this.defineScale = 3;
    }

    // setup() {
    // //     this.angleY = 0;
    // //     this.rot = 0;
    // }

    startAudio() {
        // osc.start();
        // lfo.start();
    }

    // defineScale() {
    //     //  if button pressed return value for scale array
    //     return 0

    //     //  if button pressed return value for scale array
    //     return 1

    //     //  if button pressed return value for scale array
    //     return 2

    //     //  if button pressed return value for scale array
    //     return 3

    // }


    ModeSelect() {
        let modeS = menu.mode.indexOf(modeVal);
        this.defineScale = modeS;
    }

    trigger() {
        if (this.target.pastPosition.x <= 0 && this.target.position.x > 0 && this.target.mass >= 1 && menu.muteAudio === false || this.target.pastPosition.x >= 0 && this.target.position.x < 0 && this.target.mass >= 1 && menu.muteAudio === false) {
            // if (this.target.position.x < 1 && this.target.position.x > - 1 && this.target.mass >= 1 && options.muteAudio === false) {
            // this.visualFeedback(this.target.position.x, this.target.position.y)
            // this.visualFeedback();
            this.startCounter = true;
            // background(255);

            // const instrument = [amSynth, cymbl, tom, duoSynth, pluckSynth];
            // instrument[this.calculateInstrument(this.target.radius)].triggerAttackRelease(notes[this.calculateNote()], 0.2);

            if (menu.midiMode === false) {
                Tone.loaded().then(() => {
                    // const instrument = [bowgart, skotos, absynth, element, centralPros];
                    // const instrument = [bowgart, pkit, absynth, element, centralPros];
                    const instrument = [bowgart, offworld, absynth, element, centralPros, outspace, skotos, twinkle];
                    // const length = [5, 2, 5, 5, 5];

                    // instrument.triggerAttackRelease(notes, duration, time, velocity)
                    // instrument[this.calculateInstrument(this.target.radius)].triggerAttackRelease(this.scale[this.defineScale()], length[this.calculateInstrument(this.target.radius)], Tone.now(), this.calculateVelocity());

                    instrument[this.calculateInstrument(this.target.radius)].triggerAttackRelease(this.notes[this.defineScale][this.calculateNote()], length[this.calculateInstrument(this.target.radius)], Tone.now(), this.calculateVelocity());

                    // basfin.triggerAttackRelease(this.notes[this.calculateNote()], length[this.calculateInstrument(this.target.radius)]);
                    // twinkle.triggerAttackRelease(this.notes[this.calculateNote()], 4, Tone.now(),this.calculateVelocity());
                    // outspace.triggerAttackRelease(notes[this.calculateNote()], 6);
                    // bowgart.triggerAttackRelease(this.notes[this.calculateNote()], 6);

                })
            } else {
                if (midiDevice) {
                    if (midi.outputAllChannels) {
                        let calculateChannel = this.calculateInstrument(this.target.radius) + 1;
                        let output1 = WebMidi.getOutputByName(menu.outputDropdown.selected());
                        let channelOut1 = output1.channels[calculateChannel];
                        channelOut1.playNote(this.notes[this.defineScale][this.calculateNote()], { duration: lengthVal });
                        // channelOut1.stopNote();
                    } else {
                        let output2 = WebMidi.getOutputByName(menu.outputDropdown.selected());
                        let channelOut2 = output2.channels[midi.outputChannel];
                        channelOut2.playNote(this.notes[this.defineScale][this.calculateNote()], { duration: lengthVal });

                    }
                }
            }
        }



        // if (this.target.position.x < 50 && this.target.position.x > - 1 && this.target.mass >= 1 && this.target.position.y < 1) {
        //     this.visTrig = true;
        // }
        // if (this.target.position.x < 1 && this.target.position.x > - 50 && this.target.mass >= 1 && this.target.position.y > -1) {
        //     this.visTrig = true;
        // }

    }

    calculateInstrument(evaluate) {
        if (evaluate <= calculateMass(2)) {
            return 0;
        } if (evaluate <= calculateMass(3)) {
            return 1;
        } if (evaluate <= calculateMass(4)) {
            return 2;
        } if (evaluate <= calculateMass(5)) {
            return 3;
        } if (evaluate <= calculateMass(6)) {
            return 4;
        } if (evaluate <= calculateMass(7)) {
            return 5;
        } if (evaluate <= calculateMass(8)) {
            return 6;
        } if (evaluate > calculateMass(8)) {
            return 7;
        } return false;

    }



    calculateNote() {
        const { x, y } = this.target.position;
        let noteSector = int(map(y, -height / 2, height / 2, - 10, 10));
        let ns = (abs(noteSector) - 1);
        if (ns <= -1) {
            ns = 0
        }
        if (ns >= 8) {
            ns = 7
        }
        // textFont(debug);
        // textSize(24);
        // text(ns, x + 20, y);
        return ns;
    }

    //     const { x, y } = this.target.position;
    //     if (y >= this.sectorTop && y <= this.sectorBottom) {
    //         // return false;
    //     }
    //     let noteSector = int(map(y, -height / 2, height / 2, - 8, 8));
    //     let ns = (abs(noteSector));
    //     if (ns === -1) {
    //         ns = 0
    //     }
    //     textFont(debug);
    //     textSize(24);
    //     text(ns, x + 20, y);
    //     return ns;
    // }

    calculateLength() {
        let noteL = map(this.target.mass, 1, 10, 0.5, 3);
        let nl = constrain(noteL, 0.5, 4);
        // textFont(debug);
        // textSize(24);
        // text(this.target.mass, this.target.position.x + 20, this.target.position.y);
        // text(nl, this.target.position.x + 20, this.target.position.y);
        return nl;

    }


    calculateVelocity() {
        let noteV = round(map(this.target.velocity.mag(), 0, orbitSpeed.c, 0.5, 1), 2);
        let nv = constrain(noteV, 0, 1);
        // textFont(debug);
        // textSize(24);
        // text(nv, this.target.position.x + 20, this.target.position.y);
        // let midiV = round(map(nv, 0.5, 1, 40, 127));
        // text(midiV, this.target.position.x + 20, this.target.position.y);
        return nv;
    }


    grid() {
        const numberOseg = 10;
        const segment = (height / 2) / numberOseg;
        const gapSize = segment * 0.5;
        var maxDiameter = windowHeight / 10;
        if (menu.gridOn) {
            for (let y = 1; y < numberOseg; y++) {
                let currentDiameter = maxDiameter * (numberOseg - y);

                push();
                fill(cc.highlight, cc.alpha * 2.5);
                textAlign(CENTER, CENTER);
                textSize(windowHeight / 48);
                if (cc.alpha <= 0) {
                    noFill();
                }
                text(this.notes[this.defineScale][y - 2], 0, (-height / 2) + (currentDiameter / 2) + gapSize);
                this.notes[this.defineScale].reverse();
                text(this.notes[this.defineScale][y - 2], 0, (currentDiameter / 2.03) + gapSize);
                this.notes[this.defineScale].reverse();


                noFill();
                strokeWeight(1);
                stroke(cc.highlight, cc.alpha);
                if (cc.alpha <= 0) {
                    noStroke();
                }
                ellipse(0, 0, currentDiameter);
                pop();


                // console.log('alpha:', cc.alpha);

                // push();
                // translate(0, (- height / 2) - gapSize, 0);
                // noFill();
                // stroke(cc.highlight);
                // line(0, y * segment, 0, (y * segment) + gapSize);
                // pop();
                // push();
                // stroke(cc.highlight);
                // line(0, y * segment, 0, (y * segment) + gapSize);
                // pop();
            }
        }
        if (menu.gridFade) {
            cc.fadeout(cam.counter);
        }
    }


    visualFeedback(x, y) {
        if (this.visTrig) {
            push();
            ellipse(this.target.position.x, this.target.position.y, this.target.radius * 4);
            pop();
        }

        if (this.startCounter) { // I think this is visisble planet audio trigger
            this.trigCounter++;
            if (this.trigCounter > 0) {
                push();
                noFill();
                strokeWeight(this.target.radius / 6);
                stroke(255, this.fadeout);
                ellipse(this.target.position.x, this.target.position.y, (this.target.radius / 1.5) + (this.trigCounter * 1.5));
                pop();
                this.fadeout -= 5;
            }
        }
        if (this.trigCounter >= 40) {
            this.startCounter = false
            this.trigCounter = 0;
            this.fadeout = 200;
        }

        // console.log(this.startCounter);
    }


    resetVisual() {
        if (fadeout <= -75) {
            fadeout = 255;
        }
        // if (feedbackR = this.target.radius * 2) {
        //     feedbackR = 1;
        // }
    }

}


