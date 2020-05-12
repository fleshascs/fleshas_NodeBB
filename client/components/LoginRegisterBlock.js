import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { withTranslation } from '_core/i18n';
import { primaryColor } from '_theme';

const Container = styled.div`
  display: flex;
  padding-top: 3px;
  padding-bottom: 3px;
  font-size: 14px;
  flex: 1;
`;

const Column = styled.div`
  position: relative;
  flex: 1;
  min-height: 1px;
  padding-right: 5px;
  padding-left: 5px;
`;

const RegisterButton = styled.a`
  padding: 9px;
  border-radius: 2px;
  color: #fff;
  background: #ff5c5c;
  flex: 1;
  border: 2px solid #f37272;

  &:hover {
    text-decoration: none;
    color: #fff;
  }

  @media (max-width: 600px) {
    background: none;
    border: none;
    box-shadow: none;
    color: red;
  }
`;

const LoginButton = styled.a`
  padding: 9px;
  border-radius: 2px;
  color: #fff;
  background: ${primaryColor};
  flex: 1;
  cursor: pointer;
  border: 2px solid #2d79cc;
  display: block;
  box-shadow: rgba(39, 72, 138, 1) 0 0px 0px 2px inset;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: #fff;
    //box-shadow: rgba(39, 72, 138, 1) 0 0px 0px 40px inset;
  }

  @media (max-width: 600px) {
    background: none;
    border: none;
    box-shadow: none;
    color: red;
  }
`;

const LoginRegister = (props) => {
  return (
    <Container>
      <Column className='text-center d-flex'>
        <Link href='/login' as='/login' passHref>
          <LoginButton>{props.t('login')}</LoginButton>
        </Link>
      </Column>
      <Column className='text-center d-flex'>
        <Link href='/register' as='/register' passHref>
          <RegisterButton>{props.t('register')}</RegisterButton>
        </Link>
      </Column>
    </Container>
  );
};

export default withTranslation('common')(LoginRegister);
