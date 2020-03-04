import React from 'react';
import { observer } from "mobx-react";
import useStores from '../../useStores';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

export const SimulationView = observer(props => {
    const { gameStore } = useStores();
    const history = useHistory();

    let onClick = () => {
        gameStore.setSimulation(props.simulation);
        history.push("/gameTest");
    }

  return <div>
      DUPSKO
      <Button onClick={onClick}>Learn</Button>
  </div>;
});
