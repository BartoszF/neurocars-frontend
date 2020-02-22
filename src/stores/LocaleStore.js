import { observable, computed } from 'mobx';
import translations from "../i18n/locales";
import { toJS } from 'mobx';

export default class LocaleStore {
    @observable locale = 'en';
    @observable messages = [];

    constructor(rootStore){
        this.rootStore = rootStore;
        this.messages = translations
    }

    @computed get currentLocale() {
        return toJS(this.locale);
    }

    @computed get messagesArray() {
        return toJS(this.messages[this.currentLocale]);
    }

}