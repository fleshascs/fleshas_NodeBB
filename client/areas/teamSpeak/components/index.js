import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Box } from 'ui';
import { withTranslation } from '_core/i18n';

class TeamSpeakPanelPure extends Component {
  state = {
    users: [],
    loading: true,
    loadingError: false
  };

  componentDidMount() {
    this.request();
  }

  request = () => {
    axios
      .get('http://fleshas.lt/php/teamspeak/ts3phpframework-master/index.php')
      .then((response) => {
        if (response.data) {
          this.setState({
            users: response.data.users,
            loading: false
          });
          return;
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
      <TsLink
        href='ts3server://185.80.128.99/?port=9987&amp;nickname=WebGuest'
        className='ml-auto mr-2'
      >
        {this.props.t('join')} ts.fleshas.lt
      </TsLink>
    );
  };

  render() {
    if (this.state.loadingError) return null;
    if (this.state.loading) {
      return <Box>Loading...</Box>;
    }

    return (
      <Box className='mt-3' headerText='TeamSpeak' headerItems={this.renderButton()}>
        {this.state.users.map((user, index) => (
          <TeamSpeakItem key={user.name} name={user.name} />
        ))}
      </Box>
    );
  }
}

export const TeamSpeakPanel = withTranslation('common')(TeamSpeakPanelPure);

class TeamSpeakItem extends Component {
  render() {
    return (
      <TeamSpeakItemContainer>
        <Row>
          <ServerNameColumn>
            <ServerNameContainer>
              <CircleOnlineStatus /> {this.props.name}
            </ServerNameContainer>
          </ServerNameColumn>
        </Row>
      </TeamSpeakItemContainer>
    );
  }
}

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
