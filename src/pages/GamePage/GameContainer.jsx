import Unity from "react-unity-webgl";
import React from 'react';

export const GameContainer = ({unityContent}) => {
  return <Unity width="100%" height="100%" unityContent={unityContent} />;
};
