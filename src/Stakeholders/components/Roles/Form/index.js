import { postRole, putRole } from '@codetanzania/emis-api-states';
import { Button, Col, Form, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';

/* constants */
const { TextArea } = Input;

/**
 * @class
 * @name RoleForm
 * @description Render React Form
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class RoleForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    role: PropTypes.shape({
      name: PropTypes.string,
      abbreviation: PropTypes.string,
      description: PropTypes.string,
    }),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    role: null,
  };

  /**
   * @function
   * @name handleSubmit
   * @description Handle form submit action
   *
   * @param {object} event onSubmit event
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = event => {
    event.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      role,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedRole = Object.assign({}, role, values);
          putRole(
            updatedRole,
            () => {
              notifySuccess('Role was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating role, please try again!'
              );
            }
          );
        } else {
          postRole(
            values,
            () => {
              notifySuccess('Role was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving role, please try again!'
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
      role,
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
        {/* role name and abbreviation */}
        <Row type="flex" justify="space-between">
          <Col xxl={17} xl={17} lg={17} md={17} sm={24} xs={24}>
            {/* role name */}
            <Form.Item {...formItemLayout} label=" Name">
              {getFieldDecorator('name', {
                initialValue: isEditForm ? role.name : undefined,
                rules: [{ required: true, message: 'Role  name is required' }],
              })(<Input />)}
            </Form.Item>
            {/* end role name */}
          </Col>

          <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
            {/* role abbreviation */}
            <Form.Item {...formItemLayout} label="Abbreviation">
              {getFieldDecorator('abbreviation', {
                initialValue: isEditForm ? role.abbreviation : undefined,
              })(<Input />)}
            </Form.Item>
            {/* end role abbreviation */}
          </Col>
        </Row>
        {/* end role name and abbreviation */}

        {/* role description */}
        <Form.Item {...formItemLayout} label="Description">
          {getFieldDecorator('description', {
            initialValue: isEditForm ? role.description : undefined,
          })(<TextArea autosize={{ minRows: 1, maxRows: 10 }} />)}
        </Form.Item>
        {/* end role description */}

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

export default Form.create()(RoleForm);
