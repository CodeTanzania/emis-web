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

class WarehouseForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    nature: PropTypes.arrayOf(PropTypes.string).isRequired,
    warehouse: PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
      nature: PropTypes.string,
    }).isRequired,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func,
      validateFieldsAndScroll: PropTypes.func,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  /**
   * @function
   * @name handleSubmit
   * @description Handle create/edit action
   *
   * @param {object} event event object
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = event => {
    event.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      warehouse,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedWarehouse = Object.assign({}, warehouse, {
            ...values,
            continent: 'Africa',
            country: 'Tanzania',
            family: 'Warehouse',
          });
          putFeature(
            updatedWarehouse,
            () => {
              notifySuccess('Warehouse was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating warehouse, please try again!'
              );
            }
          );
        } else {
          postFeature(
            values,
            () => {
              notifySuccess('Warehouse was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving warehouse, please try again!'
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
      warehouse,
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
        {/* warehouse name */}
        <Form.Item {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? warehouse.name : undefined,
            rules: [{ required: true, message: 'Warehouse name is required' }],
          })(<Input placeholder="e.g Lindi" />)}
        </Form.Item>
        {/* end warehouse name */}

        {/* warehouse nature */}
        <Form.Item {...formItemLayout} label="Nature">
          {getFieldDecorator('nature', {
            initialValue: isEditForm ? warehouse.nature : undefined,
            rules: [
              { required: true, message: 'Warehouse nature is required' },
            ],
          })(<Select showSearch>{this.renderSelectOptions(nature)}</Select>)}
        </Form.Item>
        {/* end warehouse nature */}

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
  Connect(WarehouseForm, {
    nature: 'features.schema.properties.nature.enum',
  })
);
