import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	padding: 0px;
	margin: 0px;
	background: none;
	border: none;
	cursor: pointer;

	position: relative;
	bottom: 0;

	&:focus {
		outline: none;
	}
`;

export default function LogOutButton(props) {
	return (
		<div>
			<Button onClick={props.onClick}>
				<i className="material-icons text-muted">&#xE8AC;</i>
			</Button>
		</div>
	);
}
