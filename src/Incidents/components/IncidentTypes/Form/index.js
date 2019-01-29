import {
  postIncidentType,
  putIncidentType,
} from '@codetanzania/emis-api-states';
import { Button, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const { Option } = Select;

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
    incidenttypeSchema: PropTypes.shape({
      properties: PropTypes.string,
    }).isRequired,
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
      incidenttypeSchema,
      form: { getFieldDecorator },
    } = this.props;

    const { properties } = incidenttypeSchema;
    const { nature, family, cap } = properties;
    const { enum: natures } = nature;
    const { enum: caps } = cap;
    const { enum: families } = family;

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
        {/* incident types name */}
        <Form.Item {...formItemLayout} label="Name ">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? incidenttype.name : undefined,
            rules: [{ required: true, message: 'name is required' }],
          })(<Input placeholder="e.g Flood" />)}
        </Form.Item>
        {/* end incident types name */}

        {/* incident types nature */}
        <Form.Item {...formItemLayout} label="Nature">
          {getFieldDecorator('nature', {
            initialValue: isEditForm ? incidenttype.nature : undefined,
            rules: [
              { required: true, message: 'Incident Type nature is required' },
            ],
          })(
            <Select placeholder="e.g Natural">
              {natures.map(data => (
                <Option key={data} value={data}>
                  {data}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end incidenttype nature */}

        {/* incident types cap */}
        <Form.Item {...formItemLayout} label="Cap">
          {getFieldDecorator('cap', {
            initialValue: isEditForm ? incidenttype.cap : undefined,
            rules: [{ required: true, message: 'Cap is required' }],
          })(
            <Select placeholder="e.g Geo">
              {caps.map(capData => (
                <Option key={capData} value={capData}>
                  {capData}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end incident types cap */}

        {/*  incident types family */}
        <Form.Item {...formItemLayout} label="Family">
          {getFieldDecorator('family', {
            initialValue: isEditForm ? incidenttype.family : undefined,
            rules: [{ required: true, message: 'Family is required' }],
          })(
            <Select placeholder="e.g Geographical">
              {families.map(familyData => (
                <Option key={familyData} value={familyData}>
                  {familyData}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end incident types family */}
        {/* incident types code */}
        <Form.Item {...formItemLayout} label="Code">
          {getFieldDecorator('code', {
            initialValue: isEditForm ? incidenttype.code : undefined,
            rules: [{ required: true, message: 'Code is required' }],
          })(<Input placeholder="e.g NMS" />)}
        </Form.Item>
        {/* end incident types code */}

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
