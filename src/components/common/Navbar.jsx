import React, { useState } from "react";
import { observer } from "mobx-react";
import useStores from "../../useStores";
import { Menu, Icon } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { PlayerAvatar } from "./player/PlayerAvatar";
import { LeagueBadge } from "./player/LeagueBadge";
import { PlayerName } from "./player/PlayerName";
import { FormattedMessage } from "react-intl.macro";
import { useEffect } from "react";

const RightMenu = styled(Menu)`
  float: right;
  line-height: 64px;
`;


export const Navbar = observer(props => {
  const history = useHistory();
  const [selectedKey, setSelectedKey] = useState("/");
  const { userStore } = useStores();
  
  useEffect(() => {
    setSelectedKey(history.location.pathname);
  }, [history.location.pathname]);

  const userSubMenu = (
    <span>
      <LeagueBadge player={userStore.player} />
      <PlayerName player={userStore.player} />
      <PlayerAvatar player={userStore.player} />
    </span>
  );

  const authenticatedMenu = [
    <Menu.Item key="/"><FormattedMessage id="navbar.dashboard" defaultMessage="Dashboard" /></Menu.Item>,
    <Menu.Item key="/simulation"><Icon type="plus" style={{fontSize: 16}}/><FormattedMessage id="navbar.newSimulation" defaultMessage="New Simulation" /></Menu.Item>,
    <Menu.SubMenu key="userSubMenu" title={userSubMenu}>
      <Menu.Item key="/profile"><FormattedMessage id="navbar.profile" defaultMessage="Profile" /></Menu.Item>
    </Menu.SubMenu>
  ];

  const nonAuthenticatedMenu = [
    <Menu.Item key="/"><FormattedMessage id="navbar.home" defaultMessage="Home" /></Menu.Item>,
    <Menu.Item key="/register"><FormattedMessage id="navbar.register" defaultMessage="Register" /></Menu.Item>,
    <Menu.Item key="/login"><FormattedMessage id="navbar.login" defaultMessage="Login" /></Menu.Item>
  ];

  const userMenu = userStore.authenticated
    ? authenticatedMenu
    : nonAuthenticatedMenu;

  const clickCallback = clickEvent => {
    let path = clickEvent.key;
    setSelectedKey(path);
    history.push(path);
  };

  return (
    <RightMenu
      onClick={clickCallback}
      theme="dark"
      mode="horizontal"
      selectedKeys={[selectedKey]}
    >
      {userMenu}
    </RightMenu>
  );
});
