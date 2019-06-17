import { Button, Form, Input, Icon, Tooltip } from 'antd';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../SearchableSelectInput';

/* constants */
const { TextArea } = Input;

/**
 * @class
 * @name NotificationForm
 * @description Render notification form component
 *
 * @version 0.2.0
 * @since 0.1.0
 */
class NotificationForm extends Component {
  static propTypes = {
    recipients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        abbreviation: PropTypes.string,
        mobile: PropTypes.string,
        email: PropTypes.string,
      })
    ).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    body: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onNotify: PropTypes.func.isRequired,
    onSearchRecipients: PropTypes.func.isRequired,
    onSearchJurisdictions: PropTypes.func.isRequired,
    onSearchGroups: PropTypes.func.isRequired,
    onSearchRoles: PropTypes.func.isRequired,
    onSearchAgencies: PropTypes.func.isRequired,
  };

  static defaultProps = {
    body: undefined,
  };

  state = { moreFilters: false };

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

  /**
   * @function
   * @name toogleMoreFilters
   * @description Toggle areas, groups, agencies, roles filters visibility
   *
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  toggleMoreFilters = () => {
    this.setState(prevState => ({
      moreFilters: !prevState.moreFilters,
    }));
  };

  render() {
    const {
      form: { getFieldDecorator },
      recipients,
      body,
      onCancel,
      onSearchAgencies,
      onSearchRecipients,
      onSearchJurisdictions,
      onSearchGroups,
      onSearchRoles,
    } = this.props;

    const { moreFilters } = this.state;
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
        {/* notify recipients per jurisdictions */}
        {onSearchJurisdictions && moreFilters && (
          <Form.Item {...formItemLayout} label="Areas">
            {getFieldDecorator('feature')(
              <SearchableSelectInput
                onSearch={onSearchJurisdictions}
                optionLabel="name"
                optionValue="_id"
                mode="multiple"
              />
            )}
          </Form.Item>
        )}
        {/* end notification jurisdictions */}

        {/* notify recipients per group */}
        {onSearchGroups && moreFilters && (
          <Form.Item {...formItemLayout} label="Group(s)">
            {getFieldDecorator('groups')(
              <SearchableSelectInput
                onSearch={onSearchGroups}
                optionLabel="name"
                optionValue="_id"
                mode="multiple"
              />
            )}
          </Form.Item>
        )}
        {/* notify recipients per group */}

        {/* notify recipients per role */}
        {onSearchRoles && moreFilters && (
          <Form.Item {...formItemLayout} label="Role(s)">
            {getFieldDecorator('roles')(
              <SearchableSelectInput
                onSearch={onSearchRoles}
                optionLabel="name"
                optionValue="_id"
                mode="multiple"
                initialValue={recipients}
              />
            )}
          </Form.Item>
        )}
        {/* notify recipients per role */}

        {/* notify recipients per agency */}
        {onSearchAgencies && moreFilters && (
          <Form.Item {...formItemLayout} label="Agencies">
            {getFieldDecorator('agencies')(
              <SearchableSelectInput
                onSearch={onSearchAgencies}
                optionLabel="name"
                optionValue="_id"
                mode="multiple"
                initialValue={recipients}
              />
            )}
          </Form.Item>
        )}
        {/* notify recipients per agency */}

        {/* notification recipients */}
        {onSearchRecipients && (
          <Form.Item {...formItemLayout} label="Recipients">
            {getFieldDecorator('recipients', {
              initialValue: map(recipients, contact => contact._id), // eslint-disable-line
            })(
              <SearchableSelectInput
                onSearch={onSearchRecipients}
                optionLabel="name"
                optionValue="_id"
                mode="multiple"
                initialValue={recipients}
              />
            )}
          </Form.Item>
        )}
        {/* end notification recipients */}

        {/* notification subject */}
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Subject&nbsp;
              <Tooltip title="Applicable for Email notification only">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('subject')(<Input />)}
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
          })(<TextArea autosize={{ minRows: 6, maxRows: 10 }} />)}
        </Form.Item>
        {/* end notification body */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button type="link" onClick={this.toggleMoreFilters}>
            More Options
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>
            Cancel
          </Button>
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
