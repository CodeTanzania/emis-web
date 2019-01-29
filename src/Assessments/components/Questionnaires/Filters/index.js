import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const phases = ['Mitigation', 'Preparedness', 'Response', 'Recovery'];
const stages = ['Before', 'During', 'After', 'Others'];
const assess = ['Need', 'Situation', 'Others'];
/**
 * Filter modal component for filtering questionnaires
 *
 * @class
 * @name QuestionnairesFilters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class QuestionnairesFilters extends Component {
  static propTypes = {
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    // const {
    //   form: { validateFields },
    // } = this.props;

    // validateFields((error, values) => {
    //   const filter = {
    //     type: { $in: values.types },
    //     phases: { $in: phases.phases },
    //   };
    // });
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
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
      <Form onSubmit={this.handleSubmit} layout={formItemLayout}>
        {/* start stage filters */}
        <Form.Item {...formItemLayout} label="By Stages">
          {getFieldDecorator('stages')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {stages.map(stage => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={stage}>{stage}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end stage filters */}

        {/* start emergency phase filters */}
        <Form.Item {...formItemLayout} label="By Emergency Phases">
          {getFieldDecorator('phases')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {phases.map(phase => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={phase}>{phase}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end emergency phase filters */}

        {/* start assess filters */}
        <Form.Item {...formItemLayout} label="By Assess">
          {getFieldDecorator('assess')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {assess.map(type => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={type}>{type}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end assess filters */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Filter
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}
export default Form.create()(QuestionnairesFilters);
