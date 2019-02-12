import {
  Connect,
  postStakeholder,
  putStakeholder,
} from '@codetanzania/emis-api-states';
import { getFeatures, getRoles } from '@codetanzania/emis-api-client';
import { Button, Form, Input, Row, Col } from 'antd';
import upperFirst from 'lodash/upperFirst';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';
import SelectInput from '../../../../components/SelectInput';

/* constants */
const { TextArea } = Input;

/**
 * Render Contact form for creating and updating stakeholder contact details
 *
 * @class
 * @name ContactForm
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ContactForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    contact: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      abbreviation: PropTypes.string,
      mobile: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
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
      contact,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedContact = Object.assign({}, contact, values);
          putStakeholder(
            updatedContact,
            () => {
              notifySuccess('Contact was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating contact, please try again!'
              );
            }
          );
        } else {
          postStakeholder(
            values,
            () => {
              notifySuccess('Contact was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving contact, please try again!'
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
      contact,
      posting,
      onCancel,
      form: { getFieldDecorator },
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
        {/* contact name, phone number and email section */}
        <Row type="flex" justify="space-between">
          <Col span={10}>
            {/* contact name */}
            <Form.Item {...formItemLayout} label="Full Name">
              {getFieldDecorator('name', {
                initialValue: isEditForm ? contact.name : undefined,
                rules: [
                  { required: true, message: 'Contact full name is required' },
                ],
              })(<Input placeholder="e.g John Doe" />)}
            </Form.Item>
            {/* end contact name */}
          </Col>
          <Col span={13}>
            <Row type="flex" justify="space-between">
              <Col span={11}>
                {/* contact mobile number */}
                <Form.Item {...formItemLayout} label="Phone Number">
                  {getFieldDecorator('mobile', {
                    initialValue: isEditForm ? contact.mobile : undefined,
                    rules: [
                      { required: true, message: 'Phone number is required' },
                    ],
                  })(<Input placeholder="e.g 255799999999" />)}
                </Form.Item>
                {/* end contact mobile number */}
              </Col>
              <Col span={12}>
                {/* contact email */}
                <Form.Item {...formItemLayout} label="Email">
                  {getFieldDecorator('email', {
                    initialValue: isEditForm ? contact.email : undefined,
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                    ],
                  })(<Input placeholder="e.g example@mail.com" />)}
                </Form.Item>
                {/* end contact email */}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* end contact name, phone number and email section */}

        {/* contact organization, group and area section */}
        <Row type="flex" justify="space-between">
          <Col span={10}>
            {/* contact organization */}
            <Form.Item {...formItemLayout} label="Organization/Agency">
              {getFieldDecorator('organization', {
                initialValue: isEditForm ? contact.title : undefined,
              })(<Input placeholder="e.g Tanzania Fire and Rescue Force" />)}
            </Form.Item>
            {/* end contact organization */}
          </Col>
          <Col span={13}>
            <Row type="flex" justify="space-between">
              <Col span={11}>
                {/* contact group */}
                <Form.Item {...formItemLayout} label="Group">
                  {getFieldDecorator('type', {
                    initialValue: isEditForm ? contact.type : undefined,
                    rules: [
                      { required: true, message: 'Contact group is required' },
                    ],
                  })(
                    <SelectInput
                      options={types}
                      placeholder="e.g Hospitals, Police"
                    />
                  )}
                </Form.Item>
                {/* end contact group */}
              </Col>
              <Col span={12}>
                {/* contact location */}
                <Form.Item {...formItemLayout} label="Area">
                  {getFieldDecorator('location', {
                    initialValue:
                      isEditForm && contact.location
                        ? contact.location._id // eslint-disable-line
                        : undefined,
                    rules: [
                      { required: true, message: 'Contact area is required' },
                    ],
                  })(
                    <SearchableSelectInput
                      onSearch={getFeatures}
                      optionLabel={feature =>
                        `${feature.name} (${upperFirst(feature.type)})`
                      }
                      optionValue="_id"
                      placeholder="e.g Ilala, Ubungo"
                      initialValue={
                        isEditForm && contact.location
                          ? contact.location
                          : undefined
                      }
                    />
                  )}
                </Form.Item>
                {/* end contact location */}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* end contact organization, group and area section */}

        {/* contact role, landline and fax section */}
        <Row type="flex" justify="space-between">
          <Col span={10}>
            {/* contact role */}
            <Form.Item {...formItemLayout} label="Role">
              {getFieldDecorator('role', {
                initialValue:
                  isEditForm && contact.role ? contact.role._id : undefined, // eslint-disable-line
                rules: [
                  { required: true, message: 'Contact time is required' },
                ],
              })(
                <SearchableSelectInput
                  onSearch={getRoles}
                  optionLabel="name"
                  optionValue="_id"
                  placeholder="e.g Regional Commissioner"
                  initialValue={
                    isEditForm && contact.role ? contact.role : undefined
                  }
                />
              )}
            </Form.Item>
            {/* end contact role */}
          </Col>
          <Col span={13}>
            <Row type="flex" justify="space-between">
              <Col span={11}>
                {/* contact landline number */}
                <Form.Item {...formItemLayout} label="Landline/Other Number">
                  {getFieldDecorator('landline', {
                    initialValue: isEditForm ? contact.landline : undefined,
                  })(<Input placeholder="e.g 0229322112" />)}
                </Form.Item>
                {/* end contact landline number */}
              </Col>
              <Col span={12}>
                {/* contact fax */}
                <Form.Item {...formItemLayout} label="Fax">
                  {getFieldDecorator('fax', {
                    initialValue: isEditForm ? contact.fax : undefined,
                  })(<Input placeholder="e.g 0222819343" />)}
                </Form.Item>
                {/* end contact fax */}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* end contact role, landline and fax section */}

        {/* contact Physical Address, Postal Address section */}
        <Row type="flex" justify="space-between">
          <Col span={10}>
            {/* contact physical Address */}
            <Form.Item {...formItemLayout} label="Physical Address">
              {getFieldDecorator('physicalAddress', {
                initialValue: isEditForm ? contact.physicalAddress : undefined,
              })(
                <TextArea
                  autosize={{ minRows: 1, maxRows: 10 }}
                  placeholder="e.g Sinza A"
                />
              )}
            </Form.Item>
            {/* end contact physical Address */}
          </Col>
          <Col span={13}>
            {/* contact postal address */}
            <Form.Item {...formItemLayout} label="Postal Address">
              {getFieldDecorator('postalAddress', {
                initialValue: isEditForm ? contact.postalAddress : undefined,
              })(
                <TextArea
                  autosize={{ minRows: 1, maxRows: 10 }}
                  placeholder="e.g P.O. Box XXX, Dar es Salaam"
                />
              )}
            </Form.Item>
            {/* end contact postal address */}
          </Col>
        </Row>
        {/* end contact physical Address, Postal Address section */}

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

export default Connect(Form.create()(ContactForm), {
  types: 'stakeholders.schema.properties.type.enum',
});
