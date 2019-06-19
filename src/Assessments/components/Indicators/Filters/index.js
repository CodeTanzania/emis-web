import {
  clearIndicatorFilters,
  Connect,
  filterIndicators,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * @class
 * @name IndicatorsFilters
 * @description Filter modal component for filtering indicators
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class IndicatorsFilters extends Component {
  static propTypes = {
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
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
        filterIndicators(values);
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
    clearIndicatorFilters();
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      subjects,
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
        {/* start subject filters */}
        <Form.Item {...formItemLayout} label="By Subject">
          {getFieldDecorator('subject', {
            initialValue: filter ? filter.subject : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {subjects.map(subject => (
                  <Col span={8} style={{ margin: '10px 0' }} key={subject}>
                    <Checkbox value={subject}>{subject}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end subject filters */}

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
export default Connect(Form.create()(IndicatorsFilters), {
  subjects: 'indicators.schema.properties.subject.enum',
  filter: 'indicators.filter',
});
