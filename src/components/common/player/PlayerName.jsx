import React from "react";
import styled from "styled-components";

const UserNameSpan = styled.span`
  margin-right: 5px;
  margin-left: 5px;
`;

export const PlayerName = props => {
  const userName = props.userStore.player
    ? props.userStore.player.username
    : "";
  return <UserNameSpan>{userName}</UserNameSpan>;
};
