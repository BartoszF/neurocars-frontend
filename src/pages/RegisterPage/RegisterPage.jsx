import React from "react";
import styled from "styled-components";
import { Form, Icon, Input, Button, Checkbox, Col, Row } from "antd";
import LoginForm from "../../components/registration/RegisterForm";
import RegisterForm from "../../components/registration/RegisterForm";
import { PaddedRow } from "../../components/common/PaddedRow";

export const RegisterPage = props => {
  return (
    <PaddedRow>
      <Col span={9}></Col>
      <Col span={6}>
        <RegisterForm />
      </Col>
      <Col span={9}></Col>
    </PaddedRow>
  );
};
