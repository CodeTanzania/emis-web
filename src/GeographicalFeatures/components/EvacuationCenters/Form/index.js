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

class EvacuationCenterForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    nature: PropTypes.arrayOf(PropTypes.string).isRequired,
    evacuationCenter: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
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
   *
   * @function
   * @name handleSubmit
   * @description Handle filter action
   *
   * @param {object} e event object
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      evacuationCenter,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedEvacuationCenter = Object.assign({}, evacuationCenter, {
            ...values,
            continent: 'Africa',
            country: 'Tanzania',
            family: 'EvacuationCenter',
          });
          putFeature(
            updatedEvacuationCenter,
            () => {
              notifySuccess('Evacuation Center was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating Evacuation Center, please try again!'
              );
            }
          );
        } else {
          postFeature(
            values,
            () => {
              notifySuccess('Evacuation Center was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving Evacuation Center, please try again!'
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
      evacuationCenter,
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
        {/* Evacuation Center name */}
        <Form.Item {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? evacuationCenter.name : undefined,
            rules: [
              { required: true, message: 'Evacuation Center name is required' },
            ],
          })(<Input placeholder="e.g Lindi" />)}
        </Form.Item>
        {/* end Evacuation Center name */}

        {/* Evacuation Center nature */}
        <Form.Item {...formItemLayout} label="Nature">
          {getFieldDecorator('nature', {
            initialValue: isEditForm ? evacuationCenter.nature : undefined,
            rules: [
              {
                required: true,
                message: 'Evacuation Center nature is required',
              },
            ],
          })(<Select showSearch>{this.renderSelectOptions(nature)}</Select>)}
        </Form.Item>
        {/* end evacuationCenter nature */}

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
  Connect(EvacuationCenterForm, {
    nature: 'features.schema.properties.nature.enum',
  })
);
