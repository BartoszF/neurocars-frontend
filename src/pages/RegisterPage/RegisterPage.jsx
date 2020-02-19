import React from "react";
import { Col } from "antd";
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
