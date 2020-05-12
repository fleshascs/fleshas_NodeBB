import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { playerListHeaderColor } from '_theme';

const REST_API_URL = 'http://ts.fleshas.lt/api/players/index.php';

const PlayerListContainer = styled.div`
  width: 100%;
`;

const ServerIpContainer = styled.div`
  margin-bottom: 10px;
  background: #435a69;
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  padding: 31px 18px;
  background: linear-gradient(to bottom, ${playerListHeaderColor}, ${playerListHeaderColor}),
    url(/static/images/sticker.png);
  background-size: 424px auto;
  background-position: 30px -54px;
  font-size: 24px;
  justify-content: center;
  flex-direction: column;
`;

class OnlinePlayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      loading: true,
      loadingError: false
    };
    this.requestForPlayersOnline();
  }

  requestForPlayersOnline() {
    const URL = `${REST_API_URL}?server_ip=${this.props.server.css_qs_server_address}&server_port=${this.props.server.css_qs_server_port}`;

    axios
      .get(URL)
      .then((response) => {
        if (response.data.players) {
          this.setState({
            players: response.data.players,
            loading: false
          });
          return;
        }
        throw new Error('invalid response');
      })
      .catch((error) => {
        this.setState({
          loading: false,
          loadingError: true
        });
      });
  }

  render() {
    const ipAndPort = `${this.props.server.css_qs_server_address}:${this.props.server.css_qs_server_port}`;
    return (
      <PlayerListContainer className='py-2'>
        <ServerIpContainer className='px-2'>
          {ipAndPort}
          <div>
            <Button
              href={`steam://connect/${ipAndPort}`}
              type='primary'
              className='ml-2'
              style={{ color: 'red' }}
            >
              Join
              <ArrowRightOutlined />
            </Button>
          </div>
        </ServerIpContainer>

        <div className='px-2  text-muted'>
          {this.state.players.map((player, index) => (
            <Player index={index} player={player} key={player.Name} />
          ))}
        </div>
      </PlayerListContainer>
    );
  }
}

export default OnlinePlayers;

const Player = (props) => (
  <div className='d-flex pt-2'>
    <div className='mr-2'>{props.index + 1}</div>
    <div>{props.player.Name}</div>
  </div>
);
