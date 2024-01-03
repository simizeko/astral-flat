

class Cameras {
    constructor() {
        this.easycam = createEasyCam();
        this.orbitCam = 0;
        this.timer = 1000; //miliseconds until counter goes up by 1
        this.counter = 0;
        this.zSpeed = 0;
        this.defaultD = (height / 2) / tan(PI / 6);


        this.state1 = {
            distance: this.defaultD,
            center: [0, 0, 0],
            rotation: [1, 0, 0, 0]
            // viewport : [x, y, w, h]
        }

        // this.angleX = -0.00045;
        this.angleY = 0.000;

        this.state2 = {
            distance: (windowHeight / 2) / tan(PI / 6),
            center: [0, 0, 0],
            rotation: [1, 0, 0, 0]
        }

    }


    init() {
        setInterval(this.timeIt, timer)
        this.easycam.removeMouseListeners();
        this.easycam.setState(this.state1, 0);

        this.easycam.pushResetState();
  
    }


    update() {
        let d = (height / 2) / tan(PI / 6);

        this.easycam.rotateY(this.angleY);

        this.easycam.zoom(this.zSpeed);
        if (this.counter === 10 && rotate) {
            this.zSpeed = -0.07;
        }

        if (this.easycam.getDistance() <= d / 1.5) {
            this.zSpeed *= -1;
        }
        if (this.easycam.getDistance() > d) {
            this.zSpeed *= -1;
        }
    }

    Resize() {
        // Recalculates the new defaultD based on window height
        this.state1 = {
            distance: (height / 2) / tan(PI / 6),
            center: [0, 0, 0],
            rotation: [1, 0, 0, 0]
        }

        // Sets the camera to the updated state
        this.easycam.setState(this.state1, 0);
    }


    HUD() {
        // 2D screen-aligned rendering section
        this.easycam.beginHUD();
        noLights();
        textSize(16);
        textFont(debug);
        let state = this.easycam.getState();
        let x = 0;
        let y = 20;

        // Render the background box for the HUD
        noStroke();
        fill(255, 15); // a bit of transparency
        rect(x + 20, y, 300, 100);

        // Render the labels
        fill(255);
        text("Distance:", x + 35, y + 25);
        text("Center:  ", x + 35, y + 25 + 20);
        text("Rotation:", x + 35, y + 25 + 40);
        text("Framerate:", x + 35, y + 25 + 60);

        // Render the state numbers
        fill(200);
        text(nfs(state.distance, 1, 2), x + 125, y + 25);
        text(nfs(state.center, 1, 2), x + 125, y + 25 + 20);
        text(nfs(state.rotation, 1, 3), x + 125, y + 25 + 40);
        text(nfs(frameRate(), 1, 2), x + 125, y + 25 + 60);
        this.easycam.endHUD();
    }
}
