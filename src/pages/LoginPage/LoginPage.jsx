import React from "react";
import { Col } from "antd";
import LoginForm from "../../components/login/LoginForm";
import { PaddedRow10Percent } from '../../components/common/PaddedRow';
import { observer } from 'mobx-react';
import useStores from '../../useStores';


export const LoginPage = observer((props) => {
  const {userStore} = useStores();
  return (
    <PaddedRow10Percent>
      <Col span={9}></Col>
      <Col span={6}>
        <LoginForm userStore={userStore} />
      </Col>
      <Col span={9}></Col>
    </PaddedRow10Percent>
  );
});
