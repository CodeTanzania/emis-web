import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { Connect, putFocalPerson } from '@codetanzania/emis-api-states';
import { notifyError, notifySuccess } from '../../../util';

/**
 * @class
 * @name ChangePasswordForm
 * @description ChangePassword component which shows change password form
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ChangePasswordForm extends Component {
  state = {
    confirmDirty: false,
  };

  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      validateFieldsAndScroll: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      getFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  /**
   * @function
   * @name handleSubmit
   * @description Handle submit action for change password
   *
   * @param {object} event submit event
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { user, onCancel } = this.props;
      if (!err) {
        const updatedUser = Object.assign({}, user, {
          password: values.password,
        });

        putFocalPerson(
          updatedUser,
          () => {
            notifySuccess('Password was changed successfully');
            onCancel();
          },
          () => {
            notifyError(
              'Something occurred while changing your password, please try again!'
            );
          }
        );
      }
    });
  };

  /**
   * @function
   * @name handleConfirmBlur
   * @description Handle blur event to compare password
   *
   * @param {object} event  event
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleConfirmBlur = event => {
    const { value } = event.target;
    this.setState(prevState => ({
      confirmDirty: prevState || !!value,
    }));
  };

  /**
   * @function
   * @name compareToFirstPassword
   * @description Compare password and confirm password if they are equal
   *
   * @param {object} rule validation rule
   * @param {string} value confirm value
   * @param {Function} callback  callback after validation
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  /**
   * @function
   * @name validateToNextPassword
   * @description Validate password
   *
   * @param {object} rule validation rule
   * @param {string} value confirm value
   * @param {Function} callback  callback after validation
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      posting,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {/* New Password input */}
        <Form.Item label="New Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your new password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        {/* end new password input */}

        {/* confirm password input */}
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        {/* end confirm password input */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            style={{ marginLeft: 8 }}
            type="primary"
            htmlType="submit"
            loading={posting}
          >
            Change Password
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

export default Connect(
  Form.create({ name: 'changepassword' })(ChangePasswordForm),
  {
    user: 'app.party',
    posting: 'focalPeople.posting',
  }
);
