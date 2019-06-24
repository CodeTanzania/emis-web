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

/**
 *
 * @class
 * @name RegionForm
 * @description  Render Region form for creating and updating Region details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class RegionForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    region: PropTypes.shape({
      name: PropTypes.string,
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
    families: PropTypes.arrayOf(PropTypes.string).isRequired,
    natures: PropTypes.arrayOf(PropTypes.string).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  /**
   *
   * @function
   * @name handleSubmit
   * @description Handle submit form action
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
      region,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedRegion = Object.assign({}, region, values);
          putFeature(
            updatedRegion,
            () => {
              notifySuccess('Region was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating region, please try again!'
              );
            }
          );
        } else {
          postFeature(
            values,
            () => {
              notifySuccess('Region was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving region, please try again!'
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
      region,
      posting,
      onCancel,
      families,
      natures,
      types,
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
        {/* region name */}
        <Form.Item {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? region.name : undefined,
            rules: [{ required: true, message: 'Region name is required' }],
          })(<Input placeholder="e.g Dar es Salaam" />)}
        </Form.Item>
        {/* end region name */}

        {/* nature */}
        <Form.Item {...formItemLayout} label="Nature">
          {getFieldDecorator('nature', {
            initialValue: isEditForm ? region.nature : undefined,
            rules: [{ required: true, message: 'Nature is required' }],
          })(
            <Select placeholder="e.g Building">
              {natures.map(nature => (
                <Option key={nature} value={nature}>
                  {nature}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end nature */}

        {/* region type */}
        <Form.Item {...formItemLayout} label="Type">
          {getFieldDecorator('type', {
            initialValue: isEditForm ? region.type : undefined,
            rules: [{ required: true, message: 'Type is required' }],
          })(
            <Select placeholder="e.g Region">
              {types.map(type => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end region type */}

        {/* region family */}
        <Form.Item {...formItemLayout} label="Family">
          {getFieldDecorator('family', {
            initialValue: isEditForm ? region.family : undefined,
            rules: [{ required: true, message: 'Family is required' }],
          })(
            <Select placeholder="e.g Hospital">
              {families.map(family => (
                <Option key={family} value={family}>
                  {family}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end family */}

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

export default Connect(Form.create()(RegionForm), {
  natures: 'features.schema.properties.nature.enum',
  families: 'features.schema.properties.family.enum',
  types: 'features.schema.properties.type.enum',
});
