import React, { Component } from 'react';
import DesktopLayout from './Desktop';

class Layout extends Component {
  render() {
    return <DesktopLayout>{this.props.children}</DesktopLayout>;
  }
}

export default Layout;
