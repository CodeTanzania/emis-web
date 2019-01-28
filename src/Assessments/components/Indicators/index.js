import { Connect, getIndicators } from '@codetanzania/emis-api-states';
import { Input, Col, Row, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IndicatorsActionBar from './ActionBar';
import IndicatorsList from './List';
import IndicatorsFilters from './Filters';
import './styles.css';

const { Search } = Input;

/**
 * Render indicator list which have search box and actions
 *
 * @class
 * @name Indicators
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Indicators extends Component {
  state = {
    showFilters: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    indicators: PropTypes.arrayOf(
      PropTypes.shape({
        subject: PropTypes.string,
        topic: PropTypes.string,
        description: PropTypes.string,
        color: PropTypes.string,
        _id: PropTypes.string,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getIndicators();
  }

  /**
   * open filters modal by setting it's visible property to false via state
   *
   * @function
   * @name openFiltersModal
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openFiltersModal = () => {
    this.setState({ showFilters: true });
  };

  /**
   * Close filters modal by setting it's visible property to false via state
   *
   * @function
   * @name closeFiltersModal
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  render() {
    const { indicators, loading, total, page } = this.props;
    const { showFilters } = this.state;

    return (
      <div className="IndicatorList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for indicators here ..."
              onChange={({ target: { value } }) => getIndicators({ q: value })}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Indicator"
            >
              New Indicator
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <IndicatorsActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list action bar */}
        {/* list starts */}
        <IndicatorsList indicators={indicators} loading={loading} />
        {/* end list */}
        <Modal
          title="Filter Indicators"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
        >
          <IndicatorsFilters onCancel={this.closeFiltersModal} />
        </Modal>
      </div>
    );
  }
}

export default Connect(Indicators, {
  indicators: 'indicators.list',
  loading: 'indicators.loading',
  page: 'indicators.page',
  total: 'indicators.total',
});
