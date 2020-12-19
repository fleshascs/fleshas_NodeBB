import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CompactPicker, SketchPicker } from 'react-color';
import socket from 'areas/socket/services';
import { getOnlineUsersObj } from 'areas/user/selectors';
import { useSelector } from 'react-redux';
import { getUser } from 'areas/session/selectors';
import { Checkbox } from 'antd';
import { useAvatarAnimation } from './avatarsHook';
import CanvasControl from '../services/Canvas';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const Rapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  overflow-x: auto;
`;

export default function Canvas() {
  const onlineUsers = useSelector(getOnlineUsersObj);
  const [animationElements, setUserAvatarPosition] = useAvatarAnimation(onlineUsers);
  const currentUser = useSelector(getUser);
  const canvasControl = useRef();
  const canvas = useRef();
  const [color, setColor] = useState('#000');
  const [isSupaColors, setIsSupaColors] = useState(false);

  const onPickerChange = (e) => {
    setIsSupaColors(e.target.checked);
  };

  const handleColor = (color) => {
    if (canvasControl.current) {
      canvasControl.current.setColor(color.hex);
      setColor(color.hex);
    }
  };

  const setDrawingAccess = () => {
    const isEnabled = !!(currentUser && currentUser.uid);
    if (canvasControl.current) canvasControl.current.setAllowEdit(isEnabled);
  };

  useEffect(() => {
    canvasControl.current = new CanvasControl(canvas.current, setUserAvatarPosition, socket);
    setDrawingAccess();
    return () => {
      canvasControl.current.removeEventListeners();
    };
  }, [canvas, setUserAvatarPosition]);

  useEffect(() => {
    setDrawingAccess();
  }, [currentUser]);

  return (
    <Rapper>
      <Container className='mb-3'>
        {animationElements}
        <canvas
          id='can'
          width='800'
          height='400'
          style={{ border: '1px solid' }}
          ref={canvas}
        ></canvas>
        <div className='mt-1 d-flex'>
          {isSupaColors ? (
            <SketchPicker color={color} onChangeComplete={handleColor} />
          ) : (
            <CompactPicker color={color} onChangeComplete={handleColor} />
          )}
          <div className='ml-3'>
            <Checkbox onChange={onPickerChange}>more colors</Checkbox>
          </div>
        </div>
      </Container>
    </Rapper>
  );
}
