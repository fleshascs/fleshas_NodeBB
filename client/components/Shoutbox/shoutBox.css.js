import styled from 'styled-components';
import { shoutboxInputBorderColor } from '_theme';

export const ShoutboxContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse; // https://stackoverflow.com/a/44051405

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MessgesList = styled.div``;

export const NotLoggedIn = styled.div`
  color: grey;
  font-size: 0.9em;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  overflow: auto; //sito reikejo del firefox
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Textarea = styled.textarea`
  border: 1px solid ${shoutboxInputBorderColor};
  resize: none;
  font-size: 0.9em;
  color: #767a7f;
  outline-color: #424c58;
  overflow: auto;
  background: transparent;
`;
