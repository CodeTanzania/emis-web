import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const categories = [
  'Aerialway',
  'Aeroway',
  'Amenity',
  'Barrier',
  'Boundary',
  'Building',
  'Craft',
  'Emergency',
  'Geological',
  'Highway',
  'Historic',
  'Landuse',
  'Leisure',
  'Man made',
  'Military',
  'Natural',
  'Office',
  'Other',
  'Place',
  'Power',
  'Public',
  'Railway',
  'Route',
  'Shop',
  'Sport',
  'Telecom',
  'Tourism',
  'Transport',
  'Waterway',
];
const types = [
  'Access Control',
  'Accommodation',
  'Administrative',
  'Arts',
  'Assembly Point',
  'Civic',
  'Commercial',
  'Culture',
  'Education',
  'Entertainment',
  'Facilities',
  'Financial',
  'Firefighters',
  'Healthcare',
  'Landform',
  'Life cycle',
  'Lifeguards',
  'Linear Barriers',
  'Link Roads',
  'Medical Rescue',
  'Other',
  'Paths',
  'Religious',
  'Roads',
  'Stations',
  'Stops',
  'Sustenance',
  'Tracks',
  'Transportation',
  'Vegetation',
  'Warehouse',
  'Water',
  'Watercourses',
  'Waterways',
];
const levels = [
  'zone',
  'region',
  'district',
  'division',
  'ward',
  'village',
  'shina',
  'other',
];

/**
 *
 * @class
 * @name RolesFilters
 * @description Filter modal component for filtering administrative boundaries
 *
 * @param {object} e event object
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdministrativeBoundariesFilters extends Component {
  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
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
        {/* start administrative boundaries categories filters */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...formItemLayout} label="By Categories">
          {getFieldDecorator('types')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {categories.map(category => (
                  <Col span={6} style={{ margin: '10px 0' }} key={category}>
                    <Checkbox value={category}>{category}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end administrative Boundaries categories filters */}

        {/* start administrative Boundaries levels filters */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...formItemLayout} label="By Levels">
          {getFieldDecorator('types')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {levels.map(level => (
                  <Col span={6} style={{ margin: '10px 0' }} key={level}>
                    <Checkbox value={level}>{level}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end administrative boundaries levels filters */}

        {/* start administrative boundaries types filters */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...formItemLayout} label="By Types">
          {getFieldDecorator('types')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {types.map(type => (
                  <Col span={6} style={{ margin: '10px 0' }} key={type}>
                    <Checkbox value={type}>{type}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end administrative boundaries types filters */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Filter
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => {}}>
            Clear
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

AdministrativeBoundariesFilters.propTypes = {
  form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Form.create()(AdministrativeBoundariesFilters);
