import { httpActions } from '@codetanzania/emis-api-client';
import { Button, Form, Input } from 'antd';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';

/* constants */
const { TextArea } = Input;
const { getFocalPeople } = httpActions;

/**
 * @class
 * @name NotificationForm
 * @description Render Agencies notification form component
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class NotificationForm extends Component {
  static propTypes = {
    selectedAgencies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        abbreviation: PropTypes.string,
        mobile: PropTypes.string,
        email: PropTypes.string,
      })
    ).isRequired,
    body: PropTypes.string,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func,
      validateFieldsAndScroll: PropTypes.func,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    body: undefined,
  };

  /**
   * @function
   * @name handleSubmit
   * @description Callback to handle form on submit event
   *
   * @param {object} event onSubmit event
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = event => {
    event.preventDefault();

    const {
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const notification = {
          to: {
            _id: {
              $in: values.recipients,
            },
          },
          subject: values.subject,
          body: values.body,
        };

        console.log(notification);
      }
    });
  };

  render() {
    const {
      onCancel,
      form: { getFieldDecorator },
      selectedAgencies,
      body,
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
        {/* notification recipients */}
        <Form.Item {...formItemLayout} label="Recipients">
          {getFieldDecorator('recipients', {
            rules: [
              {
                required: true,
                message: 'Please provide at least one recipient',
              },
            ],
            initialValue: map(selectedAgencies, contact => contact._id), // eslint-disable-line
          })(
            <SearchableSelectInput
              placeholder="Enter notification recipients"
              onSearch={getFocalPeople}
              optionLabel="name"
              optionValue="_id"
              mode="multiple"
              initialValue={selectedAgencies}
            />
          )}
        </Form.Item>
        {/* end notification recipients */}

        {/* notification subject */}
        <Form.Item {...formItemLayout} label="Subject">
          {getFieldDecorator('subject', {
            rules: [{ required: true, message: 'Agency subject is required' }],
          })(<Input placeholder="Applicable for Email notification only" />)}
        </Form.Item>
        {/* notification subject */}

        {/* notification body */}
        <Form.Item {...formItemLayout} label="Message">
          {getFieldDecorator('body', {
            rules: [
              {
                required: true,
                message: 'Please provide notification message',
              },
            ],
            initialValue: body,
          })(
            <TextArea
              autosize={{ minRows: 6, maxRows: 10 }}
              placeholder="Write notification message here ..."
            />
          )}
        </Form.Item>
        {/* end notification body */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

export default Form.create()(NotificationForm);
