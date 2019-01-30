import { postStock, putStock } from '@codetanzania/emis-api-states';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';

class StockForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    stock: PropTypes.shape({
      stock: PropTypes.object,
      item: PropTypes.object,
      quantity: PropTypes.number,
      _id: PropTypes.string,
    }).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      stock,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedStock = Object.assign({}, stock, values);
          putStock(
            updatedStock,
            () => {
              notifySuccess('Stock was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating stock, please try again!'
              );
            }
          );
        } else {
          postStock(
            values,
            () => {
              notifySuccess('Stock was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving stock, please try again!'
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
      stock,
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
        {/* stock stakeholder */}
        <Form.Item {...formItemLayout} label="Stakeholder">
          {getFieldDecorator('stakeholder', {
            initialValue: isEditForm ? stock.name : undefined,
            rules: [
              { required: true, message: 'Stock stakeholder is required' },
            ],
          })(<Input />)}
        </Form.Item>
        {/* end stock stakeholder */}

        {/* stock Item */}
        <Form.Item {...formItemLayout} label="Item">
          {getFieldDecorator('item', {
            initialValue: isEditForm ? stock.title : undefined,
            rules: [{ required: true, message: 'Stock item is required' }],
          })(<Input />)}
        </Form.Item>
        {/* end stock Item */}

        {/* stock quantity */}
        <Form.Item {...formItemLayout} label="Quantity">
          {getFieldDecorator('quantity', {
            initialValue: isEditForm ? stock.abbreviation : undefined,
          })(<Input />)}
        </Form.Item>
        {/* end stock quantity */}

        {/* stock Warehouse */}
        <Form.Item {...formItemLayout} label="Warehouse">
          {getFieldDecorator('warehouse', {
            initialValue: isEditForm ? stock.mobile : undefined,
            rules: [{ required: true, message: 'warehouse is required' }],
          })(<Input />)}
        </Form.Item>
        {/* end stock number */}

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

export default Form.create()(StockForm);
