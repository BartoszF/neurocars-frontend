import React from "react";
import { observer } from "mobx-react";
import { Avatar } from 'antd';

export const PlayerAvatar = props => {
  return (
    <Avatar src={props.userStore.player ? props.userStore.gravatarUrl : ""} />
  );
};
