import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const natures = ['Natural', 'Technological'];
const families = [
  'Geophysical',
  'Biological',
  'Hydrological',
  'Technological',
  'Meteorological',
  'Climatological',
  'Extra-terrestrial',
];

/**
 * Filter modal component for filtering incident types
 *
 * @class
 * @name IncidentTypesFilters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class IncidentTypesFilters extends Component {
  static propTypes = {
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    // const {
    //   form: { validateFields },
    // } = this.props;

    // validateFields((error, values) => {
    //   const filter = {
    //     type: { $in: values.types },
    //     phases: { $in: phases.phases },
    //   };
    // });
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
      <Form onSubmit={this.handleSubmit} layout={formItemLayout}>
        {/* start incident type filters */}
        <Form.Item {...formItemLayout} label="By Family">
          {getFieldDecorator('families')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {families.map(family => (
                  <Col span={8} style={{ margin: '10px 0' }}>
                    <Checkbox value={family}>{family}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end Incident type filters */}

        {/* start emergency phase filters */}
        <Form.Item {...formItemLayout} label="By Nature">
          {getFieldDecorator('natures')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {natures.map(nature => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={nature}>{nature}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end emergency phase filters */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Filter
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
export default Form.create()(IncidentTypesFilters);
