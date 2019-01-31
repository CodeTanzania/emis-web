import { postAlert, putAlert, Connect } from '@codetanzania/emis-api-states';
import { getFeatures } from '@codetanzania/emis-api-client';
import { Button, Form, Input, Select, DatePicker, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';
import { notifyError, notifySuccess } from '../../../../util';

const { Option } = Select;
const { TextArea } = Input;

class AlertForm extends Component {
  static propTypes = {
    alertSchema: PropTypes.shape({
      category: PropTypes.arrayOf(
        PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) })
      ),
      urgency: PropTypes.arrayOf(
        PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) })
      ),
      severity: PropTypes.arrayOf(
        PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) })
      ),
      certainty: PropTypes.arrayOf(
        PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) })
      ),
      type: PropTypes.arrayOf(
        PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) })
      ),
      response: PropTypes.arrayOf(
        PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) })
      ),
    }).isRequired,
    alert: PropTypes.shape({
      event: PropTypes.string,
      category: PropTypes.string,
      urgency: PropTypes.string,
      area: PropTypes.string,
      severity: PropTypes.string,
      certainty: PropTypes.string,
      instruction: PropTypes.string,
      headline: PropTypes.string,
      expiredAt: PropTypes.string,
      expectedAt: PropTypes.string,
      _id: PropTypes.string,
    }),
    posting: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    isEditForm: PropTypes.bool.isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
  };

  static defaultProps = {
    alert: null,
  };

  componentDidMount() {
    getFeatures();
  }

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      alert,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const {
          event,
          area,
          category,
          urgency,
          severity,
          certainty,
          instruction,
          headline,
          expectedAt,
          expiredAt,
        } = values;

        const payload = {
          category,
          headline,
          expectedAt: expectedAt.toISOString(),
          expiredAt: expiredAt.toISOString(),
          event,
          area,
          urgency,
          severity,
          certainty,
          instruction,
          source: 'testing',
        };
        if (isEditForm) {
          const updatedAlert = Object.assign({}, alert, payload);
          putAlert(
            updatedAlert,
            () => {
              notifySuccess('Alert was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating alert, please try again!'
              );
            }
          );
        } else {
          postAlert(
            payload,
            () => {
              notifySuccess('Alert was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving alert, please try again!'
              );
            }
          );
        }
      }
    });
  };

  renderSelectOptions = options =>
    options.map(option => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ));

  renderAreaOptions = options =>
    options.map(({ name, _id: id }) => (
      <Option key={id} value={name}>
        {name}
      </Option>
    ));

  render() {
    const {
      posting,
      onCancel,
      alert,
      isEditForm,
      alertSchema,
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
        <Row justify="space-between" type="flex">
          <Col span={11}>
            {/* Alert event */}
            <Form.Item {...formItemLayout} label="Event">
              {getFieldDecorator('event', {
                initialValue: isEditForm ? alert.event : undefined,
                rules: [{ required: true, message: 'Alert event is required' }],
              })(<Input placeholder="e.g Flood Tandale" />)}
            </Form.Item>
            {/* end Alert event */}

            {/* Alert headline */}
            <Form.Item {...formItemLayout} label="Headline">
              {getFieldDecorator('headline', {
                initialValue: isEditForm ? alert.headline : undefined,
                rules: [
                  { required: true, message: 'Alert headline is required' },
                ],
              })(
                <Input placeholder="e.g ORANGE WARNING. Strong winds and Large waves" />
              )}
            </Form.Item>
            {/* end Alert headline */}

            {/* alert area */}
            <Form.Item {...formItemLayout} label="Area(s)">
              {getFieldDecorator('area', {
                rules: [
                  { required: true, message: 'Affected area is required' },
                ],
              })(
                <SearchableSelectInput
                  placeholder="Please select affected area"
                  onSearch={getFeatures}
                  optionLabel="name"
                  optionValue="name"
                />
              )}
            </Form.Item>
            {/* end alert category */}

            {/* alert category */}
            <Form.Item {...formItemLayout} label="Category">
              {getFieldDecorator('category', {
                initialValue: isEditForm ? alert.category : undefined,
                rules: [
                  { required: true, message: 'Alert category is required' },
                ],
              })(
                <Select showSearch>
                  {this.renderSelectOptions(alertSchema.category.enum)}
                </Select>
              )}
            </Form.Item>
            {/* end alert category */}

            {/* alert urgency */}
            <Form.Item {...formItemLayout} label="Urgency">
              {getFieldDecorator('urgency', {
                initialValue: isEditForm ? alert.urgency : undefined,
                rules: [
                  { required: true, message: 'Alert urgency is required' },
                ],
              })(
                <Select showSearch>
                  {this.renderSelectOptions(alertSchema.urgency.enum)}
                </Select>
              )}
            </Form.Item>
            {/* end alert urgency */}

            {/* alert severity */}
            <Form.Item {...formItemLayout} label="Severity">
              {getFieldDecorator('severity', {
                initialValue: isEditForm ? alert.severity : undefined,
                rules: [
                  { required: true, message: 'Alert severity is required' },
                ],
              })(
                <Select showSearch>
                  {this.renderSelectOptions(alertSchema.severity.enum)}
                </Select>
              )}
            </Form.Item>
            {/* end alert severity */}
          </Col>
          <Col span={11}>
            {/* alert certainty */}
            <Form.Item {...formItemLayout} label="Certainty">
              {getFieldDecorator('certainty', {
                initialValue: isEditForm ? alert.certainty : undefined,
                rules: [
                  { required: true, message: 'Alert certainty is required' },
                ],
              })(
                <Select showSearch>
                  {this.renderSelectOptions(alertSchema.certainty.enum)}
                </Select>
              )}
            </Form.Item>
            {/* end alert certainty */}

            {/* alert type */}
            <Form.Item {...formItemLayout} label="Type">
              {getFieldDecorator('type', {
                initialValue: isEditForm ? alert.type : undefined,
                rules: [
                  { required: true, message: 'Alert Message Type is required' },
                ],
              })(
                <Select showSearch>
                  {this.renderSelectOptions(alertSchema.type.enum)}
                </Select>
              )}
            </Form.Item>
            {/* end alert type */}

            {/* alert response type */}
            <Form.Item {...formItemLayout} label="Response Type">
              {getFieldDecorator('response', {
                initialValue: isEditForm ? alert.response : undefined,
                rules: [
                  {
                    required: true,
                    message: 'Alert Response Type is required',
                  },
                ],
              })(
                <Select showSearch>
                  {this.renderSelectOptions(alertSchema.response.enum)}
                </Select>
              )}
            </Form.Item>
            {/* end alert response type */}

            {/* alert onset date  */}
            <Form.Item {...formItemLayout} label="OnSet">
              {getFieldDecorator('expectedAt', {
                initialValue: isEditForm
                  ? moment(alert.expectedAt).utc()
                  : undefined,
                rules: [
                  { required: true, message: 'Alert  OnSet date is required' },
                ],
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )}
            </Form.Item>
            {/* end alert onset date */}

            {/* alert expires date  */}
            <Form.Item {...formItemLayout} label="Expires At">
              {getFieldDecorator('expiredAt', {
                initialValue: isEditForm
                  ? moment(alert.expiredAt).utc()
                  : undefined,
                rules: [
                  { required: true, message: 'Alert Expire date is required' },
                ],
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )}
            </Form.Item>
            {/* end alert expire date */}

            {/* alert instructions  */}
            <Form.Item {...formItemLayout} label="Instructions">
              {getFieldDecorator('instruction', {
                initialValue: isEditForm ? alert.instruction : undefined,
                rules: [
                  { required: true, message: 'Alert  Instruction is required' },
                ],
              })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
            </Form.Item>
            {/* end alert instructions */}
          </Col>
        </Row>

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

export default Form.create()(
  Connect(AlertForm, {
    alertSchema: 'alerts.schema.properties',
  })
);
