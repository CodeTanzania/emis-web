import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import {
  clearFeatureFilters,
  Connect,
  filterFeatures,
} from '@codetanzania/emis-api-states';
import React, { Component } from 'react';

/**
 * Filter modal component for filtering Wards
 *
 * @class
 * @name WardsFilters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class WardsFilters extends Component {
  static propTypes = {
    filter: PropTypes.objectOf(
      PropTypes.shape({
        types: PropTypes.arrayOf(PropTypes.string),
        natures: PropTypes.arrayOf(PropTypes.string),
        families: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    natures: PropTypes.arrayOf(PropTypes.string).isRequired,
    families: PropTypes.arrayOf(PropTypes.string).isRequired,
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
        filterFeatures(values);
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
    clearFeatureFilters();
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      types,
      natures,
      families,
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
        {/* start nature filters */}
        <Form.Item {...formItemLayout} label="By Region nature">
          {getFieldDecorator('nature', {
            initialValue: filter ? filter.nature : [],
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

        {/* start type filters */}
        <Form.Item {...formItemLayout} label="By Region type">
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

        {/* start family filters */}
        <Form.Item {...formItemLayout} label="By Family">
          {getFieldDecorator('family', {
            initialValue: filter ? filter.family : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {families.map(family => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={family}>{family}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end family filters */}

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
export default Connect(Form.create()(WardsFilters), {
  natures: 'features.schema.properties.nature.enum',
  families: 'features.schema.properties.family.enum',
  types: 'features.schema.properties.type.enum',
  filter: 'features.filter',
});
