import styled from 'styled-components';
import {
  chatHeaderColor,
  chatBackgroundColor,
  chatBorderColor,
  chatInnerBorderColor
} from '_theme';

export const ChatContainer = styled.div`
  margin-left: 10px;
  display: flex;
  height: 100%;
  width: 300px;
  position: relative;
  align-items: flex-end;
  display: flex;

  @media (max-width: 600px) {
    margin-left: 0px;
    width: 100%;
  }
`;

export const PopUpContainer = styled.div`
  width: 100%;
  height: 350px;
  z-index: 2;
  box-shadow: rgba(109, 103, 95, 0.22) 1px 3px 6px;
  background: ${chatBackgroundColor};
  position: relative;
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-color: ${chatBorderColor};
  border-width: 1px 1px 0px 1px;

  @media (max-width: 600px) {
    position: fixed;
    height: 100%;
  }
`;

export const PopUpHeader = styled.div`
  background: ${chatHeaderColor};
  color: #e9f0ff;
  border-bottom: 1px solid ${chatInnerBorderColor};
  padding: 3px;

  @media (max-width: 768px) {
    padding: 7px;
  }
`;

export const MessagesContainer = styled.div`
  overflow-y: scroll;
  flex: 1;
`;

export const CloseButton = styled.i`
  border: none;
  padding: 0px;
  background: none;
  color: #655f5f;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
