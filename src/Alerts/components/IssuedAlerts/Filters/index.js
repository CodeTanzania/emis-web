import {
  clearAlertFilters,
  Connect,
  filterAlerts,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * @class
 * @name AlertsFilters
 * @description Filter modal component for filtering alerts
 *
 * @param {object} props props object
 * @param {object} props.alertSchema alert schema object
 * @param {object} props.filter alert filter object
 * @param {object} props.form antd form
 * @param {Function} props.onCancel function to cancel alert filters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertsFilters extends Component {
  /**
   * @function
   * @name handleSubmit
   * @description Handle filter action
   *
   * @param {object} e event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      onCancel,
    } = this.props;

    validateFields((error, values) => {
      if (!error) {
        filterAlerts(values);
        onCancel();
      }
    });
  };

  /**
   * Action handle when clear
   *
   * @function
   * @name handleClearFilter
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleClearFilter = () => {
    const { onCancel } = this.props;
    clearAlertFilters();
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      filter,
      alertSchema,
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
        {/* start alert types filters */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...formItemLayout} label="By  Message Types">
          {getFieldDecorator('type', {
            initialValue: filter ? filter.type : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {alertSchema.type.enum.map(type => (
                  <Col span={6} style={{ margin: '10px 0' }} key={type}>
                    <Checkbox value={type}>{type}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert types filters */}

        {/* start alert categories filters */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...formItemLayout} label="By  Categories">
          {getFieldDecorator('category', {
            initialValue: filter ? filter.category : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {alertSchema.category.enum.map(category => (
                  <Col span={6} style={{ margin: '10px 0' }} key={category}>
                    <Checkbox value={category}>{category}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert categories filters */}

        {/* start alert responses filters */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...formItemLayout} label="By  Response Type">
          {getFieldDecorator('response', {
            initialValue: filter ? filter.response : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {alertSchema.response.enum.map(response => (
                  <Col span={6} style={{ margin: '10px 0' }} key={response}>
                    <Checkbox value={response}>{response}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert responses filters */}

        {/* start alert urgency filters */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...formItemLayout} label="By  Urgency">
          {getFieldDecorator('urgency', {
            initialValue: filter ? filter.urgency : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {alertSchema.urgency.enum.map(urgency => (
                  <Col span={6} style={{ margin: '10px 0' }} key={urgency}>
                    <Checkbox value={urgency}>{urgency}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert urgency filters */}

        {/* start alert severity filters */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...formItemLayout} label="By  Severity">
          {getFieldDecorator('severity', {
            initialValue: filter ? filter.severity : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {alertSchema.severity.enum.map(severity => (
                  <Col span={6} style={{ margin: '10px 0' }} key={severity}>
                    <Checkbox value={severity}>{severity}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert severity filters */}

        {/* start alert cetainity filters */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...formItemLayout} label="By  Certainity">
          {getFieldDecorator('certainty', {
            initialValue: filter ? filter.certainty : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {alertSchema.certainty.enum.map(certainty => (
                  <Col span={6} style={{ margin: '10px 0' }} key={certainty}>
                    <Checkbox value={certainty}>{certainty}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end alert certainity filters */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleClearFilter}>
            Clear
          </Button>
          <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
            Filter
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

AlertsFilters.propTypes = {
  alertSchema: PropTypes.shape({
    category: PropTypes.shape(
      PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) })
    ),
    urgency: PropTypes.shape(
      PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) })
    ),
    severity: PropTypes.shape(
      PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) })
    ),
    certainty: PropTypes.shape(
      PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) })
    ),
    response: PropTypes.shape(
      PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) })
    ),
    type: PropTypes.shape({ enum: PropTypes.arrayOf(PropTypes.string) }),
  }).isRequired,
  filter: PropTypes.objectOf(
    PropTypes.shape({
      category: PropTypes.arrayOf(PropTypes.string),
      urgency: PropTypes.arrayOf(PropTypes.string),
      severity: PropTypes.arrayOf(PropTypes.string),
      certainty: PropTypes.arrayOf(PropTypes.string),
      type: PropTypes.arrayOf(PropTypes.string),
      response: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func,
  }).isRequired,
};

AlertsFilters.defaultProps = {
  filter: null,
};
export default Form.create()(
  Connect(AlertsFilters, {
    alertSchema: 'alerts.schema.properties',
    filter: 'alerts.filter',
  })
);
