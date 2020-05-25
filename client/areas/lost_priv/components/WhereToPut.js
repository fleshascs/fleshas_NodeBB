import React from 'react';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;

export const WhereToPut = (props) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    props.onSubmit(values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label={'Where to put (your nickname / steamID / IP)'}
        name={'g_moveto'}
        rules={[{ required: true, message: 'Please fill this field!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={'What password to set (not required)'} name={'g_movetopw'}>
        <Input />
      </Form.Item>
      <Form.Item label={'Extra details (not required)'} name={'g_message'}>
        <TextArea rows={4} />
      </Form.Item>
      <Button onClick={props.onGoBack}>Go Back</Button>
      <Button className='ml-2' htmlType='submit' type='primary'>
        Submit
      </Button>
    </Form>
  );
};
