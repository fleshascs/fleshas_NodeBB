import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Row, Col, Button, Divider } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import axios from 'axios';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { shoutboxInputBorderColor } from '_theme';
import { formUrlencoded } from '_core/utils';
import { useTranslation } from '_core/i18n';
import { Username, Avatar } from 'ui';

export const Textarea = styled.textarea`
  border: 1px solid ${shoutboxInputBorderColor};
  resize: none;
  font-size: 0.9em;
  color: #767a7f;
  outline-color: #424c58;
  overflow: auto;
  background: transparent;
`;

export const Chat = ({ messages, loading, failed, requestId, onSendMessage, isRequestOpen }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  if (failed || failed) return null;

  const sendMessage = async () => {
    const formData = {
      message: message,
      request_id: requestId
    };
    const isSuccess = await onSendMessage(formData);
    if (isSuccess) {
      setMessage('');
    }
  };
  const onTextChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {messages.map((msg) => (
        <Comment
          author={<Username user={msg.fromuser}>{msg.fromuser.username}</Username>}
          avatar={<Avatar user={msg.fromuser} imgUrl={msg.fromuser.picture} showIndicator={true} />}
          content={<div dangerouslySetInnerHTML={{ __html: msg.message }} />}
          datetime={
            <Tooltip title={moment(parseInt(msg.created_at)).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(parseInt(msg.created_at)).fromNow()}</span>
            </Tooltip>
          }
        />
      ))}
      {!loading && !failed && !messages?.length ? <Divider>Chat with Admin</Divider> : null}
      {isRequestOpen ? (
        <div className='mt-5'>
          <Textarea className='w-100' onChange={onTextChange} value={message} />
          <div className='d-flex'>
            <Button type='primary' disabled={!message} onClick={sendMessage} className='ml-auto'>
              {t('submit-message')}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};
