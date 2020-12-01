import styled, { keyframes } from 'styled-components';
import { primaryColor } from '_theme';
const spin = keyframes`
    to {
      transform: rotate(360deg);
    }
`;
const Spinner = styled.span`
  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 39%;
    height: 60px;
    width: 60px;
    margin-top: -30px;
    margin-bottom: -30px;
    border-radius: 50%;
    border: 3px solid lightgray;
    border-top-color: ${primaryColor};
    animation: ${spin} 0.7s linear infinite;
  }
`;
export default Spinner;
