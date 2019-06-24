import { httpActions } from '@codetanzania/emis-api-client';
import { postProcedure, putProcedure } from '@codetanzania/emis-api-states';
import { Button, Form, Input } from 'antd';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';
import { notifyError, notifySuccess } from '../../../../util';

/* constants */
const {
  getActivities,
  getItems,
  getPlans,
  getQuestionnaires,
  getRoles,
} = httpActions;
const { TextArea } = Input;

/**
 * @class
 * @name ProcedureForm
 * @description Render Procedure form for creating and updating procedure
 * details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ProcedureForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    procedure: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      abbreviation: PropTypes.string,
      mobile: PropTypes.string,
      email: PropTypes.string,
      plan: PropTypes.string,
      description: PropTypes.string,
      activity: PropTypes.string,
      primary: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
      supportive: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string })
      ),
      resources: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
      assessments: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string })
      ),
    }).isRequired,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func,
      validateFieldsAndScroll: PropTypes.func,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  /**
   * @function
   * @name handleSubmit
   * @description Handle submit form action
   *
   * @param {object} event onSubmit event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = event => {
    event.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      procedure,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedProcedure = Object.assign({}, procedure, values);
          putProcedure(
            updatedProcedure,
            () => {
              notifySuccess('Procedure was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating procedure, please try again!'
              );
            }
          );
        } else {
          postProcedure(
            values,
            () => {
              notifySuccess('Procedure was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving procedure, please try again!'
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
      procedure,
      posting,
      onCancel,
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
        {/* procedure plan select input */}
        <Form.Item label="Plan" {...formItemLayout}>
          {getFieldDecorator('plan', {
            initialValue: isEditForm
              ? procedure.plan._id // eslint-disable-line
              : undefined,
            rules: [{ required: true, message: 'Procedure Plan is Required' }],
          })(
            <SearchableSelectInput
              placeholder="Select Activity Plan ..."
              onSearch={getPlans}
              optionLabel={plan =>
                `${plan.incidentType.name} (${plan.owner.name})`
              }
              optionValue="_id"
              initialValue={isEditForm ? procedure.plan : undefined}
            />
          )}
        </Form.Item>
        {/* end procedure plan select input */}

        {/* procedure activity select input */}
        <Form.Item label="Activity" {...formItemLayout}>
          {getFieldDecorator('activity', {
            initialValue: isEditForm
              ? procedure.activity._id // eslint-disable-line
              : undefined,
            rules: [
              { required: true, message: 'Procedure Activity is Required' },
            ],
          })(
            <SearchableSelectInput
              placeholder="Select Activity Plan ..."
              onSearch={getActivities}
              optionLabel={activity => `${activity.name}`}
              optionValue="_id"
              initialValue={isEditForm ? procedure.activity : undefined}
            />
          )}
        </Form.Item>
        {/* end procedure activity select input */}

        {/* procedure name */}
        <Form.Item {...formItemLayout} label="SOP Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Procedure name is Required' }],
            initialValue: isEditForm ? procedure.name : undefined,
          })(
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              placeholder="Enter Procedure Name"
            />
          )}
        </Form.Item>
        {/* end procedure name */}

        {/* procedure description */}
        <Form.Item {...formItemLayout} label="SOP Description">
          {getFieldDecorator('description', {
            initialValue: isEditForm ? procedure.description : undefined,
          })(
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              placeholder="Enter Procedure Description"
            />
          )}
        </Form.Item>
        {/* end procedure description */}

        {/* responsible roles select input */}
        <Form.Item label="Primary Responsible Role(s)" {...formItemLayout}>
          {getFieldDecorator('primary', {
            rules: [
              {
                required: true,
                message: 'Please Select Responsible Role(s)',
              },
            ],
            initialValue: isEditForm
              ? map(procedure.primary, role => role._id) // eslint-disable-line
              : [],
          })(
            <SearchableSelectInput
              placeholder="Select Role ..."
              mode="multiple"
              onSearch={getRoles}
              optionLabel="name"
              optionValue="_id"
              initialValue={isEditForm ? procedure.primary : []}
            />
          )}
        </Form.Item>
        {/* end responsible roles select input */}

        {/* responsible roles select input */}
        <Form.Item label="Supportive Role(s)" {...formItemLayout}>
          {getFieldDecorator('supportive', {
            initialValue: isEditForm
              ? map(procedure.supportive, role => role._id) // eslint-disable-line
              : [],
          })(
            <SearchableSelectInput
              placeholder="Select Role ..."
              mode="multiple"
              onSearch={getRoles}
              optionLabel="name"
              optionValue="_id"
              initialValue={isEditForm ? procedure.supportive : []}
            />
          )}
        </Form.Item>
        {/* end responsible roles select input */}

        {/* resource select input */}
        <Form.Item label="Resources Needed" {...formItemLayout}>
          {getFieldDecorator('resources', {
            initialValue: isEditForm
              ? map(procedure.resources, item => item._id) // eslint-disable-line
              : [],
          })(
            <SearchableSelectInput
              placeholder="Select Resource items ..."
              mode="multiple"
              onSearch={getItems}
              optionLabel="name"
              optionValue="_id"
              initialValue={isEditForm ? procedure.resources : []}
            />
          )}
        </Form.Item>
        {/* end resource select input */}

        {/* Questionnaires select input */}
        <Form.Item label="Assessment(s) to be performed" {...formItemLayout}>
          {getFieldDecorator('assessments', {
            initialValue: isEditForm
              ? map(procedure.assessments, item => item._id) // eslint-disable-line
              : [],
          })(
            <SearchableSelectInput
              placeholder="Select Questionnaires ..."
              mode="multiple"
              onSearch={getQuestionnaires}
              optionLabel="title"
              optionValue="_id"
              initialValue={isEditForm ? procedure.assessments : []}
            />
          )}
        </Form.Item>
        {/* end Questionnaires select input */}

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

export default Form.create()(ProcedureForm);
