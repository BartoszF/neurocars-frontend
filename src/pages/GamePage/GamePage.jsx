import React, {  useState } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import { scene } from "./GameScene.jsx";
import styled from "styled-components";

const GameWrapper = styled.div`
    width:800px;
    height:600px;
    margin-left:auto;
    margin-right:auto;
    margin-top:50px;
`;

export const GamePage = props => {
  let [init, setInit] = useState(true);

  const game = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scene: scene
  };

  return (
    <GameWrapper>
      <IonPhaser game={game} initialize={init} />
    </GameWrapper>
  );
};


