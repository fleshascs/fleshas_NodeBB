import React from 'react';
import { Form, Button, Select } from 'antd';
const { Option } = Select;

export const Conditions = (props) => {
  const { g_privilegie = 'xp', condition = '1' } = props;

  const [form] = Form.useForm();
  const onFinish = (values) => {
    switch (values.condition) {
      case '1':
        values.g_condition = 'Pirkau ir negavau';
        break;
      case '2':
      case '3':
        values.g_condition = 'Dingo';
        break;
    }
    props.onSubmit(values);
  };

  return (
    <Form
      initialValues={{
        g_privilegie,
        condition
      }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label='Request type'
        name='g_privilegie'
        rules={[{ required: true, message: 'Please select request type!' }]}
      >
        <Select className='w-100'>
          <Option value='xp'>XP/Prs/Powers</Option>
          {/* <Option value='2'>Tag</Option> */}
          <Option value='vip'>VIP</Option>
          <Option value='admin'>Admin</Option>
          <Option value='sadmin'>Super Admin</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label='Condition'
        name='condition'
        rules={[{ required: true, message: 'Please select condition!' }]}
      >
        <Select className='w-100'>
          <Option value='1'>Bought and did not received</Option>
          <Option value='2'>Had and now it's gone</Option>
          <Option value='3'>Move to different IP/Nick/SteamID</Option>
        </Select>
      </Form.Item>
      <Button htmlType='submit' type='primary'>
        Next
      </Button>
    </Form>
  );
};
