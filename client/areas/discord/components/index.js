import React, { PureComponent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Box, BoxHeaderContainer, BoxHeaderTitle } from 'ui';
import { withTranslation } from '_core/i18n';
import { rowLinkColor } from '_theme';
import UsersPlaceholder from './UsersPlaceholder';

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
        <TeamSpeakItem key={user.username} username={user.username} avatar={user.avatar_url} />
      );
    }
    return list;
  };


  render() {
    const {loadingError, loading} = this.state;
    if (loadingError) return null;

    return (
      <>
        <Box className='mt-3'>
          <BoxHeaderContainer style={{ paddingLeft: '12px' }}>
            <DiscordIcon src='/static/images/icons8-discord.svg' />
            <BoxHeaderTitle className='pl-2'>Discord</BoxHeaderTitle>
            {this.renderButton()}
          </BoxHeaderContainer>
          {loading ? <UsersPlaceholder /> : this.renderUsers()}
        </Box>
        {!loading ?
         (<Footer>
            <b>{this.state.users.length}</b> Members Online{' '}
            <UpdateButton onClick={this.toggleExpand}>
              {this.props.t(this.state.expanded ? 'show-less' : 'show-more')}
            </UpdateButton>
          </Footer>)
          : null
        }
      </>
    );
  }
}

export const DiscordPanel = withTranslation('common')(DiscordPanelPure);

function TeamSpeakItem({ username, avatar }) {
  return (
    <TeamSpeakItemContainer>
      <Row>
        <ServerNameColumn>
          <ServerNameContainer>
            <Avatar src={avatar} />
            <CircleOnlineStatus /> {username}
          </ServerNameContainer>
        </ServerNameColumn>
      </Row>
    </TeamSpeakItemContainer>
  );
}

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
const TeamSpeakItemContainer = styled.div`
  position: relative;
`;

const Row = styled.div`
  display: flex;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const ServerNameContainer = styled.div`
  flex: 1;
`;

const CircleOnlineStatus = styled.div`
  background: #42b72a;
  border-radius: 50%;
  height: 6px;
  margin: 0 3px 1px 0;
  vertical-align: middle;
  width: 6px;
  display: inline-block;
`;

const ServerNameColumn = styled.div`
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
`;
