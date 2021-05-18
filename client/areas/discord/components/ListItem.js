import React from 'react';
import styled from 'styled-components';

const TeamSpeakItemContainer = styled.div`
  position: relative;
`;

const Row = styled.div`
  display: flex;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const ServerNameContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const CircleOnlineStatus = styled.div`
  background: #42b72a;
  border-radius: 50%;
  height: 6px;
  margin: 0 3px 1px 0;
  vertical-align: middle;
  width: 6px;
  display: inline-block;
`;

const ServerNameColumn = styled.div`
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
`;

export default function ListItem({ username, avatar }) {
  return (
    <TeamSpeakItemContainer>
      <Row>
        <ServerNameColumn>
          <ServerNameContainer>
            {avatar}
            <CircleOnlineStatus /> {username}
          </ServerNameContainer>
        </ServerNameColumn>
      </Row>
    </TeamSpeakItemContainer>
  );
}
