import styled, { css } from 'styled-components';
import { primaryColor, rowHoverColor } from '_theme';

export const Container = styled.div`
  display: flex;
  padding-left: 0.25rem;
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
  padding-right: 0.5rem;
  color: #9c9c9c;
  ${(props) =>
    props.deleted
      ? css`
          opacity: 0.3;
        `
      : ''}

  &:hover {
    text-decoration: none;
    background: ${rowHoverColor};
  }
`;

export const AuthorColumn = styled.div`
  display: flex;
  flex: 2;
`;
export const ViewsColumn = styled.div`
  flex: 1;
  text-align: center;
`;

export const AnswersColumn = styled(ViewsColumn)``;

export const Important = styled.div`
  font-size: 13px;
  color: ${primaryColor};
  font-weight: bold;
`;
export const NotImportant = styled.div`
  font-size: 12px;
  color: #9c9c9c;
`;
export const ImportantBig = styled.div`
  font-weight: 100;
  font-size: 22px;
  color: ${primaryColor};
`;
export const ForumName = styled.a`
  font-weight: 500;
  font-size: 15px;
`;
export const SubjectContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-basis: 40%;
  margin-left: 30px;

  @media (max-width: 750px) {
    flex-basis: 100%;
  }
`;

export const SmallText = styled.div`
  font-size: 0.8em;
`;
