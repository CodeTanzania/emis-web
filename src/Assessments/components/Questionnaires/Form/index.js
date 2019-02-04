import {
  Connect,
  putQuestionnaire,
  postQuestionnaire,
} from '@codetanzania/emis-api-states';
import { Button, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';

const { Option } = Select;
const { TextArea } = Input;

/**
 * Questionnaire form component for creating/editing questionnaires
 *
 * @class
 * @name QuestionnairesForm
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class QuestionnaireForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    questionnaire: PropTypes.shape({
      title: PropTypes.string,
      stage: PropTypes.string,
      assess: PropTypes.string,
      phase: PropTypes.string,
    }),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
    assess: PropTypes.arrayOf(PropTypes.string).isRequired,
    phases: PropTypes.arrayOf(PropTypes.string).isRequired,
    stages: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    questionnaire: null,
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      questionnaire,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedQuestionnaire = Object.assign({}, questionnaire, values);
          putQuestionnaire(
            updatedQuestionnaire,
            () => {
              notifySuccess('Questionnaire was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating Questionnaire, please try again!'
              );
            }
          );
        } else {
          postQuestionnaire(
            values,
            () => {
              notifySuccess('Questionnaire was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving Questionnaire, please try again!'
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
      questionnaire,
      posting,
      onCancel,
      phases,
      assess,
      stages,
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
        {/* title */}
        <Form.Item {...formItemLayout} label="Title">
          {getFieldDecorator('title', {
            initialValue: isEditForm ? questionnaire.title : undefined,
            rules: [{ required: true, message: 'Title is required' }],
          })(<Input placeholder="e.g Flood Situtation Analysis" />)}
        </Form.Item>
        {/* end title */}

        {/* phase */}
        <Form.Item {...formItemLayout} label="Emergency Phase">
          {getFieldDecorator('phase', {
            initialValue: isEditForm ? questionnaire.phase : undefined,
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
            initialValue: isEditForm ? questionnaire.assess : undefined,
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

        {/* stage */}
        <Form.Item {...formItemLayout} label="Stage">
          {getFieldDecorator('stage', {
            initialValue: isEditForm ? questionnaire.stage : undefined,
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

        {/* description */}
        <Form.Item {...formItemLayout} label="Questionnaire Summary">
          {getFieldDecorator('description', {
            initialValue: isEditForm ? questionnaire.description : undefined,
            rules: [{ required: true, message: 'Description is required' }],
          })(
            <TextArea
              placeholder="e.g Summariesed infomation on Questionnaire"
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          )}
        </Form.Item>
        {/* end description */}

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

export default Connect(Form.create()(QuestionnaireForm), {
  assess: 'questionnaires.schema.properties.assess.enum',
  phases: 'questionnaires.schema.properties.phase.enum',
  stages: 'questionnaires.schema.properties.stage.enum',
});
