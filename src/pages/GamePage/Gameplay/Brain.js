import * as tf from '@tensorflow/tfjs';

export default class Brain {
  constructor(aiModel) {
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
      //console.log(i);
      //console.log(this.model.layers[i].getWeights()[0]);
      //this.model.layers[i].getWeights()[0].print();
      this.model.layers[i].setWeights([
        tf.tensor(prevLayer.weights),
        tf.fill([layer.inputSize], prevLayer.bias)
      ]);
    }
    //this.model.layers[1].getWeights()[0].print();

    //this.model.summary();
  }

  update(sensors) {
    const output = this.model.predict(tf.tensor([sensors])).dataSync();

    return [output[1], output[0]];
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
