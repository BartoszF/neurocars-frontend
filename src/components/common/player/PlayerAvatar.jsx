import React from "react";
import { Avatar } from 'antd';
import md5 from "md5";

const GRAVATAR_URL = "https://www.gravatar.com/avatar/";

export const PlayerAvatar = props => {

  let gravatarUrl = (player) => {
    if (player) {
      let emailHash = md5(player.email.toLowerCase().trim());

      return GRAVATAR_URL + emailHash;
    }
    return "";
  }

  return (
    <Avatar src={props.player ? gravatarUrl(props.player) : ""} />
  );
};
