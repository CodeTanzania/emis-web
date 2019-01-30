import { postQuestion, putQuestion } from '@codetanzania/emis-api-states';
import { Button, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';

const { Option } = Select;

class QuestionForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    question: PropTypes.shape({
      label: PropTypes.string,
      stage: PropTypes.string,
      type: PropTypes.string,
      assess: PropTypes.string,
      phase: PropTypes.string,
    }),
    indicators: PropTypes.arrayOf(
      PropTypes.shape({ subject: PropTypes.string })
    ).isRequired,
    questionSchema: PropTypes.shape({
      properties: PropTypes.shape({
        stage: PropTypes.shape({ type: PropTypes.string }).isRequired,
      }),
    }).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    question: null,
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      question,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedContact = Object.assign({}, question, values);
          putQuestion(
            updatedContact,
            () => {
              notifySuccess('Question was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating question, please try again!'
              );
            }
          );
        } else {
          postQuestion(
            values,
            () => {
              notifySuccess('Question was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving question, please try again!'
              );
            }
          );
        }
      }
    });
  };

  render() {
    const {
      isEditForm,
      question,
      posting,
      onCancel,
      questionSchema,
      indicators,
      form: { getFieldDecorator },
    } = this.props;

    const { properties } = questionSchema;
    const { assess, stage, phase, type } = properties;
    const { enum: assessedData } = assess;
    const { enum: stages } = stage;
    const { enum: phases } = phase;
    const { enum: types } = type;

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
      <Form onSubmit={this.handleSubmit}>
        {/* question name */}
        <Form.Item {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? question.name : undefined,
            rules: [{ required: true, message: 'Question name is required' }],
          })(<Input placeholder="e.g Water" />)}
        </Form.Item>
        {/* end name */}
        {/* label */}
        <Form.Item {...formItemLayout} label="Label">
          {getFieldDecorator('label', {
            initialValue: isEditForm ? question.label : undefined,
            rules: [{ required: true, message: 'Label is required' }],
          })(<Input placeholder="e.g Do you have water?" />)}
        </Form.Item>
        {/* end label */}
        {/* indicators */}
        <Form.Item {...formItemLayout} label="Indicator">
          {getFieldDecorator('indicator', {
            initialValue: isEditForm ? question.indicator.subject : undefined,
            rules: [{ required: true, message: 'Indicator is required' }],
          })(
            <Select placeholder="e.g Water and Food">
              {indicators.map(({ subject, _id: id }) => (
                <Option key={id} value={id}>
                  {subject}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end indicator */}

        {/* phase */}
        <Form.Item {...formItemLayout} label="Phase">
          {getFieldDecorator('phase', {
            initialValue: isEditForm ? question.phase : undefined,
            rules: [{ required: true, message: 'Phase is required' }],
          })(
            <Select placeholder="e.g Mitigation">
              {phases.map(data => (
                <Option key={data} value={data}>
                  {data}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end phase */}

        {/* assess */}
        <Form.Item {...formItemLayout} label="Assess">
          {getFieldDecorator('assess', {
            initialValue: isEditForm ? question.assess : undefined,
            rules: [{ required: true, message: 'Assess is required' }],
          })(
            <Select placeholder="e.g Need">
              {assessedData.map(data => (
                <Option key={data} value={data}>
                  {data}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end assess */}

        {/* Type */}
        <Form.Item {...formItemLayout} label="Type">
          {getFieldDecorator('type', {
            initialValue: isEditForm ? question.type : undefined,
            rules: [{ required: true, message: 'Type is required' }],
          })(
            <Select placeholder="e.g text">
              {types.map(data => (
                <Option key={data} value={data}>
                  {data}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end type */}
        {/* stage */}
        <Form.Item {...formItemLayout} label="Stage">
          {getFieldDecorator('stage', {
            initialValue: isEditForm ? question.stage : undefined,
            rules: [{ required: true, message: 'Stage is required' }],
          })(
            <Select placeholder="e.g Before">
              {stages.map(data => (
                <Option key={data} value={data}>
                  {data}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {/* end stage */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            style={{ marginLeft: 8 }}
            type="primary"
            htmlType="submit"
            loading={posting}
          >
            Save
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

export default Form.create()(QuestionForm);
