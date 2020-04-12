import Phaser from 'phaser';
import raycast from './ray';
import * as dat from 'dat.gui';
import GameStore from '../../../stores/GameStore';
import RootStore from '../../../stores/RootStore';

const degreeToRad = (degree) => {
  return degree * (Math.PI / 180);
};

const radToDegree = (rad) => {
  return rad * (180/Math.PI);
}

const SENSOR_NUM = 15;
const FRAME_NUM_TO_SEND = 120 * 3;

export default class CarController {
  constructor(scene) {
    this.scene = scene;
    this.car = scene.car;
    this.frame = 0;
    this.currentSensors = {
      velocityX: 0,
      velocityY: 0,
      angle: 0,
      distanceData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    this.gui = new dat.GUI({ autoPlace: false });
    this.gui.add(this.currentSensors, 'velocityX', -1, 1, 0.1).listen();
    this.gui.add(this.currentSensors, 'velocityY', -1, 1, 0.1).listen();
    this.gui.add(this.currentSensors, 'angle', -1, 1, 0.1).listen();

    for (let i = 0; i < SENSOR_NUM; i++) {
      this.gui
        .add(this.currentSensors.distanceData, i, 0, 1, 0.01)
        .name('Sensor ' + i)
        .listen();
    }

    var customContainer = document.getElementById('dat-gui-container');
    if (customContainer) customContainer.appendChild(this.gui.domElement);
    else {
      console.error('Problem getting GUI container');
    }

    this.scene.input.keyboard.on('keydown-X', (event) => {
      if (
        RootStore.gameStore.isSimulationRunning &&
        RootStore.gameStore.isSimulationView === false
      ) {
        this.endSimulation();
      }
    });

    if (
      !RootStore.gameStore.isSimulationEnded &&
      RootStore.gameStore.simulation.id != null
    ) {
      RootStore.gameStore.startSimulation();
    }
  }

  update(x, y) {
    if (RootStore.gameStore.isSimulationRunning) {
      this.simulationUpdate(x, y);
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
      .filter((body) => body.label !== 'Car body');
    bodies = bodies.concat(allBodies);

    //Shoot these rays!
    let center = new Phaser.Math.Vector2(this.car.body.x, this.car.body.y);
    let forward = this.getForwardVector();
    let rayLength = 5000;

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

    const forwardDistance = this.getForwardVector().clone().normalize().distance(this.getForwardVelocity().clone().normalize());
    const forwardSign = forwardDistance > 1 ? -1 : 1;

    const rightDistance = this.getRightVector().clone().normalize().distance(this.getLateralVelocity().clone().normalize());
    const rightSign = rightDistance > 1 ? -1 : 1;

    let frameData = {
      sensorData: {
        velocityX: rightSign * this.getLateralVelocity().length() / (this.car.config.maxForwardSpeed+5),
        velocityY: forwardSign * this.getForwardVelocity().length() / ((forwardSign > 0 ? this.car.config.maxForwardSpeed : this.car.config.maxBackwardSpeed)+5),
        angle: this.car.body.angle / 180,
        distanceData: sensorData,
      },
      carControls: {
        throttle: y,
        steering: x,
      },
    };

    //TODO: temporary
    this.currentSensors.velocityX = frameData.sensorData.velocityX;
    this.currentSensors.velocityY = frameData.sensorData.velocityY;
    this.currentSensors.angle = frameData.sensorData.angle;

    for (let i = 0; i < SENSOR_NUM; i++) {
      this.currentSensors.distanceData[i] =
        frameData.sensorData.distanceData[i];
    }

    //

    //this.currentSensors = frameData.sensorData;

    // for (var i in this.gui.__controllers) {
    //   this.gui.__controllers[i].updateDisplay();
    // }

    if (RootStore.gameStore.isSimulationView === false) {
      RootStore.gameStore.addFrame(frameData);

      if (this.frame % FRAME_NUM_TO_SEND === 0) {
        RootStore.gameStore.sendFrames(this.frame);
      }
    }
  }

  endSimulation() {
    RootStore.gameStore.endSimulation(this.frame);
  }

  rotateVector(vec, angle) {
    angle = degreeToRad(angle);
    return new Phaser.Math.Vector2(
      Math.cos(angle) * vec.x - Math.sin(angle) * vec.y,
      Math.sin(angle) * vec.x + Math.cos(angle) * vec.y
    );
  }

  getAngleBetween(vec1, vec2) {
    let dot = vec1.clone().dot(vec2);
    let magV1 = vec1.length();
    let magV2 = vec2.length();

    return dot / (magV1 * magV2);
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
