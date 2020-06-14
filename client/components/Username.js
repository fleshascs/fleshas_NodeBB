import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { buildUserUrl } from '_core/utils';
import { usernameColor } from '_theme';

const Name = styled.a`
  font-size: ${(props) => props.size};
  color: ${usernameColor} !important;
  font-weight: ${(props) => (props.bold === 'true' || props.bold === true ? 'bold' : 'normal')};
  cursor: pointer;
  position: relative;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

class Username extends Component {
  render() {
    const route = buildUserUrl(this.props.user.userslug);
    return (
      <Link href={route.path} as={route.url} passHref>
        <Name
          size={this.props.size}
          className={`${this.props.className}`}
          bold={this.props.bold}
          style={this.props.style}
        >
          {this.props.children === '[[global:guest]]' ? 'Deleted' : this.props.children}
        </Name>
      </Link>
    );
  }
}

Username.propTypes = {
  children: PropTypes.string,
  userId: PropTypes.number
};

Username.defaultProps = {
  size: '13px'
};

export default Username;
