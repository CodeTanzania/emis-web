import { postProcedure, putProcedure } from '@codetanzania/emis-api-states';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';

/**
 * Render Procedure form for creating and updating procedure procedure details
 *
 * @class
 * @name ProcedureForm
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ProcedureForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    procedure: PropTypes.shape({
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
      procedure,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedProcedure = Object.assign({}, procedure, values);
          putProcedure(
            updatedProcedure,
            () => {
              notifySuccess('Procedure was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating procedure, please try again!'
              );
            }
          );
        } else {
          postProcedure(
            values,
            () => {
              notifySuccess('Procedure was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving procedure, please try again!'
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
      procedure,
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
        {/* procedure name */}
        <Form.Item {...formItemLayout} label="Full Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? procedure.name : undefined,
            rules: [
              { required: true, message: 'Procedure full name is required' },
            ],
          })(<Input placeholder="e.g John Doe" />)}
        </Form.Item>
        {/* end procedure name */}

        {/* procedure title */}
        <Form.Item {...formItemLayout} label="Designation">
          {getFieldDecorator('title', {
            initialValue: isEditForm ? procedure.title : undefined,
            rules: [{ required: true, message: 'Procedure time is required' }],
          })(<Input placeholder="e.g Regional Commissioner" />)}
        </Form.Item>
        {/* end procedure title */}

        {/* procedure abbreviation */}
        <Form.Item {...formItemLayout} label="Abbreviation">
          {getFieldDecorator('abbreviation', {
            initialValue: isEditForm ? procedure.abbreviation : undefined,
          })(<Input placeholder="e.g RC, DC, RAS" />)}
        </Form.Item>
        {/* end procedure abbreviation */}

        {/* procedure number */}
        <Form.Item {...formItemLayout} label="Phone Number">
          {getFieldDecorator('mobile', {
            initialValue: isEditForm ? procedure.mobile : undefined,
            rules: [{ required: true, message: 'Phone number is required' }],
          })(<Input placeholder="e.g 255799999999" />)}
        </Form.Item>
        {/* end procedure number */}

        {/* procedure email */}
        <Form.Item {...formItemLayout} label="Email">
          {getFieldDecorator('email', {
            initialValue: isEditForm ? procedure.email : undefined,
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              { required: true, message: 'Email address is required' },
            ],
          })(<Input placeholder="e.g example@mail.com" />)}
        </Form.Item>
        {/* end procedure email */}

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

export default Form.create()(ProcedureForm);
