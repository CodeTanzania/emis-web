import {
  clearAgencyFilters,
  Connect,
  filterAgencies,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * @class
 * @name AgenciesFilters
 * @description Filter modal component for filtering agencies
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AgenciesFilters extends Component {
  static propTypes = {
    filter: PropTypes.objectOf(
      PropTypes.shape({
        groups: PropTypes.arrayOf(PropTypes.string),
        phases: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    filter: null,
  };

  /**
   * @function
   * @name handleSubmit
   * @description Handle filter action
   *
   * @param {Object} event onSubmit event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = event => {
    event.preventDefault();
    const {
      form: { validateFields },
      onCancel,
    } = this.props;

    validateFields((error, values) => {
      if (!error) {
        filterAgencies(values);
        onCancel();
      }
    });
  };

  /**
   * @function
   * @name handleClearFilter
   * @description Action handle when clear
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleClearFilter = () => {
    const { onCancel } = this.props;
    clearAgencyFilters();
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      groups,
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
        {/* start agency type filters */}
        <Form.Item {...formItemLayout} label="By Agency Group">
          {getFieldDecorator('group', {
            initialValue: filter ? filter.type : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {groups.map(type => (
                  <Col span={8} style={{ margin: '10px 0' }} key={type}>
                    <Checkbox value={type}>{type}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end agency type filters */}

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

export default Connect(Form.create()(AgenciesFilters), {
  groups: 'agencies.schema.properties.group.enum',
  filter: 'agencies.filter',
});
