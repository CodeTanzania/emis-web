import { Select, Spin } from 'antd';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import filter from 'lodash/filter';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* local constants */
const { Option } = Select;

/**
 * @class
 * @name SearchableSelectInput
 * @description Searchable select input
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class SearchableSelectInput extends Component {
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
    const { onChange, onCache } = this.props;
    const { data } = this.state;
    this.setState({
      value,
    });

    if (isFunction(onCache)) {
      const state = filter(data, entry => value.includes(entry._id)); // eslint-disable-line
      onCache(state);
    }

    onChange(value);
  };

  /**
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
   * @function
   * @name getOptionProp
   * @description Extract Option property based on provided prop
   *
   * @param {string|Function} prop The property name or value return from
   * a provided function
   * @param {object} option A single data item for select options
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
          // eslint-disable-next-line react/jsx-props-no-spreading
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
        // eslint-disable-next-line react/jsx-props-no-spreading
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

SearchableSelectInput.propTypes = {
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
  onCache: PropTypes.func,
};

SearchableSelectInput.defaultProps = {
  onChange: null,
  value: undefined,
  initialValue: undefined,
  isFilter: false,
  onCache: null,
};

export default SearchableSelectInput;
