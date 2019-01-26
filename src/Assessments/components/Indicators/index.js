import { Connect, getIndicators } from '@codetanzania/emis-api-states';
import { Input, List, Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IndicatorListItem from './ListItem';
import IndicatorsActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 * Render indicator list which have search box and actions
 *
 * @class
 * @name IndicatorList
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class IndicatorList extends Component {
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

  render() {
    const { indicators, loading, total, page } = this.props;
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
        <IndicatorsActionBar total={total} page={page} />
        {/* end list action bar */}
        {/* list starts */}
        <List
          loading={loading}
          dataSource={indicators}
          renderItem={({ subject, topic, description, color, _id: id }) => (
            <IndicatorListItem
              key={id}
              subject={subject}
              topic={topic}
              description={description}
              color={color}
            />
          )}
        />
        {/* end list */}
      </div>
    );
  }
}

export default Connect(IndicatorList, {
  indicators: 'indicators.list',
  loading: 'indicators.loading',
  page: 'indicators.page',
  total: 'indicators.total',
});
