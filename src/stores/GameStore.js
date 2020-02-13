import { action, observable, toJS } from "mobx";
import SimulationService from "../service/SimulationService";

class GameStore {
  @observable frameData = [];
  @observable simulation = {};

  @action
  addFrame(frame) {
    this.frameData.push(frame);
  }

  @action
  sendFrames() {
    
    let frames = toJS(this.frameData).slice(0,30);
    let body = {simSteps: frames};

    SimulationService.patchSimulation(this.simulation.id, body)/*.then(
      action("sendFrames", data => {
        //this.conversations.push(data);
        //this.lastOperation = "SUCCES";
        this.frameData.splice(0,30);
      }),
      action("error", error => {
        console.log(error);
        //this.lastOperation = "ERROR";
      })
    )*/;

    //TODO: REMOVE
    this.frameData.splice(0,30);
  }
}

export default new GameStore();
