import React, { PureComponent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import OnlinePlayers from './OnlinePlayers';
import ServersPlaceHolder from './ServersPlaceHolder';
import TimePasedRealTime from '../TimePasedRealTime';
import { withTranslation } from '_core/i18n';
import { boxBGColor, rowHoverColor, rowLinkColor } from '_theme';

const Footer = styled.div`
  text-align: right;
  color: #878787;
  font-size: 0.8em;
`;

const UpdateButton = styled.span`
  color: ${rowLinkColor};
  cursor: pointer;
`;

class ServerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      servers: [],
      servsersLoading: true,
      loadingError: false,
      updateTimestamp: null
    };
  }

  componentDidMount() {
    this.requestForServers();
  }

  requestForServers = () => {
    axios
      .get('/php/api/servers/index.php')
      .then((response) => {
        if (response.data) {
          this.setState({
            servers: response.data,
            servsersLoading: false,
            updateTimestamp: new Date()
          });
          return;
        }
        throw new Error('invalid response');
      })
      .catch((error) => {
        this.setState({
          servsersLoading: false,
          loadingError: true
        });
      });
  };

  render() {
    if (this.state.loadingError) {
      return null;
    }

    return (
      <React.Fragment>
        <Box>
          <a href='http://counter-strike-download.fleshas.lt/'>
            <Csdownload
              src='http://fleshas.lt/themes/izi/image/cs16download.gif'
              alt='Counter-Strike 1.6 Download'
            />
          </a>
          {this.state.servsersLoading ? (
            <ServersPlaceHolder />
          ) : (
            this.state.servers.map((server, index) => (
              <ServerListItem
                key={server.name + server.css_qs_server_port}
                id={index + 1 < 10 ? '0' + (index + 1) : index + 1}
                name={server.name && server.name.replace('[Fleshas.lt]', '').replace('24/7', '')}
                map={server.map}
                onlinePlayers={server.activeplayers}
                maxOnlinePlayers={server.maxplayers}
                server={server}
              />
            ))
          )}
        </Box>
        {!this.state.servsersLoading ? (
          <Footer>
            {this.props.t('server-list-updated')}{' '}
            <TimePasedRealTime time={this.state.updateTimestamp} /> .{' '}
            <UpdateButton onClick={this.requestForServers}>
              {this.props.t('server-list-update')}
            </UpdateButton>
          </Footer>
        ) : null}
      </React.Fragment>
    );
  }
}

export default withTranslation('common')(ServerList);

//--------------------------server list item------------------------------------//
const ServerListItemContainer = styled.div`
  position: relative;
`;

const Row = styled.div`
  display: flex;
  cursor: pointer;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  &:hover {
    background: ${rowHoverColor};
  }
`;

const ServerMap = styled.div`
  font-size: 12px;
  color: #9c9c9c;
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

const SmallDataColumn = styled.div`
  text-align: center;
  font-size: 12px;
  color: #9c9c9c;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 16.666667%;
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
  position: relative;
  width: 100%;
  min-height: 1px;
`;

const NumberColumn = styled.div`
  text-align: center;
  font-size: 12px;
  color: #9c9c9c;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 16.666667%;
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
  position: relative;
  width: 100%;
  min-height: 1px;

  @media (max-width: 900px) {
    display: none;
  }
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

const Csdownload = styled.img`
  width: 100%;
  height: 60px;
`;

class ServerListItem extends React.Component {
  state = {
    isHovering: false,
    showPlayers: false
  };

  toggleOnlinePlayers = () => {
    this.setState({ showPlayers: !this.state.showPlayers });
  };

  render() {
    return (
      <ServerListItemContainer>
        <Row onClick={this.toggleOnlinePlayers}>
          <NumberColumn>{this.props.id}</NumberColumn>
          <ServerNameColumn>
            <ServerNameContainer>
              <CircleOnlineStatus /> {this.props.name}
            </ServerNameContainer>
            <ServerMap>{this.props.map}</ServerMap>
          </ServerNameColumn>
          <SmallDataColumn>
            {this.props.onlinePlayers}/{this.props.maxOnlinePlayers}
          </SmallDataColumn>
        </Row>
        {this.state.showPlayers ? <OnlinePlayers server={this.props.server} /> : null}
      </ServerListItemContainer>
    );
  }
}

const BoxContainer = styled.div`
  box-shadow: rgba(109, 103, 95, 0.22) 1px 3px 6px;
  position: relative;
  background: ${boxBGColor};

  & > ${ServerListItemContainer} + ${ServerListItemContainer} {
    border-top: solid 1px rgba(0, 0, 0, 0.12);
  }
`;

class Box extends React.Component {
  render() {
    return <BoxContainer>{this.props.children}</BoxContainer>;
  }
}
