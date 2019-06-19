import {
  postFeature,
  putFeature,
  Connect,
} from '@codetanzania/emis-api-states';
import { Button, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';

const { Option } = Select;

class CriticalInfrastructureForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    nature: PropTypes.arrayOf(PropTypes.string).isRequired,
    criticalInfrastructure: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
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
   * @param {object} e event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      criticalInfrastructure,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedCriticalInfrastructure = Object.assign(
            {},
            criticalInfrastructure,
            {
              ...values,
              continent: 'Africa',
              country: 'Tanzania',
              family: 'CriticalInfrastructure',
            }
          );
          putFeature(
            updatedCriticalInfrastructure,
            () => {
              notifySuccess('Critical Infrastructure was updated successfully');
            },
            () => {
              notifyError(
                `Something occurred while updating Critical Infrastructure, 
                please try again!`
              );
            }
          );
        } else {
          postFeature(
            values,
            () => {
              notifySuccess('Critical Infrastructure was created successfully');
            },
            () => {
              notifyError(
                `Something occurred while saving Critical Infrastructure,
                 please try again!`
              );
            }
          );
        }
      }
    });
  };

  renderSelectOptions = options =>
    options.map(option => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ));

  render() {
    const {
      isEditForm,
      criticalInfrastructure,
      posting,
      onCancel,
      nature,
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
        {/* Critical Infrastructure name */}
        <Form.Item {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? criticalInfrastructure.name : undefined,
            rules: [
              {
                required: true,
                message: 'Critical Infrastructure name is required',
              },
            ],
          })(<Input placeholder="e.g Lindi" />)}
        </Form.Item>
        {/* end Critical Infrastructure name */}

        {/* Critical Infrastructure nature */}
        <Form.Item {...formItemLayout} label="Nature">
          {getFieldDecorator('nature', {
            initialValue: isEditForm
              ? criticalInfrastructure.nature
              : undefined,
            rules: [
              {
                required: true,
                message: 'Critical Infrastructure nature is required',
              },
            ],
          })(<Select showSearch>{this.renderSelectOptions(nature)}</Select>)}
        </Form.Item>
        {/* end criticalInfrastructure nature */}

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

export default Form.create()(
  Connect(CriticalInfrastructureForm, {
    nature: 'features.schema.properties.nature.enum',
  })
);
