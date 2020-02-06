import Phaser from "phaser";
import createCar from "./Gameplay/CarFactory";
import { collisionCategories } from "./Gameplay/Constants";
import CarSimpleController from "./Gameplay/CarSimpleController";

export const scene = {
  preload: function() {
    this.load.image("wheel", "/assets/wheel.png");
  },

  create: function() {
    collisionCategories["WORLD"] = this.matter.world.nextCategory();
    collisionCategories["TIRE"] = this.matter.world.nextCategory();
    collisionCategories["BODY"] = this.matter.world.nextCategory();

    this.matter.world.setBounds().disableGravity();

    this.car = createCar(
      { maxForwardSpeed: 2, maxBackwardSpeed: 1, maxDriveForce: 0.1 },
      this
    );

    this.carController = new CarSimpleController(this.car);

    this.cameras.main.setZoom(0.5);
    this.cameras.main.startFollow(this.car.body, false, 0.6, 0.6, 0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();
  },
  update: function(time, delta) {
    let x = 0;
    let y = 0;

    if (this.cursors.up.isDown) y = 1;
    if (this.cursors.down.isDown) y = -1;

    if (this.cursors.left.isDown) x = -1;
    if (this.cursors.right.isDown) x = 1;

    this.carController.update(x, y);
  }
};
