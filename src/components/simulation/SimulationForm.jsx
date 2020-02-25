import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Form, Icon, Input, Button } from "antd";
import { useHistory } from 'react-router-dom';

const StyledForm = styled(Form)`
  //max-width: 500px;
`;

const SimulationForm = observer(props => {
  const history = useHistory();

  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        
        //props.userStore.authenticated = true;

        //history.push("/");
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <StyledForm onSubmit={handleSubmit} className="simulation-form">
      <Form.Item>
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Please input simulation name!" }]
        })(
          <Input
            prefix={<Icon type="file-text" style={{ color: "rgba(0,0,0,.25)" }} />}
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
          Create
        </Button>
      </Form.Item>
    </StyledForm>
  );
});

export default Form.create({ name: "simulation_form" })(SimulationForm);
