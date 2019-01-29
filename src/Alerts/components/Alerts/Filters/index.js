import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const urgencies = ['Immediate', 'Expected', 'Future', 'Past', 'Unknown'];
const severities = ['Extreme', 'Severe', 'Moderate', 'Minor', 'Unknown'];
const certainties = ['Observed', 'Likely', 'Possible', 'Unlikely', 'Unknown'];
const types = ['Alert', 'Update', 'Cancel', 'Error', 'Ask'];
const statuses = ['Actual', 'Exercise', 'System', 'Draft', 'Test'];
const scopes = ['Public', 'Restricted', 'Private'];
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

/**
 * Filter modal component for filtering alerts
 *
 * @class
 * @name AlertsFilters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertsFilters extends Component {
  static propTypes = {
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
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
      <Form onSubmit={this.handleSubmit} layout={formItemLayout}>
        {/* start alert status filters */}
        <Form.Item {...formItemLayout} label="By  Status">
          {getFieldDecorator('status')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {statuses.map(status => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={status}>{status}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert status filters */}

        {/* start alert types filters */}
        <Form.Item {...formItemLayout} label="By  Message Types">
          {getFieldDecorator('types')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {types.map(type => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={type}>{type}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert types filters */}

        {/* start alert scopes filters */}
        <Form.Item {...formItemLayout} label="By  Scope">
          {getFieldDecorator('scopes')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {scopes.map(scope => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={scope}>{scope}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert scopes filters */}

        {/* start alert categories filters */}
        <Form.Item {...formItemLayout} label="By  Categories">
          {getFieldDecorator('categories')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {categories.map(category => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={category}>{category}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert categories filters */}

        {/* start alert responses filters */}
        <Form.Item {...formItemLayout} label="By  Response Type">
          {getFieldDecorator('responses')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {responses.map(response => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={response}>{response}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert responses filters */}

        {/* start alert urgency filters */}
        <Form.Item {...formItemLayout} label="By  Urgency">
          {getFieldDecorator('urgencies')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {urgencies.map(urgency => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={urgency}>{urgency}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert urgency filters */}

        {/* start alert severity filters */}
        <Form.Item {...formItemLayout} label="By  Severity">
          {getFieldDecorator('severities')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {severities.map(severity => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={severity}>{severity}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert severity filters */}

        {/* start alert cetainity filters */}
        <Form.Item {...formItemLayout} label="By  Certainity">
          {getFieldDecorator('certainities')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {certainties.map(certainity => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={certainity}>{certainity}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert certainity filters */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Filter
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => {}}>
            Clear
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}
export default Form.create()(AlertsFilters);
