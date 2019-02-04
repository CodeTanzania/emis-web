import { Button, Checkbox, Col, Form, Row } from 'antd';
import {
  Connect,
  filterItems,
  clearItemFilters,
} from '@codetanzania/emis-api-states';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Filter modal component for filtering items
 *
 * @class
 * @name ItemsFilters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemsFilters extends Component {
  static propTypes = {
    filter: PropTypes.objectOf(
      PropTypes.shape({
        types: PropTypes.arrayOf(PropTypes.string),
        uoms: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    uoms: PropTypes.arrayOf(PropTypes.string).isRequired,
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
        filterItems(values);
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
    clearItemFilters();
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      types,
      uoms,
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
      <Form
        onSubmit={this.handleSubmit}
        layout={formItemLayout}
        autoComplete="off"
      >
        {/* start type filters */}
        <Form.Item {...formItemLayout} label="By Types">
          {getFieldDecorator('type', {
            initialValue: filter ? filter.type : [],
          })(
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
        {/* end type filters */}

        {/* start unit of measure filters */}
        <Form.Item {...formItemLayout} label="By Unit of Measurement">
          {getFieldDecorator('uom', {
            initialValue: filter ? filter.uom : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {uoms.map(uom => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={uom}>{uom}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end uom filters */}

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
export default Connect(Form.create()(ItemsFilters), {
  types: 'items.schema.properties.type.enum',
  uoms: 'items.schema.properties.uom.enum',
  filter: 'items.filter',
});
