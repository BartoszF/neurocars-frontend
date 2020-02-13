import Phaser from "phaser";

import CarController from "./CarController";

const MAX_LATERAL_IMPULSE = 0.8;

export default class CarSimpleController extends CarController {
  getForwardVector() {
    return new Phaser.Math.Vector2(
      Math.sin(this.car.body.rotation + Math.PI / 2),
      Math.cos(this.car.body.rotation + Math.PI / 2)
    );
  }

  getRightVector() {
    let forwardVector = this.getForwardVector();
    return new Phaser.Math.Vector2(forwardVector.y, forwardVector.x);
  }

  getLateralVelocity() {
    let rightVector = this.getRightVector();
    let forwardVelocity = this.car.body.body.velocity;
    return rightVector.scale(rightVector.dot(forwardVelocity));
  }

  getForwardVelocity() {
    let forwardVector = this.getForwardVector();
    let forwardVelocity = this.car.body.body.velocity;
    return forwardVector.scale(forwardVector.dot(forwardVelocity));
  }

  update(x, y) {
    let velocity = new Phaser.Math.Vector2(
      this.car.body.body.velocity.x,
      this.car.body.body.velocity.y
    );

    let lat = this.getLateralVelocity().negate();
    let impulse = lat.scale(this.car.body.body.mass);

    if (impulse.length() > MAX_LATERAL_IMPULSE) {
      impulse = impulse.scale(MAX_LATERAL_IMPULSE / impulse.length());
    }

    if (impulse.length() > 0 && this.getLateralVelocity().length() > 0)
      this.car.body.applyForce(impulse.scale(/*this.currentTraction*/ 0.8));

    this.car.body.setAngularVelocity(this.car.body.body.angularVelocity * 0.9);

    let turnFactor = Math.abs(
      Math.clamp(this.getForwardVelocity().length(), -1, 1)
    );

    if (x < 0) {
      Phaser.Physics.Matter.Matter.Body.setAngularVelocity(
        this.car.body.body,
        -0.05 * turnFactor
      );
    } else if (x > 0) {
      Phaser.Physics.Matter.Matter.Body.setAngularVelocity(
        this.car.body.body,
        0.05 * turnFactor
      );
    }

    console.log(this.getForwardVelocity().length(), velocity.length());

    if (y > 0) {
      if (this.getForwardVelocity().length() < this.car.config.maxForwardSpeed)
        this.car.body.thrust(this.car.config.maxDriveForce);
    } else if (y < 0) {
      if (
        this.getForwardVelocity().length() > -this.car.config.maxBackwardSpeed
      )
        this.car.body.thrustBack(this.car.config.maxDriveForce / 2);
    }

    // if (this.getForwardVelocity().length() > this.car.config.maxForwardSpeed) {
    //   let maxVel = velocity.normalize().scale(this.car.config.maxForwardSpeed);
    //   this.car.body.body.velocity = maxVel;
    // }
  }
}
