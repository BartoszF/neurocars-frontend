import React, { useState, useEffect } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import { scene } from "./GameScene.jsx";
import styled from "styled-components";
import { observer } from "mobx-react";
import useStores from '../../useStores';

const GameWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
`;

export const GamePage = observer(props => {
  let [init, setInit] = useState(true);
  let {gameStore, userStore} = useStores();

  useEffect(() => {
    if(userStore.userData == null && userStore.operation === "NO") {
      userStore.getPlayerByUsername("KebabuTurka");
    }
  })

  const game = {
    type: Phaser.AUTO,
    physics: {
      default: "matter",
      matter: {
        debug: true
      }
    },
    scale: {
      mode: Phaser.Scale.FIT,
      width: 1366,
      height: 768,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    fps: 30,
    scene: scene
  };

  return (
    <GameWrapper>
      <IonPhaser game={game} initialize={init} />
    </GameWrapper>
  );
});
