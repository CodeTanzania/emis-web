import {
  putIndicator,
  postIndicator,
  Connect,
} from '@codetanzania/emis-api-states';
import { Button, Form, Input, Select, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ColorPicker from 'rc-color-picker';
import { notifyError, notifySuccess } from '../../../../util';
import 'rc-color-picker/assets/index.css';
import './styles.css';

const { TextArea } = Input;
const { Option } = Select;
/**
 * Render indicator form for creating/editing indicator
 *
 * @class
 * @name IndicatorForm
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class IndicatorForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    indicator: PropTypes.shape({
      subject: PropTypes.string,
      topic: PropTypes.string,
      description: PropTypes.string,
    }),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    indicator: null,
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
      indicator,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedContact = Object.assign({}, indicator, values);
          putIndicator(
            updatedContact,
            () => {
              notifySuccess('Indicator was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating Indicator, please try again!'
              );
            }
          );
        } else {
          postIndicator(
            values,
            () => {
              notifySuccess('Indicator was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving Indicator, please try again!'
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
      indicator,
      posting,
      onCancel,
      subjects,
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
        {/*  subject */}
        <Form.Item {...formItemLayout} label="Subject">
          {getFieldDecorator('subject', {
            initialValue: isEditForm ? indicator.subject : undefined,
            rules: [{ required: true, message: 'Subject is required' }],
          })(
            <Select placeholder="e.g Water">
              {subjects.map(subject => (
                <Option key={subject} value={subject}>
                  {subject}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end subject */}

        {/* Topic */}
        <Form.Item {...formItemLayout} label="Topic">
          {getFieldDecorator('topic', {
            initialValue: isEditForm ? indicator.topic : undefined,
            rules: [{ required: true, message: 'Topic is required' }],
          })(<Input placeholder="e.g Increase of prices" />)}
        </Form.Item>
        {/* end topic */}

        {/* indicators description */}
        <Form.Item {...formItemLayout} label="Indicator Summary">
          {getFieldDecorator('description', {
            initialValue: isEditForm ? indicator.description : undefined,
          })(
            <TextArea
              placeholder="e.g Additional details about an indicator."
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          )}
        </Form.Item>
        {/* end description */}

        {/* color code */}
        <Row>
          <Col span={19}>
            <Form.Item {...formItemLayout} label="Color Code">
              {getFieldDecorator('color', {
                initialValue: isEditForm ? indicator.color : undefined,
              })(
                <Input
                  placeholder="e.g #36c"
                  title="Click button to select color"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={4} offset={1} className="IndicatorFormColor">
            <ColorPicker animation="slide-up" onChange={this.onChangeColor} />
          </Col>
        </Row>
        {/* end  color code */}

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

export default Connect(Form.create()(IndicatorForm), {
  subjects: 'indicators.schema.properties.subject.enum',
});
