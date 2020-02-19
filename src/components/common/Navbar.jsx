import React from "react";
import { observer } from "mobx-react";
import useStores from "../../useStores";
import { Menu } from "antd";
import styled from "styled-components";

const RightMenu = styled(Menu)`
  float: right;
  line-height: 64px;
`;

export const Navbar = observer(props => {
  const { userStore } = useStores();

  const authenticatedMenu = [
    <Menu.Item key="dashboard">Dashboard</Menu.Item>,
    <Menu.SubMenu title="ProfileName">
      <Menu.Item key="profile">Profile</Menu.Item>
    </Menu.SubMenu>
  ];

  const nonAuthenticatedMenu = [
    <Menu.Item key="index">Home</Menu.Item>,
    <Menu.Item key="register">Register</Menu.Item>,
    <Menu.Item key="login">Login</Menu.Item>
  ];

  const userMenu = userStore.authenticated
    ? authenticatedMenu
    : nonAuthenticatedMenu;

  return (
    <RightMenu theme="dark" mode="horizontal" defaultSelectedKeys={["index"]}>
      {userMenu}
    </RightMenu>
  );
});
