import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { message, Switch } from 'antd';
import moment from 'moment';
import throttle from 'lodash.throttle';
import { getOnlineUsers as getOnlineUsersSelector } from 'areas/user/selectors';
import { setOnlineUsers, addToOnlineList, removeFromOnlineList } from 'areas/user/actions';
import { primaryColor, leftBarBGColor, leftBarIconColor, leftBarInputColor } from '_theme';
import { searchUsers, getOnlineUsers } from 'areas/user/services';
import { i18n, withTranslation } from '_core/i18n';
import { setCookie } from '_core/utils';
import socket from 'areas/socket/services';
import { MoonIcon } from '../MoonIcon';
import { setTheme } from 'areas/general/actions';
import { getTheme } from 'areas/general/selectors';
import UsersList from '../UsersList';

const SIDEBAR_WIDTH = '70px';

const LeftBar = styled.div`
  background: ${leftBarBGColor};
  height: 100%;
  width: 70px;

  z-index: 2;
  display: flex;
  flex-direction: column;
  text-align: center;
  //transition: width 0.25s;

  &.opened {
    width: 400px;
    position: fixed;
    left: 0;
    top: 0;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const SpaceHolderOnOpen = styled.div`
  width: ${SIDEBAR_WIDTH};
  height: 100%;

  @media (max-width: 700px) {
    display: none;
  }
`;

const CollapseButtonIcon = styled.i`
  color: ${leftBarIconColor};
`;
const SearchInput = styled.input`
  background: ${leftBarInputColor};
  border: none;
  color: rgb(98, 127, 156);

  &:focus {
    border: none;
    outline: none;
  }
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

class Left extends Component {
  state = {
    opened: false,
    isSearching: false,
    searchResults: []
  };

  componentDidMount() {
    this.fetchOnlineUsers();
    socket.on('event:userconnection', this.props.addToOnlineList);
    socket.on('event:userdisconnected', this.props.removeFromOnlineList);
  }

  fetchOnlineUsers = async () => {
    const users = await getOnlineUsers();
    if (!users) {
      return;
    }
    this.props.setOnlineUsers(users);
  };

  searchUsers = throttle(async (username) => {
    const { t } = this.props;
    try {
      if (username.length < 3) {
        return;
      }
      const searchResults = await searchUsers(username);
      this.setState({ searchResults });
    } catch (e) {
      console.log('e', e);
      message.error(t('technical-error'));
    }
  }, 1000);

  handleSearch = (e) => {
    const query = e.currentTarget.value;
    let isSearching = false;
    if (query.length) {
      isSearching = true;
    }
    this.setState({ isSearching, query });
    this.searchUsers(query);
  };

  closeSearch = () => {
    if (!this.isSearching) return;
    this.setState({ isSearching: false });
  };

  onLangChange = () => {
    const lang = i18n.language === 'en' ? 'lt' : 'en';
    moment.locale(lang === 'en' ? 'en-us' : 'lt');
    i18n.changeLanguage(lang);
  };

  toggleTheme = () => {
    const theme = this.props.theme === 'light' ? 'dark' : 'light';
    this.props.setTheme(theme);
    setCookie('theme', theme, 31536000); //One year
  };

  render() {
    const { opened, isSearching, searchResults } = this.state;
    const users = isSearching ? searchResults : this.props.onlineUsers;
    return (
      <>
        {opened ? <SpaceHolderOnOpen /> : null}
        <LeftBar className={`${opened ? 'opened' : ''}`}>
          <UsersList users={users} opened={opened} />
          <div className='mt-auto' />
          {!opened ? (
            <CollapseButton
              className={`py-3 ${opened ? 'mb-2' : 'mb-5'}`}
              onClick={this.onLangChange}
            >
              <img
                src={`/static/images/locale/${this.props.i18n.language}.png`}
                alt='language'
                width='16px'
                height='11px'
              />
            </CollapseButton>
          ) : null}
          {opened ? (
            <div
              className='mt-2 mb-4'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7f7676'
              }}
            >
              <MoonIcon className='material-icons'>brightness_3</MoonIcon>
              Dark Theme
              <Switch
                defaultChecked={this.props.theme === 'dark'}
                onChange={this.toggleTheme}
                className='ml-3'
              />
            </div>
          ) : null}

          {opened ? (
            <SearchInput
              placeholder={this.props.t('search-users-placeholder')}
              className='py-3 px-2'
              onChange={this.handleSearch}
              onBlur={this.closeSearch}
            />
          ) : (
            <CollapseButton onClick={this.handleCollapse}>
              <CollapseButtonIcon className='material-icons mb-3 mt-3'>search</CollapseButtonIcon>
            </CollapseButton>
          )}
          <CollapseButton className={opened ? 'lul' : ''} onClick={this.handleCollapse}>
            <CollapseButtonIcon className='material-icons mb-3 mt-3 '>
              {opened ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}
            </CollapseButtonIcon>
          </CollapseButton>
        </LeftBar>
      </>
    );
  }

  handleCollapse = () => {
    this.setState({ opened: !this.state.opened, isSearching: false });
  };
}

function mapStateToProps(state) {
  return {
    onlineUsers: getOnlineUsersSelector(state),
    theme: getTheme(state)
  };
}
const actionsToProps = {
  setOnlineUsers,
  addToOnlineList,
  removeFromOnlineList,
  setTheme
};

export default withTranslation('common')(connect(mapStateToProps, actionsToProps)(Left));
