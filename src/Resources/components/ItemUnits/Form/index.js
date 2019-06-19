import { putItemUnit, postItemUnit } from '@codetanzania/emis-api-states';
import { Button, Form, Input, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

const { TextArea } = Input;

// eslint-disable-next-line jsdoc/require-returns
/**
 * @class
 * @name ItemUnitForm
 * @description  Render form for creating a new Item Unit Of Measure
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemUnitForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    itemUnit: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      maxStockAllowed: PropTypes.string,
      minStockAllowed: PropTypes.string,
    }),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    itemUnit: null,
  };

  // eslint-disable-next-line jsdoc/require-returns
  /**
   * @function
   * @name onChangeColor
   * @description  call back function to handle color change
   *
   * @param {object} colors colors object
   * @param {object} colors.color current color
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  onChangeColor = ({ color }) => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({ color });
  };

  // eslint-disable-next-line jsdoc/require-returns
  /**
   * @function
   * @name handleSubmit
   * @description  call back function to handle submit action
   *
   * @param {object} e event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      itemUnit,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedItem = Object.assign({}, itemUnit, values);
          putItemUnit(
            updatedItem,
            () => {
              notifySuccess('Unit of measure was updated successfully');
            },
            () => {
              notifyError(
                'An error occurred while updating unit of measure, please try again!'
              );
            }
          );
        } else {
          postItemUnit(
            values,
            () => {
              notifySuccess('Unit of measure was created successfully');
            },
            () => {
              notifyError(
                'An error occurred while saving unit of measure, please try again!'
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
      itemUnit,
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
        <Row type="flex" justify="space-between">
          <Col span={16}>
            {/* name */}
            <Form.Item {...formItemLayout} label="Name">
              {getFieldDecorator('value', {
                initialValue: isEditForm ? itemUnit.value : undefined,
                rules: [
                  {
                    required: true,
                    message: 'Unit of measure name is required',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            {/* end name */}
          </Col>
          <Col span={7}>
            {/* abbreviation */}
            <Form.Item {...formItemLayout} label="Abbreviation">
              {getFieldDecorator('abbreviation', {
                initialValue: isEditForm ? itemUnit.abbreviation : undefined,
                rules: [
                  { required: true, message: 'Abbreviation is required' },
                ],
              })(<Input />)}
            </Form.Item>
            {/* end abbreviation */}
          </Col>
        </Row>

        {/* description */}
        <Form.Item {...formItemLayout} label="Description">
          {getFieldDecorator('description', {
            initialValue: isEditForm ? itemUnit.description : undefined,
            rules: [{ message: 'Add summaries' }],
          })(<TextArea />)}
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

export default Form.create()(ItemUnitForm);
