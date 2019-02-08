import { postAlertSource, putAlertSource } from '@codetanzania/emis-api-states';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';

class AlertSourceForm extends Component {
  static propTypes = {
    alertSource: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      mobile: PropTypes.string,
      email: PropTypes.string,
      _id: PropTypes.string,
    }).isRequired,
    isEditForm: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      alertSource,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedContact = Object.assign({}, alertSource, values);
          putAlertSource(
            updatedContact,
            () => {
              notifySuccess('Alert Source was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating Alert Source, please try again!'
              );
            }
          );
        } else {
          postAlertSource(
            values,
            () => {
              notifySuccess('Alert Source was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving Alert Source, please try again!'
              );
            }
          );
        }
      }
    });
  };

  render() {
    const {
      posting,
      onCancel,
      isEditForm,
      alertSource,
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
        {/* Alert Source name */}
        <Form.Item {...formItemLayout} label="Organisation name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? alertSource.name : undefined,
            rules: [
              {
                required: true,
                message: ' Alert Source organisation name is required',
              },
            ],
          })(<Input placeholder="e.g Tanzania Meteorogical Agency" />)}
        </Form.Item>
        {/* end organisation name */}

        {/* Alert source website */}
        <Form.Item {...formItemLayout} label="Website">
          {getFieldDecorator('website', {
            initialValue: isEditForm ? alertSource.website : undefined,
            rules: [
              { required: true, message: 'Alert Source Website is required' },
            ],
          })(<Input placeholder="e.g tma.com" />)}
        </Form.Item>
        {/* end Alert source website */}

        {/* Alert Source url */}
        <Form.Item {...formItemLayout} label="Feed">
          {getFieldDecorator('url', {
            initialValue: isEditForm ? alertSource.url : undefined,
            rules: [
              { required: true, message: 'Alert Source Website is required' },
            ],
          })(
            <Input placeholder="e.g http://tma.meteo.go.tz:8080/feeds/en/alerts/rss.xml" />
          )}
        </Form.Item>
        {/* end Alert Source url */}

        {/* Alert Source number */}
        <Form.Item {...formItemLayout} label="Phone Number">
          {getFieldDecorator('mobile', {
            initialValue: isEditForm ? alertSource.mobile : undefined,
            rules: [{ required: true, message: 'Phone number is required' }],
          })(<Input placeholder="e.g 255799999999" />)}
        </Form.Item>
        {/* end Alert Source number */}

        {/* Alert Source email */}
        <Form.Item {...formItemLayout} label="Email">
          {getFieldDecorator('email', {
            initialValue: isEditForm ? alertSource.email : undefined,
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              { required: true, message: 'Email address is required' },
            ],
          })(<Input placeholder="e.g example@mail.com" />)}
        </Form.Item>
        {/* end Alert Source email */}

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

export default Form.create()(AlertSourceForm);
