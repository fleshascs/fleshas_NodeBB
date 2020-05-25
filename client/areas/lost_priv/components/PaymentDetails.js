import React, { useReducer } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
const { Option } = Select;

function reducer(state, action) {
  return { ...state, [action.field]: action.value };
}

function getBoughtOnLabel(value) {
  switch (value) {
    case 'nickname':
      return 'Nickname';
    case 'steamID':
      return 'SteamID';
    case 'ip':
      return 'IP';
  }
}
function getPaymentTypeFieldName(value) {
  switch (value) {
    case 'sms':
      return 'g_phone';
    default:
      return 'email';
  }
}
function getPaymentTypeLabel(value) {
  switch (value) {
    case 'sms':
      return 'Phone Number';
    case 'bank':
      return 'Your Email(connected with bank)';
    case 'paypal':
      return 'Your Email(connected with paypal)';
  }
}

const initialValues = {
  server: 'swarm2',
  boughtOn: 'nickname',
  paymentType: 'sms',
  g_date: moment()
};

export const PaymentDetails = (props) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const [form] = Form.useForm();
  const setValue = (field, value) => {
    dispatch({ field, value });
  };
  const onFinish = (values) => {
    props.onSubmit(values);
  };

  return (
    <Form initialValues={initialValues} form={form} onFinish={onFinish}>
      <Form.Item
        label='Purchase date'
        name='g_date'
        rules={[{ required: true, message: 'Please fill this field!' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label='How did you made a purchase'
        name='paymentType'
        rules={[{ required: true, message: 'Please fill this field!' }]}
      >
        <Select className='w-100' onChange={(v) => setValue('paymentType', v)}>
          <Option value='bank'>Bank</Option>
          <Option value='sms'>SMS</Option>
          <Option value='paypal'>Paypal</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={getPaymentTypeLabel(state.paymentType)}
        name={getPaymentTypeFieldName(state.paymentType)}
        rules={[{ required: true, message: 'Please fill this field!' }]}
      >
        <Input type={getPaymentTypeFieldName(state.paymentType) === 'email' ? 'email' : 'text'} />
      </Form.Item>

      <Form.Item
        label='Bought on'
        name='boughtOn'
        rules={[{ required: true, message: 'Please fill this field!' }]}
      >
        <Select className='w-100' onChange={(v) => setValue('boughtOn', v)}>
          <Option value='nickname'>Nickname</Option>
          <Option value='steamID'>SteamID</Option>
          <Option value='ip'>IP</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label={getBoughtOnLabel(state.boughtOn)}
        name='g_boughton'
        rules={[{ required: true, message: 'Please fill this field!' }]}
      >
        <Input />
      </Form.Item>

      {props.showServerInput ? (
        <Form.Item
          label='Server'
          name='server'
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <Select className='w-100'>
            <Option value='swarm2'>Umbrella Swarm x3</Option>
            <Option value='swarm1'>Umbrella Swarm High</Option>
            <Option value='surf'>Surf</Option>
          </Select>
        </Form.Item>
      ) : null}
      <Button onClick={props.onGoBack}>Go Back</Button>
      <Button className='ml-2' htmlType='submit' type='primary'>
        Next
      </Button>
    </Form>
  );
};
