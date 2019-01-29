import { postStakeholder } from '@codetanzania/emis-api-states';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class StakeholderForm extends Component {
  static propTypes = {
    posting: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        postStakeholder(values);
      }
    });
  };

  render() {
    const {
      posting,
      onCancel,
      form: { getFieldDecorator },
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
      <Form onSubmit={this.handleSubmit}>
        {/* contact name */}
        <Form.Item {...formItemLayout} label="Full Name">
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: 'Contact full name is required' },
            ],
          })(<Input placeholder="e.g John Doe" />)}
        </Form.Item>
        {/* end contact name */}

        {/* contact title */}
        <Form.Item {...formItemLayout} label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Contact time is required' }],
          })(<Input placeholder="e.g Regional Commissioner" />)}
        </Form.Item>
        {/* end contact title */}

        {/* contact abbreviation */}
        <Form.Item {...formItemLayout} label="Abbreviation">
          {getFieldDecorator('abbreviation')(
            <Input placeholder="e.g RC, DC, RAS" />
          )}
        </Form.Item>
        {/* end contact abbreviation */}

        {/* contact number */}
        <Form.Item {...formItemLayout} label="Phone Number">
          {getFieldDecorator('mobile', {
            rules: [{ required: true, message: 'Phone number is required' }],
          })(<Input placeholder="e.g 255799999999" />)}
        </Form.Item>
        {/* end contact number */}

        {/* contact email */}
        <Form.Item {...formItemLayout} label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              { required: true, message: 'Email address is required' },
            ],
          })(<Input placeholder="e.g example@mail.com" />)}
        </Form.Item>
        {/* end contact email */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            style={{ marginLeft: 8 }}
            type="primary"
            htmlType="submit"
            loading={posting}
          >
            Save
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

export default Form.create()(StakeholderForm);
