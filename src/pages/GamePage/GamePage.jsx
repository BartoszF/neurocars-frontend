import React, { useState } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import { scene } from "./GameScene.jsx";
import styled from "styled-components";
import { observer } from "mobx-react";
import useStores from "../../useStores";

const GameWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  height: 800px;
`;

export const GamePage = observer(props => {
  let [init] = useState(true);
  let { gameStore, userStore } = useStores();

  // useEffect(() => {
  //   userStore.getPlayerByUsername("KebabuTurka");
  // }, []);

  const game = {
    type: Phaser.AUTO,
    physics: {
      default: "matter",
      matter: {
        debug: false
      }
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    fps: 30,
    width: 1366,
    height: 768,
    scene: scene,
    gameStore: gameStore,
    userStore: userStore
  };

  return (
    <GameWrapper>
      <IonPhaser game={game} initialize={init} />
    </GameWrapper>
  );
});
