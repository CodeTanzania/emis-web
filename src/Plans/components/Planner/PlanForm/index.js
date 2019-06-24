import { httpActions } from '@codetanzania/emis-api-client';
import { postPlan, putPlan } from '@codetanzania/emis-api-states';
import { Button, Form } from 'antd';
import upperFirst from 'lodash/upperFirst';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';
import { notifyError, notifySuccess } from '../../../../util';

/* constants */
const { getFeatures, getIncidentTypes, getFocalPeople } = httpActions;

/**
 * @class
 * @name PlanForm
 * @description Render Plan form for creating and updating plan plan details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class PlanForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    plan: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      abbreviation: PropTypes.string,
      mobile: PropTypes.string,
      email: PropTypes.string,
      incidentType: PropTypes.string,
      owner: PropTypes.string,
      boundary: PropTypes.string,
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
      plan,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedPlan = Object.assign({}, plan, values);
          putPlan(
            updatedPlan,
            () => {
              notifySuccess('Plan was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating plan, please try again!'
              );
            }
          );
        } else {
          postPlan(
            values,
            () => {
              notifySuccess('Plan was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving plan, please try again!'
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
      plan,
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
        {/* plan incident type */}
        <Form.Item label="Incident Type" {...formItemLayout}>
          {getFieldDecorator('incidentType', {
            rules: [
              {
                required: true,
                message: 'Please Select Plan Incident Type',
              },
            ],
            initialValue: isEditForm ? plan.incidentType._id : undefined, //eslint-disable-line
          })(
            <SearchableSelectInput
              placeholder="Select Incident Type ..."
              onSearch={getIncidentTypes}
              optionLabel="name"
              optionValue="_id"
              initialValue={isEditForm ? plan.incidentType : undefined}
            />
          )}
        </Form.Item>
        {/* end plan incident type */}

        {/* plan owner */}
        <Form.Item label="Owner" {...formItemLayout}>
          {getFieldDecorator('owner', {
            rules: [
              {
                required: true,
                message: 'Please Select the Plan Owner',
              },
            ],
            initialValue: isEditForm ? plan.owner._id : undefined, //eslint-disable-line
          })(
            <SearchableSelectInput
              placeholder="Select Plan Owner ..."
              onSearch={getFocalPeople}
              optionLabel="name"
              optionValue="_id"
              initialValue={isEditForm ? plan.owner : undefined}
            />
          )}
        </Form.Item>
        {/* end plan owner */}

        {/* plan boundary input */}
        <Form.Item label="Plan Applicable Area" {...formItemLayout}>
          {getFieldDecorator('boundary', {
            rules: [
              {
                required: true,
                message: 'Please Select the Plan Applicable Area',
              },
            ],
            initialValue: isEditForm ? plan.boundary._id : undefined, // eslint-disable-line
          })(
            <SearchableSelectInput
              placeholder="Select Plan Boundary ..."
              onSearch={getFeatures}
              optionValue="_id"
              optionLabel={feature =>
                `${feature.name} (${upperFirst(feature.type)})`
              }
              initialValue={isEditForm ? plan.boundary : undefined}
            />
          )}
        </Form.Item>
        {/* end plan boundary input */}

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

export default Form.create()(PlanForm);
