import { Connect, postItem, putItem } from '@codetanzania/emis-api-states';
import { httpActions } from '@codetanzania/emis-api-client';
import { Button, Col, Form, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';
import { notifyError, notifySuccess } from '../../../../util';

/* constants */
const { TextArea } = Input;
const { getItemCategories, getItemUnits } = httpActions;

/**
 * @class
 * @name ItemForm
 * @description Render Item form for creating and updating
 * item details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    item: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      maxStockAllowed: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      minStockAllowed: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    uoms: PropTypes.arrayOf(PropTypes.string).isRequired,
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
      item,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedItem = Object.assign({}, item, values);
          putItem(
            updatedItem,
            () => {
              notifySuccess('Item was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating item, please try again!'
              );
            }
          );
        } else {
          postItem(
            values,
            () => {
              notifySuccess('Item was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving item, please try again!'
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
      item,
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
        <Row>
          <Col span={11}>
            {/* name */}
            <Form.Item {...formItemLayout} label="Name">
              {getFieldDecorator('name', {
                initialValue: isEditForm ? item.name : undefined,
                rules: [{ required: true, message: 'Item name is required' }],
              })(<Input />)}
            </Form.Item>
            {/* end name */}
          </Col>
          <Col span={11} offset={2}>
            {/* code */}
            <Form.Item {...formItemLayout} label="Code">
              {getFieldDecorator('code', {
                initialValue: isEditForm ? item.code : undefined,
                rules: [{ required: true, message: 'code is required' }],
              })(<Input />)}
            </Form.Item>
            {/* end code */}
          </Col>
        </Row>

        <Row>
          <Col span={11}>
            {/* Type */}
            <Form.Item {...formItemLayout} label="Category">
              {getFieldDecorator('type', {
                initialValue: isEditForm ? item.type : undefined,
                rules: [{ required: true, message: 'Category is required' }],
              })(
                <SearchableSelectInput
                  onSearch={getItemCategories}
                  optionLabel="value"
                  optionValue="value"
                  initialValue={isEditForm ? item.type : undefined}
                />
              )}
            </Form.Item>
            {/* end type */}
          </Col>
          <Col span={11} offset={2}>
            {/* unit of measure */}
            <Form.Item {...formItemLayout} label="Unit">
              {getFieldDecorator('uom', {
                initialValue: isEditForm ? item.uom : undefined,
                rules: [{ required: true, message: 'Unit is required' }],
              })(
                <SearchableSelectInput
                  onSearch={getItemUnits}
                  optionLabel="value"
                  optionValue="value"
                  initialValue={isEditForm ? item.uom : undefined}
                />
              )}
            </Form.Item>
            {/* end unit of measure */}
          </Col>
        </Row>

        {/* description */}
        <Form.Item {...formItemLayout} label="Description">
          {getFieldDecorator('description', {
            initialValue: isEditForm ? item.description : undefined,
          })(<TextArea autosize={{ minRows: 1, maxRows: 10 }} />)}
        </Form.Item>
        {/* end description */}

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

export default Connect(Form.create()(ItemForm), {
  types: 'items.schema.properties.type.enum',
  uoms: 'items.schema.properties.uom.enum',
});
