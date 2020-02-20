import React from "react";
import { Avatar } from "antd";

export const LeagueBadge = props => {
  const userLeague = props.userStore.player
    ? props.userStore.player.league
    : "";
  return (
    <Avatar style={{ backgroundColor: "#40aaff" }} size="small" shape="square">
      {userLeague}
    </Avatar>
  );
};
