import React, { useState, useMemo, useRef, createRef, useCallback } from 'react';
import styled from 'styled-components';
import socket from 'areas/socket/services';

const Avatar = styled.img`
  box-shadow: rgba(139, 139, 139, 0.32) 1px 1px 3px 0px;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  border-width: 0px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  border-image: initial;
  border-radius: 50%;
  position: absolute;
  transition: all 0.2s linear;
  opacity: 0;
  pointer-events: none;
`;
const DEFAULT_AVATAR =
  'https://www.gravatar.com/avatar/ae69fa0d674d490c99c4d8fdca23f1e2?s=100&r=x&d=retro';

export function useAvatarAnimation(onlineUsers) {
  const users = useRef({});
  const [, forceUpdate] = useState(0);

  const getUserComponent = useCallback(
    (uid) => {
      if (!users.current[uid]) {
        const onlineUser = onlineUsers[uid];
        const picture = onlineUser && onlineUser.picture;
        users.current[uid] = {
          timeoutId: null,
          component: createRef(),
          imgSrc: picture || DEFAULT_AVATAR
        };
        if (!picture) {
          socket.emit('user.getUserByUID', uid, (err, data) => {
            if (err) {
              return;
            }
            users.current[uid].imgSrc = data.picture || DEFAULT_AVATAR;
            forceUpdate((n) => !n);
          });
        }
        forceUpdate((n) => !n);
      }
      return users.current[uid];
    },
    [users, onlineUsers]
  );

  const setUserAvatarPosition = useCallback(
    (uid, clientX, clientY) => {
      const user = getUserComponent(uid);
      if (user && user.component.current) {
        const avatar = user.component.current;
        clearInterval(user.timeoutId);
        avatar.style.opacity = '1';
        avatar.style.left = clientX + 'px';
        avatar.style.top = clientY + 'px';
        user.timeoutId = setTimeout(function () {
          if (avatar) {
            avatar.style.opacity = '0';
          }
        }, 500);
      }
    },
    [users, getUserComponent]
  );

  const animationElements = Object.keys(users.current).map((uid) => {
    const user = users.current[uid];
    return (
      <Avatar key={user.imgSrc} ref={user.component} width='25px' height='25px' src={user.imgSrc} />
    );
  });

  return [animationElements, setUserAvatarPosition];
}
