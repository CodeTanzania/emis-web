import {
  clearAgencyFilters,
  Connect,
  filterAgencies,
} from '@codetanzania/emis-api-states';
import { httpActions } from '@codetanzania/emis-api-client';
import { Button, Form } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';

/* declarations */
const { getPartyGroups } = httpActions;

/**
 * @class
 * @name AgenciesFilters
 * @description Filter modal component for filtering agencies
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AgenciesFilters extends Component {
  /**
   * @function
   * @name handleSubmit
   * @description Handle filter action
   *
   * @param {object} event onSubmit event object
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
        filterAgencies(values);
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
    clearAgencyFilters();

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
        {/* start agency group filters */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
        {/* end agency group filters */}

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

AgenciesFilters.propTypes = {
  filter: PropTypes.objectOf(
    PropTypes.shape({
      groups: PropTypes.arrayOf(PropTypes.string),
      phases: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  cached: PropTypes.shape({
    groups: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  }),
  onCache: PropTypes.func.isRequired,
  onClearCache: PropTypes.func.isRequired,
};

AgenciesFilters.defaultProps = {
  filter: null,
  cached: null,
};

export default Connect(Form.create()(AgenciesFilters), {
  filter: 'agencies.filter',
});
