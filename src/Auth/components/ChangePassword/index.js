import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

/**
 * @function
 * @name ChangePassword
 * @description ChangePassword component which shows change password form
 *
 * @param e event object
 * @version 0.1.0
 * @since 0.1.0
 */
class ChangePassword extends React.Component {
  state = {
    confirmDirty: false,
  };

  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      validateFieldsAndScroll: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState(prevState => ({
      confirmDirty: prevState || !!value,
    }));
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        className="ChangePassword"
      >
        <Form.Item label="Old Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your old password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
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
      </Form>
    );
  }
}

export default Form.create({ name: 'changepassword' })(ChangePassword);
