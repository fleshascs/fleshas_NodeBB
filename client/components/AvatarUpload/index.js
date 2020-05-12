import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../../components';

const EditButton = styled.div`
	background: rgba(0, 0, 0, 0.5);
	text-align: center;
	position: absolute;
	bottom: 0;
	font-size: 12px;
	color: #e2e2e2;
	width: 100%;
	height: 100%;
	display: none;
	justify-content: center;
	align-items: center;
`;

const AvatarWrapper = styled.div`
	box-shadow: rgba(139, 139, 139, 0.32) 1px 1px 3px 0px;
	border-width: 2px;
	border-style: solid;
	border-color: rgb(255, 255, 255);
	border-image: initial;
	position: relative;
	height: ${props => props.size};
	width: ${props => props.size};
	overflow: hidden;
	border-width: 0px;
	cursor: pointer;

	&:hover ${EditButton} {
		display: flex;
	}
`;

// const AvatarImg = styled(Avatar)`
// 	cursor: pointer;

// 	&:hover {
// 		box-shadow: none;
// 	}
// `;

const AvatarUpload = props => {
	const size = getSize(props.size);
	return (
		<AvatarWrapper
			className={props.className}
			onClick={props.onClick}
			size={size}
		>
			<Avatar user={props.user} imgUrl={props.src} size={props.size} />
			<EditButton>
				<i className="material-icons">edit</i>
			</EditButton>
		</AvatarWrapper>
	);
};

export default AvatarUpload;

function getSize(size) {
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
			return size;
	}
}
