import { postPlan, putPlan } from '@codetanzania/emis-api-states';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';

/**
 * Render Plan form for creating and updating plan plan details
 *
 * @class
 * @name PlanForm
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class PlanForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    plan: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      abbreviation: PropTypes.string,
      mobile: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  /**
   * Handle submit form action
   *
   * @function
   * @name handleSubmit
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      plan,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedPlan = Object.assign({}, plan, values);
          putPlan(
            updatedPlan,
            () => {
              notifySuccess('Plan was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating plan, please try again!'
              );
            }
          );
        } else {
          postPlan(
            values,
            () => {
              notifySuccess('Plan was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving plan, please try again!'
              );
            }
          );
        }
      }
    });
  };

  render() {
    const {
      isEditForm,
      plan,
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
      <Form onSubmit={this.handleSubmit} autoComplete="off">
        {/* plan name */}
        <Form.Item {...formItemLayout} label="Full Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? plan.name : undefined,
            rules: [{ required: true, message: 'Plan full name is required' }],
          })(<Input placeholder="e.g John Doe" />)}
        </Form.Item>
        {/* end plan name */}

        {/* plan title */}
        <Form.Item {...formItemLayout} label="Designation">
          {getFieldDecorator('title', {
            initialValue: isEditForm ? plan.title : undefined,
            rules: [{ required: true, message: 'Plan time is required' }],
          })(<Input placeholder="e.g Regional Commissioner" />)}
        </Form.Item>
        {/* end plan title */}

        {/* plan abbreviation */}
        <Form.Item {...formItemLayout} label="Abbreviation">
          {getFieldDecorator('abbreviation', {
            initialValue: isEditForm ? plan.abbreviation : undefined,
          })(<Input placeholder="e.g RC, DC, RAS" />)}
        </Form.Item>
        {/* end plan abbreviation */}

        {/* plan number */}
        <Form.Item {...formItemLayout} label="Phone Number">
          {getFieldDecorator('mobile', {
            initialValue: isEditForm ? plan.mobile : undefined,
            rules: [{ required: true, message: 'Phone number is required' }],
          })(<Input placeholder="e.g 255799999999" />)}
        </Form.Item>
        {/* end plan number */}

        {/* plan email */}
        <Form.Item {...formItemLayout} label="Email">
          {getFieldDecorator('email', {
            initialValue: isEditForm ? plan.email : undefined,
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              { required: true, message: 'Email address is required' },
            ],
          })(<Input placeholder="e.g example@mail.com" />)}
        </Form.Item>
        {/* end plan email */}

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

export default Form.create()(PlanForm);
