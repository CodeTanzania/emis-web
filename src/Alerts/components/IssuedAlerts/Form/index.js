import { httpActions } from '@codetanzania/emis-api-client';
import { Connect, postAlert, putAlert } from '@codetanzania/emis-api-states';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import map from 'lodash/map';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';
import { notifyError, notifySuccess } from '../../../../util';

/* constants */
const { getAlertSources, getFeatures } = httpActions;
const { Option } = Select;
const { TextArea } = Input;
const eventTitle =
  'The text denoting the type of the subject event of the alert message';
const headlineTitle = `A brief human-readable headline.  it SHOULD be made as direct and actionable
   as possible while remaining short. 160 characters MAY be a useful target limit for headline length.`;
const areaTitle = 'A text description of the affected area(s).';
const onSetTitle =
  'The expected time of the beginning of the subject event of the alert message';
const expiredAtTitle =
  'The expiry time of the information of the alert message';
const instructionsTitle =
  'The text describing the recommended action to be taken by recipients of the alert message';
const statusTitle =
  'The code denoting the appropriate handling of the alert message';
const categoryTitle =
  'The code denoting the category of the subject event of the alert message';
const urgencyTitle =
  'The code denoting the urgency of the subject event of the alert message';
const severityTitle =
  'The code denoting the severity of the subject event of the alert message';
const certaintyTitle =
  'The code denoting the certainty of the subject event of the alert message';
const typeTitle = 'The code denoting the nature of the alert message';
const responseTypetitle =
  'The code denoting the type of action recommended for the target audience';
const alertSourceTitle =
  'The human-readable name of the agency or authority issuing this alert.';

/**
 * @class
 * @name AlertForm
 * @description  form for creating a new alert
 *
 * @version 0.1.0
 * @since 0.1.0
 */
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
      status: PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) }),
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
      locations: PropTypes.arrayOf({ name: PropTypes.string }),
      type: PropTypes.string,
      response: PropTypes.string,
      _id: PropTypes.string,
    }),
    posting: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    isEditForm: PropTypes.bool.isRequired,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func,
      validateFieldsAndScroll: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    alert: null,
  };

  componentDidMount() {
    getFeatures();
  }

  /**
   * @function
   * @name handleSubmit
   * @description  handle alert form submission
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

  /**
   * @function
   * @name renderSelectOptions
   * @description  display select options
   * @param {Array} options select options
   *
   * @returns {object[]} Selected options components
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  renderSelectOptions = options =>
    options.map(option => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ));

  /**
   * @function
   * @name renderAreaOptions
   * @description  display area options
   * @param {Array} options area options
   *
   * @returns {object[]}  Options components
   *
   * @version 0.1.0
   * @since 0.1.0
   */
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
      <Form onSubmit={this.handleSubmit} autoComplete="off">
        <Row justify="space-between" type="flex">
          <Col span={11}>
            {/* Alert event */}
            <Form.Item
              {...formItemLayout}
              label={<span title={eventTitle}>Event</span>}
            >
              {getFieldDecorator('event', {
                initialValue: isEditForm ? alert.event : undefined,
                rules: [{ required: true, message: 'Alert event is required' }],
              })(<Input placeholder="e.g Flood Tandale" />)}
            </Form.Item>
            {/* end Alert event */}

            {/* Alert headline */}
            <Form.Item
              {...formItemLayout}
              label={<span title={headlineTitle}>Headline</span>}
            >
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

            {/* alert status */}
            <Form.Item
              {...formItemLayout}
              label={<span title={statusTitle}>Status</span>}
            >
              {getFieldDecorator('status', {
                initialValue: isEditForm ? alert.category : undefined,
                rules: [
                  { required: true, message: 'Alert status is required' },
                ],
              })(
                <Select showSearch>
                  {this.renderSelectOptions(alertSchema.status.enum)}
                </Select>
              )}
            </Form.Item>
            {/* end alert status */}

            {/* alert area */}
            <Form.Item
              {...formItemLayout}
              label={<span title={areaTitle}>Area(s)</span>}
            >
              {getFieldDecorator('locations', {
                rules: [
                  { required: true, message: 'Affected area(s) is required' },
                ],
                initialValue:
                  alert && alert.locations
                    ? map(alert.locations, location => location._id) // eslint-disable-line
                    : [],
              })(
                <SearchableSelectInput
                  placeholder="Please select affected area"
                  onSearch={getFeatures}
                  optionLabel="name"
                  optionValue="name"
                  mode="multiple"
                  initialValue={alert && alert.locations ? alert.locations : []}
                />
              )}
            </Form.Item>
            {/* end alert area */}

            {/* alert onset date  */}
            <Form.Item
              {...formItemLayout}
              label={<span title={onSetTitle}>OnSet</span>}
            >
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
            <Form.Item
              {...formItemLayout}
              label={<span title={expiredAtTitle}>Expires At</span>}
            >
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
            <Form.Item
              {...formItemLayout}
              label={<span title={instructionsTitle}>Instructions</span>}
            >
              {getFieldDecorator('instruction', {
                initialValue: isEditForm ? alert.instruction : undefined,
                rules: [
                  { required: true, message: 'Alert  Instruction is required' },
                ],
              })(<TextArea autosize={{ minRows: 2, maxRows: 8 }} />)}
            </Form.Item>
            {/* end alert instructions */}
          </Col>
          <Col span={11}>
            {/* alert category */}
            <Form.Item
              {...formItemLayout}
              label={<span title={categoryTitle}>Category</span>}
            >
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
            <Form.Item
              {...formItemLayout}
              label={<span title={urgencyTitle}>Urgency</span>}
            >
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
            <Form.Item
              {...formItemLayout}
              label={<span title={severityTitle}>Severity</span>}
            >
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
            {/* alert certainty */}
            <Form.Item
              {...formItemLayout}
              label={<span title={certaintyTitle}>Certainty</span>}
            >
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
            <Form.Item
              {...formItemLayout}
              label={<span title={typeTitle}>Message Type</span>}
            >
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
            <Form.Item
              {...formItemLayout}
              label={<span title={responseTypetitle}>Response Type</span>}
            >
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

            {/* alert source */}
            <Form.Item
              {...formItemLayout}
              label={<span title={alertSourceTitle}>Alert Source</span>}
            >
              {getFieldDecorator('agency', {
                rules: [
                  { required: true, message: 'Alert Source is required' },
                ],
              })(
                <SearchableSelectInput
                  placeholder="Please select alert source"
                  onSearch={getAlertSources}
                  optionLabel="name"
                  optionValue="_id"
                />
              )}
            </Form.Item>
            {/* end alert source */}
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
