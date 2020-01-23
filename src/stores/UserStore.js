import { action, observable } from 'mobx';

class UserStore {

    @observable userData = {};


    @action setUser(userData) {
        this.userData = userData;
      }

}

export default new UserStore();