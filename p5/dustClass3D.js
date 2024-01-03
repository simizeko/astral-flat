



class Dust {
    constructor(tempX, tempY, tempM, center) {
        this.position = createVector(tempX, tempY, 0);

        this.initialD = p5.Vector.sub(center, this.position);
        this.initialD.setMag(10);
        this.initialVelocity = this.initialD;

        this.velocity = createVector(this.initialVelocity.x, this.initialVelocity.y);
        // this.velocity = createVector(0, 0);
        this.accel = createVector(0, 0);
        this.mass = tempM;
        this.radius = calculateMass(this.mass);
    }


    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.accel.add(f);
    }


    update() {
        this.velocity.add(this.accel);
        this.position.add(this.velocity);
        // this.velocity.limit(orbitSpeed.c / 1.5);
        this.accel.set(0, 0);
        // let temp = this.velocity.mag();
        // console.log('velocity mag:', temp);
    }



    show() {
        // dust swirl //////////
        // push();
        // // rotateY(0 + cam.angleY);
        // // ellipse(this.position.x, this.position.y, this.radius);
        // emissiveMaterial(255);
        // translate(this.position.x, this.position.y, 0);
        // sphere(this.radius / 2);
        // // ellipse(this.position.x, this.position.y, this.radius);
        // pop();

        push();
        // rotateY(0 + cam.angleY);
        // ellipse(this.position.x, this.position.y, this.radius);
        // emissiveMaterial(255);
        emissiveMaterial(255);
        translate(this.position.x, this.position.y, 0);
        sphere(this.radius / 2);
        // ellipse(this.position.x, this.position.y, this.radius);
        pop();
    }


    touches(target) {
        let d = dist(this.position.x, this.position.y, target.position.x, target.position.y);
        if (d < this.radius / 2 + target.radius / 3) {
            return true;
        } else {
            return false;
        }
    }

}





