import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const phases = ['Mitigation', 'Preparedness', 'Response', 'Recovery'];
const types = [
  'Sector',
  'Individual',
  'Committee',
  'Team',
  'Department',
  'Agency',
  'Other',
];

/**
 * Filter modal component for filtering contacts
 *
 * @class
 * @name ContactsFilters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ContactsFilters extends Component {
  static propTypes = {
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    // const {
    //   form: { validateFields },
    // } = this.props;

    // validateFields((error, values) => {
    //   const filter = {
    //     type: { $in: values.types },
    //     phases: { $in: phases.phases },
    //   };
    // });
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
        {/* start contact type filters */}
        <Form.Item {...formItemLayout} label="By Contact type">
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
        {/* end contact type filters */}

        {/* start emergency phase filters */}
        <Form.Item {...formItemLayout} label="By Emergency Phases">
          {getFieldDecorator('phases')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {phases.map(phase => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={phase}>{phase}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end emergency phase filters */}

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
export default Form.create()(ContactsFilters);
