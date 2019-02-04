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
 * Render District form for creating and updating District details
 *
 * @class
 * @name DistrictForm
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class DistrictForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    district: PropTypes.shape({
      name: PropTypes.string,
      nature: PropTypes.string,
      family: PropTypes.string,
      type: PropTypes.string,
    }).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
    families: PropTypes.arrayOf(PropTypes.string).isRequired,
    natures: PropTypes.arrayOf(PropTypes.string).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
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
      district,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedRegion = Object.assign({}, district, values);
          putFeature(
            updatedRegion,
            () => {
              notifySuccess('District was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating district, please try again!'
              );
            }
          );
        } else {
          postFeature(
            values,
            () => {
              notifySuccess('District was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving district, please try again!'
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
      district,
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
        {/* district name */}
        <Form.Item {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? district.name : undefined,
            rules: [{ required: true, message: 'District name is required' }],
          })(<Input placeholder="e.g Ilala" />)}
        </Form.Item>
        {/* end district name */}

        {/* nature */}
        <Form.Item {...formItemLayout} label="Nature">
          {getFieldDecorator('nature', {
            initialValue: isEditForm ? district.nature : undefined,
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

        {/* district type */}
        <Form.Item {...formItemLayout} label="Type">
          {getFieldDecorator('type', {
            initialValue: isEditForm ? district.type : undefined,
            rules: [{ required: true, message: 'Type is required' }],
          })(
            <Select placeholder="e.g District">
              {types.map(type => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end district type */}

        {/* district family */}
        <Form.Item {...formItemLayout} label="Family">
          {getFieldDecorator('family', {
            initialValue: isEditForm ? district.family : undefined,
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

export default Connect(Form.create()(DistrictForm), {
  natures: 'features.schema.properties.nature.enum',
  families: 'features.schema.properties.family.enum',
  types: 'features.schema.properties.type.enum',
});
