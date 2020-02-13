import Phaser from "phaser";

const MAX_LATERAL_IMPULSE = 1;

export default class Tire {
  constructor(body, carConfig) {
    this.tireObject = body;
    this.config = carConfig;
    this.currentTraction = 1;
  }

  getForwardVector() {
    return new Phaser.Math.Vector2(
      Math.sin(this.tireObject.rotation),
      Math.cos(this.tireObject.rotation)
    );
  }

  getRightVector() {
    let forwardVector = this.getForwardVector();
    return new Phaser.Math.Vector2(forwardVector.y, -forwardVector.x);
  }

  getLateralVelocity() {
    let rightVector = this.getRightVector();
    let forwardVelocity = this.tireObject.body.velocity;
    return rightVector.scale(rightVector.dot(forwardVelocity));
  }

  getForwardVelocity() {
    let forwardVector = this.getForwardVector();
    let forwardVelocity = this.tireObject.body.velocity;
    return forwardVector.scale(forwardVector.dot(forwardVelocity));
  }

  updateFriction() {
    let lat = this.getLateralVelocity().negate();
    let impulse = lat.scale(this.tireObject.body.mass);

    if (impulse.length() > MAX_LATERAL_IMPULSE) {
      impulse = impulse.scale(MAX_LATERAL_IMPULSE / impulse.length());
    }

    if (impulse.length() > 0)
      this.tireObject.applyForce(impulse.scale(this.currentTraction));

    this.tireObject.setAngularVelocity(
      -this.tireObject.body.angularVelocity *
        this.currentTraction *
        0.1 *
        this.tireObject.body.inertia
    );

    let currentForward = this.getForwardVelocity();
    let currentForwardNormal = currentForward.length();
    let dragForceMagnitude = -0.2 * currentForwardNormal;

    this.tireObject.applyForce(
      currentForward.scale(this.currentTraction * dragForceMagnitude)
    );
  }

  updateDrive(throttle) {
    let desiredSpeed = 0;

    if (throttle > 0) {
      desiredSpeed = this.config.maxForwardSpeed;
    } else if (throttle < 0) {
      desiredSpeed = this.config.maxBackwardSpeed;
    } else {
      return;
    }

    let forwardVector = this.getForwardVector();
    let currentSpeed = this.getForwardVelocity().dot(forwardVector);

    let force = 0;

    if (desiredSpeed > currentSpeed) {
      force = this.config.maxDriveForce;
    } else if (desiredSpeed < currentSpeed) {
      force = -this.config.maxDriveForce;
    } else {
      return;
    }

    this.tireObject.applyForce(
      forwardVector.scale(this.currentTraction * force)
    );

    /*
		if(desiredSpeed < 0)
		{
			car.dir = (car.dir - 1) /2;
		}
		else
		{
			car.dir = (car.dir + 1) /2;
		}
      */
  }

  updateTurn(angle) {
    this.tireObject.body.angle = angle;
  }
}
