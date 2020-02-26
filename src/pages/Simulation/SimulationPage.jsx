import React from "react";
import { observer } from "mobx-react";
import { useState } from "react";
import { useEffect } from "react";
import SimulationForm from "../../components/simulation/SimulationForm";
import { Row, Col } from "antd";

export const SimulationPage = observer(props => {
  let simId = props.match.params.id;
  let [simulation, setSimulation] = useState(null);

  useEffect(() => {
    if (simId) {
      //TODO: Add service for simulation
      setSimulation({ id: simId, name: "TEST" });
    }
  }, [simId]);

  return (
    <Row>
      <Col span={8} />
      <Col span={8}>
        <h3>{simulation ? simulation.name : "Create simulation"}</h3>
        <SimulationForm simulation={simulation} />
      </Col>
      <Col span={8} />
    </Row>
  );
});
