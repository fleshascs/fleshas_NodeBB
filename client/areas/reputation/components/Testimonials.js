import React from 'react';
import { Tooltip, List } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { NumberOutlined } from '@ant-design/icons';
import { shoutboxInputBorderColor } from '_theme';
import { Avatar, Username } from 'ui';
import RepType from './RepType';
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

export const Date = styled.span`
  font-size: 12px;
  line-height: 18px;
  font-weight: normal;
`;

export const Testimonials = ({ testimonials, loading }) => {
  const { t } = useTranslation();
  const total = testimonials.length;

  console.log('testimonials', testimonials);

  return (
    <>
      <List
        className='demo-loadmore-list'
        loading={loading}
        itemLayout='horizontal'
        loadMore={null}
        dataSource={testimonials}
        locale={{
          emptyText: t('zero-reputation')
        }}
        renderItem={(testimonial, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  user={testimonial.fromuser}
                  imgUrl={testimonial.fromuser.picture}
                  showIndicator={true}
                />
              }
              title={
                <>
                  <Username user={testimonial.fromuser}>{testimonial.fromuser.username}</Username>
                  <Tooltip title={moment(testimonial.createtime).format('YYYY-MM-DD HH:mm:ss')}>
                    <Date className='ml-3 ant-comment-content-author-time'>
                      {moment(testimonial.createtime).fromNow()}
                    </Date>
                  </Tooltip>
                </>
              }
              description={<div dangerouslySetInnerHTML={{ __html: testimonial.reason }} />}
            />
            <div className='mr-3'>
              <RepType type={testimonial.type} />
            </div>
            <div className='mr-3'>
              <NumberOutlined />
              {total - index}
            </div>
          </List.Item>
        )}
      />
    </>
  );
};
