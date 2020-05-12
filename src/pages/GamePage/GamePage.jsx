import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import useStores from "../../useStores";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";

import { Progress } from "antd";

import Unity, { UnityContent } from "react-unity-webgl";
import { GameContainer } from "./GameContainer";

const GameWrapper = styled.div`
  height: 100vh;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
`;

const ProgressDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10000;
  transform: translate(-50%, -50%);
  & .ant-progress-text {
    color: white;
  }
`;

let unityContent = new UnityContent(
  "/game/Build.json",
  "/game/UnityLoader.js",
  {
    adjustOnWindowResize: true,
  }
);

export const GamePage = observer((props) => {
  let [progress, setProgress] = useState(0.0);
  let [loaded, setLoaded] = useState(false);
  //let { gameStore } = useStores();
  //const history = useHistory();
  let { simId } = useParams();

  unityContent.on("progress", (progress) => {
    setProgress(progress);
  });

  unityContent.on("loaded", () => {
    setLoaded(true);
    //console.log(simId);
  });

  unityContent.on("quitted", () => {
    console.log("QUITTING");
  });

  unityContent.on("GameLoaded", () => {
    let token = localStorage.getItem(ACCESS_TOKEN);
    unityContent.send("Communication", "SetToken", token);
    unityContent.send("Communication", "CommunicationReady", Number(simId));
  });

  unityContent.on("Finished", (numFrames) => {
    console.log("Finished");
    //gameStore.endSimulation(numFrames);
    //history.push(`/`);
  });

  return (
    <GameWrapper id="gameParent">
      {loaded === false && (
        <ProgressDiv>
          <Progress type="circle" percent={parseInt(progress * 100)} />
        </ProgressDiv>
      )}
      <GameContainer unityContent={unityContent} />
    </GameWrapper>
  );
});
