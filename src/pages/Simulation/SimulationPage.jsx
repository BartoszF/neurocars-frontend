import React from "react";
import { observer } from "mobx-react";
import { useState } from "react";
import { useEffect } from "react";
import SimulationForm from "../../components/simulation/SimulationForm";
import { Row, Col } from "antd";
import SimulationService from '../../service/SimulationService';
import { SimulationView } from '../../components/simulation/SimulationView';
import { PaddedRow25px } from "../../components/common/PaddedRow";
import LoadingIndicator from "../../components/common/LoadingIndicator";

export const SimulationPage = observer(props => {
  let simId = props.match.params.id;
  let [simulation, setSimulation] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (simId) {
      SimulationService.getSimulation(simId).then((simulation) => {
        setSimulation(simulation);
        setLoading(false);
      }).catch(err => {
        console.log(err);
        setLoading(false);
      })
    } else {
      setLoading(false);
    }
  }, [simId]);

  

  if(loading) {
    return <LoadingIndicator />
  }

  return (
    <PaddedRow25px>
      <Col span={8} />
      <Col span={8}>
        <h3>{simulation ? simulation.name : "Create simulation"}</h3>
        {simulation ? <SimulationView simulation={simulation} /> : <SimulationForm simulation={simulation} />}
      </Col>
      <Col span={8} />
    </PaddedRow25px>
  );
});
