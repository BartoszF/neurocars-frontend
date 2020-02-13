import React, {  useState } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import { scene } from "./GameScene.jsx";
import styled from "styled-components";

const GameWrapper = styled.div`
    width:100%;
    height:100%;
    margin-left:auto;
    margin-right:auto;
    position: absolute;
`;

export const GamePage = props => {
  let [init, setInit] = useState(true);

  const game = {
    type: Phaser.AUTO,
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scale: {
      mode: Phaser.Scale.FIT,
      width: 1366,
      height: 768,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: scene
  };

  return (
    <GameWrapper>
      <IonPhaser game={game} initialize={init} />
    </GameWrapper>
  );
};


