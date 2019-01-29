import {
  postIncidentType,
  putIncidentType,
} from '@codetanzania/emis-api-states';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class IncidentTypeForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    incidenttype: PropTypes.shape({
      name: PropTypes.string,
      nature: PropTypes.string,
      color: PropTypes.string,
      cap: PropTypes.string,
      code: PropTypes.string,
    }).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      incidenttype,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedContact = Object.assign({}, incidenttype, values);
          putIncidentType(updatedContact);
        } else {
          postIncidentType(values);
        }
      }
    });
  };

  render() {
    const {
      isEditForm,
      incidenttype,
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
      <Form onSubmit={this.handleSubmit}>
        {/* contact name */}
        <Form.Item {...formItemLayout} label="Name ">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? incidenttype.name : undefined,
            rules: [{ required: true, message: 'Type name is required' }],
          })(<Input placeholder="e.g Flood" />)}
        </Form.Item>
        {/* end contact name */}

        {/* incidenttype nature */}
        <Form.Item {...formItemLayout} label="Nature">
          {getFieldDecorator('nature', {
            initialValue: isEditForm ? incidenttype.nature : undefined,
            rules: [
              { required: true, message: 'Incident Type nature is required' },
            ],
          })(<Input placeholder="e.g Natural" />)}
        </Form.Item>
        {/* end incidenttype title */}

        {/* incidenttype nature */}
        <Form.Item {...formItemLayout} label="Cap">
          {getFieldDecorator('cap', {
            initialValue: isEditForm ? incidenttype.cap : undefined,
            rules: [{ required: true, message: 'Cap is required' }],
          })(<Input placeholder="e.g NMS" />)}
        </Form.Item>
        {/* end incidenttype title */}

        {/* contact email */}
        <Form.Item {...formItemLayout} label="Family">
          {getFieldDecorator('family', {
            initialValue: isEditForm ? incidenttype.family : undefined,
            rules: [{ required: true, message: 'Family is required' }],
          })(<Input placeholder="e.g Geographical" />)}
        </Form.Item>
        {/* end contact email */}
        {/* contact email */}
        <Form.Item {...formItemLayout} label="Code">
          {getFieldDecorator('code', {
            initialValue: isEditForm ? incidenttype.code : undefined,
            rules: [{ required: true, message: 'Code is required' }],
          })(<Input placeholder="e.g Geo" />)}
        </Form.Item>
        {/* end contact email */}

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

export default Form.create()(IncidentTypeForm);
