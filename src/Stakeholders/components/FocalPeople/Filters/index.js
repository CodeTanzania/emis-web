import {
  clearFocalPersonFilters,
  Connect,
  filterFocalPeople,
} from '@codetanzania/emis-api-states';
import { httpActions } from '@codetanzania/emis-api-client';
import { Button, Form } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';

/* declarations */
const { getPartyGroups, getJurisdictions, getRoles, getAgencies } = httpActions;

/**
 * @class
 * @name FocalPeopleFilters
 * @description Filter modal component for filtering contacts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class FocalPeopleFilters extends Component {
  static propTypes = {
    filter: PropTypes.objectOf(
      PropTypes.shape({
        groups: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func,
      validateFields: PropTypes.func,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    cached: PropTypes.shape({
      groups: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
      locations: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
      roles: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
      agencies: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    }),
    onCache: PropTypes.func.isRequired,
    onClearCache: PropTypes.func.isRequired,
  };

  static defaultProps = {
    filter: null,
    cached: null,
  };

  /**
   * @function
   * @name handleSubmit
   * @description Handle filter action
   *
   * @param {object} event onSubmit event object
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = event => {
    event.preventDefault();
    const {
      form: { validateFields },
      onCancel,
    } = this.props;

    validateFields((error, values) => {
      if (!error) {
        filterFocalPeople(values);
        onCancel();
      }
    });
  };

  /**
   * @function
   * @name handleClearFilter
   * @description Action handle when clear
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleClearFilter = () => {
    const { onCancel, onClearCache } = this.props;
    clearFocalPersonFilters();

    onClearCache();
    onCancel();
  };

  /**
   * @function
   * @name cacheFilters
   * @description cache lazy loaded value from filters
   *
   * @param {object} values Object with key value of what is to be cached
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  cacheFilters = values => {
    const { onCache } = this.props;
    onCache(values);
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      filter,
      cached,
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
        {/* start contact group filters */}
        <Form.Item {...formItemLayout} label="By Area(s)">
          {getFieldDecorator('location', {
            initialValue: filter ? filter.location : [],
          })(
            <SearchableSelectInput
              onSearch={getJurisdictions}
              optionLabel="name"
              optionValue="_id"
              mode="multiple"
              onCache={locations => this.cacheFilters({ locations })}
              initialValue={cached && cached.locations ? cached.locations : []}
            />
          )}
        </Form.Item>
        {/* end contact group filters */}

        {/* start contact group filters */}
        <Form.Item {...formItemLayout} label="By Group(s)">
          {getFieldDecorator('group', {
            initialValue: filter ? filter.group : [],
          })(
            <SearchableSelectInput
              onSearch={getPartyGroups}
              optionLabel="name"
              optionValue="_id"
              mode="multiple"
              onCache={groups => this.cacheFilters({ groups })}
              initialValue={cached && cached.groups ? cached.groups : []}
            />
          )}
        </Form.Item>
        {/* end contact group filters */}

        {/* start contact group filters */}
        <Form.Item {...formItemLayout} label="By Role(s)">
          {getFieldDecorator('role', {
            initialValue: filter ? filter.role : [],
          })(
            <SearchableSelectInput
              onSearch={getRoles}
              optionLabel="name"
              optionValue="_id"
              mode="multiple"
              onCache={roles => this.cacheFilters({ roles })}
              initialValue={cached && cached.roles ? cached.roles : []}
            />
          )}
        </Form.Item>
        {/* end contact group filters */}

        {/* start contact group filters */}
        <Form.Item {...formItemLayout} label="By Agencies">
          {getFieldDecorator('party', {
            initialValue: filter ? filter.party : [],
          })(
            <SearchableSelectInput
              onSearch={getAgencies}
              optionLabel="name"
              optionValue="_id"
              mode="multiple"
              onCache={agencies => this.cacheFilters({ agencies })}
              initialValue={cached && cached.agencies ? cached.agencies : []}
            />
          )}
        </Form.Item>
        {/* end contact group filters */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleClearFilter}>
            Clear
          </Button>
          <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
            Filter
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

export default Connect(Form.create()(FocalPeopleFilters), {
  filter: 'focalPeople.filter',
});
