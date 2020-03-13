import React from 'react';
import { observer } from 'mobx-react';
import useStores from '../../useStores';
import { useHistory } from 'react-router-dom';
import { Button, Row } from 'antd';
import { useIntl } from 'react-intl';
import { SimulationMessages } from '../../i18n/globalMessages/Simulation';

export const SimulationView = observer(props => {
  const { gameStore } = useStores();
  const history = useHistory();
  const intl = useIntl();

  let onClick = () => {
    gameStore.setSimulation(props.simulation);
    history.push('/gameTest');
  };

  let getMessage = () => {
    switch (props.simulation.state) {
      case 'IN_CREATION':
        return SimulationMessages.inCreationState;
      case 'AWAITING_DATA':
        return SimulationMessages.awaitingDataState;
      case 'GATHERED_DATA':
        return SimulationMessages.gatheredDataState;
      case 'LOST_DATA':
        return SimulationMessages.lostDataState;
      case 'AWAITING_MODEL':
        return SimulationMessages.awaitingModelState;
      case 'FINISHED':
        return SimulationMessages.finishedState;
      default:
        return SimulationMessages.unknownState;
    }
  };

  return (
    <div>
      <Row>
        <h2>Simulation name here</h2>
      </Row>
      <Row>
        <span>{`${intl.formatMessage(SimulationMessages.state)}: ${intl.formatMessage(getMessage())}`}</span>
      </Row>

      <Button onClick={onClick}>Learn</Button>
    </div>
  );
});
