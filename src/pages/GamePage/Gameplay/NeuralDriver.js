import CarSimpleController from './CarSimpleController';
import * as tf from '@tensorflow/tfjs';
import RootStore from '../../../stores/RootStore';
import Brain from './Brain';

export default class NeuralDriver {
  constructor(scene) {
    const aiModel = RootStore.gameStore.aiModelObject;
    this.controller = new CarSimpleController(scene);
    this.brain = new Brain(aiModel);

    console.log(aiModel);
  }

  update() {
    let sensors = this.controller.currentSensors;

    if (sensors.distanceData && sensors.distanceData.length > 0) {
      let input = [sensors.velocityX, sensors.velocityY, sensors.angle];

      for (let i in sensors.distanceData) {
        input.push(sensors.distanceData[i]);
      }

      const output = this.brain.update(input);
      this.controller.update(output[1], output[0]);
    } else {
      this.controller.update(0, 0);
    }
  }
}
