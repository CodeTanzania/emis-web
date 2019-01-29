import {
  postStakeholder,
  getFeatures,
  Connect,
} from '@codetanzania/emis-api-states';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const { Option } = Select;
const { TextArea } = Input;
const urgencies = ['Immediate', 'Expected', 'Future', 'Past', 'Unknown'];
const severities = ['Extreme', 'Severe', 'Moderate', 'Minor', 'Unknown'];
const certainties = ['Observed', 'Likely', 'Possible', 'Unlikely', 'Unknown'];
const types = ['Alert', 'Update', 'Cancel', 'Error', 'Ask'];
const categories = [
  'Geo',
  'Met',
  'Safety',
  'Security',
  'Rescue',
  'Fire',
  'Health',
  'Env',
  'Transport',
  'Infra',
  'CBRNE',
  'Other',
];

const responses = [
  'Shelter',
  'Evacuate',
  'Prepare',
  'Execute',
  'Avoid',
  'Monitor',
  'Assess',
  'AllClear',
  'None',
];

class AlertForm extends Component {
  static propTypes = {
    areas: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        level: PropTypes.string,
      })
    ).isRequired,
    posting: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
  };

  componentDidMount() {
    getFeatures();
  }

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        postStakeholder(values);
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
      areas,
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
        {/* Alert event */}
        <Form.Item {...formItemLayout} label="Event">
          {getFieldDecorator('event', {
            rules: [{ required: true, message: 'Alert event is required' }],
          })(<Input placeholder="e.g Flood Tandale" />)}
        </Form.Item>
        {/* end Alert event */}

        {/* Alert headline */}
        <Form.Item {...formItemLayout} label="Headline">
          {getFieldDecorator('headline', {
            rules: [{ required: true, message: 'Alert headline is required' }],
          })(
            <Input placeholder="e.g ORANGE WARNING. Strong winds and Large waves" />
          )}
        </Form.Item>
        {/* end Alert headline */}

        {/* alert area */}
        <Form.Item {...formItemLayout} label="Area(s)">
          {getFieldDecorator('area', {
            rules: [{ required: true, message: 'Affected area is required' }],
          })(
            <Select mode="multiple" showSearch>
              {this.renderAreaOptions(areas)}
            </Select>
          )}
        </Form.Item>
        {/* end alert category */}

        {/* alert category */}
        <Form.Item {...formItemLayout} label="Category">
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Alert category is required' }],
          })(
            <Select showSearch>{this.renderSelectOptions(categories)}</Select>
          )}
        </Form.Item>
        {/* end alert category */}

        {/* alert urgency */}
        <Form.Item {...formItemLayout} label="Urgency">
          {getFieldDecorator('urgency', {
            rules: [{ required: true, message: 'Alert urgency is required' }],
          })(<Select showSearch>{this.renderSelectOptions(urgencies)}</Select>)}
        </Form.Item>
        {/* end alert urgency */}

        {/* alert severity */}
        <Form.Item {...formItemLayout} label="Severity">
          {getFieldDecorator('severity', {
            rules: [{ required: true, message: 'Alert severity is required' }],
          })(
            <Select showSearch>{this.renderSelectOptions(severities)}</Select>
          )}
        </Form.Item>
        {/* end alert severity */}

        {/* alert certainty */}
        <Form.Item {...formItemLayout} label="Certainty">
          {getFieldDecorator('certainty', {
            rules: [{ required: true, message: 'Alert certainty is required' }],
          })(
            <Select showSearch>{this.renderSelectOptions(certainties)}</Select>
          )}
        </Form.Item>
        {/* end alert certainty */}

        {/* alert type */}
        <Form.Item {...formItemLayout} label="Type">
          {getFieldDecorator('type', {
            rules: [
              { required: true, message: 'Alert Message Type is required' },
            ],
          })(<Select showSearch>{this.renderSelectOptions(types)}</Select>)}
        </Form.Item>
        {/* end alert type */}

        {/* alert response type */}
        <Form.Item {...formItemLayout} label="Response Type">
          {getFieldDecorator('response', {
            rules: [
              { required: true, message: 'Alert Response Type is required' },
            ],
          })(<Select showSearch>{this.renderSelectOptions(responses)}</Select>)}
        </Form.Item>
        {/* end alert response type */}

        {/* alert onset date  */}
        <Form.Item {...formItemLayout} label="OnSet">
          {getFieldDecorator('expectedAt', {
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
          {getFieldDecorator('expiresAt', {
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
            rules: [
              { required: true, message: 'Alert  Instruction is required' },
            ],
          })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
        </Form.Item>
        {/* end alert instructions */}

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
    areas: 'features.list',
  })
);
