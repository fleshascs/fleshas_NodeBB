import React from 'react';
import { Avatar } from 'ui';

function ChatAvatar(props) {
	return (
		<span>
			{props.users.length === 1 ? (
				<Avatar imgUrl={props.users[0].avatar} size="small" className="mr-1" />
			) : null}
		</span>
	);
}

export default ChatAvatar;
