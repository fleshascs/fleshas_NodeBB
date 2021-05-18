import React, { useEffect, useState, useCallback } from 'react';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import { isBoardEnabled } from '../selectors';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const Canvas = dynamic(() => import('./Canvas'), {
  ssr: false
});

function Container() {
  const isEnabled = useSelector(isBoardEnabled);
  if (!isEnabled) {
    return null;
  }

  return <Canvas />;
}

export default Container;
