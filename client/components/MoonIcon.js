import styled from 'styled-components';

export const MoonIcon = styled.div`
  ${(props) =>
    props.theme.mode === 'dark'
      ? ` 
    text-shadow: 0 0 0.2em #f5ff0f, 0 0 0.2em #87F, 0 0 0.2em #effd17;
    color: yellow;
    `
      : ''}
`;
