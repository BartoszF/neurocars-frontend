import React, { useState } from "react";
import { observer } from "mobx-react";
import useStores from "../../useStores";
import { Menu, Avatar } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { PlayerAvatar } from "./player/PlayerAvatar";
import { LeagueBadge } from "./player/LeagueBadge";
import { PlayerName } from "./player/PlayerName";

const RightMenu = styled(Menu)`
  float: right;
  line-height: 64px;
`;


export const Navbar = observer(props => {
  const [selectedKey, setSelectedKey] = useState("/");
  const { userStore } = useStores();
  const history = useHistory();

  const userSubMenu = (
    <span>
      <LeagueBadge userStore={userStore} />
      <PlayerName userStore={userStore} />
      <PlayerAvatar userStore={userStore} />
    </span>
  );

  const authenticatedMenu = [
    <Menu.Item key="/">Dashboard</Menu.Item>,
    <Menu.SubMenu key="userSubMenu" title={userSubMenu}>
      <Menu.Item key="/profile">Profile</Menu.Item>
    </Menu.SubMenu>
  ];

  const nonAuthenticatedMenu = [
    <Menu.Item key="/">Home</Menu.Item>,
    <Menu.Item key="/register">Register</Menu.Item>,
    <Menu.Item key="/login">Login</Menu.Item>
  ];

  const userMenu = userStore.authenticated
    ? authenticatedMenu
    : nonAuthenticatedMenu;

  const clickCallback = clickEvent => {
    let path = clickEvent.keyPath.join("");
    setSelectedKey(path);
    history.push(path);
  };

  return (
    <RightMenu
      onClick={clickCallback}
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[selectedKey]}
    >
      {userMenu}
    </RightMenu>
  );
});
