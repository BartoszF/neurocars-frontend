import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer, Provider } from "mobx-react";

import { IntlProvider } from "react-intl";
import translations from "./i18n/locales";

import { HomePage } from "./pages/HomePage/HomePage";
import { GamePage } from "./pages/GamePage/GamePage";

import userStore from "./stores/UserStore";
import gameStore from "./stores/GameStore";

//In future this would be set by a control on the page and saved to store
const localeProp = "en";

const stores = {
  userStore,
  gameStore
};

function App() {
  return (
    <IntlProvider
      locale={localeProp}
      defaultLocale="en"
      key={localeProp}
      messages={translations[localeProp]}
    >
      <Provider {...stores}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/gameTest" component={GamePage} />
          </Switch>
        </Router>
      </Provider>
    </IntlProvider>
  );
}

export default observer(App);
