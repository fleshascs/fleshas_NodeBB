import React, { Component } from 'react';
import Message from './Message';
import { Spinner } from '../../../../components';

class Messages extends Component {
  render() {
    return (
      <div className='mx-2'>
        {this.props.loading ? <Spinner /> : null}
        {this.props.messages.map((message, index) => {
          if (message.system) return;
          const previosMessage = this.props.messages[index - 1];
          const secondMessage = this.props.messages[index + 1];

          const previousSenderSame =
            previosMessage && previosMessage.fromUser.uid == message.fromUser.uid;
          const secondSenderSame =
            secondMessage && secondMessage.fromUser.uid == message.fromUser.uid;

          return (
            <Message
              message={message}
              key={message.messageId}
              previousSenderSame={previousSenderSame}
              secondSenderSame={secondSenderSame}
            />
          );
        })}
      </div>
    );
  }
}
export default Messages;
