import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
import { Connect, signin } from '@codetanzania/emis-api-states';
import { notifyError, notifySuccess } from '../../../util';
import logo from '../../../assets/icons/emislogo-blue.png';
import './styles.css';

/**
 * @class
 * @name Signin
 * @description Signin component which shows signin form
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Signin extends Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
  };

  /**
   * @function
   * @name handleSubmit
   * @description Handle submit event for signin function
   * @param {object} event Submit event
   * @returns {undefined}
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        signin(
          values,
          () => {
            history.push('/app');
            notifySuccess('Welcome to EMIS');
          },
          () => {
            notifyError('Invalid Credentials Please Try Again');
          }
        );
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loading,
    } = this.props;
    return (
      <div className="Signin">
        <img alt="EMIS" src={logo} height={60} width={60} />
        <Form onSubmit={this.handleSubmit} autoComplete={false}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  email: true,
                  message: 'Please input your username!',
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="signin-form-button"
              loading={loading}
            >
              Sign in
            </Button>
            <div className="version-text">version: 1.0.0</div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Connect(Form.create({ name: 'normal_login' })(Signin), {
  loading: 'app.signing',
});
