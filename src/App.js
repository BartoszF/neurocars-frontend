import React from "react";
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

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Provider rootStore={RootStore}>
      <IntlProvider
        locale={RootStore.localeStore.currentLocale}
        defaultLocale="en"
        key={RootStore.localeStore.currentLocale}
        messages={RootStore.localeStore.messagesArray}
      >
        <Router>
          <Layout>
            <Header>
              <Navbar />
            </Header>
            <Content>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/gameTest" component={GamePage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
              </Switch>
            </Content>
            <Footer>DUPSKO</Footer>
          </Layout>
        </Router>
      </IntlProvider>
    </Provider>
  );
}

export default observer(App);
