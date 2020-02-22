import React from "react";
import { Avatar } from "antd";

export const LeagueBadge = props => {
  const player = props.player
    ? props.player.league
    : "";
  return (
    <Avatar style={{ backgroundColor: "#40aaff" }} size="small" shape="square">
      {player}
    </Avatar>
  );
};
