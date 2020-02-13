import { action, observable, toJS } from "mobx";
import SimulationService from "../service/SimulationService";

class GameStore {
  @observable frameData = [];
  @observable simulation = {};
  @observable simulationRunning = false;
  @observable operation = "NO";

  isSimulationRunning() {
    return toJS(this.simulationRunning);
  }
  getOperation() {
    return toJS(this.operation);
  }
  @action
  addFrame(frame) {
    this.frameData.push(frame);
  }

  @action
  createSimulation(playerId) {
    this.operation = "PENDING";
    SimulationService.createSimulation(playerId).then(
      action("createSimulation", data => {
        this.simulation = data;
        this.simulationRunning = true;
        this.operation = "SUCCES";
      }),
      action("error", error => {
        console.log(error);
        this.operation = "ERROR";
      })
    );
  }

  @action
  getSimulation(simulationId) {
    SimulationService.getSimulation(simulationId).then(
      action("getSimulation", data => {
        this.simulation = data;
      }),
      action("error", error => {
        console.log(error);
      })
    );
  }

  @action
  sendFrames(framesNum, limit = 30) {
    let frames = toJS(this.frameData).slice(0, 30);
    let body = { expectedSimSteps: framesNum, simSteps: frames };

    SimulationService.patchSimulation(this.simulation, body).then(
      action("sendFrames", data => {
        //this.conversations.push(data);
        //this.lastOperation = "SUCCES";
        this.frameData.splice(0, limit);
      }),
      action("error", error => {
        console.log(error);
        //this.lastOperation = "ERROR";
      })
    );

    //TODO: REMOVE
    this.frameData.splice(0, 30);
  }

  @action
  endSimulation(frame) {
    this.simulationRunning = false;
    this.sendFrames(frame, this.frameData.length-1);
  }
}

export default new GameStore();
