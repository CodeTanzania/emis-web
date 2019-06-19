import { httpActions } from '@codetanzania/emis-api-client';
import {
  Connect,
  postQuestion,
  putQuestion,
} from '@codetanzania/emis-api-states';
import { Button, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';
import { notifyError, notifySuccess } from '../../../../util';

/* constants */
const { getIndicators } = httpActions;
const { Option } = Select;

/**
 *
 * @class
 * @name QuestionsForm
 * @description Question form component for creating/editing questions
 *
 * @version 0.1.0
 * @since 0.1.0
 */

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
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
    assess: PropTypes.arrayOf(PropTypes.string).isRequired,
    phases: PropTypes.arrayOf(PropTypes.string).isRequired,
    stages: PropTypes.arrayOf(PropTypes.string).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    question: null,
  };

  /**
   * @function
   * @name handleSubmit
   * @description Handle create/edit action
   *
   * @param {object} e event object
   * @version 0.1.0
   * @since 0.1.0
   */
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
          const updatedQuestion = Object.assign({}, question, values);
          putQuestion(
            updatedQuestion,
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
      assess,
      phases,
      stages,
      types,
      form: { getFieldDecorator },
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
            initialValue: isEditForm ? question.indicator._id : undefined, // eslint-disable-line
            rules: [{ required: true, message: 'Indicator is required' }],
          })(
            <SearchableSelectInput
              placeholder="e.g Water and Food"
              onSearch={getIndicators}
              optionLabel="subject"
              optionValue="_id"
              initialValue={isEditForm ? question.indicator : undefined}
            />
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
              {assess.map(data => (
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
              {types.map(type => (
                <Option key={type} value={type}>
                  {type}
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

export default Connect(Form.create()(QuestionForm), {
  assess: 'questions.schema.properties.assess.enum',
  phases: 'questions.schema.properties.phase.enum',
  stages: 'questions.schema.properties.stage.enum',
  types: 'questions.schema.properties.type.enum',
});
