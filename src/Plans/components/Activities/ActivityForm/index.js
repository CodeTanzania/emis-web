import { postActivity, putActivity } from '@codetanzania/emis-api-states';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';

/**
 * Render Activity form for creating and updating activity activity details
 *
 * @class
 * @name ActivityForm
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ActivityForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    activity: PropTypes.shape({
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
      activity,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedActivity = Object.assign({}, activity, values);
          putActivity(
            updatedActivity,
            () => {
              notifySuccess('Activity was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating activity, please try again!'
              );
            }
          );
        } else {
          postActivity(
            values,
            () => {
              notifySuccess('Activity was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving activity, please try again!'
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
      activity,
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
        {/* activity name */}
        <Form.Item {...formItemLayout} label="Full Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? activity.name : undefined,
            rules: [
              { required: true, message: 'Activity full name is required' },
            ],
          })(<Input placeholder="e.g John Doe" />)}
        </Form.Item>
        {/* end activity name */}

        {/* activity title */}
        <Form.Item {...formItemLayout} label="Designation">
          {getFieldDecorator('title', {
            initialValue: isEditForm ? activity.title : undefined,
            rules: [{ required: true, message: 'Activity time is required' }],
          })(<Input placeholder="e.g Regional Commissioner" />)}
        </Form.Item>
        {/* end activity title */}

        {/* activity abbreviation */}
        <Form.Item {...formItemLayout} label="Abbreviation">
          {getFieldDecorator('abbreviation', {
            initialValue: isEditForm ? activity.abbreviation : undefined,
          })(<Input placeholder="e.g RC, DC, RAS" />)}
        </Form.Item>
        {/* end activity abbreviation */}

        {/* activity number */}
        <Form.Item {...formItemLayout} label="Phone Number">
          {getFieldDecorator('mobile', {
            initialValue: isEditForm ? activity.mobile : undefined,
            rules: [{ required: true, message: 'Phone number is required' }],
          })(<Input placeholder="e.g 255799999999" />)}
        </Form.Item>
        {/* end activity number */}

        {/* activity email */}
        <Form.Item {...formItemLayout} label="Email">
          {getFieldDecorator('email', {
            initialValue: isEditForm ? activity.email : undefined,
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              { required: true, message: 'Email address is required' },
            ],
          })(<Input placeholder="e.g example@mail.com" />)}
        </Form.Item>
        {/* end activity email */}

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

export default Form.create()(ActivityForm);
