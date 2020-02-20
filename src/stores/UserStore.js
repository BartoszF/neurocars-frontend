import { action, observable, toJS, computed } from "mobx";
import UserService from "../service/UserService";
import md5 from "md5";

const GRAVATAR_URL = "https://www.gravatar.com/avatar/";

class UserStore {
  @observable player = null;
  @observable authenticated = false;
  @observable operation = "NO"; //TODO do some enum

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

  @computed
  get gravatarUrl() {
    if (this.player) {
      let emailHash = md5(this.player.email.toLowerCase().trim());

      return GRAVATAR_URL + emailHash;
    }
    return "";
  }

  @action setUser(userData) {
    this.userData = userData;
  }
}

export default new UserStore();
