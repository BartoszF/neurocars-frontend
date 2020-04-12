import Phaser from "phaser";

import CarController from "./CarController";

const MAX_LATERAL_IMPULSE = 1.8;

export default class CarSimpleController extends CarController {
  update(x, y, delta) {
    super.update(x,y, delta);

    let lat = this.getLateralVelocity().negate();
    let impulse = lat.scale(this.car.body.body.mass);

    if (impulse.length() > MAX_LATERAL_IMPULSE) {
      impulse = impulse.scale(MAX_LATERAL_IMPULSE / impulse.length());
    }

    if (impulse.length() > 0 && this.getLateralVelocity().length() > 0)
      this.car.body.applyForce(impulse.scale(/*this.currentTraction*/ 0.85));

    this.car.body.setAngularVelocity(this.car.body.body.angularVelocity * 0.9);

    let turnFactor = Math.abs(
      Math.clamp(this.getForwardVelocity().length(), -1, 1)
    );

    if (x < 0) {
      Phaser.Physics.Matter.Matter.Body.setAngularVelocity(
        this.car.body.body,
        -0.05 * turnFactor //* Math.sign(y+0.01)
      );
    } else if (x > 0) {
      Phaser.Physics.Matter.Matter.Body.setAngularVelocity(
        this.car.body.body,
        0.05 * turnFactor //* Math.sign(y+0.01)
      );
    }

    if (y > 0) {
      if (this.getForwardVelocity().length() < this.car.config.maxForwardSpeed)
        this.car.body.thrust(this.car.config.maxDriveForce);
    } else if (y < 0) {
      if (
        this.getForwardVelocity().length() < this.car.config.maxBackwardSpeed
      )
        this.car.body.thrustBack(this.car.config.maxDriveForce / 2);
    }

    // if (this.getForwardVelocity().length() > this.car.config.maxForwardSpeed) {
    //   let maxVel = velocity.normalize().scale(this.car.config.maxForwardSpeed);
    //   this.car.body.body.velocity = maxVel;
    // }
  }
}
