import React from 'react';
import { observer } from 'mobx-react';
import useStores from '../../useStores';
import { useHistory } from 'react-router-dom';
import { Button, Row, Popconfirm } from 'antd';
import { useIntl } from 'react-intl';
import { SimulationMessages } from '../../i18n/globalMessages/Simulation';
import { CommonMessages } from '../../i18n/globalMessages/Common';

export const SimulationView = observer(props => {
  const { gameStore } = useStores();
  const history = useHistory();
  const intl = useIntl();

  let onClick = () => {
    if (props.simulation.state === 'FINISHED') {
    }
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

  let learnButtonVisible = () => {
    return ['IN_CREATION', 'AWAITING_DATA', 'FINISHED'].contains(
      props.simulation.state
    );
  };

  let learnWillDeleteData = () => {
    return props.simulation.state === 'FINISHED';
  };

  let getLearnButton = (shouldPassClick) => {
    if (learnButtonVisible) {
      return <Button onClick={shouldPassClick ? onClick: () => {}}>Learn</Button>;
    }

    return <></>;
  };

  let getLearnButtonWithConfirm = () => {
    if (learnWillDeleteData()) {
      return (
        <Popconfirm
          title={intl.formatMessage(CommonMessages.confirmDeletePreviousData)}
          onConfirm={onClick}
          okText={intl.formatMessage(CommonMessages.yes)}
          cancelText={intl.formatMessage(CommonMessages.no)}
        >{getLearnButton(false)}</Popconfirm>
      );
    }

    return getLearnButton(true);
  };

  return (
    <div>
      <Row>
        <h2>Simulation name here</h2>
      </Row>
      <Row>
        <span>{`${intl.formatMessage(
          SimulationMessages.state
        )}: ${intl.formatMessage(getMessage())}`}</span>
      </Row>

      {getLearnButtonWithConfirm()}
    </div>
  );
});
