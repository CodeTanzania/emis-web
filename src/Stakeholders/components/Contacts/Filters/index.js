import {
  clearStakeholderFilters,
  Connect,
  filterStakeholders,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
    filter: PropTypes.objectOf(
      PropTypes.shape({
        types: PropTypes.arrayOf(PropTypes.string),
        phases: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    phases: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    filter: null,
  };

  /**
   * Handle filter action
   *
   * @function
   * @name handleSubmit
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
        filterStakeholders(values);
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
    clearStakeholderFilters();
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      types,
      phases,
      filter,
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
        {/* start contact type filters */}
        <Form.Item {...formItemLayout} label="By Contact type">
          {getFieldDecorator('type', {
            initialValue: filter ? filter.type : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {types.map(type => (
                  <Col span={6} style={{ margin: '10px 0' }} key={type}>
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
          {getFieldDecorator('phases', {
            initialValue: filter ? filter.phases : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {phases.map(phase => (
                  <Col span={6} style={{ margin: '10px 0' }} key={phase}>
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

export default Connect(Form.create()(ContactsFilters), {
  types: 'stakeholders.schema.properties.type.enum',
  phases: 'stakeholders.schema.properties.phases.enum',
  filter: 'stakeholders.filter',
});
