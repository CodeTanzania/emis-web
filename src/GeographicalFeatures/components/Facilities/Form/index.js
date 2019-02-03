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
 * Facility form component for creating new Facitlities
 *
 * @class
 * @name FacilitiyForm
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class FacilitiyForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    nature: PropTypes.arrayOf(PropTypes.string).isRequired,
    facility: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    }).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      facility,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedFacilitiy = Object.assign({}, facility, {
            ...values,
            continent: 'Africa',
            country: 'Tanzania',
            family: 'Facilitiy',
          });
          putFeature(
            updatedFacilitiy,
            () => {
              notifySuccess('Facility was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating Facility, please try again!'
              );
            }
          );
        } else {
          postFeature(
            values,
            () => {
              notifySuccess('Facility was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving Facility, please try again!'
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
      facility,
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
      <Form onSubmit={this.handleSubmit}>
        {/* Facility name */}
        <Form.Item {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? facility.name : undefined,
            rules: [
              {
                required: true,
                message: 'Facility name is required',
              },
            ],
          })(<Input placeholder="e.g Lindi" />)}
        </Form.Item>
        {/* end Facility name */}

        {/* Facility nature */}
        <Form.Item {...formItemLayout} label="Nature">
          {getFieldDecorator('nature', {
            initialValue: isEditForm ? facility.nature : undefined,
            rules: [
              {
                required: true,
                message: 'Facility nature is required',
              },
            ],
          })(<Select showSearch>{this.renderSelectOptions(nature)}</Select>)}
        </Form.Item>
        {/* end facility nature */}

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
  Connect(FacilitiyForm, {
    nature: 'features.schema.properties.nature.enum',
  })
);
