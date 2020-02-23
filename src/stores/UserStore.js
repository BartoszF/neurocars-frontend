import { action, observable, toJS } from "mobx";
import UserService from "../service/UserService";

export default class UserStore {
  @observable player = {};
  @observable authenticated = false;
  @observable operation = "NO"; //TODO do some enum

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  clearContext() {
    this.authenticated = false;
    this.player = null;
    this.operation = "NO";
  }

  //TODO: temporary?
  @action
  getPlayerByUsername(username) {
    this.operation = "PENDING";
    UserService.getPlayerByUsername(username).then(
      action("getPlayerByUsername", data => {
        this.operation = "SUCCES";
        this.player = data;
        this.authenticated = true;
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

  getPlayer() {
    return toJS(this.player);
  }

  @action setUser(userData) {
    this.userData = userData;
  }
}
