import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavBar, LoginRegisterBlock, UserBlock } from 'ui';
import { withRouter } from 'next/router';
import { Drawer, Button } from 'antd';
import { Switch } from 'antd';
import moment from 'moment';
import { LINKS } from './NavBar/links';
import { i18n, withTranslation } from '_core/i18n';
import { primaryColor, headerTopColor, leftBarIconColor } from '_theme';
import { setTheme } from 'areas/general/actions';
import { getTheme } from 'areas/general/selectors';
import { setCookie } from '_core/utils';
import { getIsLoggedIn } from 'areas/session/selectors';
import { renderLink } from 'ui/NavBar/renderLink';

const MenuListItem = styled.div`
  & .active {
    color: #ff665a;
  }
`;

const NavLink = styled.a`
  padding: 10px 0px;
  display: flex;
  height: 100%;
  flex-direction: row;
  text-decoration: none;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.2s ease;
`;

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

const CollapseButtonIcon = styled.i`
  color: ${leftBarIconColor};
`;

const CollapseButton = styled.div`
  cursor: pointer;
  &:hover {
    background: ${primaryColor};
  }
  &:hover ${CollapseButtonIcon} {
    color: #06183c;
  }

  &.lul {
    text-align: right;
    padding-right: 2rem;
  }
`;

class Header extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  onLangChange = () => {
    const lang = i18n.language === 'en' ? 'lt' : 'en';
    moment.locale(lang === 'en' ? 'es-us' : 'lt');
    i18n.changeLanguage(lang);
  };

  toggleTheme = () => {
    const theme = this.props.theme === 'light' ? 'dark' : 'light';
    this.props.setTheme(theme);
    setCookie('theme', theme, 31536000); //One year
  };

  render() {
    const { loggedIn } = this.props;
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

        <Drawer
          title='Navigation'
          placement='left'
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          {LINKS.map((url, index) => (
            <MenuListItem key={url.to + index}>
              {renderLink(
                url,
                <NavLink
                  className={
                    url.paths && url.paths.includes(this.props.router.pathname) && 'active'
                  }
                >
                  {this.props.t(url.textId)}
                </NavLink>
              )}
            </MenuListItem>
          ))}
          <CollapseButton className='mt-2' onClick={this.onLangChange}>
            <CollapseButtonIcon>
              <img src={`/static/images/locale/${this.props.i18n.language}.png`} className='py-3' />
            </CollapseButtonIcon>
          </CollapseButton>
          <div
            className='mt-2 mb-4'
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <i className='material-icons'>brightness_3</i>
            Dark Theme
            <Switch
              defaultChecked={this.props.theme === 'dark'}
              onChange={this.toggleTheme}
              className='ml-3'
            />
          </div>
        </Drawer>
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
