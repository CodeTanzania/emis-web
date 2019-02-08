import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Connect,
  clearIncidentTypeFilters,
  filterIncidentTypes,
} from '@codetanzania/emis-api-states';
/**
 * Filter modal component for filtering incident types
 *
 * @class
 * @name IncidentTypesFilters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class IncidentTypesFilters extends Component {
  static propTypes = {
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    families: PropTypes.arrayOf(PropTypes.string).isRequired,
    natures: PropTypes.arrayOf(PropTypes.string).isRequired,
    filter: PropTypes.objectOf(
      PropTypes.shape({
        families: PropTypes.arrayOf(PropTypes.string).isRequired,
        natures: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ),
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
        filterIncidentTypes(values);
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
    clearIncidentTypeFilters();
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      families,
      natures,
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
        {/* start families filters */}
        <Form.Item {...formItemLayout} label="By Emergency Families">
          {getFieldDecorator('family', {
            initialValue: filter ? filter.families : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {families.map(family => (
                  <Col span={8} style={{ margin: '10px 0' }}>
                    <Checkbox value={family}>{family}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end families filters */}
        {/* start natures filters */}
        <Form.Item {...formItemLayout} label="By Nature ">
          {getFieldDecorator('nature', {
            initialValue: filter ? filter.natures : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {natures.map(nature => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={nature}>{nature}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end nature filters */}
        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleClearFilter}>
            Clear
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
            Filter
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

export default Connect(Form.create()(IncidentTypesFilters), {
  natures: 'incidentTypes.schema.properties.nature.enum',
  families: 'incidentTypes.schema.properties.family.enum',
  filter: 'incidentTypes.filter',
});
