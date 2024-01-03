

class Sun {
    constructor(tempX, tempY, tempM) {
        this.position = createVector(tempX, tempY);
        this.mass = tempM;
        this.radius = sqrt(this.mass) * 5;
        // this.radius = windowHeight / 10;
        this.slice;
        this.warpW = 60;
        this.slice = createGraphics(this.warpW, this.radius);
        this.angle = 0;
        this.sineRot = 0;
        this.x = 0;
        this.jitter = 1.75
        this.angleY = 0;
        this.rot = 0;

    }


    BHshow() {
        noStroke();
        imageMode(CENTER);
        this.slice.background(255, 0, 0);
        this.slice.copy(base, (width / 2) - this.warpW / 2, (height / 2) - this.radius / 2, this.radius, this.radius, this.x, 0, this.radius, this.radius);
        // this.x = (this.x + this.warpW) % this.slice.width;


        this.jitter += random(0.5, -0.5);
        if (this.jitter >= 4) {
            this.jitter = 3.9;
        } if (this.jitter <= 2) {
            this.jitter = 2.1;
        }

        // cam.easycam.beginHUD();
        // translate(width / 2, height / 2, 0);
        push();
        rotateY(this.angleY);
        translate(0, 0, -this.radius / 1.25);
        // blendMode(LIGHTEST);
        ambientLight(255);
        texture(this.slice);
        rotateY(PI);
        // rotateY(PI/2);
        rotateZ(this.angle);
        sphere(this.radius / 1.25);
        rotateZ(-this.angle)
        this.angle += 0.1;
        pop()

        push();
        ambientLight(255);
        rotateY(this.angleY);
        texture(this.slice);
        // translate(0, 0, -this.radius / 1.1);
        // rotateY(-PI);
        // blendMode(SCREEN);
        ellipse(0, 0, this.radius * 1.3);
        blendMode(BLEND);
        translate(0, 0, 2);
        emissiveMaterial(0);
        rotateZ(this.angle);
        // ellipse(0, 0, this.radius + 5);
        // noStroke();
        ellipse(0, 0, this.radius);
        // stroke(cc.highlight);
        strokeWeight(random(1, 6));
        noFill();
        ellipse(0, 0, this.radius * 1.3)
        pop();

        push();
        rotateY(this.angleY);
        noStroke();
        blendMode(SUBTRACT);
        translate(0, 0, this.radius);
        ambientMaterial(255);
        // ellipse(0, 0, this.radius * 1.75)
        sphere(this.radius / 2.2);
        blendMode(BLEND)
        pop();

        this.angleY += cam.angleY;

        // push();
        // // blendMode(SCREEN);
        // // texture(this.slice);
        // fill(255,5)
        // // rotateZ(-this.angle);
        // ellipse(0, 0, this.radius*2.75);
        // // rotateZ(this.angle);
        // translate(0, 0, 1);
        // fill(255,5);
        // ellipse(0, 0, this.radius*3.25);
        // blendMode(BLEND);
        // pop();
        // cam.easycam.endHUD();


        // graphics.image(this.slice, 300, 300, 400, 400);

        this.rot += 3;
        const numberOseg = 16;
        const segment = (height / 2) / numberOseg;
        const gapSize = segment * 0.8;
        let maxDiameter = this.radius / 4.5;
        for (let y = 1; y < numberOseg; y++) {
            let currentDiameter = maxDiameter * (numberOseg - y);


            // rotateY(PI);
            push();
            noStroke();
            blendMode(LIGHTEST);
            specularMaterial(0, 1);
            // translate(0, 0, -sun.radius / 2.5);
            translate(0, 4, 0)
            rotateX(PI / 2);
            rotateX(random(-0.03, -0.025));
            rotateZ(-this.angleY);
            // rotateZ(this.rot);
            translate(0, 0, 0 + y)

            // noFill();

            // ambientMaterial(100);
            // this.ringColour = color(255, 255/8 + 255/10 * (y)/numberOseg);
            // ellipse(0,0,this.radius * 2);
            // strokeWeight(0.1);
            // stroke(cc.highlight);
            ellipse(0, 0, currentDiameter / 1.3, currentDiameter * 1.25);
            blendMode(BLEND);
            pop();

            push();
            // translate(-sun.radius / 2, 0, 0);
            rotateY(this.angleY + PI / random(5.3, 5.5) + (map(sin(this.sineRot), -1, 1, 5, 6.5)));
            // this.sineRot += 0.5;
            this.sineRot += 5;
            translate(0, 0, 0 + y)

            // noFill();
            // blendMode(LIGHTEST);
            // ambientMaterial(100);
            // this.ringColour = color(255, 255/8 + 255/10 * (y)/numberOseg);
            specularMaterial(255, 1);
            // stroke(cc.highlight);
            ellipse(0, 0, currentDiameter);
            blendMode(BLEND);
            pop();
        }

    }


    attract(planets) {
        let force = p5.Vector.sub(this.position, planets.position);
        let distanceSq = constrain(force.magSq(), 4000, 20000);
        let G = orbitSpeed.sunGravity; // gravity strength
        let strength = G * (this.mass * planets.mass) / distanceSq;
        force.setMag(strength);
        planets.applyForce(force);
    }


    stars() {
        // push();
        // let vibrateX = 0
        // let vibrateY = 0
        // vibrateX += random(-0.5, 0.5);
        // vibrateY += random(-0.5, 0.5);

        // noStroke();
        // // blendMode(LIGHTEST);
        // // fill(255, 255, 0); // yellow



        // // rotateX(this.angle)
        // // rotateY(this.angle)
        // // rotateZ(-this.angle)
        // normalMaterial();
        // sphere(cc.normalSphere * this.radius / 2 - 0.5);

        // if (cc.gradient) {
        //     blendMode(LIGHTEST);
        // } else {
        //     blendMode(BLEND);
        // }
        // emissiveMaterial(0);
        // sphere(this.radius / 2);

        // blendMode(BLEND);

        // blendMode(LIGHTEST);
        // pop();

        // push();
        // fill(255);
        // ellipse(this.position.x + vibrateX, this.position.y + vibrateY, this.radius);

        // if (vibrateX >= 2 || -2) {
        //     vibrateX = 0
        // }
        // if (vibrateY >= 2 || -2) {
        //     vibrateY = 0
        // }

        // pop();

        noStroke();
        push();
        let r = (height / 2) / tan(PI / 6); // size of sphere made of dots
        let total = 10;
        for (let i = 0; i < total; i++) {
            let longitude = map(i, 0, total, -PI, PI);
            for (let j = 0; j < total; j++) {
                let latitude = map(j, 0, total, -PI / 2, PI / 2);
                let x = r * sin(longitude) * cos(latitude);
                let y = r * sin(latitude) * sin(longitude);
                let z = r * cos(longitude);
                stroke(cc.stars);
                strokeWeight(2);
                point(x, y, z);
            }
        }
        pop();
    }

    Resize() {
        this.radius = windowHeight / 10;
    }

}





