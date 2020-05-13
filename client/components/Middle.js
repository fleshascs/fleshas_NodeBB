import React, { Component } from 'react';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Router from 'next/router';
import throttle from 'lodash.throttle';

const Container = styled.div`
  flex: 1;
`;

// const Container = styled.div`
//   flex: 1;
//   display: flex;
// `;

// const NativeScrollBar = styled.div`
//   overflow-y: auto;
//   flex: 1;
// `;

class Middle extends Component {
  render() {
    return (
      <Container>
        {/* <NativeScrollBar className='middle-container'>{this.props.children}</NativeScrollBar> */}
        <ScrollBar>{this.props.children}</ScrollBar>
      </Container>
    );
  }
}

export default Middle;

class ScrollBar extends Component {
  constructor(props) {
    super(props);
    this.scrollBar = null;
    this.mouseOnScrollBar = false;
    this.scrollContainer = React.createRef();
    this.onScrollY = throttle(this.onScrollY, 300);
  }
  render() {
    return (
      <PerfectScrollbar
        className='middle-container'
        ref={this.scrollContainer}
        onScrollY={this.onScrollY}
      >
        {this.props.children}
      </PerfectScrollbar>
    );
  }

  componentDidMount() {
    this.scrollBar = this.scrollContainer.current._container.querySelector('.ps__rail-y');
    this.hideScrollBar();
    this.scrollBar.addEventListener('mouseenter', () => {
      this.showScrollBar();
      this.mouseOnScrollBar = true;
    });
    this.scrollBar.addEventListener('mouseleave', () => {
      this.hideScrollBar();
      this.mouseOnScrollBar = false;
    });
    Router.events.on('routeChangeComplete', this.onRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.onRouteChange);
  }

  onRouteChange = () => {
    const _scrollContainer = this.scrollContainer.current._container;
    _scrollContainer.scrollTop = 0;
  };

  hideScrollBar() {
    setTimeout(() => {
      if (this.mouseOnScrollBar) return;
      this.scrollBar.style.opacity = 0;
    }, 1000);
  }
  showScrollBar() {
    this.scrollBar.style.opacity = 100;
  }

  onScrollY = (scrollContainer) => {
    this.showScrollBar();
    this.hideScrollBar();
  };
}
