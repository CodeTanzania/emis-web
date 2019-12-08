import {
  clearQuestionnaireFilters,
  Connect,
  filterQuestionnaires,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 *
 * @class
 * @name QuestionnairesFilters
 * @description Filter modal component for filtering questionnaires
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class QuestionnairesFilters extends Component {
  /**
   * @function
   * @name handleSubmit
   * @description Handle filter action
   *
   * @param {object} e event object
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
        filterQuestionnaires(values);
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
    clearQuestionnaireFilters();
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
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...formItemLayout} label="By Assessment">
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
          <Button onClick={this.handleClearFilter} style={{ marginLeft: 8 }}>
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

QuestionnairesFilters.propTypes = {
  filter: PropTypes.objectOf(
    PropTypes.shape({
      assess: PropTypes.arrayOf(PropTypes.string).isRequired,
      phases: PropTypes.arrayOf(PropTypes.string).isRequired,
      stages: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  assess: PropTypes.arrayOf(PropTypes.string).isRequired,
  phases: PropTypes.arrayOf(PropTypes.string).isRequired,
  stages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

QuestionnairesFilters.defaultProps = {
  filter: null,
};

export default Connect(Form.create()(QuestionnairesFilters), {
  assess: 'questionnaires.schema.properties.assess.enum',
  phases: 'questionnaires.schema.properties.phase.enum',
  stages: 'questionnaires.schema.properties.stage.enum',
  filter: 'questionnaires.filter',
});
