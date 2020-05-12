import React from 'react';
import { Username } from 'ui';

export default function Usernames(props) {
  return (
    <div className='pl-1 pb-1'>
      {props.users.map((user) => (
        <Username key={user.username} user={user}>
          {user.username}
        </Username>
      ))}
    </div>
  );
}
