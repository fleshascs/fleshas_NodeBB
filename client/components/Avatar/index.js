import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { avatarHoverShadowColor } from '_theme';
import { isOnline } from 'areas/user/selectors';

const AvatarImg = styled.img`
  box-shadow: rgba(139, 139, 139, 0.32) 1px 1px 3px 0px;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  border-width: 0px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  border-image: initial;
  border-radius: ${(props) => (props.circle ? '50%' : '3px')} !important;

  /* &:hover {
    box-shadow: ${avatarHoverShadowColor} 0px 0px 4px
      4px;
  } */
`;

const PlaceHolder = styled.div`
  background: #dbdcde;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
`;
const Container = styled.div`
  position: relative;
`;
const Indicator = styled.div`
  border-radius: 50%;
  width: 5px;
  height: 5px;
  background: #30c230;
  position: absolute;
  right: -4px;
  top: -3px;
`;

const DEFAULT_AVATAR =
  'https://www.gravatar.com/avatar/ae69fa0d674d490c99c4d8fdca23f1e2?s=100&r=x&d=retro';

const Avatar = (props) => {
  const { className, size, circle, onClick, isOnline } = props;
  const imgUrl = props.imgUrl || DEFAULT_AVATAR;
  return (
    <Container className={className}>
      {imgUrl ? (
        <AvatarImg
          size={getSize(size)}
          src={imgUrl}
          onClick={onClick}
          circle={circle}
          alt='avatar'
        />
      ) : (
        <PlaceHolder size={getSize(size)} className={className} circle={circle} />
      )}
      {isOnline ? <Indicator /> : null}
    </Container>
  );
};

function mapStateToProps(state, props) {
  return {
    isOnline: props.showIndicator && isOnline(state, props.user?.uid)
  };
}

export default connect(mapStateToProps)(Avatar);

function getSize(size = '30') {
  switch (size) {
    case 'small':
      return '25px';
    case 'meddium':
      return '85px';
    case 'big':
      return '200px';
    case '60':
      return '60px';
    case '30':
      return '30px';
    default:
      return size + 'px';
  }
}
