
import UserStore from './UserStore';
import GameStore from './GameStore';
import LocaleStore from './LocaleStore';

class RootStore {
    constructor() {
        this.localeStore = new LocaleStore(this);
        this.userStore = new UserStore(this);
        this.gameStore = new GameStore(this);
    }
}

export default new RootStore();