import {
  clearQuestionFilters,
  Connect,
  filterQuestions,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 *
 * @class
 * @name QuestionsFilters
 * @description Filter modal component for filtering questions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class QuestionsFilters extends Component {
  static propTypes = {
    filter: PropTypes.objectOf(
      PropTypes.shape({
        assess: PropTypes.arrayOf(PropTypes.string).isRequired,
        phases: PropTypes.arrayOf(PropTypes.string).isRequired,
        stages: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    assess: PropTypes.arrayOf(PropTypes.string).isRequired,
    phases: PropTypes.arrayOf(PropTypes.string).isRequired,
    stages: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    filter: null,
  };

  /**
   *
   * @function
   * @name handleSubmit
   * @description Handle filter action
   *
   * @param {Object} e event object
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
        filterQuestions(values);
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
    clearQuestionFilters();
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      assess,
      stages,
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
        {/* start stage filters */}
        <Form.Item {...formItemLayout} label="By Stage ">
          {getFieldDecorator('stage', {
            initialValue: filter ? filter.stage : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {stages.map(stage => (
                  <Col span={6} style={{ margin: '10px 0' }} key={stage}>
                    <Checkbox value={stage}>{stage}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end stages filters */}

        {/* start emergency phase filters */}
        <Form.Item {...formItemLayout} label="By Emergency Phases">
          {getFieldDecorator('phase', {
            initialValue: filter ? filter.phase : [],
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

        {/* start assess filters */}
        <Form.Item {...formItemLayout} label="By Assessed">
          {getFieldDecorator('assess', {
            initialValue: filter ? filter.assess : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {assess.map(data => (
                  <Col span={6} style={{ margin: '10px 0' }} key={data}>
                    <Checkbox value={data}>{data}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end assess filters */}

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

export default Connect(Form.create()(QuestionsFilters), {
  assess: 'questions.schema.properties.assess.enum',
  phases: 'questions.schema.properties.phase.enum',
  stages: 'questions.schema.properties.stage.enum',
  filter: 'questions.filter',
});
