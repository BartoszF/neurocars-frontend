import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import { useHistory } from 'react-router-dom';
import UserService from '../../service/UserService';
import { login } from '../../service/APIUtils';
import { ACCESS_TOKEN } from '../../constants';
import LoadingIndicator from '../common/LoadingIndicator';
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

const LoginForm = props => {
  const history = useHistory();
  const intl = useIntl();
  const [error, setError] = useState('');
  let [loading, setLoading] = useState(false);

  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let data = { username: values.username, password: values.password };
        //props.userStore.authenticated = true;
        setLoading(true);
        UserService.login(data)
          .then(header => {
            if (header === null) {
              throw { err: 'Login failed' };
            }
            localStorage.setItem(
              ACCESS_TOKEN,
              header.replace('Bearer', '').trim()
            );
            UserService.me()
              .then(user => {
                user.rating = 1000;
                user.league = 'F';
                //user.email = 'iron.dantix@gmail.com';
                props.userStore.setUser(user);
                setLoading(false);
                history.push('/');
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
            setError(err.err);
          });
      }
    });
  };

  const { getFieldDecorator } = props.form;
  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <StyledForm onSubmit={handleSubmit} className="login-form">
      {error !== '' ? <Alert message={error} type="error" /> : ''}
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: intl.formatMessage(PlayerMessages.username).toLowerCase()
            }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={intl.formatMessage(PlayerMessages.username)}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: intl.formatMessage(PlayerMessages.password).toLowerCase()
            }
          ]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder={intl.formatMessage(PlayerMessages.password)}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
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
          <FormattedMessage id="form.login" />
        </LoginButton>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </StyledForm>
  );
};

export default Form.create({ name: 'login_form' })(LoginForm);
