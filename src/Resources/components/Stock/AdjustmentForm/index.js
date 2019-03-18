import { Connect, postAdjustment } from '@codetanzania/emis-api-states';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Radio, Input, InputNumber } from 'antd';
import SelectInput from '../../../../components/SelectInput';
import { notifyError, notifySuccess } from '../../../../util';

/* constants */
const { TextArea } = Input;

/**
 * @class
 * @name AdjustmentForm
 * @description Form which will be used to adjust stock values
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdjustmentForm extends Component {
  static propTypes = {
    reasons: PropTypes.arrayOf(PropTypes.string).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
    stock: PropTypes.shape({
      stock: PropTypes.object,
      item: PropTypes.object,
      quantity: PropTypes.number,
      _id: PropTypes.string,
    }).isRequired,
  };

  /**
   * @function
   * @name handleSubmit
   * @description Handle on submit action for adjustment form
   *
   * @param {Object} event onSubmit event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = event => {
    event.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      stock,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      /* eslint-disable */
      const adjustment = {
        ...values,
        item: stock.item._id,
        party: stock.owner._id,
        store: stock.store._id,
        stock: stock._id,
      };
      /* eslint-enable */

      if (!error) {
        postAdjustment(
          adjustment,
          () => {
            notifySuccess('Adjustment was affected successfully');
          },
          () => {
            notifyError(
              'An error occurred while adjusting stock quantity, please contact your system administrator'
            );
          }
        );
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      posting,
      reasons,
      types,
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
        {/* adjustment type */}
        <Form.Item {...formItemLayout} label="Adjustment Action">
          {getFieldDecorator('type', {
            rules: [
              { required: true, message: 'Adjustment actions is required' },
            ],
          })(
            <Radio.Group>
              {types.map(type => (
                <Radio value={type} key={type}>
                  {type}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </Form.Item>
        {/* end adjustment type */}

        {/* adjustment reason */}
        <Form.Item {...formItemLayout} label="Adjustment Reason">
          {getFieldDecorator('reason', {
            rules: [
              {
                required: true,
                message: 'Reason for adjustment is required',
              },
            ],
          })(<SelectInput options={reasons} />)}
        </Form.Item>
        {/* end adjustment reason */}

        {/* adjustment quantity */}
        <Form.Item {...formItemLayout} label="Quantity">
          {getFieldDecorator('quantity', { initialValue: 0 })(
            <InputNumber min={0} style={{ width: '100%' }} />
          )}
        </Form.Item>
        {/* end adjustment quantity */}

        {/* adjustment cost */}
        <Form.Item {...formItemLayout} label="Cost">
          {getFieldDecorator('cost', {
            initialValue: 0,
            rules: [
              {
                required: true,
                message: 'Cost related to adjustment is required',
              },
            ],
          })(<InputNumber min={0} style={{ width: '100%' }} />)}
        </Form.Item>
        {/* end adjustment cost */}

        {/* adjustment remarks */}
        <Form.Item {...formItemLayout} label="Adjustment Remarks">
          {getFieldDecorator('remarks', {
            rules: [
              {
                required: true,
                message: 'Adjustments remarks/comments are required',
              },
            ],
          })(<TextArea autosize={{ minRows: 1, maxRows: 10 }} />)}
        </Form.Item>
        {/* end adjustment remarks */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            style={{ marginLeft: 8 }}
            type="primary"
            htmlType="submit"
            loading={posting}
          >
            Save
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

export default Connect(Form.create()(AdjustmentForm), {
  reasons: 'adjustments.schema.properties.reason.enum',
  types: 'adjustments.schema.properties.type.enum',
  stock: 'stocks.selected',
});
