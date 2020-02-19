import React from "react";
import styled from "styled-components";
import { Form, Icon, Input, Button, Checkbox } from "antd";

const StyledForm = styled(Form)`
  max-width: 500px;
`;

const ForgotLink = styled.a`
  float: right;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

const LoginForm = props => {
  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <StyledForm onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your username!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("remember", {
          valuePropName: "checked",
          initialValue: true
        })(<Checkbox>Remember me</Checkbox>)}
        <ForgotLink className="login-form-forgot" href="#">
          Forgot password
        </ForgotLink>
        <LoginButton
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </LoginButton>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </StyledForm>
  );
};

export default Form.create({ name: "login_form" })(LoginForm);
