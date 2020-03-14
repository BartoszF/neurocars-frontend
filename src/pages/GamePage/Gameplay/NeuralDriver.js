import CarSimpleController from './CarSimpleController';
import * as tf from '@tensorflow/tfjs';
import RootStore from '../../../stores/RootStore';

export default class NeuralDriver {
  constructor(scene) {
    this.controller = new CarSimpleController(scene);

    const aiModel = RootStore.gameStore.aiModelObject;
    console.log(aiModel);

    let layers = [];

    const input = tf.input({ shape: [18] });
    layers.push(input);
    for (let i = 1; i < aiModel.layers.length; i++) {
      const prevLayer = aiModel.layers[i - 1];
      const layer = aiModel.layers[i];
      const dense = tf.layers.dense({
        units: layer.inputSize,
        activation: this.getActivation(prevLayer.activation)
      });
      layers.push(dense.apply(layers[i - 1]));
    }

    const output = tf.layers
      .dense({
        units: 2,
        activation: this.getActivation(
          aiModel.layers[aiModel.layers.length - 1].activation
        )
      })
      .apply(layers[layers.length - 1]);

    this.model = tf.model({ inputs: input, outputs: output });
    for (let i = 1; i < aiModel.layers.length; i++) {
      const prevLayer = aiModel.layers[i - 1];
      const layer = aiModel.layers[i];
      console.log(this.model.layers[i]);
      this.model.layers[i].setWeights([
        tf.tensor(prevLayer.weights),
        tf.fill([layer.inputSize], prevLayer.bias)
      ]);
    }
  }

  update() {
    let sensors = this.controller.currentSensors;

    if (sensors.distanceData && sensors.distanceData.length > 0) {
      let input = [sensors.velocityX, sensors.velocityY, sensors.angle];

      for (let i in sensors.distanceData) {
        input.push(sensors.distanceData[i]);
      }
      const output = this.model.predict(tf.tensor([input])).dataSync();
      this.controller.update(output[1], output[0]);
    } else {
      this.controller.update(0, 0);
    }
  }

  getActivation(activation) {
    switch (activation) {
      case 'org.nd4j.linalg.activations.impl.ActivationSigmoid':
        return 'sigmoid';
      case 'org.nd4j.linalg.activations.impl.ActivationTanH':
        return 'tanh';
      default:
        return 'sigmoid';
    }
  }
}
