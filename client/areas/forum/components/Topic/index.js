import React, { Component } from 'react';
import Post from './Post';

class Topic extends Component {
  render() {
    return (
      <div>
        {this.props.posts.map((post, index) => (
          <Post
            topic={index === 0 ? this.props.topic : null}
            index={index}
            post={post}
            key={post.pid}
            deleted={post.deleted}
            scrollTo={this.props.scrollTo}
          />
        ))}
      </div>
    );
  }
}

export default Topic;
