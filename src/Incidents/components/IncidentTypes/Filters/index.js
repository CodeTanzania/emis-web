import {
  clearIncidentTypeFilters,
  Connect,
  filterIncidentTypes,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 *
 * @class
 * @name IncidentTypesFilters
 * @description Filter modal component for filtering incident types
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
   * @function
   * @name handleSubmit
   * @description Handle filter action
   *
   * @param {object} event event object
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
        filterIncidentTypes(values);
        onCancel();
      }
    });
  };

  /**
   *
   * @function
   * @name handleClearFilter
   * @description Action handle when clear
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
                  <Col span={8} style={{ margin: '10px 0' }} key={family}>
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
                  <Col span={6} style={{ margin: '10px 0' }} key={nature}>
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
