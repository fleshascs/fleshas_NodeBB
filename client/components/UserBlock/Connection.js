import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Spin, Icon } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { CONNECTED, RECONNECTING } from '_core/actions/socket';

export const ConnectionContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 2rem;
  flex-direction: row;
  color: grey;
`;

export const Text = styled.div`
  padding-left: 1rem;
  @media (max-width: 700px) {
    display: none;
  }
`;

class Connection extends Component {
  render() {
    if (this.props.status === CONNECTED) {
      return null;
    }

    if (this.props.status === RECONNECTING) {
      return (
        <ConnectionContainer>
          <Spin className='mr-2' />
          <Text>reconnecting...</Text>
        </ConnectionContainer>
      );
    }

    return (
      <ConnectionContainer>
        <WarningOutlined />
        <Text>connection failed</Text>
      </ConnectionContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.socket.status
  };
}

export default connect(mapStateToProps)(Connection);
