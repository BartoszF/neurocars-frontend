import Phaser from "phaser";

import CarController from "./CarController";

export default class CarSimpleController extends CarController {
  update(x, y) {
    if (x < 0) {
      Phaser.Physics.Matter.Matter.Body.setAngularVelocity(
        this.car.body.body,
        -0.05
      );
    } else if (x > 0) {
      Phaser.Physics.Matter.Matter.Body.setAngularVelocity(this.car.body.body, 0.05);
    }

    if (y > 0) {
      this.car.body.thrust(0.25);
    } else if (y < 0) {
      this.car.body.thrustBack(0.1);
    }
  }
}
