import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import useStores from "../../useStores";
import { useHistory, Link } from "react-router-dom";
import { Button, Row, Popconfirm } from "antd";
import { useIntl } from "react-intl";
import { SimulationMessages } from "../../i18n/globalMessages/Simulation";
import { CommonMessages } from "../../i18n/globalMessages/Common";
import SimulationService from "../../service/SimulationService";
import { TrackService } from "../../service/TrackService";

export const SimulationView = observer((props) => {
  const { gameStore } = useStores();
  const history = useHistory();
  const intl = useIntl();
  const [aiModel, setAiModel] = useState(null);
  const [aiModelLoading, setAiModelLoading] = useState(false);

  useEffect(() => {
    gameStore.setSimulation(props.simulation);
    // if (simulationFinished()) {
    //   setAiModelLoading(true);
    //   SimulationService.getAiModel(props.simulation.id)
    //     .then((model) => {
    //       setAiModel(model.networkModelDTO);
    //       gameStore.setAiModel(aiModel);
    //       console.log(model.networkModelDTO);
    //       setAiModelLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setAiModelLoading(false);
    //     });
    // }
  }, [props.simulation.id]);

  let onLearnClick = () => {
    gameStore.setSimulation(props.simulation);
    history.push("/gameTest");
  };

  let getMessage = () => {
    switch (props.simulation.state) {
      case "IN_CREATION":
        return SimulationMessages.inCreationState;
      case "AWAITING_DATA":
        return SimulationMessages.awaitingDataState;
      case "GATHERED_DATA":
        return SimulationMessages.gatheredDataState;
      case "LOST_DATA":
        return SimulationMessages.lostDataState;
      case "AWAITING_MODEL":
        return SimulationMessages.awaitingModelState;
      case "FINISHED":
        return SimulationMessages.finishedState;
      default:
        return SimulationMessages.unknownState;
    }
  };

  let learnButtonVisible = () => {
    return ["IN_CREATION", "AWAITING_DATA", "FINISHED"].contains(
      props.simulation.state
    );
  };

  let simulationFinished = () => {
    return props.simulation.state === "FINISHED";
  };

  let getLearnButton = (shouldPassClick) => {
    if (learnButtonVisible) {
      return (
        <Button onClick={shouldPassClick ? onLearnClick : () => {}}>
          {intl.formatHTMLMessage(SimulationMessages.learn)}
        </Button>
      );
    }

    return <></>;
  };

  const getViewButton = () => {
    let msg = intl.formatHTMLMessage(CommonMessages.view);

    if (simulationFinished()) {
      msg = intl.formatHTMLMessage(CommonMessages.view);
    }

    return (
      <Button>
        <Link to={`/gameTest/${props.simulation.id}`} target="_blank">
          {msg}
        </Link>
      </Button>
    );
  };

  let getLearnButtonWithConfirm = () => {
    if (simulationFinished()) {
      return (
        <Popconfirm
          title={intl.formatMessage(CommonMessages.confirmDeletePreviousData)}
          onConfirm={onLearnClick}
          okText={intl.formatMessage(CommonMessages.yes)}
          cancelText={intl.formatMessage(CommonMessages.no)}
        >
          {getLearnButton(false)}
        </Popconfirm>
      );
    }

    return getLearnButton(true);
  };

  return (
    <div>
      <Row>
        <span>
          {intl.formatMessage(SimulationMessages.track) +
            ": " +
            props.simulation.trackDTO.name}
        </span>
      </Row>
      <Row>
        <span>{`${intl.formatMessage(
          SimulationMessages.state
        )}: ${intl.formatMessage(getMessage())}`}</span>
      </Row>

      {/* {getLearnButtonWithConfirm()} */}
      {getViewButton()}
    </div>
  );
});
