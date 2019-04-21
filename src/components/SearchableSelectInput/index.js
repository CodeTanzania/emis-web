import { Select, Spin } from 'antd';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* local constants */
const { Option } = Select;

/**
 *
 * @class
 * @name SearchableSelectInput
 * @description Searchable select input
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export default class SearchableSelectInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSearch: PropTypes.func.isRequired,
    optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      .isRequired,
    optionValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.func,
    ]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.func,
    ]),
    initialValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number,
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ]),
    isFilter: PropTypes.bool,
  };

  static defaultProps = {
    onChange: null,
    value: undefined,
    initialValue: undefined,
    isFilter: false,
  };

  constructor(props) {
    super(props);
    const { initialValue } = props;

    if (isArray(initialValue)) {
      this.state = {
        data: [...initialValue],
        loading: false,
      };
    } else if (!isEmpty(initialValue)) {
      this.state = {
        data: [initialValue],
        loading: false,
      };
    } else {
      this.state = {
        data: [],
        loading: false,
      };
    }
  }

  /**
   *
   * @function
   * @name handleSearch
   * @description Function called when searching in select box
   *
   * @param {string} value value passed to the when function called
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSearch = value => {
    const { onSearch } = this.props;
    onSearch({ q: value }).then(response => {
      this.setState({ data: response.data, loading: false });
    });
  };

  /**
   *
   * @function
   * @name handleChange
   * @description Function called when value of select box changes
   *
   * @param {string} value value passed to the when function called
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleChange = value => {
    const { onChange } = this.props;
    this.setState({
      value,
    });
    onChange(value);
  };

  /**
   *
   * @function
   * @name handleOnDropdownVisibleChange
   * @description Function called when the select box is opened
   *
   * @param {string} open open select box
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDropdownVisibleChange = open => {
    const { onSearch } = this.props;
    const { data } = this.state;

    if (open && data.length < 9) {
      this.setState({ loading: true });
      onSearch()
        .then(response => {
          this.setState({ data: [...response.data], loading: false });
        })
        .catch(() => {
          // TODO handle error here
          this.setState({ loading: false });
        });
    }
  };

  /**
   * Extract Option property based on provided prop
   *
   * @function
   * @name getOptionProp
   *
   * @param {string|Function} prop The property name or value return from
   * a provided function
   * @param {Object} option A single data item for select options
   * @returns {string} Value of the extracted property
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  getOptionProp = (prop, option) => {
    if (isFunction(prop)) {
      return prop(option);
    }
    return option[prop];
  };

  render() {
    const { data, loading, value } = this.state;
    const { optionValue, optionLabel, isFilter, ...otherProps } = this.props;

    const options = data.map(option => (
      <Option key={this.getOptionProp(optionValue, option)}>
        {this.getOptionProp(optionLabel, option)}
      </Option>
    ));

    if (isFilter) {
      return (
        <Select
          {...otherProps}
          showSearch
          mode="multiple"
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          allowClear
          value={value}
          onDropdownVisibleChange={this.handleOnDropdownVisibleChange}
          filterOption={false}
          notFoundContent={
            loading ? <Spin size="small" /> : 'Results Not Found'
          }
        >
          {options}
        </Select>
      );
    }

    return (
      <Select
        {...otherProps}
        showSearch
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        allowClear
        onDropdownVisibleChange={this.handleOnDropdownVisibleChange}
        filterOption={false}
        notFoundContent={loading ? <Spin size="small" /> : 'Results Not Found'}
      >
        {options}
      </Select>
    );
  }
}
