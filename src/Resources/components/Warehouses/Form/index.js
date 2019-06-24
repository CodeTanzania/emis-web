import {
  postWarehouse,
  putWarehouse,
  Connect,
} from '@codetanzania/emis-api-states';
import { Button, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';

const { Option } = Select;

// eslint-disable-next-line jsdoc/require-returns
/**
 * @class
 * @name WarehouseForm
 * @description  Render form for creating a new warehouse
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class WarehouseForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    families: PropTypes.arrayOf(PropTypes.string).isRequired,
    natures: PropTypes.arrayOf(PropTypes.string).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    warehouse: PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
      nature: PropTypes.string,
      family: PropTypes.string,
      type: PropTypes.string,
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
   * @description  call back function to handle submit action
   *
   * @param {object} e event object
   *
   * @returns {undefined} does not return anything
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      warehouse,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedWarehouse = Object.assign({}, warehouse, values);
          putWarehouse(
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
          postWarehouse(
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

  // eslint-disable-next-line jsdoc/require-returns
  /**
   * @function
   * @name renderSelectOptions
   * @description  renders select options
   *
   * @param {Array} options array of select options
   *
   * @version 0.1.0
   * @since 0.1.0
   */
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
      form: { getFieldDecorator },
      natures,
      families,
      types,
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
          })(<Select showSearch>{this.renderSelectOptions(natures)}</Select>)}
        </Form.Item>
        {/* end warehouse nature */}

        {/* warehouse family */}
        <Form.Item {...formItemLayout} label="Family">
          {getFieldDecorator('family', {
            initialValue: isEditForm ? warehouse.family : undefined,
            rules: [
              { required: true, message: 'Warehouse family is required' },
            ],
          })(<Select showSearch>{this.renderSelectOptions(families)}</Select>)}
        </Form.Item>
        {/* end warehouse family */}

        {/* warehouse type */}
        <Form.Item {...formItemLayout} label="Type">
          {getFieldDecorator('type', {
            initialValue: isEditForm ? warehouse.type : undefined,
            rules: [{ required: true, message: 'Warehouse Type is required' }],
          })(<Select showSearch>{this.renderSelectOptions(types)}</Select>)}
        </Form.Item>
        {/* end warehouse type */}

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
    natures: 'warehouses.schema.properties.nature.enum',
    families: 'warehouses.schema.properties.family.enum',
    types: 'warehouses.schema.properties.type.enum',
  })
);
