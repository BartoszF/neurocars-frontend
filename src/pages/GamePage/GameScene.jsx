import Phaser from "phaser";
import createCar from "./Gameplay/CarFactory";
import { collisionCategories } from "./Gameplay/Constants";
import CarSimpleController from "./Gameplay/CarSimpleController";
import GameStore from "../../stores/GameStore";

export const scene = {
  preload: function() {
    this.load.image("wheel", "/assets/wheel.png");
  },

  create: function() {
    collisionCategories["WORLD"] = this.matter.world.nextCategory();
    collisionCategories["TIRE"] = this.matter.world.nextCategory();
    collisionCategories["BODY"] = this.matter.world.nextCategory();

    this.matter.world.setBounds(-2000,-2000,4000,4000).disableGravity();
    let debug = this.matter.world.debugConfig;
    debug.staticLineColor = 0x00ff00;
    debug.sensorLineColor = 0x00ff00;
    this.matter.world.debugConfig = debug;

    // var innerTrack = '100 0 75 50 100 100 25 100 0 50 25 0';

    // var poly = this.add.polygon(0, 0, innerTrack, 0xff0000, 0.2);

    // this.matter.add.gameObject(poly, { shape: { type: 'fromVerts', verts: innerTrack, flagInternal: true } });

    // poly.setBounce(0.2);
    // poly.setFriction(0, 0, 0);

    this.car = createCar(
      { maxForwardSpeed: 25, maxBackwardSpeed: 15, maxDriveForce: 4.5 },
      this
    );

    this.carController = new CarSimpleController(this);

    this.matter.add.rectangle(0, 0, 1000, 1000, {isStatic: true, label: "Center block"});

    this.cameras.main.setZoom(0.3);
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
