import React, { Component } from 'react';
import styled from 'styled-components';
import { Middle, Left, Right, Header } from 'ui';
import Chat from 'areas/chat/components';
import Bottom from './Bottom';
import Background from './Background';
//import VideoPlayerContainer from 'areas/videoPlayer/components/PlayerContainer';
import {
  defaultFontColor,
  breadcrumbLinkColor,
  inputBackgorundColor,
  inputBorderColor,
  inputLabelColor,
  disabledPrimaryButtomColor,
  disabledPrimaryButtomBackground,
  disabledPrimaryButtomBorder,
  usernameColor
} from '_theme';
import { createGlobalStyle } from 'styled-components';

const AntdStyle = createGlobalStyle`
  h1, h2, h3, h4, h5, h6 {
    color: ${defaultFontColor};
  }

  .ant-btn-primary[disabled] {
    color: ${disabledPrimaryButtomColor};
    background-color: ${disabledPrimaryButtomBackground};
    border-color: ${disabledPrimaryButtomBorder};
  }

  ${(props) =>
    props.theme.mode === 'dark'
      ? `

    .ant-list-item {
      border-color: #424c58 !important;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      border: 1px solid green;
      -webkit-text-fill-color: #c3bfbf;
      -webkit-box-shadow: 0 0 0px 1000px none inset;
      transition: background-color 5000s ease-in-out 0s;
    }

    .ant-form-item-has-error .ant-input {
        background: none;
    }

    .ant-form-item-control-input-content input {
      background: none;
      color: #c3bfbf;
      border-color: #424c58;
    }

    .ant-list-item-meta-description, .ant-checkbox-wrapper, .ant-form, .ant-result-title {
      color: #c3bfbf;
    }

    .ant-radio-inner {
      background-color: #292c35;
      border-color: #5a5252;
    }

    .ant-radio-checked .ant-radio-inner {
      border-color: #0074ff;
    }

    .ant-form a {
      color: rgb(55,170,213);
    }

    .ant-picker {
      background: none;
      border-color: #424c58;
    }

    .ant-picker-clear{
      color: #424c58 !important;
      background: none;
    }

    span.ant-picker-suffix > span > svg {
      fill: #424c58;
    }

  `
      : ''};
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;
const ContainerWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  color: ${defaultFontColor};

  .breadcrumb {
    background-color: transparent;
  }
  .breadcrumb a {
    color: ${breadcrumbLinkColor};
  }

  // .ant-form-item-children input {
  //   background-color: ${inputBackgorundColor};
  //   border-color: ${inputBorderColor};
  // }

  // .ant-form-item-children input::placeholder {
  //   background-color: ${inputBackgorundColor};
  //   color: grey;
  // }

  // .ant-form-item-label > label,
  // .ant-checkbox-wrapper,
  // .ant-form {
  //   color: ${inputLabelColor} !important;
  // }

  // .ant-comment-content-author-name > * {
  //   color: ${usernameColor};
  // }
`;

const ColumnsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const JustAnotherWrapper = styled.div`
  min-height: 100vh;
  @media (max-width: 700px) {
    max-width: 100vw;
  }
`;

class Layout extends Component {
  render() {
    return (
      <ContainerWrapper>
        <AntdStyle />
        <Left />
        <Container>
          <Background />
          <Header />
          <ColumnsWrapper>
            <Middle>
              <JustAnotherWrapper>
                {/* <VideoPlayerContainer/> */}
                {this.props.children}
              </JustAnotherWrapper>
              <Bottom />
            </Middle>
            <Right />
          </ColumnsWrapper>
          <Footer>
            <Chat />
          </Footer>
        </Container>
      </ContainerWrapper>
    );
  }
}

export default Layout;

const FooterContainer = styled.div`
  width: 100%;
  position: relative;
`;

class Footer extends Component {
  render() {
    return <FooterContainer>{this.props.children}</FooterContainer>;
  }
}
