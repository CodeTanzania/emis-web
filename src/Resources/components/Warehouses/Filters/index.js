import {
  clearWarehouseFilters,
  Connect,
  filterWarehouses,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * @class
 * @name WarehousesFilters
 * @description Filter modal component for filtering warehouses
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class WarehousesFilters extends Component {
  static propTypes = {
    filter: PropTypes.objectOf(
      PropTypes.shape({
        types: PropTypes.arrayOf(PropTypes.string),
        phases: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    natures: PropTypes.arrayOf(PropTypes.string).isRequired,
    families: PropTypes.arrayOf(PropTypes.string).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    filter: null,
  };

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
        filterWarehouses(values);
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
    clearWarehouseFilters();
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      filter,
      families,
      types,
      natures,
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
        {/* start warehouses nature filters */}
        <Form.Item {...formItemLayout} label="By Nature">
          {getFieldDecorator('nature', {
            initialValue: filter ? filter.nature : [],
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
        {/* end warehouse nature filters */}

        {/* start warehouses family filters */}
        <Form.Item {...formItemLayout} label="By Family">
          {getFieldDecorator('family', {
            initialValue: filter ? filter.family : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {families.map(family => (
                  <Col span={6} style={{ margin: '10px 0' }} key={family}>
                    <Checkbox value={family}>{family}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end warehouse family filters */}

        {/* start warehouses type filters */}
        <Form.Item {...formItemLayout} label="By Types">
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
        {/* end warehouse type filters */}

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
export default Form.create()(
  Connect(WarehousesFilters, {
    filter: 'warehouses.filter',
    natures: 'warehouses.schema.properties.nature.enum',
    families: 'warehouses.schema.properties.family.enum',
    types: 'warehouses.schema.properties.type.enum',
  })
);
