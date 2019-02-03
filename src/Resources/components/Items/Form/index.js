import { putItem, Connect, postItem } from '@codetanzania/emis-api-states';
import { Button, Form, Input, Select, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ColorPicker from 'rc-color-picker';
import { notifyError, notifySuccess } from '../../../../util';
import 'rc-color-picker/assets/index.css';
import './styles.css';

const { Option } = Select;
const { TextArea } = Input;

class ItemForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    item: PropTypes.shape({
      name: PropTypes.string,
      uom: PropTypes.string,
      type: PropTypes.string,
      maxStockAllowed: PropTypes.string,
      minStockAllowed: PropTypes.string,
      code: PropTypes.string,
    }),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    uoms: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    item: null,
  };

  onChangeColor = ({ color }) => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({ color });
  };

  handleSubmit = e => {
    e.preventDefault();

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
                'Something occurred while updating Item, please try again!'
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
                'Something occurred while saving Item, please try again!'
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
      types,
      uoms,
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
        {/* name */}
        <Form.Item {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? item.name : undefined,
            rules: [{ required: true, message: 'Item name is required' }],
          })(<Input placeholder="e.g Water" />)}
        </Form.Item>
        {/* end name */}

        {/* code */}
        <Form.Item {...formItemLayout} label="Item Code">
          {getFieldDecorator('code', {
            initialValue: isEditForm ? item.code : undefined,
            rules: [{ required: true, message: 'code is required' }],
          })(<Input placeholder="CBR" />)}
        </Form.Item>
        {/* end code */}

        {/* Type */}
        <Form.Item {...formItemLayout} label="Type">
          {getFieldDecorator('type', {
            initialValue: isEditForm ? item.type : undefined,
            rules: [{ required: true, message: 'Type is required' }],
          })(
            <Select placeholder="e.g Consumable">
              {types.map(type => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end type */}

        {/* unit of measure */}
        <Form.Item {...formItemLayout} label="Unit of Measure/Quality">
          {getFieldDecorator('uom', {
            initialValue: isEditForm ? item.uom : undefined,
            rules: [{ required: true, message: 'Unit of Measure is required' }],
          })(
            <Select placeholder="e.g bag">
              {uoms.map(uom => (
                <Option key={uom} value={uom}>
                  {uom}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end unit of measure */}

        {/* description */}
        <Form.Item {...formItemLayout} label="Item Summary">
          {getFieldDecorator('description', {
            initialValue: isEditForm ? item.description : undefined,
            rules: [{ message: 'Add summaries' }],
          })(<TextArea placeholder="e.g Addition information of item" />)}
        </Form.Item>
        {/* end description */}

        {/* color code */}
        <Row>
          <Col span={19}>
            <Form.Item {...formItemLayout} label="Color Code">
              {getFieldDecorator('color', {
                initialValue: isEditForm ? item.color : undefined,
              })(
                <Input
                  placeholder="e.g #36c"
                  title="Click button to select color"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={4} offset={1} className="ItemFormColor">
            <ColorPicker animation="slide-up" onChange={this.onChangeColor} />
          </Col>
        </Row>
        {/* end  color code */}

        {/*  minStockAllowed, maxStockAllowed */}
        <Row>
          <Col span={10}>
            <Form.Item {...formItemLayout} label="Minimum Stock">
              {getFieldDecorator('minStockAllowed', {
                initialValue: isEditForm ? item.minStockAllowed : undefined,
                rules: [{ message: 'Minimum stock is required' }],
              })(<Input placeholder="e.g 23" type="number" />)}
            </Form.Item>
          </Col>
          <Col span={10} offset={1}>
            <Form.Item {...formItemLayout} label="Maximum Stock">
              {getFieldDecorator('maxStockAllowed', {
                initialValue: isEditForm ? item.maxStockAllowed : undefined,
                rules: [{ message: 'Maximum stock is required' }],
              })(<Input placeholder="e.g 123" type="number" />)}
            </Form.Item>
          </Col>
        </Row>
        {/* end minStockAllowed & maxStockAllowed */}

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
