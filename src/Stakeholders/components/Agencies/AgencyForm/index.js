import { httpActions } from '@codetanzania/emis-api-client';
import { postAgency, putAgency } from '@codetanzania/emis-api-states';
import { Button, Col, Form, Input, Row } from 'antd';
import upperFirst from 'lodash/upperFirst';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';
import { notifyError, notifySuccess } from '../../../../util';

/* constants */
const { getFeatures, getPartyGroups } = httpActions;
const { TextArea } = Input;

/**
 * @class
 * @name AgencyForm
 * @description Render Agency form for creating and updating stakeholder
 * agency details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AgencyForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    agency: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      abbreviation: PropTypes.string,
      mobile: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    groups: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  /**
   * @function
   * @name handleSubmit
   * @description Handle submit form action
   *
   * @param {object} event onSubmit event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = event => {
    event.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      agency,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedAgency = Object.assign({}, agency, values);
          putAgency(
            updatedAgency,
            () => {
              notifySuccess('Agency was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating agency, please try again!'
              );
            }
          );
        } else {
          postAgency(
            values,
            () => {
              notifySuccess('Agency was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving agency, please try again!'
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
      agency,
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
        {/* agency name, phone number and email section */}
        <Row type="flex" justify="space-between">
          <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
            {/* agency name */}
            <Form.Item {...formItemLayout} label="Name">
              {getFieldDecorator('name', {
                initialValue: isEditForm ? agency.name : undefined,
                rules: [
                  { required: true, message: 'Agency full name is required' },
                ],
              })(<Input />)}
            </Form.Item>
            {/* end agency name */}
          </Col>
          <Col xxl={13} xl={13} lg={13} md={13} sm={24} xs={24}>
            <Row type="flex" justify="space-between">
              <Col xxl={11} xl={11} lg={11} md={11} sm={24} xs={24}>
                {/* agency mobile number */}
                <Form.Item {...formItemLayout} label="Phone Number">
                  {getFieldDecorator('mobile', {
                    initialValue: isEditForm ? agency.mobile : undefined,
                    rules: [
                      { required: true, message: 'Phone number is required' },
                    ],
                  })(<Input />)}
                </Form.Item>
                {/* end agency mobile number */}
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                {/* agency email */}
                <Form.Item {...formItemLayout} label="Email">
                  {getFieldDecorator('email', {
                    initialValue: isEditForm ? agency.email : undefined,
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'E-mail address is required',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                {/* end agency email */}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* end agency name, phone number and email section */}

        {/* agency abbreviation, group and area section */}
        <Row type="flex" justify="space-between">
          <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
            {/* agency organization */}
            <Form.Item {...formItemLayout} label="Abbreviation">
              {getFieldDecorator('abbreviation', {
                rules: [{ required: true }],
                initialValue: isEditForm ? agency.abbreviation : undefined,
              })(<Input />)}
            </Form.Item>
            {/* end agency abbreviation */}
          </Col>
                 
          <Col xxl={13} xl={13} lg={13} md={13} sm={24} xs={24}>
            <Row type="flex" justify="space-between">
              <Col xxl={11} xl={11} lg={11} md={11} sm={24} xs={24}>
                {/* agency group */}
                <Form.Item {...formItemLayout} label="Group">
                  {getFieldDecorator('group', {
                    initialValue:
                      isEditForm && agency.group
                        ? agency.group._id // eslint-disable-line
                        : undefined,
                    rules: [
                      {
                        required: true,
                        message: 'Focal Person group is required',
                      },
                    ],
                  })(
                    <SearchableSelectInput
                      onSearch={getPartyGroups}
                      optionLabel="name"
                      optionValue="_id"
                      initialValue={
                        isEditForm && agency.group ? agency.group : undefined
                      }
                    />
                  )}
                </Form.Item>
                {/* end agency group */}
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                {/* agency location */}
                <Form.Item {...formItemLayout} label="Area">
                  {getFieldDecorator('location', {
                    initialValue:
                      isEditForm && agency.location
                        ? agency.location._id // eslint-disable-line
                        : undefined,
                    rules: [
                      { required: true, message: 'Agency area is required' },
                    ],
                  })(
                    <SearchableSelectInput
                      onSearch={getFeatures}
                      optionLabel={feature =>
                        `${feature.name} (${upperFirst(feature.type)})`
                      }
                      optionValue="_id"
                      initialValue={
                        isEditForm && agency.location
                          ? agency.location
                          : undefined
                      }
                    />
                  )}
                </Form.Item>
                {/* end agency location */}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* end agency organization, group and area section */}

        {/* agency role, landline and fax section */}
        <Row type="flex" justify="space-between">
          <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
            {/* agency role */}
            <Form.Item {...formItemLayout} label="Website">
              {getFieldDecorator('website', {
                initialValue:
                  isEditForm && agency.website ? agency.website : undefined, // eslint-disable-line
              })(<Input />)}
            </Form.Item>
            {/* end agency role */}
          </Col>
          <Col xxl={13} xl={13} lg={13} md={13} sm={24} xs={24}>
            <Row type="flex" justify="space-between">
              <Col xxl={11} xl={11} lg={11} md={11} sm={24} xs={24}>
                {/* agency landline number */}
                <Form.Item {...formItemLayout} label="Landline/Other Number">
                  {getFieldDecorator('landline', {
                    initialValue: isEditForm ? agency.landline : undefined,
                  })(<Input />)}
                </Form.Item>
                {/* end agency landline number */}
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                {/* agency fax */}
                <Form.Item {...formItemLayout} label="Fax">
                  {getFieldDecorator('fax', {
                    initialValue: isEditForm ? agency.fax : undefined,
                  })(<Input />)}
                </Form.Item>
                {/* end agency fax */}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* end agency role, landline and fax section */}

        {/* agency Physical Address, Postal Address section */}
        <Row type="flex" justify="space-between">
          <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
            {/* agency physical Address */}
            <Form.Item {...formItemLayout} label="Physical Address">
              {getFieldDecorator('physicalAddress', {
                initialValue: isEditForm ? agency.physicalAddress : undefined,
              })(<TextArea autosize={{ minRows: 1, maxRows: 10 }} />)}
            </Form.Item>
            {/* end agency physical Address */}
          </Col>
          <Col xxl={13} xl={13} lg={13} md={13} sm={24} xs={24}>
            {/* agency postal address */}
            <Form.Item {...formItemLayout} label="Postal Address">
              {getFieldDecorator('postalAddress', {
                initialValue: isEditForm ? agency.postalAddress : undefined,
              })(<TextArea autosize={{ minRows: 1, maxRows: 10 }} />)}
            </Form.Item>
            {/* end agency postal address */}
          </Col>
        </Row>
        {/* end agency physical Address, Postal Address section */}

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

export default Form.create()(AgencyForm);
