function preload() {
    debug = loadFont('./assets/hindRegular.otf');
    font = loadFont('./assets/hindLight.otf');
    muteWht = 'url(./design/mute1.svg)';
    muteBlk = 'url(./design/muteblk1.svg)';
    menuWht = 'url(./design/menu-thin.svg)';
    fullOpen = 'url(./design/fullOpen.svg)';
    fullClose = 'url(./design/fullClose.svg)'
}

let font;
let debug;
let muteWht;
let muteBlk;
let menuWht;
let fullScrn = false;
let fullOpen;

let base;
let planets = [];
let dust = [];
let sun;
let center;
let grow;
let midi;

let timer = 5000;

let button;
let createPlanet = true;
let showMenu = false;
let showGravity = false;
let showInfluence = false;
let hoverMuteButton = false;

let sunRadius = 4;
let sunSize;
let initialPlanets = 0;
// let planetMass = 4;
let planetInfluence = 2;
// let planetGravityStrength = 0.65;
let planetGravityStrength = 0.15;
let mergePlanets = true;

let orbitSpeed = {
    initialMag: 1.25,
    // c: 2.65
}
let slow = false, medium = true, fast = false;
// let rotate = true;

let sounds;
let midiDevice = true;

let fadeout = 255;
let feedbackS = 0;
let rings = [];

let resetCounter = 0;

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////


function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        showGravity = true;
    } else if (keyCode === RIGHT_ARROW) {
        showGravity = false;
    }

    if (keyCode === UP_ARROW) {
        showInfluence = true;
    } else if (keyCode === DOWN_ARROW) {
        showInfluence = false;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    menu.muteB.remove();
    menu.menuB.remove();
    menu.fullB.remove()
    menu.MenuButtons();

    center = createVector(windowWidth / 2, windowHeight / 2);
    sun.Resize();
    sunSize = height / sunRadius;
    sun = new Sun(center.x, center.y, sunSize);
    // cam.Resize();

    // Checks to see if menu needs resizing
    if (openMenu) {
        menu.container.remove();
        menu.bgFull.remove();
        menu.bgHalf.remove();
        menu.Container();
        if (midiOptions) {
            menu.OpenMidiPage();
        }
    }
}

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function setup() {
    base = createCanvas(windowWidth, windowHeight);
    base.style('position: fixed');
    pixelDensity(1);
    center = createVector(windowWidth / 2, windowHeight / 2);
    midi = new MidiOut();
    midi.setup();

    sunSize = height / sunRadius;
    sun = new Sun(center.x, center.y, sunSize);

    fadeout = 255;
    feedbackR = 1;

    cc = new Colours();

    sounds = new Sounds();

    for (let i = 0; i < initialPlanets; i++) {
        planets[i] = new Planets(random(-width / 2 + 100, width / 2 - 100), random(-height / 2 + 100, height / 2 - 100), 1, center);
        planets[i].attachSounds(new Sounds(planets[i]));
    }

    // cam = new Cameras();
    // cam.init();

    menu = new Menu();
    if (openMenu) {
        menu.Container();
    }
    menu.MenuButtons();
    menu.FpsCounter();

    textSize(18);
    textFont(font);

    setInterval(timeIt, 1000);
    setInterval(addDust, 5000);

}

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function speedControl() {
    if (orbitVal === 'I') {
        // background(0, 255, 0);
        orbitSpeed = {
            initialMag: 2,
            c: 0.8,
            sunGravity: 0.2
        }
    }
    if (orbitVal === 'II') {
        // background(255, 0, 0);
        orbitSpeed = {
            initialMag: 1.3,
            c: 1.85,
            sunGravity: 1
        }
    }
    if (orbitVal === 'III') {
        // background(0, 0, 255);
        orbitSpeed = {
            initialMag: 1.82,
            c: 2.65 * 1.5,
            sunGravity: 1 * 2
        }
    }
    return false;
}



// function rotateCam() {
//     if (rotate) {
//         let rot = map(planets.length, 0, 20, 0, 0.001);
//         let rSpeed = constrain(rot, 0, 0.001);

//         cam.angleY = rSpeed;
//     }
// }

function timeIt() {
    resetCounter++;
    cc.counter++;
}

function mousePressed() {
    resetCounter = 0;
}

function addDust() {
    let dustSize = 0.1
    let randomW = [-width, width]
    let randomH = [-height, height]
    a = new Dust(random(randomW), random(randomH), dustSize, center);
    dust.push(a);

    b = new Dust(random(randomW), random(randomH), dustSize, center);
    dust.push(b);
}

function calculateMass(value) {
    return sqrt(value) * 10;
}

function mouseReleased() {
    if (createPlanet) {
        // center = createVector(windowWidth / 2, windowHeight / 2);
        let newPlanet = new Planets(mouseX, mouseY, grow, center);
        newPlanet.attachSounds(new Sounds(newPlanet));
        planets.push(newPlanet);
    }
    // cam.counter = 0;
}


// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////

function draw() {
    if (openMenu) {
        menu.Active();
    }
    if (menu.counterM < 10) {
        menu.Cooldown();
    }
    menu.Update();
    cc.colourChange();
    background(cc.bg);
    sounds.grid();

    speedControl();

    push();
    noStroke();
    if (createPlanet && mouseIsPressed) {
        if (grow <= 2) {
            fill(255, 255, 0);
        } else
            if (grow <= 3) {
                fill(0, 255, 255);
            } else
                if (grow <= 4) {
                    fill(255, 0, 255);
                } else
                    if (grow <= 5) {
                        fill(0, 255, 0);
                    } else
                        if (grow <= 6) {
                            fill(255, 255, 255);
                        } else
                            if (grow <= 7) {
                                fill(255, 0, 0);
                            } else
                                if (grow <= 8) {
                                    fill(0, 0, 255);
                                } else
                                    if (grow <= 9) {
                                        fill(50, 190, 150);
                                    }

        ellipse(mouseX, mouseY, calculateMass(grow));
        push();
        fill(cc.bg);
        ellipse(mouseX, mouseY, calculateMass(grow / 2));
        pop();
        grow += 0.045; //growth speed
    }
    else {
        grow = 1; //size the circle resets to
    }

    if (grow >= 9) { //for when it reaches a certain size
        grow = 9;
    }
    pop();






    for (let i = planets.length - 1; i >= 0; i--) {
        if (planets[i].intersects(sun)) {
            planets.splice(i, 1);
        }
    }


    for (let i = planets.length - 1; i >= 0; i--) {
        let overlapping = false;
        for (let other of planets) {
            if (planets[i] !== other && planets[i].intersects(other)) {
                overlapping = true;
                planets[i].proximity(other);
            }
        }
        if (overlapping && mergePlanets) {
            planets.splice(i, 1);
        }
    }

    for (let i = dust.length - 1; i >= 0; i--) {
        dust[i].update();
        dust[i].show();
        sun.attract(dust[i]);
        if (dust[i].touches(sun)) {
            dust.splice(i, 1);
        }
    }

    //     //// this makes mass effected the same for gravity (falling at the same speed). Remeber to replace '(gravity)' with '(weight)' below.
    //     // let weight = p5.Vector.mult(gravity, planets.mass);

    for (let i = planets.length - 1; i >= 0; i--) {

        // sounds = new Sounds(planets[i]);
        // sounds.identifyTarget(planets[i]);
        // let proximity = false;

        for (let other of planets) { //this for loop shows the gravity line between planets
            if (planets[i] !== other && planets[i].proximity(other)) {
                // planets[i].proximity(other);
            }
        }


        sun.attract(planets[i]);
        planets[i].showGravity();

        // planets[i].applyForce(gravity);
        planets[i].update();
        planets[i].show();
        planets[i].edges();
        planets[i].sounds.calculateNote();
        planets[i].sounds.trigger();
        planets[i].sounds.visualFeedback();
        // planets[i].sounds.resetVisual()
        planets[i].sounds.calculateVelocity();
        planets[i].sounds.calculateLength();
    }

    sun.stars();

    sun.BHshow();
    midi.listOuts();

    if (menu.midiMode & midiDevice) {
        midi.midiListen();
    }

    sounds.ModeSelect();
    // print(sounds.fadeout);
}





