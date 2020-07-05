import React, { Component } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const Container = styled.div`
  flex: 1;
`;

class Middle extends Component {
  componentDidMount() {
    Router.events.on('routeChangeComplete', this.onRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.onRouteChange);
  }

  onRouteChange = (path) => {
    if (path.startsWith('/topic')) return;
    const middleContainer = document.querySelector('.simplebar-content-wrapper');
    middleContainer.scrollTop = 0;
  };

  render() {
    return (
      <Container>
        <SimpleBar style={{ position: 'relative', height: '100%' }}>
          {this.props.children}
        </SimpleBar>
      </Container>
    );
  }
}

export default Middle;
