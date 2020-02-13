import Phaser from "phaser";
import raycast from "./ray";
import GameStore from "../../../stores/GameStore";
import UserStore from "../../../stores/UserStore";

let degreeToRad = function(degree) {
  return degree * (Math.PI / 180);
};

const SENSOR_NUM = 15;

export default class CarController {
  constructor(scene) {
    this.scene = scene;
    this.car = scene.car;
    this.frame = 0;
  }

  update(x, y) {
    if (GameStore.isSimulationRunning()) {
      this.simulationUpdate(x, y);
      this.scene.input.keyboard.on("keydown-X", function(event) {
        this.endSimulation();
      });
    } else if (
      UserStore.getPlayerId != null &&
      GameStore.getOperation() == "NO"
    ) {
      GameStore.createSimulation(UserStore.getPlayerId());
    }
  }

  simulationUpdate(x, y) {
    this.frame++;
    let bodies = [];
    let walls = this.scene.matter.world.walls;
    bodies.push(walls.left);
    bodies.push(walls.right);
    bodies.push(walls.top);
    bodies.push(walls.bottom);

    let allBodies = this.scene.matter.world
      .getAllBodies()
      .filter(body => body.label != "Car body");
    bodies = bodies.concat(allBodies);

    //Shoot these rays!
    let center = new Phaser.Math.Vector2(this.car.body.x, this.car.body.y);
    let forward = this.getForwardVector();
    let rayLength = 2000;

    /*
        x2=cosβx1−sinβy1
        y2=sinβx1+cosβy1
        */

    let sensorEnds = [];

    for (var d = 0; d < SENSOR_NUM; d++) {
      var deg = degreeToRad(d * (360 / SENSOR_NUM));
      sensorEnds.push(
        new Phaser.Math.Vector2(
          Math.cos(deg) * forward.x - Math.sin(deg) * forward.y,
          Math.sin(deg) * forward.x + Math.cos(deg) * forward.y
        )
          .scale(rayLength)
          .add(center)
      );
    }

    let sensorData = [];

    for (var i in sensorEnds) {
      var coll = raycast(bodies, center, sensorEnds[i]);
      if (coll.length > 1) {
        let ray = coll[0];
        let point = new Phaser.Math.Vector2(ray.point.x, ray.point.y);
        sensorData[i] = point.distance(center) / rayLength;
      } else {
        sensorData[i] = 1.0;
      }
    }

    let frameData = {
      frame: this.frame,
      sensors: sensorData,
      velocity: this.car.body.body.velocity,
      angle: this.car.body.angle,
      throttle: y,
      steering: x
    };

    GameStore.addFrame(frameData);

    if (this.frame % 30 === 0) {
      GameStore.sendFrames(this.frame);
    }
  }

  endSimulation() {
    GameStore.endSimulation(this.frame);
  }

  getForwardVector() {
    return new Phaser.Math.Vector2(
      Math.sin(this.car.body.rotation + Math.PI / 2),
      Math.cos(this.car.body.rotation - Math.PI / 2)
    );
  }

  getRightVector() {
    let forwardVector = this.getForwardVector();
    return new Phaser.Math.Vector2(forwardVector.y, -forwardVector.x);
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
}
