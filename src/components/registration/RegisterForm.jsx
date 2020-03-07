import React from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button } from 'antd';
import UserService from '../../service/UserService';
import { useHistory } from 'react-router-dom';
import { defineMessages, FormattedMessage } from 'react-intl.macro';
import { useIntl } from 'react-intl';
import { FormMessages } from '../../i18n/globalMessages/Form';
import { PlayerMessages } from '../../i18n/globalMessages/Player';

const StyledForm = styled(Form)`
  max-width: 500px;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

const RegisterForm = props => {
  let history = useHistory();
  const intl = useIntl();

  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        let data = {
          username: values.username,
          email: values.email,
          password: values.password
        };
        UserService.createUser(data)
          .then(response => {
            console.log(response);
            history.push('/login');
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <StyledForm onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: intl.formatMessage(FormMessages.formProvide, {
                value: intl.formatMessage(PlayerMessages.username).toLowerCase()
              })
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
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              required: true,
              message: intl.formatMessage(
                { id: 'form.provide' },
                {
                  value: intl.formatMessage(PlayerMessages.email).toLowerCase()
                }
              )
            }
          ]
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={intl.formatMessage(PlayerMessages.email)}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: intl.formatMessage(
                { id: 'form.provide' },
                {
                  value: intl
                    .formatMessage(PlayerMessages.password)
                    .toLowerCase()
                }
              )
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
        <LoginButton
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          <FormattedMessage id="form.register" />
        </LoginButton>
      </Form.Item>
    </StyledForm>
  );
};

export default Form.create({ name: 'register_form' })(RegisterForm);
