import React from "react";
import { Col } from "antd";
import LoginForm from "../../components/login/LoginForm";
import { PaddedRow } from '../../components/common/PaddedRow';


export const LoginPage = props => {
  return (
    <PaddedRow>
      <Col span={9}></Col>
      <Col span={6}>
        <LoginForm />
      </Col>
      <Col span={9}></Col>
    </PaddedRow>
  );
};
