import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 700px) {
    padding-right: 0px;
  }
`;

export const EditButton = styled.span`
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  position: absolute;
  bottom: 0;
  font-size: 12px;
  color: #e2e2e2;
  width: 100%;
  display: none;
`;

export const Username = styled.a`
  font-size: 13px;
  color: #ececec;
  font-weight: bold;

  &:hover {
    color: #fff;
  }
`;
export const UserEmail = styled.div`
  font-size: 13px;
  color: #68799a;
  font-weight: bold;
`;

export const Usermenu = styled.div`
  display: flex;
  align-items: center;
`;
