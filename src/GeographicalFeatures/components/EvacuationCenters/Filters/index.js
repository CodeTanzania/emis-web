import {
  clearFeatureFilters,
  Connect,
  filterFeatures,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Filter modal component for filtering evacuation centers
 *
 * @class
 * @name EvacuationCentersFilters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class EvacuationCentersFilters extends Component {
  static propTypes = {
    nature: PropTypes.arrayOf(PropTypes.string).isRequired,
    filter: PropTypes.objectOf(
      PropTypes.shape({
        nature: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
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
      filter,
      nature,
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
        {/* start evacution centers nature filters */}
        <Form.Item {...formItemLayout} label="By Nature">
          {getFieldDecorator('nature', {
            initialValue: filter ? filter.nature : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {nature.map(natureItem => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={natureItem}>{natureItem}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end evacuation centers nature filters */}

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
  Connect(EvacuationCentersFilters, {
    filter: 'features.filter',
    nature: 'features.schema.properties.nature.enum',
  })
);
