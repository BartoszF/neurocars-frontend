import { action, observable, toJS } from "mobx";
import UserService from "../service/UserService";

class UserStore {
  @observable playerId = null;
  @observable operation = "NO"; //TODO do some enum

  //TODO: temporary?
  @action
  getPlayerByUsername(username) {
    this.operation = "PENDING"
    UserService.getPlayerByUsername(username).then(
      action("getPlayerByUsername", data => {
        this.operation = "SUCCES"
        this.playerId = data;
        console.log(data);
      }),
      action("error", error => {
        console.log(error);
        this.lastOperation = "ERROR";
      })
    );
  }

  getOperation() {
    return toJS(this.operation);
  }

  getPlayerId(){
    return toJS(this.playerId);
  }

  @action setUser(userData) {
    this.userData = userData;
  }
}

export default new UserStore();
