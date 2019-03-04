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

const scategories = [
  'Aerialway',
  'Aeroway',
  'Amenity',
  'Barrier',
  'Boundary',
  'Building',
  'Craft',
  'Emergency',
  'Geological',
  'Highway',
  'Historic',
  'Landuse',
  'Leisure',
  'Man made',
  'Military',
  'Natural',
  'Office',
  'Other',
  'Place',
  'Power',
  'Public',
  'Railway',
  'Route',
  'Shop',
  'Sport',
  'Telecom',
  'Tourism',
  'Transport',
  'Waterway',
];
const stypes = [
  'Access Control',
  'Accommodation',
  'Administrative',
  'Arts',
  'Assembly Point',
  'Civic',
  'Commercial',
  'Culture',
  'Education',
  'Entertainment',
  'Facilities',
  'Financial',
  'Firefighters',
  'Healthcare',
  'Landform',
  'Lifecycle',
  'Lifeguards',
  'Linear Barriers',
  'Link Roads',
  'Medical Rescue',
  'Other',
  'Paths',
  'Religious',
  'Roads',
  'Stations',
  'Stops',
  'Sustenance',
  'Tracks',
  'Transportation',
  'Vegetation',
  'Warehouse',
  'Water',
  'Watercourses',
  'Waterways',
];
const slevels = [
  'zone',
  'region',
  'district',
  'division',
  'ward',
  'village',
  'shina',
  'other',
];

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
    levels: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    warehouse: PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
    }).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  /**
   * @function
   * @name handleSubmit
   * @description  call back function to handle submit action
   *
   * @param {Object} e event object
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
          const updatedWarehouse = Object.assign({}, warehouse, {
            ...values,
            continent: 'Africa',
            country: 'Tanzania',
          });
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

        {/* warehouse level */}
        <Form.Item {...formItemLayout} label="Level">
          {getFieldDecorator('level', {
            initialValue: isEditForm ? warehouse.level : undefined,
            rules: [{ required: true, message: 'Warehouse level is required' }],
          })(<Select showSearch>{this.renderSelectOptions(slevels)}</Select>)}
        </Form.Item>
        {/* end warehouse level */}

        {/* warehouse type */}
        <Form.Item {...formItemLayout} label="Type">
          {getFieldDecorator('type', {
            initialValue: isEditForm ? warehouse.type : undefined,
            rules: [{ required: true, message: 'Warehouse Type is required' }],
          })(<Select showSearch>{this.renderSelectOptions(stypes)}</Select>)}
        </Form.Item>
        {/* end warehouse type */}

        {/* warehouse category */}
        <Form.Item {...formItemLayout} label="Category">
          {getFieldDecorator('category', {
            initialValue: isEditForm ? warehouse.category : undefined,
            rules: [
              { required: true, message: 'Warehouse Category is required' },
            ],
          })(
            <Select showSearch>{this.renderSelectOptions(scategories)}</Select>
          )}
        </Form.Item>
        {/* end warehouse category */}

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
    levels: 'warehouses.schema.properties.level.enum',
    categories: 'warehouses.schema.properties.category.enum',
    types: 'warehouses.schema.properties.type.enum',
  })
);
