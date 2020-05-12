import React, { Component } from "react";
import styled from "styled-components";

const BannerText = styled.span`
  color: ${props => props.color};
  font-size: ${props => props.size};
`;

const BannerContainer = styled.a`
  width: 100%;
  height: 190px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const BannerImage = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  background: url('${props => props.imgPath}');

  &:hover {
    transform: scale(1.1);
  }
`;

const BannerTitle = styled.div`
  padding: 4px;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0px;
  background: rgba(0, 0, 0, 0.5);
  padding-left: 2rem;
`;

class NewsBanner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BannerContainer href={this.props.url} /*  className="short-news" */>
        <BannerImage imgPath={this.props.imgPath}>
          <BannerTitle>
            <BannerText size="1.33em" color="#fff">
              {this.props.title}
            </BannerText>
          </BannerTitle>
        </BannerImage>
      </BannerContainer>
    );
  }
}

export default NewsBanner;
