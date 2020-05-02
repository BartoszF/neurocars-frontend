import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer, Provider } from "mobx-react";

import "antd/dist/antd.css";
import { Layout } from "antd";

import { IntlProvider } from "react-intl";

import { HomePage } from "./pages/HomePage/HomePage";
import { GamePage } from "./pages/GamePage/GamePage";

import { Navbar } from "./components/common/Navbar";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import RootStore from "./stores/RootStore";
import { SimulationPage } from "./pages/Simulation/SimulationPage";
import PrivateRoute from "./components/common/PrivateRoute";
import { ACCESS_TOKEN } from "./constants";
import UserService from "./service/UserService";

const { Header, Footer, Content } = Layout;

function App() {
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      UserService.me()
        .then((player) => {
          player.league = "F";
          player.rank = 1000;
          RootStore.userStore.setUser(player);
        })
        .catch((err) => {
          RootStore.userStore.clearContext();
          localStorage.removeItem(ACCESS_TOKEN);
        });
    } else {
      RootStore.userStore.clearContext();
      localStorage.removeItem(ACCESS_TOKEN);
    }
  }, []);

  return (
    <IntlProvider
      locale={RootStore.localeStore.currentLocale}
      defaultLocale="en"
      key={RootStore.localeStore.currentLocale}
      messages={RootStore.localeStore.messagesArray}
    >
      <Provider rootStore={RootStore}>
        <Router>
          <Switch>
            {/* <PrivateRoute path="/gameTest/:simId" component={GamePage} /> */}
            <Route path="/gameTest/:simId" component={GamePage} />
            <Layout>
              <Header>
                <Navbar />
              </Header>
              <Content>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <PrivateRoute
                  path="/simulation/:id?"
                  component={SimulationPage}
                />
              </Content>
              {/* <Footer>DUPSKO</Footer> */}
            </Layout>
          </Switch>
        </Router>
      </Provider>
    </IntlProvider>
  );
}

export default observer(App);
