import React, { Component } from 'react';
import styled from 'styled-components';
import { Shoutbox } from 'ui';
import { rightPanelColor, boxBorderColor } from '_theme';
import Router from 'next/router';

const Container = styled.div`
  height: 100%;
  width: 25%;
  max-width: 22rem;
  min-width: 20rem;
  border-left: 1px solid ${boxBorderColor};
  background: ${rightPanelColor};

  @media (max-width: 900px) {
    display: none;

    &.open {
      width: 100%;
      max-width: 100%;
      display: flex;
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ToggleButton = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 14%;
  right: 22px;
  padding: 10px;
  border-radius: 50%;
  background: #292c35;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background: #292c35;
  color: #d4d4d4;
  border: 2px solid #e4e4e4;
  font-size: 1.8rem;

  @media (min-width: 900px) {
    display: none;
  }
`;

class Right extends Component {
  state = {
    opened: false
  };

  toggleOpen = () => {
    this.setState({ opened: !this.state.opened });
  };

  componentDidMount() {
    Router.events.on('routeChangeComplete', this.onRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.onRouteChange);
  }

  onRouteChange = () => {
    this.setState({ opened: false });
  };

  render() {
    return (
      <>
        <Container className={this.state.opened ? 'open' : ''}>
          <Wrapper>
            <Shoutbox key='shoutbox' isOpenOnMobile={this.state.opened} />
          </Wrapper>
        </Container>
        <ToggleButton onClick={this.toggleOpen}>
          {/* 🔥 */}
          <span className='material-icons'>chat_bubble_outline</span>
        </ToggleButton>
      </>
    );
  }
}

export default Right;
