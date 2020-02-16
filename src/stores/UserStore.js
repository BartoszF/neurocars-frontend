import { action, observable, toJS } from "mobx";
import UserService from "../service/UserService";

class UserStore {
  @observable player = null;
  @observable operation = "NO"; //TODO do some enum

  //TODO: temporary?
  @action
  getPlayerByUsername(username) {
    this.operation = "PENDING"
    UserService.getPlayerByUsername(username).then(
      action("getPlayerByUsername", data => {
        this.operation = "SUCCES"
        this.player = data;
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

  getPlayer(){
    return toJS(this.player);
  }

  @action setUser(userData) {
    this.userData = userData;
  }
}

export default new UserStore();
