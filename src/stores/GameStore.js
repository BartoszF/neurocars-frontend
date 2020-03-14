import { action, observable, toJS, computed } from 'mobx';
import SimulationService from '../service/SimulationService';

export default class GameStore {
  @observable frameData = [];
  @observable simulation = {};
  @observable aiModel = {};
  @observable simulationView = false;
  @observable simulationRunning = false;
  @observable simulationEnded = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get isSimulationRunning() {
    return toJS(this.simulationRunning);
  }

  @computed get isSimulationEnded() {
    return toJS(this.simulationEnded);
  }

  @action
  addFrame(frame) {
    this.frameData.push(frame);
  }

  @action
  getSimulation(simulationId) {
    SimulationService.getSimulation(simulationId).then(
      action('getSimulation', data => {
        this.simulation = data;
      }),
      action('error', error => {
        console.log(error);
      })
    );
  }

  @computed get simulationObject() {
    return toJS(this.simulation);
  }

  @action setSimulation(simulation) {
    this.simulation = simulation;
  }

  @computed get isSimulationView() {
    return toJS(this.simulationView);
  }

  @computed get aiModelObject() {
    return toJS(this.aiModel);
  }

  @action setAiModel(aiModel) {
    this.aiModel = aiModel;
    this.simulationView = true;
  }

  @action
  sendFrames(framesNum, endSimulation = false) {
    let frames = toJS(this.frameData);
    let length = this.frameData.length;
    let body = { id: this.simulation.id, simSteps: frames };

    if (endSimulation) {
      body.expectedSimSteps = framesNum;
    }

    SimulationService.patchSimulation(this.simulation.id, body).then(
      action('sendFrames', data => {
        this.frameData.splice(0, length);
        if (endSimulation) {
          this.simulationEnded = true;
        }
      }),
      action('error', error => {
        console.log(error);
      })
    );
  }

  @action
  startSimulation() {
    this.simulationRunning = true;
  }

  @action
  endSimulation(frame) {
    this.simulationRunning = false;
    this.sendFrames(frame, true);
  }
}
