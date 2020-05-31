import React from 'react';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;

// const initialValues = {
//   server: 'swarm2'
// };

export const InGameDetails = (props) => {
  const { server = 'swarm2', g_name = '', g_steamid = '' } = props;
  const [form] = Form.useForm();
  const onFinish = (values) => {
    props.onSubmit(values);
  };

  return (
    <Form
      initialValues={{
        g_name,
        g_steamid,
        server
      }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label='Nickname'
        name='g_name'
        rules={[{ required: true, message: 'Please input your nickname!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='SteamID'
        name='g_steamid'
        rules={[{ required: true, message: 'Please input your steamID!' }]}
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
