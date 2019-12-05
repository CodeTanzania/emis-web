import {
  Connect,
  getIndicators,
  openIndicatorForm,
  closeIndicatorForm,
  selectIndicator,
} from '@codetanzania/emis-api-states';
import { Input, Col, Row, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IndicatorsActionBar from './ActionBar';
import IndicatorsList from './List';
import IndicatorsFilters from './Filters';
import IndicatorForm from './Form';
import './styles.css';

const { Search } = Input;

/**
 * @class
 * @name Indicators
 * @description Render indicator list which have search box and actions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Indicators extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
    isEditForm: false,
  };

  componentDidMount() {
    getIndicators();
  }

  /**
   *
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property to false via state
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
   *
   * @function
   * @name closeFiltersModal
   * @description Close filters modal by setting it's visible property to false via state
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  /**
   *
   * @function
   * @name openForm
   * @description Open indicator form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openForm = () => {
    openIndicatorForm();
  };

  /**
   *
   * @function closeForm
   * @name closeForm
   * @description close indicator form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeForm = () => {
    closeIndicatorForm();
    this.setState({ isEditForm: false });
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  /**
   *
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} indicator indicator object
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = indicator => {
    selectIndicator(indicator);
    this.setState({ isEditForm: true });
    openIndicatorForm();
  };

  render() {
    const {
      indicators,
      loading,
      total,
      page,
      indicator,
      showForm,
      posting,
    } = this.props;
    const { showFilters, isEditForm } = this.state;

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
              onClick={this.openForm}
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
        <IndicatorsList
          indicators={indicators}
          loading={loading}
          onEdit={this.handleEdit}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Indicators"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <IndicatorsFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end of filter modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Indicator' : 'Add New Indicator'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <IndicatorForm
            posting={posting}
            isEditForm={isEditForm}
            onCancel={this.closeForm}
            indicator={indicator}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

Indicators.propTypes = {
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
  indicator: PropTypes.shape({ subject: PropTypes.string }),
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  posting: PropTypes.bool.isRequired,
  showForm: PropTypes.bool.isRequired,
};

Indicators.defaultProps = {
  indicator: null,
};

export default Connect(Indicators, {
  indicators: 'indicators.list',
  indicator: 'indicators.selected',
  loading: 'indicators.loading',
  page: 'indicators.page',
  total: 'indicators.total',
  posting: 'indicators.posting',
  showForm: 'indicators.showForm',
});
