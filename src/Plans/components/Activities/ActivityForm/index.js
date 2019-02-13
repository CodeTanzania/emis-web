import {
  getItems,
  getPlans,
  getQuestionnaires,
  getRoles,
} from '@codetanzania/emis-api-client';
import {
  Connect,
  postActivity,
  putActivity,
} from '@codetanzania/emis-api-states';
import { Button, Form, Input, Radio } from 'antd';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';
import { notifyError, notifySuccess } from '../../../../util';

const { TextArea } = Input;

/**
 * Render Activity form for creating and updating activity activity details
 *
 * @class
 * @name ActivityForm
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ActivityForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    activity: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      abbreviation: PropTypes.string,
      mobile: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
    phases: PropTypes.arrayOf(PropTypes.string).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  /**
   * Handle submit form action
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
      form: { validateFieldsAndScroll },
      activity,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedActivity = Object.assign({}, activity, values);
          putActivity(
            updatedActivity,
            () => {
              notifySuccess('Activity was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating activity, please try again!'
              );
            }
          );
        } else {
          postActivity(
            values,
            () => {
              notifySuccess('Activity was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving activity, please try again!'
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
      activity,
      phases,
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
        {/* activity plan select input */}
        <Form.Item label="Plan" {...formItemLayout}>
          {getFieldDecorator('plan', {
            initialValue: isEditForm
              ? activity.plan._id // eslint-disable-line
              : undefined,
            rules: [{ required: true, message: 'Activity Plan is Required' }],
          })(
            <SearchableSelectInput
              placeholder="Select Activity Plan ..."
              onSearch={getPlans}
              optionLabel={plan =>
                `${plan.incidentType.name} (${plan.owner.name})`
              }
              optionValue="_id"
              initialValue={isEditForm ? activity.plan : undefined}
            />
          )}
        </Form.Item>
        {/* end activity plan select input */}

        {/* activity name */}
        <Form.Item {...formItemLayout} label="Activity Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Activity Name is Required' }],
            initialValue: isEditForm ? activity.name : undefined,
          })(
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              placeholder="Enter Activity Name"
            />
          )}
        </Form.Item>
        {/* end activity name */}

        {/* activity description */}
        <Form.Item {...formItemLayout} label="Activity Description">
          {getFieldDecorator('description', {
            initialValue: isEditForm ? activity.description : undefined,
          })(
            <TextArea
              autosize={{ minRows: 3, maxRows: 6 }}
              placeholder="Enter Activity Description"
            />
          )}
        </Form.Item>
        {/* end activity description */}

        {/* activity phase */}
        <Form.Item label="Phases">
          {getFieldDecorator('phase', {
            rules: [{ required: true, message: 'Activity Phase is Required' }],
            initialValue: isEditForm ? activity.phase : undefined,
          })(
            <Radio.Group>
              {phases.map(phase => (
                <Radio key={phase} value={phase}>
                  {phase}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </Form.Item>
        {/* end activity phase */}

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
              ? map(activity.primary, role => role._id) // eslint-disable-line
              : [],
          })(
            <SearchableSelectInput
              placeholder="Select Role ..."
              mode="multiple"
              onSearch={getRoles}
              optionLabel="name"
              optionValue="_id"
              initialValue={isEditForm ? activity.primary : []}
            />
          )}
        </Form.Item>
        {/* end responsible roles select input */}

        {/* responsible roles select input */}
        <Form.Item label="Supportive Role(s)" {...formItemLayout}>
          {getFieldDecorator('supportive', {
            initialValue: isEditForm
              ? map(activity.supportive, role => role._id) // eslint-disable-line
              : [],
          })(
            <SearchableSelectInput
              placeholder="Select Role ..."
              mode="multiple"
              onSearch={getRoles}
              optionLabel="name"
              optionValue="_id"
              initialValue={isEditForm ? activity.supportive : []}
            />
          )}
        </Form.Item>
        {/* end responsible roles select input */}

        {/* resource select input */}
        <Form.Item label="Resources Needed" {...formItemLayout}>
          {getFieldDecorator('resources', {
            initialValue: isEditForm
              ? map(activity.resources, item => item._id) // eslint-disable-line
              : [],
          })(
            <SearchableSelectInput
              placeholder="Select Resources Needed ..."
              mode="multiple"
              onSearch={getItems}
              optionLabel="name"
              optionValue="_id"
              initialValue={isEditForm ? activity.resources : []}
            />
          )}
        </Form.Item>
        {/* end resource select input */}

        {/* assessment select input */}
        <Form.Item label="Assessment(s) to be performed" {...formItemLayout}>
          {getFieldDecorator('assessments', {
            initialValue: isEditForm
              ? map(activity.assessments, item => item._id) // eslint-disable-line
              : [],
          })(
            <SearchableSelectInput
              placeholder="Select Questionnaires ..."
              mode="multiple"
              onSearch={getQuestionnaires}
              optionLabel="title"
              optionValue="_id"
              initialValue={isEditForm ? activity.assessments : []}
            />
          )}
        </Form.Item>
        {/* end assessment select input */}

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

export default Connect(Form.create()(ActivityForm), {
  phases: 'activities.schema.properties.phase.enum',
});
