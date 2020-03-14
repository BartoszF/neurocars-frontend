import Brain from './Brain';

describe('Brain', () => {
  it('completes', () => {
      const expectedX = 0.9818326;
      const expectedY = 0.9142582;
    const aiModel = {
      layers: [
        {
          inputSize: 18,
          bias: 0.8187559413810986,
          weights: [
            [0.5069605112075806, 0.7023072242736816],
            [0.8309239149093628, 0.11902939528226852],
            [0.3208557367324829, 0.6812316179275513],
            [0.85658860206604, 0.784397542476654],
            [0.441424161195755, 0.5470413565635681],
            [0.11218147724866867, 0.2288551926612854],
            [0.09263163059949875, 0.03328993543982506],
            [0.8378371596336365, 0.5152773261070251],
            [0.4345831871032715, 0.15618811547756195],
            [0.16680000722408295, 0.12279464304447174],
            [0.9761819839477539, 0.4247250258922577],
            [0.3589560091495514, 0.3684273660182953],
            [0.3157801032066345, 0.6721852421760559],
            [0.5099884867668152, 0.3813857436180115],
            [0.44231361150741577, 0.9013673663139343],
            [0.05927092954516411, 0.4995415508747101],
            [0.010208463296294212, 0.14863371849060059],
            [0.1530204862356186, 0.7677065134048462]
          ],
          activation: 'org.nd4j.linalg.activations.impl.ActivationSigmoid'
        },
        {
          inputSize: 2,
          bias: 0.87017000646804,
          weights: [
            [0.9093779921531677, 0.3307114839553833],
            [0.566526472568512, 0.3519909679889679]
          ],
          activation: 'org.nd4j.linalg.activations.impl.ActivationTanH'
        }
      ]
    };

    let brain = new Brain(aiModel);

    let sensors = [0.0, 1.0, 2.0];

    for (let i = 0; i < 15; i ++) {
      sensors.push(i);
    }

    console.log(sensors)

    let output = brain.update(sensors);
    expect(Math.abs(output[1] - expectedX) < 0.2).toBeTruthy();
    expect(Math.abs(output[0] - expectedY) < 0.2).toBeTruthy();
    console.log(output[1], expectedX);
    console.log(output[0], expectedY);
  });
});
