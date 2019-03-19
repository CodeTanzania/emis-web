import {
  postItemCategory,
  putItemCategory,
} from '@codetanzania/emis-api-states';
import { Button, Form, Input, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import randomColor from 'randomcolor';
import ColorPicker from 'rc-color-picker';
import { notifyError, notifySuccess } from '../../../../util';
import 'rc-color-picker/assets/index.css';
import './styles.css';

/* constants */
const { TextArea } = Input;

/**
 * @class
 * @value ItemCategoryForm
 * @description Render Item Category form for creating/editing Item Categories
 *
 * @version 0.1.0
 * @since 0.1.0
 */

class ItemCategoryForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    itemCategory: PropTypes.shape({
      _id: PropTypes.string,
      value: PropTypes.string,
      color: PropTypes.string,
      abbreviation: PropTypes.string,
      description: PropTypes.string,
    }),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    posting: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    itemCategory: null,
  };

  /**
   * @function
   * @name onChangeColor
   * @description Handle changing of color
   *
   * @param {string} color event object
   * @version 0.1.0
   * @since 0.1.0
   */
  onChangeColor = color => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({ color });
  };

  /**
   * @function
   * @name handleSubmit
   * @description Handle create/edit action
   *
   * @param {Object} e event object
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      itemCategory,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, data) => {
      const color = data.color ? data.color.color : null; // color comes as object we need to get color string
      const values = { ...data, color };
      if (!error) {
        if (isEditForm) {
          const updateItemCategory = Object.assign({}, itemCategory, values);
          putItemCategory(
            updateItemCategory,
            () => {
              notifySuccess('Item category was updated successfully');
            },
            () => {
              notifyError(
                `Something occurred while updating Item Category,
                 please try again!`
              );
            }
          );
        } else {
          postItemCategory(
            values,
            () => {
              notifySuccess('Item category was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving Item category, please try again!'
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
      onCancel,
      itemCategory,
      posting,
      form: { getFieldDecorator },
    } = this.props;

    const defaultColor = itemCategory ? itemCategory.color : randomColor();

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
        {/* Item Categories value */}
        <Form.Item {...formItemLayout} label="Name ">
          {getFieldDecorator('value', {
            initialValue: isEditForm ? itemCategory.value : undefined,
            rules: [{ required: true, message: 'name is required' }],
          })(<Input />)}
        </Form.Item>
        {/* end Item Categories value */}

        <Row>
          {/* Item Categories abbreviation */}
          <Col span={21}>
            <Form.Item {...formItemLayout} label="Code">
              {getFieldDecorator('abbreviation', {
                initialValue: isEditForm
                  ? itemCategory.abbreviation
                  : undefined,
                rules: [{ required: true, message: 'Code is required' }],
              })(<Input />)}
            </Form.Item>
          </Col>
          {/* end Item Categories abbreviation */}

          {/* Item Categories color */}
          <Col span={2} offset={1}>
            <Form.Item {...formItemLayout} label="Color">
              {getFieldDecorator('color')(
                <ColorPicker
                  animation="slide-up"
                  defaultColor={defaultColor}
                  onChange={this.onChangeColor}
                />
              )}
            </Form.Item>
          </Col>
          {/* end Item Categories color */}
        </Row>

        {/* Item Categories value */}
        <Form.Item {...formItemLayout} label="Description ">
          {getFieldDecorator('description', {
            initialValue: isEditForm ? itemCategory.description : undefined,
            rules: [{ message: 'Description is required' }],
          })(<TextArea autosize={{ minRows: 1, maxRows: 10 }} />)}
        </Form.Item>
        {/* end Item Categories value */}

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

export default Form.create()(ItemCategoryForm);
