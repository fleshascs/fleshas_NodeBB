import React from 'react';
import { HeartTwoTone, DislikeTwoTone, LikeTwoTone } from '@ant-design/icons';

export default function RepType({ type }) {
  switch (type) {
    case 0:
      return (
        <>
          <span style={{ color: 'red' }}>-1</span>
          <DislikeTwoTone twoToneColor='red' />
        </>
      );
    case 1:
      return (
        <>
          <span style={{ color: '#21c119' }}>+1</span>
          <LikeTwoTone twoToneColor='#21c119' />
        </>
      );
    case 2:
      return (
        <>
          <span style={{ color: '#eb2f96' }}>+2</span>
          <HeartTwoTone twoToneColor='#eb2f96' />
        </>
      );
    default:
      return null;
  }
}
