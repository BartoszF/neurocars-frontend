import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Spin, Alert } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import UserService from '../../service/UserService';
import { useHistory } from 'react-router-dom';
import { defineMessages, FormattedMessage } from 'react-intl.macro';
import { useIntl } from 'react-intl';
import { FormMessages } from '../../i18n/globalMessages/Form';
import { PlayerMessages } from '../../i18n/globalMessages/Player';
import { useState } from 'react';

const StyledForm = styled(Form)`
  max-width: 500px;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

const RegisterForm = (props) => {
  let history = useHistory();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  let [loading, setLoading] = useState(false);

  let handleSubmit = (values) => {
    setLoading(true);
    let data = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    UserService.createUser(data)
      .then((response) => {
        history.push('/login');
      })
      .catch((err) => {
        setError(err.error);
        setLoading(false);
      });
  };

  return (
    <StyledForm form={form} onFinish={handleSubmit} className="login-form">
      {error !== '' ? <Alert message={error} type="error" /> : ''}
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: intl.formatMessage(FormMessages.formProvide, {
              value: intl.formatMessage(PlayerMessages.username).toLowerCase(),
            }),
          },
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder={intl.formatMessage(PlayerMessages.username)}
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: intl.formatMessage(
              { id: 'form.provide' },
              {
                value: intl.formatMessage(PlayerMessages.email).toLowerCase(),
              }
            ),
          },
        ]}
      >
        <Input
          prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder={intl.formatMessage(PlayerMessages.email)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: intl.formatMessage(
              { id: 'form.provide' },
              {
                value: intl
                  .formatMessage(PlayerMessages.password)
                  .toLowerCase(),
              }
            ),
          },
        ]}
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder={intl.formatMessage(PlayerMessages.password)}
        />
      </Form.Item>
      <Form.Item>
        <LoginButton
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          {loading ? (
            <Spin indicator={<LoadingOutlined />} />
          ) : (
            <FormattedMessage id="form.register" />
          )}
        </LoginButton>
      </Form.Item>
    </StyledForm>
  );
};

export default RegisterForm;
