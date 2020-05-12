import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Topic from './Topic';
import { Container } from './Topic.css';
import { boxBGColor, rowBorderColor } from '_theme';

const TopicsContainer = styled.div`
  box-shadow: rgba(109, 103, 95, 0.22) 1px 3px 6px;
  position: relative;
  background: ${boxBGColor};

  & > ${Container} + ${Container} {
    border-top: solid 1px ${rowBorderColor};
  }
`;

class Topics extends PureComponent {
  render() {
    return (
      <div>
        <TopicsContainer>
          {this.props.topics.map((topic, index) => (
            <Topic topic={topic} key={topic.tid} />
          ))}
        </TopicsContainer>
      </div>
    );
  }
}

export default Topics;
