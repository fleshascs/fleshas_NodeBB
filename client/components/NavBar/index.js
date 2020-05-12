import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { withTranslation } from '_core/i18n';
import { LINKS } from './links';
import { renderLink } from './renderLink';

const NavigationBar = styled.nav`
  max-height: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  z-index: 1;

  @media (max-width: 750px) {
    display: none;
  }
`;

const MenuList = styled.ul`
  min-height: 48px;
  max-height: 48px;
  display: flex;
  list-style: none;
  user-select: none;
  margin: 0;
  padding: 0;
`;

const MenuListItem = styled.li`
  &.active {
    color: #efefef;
    background: rgba(255, 255, 255, 0.1);
    border-bottom: 2px solid #fff;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  & .active {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const NavLink = styled.a`
  padding: 0 22px;
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  color: rgba(239, 239, 239, 0.8);
  transition: all 0.2s ease;

  &:hover {
    text-decoration: none !important;
    color: #efefef;
  }
`;

class NavBar extends Component {
  render() {
    return (
      <NavigationBar>
        <MenuList>
          {LINKS.map((url, index) => (
            <MenuListItem key={url.to + index}>
              {renderLink(
                url,
                <NavLink
                  className={
                    url.paths && url.paths.includes(this.props.router.pathname) && 'active'
                  }
                  style={url.gold ? { color: '#FFCA28' } : {}}
                >
                  {this.props.t(url.textId)}
                </NavLink>
              )}
            </MenuListItem>
          ))}
        </MenuList>
      </NavigationBar>
    );
  }
}

export default withRouter(withTranslation('common')(NavBar));
