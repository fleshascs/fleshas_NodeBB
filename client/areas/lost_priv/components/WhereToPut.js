import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;

export const WhereToPut = (props) => {
  const { onGoBack, onSubmit, g_moveto = '', g_movetopw = '', g_message = '' } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    await onSubmit(values);
    setLoading(false);
  };

  return (
    <Form
      form={form}
      initialValues={{
        g_moveto,
        g_movetopw,
        g_message
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label={'Where to put (your nickname / steamID / IP)'}
        name={'g_moveto'}
        rules={[{ required: true, message: 'Please fill this field!' }]}
      >
        <Input />
      </Form.Item>
      {props.showPasswordInput ? (
        <Form.Item label={'What set_info _pw password to set (not required)'} name={'g_movetopw'}>
          <Input />
        </Form.Item>
      ) : null}
      <Form.Item label={'Extra details (not required)'} name={'g_message'}>
        <TextArea rows={4} />
      </Form.Item>
      <Button onClick={onGoBack}>Go Back</Button>
      <Button className='ml-2' htmlType='submit' type='primary' loading={loading}>
        Submit
      </Button>
    </Form>
  );
};
