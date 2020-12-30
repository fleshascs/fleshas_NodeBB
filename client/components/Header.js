import React, { Component } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { NavBar, LoginRegisterBlock, UserBlock } from 'ui';
import { withRouter } from 'next/router';
import { Button } from 'antd';
import { locale } from 'moment';
import { i18n, withTranslation } from '_core/i18n';
import { primaryColor, headerTopColor } from '_theme';
import { setTheme } from 'areas/general/actions';
import { getTheme } from 'areas/general/selectors';
import { setCookie } from '_core/utils';
import { getIsLoggedIn } from 'areas/session/selectors';

const LeftDrawer = dynamic(() => import('./LeftDrawer'), {
  ssr: false
});

const Container = styled.header`
  color: #fff;
  background: ${primaryColor};
  box-shadow: 0 3px 6px 2px rgba(0, 0, 0, 0.4);
  z-index: 1;
  left: -3px;
  right: -3px;
  top: 0;
  color: #efefef;
`;

const Logo = styled.div`
  font-family: bauerg;
  font-size: 2em;

  @media (max-width: 750px) {
    display: none;
  }
`;

const MobileNavButton = styled.div`
  @media (min-width: 750px) {
    display: none;
  }
`;

const Top = styled.div`
  background: ${headerTopColor};
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  marginright: 0;
  padding-right: 30%;
  flex: 3;

  @media (max-width: 750px) {
    padding-right: 0px;
    flex: 0;
    justify-content: flex-start;
  }
`;

export const MessagesButtonContainer = styled.div`
  position: relative;
  bottom: 0;
  display: flex;
  cursor: pointer;
`;

class Header extends Component {
  state = { visible: false, hasBeenToggled: false };

  showDrawer = () => {
    this.setState({
      visible: true,
      hasBeenToggled: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  onLangChange = () => {
    const lang = i18n.language === 'en' ? 'lt' : 'en';
    locale(lang === 'en' ? 'es-us' : 'lt');
    i18n.changeLanguage(lang);
  };

  toggleTheme = () => {
    const theme = this.props.theme === 'light' ? 'dark' : 'light';
    this.props.setTheme(theme);
    setCookie('theme', theme, 31536000); //One year
  };

  render() {
    const { loggedIn, theme } = this.props;
    return (
      <>
        <Container>
          <Top>
            <div className='col d-flex'>
              <LogoContainer>
                <MobileNavButton>
                  <Button type='link' ghost onClick={this.showDrawer}>
                    <i className='material-icons'>menu</i>
                  </Button>
                </MobileNavButton>
                <Logo>fleshas.lt</Logo>
              </LogoContainer>
              <div style={{ flex: 1 }}>{loggedIn ? <UserBlock /> : <LoginRegisterBlock />}</div>
            </div>
          </Top>
          <NavBar />
        </Container>
        {this.state.hasBeenToggled ? (
          <LeftDrawer
            onClose={this.onClose}
            visible={this.state.visible}
            toggleTheme={this.toggleTheme}
            theme={theme}
            onLangChange={this.onLangChange}
          />
        ) : null}
      </>
    );
  }
}

const actionsToProps = {
  setTheme
};

function mapStateToProps(state) {
  return {
    loggedIn: getIsLoggedIn(state),
    theme: getTheme(state)
  };
}
export default connect(mapStateToProps, actionsToProps, null, { pure: false })(
  withRouter(withTranslation('common')(Header))
);
