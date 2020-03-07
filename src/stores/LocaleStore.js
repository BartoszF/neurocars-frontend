import { observable, computed, action } from 'mobx';
import translations from "../i18n/locales";
import { toJS } from 'mobx';

export default class LocaleStore {
    @observable locale = 'en';
    @observable messages = [];

    constructor(rootStore){
        this.rootStore = rootStore;
        this.messages = translations
        this.locale = (navigator.language || navigator.userLanguage).substring(0,2);
    }

    @action
    setCurrentLocale(language) {
        this.locale = language;
    }

    @computed get currentLocale() {
        return toJS(this.locale);
    }

    @computed get messagesArray() {
        return toJS(this.messages[this.currentLocale]);
    }

}