

class Planets {
    constructor(tempX, tempY, tempM, center, tempNote) {
        this.position = createVector(tempX, tempY);
        this.pastPosition = this.position.copy();

        this.initialD = p5.Vector.sub(center, this.position);
        // this.initialD.normalize(); //sets initial velocity to 1
        this.initialD.setMag(1.25 * orbitSpeed.initialMag);
        this.initialVelocity = this.initialD.rotate(PI / -2);

        this.velocity = createVector(this.initialVelocity.x, this.initialVelocity.y);
        this.accel = createVector(0, 0);
        this.mass = tempM;
        this.radius = calculateMass(this.mass);
        this.influence = this.mass * planetInfluence;
        this.counter = 0;
        this.sounds = null;

        // this.note = tempNote;
    }


    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.accel.add(f);
    }


    update() {
        this.pastPosition = this.position.copy();
        this.velocity.add(this.accel);
        this.position.add(this.velocity);
        this.velocity.limit(orbitSpeed.c);
        this.accel.set(0, 0);
        // let temp = this.velocity.mag();
        // console.log('velocity mag:', temp);
    }



    show() {
        push();
        // translate(0, 0, 0.5);
        // ellipse(this.position.x, this.position.y, this.radius);
        ambientMaterial(255);
        translate(this.position.x, this.position.y, 0);
        sphere(this.radius / 2, 9, 9);
        pop();


        // if (showGravity) {
        //     stroke(255, 100, 0, 200);
        //     line(this.position.x, this.position.y, width / 2, height / 2);
        // }

        // noStroke();

        // if (showInfluence) {
        //     fill(255, 20);
        //     ellipse(this.position.x, this.position.y, this.radius * this.influence * 2);
        // }
    }

    showGravity() {
        if (showGravity) {
            stroke(cc.highlight);
            line(this.position.x, this.position.y, 0, 0);

        }

        noStroke();

        if (showInfluence) {
            // push();

            // specularMaterial(255, 255, 255, 10);
            // translate(this.position.x, this.position.y, 0);
            // sphere(this.radius * this.influence)

            // pop();
            fill(255, 40);
            ellipse(this.position.x, this.position.y, this.radius * this.influence * 2);

        }
    }


    intersects(other) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (d < this.radius / 2 + other.radius / 2) {
            // this.radius += other.radius;
            if (mergePlanets) {
                let sum = PI * this.radius * this.radius + PI * other.radius * other.radius; //sum of areas
                // let newRadius = sqrt(sum / PI);
                // lerp(this.radius, newRadius, 0.05);
                other.radius = sqrt(sum / PI); // Makes the other planet when bigger
                // other.radius = lerp(other.radius, sqrt(sum / PI), 1);
                other.mass += this.mass * 0;
                other.influence = (other.mass + this.mass * planetInfluence);
                // other.mass = lerp(other.mass, other.mass += this.mass, 0.0001);
                // other.accel += this.accel;
            }
            // else if (this.position.x + this.radius / 2 >= other.position.x + other.radius / 2) {
            //     // let p = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            //     // if (d < this.radius) {
            //         this.position.x = this.position.x - other.radius
            //     this.velocity.x *= -0.02;
            //     // this.velocity.y *= -0.5;
            //     // }
            // }

            // Keep the sun from gaining mass and growing in size
            sun.mass = sunSize;
            sun.radius = sqrt(sunSize) * 5;

            return true;
        } else {
            return false;
        }
    }


    proximity(other) {
        let p = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (p < this.radius * this.influence) {
            // background(255, 50);
            // return true;
            let force = p5.Vector.sub(this.position, other.position);
            let distanceSq = constrain(force.magSq(), 10000, 25000);
            let G = planetGravityStrength; // gravity strength
            let strength = G * (this.mass * other.mass) / distanceSq;
            force.setMag(strength);
            other.applyForce(force);

            if (showGravity) {
                stroke(255, 100);
                line(this.position.x, this.position.y, other.position.x, other.position.y)
            }
        }
    }



    edges() {
        if (this.position.y + this.radius / 2 >= height / 2) {
            this.position.y = height / 2 - this.radius / 2;
            this.velocity.y *= -0.02;
        } else if (this.position.y - this.radius / 2 <= -height / 2) {
            this.position.y = -height / 2 + this.radius / 2;
            this.velocity.y *= -0.02;
        }

        if (this.position.x + this.radius / 2 >= width / 2) {
            this.position.x = width / 2 - this.radius / 2;
            this.velocity.x *= -0.02;
        } else if (this.position.x - this.radius / 2 <= -width / 2) {
            this.position.x = -width / 2 + this.radius / 2;
            this.velocity.x *= -0.02;
        }
    }

    attachSounds(sounds) {
        this.sounds = sounds
    }



}





