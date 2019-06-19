import {
  postIncidentType,
  putIncidentType,
  Connect,
} from '@codetanzania/emis-api-states';
import { Button, Form, Input, Select, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ColorPicker from 'rc-color-picker';
import { notifyError, notifySuccess } from '../../../../util';
import 'rc-color-picker/assets/index.css';
import './styles.css';

const { Option } = Select;

/**
 * @class
 * @name IncidentTypeForm
 * @description Render incident type form for creating/editing incident types
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class IncidentTypeForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    incidenttype: PropTypes.shape({
      name: PropTypes.string,
      nature: PropTypes.string,
      color: PropTypes.string,
      cap: PropTypes.string,
      code: PropTypes.string,
    }),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    families: PropTypes.arrayOf(PropTypes.string).isRequired,
    natures: PropTypes.arrayOf(PropTypes.string).isRequired,
    caps: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    incidenttype: null,
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
  onChangeColor = ({ color }) => {
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
   * @param {object} e event object
   * @version 0.1.0
   * @since 0.1.0
   */
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
          const updatedIncidentType = Object.assign({}, incidenttype, values);
          putIncidentType(
            updatedIncidentType,
            () => {
              notifySuccess('Incident Type was updated successfully');
            },
            () => {
              notifyError(
                `Something occurred while updating Incident Type,
                 please try again!`
              );
            }
          );
        } else {
          postIncidentType(
            values,
            () => {
              notifySuccess('Incident Type was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving Incident Type, please try again!'
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
      incidenttype,
      posting,
      onCancel,
      families,
      caps,
      natures,
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
              {natures.map(nature => (
                <Option key={nature} value={nature}>
                  {nature}
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
              {caps.map(cap => (
                <Option key={cap} value={cap}>
                  {cap}
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
              {families.map(family => (
                <Option key={family} value={family}>
                  {family}
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

        <Row>
          <Col span={19}>
            <Form.Item {...formItemLayout} label="Color Code">
              {getFieldDecorator('color', {
                initialValue: isEditForm ? incidenttype.color : undefined,
              })(
                <Input
                  placeholder="e.g #36c"
                  title="Click button to select color"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={4} offset={1} className="IncidentTypeFormColor">
            <ColorPicker animation="slide-up" onChange={this.onChangeColor} />
          </Col>
        </Row>
        {/* end incident types color code */}

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

export default Connect(Form.create()(IncidentTypeForm), {
  natures: 'incidentTypes.schema.properties.nature.enum',
  families: 'incidentTypes.schema.properties.family.enum',
  caps: 'incidentTypes.schema.properties.cap.enum',
});
