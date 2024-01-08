

class Planets {
    constructor(tempX, tempY, tempM, center, tempNote) {
        this.position = createVector(tempX, tempY);
        this.pastPosition = this.position.copy();

        this.initialD = p5.Vector.sub(center, this.position);
        // this.initialD.normalize(); //sets initial velocity to 1
        this.initialD.setMag(1 * orbitSpeed.initialMag);
        this.initialVelocity = this.initialD.rotate(PI / -2);

        this.velocity = createVector(this.initialVelocity.x, this.initialVelocity.y);
        this.accel = createVector(0, 0);
        this.mass = tempM;
        this.radius = calculateMass(this.mass);
        this.influence = this.mass * planetInfluence;
        this.counter = 0;
        this.sounds = null;
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
        noStroke();
        fill(cc.R, cc.G, cc.B);
        ellipse(this.position.x, this.position.y, this.radius);
        pop();
    }

    ShowGravity() {
        if (showGravity) {
            push();
            stroke(cc.highlight, 100);
            line(this.position.x, this.position.y, center.x, center.y);
            pop();

        }

        

        if (showInfluence) {
            push();
            noStroke();
            fill(255, 40);
            ellipse(this.position.x, this.position.y, this.radius * this.influence * 2);
            pop();

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
            sun.mass = sunMass;
            sun.radius = height/10;

            return true;
        } else {
            return false;
        }
    }


    proximity(other) {
        let p = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (p < this.radius * this.influence) {
            let force = p5.Vector.sub(this.position, other.position);
            let distanceSq = constrain(force.magSq(), 10000, 25000);
            let G = planetGravityStrength; // gravity strength
            let strength = G * (this.mass * other.mass) / distanceSq;
            force.setMag(strength);
            other.applyForce(force);

            if (showGravity) {
                push();
                stroke(cc.highlight, 100);
                line(this.position.x, this.position.y, other.position.x, other.position.y)
                pop();
            }
        }
    }


    edges() {
        if (this.position.y + this.radius / 2 >= height) {
            this.position.y = height - this.radius / 2;
            this.velocity.y *= -0.02;
        } else if (this.position.y - this.radius / 2 <= 0) {
            this.position.y = 0 + this.radius / 2;
            this.velocity.y *= -0.02;
        }

        if (this.position.x + this.radius / 2 >= width) {
            this.position.x = width - this.radius / 2;
            this.velocity.x *= -0.02;
        } else if (this.position.x - this.radius / 2 <= 0) {
            this.position.x = 0 + this.radius / 2;
            this.velocity.x *= -0.02;
        }
    }

    attachSounds(sounds) {
        this.sounds = sounds
    }

}





