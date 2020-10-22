import styled from 'styled-components';
import {
  postBGColor,
  boxBorderColor,
  BoxTopFontColor,
  postTopMessageColor,
  separatorColor
} from '_theme';

export const AvatarContainer = styled.div`
  padding-right: 20px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const SignatureContainer = styled.div`
  overflow-y: hidden;
  max-height: 800px;
`;

export const SignatureSeparator = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid ${separatorColor};
`;

export const ContainerWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  position: relative;

  & .deleted {
    opacity: 0.3;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: inline-block;
  word-break: break-word;
  background: ${postBGColor};
  border-radius: 3px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
`;

export const PostFooterText = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8em;
`;

export const Tools = styled.span`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
export const CommentTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 19px;
  border-bottom: 1px solid ${boxBorderColor};
  position: relative;
  color: ${BoxTopFontColor};
  font-size: 0.9em;

  &:after {
    border-color: transparent transparent transparent white;
  }

  &:after,
  &::after,
  &:before,
  &::before {
    position: absolute;
    top: 36%;
    left: -8px;
    content: '';
    width: 0;
    height: 0;
    border-right: solid 8px ${postBGColor};
    border-bottom: solid 8px transparent;
    border-top: solid 8px transparent;
  }
  &:before,
  &::before {
    border-right: solid 8px #989595;
  }

  @media (max-width: 600px) {
    &:after,
    &::after,
    &:before,
    &::before {
      display: none;
    }
  }
`;
export const CommnetMessage = styled.div`
  padding: 20px;
  font-size: 0.9em;
  color: ${postTopMessageColor};
  word-wrap: break-word;
  a {
    color: #0089ff;
  }
`;
export const Rep = styled.div`
  font-size: 0.7em;
  color: #355335;
`;
