import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox, Alert, Spin } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import UserService from '../../service/UserService';
import { ACCESS_TOKEN } from '../../constants';
import { useIntl } from 'react-intl';
import { PlayerMessages } from '../../i18n/globalMessages/Player';
import { FormattedMessage } from 'react-intl.macro';

const StyledForm = styled(Form)`
  max-width: 500px;
`;

const ForgotLink = styled.a`
  float: right;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

const LoginForm = (props) => {
  const history = useHistory();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  let [loading, setLoading] = useState(false);

  let handleSubmit = (values) => {
    let data = { username: values.username, password: values.password };
    //props.userStore.authenticated = true;
    setLoading(true);
    UserService.login(data)
      .then((header) => {
        if (header === null) {
          setLoading(false);
          throw { err: 'Login failed' };
        }
        localStorage.setItem(ACCESS_TOKEN, header.replace('Bearer', '').trim());
        UserService.me()
          .then((user) => {
            user.rating = 1000;
            user.league = 'F';
            props.userStore.setUser(user);
            setLoading(false);
            history.push('/');
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.err);
      });
  };

  return (
    <StyledForm
      form={form}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      className="login-form"
    >
      {error !== '' ? <Alert message={error} type="error" /> : ''}
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: intl.formatMessage(PlayerMessages.username).toLowerCase(),
          },
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder={intl.formatMessage(PlayerMessages.username)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: intl.formatMessage(PlayerMessages.password).toLowerCase(),
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
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>
            <FormattedMessage id="form.rememberMe" />
          </Checkbox>
        </Form.Item>
        <ForgotLink className="login-form-forgot" href="#">
          <FormattedMessage id="form.forgotPassword" />
        </ForgotLink>
        <LoginButton
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          {loading ? (
            <Spin indicator={<LoadingOutlined />} />
          ) : (
            <FormattedMessage id="form.login" />
          )}
        </LoginButton>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </StyledForm>
  );
};

export default LoginForm;
