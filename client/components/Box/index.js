import React, { Component } from 'react';
import styled from 'styled-components';
import { boxBGColor, boxBorderColor, BoxTopFontColor } from '_theme';
export const BoxHeaderContainer = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 24px;
  border-bottom: 1px solid ${boxBorderColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${BoxTopFontColor};
`;

export const BoxHeaderTitle = styled.h4`
  font-size: 16px;
  line-height: 1.2em;
  letter-spacing: -0.02em;
  margin-bottom: 0;
  text-transform: uppercase;
  font-style: normal;
`;

const Box = styled.div`
  box-shadow: rgba(109, 103, 95, 0.22) 1px 3px 6px;
  position: relative;
  background: ${boxBGColor};

  // &:after,
  // &:before {
  // 	display: block;
  // 	width: 1px;
  // 	height: 100%;
  // 	bottom: 0;
  // 	content: '';
  // 	position: absolute;
  // 	background: linear-gradient(180deg, transparent 0, rgb(127, 120, 188));
  // }

  // &:after {
  // 	right: 0;
  // }

  // &:before {
  // 	left: 0;
  // }
  // border-bottom: 1px solid rgb(127, 120, 188);
`;

class BoxComponent extends Component {
  render() {
    const { headerText, headerItems } = this.props;
    return (
      <Box className={this.props.className}>
        {headerText ? <BoxHeader title={headerText} headerItems={headerItems} /> : null}
        <div className={this.props.bodyClassName}>{this.props.children}</div>
      </Box>
    );
  }
}

export default BoxComponent;

export const BoxHeader = (props) => (
  <BoxHeaderContainer>
    <BoxHeaderTitle>{props.title}</BoxHeaderTitle>
    {props.headerItems ? props.headerItems : null}
  </BoxHeaderContainer>
);
