import React, { PureComponent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Box, BoxHeaderContainer, BoxHeaderTitle } from 'ui';
import { withTranslation } from '_core/i18n';
import { rowLinkColor } from '_theme';
import UsersPlaceholder from './UsersPlaceholder';
import ListItem from './ListItem';

const DiscordIcon = styled.img`
  width: 3rem;
`;
const Footer = styled.div`
  text-align: right;
  color: #878787;
  font-size: 0.8em;
`;

const UpdateButton = styled.span`
  color: ${rowLinkColor};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Avatar = styled.img`
  border-radius: 100%;
  width: 24px;
  height: 24px;
  border: solid 2px #fff !important;
  border-color: #3a3a3a !important;
  display: inline;
  margin-right: 5px !important;
`;

const TsLink = styled.a`
  color: #62b2f6;
`;
class DiscordPanelPure extends PureComponent {
  state = {
    users: [],
    loading: true,
    loadingError: false,
    expanded: false
  };

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  componentDidMount() {
    this.request();
  }

  request = () => {
    axios
      .get('https://discordapp.com/api/servers/445303073456390155/embed.json')
      .then((response) => {
        if (response.data) {
          this.setState({
            channelName: response.data.name,
            inviteLink: response.data.instant_invite,
            users: response.data.members,
            loading: false
          });
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
          loadingError: true
        });
      });
  };

  renderButton = () => {
    return (
      <TsLink href={this.state.inviteLink} className='ml-auto mr-2'>
        {this.props.t('join')}
      </TsLink>
    );
  };

  renderUsers = () => {
    const list = [];
    for (let index = 0; index < this.state.users.length; index++) {
      if (!this.state.expanded && index > 10) break;
      const user = this.state.users[index];
      list.push(
        <ListItem
          key={user.username}
          username={user.username}
          avatar={<Avatar src={user.avatar_url} alt={user.username} />}
        />
      );
    }
    return list;
  };

  render() {
    const { loadingError, loading } = this.state;
    if (loadingError) return null;

    return (
      <>
        <Box className='mt-3'>
          <BoxHeaderContainer style={{ paddingLeft: '12px' }}>
            <DiscordIcon src='/static/images/icons8-discord.svg' alt='discord' />
            <BoxHeaderTitle className='pl-2'>Discord</BoxHeaderTitle>
            {this.renderButton()}
          </BoxHeaderContainer>
          {loading ? <UsersPlaceholder /> : this.renderUsers()}
        </Box>
        {!loading ? (
          <Footer>
            <b>{this.state.users.length}</b> Members Online{' '}
            <UpdateButton onClick={this.toggleExpand}>
              {this.props.t(this.state.expanded ? 'show-less' : 'show-more')}
            </UpdateButton>
          </Footer>
        ) : null}
      </>
    );
  }
}

export const DiscordPanel = withTranslation('common')(DiscordPanelPure);
