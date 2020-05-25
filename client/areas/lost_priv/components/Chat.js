import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar, Row, Col, Button } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import axios from 'axios';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { shoutboxInputBorderColor } from '_theme';
import { useTranslation } from '_core/i18n';

export const Textarea = styled.textarea`
  border: 1px solid ${shoutboxInputBorderColor};
  resize: none;
  font-size: 0.9em;
  color: #767a7f;
  outline-color: #424c58;
  overflow: auto;
  background: transparent;
`;

export const Chat = ({ messages, loading, failed, requestId }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  if (failed || failed) return null;

  const sendMessage = async () => {
    const response = await axios.post('http://fleshas.lt/php/api/lostPriv/request_send_message', {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:4567'
      },
      data: {
        message: message,
        request_id: requestId
      }
    });
  };
  const onTextChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {messages.map((msg) => (
        <Comment
          author={<a>Han Solo</a>}
          avatar={
            <Avatar
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              alt='Han Solo'
            />
          }
          content={<p>{msg.message}</p>}
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      ))}
      <div className='mt-5'>
        <Textarea className='w-100' onChange={onTextChange} value={message} />
        <div className='d-flex'>
          <Button type='primary' disabled={!message} onClick={sendMessage} className='ml-auto'>
            {t('submit-message')}
          </Button>
        </div>
      </div>
    </>
  );
};
