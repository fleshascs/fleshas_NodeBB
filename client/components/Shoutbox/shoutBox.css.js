import styled from 'styled-components';
import { shoutboxInputBorderColor } from '_theme';

//flex-direction: column-reverse; // https://stackoverflow.com/a/44051405 (helps to scroll to bottom, but disables scroll on firefox)
//from chrome Version 85.0.4183.83 (Official Build) (64-bit)  it makes some differences in calc scrolled area height.
export const ShoutboxContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;

  &::-webkit-scrollbar {
    display: none;
  }

  & svg {
    width: 100%;
  }
`;

export const MessgesList = styled.div`
  flex: 1;
`;

export const NotLoggedIn = styled.div`
  color: grey;
  font-size: 0.9em;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  overflow: hidden; //horizontal scroll was visible for a sec on loading
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
