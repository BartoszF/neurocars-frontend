import { action, observable, toJS, computed } from "mobx";
import UserService from "../service/UserService";

import localforage from "localforage";

export default class UserStore {
  @observable player = {};
  @observable authenticated = false;
  @observable operation = "NO"; //TODO do some enum
  store = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.store = localforage.createInstance({
      name: "userStore"
    });

    this.store
      .getItem("player")
      .then(player => {
        if (player != null) {
          this.player = player;
          this.authenticated = true;
        }
      })
      .catch(err => {
        console.log("NO PLAYER IN STORE");
      });
  }

  @action
  clearContext() {
    this.authenticated = false;
    this.player = null;
    this.operation = "NO";
    this.store.removeItem("player");
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
        this.store.setItem("player", this.player).catch(err => {
          console.log(err);
        });
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

  @computed get getPlayer() {
    return toJS(this.player);
  }

  @computed get isAuthenticated() {
    return toJS(this.authenticated);
  }

  @action setAuthenticated(auth) {
    this.authenticated = auth;
  }

  @action setUser(player) {
    this.player = player;
    this.authenticated = true;
    this.store.setItem("player", this.getPlayer).catch(err => {
      console.log(err);
    });
  }
}
