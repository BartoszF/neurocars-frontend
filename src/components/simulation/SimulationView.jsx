import React from 'react';
import { observer } from "mobx-react";
import useStores from '../../useStores';
import { useHistory } from 'react-router-dom';
import { Button, Row } from 'antd';

export const SimulationView = observer(props => {
    const { gameStore } = useStores();
    const history = useHistory();

    let onClick = () => {
        gameStore.setSimulation(props.simulation);
        history.push("/gameTest");
    }

  return <div>
      <Row><h2>Simulation name here</h2></Row>
      <Row><span>{`State: stateHere`}</span></Row>

      <Button onClick={onClick}>Learn</Button>
  </div>;
});
