import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const actions = ['Addition', 'Deduction'];
const reasons = [
  'Consumed',
  'Cycle Count',
  'Disposed',
  'Demaged',
  'Expired',
  'Purchased',
  'Sold',
  'Transfered',
  'Unknown',
];

/**
 * Filter modal component for filtering adjustments
 *
 * @class
 * @name AdjustmentsFilters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdjustmentsFilters extends Component {
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
        {/* start adjustment actions filters */}
        <Form.Item {...formItemLayout} label="By Adjustment actions">
          {getFieldDecorator('actions')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {actions.map(action => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={action}>{action}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end adjustment actions filters */}

        {/* start adjustment reasons filters */}
        <Form.Item {...formItemLayout} label="By Adjustment reasons">
          {getFieldDecorator('reasons')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {reasons.map(reason => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={reason}>{reason}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end adjustment reason filters */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Filter
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
export default Form.create()(AdjustmentsFilters);
