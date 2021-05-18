import React from 'react';
import styled from 'styled-components';
import { Switch, Drawer } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from '_core/i18n';
import { primaryColor, leftBarIconColor } from '_theme';
import { LINKS } from './NavBar/links';
import { renderLink } from 'ui/NavBar/renderLink';
import { MoonIcon } from './MoonIcon';

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

const CollapseButton = styled.div`
  cursor: pointer;
  &:hover {
    background: ${primaryColor};
  }

  &.lul {
    text-align: right;
    padding-right: 2rem;
  }
`;

const MenuListItem = styled.div`
  & .active {
    color: #ff665a;
  }
`;

export default function LeftDrawer(props) {
  const { onClose, visible, toggleTheme, theme, onLangChange } = props;
  const { t, i18n } = useTranslation();
  const router = useRouter();

  return (
    <Drawer placement='left' closable={false} onClose={onClose} visible={visible}>
      {LINKS.map((url, index) => (
        <MenuListItem key={url.to + index}>
          {renderLink(
            url,
            <NavLink className={url.paths && url.paths.includes(router.pathname) && 'active'}>
              {t(url.textId)}
            </NavLink>
          )}
        </MenuListItem>
      ))}
      <CollapseButton className='mt-2 py-3' onClick={onLangChange}>
        <img src={`/static/images/locale/${i18n.language}.png`} width='16px' height='11px' />
      </CollapseButton>
      <div
        className='mt-2 mb-4'
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <MoonIcon className='material-icons'>brightness_3</MoonIcon>
        <Switch defaultChecked={theme === 'dark'} onChange={toggleTheme} className='ml-3' />
      </div>
    </Drawer>
  );
}
