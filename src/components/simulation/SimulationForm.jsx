import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import useStores from '../../useStores';
import SimulationService from '../../service/SimulationService';

const StyledForm = styled(Form)`
  //max-width: 500px;
`;

const SimulationForm = observer(props => {
  const history = useHistory();
  const { userStore } = useStores();
  let [loading, setLoading] = useState(false);

  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        setLoading(true);

        SimulationService.createSimulation()
          .then(simulation => {
            history.push(`/simulation/${simulation.id}`);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <StyledForm onSubmit={handleSubmit} className="simulation-form">
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input simulation name!' }]
        })(
          <Input
            prefix={
              <Icon type="file-text" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder="Name"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="simulation-form-button"
        >
          {loading ? <Spin indicator={<Icon type="loading" />} /> : "Create"}
        </Button>
      </Form.Item>
    </StyledForm>
  );
});

export default Form.create({ name: 'simulation_form' })(SimulationForm);
